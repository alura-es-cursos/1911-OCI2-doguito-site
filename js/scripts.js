const BASE_PATH = 'http://144.22.211.225:3000/clientes'

let clienteService = {};

clienteService.listClients = () => {
    return fetch(`${BASE_PATH}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error('No fue posible mostrar los clientes')
        })
}

clienteService.createClient = (nombre, email) => {
    return fetch(`${BASE_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email
        })
    })
        .then(res => {
            if (res.ok) {
                return res.body
            }
            throw new Error('No fue posible crear al cliente')
        })
}

clienteService.deleteClient = (id) => {
    return fetch(`${BASE_PATH}/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('No fue posible eliminar el cliente')
            }
        })
}

clienteService.detailClient = (id) => {
    return fetch(`${BASE_PATH}/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw new Error('No fue posible obtener la info del cliente')
        })
}

clienteService.updateClient = (id, nome, email) => {
    return fetch(`${BASE_PATH}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error('No fue posible obtener la info del cliente')
        })
}

const newLine = (nombre, email, id) => {
    const newClient = document.createElement('tr')
    const content = `
            <td class="td" data-td>${nombre}</td>
            <td>${email}</td>
            <td>
                <ul class="table__btns-controle">
                    <li><a href="#" class="btn-simples btn-simples--editar">Editar</a></li>
                    <li><button class="btn-simples btn-simples--excluir" type="button">Excluir</button></li>
                </ul>
            </td> 
        `
    newClient.innerHTML = content
    newClient.dataset.id = id
    return newClient
}


const table = document.querySelector('[data-table]')

table.addEventListener('click', async (evento) => {
    let btnDelete = evento.target.className === 'btn-simples btn-simples--excluir'
    if (btnDelete) {
        try {
            const lineClient = evento.target.closest('[data-id]')
            let id = lineClient.dataset.id
            await clienteService.removeCliente(id)
            lineClient.remove()
        }
        catch (erro) {
            console.log(erro)
            window.location.href = "/"
        }
    }
})


const render = async () => {
    try {
        const listaClientes = await clienteService.listClients()
        listaClientes.forEach(({ nombre, email, id }) => {
            table.appendChild(newLine(nombre, email, id))
        })
    }
    catch (error) {
        window.alert(error);
    }

}

render()
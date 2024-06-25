const listOs = async () => {
    const response = await fetch("/service-order")
    const data = await response.json();

    $("#os-list").html(`
        ${
            data.service_orders.map(service_order => {
                return `
                    <div class="card my-2 fluid">
                        <div class="card-body">
                            <h5 class="card-title">${ service_order.title }</h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                ${ service_order.start_date } à ${ service_order.end_date }
                            </h6>
                            <p class="card-text">${ service_order.description }</p>
                        </div>
                        <div class="card-body">
                            <a href="#" class="card-link">Editar</a>
                            <a href="#" class="card-link text-danger">Recusar</a>
                            <a href="#" class="card-link text-success">Aprovar</a>
                        </div>
                    </div>
                `;
            })
        }
    `)
}

window.onload = listOs;
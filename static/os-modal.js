$(document).ready(async function () {
    $("#save-os").on("click", async (event) => {
        event.preventDefault();

        const title = $("#os-title").val()
        const description = $("#os-description").val()
        const startDate = $("#os-start-date").val()
        const endDate = $("#os-end-date").val()

        const id = $("#save-os").data("os-id")

        const isUpdating = !!id

        const url = isUpdating
            ? `/service-order/${id}`
            : "/service-order"

        await fetch(url, {
            method: isUpdating ? "PUT" : "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                title: title,
                description: description,
                start_date: `${startDate}`,
                end_date: `${endDate}`
            })
        })

        $("#os-modal").modal("hide");
        listOs();
    })

    $("#add-os-button").on("click", async (event) => {
        event.preventDefault();

        openOsModal()
    })

    $("#filter-os-button").on("click", async (event) => {
        event.preventDefault();
    //  TESTE 01: FAIL, POIS A ROTA NÃO IRÁ RECEBER OS DADOS DESTA FORMA
        /* var searchInput = document.getElementById('searchInput').value;
        var startDate = document.querySelector('input[placeholder="Data de início"]').value;
        var endDate = document.querySelector('input[placeholder="Data de fim"]').value;
        var status = document.querySelector('#div-os-status input[type="radio"]:checked').id;

        var formData = {
            description: searchInput,
            created_at: startDate,
            end_date: endDate,
            status: status
        }; */

        
        /* var queryString = new URLSearchParams(formData).toString();
        console.log('queryString... ',queryString);

        listOs(formData); */

    //  TESTE 02: FAIL, SIMPLESMENTE NÃO RETORNA DADO ALGUM. APAREMENTEMENTE A ROTA FOI CRIADA E ESTÁ LEGÍVEL NA APLICAÇÃO, O QUE CONCLUO SER NA CONSULTA OU NO BANCO
        var status = document.querySelector('#div-os-status input[type="radio"]:checked').id;
        var url = '/service-order/status/' + status;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Dados filtrados:', data);
            })
            .catch(error => console.error('Erro:', error));

    })
});

openOsModal = async (id) => {
    $("#os-modal").modal("show");

    let modalTitle;

    const titleInput = $("#os-title")
    const descriptionInput = $("#os-description")
    const startDateInput = $("#os-start-date")
    const endDateInput = $("#os-end-date")

    if (id) {
        modalTitle = "Editar OS"

        const response = await fetch(`/service-order/${id}`)
        const data = await response.json();

        const formatDate = (dateAsString) => {
            dateAsString = dateAsString.replace("GMT", "GMT-0300")
            const date = new Date(dateAsString);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${year}-${month}-${day}`;
        }

        titleInput.val(data.service_order.title)
        descriptionInput.val(data.service_order.description)
        startDateInput.val(formatDate(data.service_order.start_date))
        endDateInput.val(formatDate(data.service_order.end_date))
    }
    else {
        modalTitle = "Criar OS"

        titleInput.val("")
        descriptionInput.val("")
        startDateInput.val("")
        endDateInput.val("")
    }

    $(".modal-title").html(modalTitle)
    $("#save-os").data("os-id", id ?? 0)
}

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

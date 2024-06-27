openConfirmOrRefuseModal = async (id, action) => {
    $("#confirm-refuse-modal").modal("show");

    let modalTitle;
    let question;

    let treatedOsId = `#${id.toString().padStart(3, '0')}`

    if(action === "refuse-os") {
        modalTitle = "Recusar OS"
        question = `Tem certeza de que deseja recusar a OS ${treatedOsId}?`
    }
    else if(action === "confirm-os") {
        modalTitle = "Confirmar OS"
        question = `Tem certeza de que deseja confirmar a OS ${treatedOsId}?`
    }

    $("#confirm-refuse-modal-title").html(modalTitle)
    $("#confirm-refuse-modal-description").html(question)

    $("#confirm-refuse-button").data("os-id", id ?? 0)
    $("#confirm-refuse-button").data("action", action)
}

$("#confirm-refuse-button").on("click", async (event) => {
    event.preventDefault();

    const id = $("#confirm-refuse-button").data("os-id")
    const action = $("#confirm-refuse-button").data("action")

    let url
    let method
    
    if(action === "refuse-os") {
        url = `/service-order/${id}/status/${3}`
        method = "PUT"
    }
    else if(action === "confirm-os") {
        url = `/service-order/${id}/status/${2}`
        method = "PUT"
    }

    console.log(url)

    await fetch(url, {
        method: method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({})
    })

    $("#confirm-refuse-modal").modal("hide");
    listOs();
})

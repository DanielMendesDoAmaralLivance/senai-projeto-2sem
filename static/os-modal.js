$(document).ready(async function() {
    $("#save-os").on("click", async (event) => {
        event.preventDefault();

        const title = $("#os-title").val()
        const description = $("#os-description").val()
        const startDate = $("#os-start-date").val()
        const endDate = $("#os-end-date").val()

        const response = await fetch("/service-order", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                start_date: `${startDate}`,
                end_date: `${endDate}`
            })
        })
        const data = await response.json();

        if(data.success) {
            $("#os-modal").modal("hide")
            listOs();
        }
    })
});
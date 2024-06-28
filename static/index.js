$(document).ready(function () {
  var startDateInput = $("#os-start-date");
  var endDateInput = $("#os-end-date");

  startDateInput.datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    todayHighlight: true,
  });

  endDateInput.datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    todayHighlight: true,
  });
});

$("#filter-os-button").on("click", async () => {
  const search = $("#searchInput").val();
  const statusToFilter = $("input[name='status']:checked").val();

  listOs(null, search, statusToFilter);
});

const listOs = async (_, search = "", statusToFilter = "0") => {
  const response = await fetch("/service-order");
  const data = await response.json();

  const formatDate = (dateAsString) => {
    dateAsString = dateAsString.replace("GMT", "GMT-0300");
    const date = new Date(dateAsString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  $("#os-list").html(`
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden"></span>
    </div>
  `);

  let filteredServiceOrders = data?.service_orders;

  if (search) {
    filteredServiceOrders = filteredServiceOrders?.filter(
      (x) => String(x.id).includes(search) || x.title?.includes(search) || x.description?.includes(search)
    );
  }

  if (Number(statusToFilter)) {
    filteredServiceOrders = filteredServiceOrders?.filter(
      (x) => Number(x.status) === Number(statusToFilter)
    );
  }

  setTimeout(() => {
    if (!filteredServiceOrders || filteredServiceOrders?.length === 0) {
      $("#os-list").html(`
        <p>
          Nenhuma OS encontrada. Que tal criar clicando no botão flutuante abaixo?
        </p>
      `);
    } else {
      $("#os-list").html(`
      ${filteredServiceOrders.map((service_order) => {
        return `
                  <div class="card my-2 fluid" style="min-width: 90%;">
                      <div class="card-body">
                      <div style="margin-bottom: 10px"> ${
                        service_order.status === 1
                          ? `
<span class="badge badge-secondary">Pendente</span>`
                          : service_order.status === 2
                          ? `<span class="badge badge-success">Aprovada</span>`
                          : `<span class="badge badge-danger">Recusada</span>`
                      }
                      </div>

                              <h5 class="card-title">#${service_order.id
                                .toString()
                                .padStart(3, "0")} - ${service_order.title}</h5>
                          <hr/>
                          <h6 class="card-subtitle mb-2 text-muted">
                              De ${formatDate(
                                service_order.start_date
                              )} à ${formatDate(service_order.end_date)}
                          </h6>
                          <p class="card-text">${service_order.description}</p>
                      </div>
                      ${
                        service_order.status === 1
                          ? `<div class="card-body">
                          <a href="#" class="card-link" onclick="openOsModal(${service_order.id})">Editar</a>
                          <a href="#" class="card-link text-danger" onclick="openConfirmOrRefuseModal(${service_order.id}, 'refuse-os')">Recusar</a>
                          <a href="#" class="card-link text-success" onclick="openConfirmOrRefuseModal(${service_order.id}, 'confirm-os')">Aprovar</a>
                      </div>`
                          : ``
                      }
                  </div>
              `;
      })}
  `);
    }
  }, 250);
};

window.onload = listOs;

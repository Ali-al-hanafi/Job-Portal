export const showAlert = (title, message) => {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").textContent = message;

  document.getElementById("modalFooter").innerHTML = `
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
  `;

  const modal = new bootstrap.Modal(document.getElementById('customModal'));
  modal.show();
};

export const showConfirmation = (title, message, onConfirm) => {
  document.getElementById("modalTitle").textContent = title.trim();
  document.getElementById("modalBody").textContent = message;

  document.getElementById("modalFooter").innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    <button type="button" class="btn btn-primary" id="confirmButton">Yes</button>
  `;

  const modalElement = document.getElementById('customModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  setTimeout(() => {
    document.getElementById("confirmButton").onclick = () => {
      modal.hide();
      onConfirm(); 
    };
  });
};


export function showError(headerText, bodyText) {
  const header = document.querySelector("#customModal .modal-header");
  header.className = "modal-header bg-danger text-white";  
  showAlert(headerText, bodyText);
}


export function showSuccess(headerText, bodyText) {
  const header = document.querySelector("#customModal .modal-header");
  header.className = "modal-header bg-success text-white";
  showAlert(headerText, bodyText);
}

export const injectModal = ()=>{
  return` <div class="modal fade" id="customModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div id="modal-header"  class="modal-header bg-info text-black">
        <h5 class="modal-title " id="modalTitle">Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body text-dark" id="modalBody">
        Message
      </div>

      <div class="modal-footer" id="modalFooter">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
      </div>

    </div>
  </div>
</div>`;
};

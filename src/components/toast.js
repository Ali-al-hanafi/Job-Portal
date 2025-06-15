export function showSuccess(title, message) {
  const toastEl = document.getElementById("successToast");
  const toastBody = document.getElementById("successToastBody");

  if (toastBody && toastEl) {
    toastBody.textContent = `${title}: ${message}`;
    const toast = new bootstrap.Toast(toastEl, {
      delay: 3000,
      autohide: true
    });
    toast.show();
  } else {
    alert(`${title}: ${message}`); // fallback if toast is missing
  }
}


export const injectToast = () => {
  return`<div class="position-fixed start-50 translate-middle-x p-2" style="bottom: 60px; z-index: 1100; min-width: 300px;">
  <div id="successToast" class="toast align-items-center text-white bg-success border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" style="font-size: 1.1rem;">
    <div class="d-flex">
      <div class="toast-body fw-semibold" id="successToastBody">
         <!--message-->
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>

`;
};
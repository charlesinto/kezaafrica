import sweet from "sweetalert2";
import initSwal from "sweetalert2-react-content";
const swal = initSwal(sweet);
function useModal() {
  return Object.freeze({
    setToast: ({ title, icon, position, timer, didClose }) => {
      const Toast = swal.mixin({
        toast: true,
        position: position || "top",
        timer: timer || 7000,
        didClose,
        timerProgressBar: true,
      });
      Toast.fire({
        title,
        icon,
      });
    },
    setModal: ({
      title,
      icon,
      text,
      textTwo,
      confirmButtonText,
      confirmButtonColor,
      didClose,
      showCloseButton,
      confirmAction,
      iconHtml,
      imageUrl,
      boldenText,
      input,
      inputPlaceholder,
      inputLabel,
      allowOutsideClick,
    }) => {
      swal
        .fire({
          title,
          html: textTwo
            ? `<p class="${
                boldenText ? "fw-bold" : ""
              } mt-1 mb-1 text-center">${text}</p><p class="mt-1 mb-1 text-center">${textTwo}</p>`
            : `<p class="${
                boldenText ? "fw-bold" : ""
              } mt-1 mb-1 text-center">${text}</p>`,
          icon,
          input,
          inputLabel,
          inputPlaceholder,
          allowOutsideClick,
          confirmButtonText,
          confirmButtonColor,
          showCloseButton,
          didClose,
          iconHtml,
          imageUrl,
        })
        .then((res) => {
          if (res.isConfirmed) {
            confirmAction && confirmAction(res);
          }
        });
    },
    setPrompt: ({
      title,
      icon,
      text,
      textTwo,
      confirmButtonText,
      denyButtonText,
      confirmAction,
      denyAction,
      didClose,
      input,
      inputOptions,
      inputPlaceholder,
      inputLabel,
      inputAttributes,
      inputText,
    }) => {
      swal
        .fire({
          title,
          icon: icon || "question",
          html: inputText
            ? `<p class="mt-1 mb-1 text-center">${text}</p><p class="mt-1 mb-1 text-center">${textTwo}</p><div>${inputText}</div>`
            : textTwo
            ? `<p class="mt-1 mb-1 text-center">${text}</p><p class="mt-1 mb-1 text-center">${textTwo}</p>`
            : `<p class="mt-1 mb-1 text-center">${text}</p>`,
          showDenyButton: true,
          showCloseButton: true,
          confirmButtonText,
          denyButtonText,
          didClose,
          input,
          inputOptions,
          inputPlaceholder,
          inputLabel,
          inputAttributes,
        })
        .then((res) => {
          if (res.isDenied) {
            denyAction && denyAction(res);
          }
          if (res.isConfirmed) {
            confirmAction && confirmAction(res);
          }
        });
    },
  });
}

export default useModal;

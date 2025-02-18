addEventListener("DOMContentLoaded", () => {
  // intl
  const input = document.querySelector("#phone");
  const iti = window.intlTelInput(input, {
    initialCountry: "pt",
    utilsScript:
      "./assets/form-validation.js",
    strictMode: true,
    loadUtils: () =>
      import(
        "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"
      ),
  });

  // submit form
  const form = document.querySelector("#form-info");
  const errors = document.querySelector("#form-info__errors");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errorsArray = [];

    // Name
    if (e.target.name.value.trim().length < 2) {
      errorsArray.push("o nome é muito curto");
    }

    // Surname
    if (e.target.surname.value.trim().length < 2) {
      errorsArray.push("sobrenome é muito curto");
    }

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.email.value)) {
      errorsArray.push("insira um e-mail válido");
    }

    // Phone
    var validationError = {
        1: "codigo de pais invalido",
        2: "o número é muito curto",
        3: "o número é muito longo",
        4: "número não é número"
      };

      if(iti.getValidationError() in validationError) {
        errorsArray.push(validationError[iti.getValidationError()])
      }

    errors.innerHTML = errorsArray.map((item) => `<li>${item}</li>`).join("");

    if(!errorsArray.length) {
        // fetch form ....
     
        //redirect to thank you page
        window.location.href = "./thank-you.html"
    }
  });
});

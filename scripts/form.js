class FormHandler {
  selectors = {
    form: "[data-js-purchase-form]",
    submit: "[data-js-purchase-submit]",
  };

  linkOptions = {
    apple: "https://apple.com/",
    google: "https://google.com/",
  };

  constructor() {
    this.formElement = document.querySelector(this.selectors.form);
    this.submitBtn = document.querySelector(this.selectors.submit);
    this.bindEvents();
  }

  bindEvents() {
    this.submitBtn.addEventListener("click", (e) => {
      if (!this.formElement.purchase.value) {
        e.preventDefault();
        return;
      }
      const link = this.getCurrentLink();
      this.submitBtn.setAttribute("href", link);
    });
  }

  getCurrentLink() {
    return Object.values(this.linkOptions)[
      Object.keys(this.linkOptions).indexOf(this.formElement.purchase.value)
    ];
  }
}

export default FormHandler;

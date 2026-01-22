const SUPPORTED_LANGS = ["de", "en", "es", "fr", "ja", "pt"];
const LOCALES_PATH = "/i18n/";
const FALLBACK_LANG = "en";

class I18n {
  selectors = {
    strings: "[data-i18n]",
    footerLinks: "[data-js-footer-link]",
    advantages: "[data-js-advantages]",
  };

  constructor() {
    this.strings = document.querySelectorAll(this.selectors.strings);
    this.footerLinks = document.querySelectorAll(this.selectors.footerLinks);
    this.advantages = document.querySelectorAll(this.selectors.advantages);
    this.init();
  }

  async init() {
    let chosenLang = this.getSystemLang();
    if (!chosenLang) {
      chosenLang = this.getLangFromQuery();
    }
    if (chosenLang) {
      const translation = await this.loadTranslation(chosenLang);
      this.applyTranslations(translation);
    }

    if (chosenLang === "de") {
      this.footerLinks.forEach((el) => {
        el.setAttribute("style", "font-size: 10px");
      });
    }
    if (chosenLang === "pt" || chosenLang === "es") {
      this.advantages.forEach((el) => {
        el.setAttribute("style", "font-size: 10px");
      });
    }
  }

  getLangFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("lang");
    if (q && typeof q === "string") {
      const lang = q.trim().slice(1, 3).toLowerCase();
      if (SUPPORTED_LANGS.includes(lang)) return lang;
    }
    return null;
  }

  getSystemLang() {
    const lang = (navigator.language || navigator.userLanguage || "")
      .slice(0, 2)
      .toLowerCase();
    return SUPPORTED_LANGS.includes(lang) ? lang : null;
  }

  async loadTranslation(lang) {
    if (!lang) return;
    const path = `${LOCALES_PATH}${lang}.json`;
    try {
      const resp = await fetch(path, { cache: "reload" });
      if (!resp.ok) throw new Error("Translation not found");
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  applyTranslations(translation) {
    if (!translation) return;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translation[key] !== undefined) {
        el.innerHTML = translation[key];
      }
    });
  }
}

export default I18n;

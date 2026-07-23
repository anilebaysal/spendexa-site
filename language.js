(() => {
  const storageKey = "spendexa-language";
  const supportedLanguages = new Set(["tr", "en"]);

  function storedLanguage() {
    try {
      const value = localStorage.getItem(storageKey);
      return supportedLanguages.has(value) ? value : "tr";
    } catch {
      return "tr";
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // The site still works if browser storage is unavailable.
    }
  }

  function applyLanguage(language, shouldSave = true) {
    const selectedLanguage = supportedLanguages.has(language) ? language : "tr";
    document.documentElement.dataset.language = selectedLanguage;
    document.documentElement.lang = selectedLanguage;

    document.querySelectorAll("[data-language-button]").forEach((button) => {
      const isSelected = button.dataset.languageButton === selectedLanguage;
      button.setAttribute("aria-pressed", String(isSelected));
    });

    const body = document.body;
    if (body) {
      const title = selectedLanguage === "en" ? body.dataset.titleEn : body.dataset.titleTr;
      const description = selectedLanguage === "en"
        ? body.dataset.descriptionEn
        : body.dataset.descriptionTr;

      if (title) document.title = title;
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta && description) descriptionMeta.setAttribute("content", description);
    }

    if (shouldSave) saveLanguage(selectedLanguage);
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(storedLanguage(), false);

    document.querySelectorAll("[data-language-button]").forEach((button) => {
      button.addEventListener("click", () => {
        applyLanguage(button.dataset.languageButton);
      });
    });
  });
})();

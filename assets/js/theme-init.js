(function () {
  var mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var validSettings = ["system", "light", "dark"];

  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, "") + " js ";

  function readThemeSetting() {
    var storedTheme;
    try {
      storedTheme = localStorage.getItem("theme");
    } catch (error) {
      storedTheme = null;
    }
    return validSettings.indexOf(storedTheme) > -1 ? storedTheme : "system";
  }

  function computedTheme(setting) {
    if (setting === "dark" || setting === "light") {
      return setting;
    }
    return mediaQuery && mediaQuery.matches ? "dark" : "light";
  }

  function writeTheme(setting) {
    var theme = computedTheme(setting);
    document.documentElement.setAttribute("data-theme-setting", setting);
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  window.applySiteTheme = writeTheme;
  window.getSiteThemeSetting = readThemeSetting;
  writeTheme(readThemeSetting());
})();

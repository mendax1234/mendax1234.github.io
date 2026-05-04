(function () {
  var nextSetting = {
    system: "light",
    light: "dark",
    dark: "system"
  };
  var labels = {
    system: "Switch to light mode",
    light: "Switch to dark mode",
    dark: "Switch to system preference"
  };

  function currentSetting() {
    return window.getSiteThemeSetting ? window.getSiteThemeSetting() : "system";
  }

  function setTheme(setting) {
    if (window.getSelection) {
      var selection = window.getSelection();
      if (selection && selection.removeAllRanges) {
        selection.removeAllRanges();
      }
    }
    try {
      localStorage.setItem("theme", setting);
    } catch (error) {}
    if (window.applySiteTheme) {
      window.applySiteTheme(setting);
    }
    updateLabel();
  }

  function updateLabel() {
    var themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) {
      return;
    }
    var setting = currentSetting();
    var control = themeToggle.querySelector("[role='button']");
    if (control) {
      control.setAttribute("aria-label", labels[setting]);
      control.setAttribute("title", labels[setting]);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var themeToggle = document.getElementById("theme-toggle");
    var mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    if (themeToggle) {
      themeToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setTheme(nextSetting[currentSetting()]);
      }, true);
      updateLabel();
    }

    if (mediaQuery) {
      var onPreferenceChange = function () {
        if (currentSetting() === "system" && window.applySiteTheme) {
          window.applySiteTheme("system");
        }
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", onPreferenceChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(onPreferenceChange);
      }
    }
  });
})();

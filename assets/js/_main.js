/* ==========================================================================
   Optional diagrams and charts
   ========================================================================== */

const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
const PLOTLY_URL = "https://cdn.jsdelivr.net/npm/plotly.js@3.6.0/dist/plotly.min.js";

function computedTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

const mermaidElements = document.querySelectorAll("pre > code.language-mermaid");
if (mermaidElements.length > 0) {
  const renderMermaid = function () {
    const moduleScript = document.createElement("script");
    moduleScript.type = "module";
    moduleScript.textContent = `
      import mermaid from '${MERMAID_URL}';
      mermaid.initialize({ startOnLoad: true, theme: 'default' });
      await mermaid.run({ querySelector: 'code.language-mermaid' });
    `;
    document.body.appendChild(moduleScript);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMermaid, { once: true });
  } else {
    renderMermaid();
  }
}

const plotlyElements = document.querySelectorAll("pre > code.language-plotly");
let plotlyLayouts;

function applyPlotlyTheme(element, jsonData) {
  const theme = computedTheme() === "dark" ? plotlyLayouts.plotlyDarkLayout : plotlyLayouts.plotlyLightLayout;
  if (jsonData.layout) {
    jsonData.layout.template = jsonData.layout.template ?
      { ...theme, ...jsonData.layout.template } :
      theme;
  } else {
    jsonData.layout = { template: theme };
  }
  window.Plotly.react(element, jsonData.data, jsonData.layout);
}

function redrawPlotly() {
  if (!window.Plotly || !plotlyLayouts) {
    return;
  }
  plotlyElements.forEach(function (codeElement) {
    const chartElement = codeElement.parentElement.nextElementSibling;
    if (chartElement) {
      applyPlotlyTheme(chartElement, JSON.parse(codeElement.textContent));
    }
  });
}

if (plotlyElements.length > 0) {
  const loadPlotly = async function () {
    plotlyLayouts = await import("./theme.js");
    const script = document.createElement("script");
    script.src = PLOTLY_URL;
    script.async = true;
    script.onload = function () {
      plotlyElements.forEach(function (codeElement) {
        const jsonData = JSON.parse(codeElement.textContent);
        codeElement.parentElement.classList.add("hidden");
        const chartElement = document.createElement("div");
        codeElement.parentElement.after(chartElement);
        applyPlotlyTheme(chartElement, jsonData);
      });
    };
    document.head.appendChild(script);
  };

  if (document.readyState === "complete") {
    loadPlotly();
  } else {
    window.addEventListener("load", loadPlotly, { once: true });
  }
  window.addEventListener("site-theme-change", redrawPlotly);
}

/* ==========================================================================
   Actions that should occur after the page is ready
   ========================================================================== */

$(document).ready(function () {
  const scssLarge = 925;

  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  $(window).on("resize", function () {
    if ($(".author__urls.social-icons").css("display") === "none" && $(window).width() >= scssLarge) {
      $(".author__urls").css("display", "block");
    }
  });
});

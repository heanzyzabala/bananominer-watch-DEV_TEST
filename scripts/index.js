import { renderUserData } from "./components/renderUser/index.js";
import { renderTop } from "./components/renderTop/index.js";
import { renderChart } from "./components/renderChart/index.js";
(function () {
  if (window.location.pathname.indexOf("charts") !== -1) {
    renderChart();
  } else {
    renderTop();
    renderUserData();
  }
})();

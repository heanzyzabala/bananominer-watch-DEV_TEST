import { banMenu } from "../helper/querySelectors.js";

export const renderTop = () => {
  banMenu.innerHTML += `
    <a href="https://stats.foldingathome.org/team/234980" target="_blank" title="Show team stats on foldingathome.org" style="padding-top:3px;">
    <p class="banano__top team">Team: 234980 - www.banano.cc</p>
    </a>
    <input type="checkbox" id="menu" />
    <label for="menu">
    <img src="${chrome.runtime.getURL(
      "/assets/menu.svg"
    )}" class="hamburguer-logo" width="35"/>
   </label>
    <nav class="banano--main-menu">
      <ul class="banano__menu--links">
      <li>
      <a href="https://www.monkey2monkey.com/fh-stats/" class="banano__top" title="Go to https://www.monkey2monkey.com/fh-stats/" target="_blank" style="padding-top:3px;">
        Your Mining Stats   
      </a>
      </li>
	  <li>
      <a href="https://banano.report/miner/your_miner_id" class="banano__top" title="Go to https://banano.report/" target="_blank" style="padding-top:3px;">
        PPD-BAN Calculator   
      </a>
      </li>
      <li class="banano__menu--certificates"></li>
    </nav>
    `;
};

export const bananoMenuCertificates = (data) => {
  const pointsCertLink = data[1].credit_cert && data[1].credit_cert.replace('&type=score', '')
  if (data[1].credit_cert && data[1].wus_cert)
    document.querySelector(".banano__menu--certificates").innerHTML = `
  <li>
  <a class="banano__top" title="Download Points Certificate from F@H" href="${
    pointsCertLink
  }">${"Certificate (Points)"}</a></li>
  <li><a class="banano__top" title="Download Work Units Certificate from F@H"  href="${
    data[1].wus_cert
  }" >${"Certificate (WUs)"}</a></li>
  </ul>`;
};

import {
  userInput,
  error,
  button,
  remove,
  bananoSection,
} from "../helper/querySelectors.js";
import { updateUserData, removeUserData } from "./updaters.js";
import { validationInputAddress } from "./validationInput.js";
import { checkYourWus } from "./checkWus.js";
import { bananoMenuCertificates } from "../renderTop/index.js";
import { formatDate } from '../helper/utils.js';

import footerMenu from "./footerMenu.js";

export async function getDataBananoMiner() {
  let user = userInput.value;
  try {
    if (validationInputAddress(user)) {
      await fetchData(user);
    }
  } catch (e) {
    error.classList.add("open");
    error.innerText = chrome.i18n.getMessage("errNotfound");
    removeUserData();
  }
}

export const fetchData = async (user) => {
  //found API in the discord,
  //thanks https://discord.com/channels/415935345075421194/566268199210057728/721405574863912991
  //cors anywhere because of the cors from fold@home
  const bananoData = await Promise.all([
    fetch(`https://bananominer.com/user_name/${user}`),
    fetch(
      `https://banano-cors-proxy.herokuapp.com/https://api2.foldingathome.org/user/${user}`,
      {
        "Content-Type": "application/json",
        "Origin": document.location.href
      }
    ),
    fetch(`https://api.coingecko.com/api/v3/coins/banano?localization=true&tickers=true`),
  ]);
  const data = await Promise.all([bananoData[0].json(), bananoData[1].json(), bananoData[2].json()]);
  console.log(data);
  if (bananoData[0].status === 200 && bananoData[1].status === 200 && bananoData[2].status === 200) {
    error.classList.remove("open");
    bananoMenuCertificates(data);
    renderComponent(data);
  } else {
    error.innerText = chrome.i18n.getMessage("errNotfound");
    error.classList.add("open");
    removeUserData();
  }
};

//render component user data screen
const renderComponent = (data) => {
  let template = ``;
  let totalAmount = 0;
  const prices = data[2].market_data.current_price
  const price = prices['usd']
  data[1].wus > 0
    ? (template += checkYourWus(data[0], data[1]))
    : (template += `Waiting for your first Work Unit!`);
  template += `<section class="banano__info"> <h2>${chrome.i18n.getMessage(
    "lastUpdate"
  )}</h2><p> ${formatDate(new Date())}</p>
    </section>
    <section class="banano__info">
    <h2>User ID:</h2><p>${data[0].user.id}</p>
    </section>
    <section class="banano__info">
    <h2>${chrome.i18n.getMessage(
      "banAdr"
    )}</h2><p class="banano__info--address">${data[0].user.name}</p>
    </section>
    
    <section class="banano__info">
    <h2>${chrome.i18n.getMessage("AccCreated")}</h2><p> ${
    formatDate(data[0].user.created_at)
  }</p>
    </section>
    `;
  data[0].payments &&
    data[0].payments.forEach((el) => {
      totalAmount += el.amount;
    });

  const convertedAmount = (totalAmount * price).toFixed(2)

  template += `<section class="banano__info"><h2>Score:</h2><p>${data[1].teams[0].score}</p></section> `;
  template += `<section class="banano__info"><h2>${chrome.i18n.getMessage(
    "banEarned"
  )}</h2><p>${totalAmount.toFixed(2)} ($${convertedAmount} - $${price.toFixed(3)} per BAN)</p></section>`;
  template += `<section class="banano__info"><h2>${chrome.i18n.getMessage(
    "lastWU"
  )}</h2><p> ${formatDate(data[1].last)}</p></section>`;
  template += `<section class="banano__info"><h2>${chrome.i18n.getMessage(
    "totalWU"
  )}</h2><p>${data[1].wus}</p></section>`;
  template += `<section class="banano__info"><h2>${chrome.i18n.getMessage(
    "activeClients"
  )}</h2></section>`;
  template += `<section class="banano__info banano__info--item"><h2>${chrome.i18n.getMessage(
    "within50Days"
  )}</h2><p>${data[1].active_50}</p></section>`;
  template += `<section class="banano__info banano__info--item"><h2>${chrome.i18n.getMessage(
    "within7Days"
  )}</h2><p>${data[1].active_7}</p></section>`;
  template += `<img class="monkey__user" 
  src="https://monkey.banano.cc/api/v1/monkey/${data[0].user.name}" 
  title="monKey for ban_XXX"/>
  `;
  localStorage.setItem("user_id", data[0].user.id);
  localStorage.setItem("template", template);
  localStorage.setItem("chart-data", JSON.stringify(data[0]));

  if (template) {
    updateUserData();
    bananoSection.innerHTML += footerMenu();
    return true;
  }
};

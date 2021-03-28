function footerMenu() {
  return `<footer>
 ${
   (localStorage.getItem("wu-active") === "true" &&
     ` <a href="/charts.html">Payments Stats</a>`) ||
   ""
 }
    <button class="remove">
      <img src="./assets/trash.png" width="25" />
    </button>
  </footer>`;
}

export default footerMenu;

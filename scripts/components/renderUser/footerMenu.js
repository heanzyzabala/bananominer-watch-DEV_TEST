function footerMenu() {
  return `<footer>
 ${
   (localStorage.getItem("wu-active") === "true" &&
     ` <a href="/charts.html">Payments History</a>`) ||
   ""
 }
    <button class="remove">
      <img src="./assets/trash.png" width="25" />
    </button>
  </footer>`;
}

export default footerMenu;

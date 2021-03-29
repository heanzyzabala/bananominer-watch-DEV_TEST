export const renderChart = () => {
  document.querySelector(
    ".banano__top.team"
  ).innerHTML = `<a href="/banano.html" style="text-decoration:none">◀️ Return</a>`;
  const dataChart = JSON.parse(localStorage.getItem("chart-data"));
  let userParagraph = document.querySelector(".banano--chart__title");
  userParagraph.innerText = `${dataChart.user.id}'s Earnings`;
  let firstGraph = document.createElement("canvas");
  firstGraph.classList.add("banano--chart");
  document.querySelector(".block--charts__seven").appendChild(firstGraph);
  if (firstGraph && dataChart.payments) {
    userChart(firstGraph, dataChart.payments);
  }
};

const userChart = (canvasChart, data) => {
  let bananoGraph = canvasChart.getContext("2d");
  var chart = new Chart(bananoGraph, {
    type: "line",
    data: {
      labels: data
        .slice(0, 19)
        .reverse()
        .map(
          (item) =>
            `${new Date(item.created_at).getMonth() + 1}/${new Date(
              item.created_at
            ).getDay()}/${new Date(item.created_at).getFullYear()}`
        ),
      datasets: [
        {
          label: "Banano Amount",
          borderColor: "yellow",
          borderWidth: 4,
          data: data
            .slice(0, 19)
            .reverse()
            .map((item) => item.amount),
        },
      ],
    },

    // Configuration options go here
    options: {
      aspectRatio: 1.5,
    },
  });
};

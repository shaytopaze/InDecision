$(() => {

  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [$("#one").html(), $("#two").html(), $("#three").html()],
      datasets: [{
        label: 'Votes:',
        data: [$("#rankOne").html(), $("#rankTwo").html(), $("#rankThree").html()],
        backgroundColor: [
          '#31406B',
          '#999FBF',
          '#504A66',
        ],
      }]
    },
    options: {
      responsive: false,
      tile: {
        display: true,
        text: 'What should I do in my free time?'
      },
      legend: {
        position: 'bottom',
        display: true,
      },
      animation: {
        duration: 4500
      }
    }
  });

  document.getElementById('chartjsLegend').innerHTML = myChart.generateLegend();

}); // end of document ready
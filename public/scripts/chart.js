$(() => {

  var ctx = document.getElementById("myChart").getContext('2d');
//   var textWidth = ctx.measureText(legendItem.text).width,
// width = boxWidth + (fontSize / 2) + textWidth,
// x = cursor.x,
// y = cursor.y;
// y += (ctx.canvas.clientHeight - (itemHeight * me.legendItems.length)) / 2
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [$("#one").html(), $("#two").html(), $("#three").html()],
      datasets: [{
        label: 'Votes:',
        data: [$("#rankOne").html(), $("#rankTwo").html(), $("#rankThree").html()],
        backgroundColor: [
          '#FE5F55', //Sunset Orange
          '#F0B67F', // Mellow Apricot
          '#3C7A89', // Teal Blue
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
        labels: {
          fontSize:25
        }
      },
      animation: {
        duration: 4500
      }
    }
  });

  document.getElementById('chartjsLegend').innerHTML = myChart.generateLegend();

}); // end of document ready
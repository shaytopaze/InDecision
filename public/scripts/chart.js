$(() => {

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Eat", "Sleep", "lol what's 'free time'"],
        datasets: [{
            label: 'Votes:',
            data: [25, 50, 25],
            backgroundColor: [
                '#31406B',
                '#999FBF',
                '#504A66',
            ],
            // borderColor: [
            //     '#413C45',
            //     '#413C45',
            //     '#413C45',
            // ],
            // borderWidth: 1
        }]
    },
    options: {
      responsive: false,
      tile: {
        display: true,
        text: 'What should I do in my free time?'
      },
      legend: {
        // height: '300px',
        position: 'bottom',
        // display: false,
      },
      animation: {
        duration: 5000
      }
    }
});

}); // end of document ready
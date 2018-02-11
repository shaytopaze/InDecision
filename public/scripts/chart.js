$(() => {

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Eat", "Sleep", "lol what's 'free time'"],
        datasets: [{
            label: 'What should I do in my free time?',
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
      duration: 3500,
      responsive: false,
      legend: {
        // height: '300px',
        position: 'bottom',
        // display: false,
      }
    }
});

}); // end of document ready
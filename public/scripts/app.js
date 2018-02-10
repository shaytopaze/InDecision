$(() => {

    $( function sortOptions() {
      $("#sortable").sortable({
        cancel: ".disable-sort"
      });
    });

    $('#voting').on('click',function(e){
      function giveArrayRanking( opt ) {
        var array = [];
        var counter = 1;
        var tempObject = {

        };
        for ( var i = 0; i < opt.length; i++ ) {
          tempObject = {
            id: counter,
            title: $('#TITLE'+i).text(),
            description: $('#DESC'+i).text(),
            poll_id: 100
          }
          array.push(tempObject);
          counter = counter + 1;
        }
        console.log(array);

      }
      var option = $( "li" ).get();
      giveArrayRanking(option);

    });

    $('#testbutton').on('click',function(e){
        $('')
        alert("good");
    });

}); //main document ready ends here






  // giveArrayRanking(option);
  // var test = $("#sortable li").toArray().reverse();
  // console.log(test);

// });







  // The following is dummy code to demonstrate using ajax to access the users route, which we don't use.
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;


//Create ranking system

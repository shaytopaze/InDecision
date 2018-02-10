$(() => {

    $( function sortOptions() {
      $("#sortable").sortable({
        cancel: ".disable-sort"
      });
    });

    $('#voting').on('click',function(e){

        var array = [];
        var counter = 1;


        var allListElements = $( "li" );
        var elements = allListElements.innerHTML;
        console.log(elements);
        var counter = 1;
        $('ul li').each(function(i){
            var title = $(this).attr('title'); // This is your rel value
            var desc = $(this).attr('desc');
            var tempObject;
            tempObject = {
              id: counter,
              title: title,
              desc: desc,
              poll_id: 100
            };

            array.push(tempObject);
            counter = counter + 1;


         });
         console.log(array);
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

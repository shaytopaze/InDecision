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
        // var counter = 1;
        $('ul li').each(function(i){
          console.log($(this).attr('id'));
            var id = $(this).attr('id');
            var title = $(this).attr('title'); // This is your rel value
            var desc = $(this).attr('desc');
            var tempObject;
            tempObject = {
              id: id,
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

  // The following is dummy code to demonstrate using ajax to access the users route, which we don't use.
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;



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
        $('ul li').each(function(i){
          console.log($(this).attr('id'));
            var id = $(this).attr('id');
            var title = $(this).attr('title'); // This is your rel value
            var desc = $(this).attr('desc');
            var poll_id = $(this).attr('poll_id');
            var tempObject;
            tempObject = {
              id: id,
              title: title,
              desc: desc,
              poll_id: poll_id
            };
            array.push(tempObject);
         });
         $.ajax({
          type: 'POST',
          url: '/:pollID/vote',
          data:{id: array},
          success: function(event){
            console.log("Post was successful!")
            console.log(array);
          },
          error:function(err){
            console.log("There was an error posting!");
            console.log(err);
          },
        });
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

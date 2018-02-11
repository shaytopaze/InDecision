$(() => {
  $( function sortOptions() {
    $("#sortable").sortable({
      cancel: ".disable-sort"
    });
  });

  $('#voting').on('click', function(e){
    e.preventDefault();
    var array = [];
    var counter = 1;
    var allListElements = $( "li" );
    var elements = allListElements.innerHTML;
    $('ul li').each(function(i){
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
      data: {id: array},
      success: function(event){
        console.log("Post was successful!");
        // console.log(array);
      },
      error: function(err){
        console.log("There was an error posting!");
        console.log(err);
      }
    });
  });
}); //main document ready ends here


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
});



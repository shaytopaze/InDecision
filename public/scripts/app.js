$(() => {



  // $('#sortable').sortable({
  //   update: function(event, ui) {
  //     var option = $(this).sortable('toArray');
  //     // $.get('update-sort.cfm', {fruitOrder:fruitOrder});
  //   console.log(option);
  //   }
  });

  $('button example id').on('click',function(e){
    $('#sortable').toArray();
  });



  // var $messageEmptyTweet = $('<p>This is working!</p>');
  //   $('.sticky-top').append($messageEmptyTweet);

  // $( function sortOptions() {
      // $("#sortable").sortable({
      //   cancel: ".disable-sort"
 });


  // function giveArrayRanking( option ) {
  //   var array = [];
  //   for ( var i = 0; i < option.length; i++ ) {
  //     array.push(option[i].innerHTML);
  //   }
  //   $( "span" ).text( array.join( " " ) );
  //   console.log (array);
  // }
  // var option = $( "li" ).toArray();

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

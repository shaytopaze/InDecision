$(() => {
  // The following is dummy code to demonstrate using ajax to access the users route, which we don't use.
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
  $.ajax({
     method: "POST",
     url: "/",
     data: {pollID: pollID},
     success: function(result){
       //////////////////////////
       // TODO: REMOVE OR CHANGE
       console.log("it works");
       //////////////////////////
     }
});

//Create ranking system

$(document).ready(function() {
  
  $("#tweet-text").on("keyup", function () {

    let counter = $(this).siblings(".numberLimit").find(".counter")
    const numLimit = 140 - $(this).val().length;
    // console.log($(this).val());

    if( numLimit < 0) {
      return counter.html(numLimit).css("color", "red");
    }

    return counter.html(numLimit).css("color", "black");
  });
});
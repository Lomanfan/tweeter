$(document).ready(function() {
  $("#tweet-text").on("keyup", function () {              //character counter
    let counter = $(this).siblings(".numberLimit").find(".counter")
    const numLimit = 140 - $(this).val().length;
    if( numLimit < 0) {
      return counter.text(numLimit).css("color", "red");
    }
    return counter.text(numLimit).css("color", "black");
  });
  // $(".daysAgo").html(timeago.format(new Date()));  //timeago();
});
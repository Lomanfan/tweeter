
$(document).ready(function () {

  $("#tweet-text").on('keyup', function (event) {

    const numLimit = 140 - $(this).val().length;

    if (numLimit < 0) {
      $(this).siblings(".numberLimit").find(".counter").html(numLimit).addClass("numLimitRed");
    }

    if (numLimit > 0) {
      $(this).siblings(".numberLimit").find(".counter").html(numLimit).removeClass("numLimitRed");
    }

  });
});

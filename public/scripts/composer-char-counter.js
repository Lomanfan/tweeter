
// Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.

//Use this to grab the value of the textarea in question, and determine the length of that input value.

//Adjust your code to render the above result by updating the counter on the page.

//Adjust your code so the counter turns red when invalid; exceed the 140 character limit, the counter should appear red.
//update the counter to become red, but keep in mind that CSS should handle presentation & style while JS logic should handle behavior.


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


//find out length of val, assign this.val to variable

//once we have the legth of val, then subtract from 140

//with updated value, new variable = 140 - val.

//find the counter class via dom traversal
//(see slack)

//update HTML of count class with variable step 3

//(add class, over zero, remove class, add css to the counter)







//input
//The event occurs when an element gets user input

//change
//The event occurs when the content of a form element, the selection, or the checked state have changed (for <input>, <select>, and <textarea>)

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const renderTweets = function (tweets) {
  $(".prepend-tweet").empty();

  for (const tweet of tweets) {
    $(".prepend-tweet").prepend(createTweetElement(tweet));
  };
};

$(document).ready(function () {
  const url = "/tweets";

  $("form").on("submit", function (event) {
    event.preventDefault();

    if ($("#tweet-text").val().length > 140) {
      $("errormsg1").slideDown();
      return;
    }

    if (!$("#tweet-text").val()) {
      $("#errormsg2").slideDown();
      return;
    }

    if ($("#tweet-text").val()) {
      const tweetText = $(this).serialize();
      console.log("text", tweetText);

      $.ajax({
        url,
        method: "POST",
        data: tweetText,
      }).then((result) => {
        $("#errormsg1").slideUp();
        $("#errormsg2").slideUp();
        loadTweets();
        $("#tweet-text").siblings(".numberLimit").find(".counter").html("0");
        $("tweet-text").val("");
      }).catch(err => {
        console.log("ajax POST error", err);
      })
    };
  });

 const loadTweets = () => {
   $.ajax({
     url,
     method: "GET",
   }).then((result) => {
     renderTweets(result);
   }).catch(err => {
     console.log("ajax error caught", err);
   })
 }
 loadTweets();

});

const createTweetElement = function (tweet) {
  const $tweet = `<article class="tweet-container">
  <header class="tweet-header">
    <div>
      <img src="${tweet.user.avatars}" class="avatar">
      <span>${tweet.user.name}</span>
    </div>
    <div>
      <span>${tweet.user.handle}</span>
    </div>
  </header>
  <div class="tweet-body">
    <p>${tweet.content.text}</p>
  </div>
  <footer class="tweet-footer">
    <div>
    <p class="daysAgo"></p>
    </div>
    <div class="tweet-icons">
    <i class="far fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="far fa-heart"></i>
    </div>
  </footer>
</article>`;

return $tweet;
};
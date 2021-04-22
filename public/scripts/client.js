const escape = function (str) {                //prevent XSS with escape
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      $("#errormsg1").slideDown("slow", function() {
        $("#errormsg1").slideUp(3600);
      });
      return;
    }

    if (!$("#tweet-text").val()) {
      $("#errormsg2").slideDown("slow", function() {
        $("#errormsg2").slideUp(3200);
      });
      return;
    }

    if ($("#tweet-text").val()) {
      const tweetText = $(this).serialize();

      $.ajax({
        url,
        method: "POST",
        data: tweetText,
      }).then((result) => {
        loadTweets();
        $(".counter").text(140);         //reset character counter to 140
        $("#tweet-text").val("");        //clear tweet-box
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
      timeago.render(document.querySelectorAll('.daysAgo'));
    }).catch(err => {
      console.log("ajax error caught", err);
    })
  }

  loadTweets();

});

const createTweetElement = function (tweet) {
  const createdOn = new Date(tweet.created_at);
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
    <p>${escape(tweet.content.text)}</p>
  </div>
  <footer class="tweet-footer">
    <div>
    <span class="daysAgo" datetime="${createdOn.toISOString()}"></span>
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
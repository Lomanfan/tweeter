
const escape = function (str) {               //Preventing XSS with Escaping
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
      $("#errormsg1").slideDown();
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
        url: url,
        method: "POST",
        data: tweetText,
      }).then((result) => {
        console.log('ajax callback')
        $("#errormsg1").slideUp();
        $("#errormsg2").slideUp();
        loadTweets()
        $("#tweet-text").siblings(".numberLimit").find(".counter").html("0");
        $("#tweet-text").val("");


      }).catch(err => {
        console.log("ajax POST error.")
        console.log(err);
      })
    };
  });


  const loadTweets = () => {
    $.ajax({
      url: url,
      method: "GET",
    }).then((result) => {
      console.log('ajax callback');
      console.log(result);
      renderTweets(result);
    }).catch(err => {
      console.log('ajax error caught');
      console.log(err);
    })
  }
  loadTweets();
});


const createTweetElement = function (tweet) {
  const today = new Date();
  const createdOn = new Date(tweet.created_at);
  const msInDay = 24 * 60 * 60 * 1000;
  createdOn.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diff = (today - createdOn) / msInDay;

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
      <p>${diff} days ago</p>
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

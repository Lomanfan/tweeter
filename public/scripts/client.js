
const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $(".container").append(createTweetElement(tweet));
  }
};

$(document).ready(function () {

  const url = `/tweets`;

  $("form").on("submit", function (event) {

    event.preventDefault();

    if()

    const tweetText = $(this).serialize();
    console.log("text", tweetText);

    $.ajax({
      url: url,
      method: "POST",
      data: tweetText,
    })
      .done(() => {
        // console.log(data);
        loadTweets();
      })
      .fail((err) => {
        console.log(err.message);
      })
  });

  const loadTweets = () => {
    $.ajax({
      url: url,
      method: "GET",
    })
      .done((data) => {
        // console.log(data);
        renderTweets(data);
      })
      .fail((err) => {
        console.log(err.message);
      })
  };

  loadTweets();

});



const createTweetElement = function (tweet) {

  const today = new Date();
  const createdOn = new Date(tweet.created_at);
  const msInDay = 24 * 60 * 60 * 1000;

  createdOn.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = (today - createdOn) / msInDay;
  console.log(diff);

  const $tweet = `<article class="tweet-container">
    <!---form for buttton or posting to backend, for database-->
    <header class="tweet-header">
      <div>
        <img src="${tweet.user.avatars}" class="avatar">
        <span>${tweet.user.name}</span>
      </div>
      <span>${tweet.user.handle}</span>
    </header>
    <div class="tweet-body">
      <p>${tweet.content.text}</p>
    </div>
    <div>
      <footer class="tweet-footer">
        <p>${diff} days ago</p>
      </footer>
    </div>
  </article>`;

  return $tweet;
};


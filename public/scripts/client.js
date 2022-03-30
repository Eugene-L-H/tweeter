/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweetObj) {
  // construct header with name and handle inside
  console.log('tweetObj.content in createTweet: ', tweetObj.content);
  const tweetContent = tweetObj.content.text;
  const userName = tweetObj.user.name;
  const userHandle = tweetObj.user.handle;
  const postDate = tweetObj.created_at;
  
  // middle section that displays the value from tweet text b ox
  // footer with age of tweet diplayed along with icons.
  const tweetMarkup = `
  <article>
    <header class='tweet'>
      <h3>${userName}</h3>
      <h3 class='user-handle'>${userHandle}</h3>
    </header>
    <main class='tweet'>
      ${tweetContent}
    </main>
    <footer class='tweet'>
      <span>${postDate}</span>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `;
  console.log('Tweet to post: ', tweetMarkup)
  return tweetMarkup;
}

const renderTweets = function(tweets, container) {
  console.log('tweet in renderTweets: ', tweets);
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    container.append(createTweetElement(tweet));
  }
}

// jQuery

$(document).ready(function() {
  const $tweetContainer = $('#tweet-container');
  const $tweetButton = $('.submit-section button');

  // Populate main area with tweets
  renderTweets(data, $tweetContainer);

  // listen for submit from the tweet button
  $tweetButton.on('click', (e) => {
    $tweetContainer.append(createTweetElement());
  });



});

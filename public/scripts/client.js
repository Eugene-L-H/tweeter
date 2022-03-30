/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// tweet should be an article
// header and footer should be included
// add lorem to body
const generateTweet = function(data) {
  // construct header with name and handle inside
  const tweetContent = 'This will be replaced with dynamic data.';
  const userName = 'Fist Last';
  const userHandle = `@${userName}`;
  const postDate = '0 days ago';
  
  // middle section that displays the value from tweet text b ox
  // footer with age of tweet diplayed along with icons.
  const tweet = `
  <article>
    <header>
      <div class='content'>
        <h3>${userName}</h3>
        <h3 class='user-handle'>${userHandle}</h3>
      </div>
    </header>
    <main>
      ${tweetContent}
    </main>
    <footer>
      <span>${postDate}</span>
    </footer>
  </article>
  `;
  return tweet;
}

// jQuery

$(document).ready(function() {
  const $tweetContainer = $('#tweet-container');
  const $tweetButton = $('.submit-section button');

  // listen for submit from the tweet button
  $tweetButton.on('click', (e) => {
    $tweetContainer.append(generateTweet());
  });



});

/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(function() {

  const createTweetElement = function(tweetObj) {
    // Returns custom HTML markup for each tweet
    const tweetContent = tweetObj.content.text;
    const userName = tweetObj.user.name;
    const userHandle = tweetObj.user.handle;
    const postDate = timeago.format(tweetObj.created_at);


    const tweetMarkup = `
    <article>
      <header class='tweet'>
        <h3 class='user-name'>${userName}</h3>
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

    return tweetMarkup;
  }

  const renderTweets = function(tweets, container) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      container.append(createTweetElement(tweet));
    }
  }

  const loadTweets = function() {
    $.ajax({url: '/tweets', method: 'GET', datatype: 'json'})
      .then((result) => {
        renderTweets(result, $('#tweet-container'));
      })
      .catch((error) => console.log(error));
  };

  // Fetch tweets and populate main area
  loadTweets();

  // add an event listener that listens for the submit event
  // prevent the default behaviour of the submit event (data submission and page refresh)
  $('#tweet-form').submit((event) => {
    // Prevent page refresh on submit
    event.preventDefault();
    
    // Serialize tweet to be read by AJAX
    const AJAXtext = $('#tweet-form').serialize();
    
    console.log('AJAXtext: ', AJAXtext);
    
    $.ajax({ url: '/tweets', method: 'POST', data: AJAXtext })
    .then(() => {
      // Clear new tweet text area.
      $('#tweet-text').val('');
      // renderTweets(data, $tweetContainer);
    })
    .catch((error) => {
      console.log("Error :", error);
    });

  });
});

/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(function() {

  const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );

  const createTweetElement = function(tweetObj) {
    // Returns custom HTML markup for each tweet
    const tweetContent = tweetObj.content.text;
    const userName = tweetObj.user.name;
    const userHandle = tweetObj.user.handle;
    const postDate = timeago.format(tweetObj.created_at);


    const tweetMarkup = `
    <article>
      <header class='tweet'>
        <div>
          <img src='${escapeHTML(
            tweetObj.user.avatars
          )}' alt="user avatar" class="info-pic"/>
          <h3 class='user-name'>${escapeHTML(userName)}</h3>
        </div>
        <h3 class='user-handle'>${escapeHTML(userHandle)}</h3>
      </header>
      <main class='tweet'>
        ${escapeHTML(tweetContent)}
      </main>
      <footer class='tweet'>
        <span>${escapeHTML(postDate)}</span>
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
    $(container).empty();
    const newTweetsFirst = tweets.reverse();
    for (let tweet of newTweetsFirst) {
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

  // Clicking on "Write a new tweet" area toggles tweet form
  const $toggle = $('.write-new_tweet');
  const $tweetForm = $('.new-tweet_container');
  const $textArea = $('#tweet-text'); // where user text is entered

  // $tweetForm.toggle(0); // hide new tweet form initially
  $toggle.click(function () {
    $tweetForm.toggle(400);
    $textArea.focus();
    $textArea.val("");
  });

  // Fetch tweets and populate main area
  loadTweets();
  
  // When user clicks "tweet" button
  $('#tweet-form').submit((event) => {
    // Prevent page refresh on submit
    event.preventDefault();
    
    // Serialize tweet to be read by AJAX
    const AJAXtext = $('#tweet-form').serialize();
    
    const $errorBox = $(".error-box").text('').slideUp();
    const $tweetText = $textArea.val();

    // User error messages regarding tweet length
    if ($tweetText.length > 140) {
      return $errorBox
        .slideDown(200)
        .text('⚠ Tweet is too long, streamline your thoughts. Less is more ⚠');
    } else if ($tweetText === '') {
      return $errorBox
      .slideDown(200)
      .text('⚠ That is an empty tweet ⚠');
    }
    
    $.ajax({ url: '/tweets', method: 'POST', data: AJAXtext })
    .then(() => {
      // Clear new tweet text area.
      $('#tweet-text').val('');

      // renderTweets(data, $tweetContainer);
      loadTweets();
      $('.counter').val(140);
    })
    .catch((error) => {
      console.log("Error :", error);
    });

  });
});

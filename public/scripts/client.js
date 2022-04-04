$(document).ready(function() {

  // Escapes user-entered HTML to protect against XSS injections
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

    // HTML for new tweets
    const tweetMarkup = `
    <article>
      <header class='tweet'>
        <div>
          <img src='${
            tweetObj.user.avatars
          }' alt="user avatar" class="info-pic"/>
          <h3 class='user-name'>${userName}</h3>
        </div>
        <h3 class='user-handle'>${userHandle}</h3>
      </header>
      <main class='tweet'>
        ${escapeHTML(tweetContent)}
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
  };

  const renderTweets = function(tweets, container, lastOnly) {
    /* loops through tweets
    calls createTweetElement for each tweet
    takes return value and appends it to the tweets container */
    
    if (lastOnly) {
      container.prepend(createTweetElement(tweets[tweets.length - 1]));
    } else {

      $(container).empty();
      const newTweetsFirst = tweets.reverse();
      for (let tweet of newTweetsFirst) {
        container.append(createTweetElement(tweet));
      }
    }
  };


  const loadTweets = function(lastOnly) {
    // Retrieve tweets from "database" and pass to render function
    $.ajax({url: '/tweets', method: 'GET', datatype: 'json'})
      .then((result) => {
        renderTweets(result, $('#tweet-container'), lastOnly);
      })
      .catch((error) => console.log(error));
  };

  // Clicking on "Write a new tweet" area toggles tweet form
  const $toggle = $('.write-new_tweet');
  const $tweetForm = $('.new-tweet_container');
  const $arrows = $('#down-arrows');
  const $textArea = $('#tweet-text'); // where user text is entered

  // HTML elements to be manipulated for hiding/revealing new-tweet input
  $toggle.click(function() {
    $tweetForm.toggle(400);
    $textArea.focus();
    $textArea.val('');
    $arrows.hide('');

    // Prevent toggle when arrows not visible
    $toggle.css('pointer-events', 'none');
  });

  // Fetch tweets and populate main area
  loadTweets(false);
  
  // When user clicks "tweet" button
  $('#tweet-form').submit((event) => {

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
    
    // Post user's new tweet to "database"
    $.ajax({ url: '/tweets', method: 'POST', data: AJAXtext })
      .then(() => {
        // Clear new tweet text area.
        $($textArea).val('');

        // RenderTweets(data, $tweetContainer);
        loadTweets(true);

        // Reset character counter on new tweet form
        $('.counter').val(140);
      })
      .catch((error) => {
        console.log("Error :", error);
      });

  });
});

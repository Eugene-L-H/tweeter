$(document).ready(function() {
  /* This function calculates the character length of the user input when
  writing a tweet and updates the counter in real time as they type. */

  let max = 140;
  const $counter = $('.counter');
  const $tweetText = $('#tweet-text');

  /* Counter numbers turn red and display a negative value when 
  greater than 140 characters */
  $tweetText.on('input', () => {
    let tweetValue = $tweetText.val();
    let tweetLength = tweetValue.length;

    if (tweetLength > 140) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#57534B');
    }

    $counter.text(max - tweetLength);
  });
});

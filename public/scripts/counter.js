$(document).ready(function() {
  
  let max = 140;
  const $counter = $('.counter');
  const $tweetText = $('#tweet-text');

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

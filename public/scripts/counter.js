$(document).ready(function() {
  const $counter = $('.counter');
  const $tweetText = $('#tweet-text');

  let chars = 140;

  $tweetText.keyup(() => {
    let tweetValue = $tweetText.val();
    let tweetLength = tweetValue.length;

    if (tweetLength > 140) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', 'black');
    }
    
    $counter.text(chars - tweetLength);
  });
});


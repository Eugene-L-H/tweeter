$(document).ready(function() {
  const $counter = $('.counter');
  const $tweetText = $('#tweet-text');

  let chars = 140;

  $tweetText.change(() => {
    let tweetValue = $tweetText.val();
    let tweetLength = tweetValue.length;

    $counter.text(chars - tweetLength); 
  });
});


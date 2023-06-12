/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    console.log('ready client');
    


    const createTweetElement = ({ user, content, created_at }) => {


        return $(`
    <section>
        <article class="tweet">
          <header>
            <img src="${user.avatars}" alt="${user.name} avatar"/>
            <span>${user.name}</span>
            <h5 class="userAt">${user.handle}</h5>
          </header>
          <section>${content.text}</section>
          <footer>
            <span>${timeago.format(created_at)}</span>
            <div class="footer-icons">
              <i id="retweet" class="fas fa-retweet"></i>
              <i id="flag" class="fas fa-flag"></i>
              <i id="heart" class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
    </section>
    `);
    }



    const renderTweets = function (tweets) {

        const container = $('#tweet-container');
        container.html('');
        tweets.forEach(element => {
            const tweet = createTweetElement(element);
            container.append(tweet);
        });


    }

    
    
    $('#sendTweet').click(e => {

        const tweetText = $('#tweet-text').val();

        const form = $('#tweet-form');

        if (tweetText.length === 0) {
            alert('Please enter a tweet');
            return;
        }

        if (tweetText.length > 140) {
            alert('Tweet to long......');
            return;
        }
        const data = form.serialize();

   

        $.ajax({
            type: 'POST',
            data: data,
            url: '/tweets'
        }).then(response => {
            
            loadTweets();
            form.trigger('reset');
        }).catch(err => {
            console.log('error', err);

        });
      

    });


    const loadTweets = () => {

        $.ajax({
            type: 'GET',
            url: '/tweets'
        }).then(response => {
            console.log(response);
            renderTweets(response);
        }).catch(err => {
            console.log(err);
        })
    };

    /**
     * Initial load of tweets
     */
    loadTweets();

});

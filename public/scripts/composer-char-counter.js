$(document).ready(function () {
    // --- our code goes here ---
    console.log('ready');
    
    $('#tweet-text').on('keyup', (e) => {
        const textLimit = 140;
        const value = $(e.target).val();
        const counter = $('#counter');
        counter.html(textLimit-value.length)
        if (textLimit - value.length < 0) {
            counter.addClass('danger')
        } else {
            counter.removeClass('danger')
        }        
    });
});
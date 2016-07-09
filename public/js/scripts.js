(function($){

	$(document).ready(function(){
		var chirpButton = $('.form button');
		chirpButton.addClass('disabled');

		function refresh() {
            $.ajax({
                url: '/tweets',
                crossDomain: true
            }).done(function(response){
                var posts = '';
                response.reverse();
                response.forEach(function(item, index){
                    posts += '<div class="event">';
					posts += '<div class="label">';
					posts += '<img src="http://www.gravatar.com/avatar/290e42f60307822eafadcedd7994f934.jpg?s=50" alt="'+item.author+'">';
					posts += '</div>';
					posts += '<div class="content">';
					posts += '<div class="date">'+moment(item.timestamp).fromNow()+'<span class="ui blue label">'+item.author+'</span></div>';
					posts += '<div class="summary">'+item.tweet+'</div>';
					posts += '</div>';
					posts += '</div>';
                });
                $('.posts').html(posts);

                $('.profile .chirps').text(response.length);
            });
        }

        refresh();

        var maxCount = parseInt($('.count').data('max'));

        $('#post').on('keyup', function(e) {
            var count = $(this).val().length;
            $('.count').text(maxCount - count);

            if (maxCount < count) {
                $('.characters').addClass('red').removeClass('green');
				chirpButton.addClass('disabled');
            } else {
                $('.characters').addClass('green').removeClass('red');
				chirpButton.removeClass('disabled');
            }

			if (!count) {
				chirpButton.addClass('disabled');
			}
        });

        $('form').submit(function(e) {
            e.preventDefault();

            var tweet = {
                author: 'BogdanArvinte',
                tweet: $('#post').val(),
                timestamp: new Date()
            };

            $.ajax({
                url: '/tweets',
                method: 'POST',
                data: tweet
            }).done(function(response) {
                if (response.success) {
                    refresh();
                } else {
                    alert(response.message);
                }

                $('#post').val('');
            });

            // var tweet = $('#post').val();
            // var post = '';

            // post += '<li>';
            // post += '<h4>BogdanArvinte</h4>';
            // post += '<h6>'+new Date()+'</h6>';
            // post += '<p>'+tweet+'</p>';
            // post += '</li>';

            // $('.posts').prepend(post);
            // $('#post').val('');
        });
	});

})(jQuery);

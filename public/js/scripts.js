(function($){

	$(document).ready(function(){
		function refresh() {
            $.ajax({
                url: 'http://localhost:3000/tweets',
                crossDomain: true
            }).done(function(response){
                var posts = '';
                response.reverse();
                response.forEach(function(item, index){
                    posts += '<li>';
                    posts += '<h4>'+item.author+'</h4>';
                    posts += '<h6>'+item.timestamp+'</h6>';
                    posts += '<p>'+item.tweet+'</p>';
                    posts += '</li>';
                });
                $('.posts').html(posts);

                $('.stats span').text(response.length);
            });
        }

        refresh();

        var maxCount = parseInt($('.count').data('max'));

        $('#post').on('keyup', function(e) {
            var count = $(this).val().length;
            $('.count').text(maxCount - count);

            if (maxCount <= count) {
                $('.user-input').addClass('warning');
            } else {
                $('.user-input').removeClass('warning');
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
                url: 'http://localhost:3000/tweets',
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
$(document).ready(function(){
    var topics = ["sunsets","puppies","kittens","back yard barbecues","a day at the beach with friends","fireworks"];
    var counter = 0;
    var gifKey = 'JN3sRoD1lGwkiwpRKuGOqTTYVcUZcHE6';
    for (i=0;i<topics.length;i++){
        var button = $('<button>');
        button.attr('data-'+counter, "item"+counter);
        button.attr('data-offset', 5);
        button.addClass('gif-search');
        button.text(topics[i]);
        $('#gif-buttons').append(button);
        counter++;
    }
    $(document).on('click','.gif-search',function(){
        console.log($(this).get(0).dataset.offset);
        var term = $(this).text();
        var image;
        var imageContainer;
        console.log(term);
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+term+"&api_key="+gifKey+"&offset="+$(this).get(0).dataset.offset+"&limit=5");
        xhr.done(function(data){
            console.log(data);
            var results = data.data;
            for (i=0;i<results.length;i++){
                console.log(results[i].images.original.url);
                image = $('<img>');
                imageContainer = $('<div>');
                imageContainer.addClass('col-12 col-md-4 col-lg-2');
                image.addClass('gif-result');
                image.attr('src',results[i].images.fixed_height_downsampled.url);
                image.attr('data-og',results[i].images.original.url)
                imageContainer.append(image);
                $('.image-wrapper').append(imageContainer);
            }
            setTimeout(function(){
            },100);
        });
        $(this).get(0).dataset.offset = (parseInt($(this).get(0).dataset.offset) + 5);
    });
    $(document).on('click','.gif-result',function(){
        var src = $(this).get(0).dataset.og;
        lbImage = $('#lightbox-image');
        lbImage.attr('src',src);
        $("#gif-lightbox-wrapper").show();
    });
    $(document).on('click','.close-lightbox',function(){
        $("#gif-lightbox-wrapper").hide();
    });
    
});
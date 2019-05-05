$(document).ready(function(){
    var topics = ["sunsets","puppies","kittens","back yard barbecues","a day at the beach with friends","fireworks"];
    var counter = 0;
    var gifKey = 'JN3sRoD1lGwkiwpRKuGOqTTYVcUZcHE6';
    var isRepeatButton = false;
    function addButton(topic){

        $.each($('#gif-buttons .gif-search'), function(){
            console.log($(this));
            if (topic === $(this).text()){
                console.log('topic/text match');
                isRepeatButton = true;
                return false;
            }
        });
        if (!isRepeatButton) {
            var button = $('<button>');
            button.attr('data-'+counter, "item"+counter);
            button.attr('data-offset', 5);
            button.addClass('gif-search');
            button.text(topic);
            $('#gif-buttons').append(button);
            counter++;
        } else {
            console.log('prevented repeat button');
        }
        isRepeatButton = false;
    }
    function addImagesFromLocalStorage(){
        var favorites = JSON.parse(localStorage.getItem('favoriteGiphys'));
        for (i=0;i<favorites.length;i++){
            addImageToContainer('#favorites',favorites[i].favThumbnail,favorites[i].favOg,'gif-result favorite col-6 col-lg-3');
        }
    }
    function addImageToContainer(targetContainer, imgThumb, imgFull, classes){
        image = $('<img>');
        // image.addClass(classes);
        imageContainer = $('<div>');
        imageContainer.addClass(classes);
        image.attr('src',imgThumb);
        image.attr('data-og',imgFull)
        imageContainer.append(image);
        $(targetContainer).prepend(imageContainer);
    }
    function addToFavorites(thumb, og){
        var favorites = $('#favorites');
        addImageToContainer('#favorites',thumb,og,'gif-result favorite col-4 col-lg-3');
        
    }
    function initSlick(target){
        $(target).slick({
            slidesToShow: 1,
            // autoplay: true,
            autoplaySpeed: 3000,
            centerMode: true,
            adaptiveHeight: true,
            centerPadding: '50px',
            variableWidth: true,
        });
    }
    function isRepeatFave(og){
        var faves = JSON.parse(localStorage.getItem('favoriteGiphys'));
        for (i=0;i<faves.length;i++){
            if (faves[i].favOg == og){
                return true;
            }
        }
        return false;
    }
    function removeFavorite(og){
        var faves = JSON.parse(localStorage.getItem('favoriteGiphys'));
        for (i=0;i<faves.length;i++){
            console.log(faves[i].favOg, og)
            if (faves[i].favOg == og){
                console.log('found match');
                console.log(faves)
                faves.splice(i, 1);
                resetLocalStorage('favoriteGiphys',JSON.stringify(faves));
                $.each($("#favorites .gif-result img"),function(){
                    console.log($(this));
                    if ($(this).attr('data-og') === og){
                        $(this).parent().remove();
                    }
                });
            } else {
                console.log('no match');
            }
        }
    }
    function resetLocalStorage(key,newVal){
        localStorage.setItem(key,newVal);
    }
    function setLocalStorage(key,newVal){
        if (localStorage.getItem(key) === null){
            var newProp = [];
            newProp.push(newVal);
            localStorage.setItem(key,JSON.stringify(newProp));
        } else {
            var currentVal = JSON.parse(localStorage.getItem(key));
            currentVal.push(newVal);
            localStorage.setItem(key,JSON.stringify(currentVal));
        }
        console.log(localStorage.getItem('favoriteGiphys'));
    }
    for (i=0;i<topics.length;i++){
        addButton(topics[i]);
    }
    $(document).on('click','.gif-search',function(){
        var imageWrapper = $('.image-wrapper');
        if (imageWrapper.hasClass('slick-slider')) {
            imageWrapper.slick('unslick');
            $('.image-wrapper').attr('style', "opacity: 0");
        }
        console.log($(this).get(0).dataset.offset);
        var term = $(this).text();
        var image;
        var imageContainer;
        console.log(term);
        var xhr = $.get("https://api.giphy.com/v1/gifs/search?q="+term+"&api_key="+gifKey+"&offset="+$(this).get(0).dataset.offset+"&limit=5");
        xhr.done(function(data){
            console.log(data);
            var results = data.data;
            for (i=0;i<results.length;i++){
                console.log(results[i].images.original.url);
                addImageToContainer(".image-wrapper",results[i].images.fixed_height_downsampled.url,results[i].images.original.url,'gif-result');
            }
            setTimeout(function(){
                initSlick('.image-wrapper');
                $('.image-wrapper').attr('style','opacity: 1');
            },100);
        });
        $(this).get(0).dataset.offset = (parseInt($(this).get(0).dataset.offset) + 5);
    });
    $(document).on('click','.gif-result',function(){
        console.log($(this));
        if ($(this).hasClass('favorite')){
            $('.add-favorite').hide();
            $('.remove-favorite').show();
        } else {
            $('.add-favorite').show();
            $('.remove-favorite').hide();
        }
        var src = $(this).children('.gif-result img').get(0).dataset.og;
        console.log(src);
        lbImage = $('#lightbox-image');
        lbImage.attr('src',src);
        lbImage.attr('data-thumbnail',$(this).children('.gif-result img').attr('src'));
        $("#gif-lightbox-wrapper").show();
    });
    $(document).on('click','.close-lightbox',function(){
        $("#gif-lightbox-wrapper").hide();
    });
    $(document).on('click','.add-favorite',function(){
        var favOg = $('#lightbox-image').attr('src');
        var favThumbnail = $('#lightbox-image').get(0).dataset.thumbnail;
        console.log(favOg, favThumbnail);
        if (isRepeatFave(favOg)){
            // 
        } else {
            addToFavorites(favThumbnail, favOg);
            var favorite = {
                favOg,
                favThumbnail
            };
            setLocalStorage('favoriteGiphys',favorite);
        }
    });
    $('#topic-submit').on('click',function(e){
        e.preventDefault();
        addButton($("#topic-add").val());
        $('#topic-add').val('');
    });
    $(document).on('click','.remove-favorite',function(){
        var favOg = $('#lightbox-image').attr('src');
        removeFavorite(favOg);
        $('#gif-lightbox-wrapper').hide();
    });
    if (localStorage.getItem('favoriteGiphys') === null){
        console.log(localStorage);
        localStorage.setItem('favoriteGiphys', '[]');
    } else {
        console.log('yeah');
        addImagesFromLocalStorage();
        // console.log(localStorage)
    }
    
});
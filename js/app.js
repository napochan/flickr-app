var photoArray = [],
    $saveBtn = $('#save');

function likeMe(el) {
    $(el).on('click', function () {
        $(this).toggleClass('selected');
    });
}

function savePhotos(photo) {
    $(photo).each(function () {
        //first push to global var...
        photoArray.push($(this).attr('src'));
        //save locally...
        localStorage.setItem('session', JSON.stringify(photoArray));
    });
}

//Check favourites onload
function checkStorage() {
    if (typeof(Storage) !== 'undefined' && localStorage !== null) {
        var $allImgs = $('.likeMe'),
            allImgsLength = $allImgs.length,
            i;
        for (i = 0; i < allImgsLength; i++) {
            if (JSON.parse(localStorage.getItem('session')).indexOf($allImgs[i].src) !== -1) {
                $allImgs[i].className += ' selected';
            }
        }
    }
}

function cb(data) {
    // use returned data
    var i,
        imgLength = data.items.length,
        htmlBuild = '<ul>';

    for (i = 0; i < imgLength; i++) {
        htmlBuild += '<li><img class="likeMe" alt="' + data.items[i].title + '" src="' + data.items[i].media.m + '">' + '</li>';
    }

    htmlBuild += '</ul>';
    document.getElementById('gallery').innerHTML = htmlBuild;

    likeMe('.likeMe');
    checkStorage();

}

(function () {
    var tags = 'london',
        script = document.createElement('script');

    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
    document.head.appendChild(script);
})();

// Button to save favourites
$saveBtn.on('click', function (e) {
    //First simply clear global var and local storage...
    photoArray = [];
    localStorage.clear();
    savePhotos('.selected');
    e.preventDefault();
});
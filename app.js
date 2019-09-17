const baseURL = 'https://img.youtube.com/vi/'

var resolutions = {defaultThumb:'default.jpg', hqRes:'hqdefault.jpg', mediumRes:'mqdefault.jpg', standardRes:'sddefault.jpg', maxRes:'maxresdefault.jpg'};


const getVideoId = () => {
    var usersURL = document.getElementById('videoURL').value;
    if (getResolution()){
        if (usersURL.includes('youtube.com/watch?v=')) {
            var result = urlWithWatch(usersURL);
            openUrl(result);
        }else if (usersURL.includes('youtu.be')) {
            var result = urlShared(usersURL);
            openUrl(result);      
        }else {
            document.getElementById('result').innerHTML = "Error. Check the URL and try again.";
        }
    }else{
        document.getElementById('result').innerHTML = "Please select a resolution";
    }
    
}

// for youtube links like this: https://www.youtube.com/watch?v=za6tzUIzoXQ
const urlWithWatch = (url) => {
    var indexOfId = url.indexOf('watch?v=') + 8; //index to the first part of the id
    var indexOfAmp = url.indexOf('&'); //index to first char after id. return -1 if not found
    if (indexOfAmp < 0){
        return url.slice(indexOfId);
    }else{
        return url.slice(indexOfId, indexOfAmp);
    }
}

// for youtube links like this: https://youtu.be/za6tzUIzoXQ
const urlShared = (url) => {
    var indexOfId = url.indexOf('youtu.be/') + 9;
    var indexOfAmp = url.indexOf('&');
    if (indexOfAmp < 0){
        return url.slice(indexOfId);
    }else{
        return url.slice(indexOfId, indexOfAmp);
    }
}

const openUrl = (videoId) => {
    var fullURL = `${baseURL}${videoId}/${getResolution()}`;
    window.open(fullURL,'_blank');
}

const getResolution = () => {
    var allRadios = document.getElementsByName('resolution');
    var selectedResolution = Array.from(allRadios).filter(r => r.checked == true);
    if (!selectedResolution.length < 1){
        return resolutions[selectedResolution[0].id];
    }else{
        return false;
    }
}
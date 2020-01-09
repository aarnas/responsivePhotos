var lenght = 10;

ajax_get('https://picsum.photos/v2/list?page=2&limit='+lenght, function(data) {
    for(i = 0; i < lenght; i++){
        var img = new Image(200,200);
        img.src = data[i].download_url;
        img.setAttribute("class", "banner-img");
        img.setAttribute("onClick", "javascript:exportToView('"+data[i].download_url+"',"+data[i].width+","+data[i].height+",'"+data[i].author+"')");
        document.getElementById("img-container").appendChild(img);
    }
});

function exportToView(link,width,height,author) {
    document.getElementById("img-view").innerHTML ="<div id='credit'>Author: "+author+" Width: "+width+" Height: "+height+"</div>";
    var screenW = document.getElementById('pic').clientWidth;
    var screenH = document.getElementById('pic').clientHeight;
    var hToSet =  screenH-document.getElementById('credit').clientHeight; 
    var img = new Image();
    img.src = link;
    img.setAttribute("class", "view-img");
    if(screenW>hToSet){
        if(screenW > screenH && (screenW/width)*height < screenH){
            img.setAttribute("width", screenW);
        }else{
            img.setAttribute("height", hToSet);
        }
    }else{
        if(screenH > screenW && (hToSet/height)*width < screenW){
            img.setAttribute("height", hToSet);
        }else{
            img.setAttribute("width", screenW);
        }
    }
    document.getElementById("img-view").append(img);
}

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
        try {
            var data = JSON.parse(xmlhttp.responseText);
        } catch(err) {
            console.log(err.message + " in " + xmlhttp.responseText);
            return;
        }
        callback(data);
    }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
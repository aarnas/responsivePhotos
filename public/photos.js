var lenght = 10;

ajax_get('https://picsum.photos/v2/list?page=2&limit='+lenght, function(data) {
    for(i = 0; i < lenght; i++){
        var img = new Image(200,200);
        img.src = data[i].download_url;
        img.setAttribute("class", "banner-img");
        img.setAttribute("onClick", "javascript:exportToView('"+data[i].download_url+"',"+data[i].width+","+data[i].height+",'"+data[i].author+"')");
        linebreak = document.createElement("br");
        document.getElementById("img-container").appendChild(img);
        document.getElementById("img-container").appendChild(linebreak);
    }
});

function exportToView(link,width,height,author) {
    document.getElementById("img-view").innerHTML ="<div id='credits'>Author: "+author+" Width: "+width+" Height: "+height+"</div>";
    var screenW = document.getElementById('pic').clientWidth;
    var screenH = document.getElementById('pic').clientHeight;
    var hToSet =  screenH-document.getElementById('credits').clientHeight; 
    var wToSet = screenW;
    var img = new Image();
    img.src = link;
    img.setAttribute("class", "view-img");
    if(wToSet>hToSet){
        if(screenW > screenH && (wToSet/width)*height < screenH){
            img.setAttribute("width", wToSet);
        }else{
            img.setAttribute("height", hToSet);
        }
    }else{
        if(screenH > screenW && (hToSet/height)*width < screenW){
            img.setAttribute("height", hToSet);
        }else{
            img.setAttribute("width", wToSet);
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
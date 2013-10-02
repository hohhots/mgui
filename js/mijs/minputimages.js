var mImages = [];
mImages[0] = "space.png";
mImages[1] = "a.png";
mImages[2] = "r.png";

var imgURL      = "img/";
var fontSize    = 40;   //40,50,60
var fontImgURL  = this.imgURL + "mfonts/m" + this.fontSize + "/";

var el;
try { //IE7
    el = document.createElement("<div></div>");
} catch (e) { //firefox
    el = document.createElement("div");
}
el.style.display = "none";

for(var i = 0, len = mImages.length; i < len; i++){ //preload font images
    var url = fontImgURL + mImages[i];
    try {
        ela = el.appendChild(document.createElement("<img src=\"" + url + "\" />"));
    } catch (e) {
        ela = el.appendChild(document.createElement("img"));
        ela.setAttribute("src", url);
    }
}

url = imgURL + "cursor.gif";
try { //preload cursor
    ela = el.appendChild(document.createElement("<img src=\"" + url + "\" />"));
} catch (e) {
    ela = el.appendChild(document.createElement("img"));
    ela.setAttribute("src", url);
}
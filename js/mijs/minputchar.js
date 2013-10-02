function minputChar_cursor(obj,imgURL){
    this.parent = obj;  // include this parent object 
    this.src    = imgURL + "cursor.gif";
    this.img    = "<img src=\"" + this.src + "\" />";
 
    this.html   = '';
    this.cursorHTML = '';
    
    this.setHTML = function(){
        if(this.html == ''){
            var el = this.parent.getHTML();
            try {
                this.html = el.appendChild(document.createElement("<div></div>"));
                this.cursorHTML = this.html.appendChild(document.createElement(this.img));
            } catch (e) {
                this.html = el.appendChild(document.createElement("div"));
                this.cursorHTML = this.html.appendChild(document.createElement("img"));
                this.cursorHTML.setAttribute("src", this.src);
            }
            this.setHtmlStyle();
        }
        return this.html;
    }

    this.removeHTML = function(){
        this.parent.getHTML().removeChild(this.html);
        this.html = '';
        this.cursorHTML = '';
    }
    
    this.hideHTML = function(){
        YU.Dom.setStyle(this.html, "display", "none");
    }
    
    this.unhideHTML = function(){
        YU.Dom.setStyle(this.html, "display", "");
    }
    
    this.setTop = function(chars,curp){ //chars objects, cursor position
        if(this.html != ''){
        if(chars.length == curp){
            YU.Dom.setStyle(this.html, "top","");
        }else{
            h = chars[curp].getHTML();
            YU.Dom.setY(this.html, YU.Dom.getY(h), true);
        }
        this.parent.getDoor().setTop(this);
        }
    }
    
    this.getHTML = function(){
        return this.html;
    }
    
       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!private function
    
    this.setHtmlStyle = function(){
        //div html
        w = YU.Dom.getStyle(this.parent.getHTML(),"width");
        YU.Dom.setStyle(this.html,"width",w);
        YU.Dom.setStyle(this.html,"height","1px");
        YU.Dom.setStyle(this.html,"z-index","900000");
        YU.Dom.setStyle(this.html,"background-color","#fff");
        
        //cursor image
        YU.Dom.setStyle(this.cursorHTML,"width",w);
        YU.Dom.setStyle(this.cursorHTML,"height","1px");
    }
}
//********************************************************
function minputChar(id,obj){
    this.order     = id;
    this.parent    = obj;  // include this parent object 
    this.top       = 0;
    
    this.img;
    this.html      = '';
    this.fontHTML   = '';
    
    this.setEvent = function(){
        YU.Event.on(this.html, 'mousedown', this.onMouseDown, this, true);
    }
    
    this.onMouseDown = function(ev){
        YU.Event.stopEvent(ev);
        this.parent.onMouseDown(ev);
        reg = YU.Dom.getY(this.html);
        if(Math.ceil(this.img.height/2) > (YU.Event.getPageY(ev) - reg)){
            this.parent.setCurPosition(this.order, true);
        }else{
            this.parent.setCurPosition(this.order + 1, false);
        }
        this.parent.setCursorTop();
    }
    
    this.setOrder = function(id){
        this.order = id;
    }
    
    this.setParent = function(obj){
        if(this.parent != obj){
            try{
                this.removeHTML();
            }catch(e){}
            this.parent = obj;
        }
    }
    
    this.setOrder = function(ord){
        this.order = ord;
    }
    
    this.setImageObj = function(){
        this.img     = new Image();
        this.img.src = this.fsrc;
    }
    
    this.setTop = function(){
        if(this.order == 0){
            this.top = 0;
        }else{
            this.top = this.parent.getCharObj(this.order - 1).getBottom();
        }
    }
    
    this.setTopWithValue = function(val){
        this.top = val;
    }
    
    this.getTop = function(){
        return this.top;
    }
    
    this.getBottom = function(){
        return this.top + this.img.height;
    }
    
    this.removeHTML = function(){
        this.parent.getHTML().removeChild(this.html);
        this.html = '';
    }
    
    this.insertHTML = function(cur){
        this.setHTML();
        YU.Dom.insertBefore(this.html,cur.getHTML());
    }
    
    this.setHTML = function(){
        if(this.html == ''){
            el = this.parent.getHTML();
            try {
                this.html = el.appendChild(document.createElement("<div></div>"));
                this.fontHTML = this.html.appendChild(document.createElement("<img src=\"" + this.fsrc + "\" />"));
            }catch (e) {
                this.html = el.appendChild(document.createElement("div"));
                this.fontHTML = this.html.appendChild(document.createElement("img"));
                this.fontHTML.setAttribute("src", this.fsrc);
            }
            this.setHtmlStyle();
            this.setEvent();
        }
        return this.html;
    }
    
    this.getParent = function(){
        return this.parent;
    }
    
    this.getHTML = function(){
        return this.html;
    }
    
    this.getChar = function(){
        return this.value;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!private function
    
    this.setHtmlStyle = function(){
        //html div style
        w = YU.Dom.getStyle(this.parent.getHTML(),"width");
        YU.Dom.setStyle(this.html,"width",w);
        YU.Dom.setStyle(this.html,"overflow","hidden");
        //YU.Dom.setStyle(this.html,"background-color","#0f0");
        
        //font html style
        YU.Dom.setStyle(this.fontHTML,"position","relative");
        fw = this.parent.getFontSize();
        lp = Math.ceil((fw-parseInt(w))/2);
        YU.Dom.setStyle(this.fontHTML,"left",-lp + "px");
    }
}
//********************************************************
function minputChar_space(fimg){
    this.value   = ' ';

    this.fsrc    = fimg + mImages[0];
    this.setImageObj();
}
//********************************************************
function minputChar_a(fimg){
    this.value     = 'a';

    this.fsrc    = fimg + mImages[1];
    this.setImageObj();
}
//********************************************************
function minputChar_r(fimg){
    this.value     = 'r';

    this.fsrc    = fimg + mImages[2];
    this.setImageObj();
}
//********************************************************
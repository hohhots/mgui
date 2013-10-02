function mInputDoor(minput){
    this.doordiv     = "doordiv"
    this.doorname = "mdoor";
    this.minput = minput;
    this.outhtml;  //html of div 
    this.html;  //html input text object
    
    this.setEvent = function(){
        this.html.blur();   //sure be blur.
        YU.Event.on(this.html, 'focus', this.setBlurEvent, this, true);
        YU.Event.on(this.html, 'keydown', this.keyDown, this, true);
        YU.Event.on(this.html, 'keyup', this.keyUp, this, true);
    }
    
    this.setBlurEvent = function(ev){
        YU.Event.removeListener(this.html, 'blur'); //clear all listener
        foc = this.minput.getFocused();
        foc.unhideCursor();
        YU.Event.on(this.html, 'blur', foc.hideCursor, foc, true);
    }
    
    this.setTop = function(cur){
        h = cur.getHTML();
        YU.Dom.setXY(this.outhtml, YU.Dom.getXY(h), true);
    }
    
    this.setFocus = function(ev){
        try{  
            this.html.focus();
        }catch(e){ //for IE7 only
            YU.Dom.setStyle(this.outhtml, "visibility", "visible");
        }
        this.setValue('');
    }
    
    this.setValue = function(val){
        this.html.value = val;
    }
    
    this.getValue = function(){
        return this.html.value;
    }
    
    this.keyDown = function(ev){ //event function
        kcode = YU.Event.getCharCode(ev);

        if(kcode == 9){
            this.minput.setUnfocus(ev);
            return;
        }
        if((kcode == 37) || (kcode == 38) || (kcode == 39) || (kcode == 40)){
            this.minput.chCurPosition(kcode);
            return;
        }
        if(kcode == 46){
            this.minput.delChar();
            return;
        }
        if(kcode == 8){
            this.minput.backSpaceChar();
            return;
        }
        this.setValue('');
    }
    
    this.keyUp = function(ev){ //event function
        val = this.html.value;
        if(val.length != 1){
            this.setValue('');
            return;
        }
        this.minput.addChar(val);
        this.setValue('');
    }
    
    this.getHTML = function(){
        return this.html;
    }
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!private functions
    
    this.setHTML = function(){  //must insert into panel div
        if(YU.Dom.inDocument(YU.Dom.get(this.doorname))){
            alert("Wrong! already have minputdoor input-text ID = " + this.doorname);
        }
        ph = this.minput.getPanel().getHTML();
        try {
            this.outhtml = ph.appendChild(document.createElement('<div id="' + this.doordiv + '"></div>'));
        } catch (e) {
            this.outhtml = ph.appendChild(document.createElement("div"));
            this.outhtml.setAttribute("id", this.doordiv);
        }
        try {
            this.html = this.outhtml.appendChild(document.createElement('<input id="' + this.doorname + '" type="text" />'));
        } catch (e) {
            this.html = this.outhtml.appendChild(document.createElement("input"));
            this.html.setAttribute("id", this.doorname);
            this.html.setAttribute("type", "text");
        }
        this.html.blur();
        this.setHtmlStyle();
    }     
   
    this.setHtmlStyle = function(){
        YU.Dom.setStyle(this.outhtml, "position", "absolute");
        YU.Dom.setStyle(this.outhtml, "width", "10px");
        try { //IE7
            h = this.outhtml.appendChild(document.createElement('<div></div>'));
            this.outhtml.removeChild(h);
        } catch (e) {//firefox
            //YU.Dom.setStyle(this.outhtml, "visibility", "hidden");
        }
            
        YU.Dom.setStyle(this.html, "width", "10px");
    }    
}
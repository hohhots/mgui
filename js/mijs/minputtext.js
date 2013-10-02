function mInputText(minput,ht){
    this.minput      = minput;
    this.outhtml     = ht;  //inputtext object's out border
    this.inhtml;  //inputtext object's in border
    this.fohtml;  //out div html inputtext object
    this.html;    //div html inputtext object
    this.height   = 150;
        
    this.text        = ' arr '; //initial plain text
    this.charsObj    = [];
    this.cursor      = '';
    this.cursorPosition = -1;

    this.setHTML = function(){
        oh = this.outhtml;
        try {
            ela = oh.appendChild(document.createElement("<div></div>"));
            elb = ela.appendChild(document.createElement("<div></div>"));
            elc = elb.appendChild(document.createElement("<div></div>"));
        } catch (e) {
            ela = oh.appendChild(document.createElement("div"));
            elb = ela.appendChild(document.createElement("div"));
            elc = elb.appendChild(document.createElement("div"));
        }
        this.inhtml = ela;
        this.fohtml = elb;
        this.html   = elc;
        this.setHtmlStyle();
        this.convertText();
    }

    this.setEvent = function(){
        YU.Event.on(this.fohtml, 'mousedown', this.onMouseDown, this, true);
    }

    this.onMouseDown = function(ev){ //event function
        YU.Event.stopEvent(ev);  //stop dom event! Important!
        this.minput.setFocused(this);
        
        YU.Event.on(this.fohtml, 'click', this.setDoorFocus, this, true);
        YU.Event.on(this.fohtml, 'mouseout', this.setDoorFocus, this, true);
    }
    
    this.setDoorFocus = function(ev){ //event function
        this.minput.setDoorFocus();
    }
       
    this.hideCursor = function(){
        this.minput.testResult('cursor - hidden');
        try{
            this.cursor.hideHTML();
        }catch(e){}
    }
    
    this.unhideCursor = function(){
        this.minput.testResult('cursor - unhidden');
        if(this.cursor == ''){
            alert('Wrong! there is no cursor for display!');
        }else{
            this.cursor.unhideHTML();
        }
    }

    this.chCurPosition = function(kc){
        if(kc == 38){ //move up
            this.convertText("upcur");
        }
        if(kc == 40){ //move down
            this.convertText("downcur");
        }
    }
    
    this.setCurPosition = function(ord, down){
        this.cursorPosition = ord;
        if(down == true){
            this.scrollDown();
        }else{
            this.scrollUp();
        }
    }
    
    this.setCursorTop = function(){
        this.cursor.setTop(this.charsObj, this.cursorPosition);
    }

    this.getHTML = function(){
        return this.html;
    }
    
    this.getFontSize = function(){
        return this.minput.getFontSize();
    }
    
    this.getCursor = function(){
        return this.cursor;
    }
    
    this.getDoor = function(){
        return this.minput.getDoor();
    }
    
    this.convertText = function(sta,cha){
        switch(sta){
                case "addcur"://ok
                    this.minput.testResult('text - cursor - add');
                    this.addCur();
                break
                case "delcur"://ok
                    this.minput.testResult('text - cursor - delete');
                    this.delCur();
                break
                case "downcur": //ok
                    this.minput.testResult('text - cursor - down' + this.cursorPosition);
                    this.downCur();
                break
                case "upcur": //ok
                    this.minput.testResult('text - cursor - up' + this.cursorPosition);
                    this.upCur();
                break
                case "addch": //ok
                    this.minput.testResult('text - char - add' + this.cursorPosition);
                    this.addChar(cha);
                break
                case "delch": //ok  
                    this.minput.testResult('text - char - delete' + this.cursorPosition);
                    this.delChar();
                break
                case "bspacech"://ok
                    this.minput.testResult('text - char - backspace' + this.cursorPosition);
                    this.bspaceChar();
                break
                default:
                    this.html.innerHTML = ''; //first clear cursor
                    if(this.text.length != 0){  //then add font divs
                        this.charsObj = this.minput.createCharObj(this,this.text);
                        for(var i=0,ln=this.charsObj.length; i < ln; i++){
                            this.charsObj[i].setHTML();
                            this.charsObj[i].setTop();
                        }
                    }
        }
    }
    
    this.getCharObj = function(num){
        return this.charsObj[num];
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!private function
    
    this.addCur = function(){
        i = this.charsObj.length;
        if(this.cursorPosition == -1){
            this.cursor = new minputChar_cursor(this,this.minput.getImgURL());
            this.cursor.setHTML();
        }
        this.cursorPosition = i;
        this.setCursorTop();
    }

    this.delCur = function(){
        if(this.cursorPosition == -1){
            alert("Wrong! Delete cursor fail, because NO cursor!");
        }else{
            this.cursor.removeHTML();
            this.cursor = '';
            this.cursorPosition = -1;
        }
    }

    this.downCur = function(){
        var pl = this.charsObj.length; //position limit
        if(this.cursorPosition < pl){
            ++this.cursorPosition;
            this.scrollUp();
            this.setCursorTop();
        }
    }
    
    this.upCur = function(){
        if(this.cursorPosition > 0){
            --this.cursorPosition;
            this.scrollDown();
            this.setCursorTop();
        }
    }
    
    this.addChar = function(cha){
        var inschar = this.minput.createCharObj(this,cha)[0];      //create char object

        if(this.cursorPosition == this.charsObj.length){
            this.charsObj[this.charsObj.length] = inschar;
            inschar.insertHTML(this.cursor); //set new char html before cursor html
            ++this.cursorPosition;
        }else{
            this.charsObj.splice(this.cursorPosition,0,inschar); //insert before cursor in object
            inschar.insertHTML(this.charsObj[++this.cursorPosition]); //set new char html before next node
        }
        
        this.setCharsOrder(this.cursorPosition - 1);
        this.scrollUp();
        this.setCursorTop();
    }
    
    this.delChar = function(){
        if(this.cursorPosition < this.charsObj.length){
            this.charsObj[this.cursorPosition].removeHTML();//delete in DOM
            this.charsObj.splice(this.cursorPosition,1);    //delete in chars objects array
            this.setCharsOrder(this.cursorPosition);
            this.setCursorTop();
            this.scrollDel();
        }
    }
    
    this.bspaceChar = function(){
        if(this.cursorPosition > 0){
            this.charsObj[--this.cursorPosition].removeHTML();//delete in DOM
            this.charsObj.splice(this.cursorPosition,1); //delete in chars objects array
            this.setCharsOrder(this.cursorPosition);
            this.setCursorTop();
            this.scrollDel();
            this.scrollDown();
        }
    }
    
    this.scrollUp = function(){
        fohtmlb = this.height; //bottom limit
        htmlt   = parseInt(YU.Dom.getStyle(this.html,"top").replace("px", ""));
        htmlb   = this.charsObj[this.charsObj.length - 1].getBottom();
        chatop = this.charsObj[this.cursorPosition - 1].getTop();
        chaBot = this.charsObj[this.cursorPosition - 1].getBottom();
        
        if((fohtmlb - 2) < (chaBot + htmlt)){
            topd = Math.ceil(fohtmlb/3); //scroll up distance
            if(topd >= (htmlb - chaBot)){
                YU.Dom.setStyle(this.html, "top", (fohtmlb - htmlb - 1));
                return;
            }
            if((chaBot - chatop) > topd){
                YU.Dom.setStyle(this.html, "top", (fohtmlb - chaBot - 1));
                return;
            }
            for(var i = this.cursorPosition, len = this.charsObj.length; i < len; i++){
                if((this.charsObj[i + 1].getBottom() - chaBot) > topd){
                    YU.Dom.setStyle(this.html, "top", (fohtmlb - this.charsObj[i].getBottom() - 1));
                    break;
                }
            }
        }
    }
    
    this.scrollDown = function(){
        fohtmlb = this.height; //bottom limit
        htmlt   = parseInt(YU.Dom.getStyle(this.html,"top").replace("px", ""));
        try{
            htmlb   = this.charsObj[this.charsObj.length - 1].getBottom();
            chatop = this.charsObj[this.cursorPosition].getTop();
            chaBot = this.charsObj[this.cursorPosition].getBottom();
        }catch(e){
            return;
        }

        if((chatop + htmlt) < 2){
            if(this.cursorPosition == 0){ //cursor at first
                YU.Dom.setStyle(this.html, "top", 0);
            }else{ //cursor in chars
                topd = Math.ceil(fohtmlb/3); //scroll down distance
                if(topd > chatop){
                    YU.Dom.setStyle(this.html, "top", 0);
                    return;
                }
                if((chaBot - chatop) > topd){
                    YU.Dom.setStyle(this.html, "top", (- chatop));
                    return;
                }
                for(var i = this.cursorPosition; i > 0; --i){
                    if((chatop - this.charsObj[i - 1].getTop()) > topd){
                        YU.Dom.setStyle(this.html, "top", -this.charsObj[i].getTop());
                        break;
                    }
                }
            }
        }
    }
    
    this.scrollDel = function(){
        fohtmlt = 0;
        fohtmlb = this.height; //bottom limit
        htmlt   = parseInt(YU.Dom.getStyle(this.html,"top").replace("px", ""));
        try{
            htmlb = this.charsObj[this.charsObj.length - 1].getBottom();
        }catch(e){
            return;
        }
        
        
        if(htmlb > fohtmlb){
            if((htmlb + htmlt) > fohtmlb){
                return;
            }else{
                YU.Dom.setStyle(this.html, "top", (fohtmlb - htmlb - 1));
            }
        }else{
            if(htmlt != 0){
                YU.Dom.setStyle(this.html, "top", 0);
            }
        }
        this.setCursorTop();
    }
    
    this.setCharsOrder = function(start){
        try{
            ord = start - 1;   //in add char state
            this.charsObj[ord].setOrder(ord);
        }catch(e){}

        for(var i = start, ln = this.charsObj.length; i < ln; i++){
            this.charsObj[i].setOrder(i);
            if(i == 0){
                val = 0;
            }else{
                val = this.charsObj[i - 1].getBottom();
            }
            this.charsObj[i].setTopWithValue(val);
        }
    }
    
    this.setHtmlStyle = function(){
        fs = this.getFontSize();
        w = Math.ceil((fs/100)*60);
        YU.Dom.setStyle(this.html,"width",w  + "px");
        YU.Dom.setStyle(this.html,"position","relative");
        YU.Dom.setStyle(this.html,"border","0");
        YU.Dom.setStyle(this.html,"background-color","#cca");
        
        YU.Dom.setStyle(this.fohtml,"width",w  + "px");
        YU.Dom.setStyle(this.fohtml,"height", this.height + "px");
        YU.Dom.setStyle(this.fohtml,"cursor","vertical-text");
        YU.Dom.setStyle(this.fohtml,"border","0");
        YU.Dom.setStyle(this.fohtml,"margin","1px 2px 1px 2px");
        YU.Dom.setStyle(this.fohtml,"overflow","hidden");
        YU.Dom.setStyle(this.fohtml,"background-color","#099");
        
        w = w + 2 * parseInt(YU.Dom.getStyle(this.fohtml,"margin-left"));
        YU.Dom.setStyle(this.inhtml,"width",w + 'px');
        YU.Dom.setStyle(this.inhtml,"cursor","default");
        YU.Dom.setStyle(this.inhtml,"border-top","1px #000 solid");
        YU.Dom.setStyle(this.inhtml,"border-right","1px #ccc solid");
        YU.Dom.setStyle(this.inhtml,"border-bottom","1px #ccc solid");
        YU.Dom.setStyle(this.inhtml,"border-left","1px #000 solid");
        
        w = w + (2 * parseInt(YU.Dom.getStyle(this.inhtml,"border-left-width")));
        YU.Dom.setStyle(this.outhtml,"width",w + 'px');
        YU.Dom.setStyle(this.outhtml,"border-top","1px #888 solid");
        YU.Dom.setStyle(this.outhtml,"border-right","1px #fff solid");
        YU.Dom.setStyle(this.outhtml,"border-bottom","1px #fff solid");
        YU.Dom.setStyle(this.outhtml,"border-left","1px #888 solid");
        YU.Dom.setStyle(this.outhtml,"background-color","#fff");
    }
}
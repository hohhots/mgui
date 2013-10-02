function mInputLine(ord, obj){ //this function can just included in minput area
    this.minput;
    this.order    = ord;
    this.parent   = obj;  // include this parent object
    this.minput   = this.parent.getMinput();
    this.html     = '';
    this.height   = 150;
    
    this.charsObj  = [];
    this.cursor    = '';
    this.cursorPosition = -1
    
    this.setHTML = function(){
        if(this.html == ''){
            ph = this.parent.getHTML();
            try {
                ela = ph.appendChild(document.createElement("<div></div>"));
            } catch (e) {
                ela = ph.appendChild(document.createElement("div"));
            }
            this.html = ela;
            this.setHtmlStyle();
            this.setEvent();
        }
        
        this.displayChild();
    }
    
    this.onMouseDown = function(ev){
        YU.Event.stopEvent(ev);  //stop dom event! Important!
        this.minput.setFocused(this);
        
        YU.Event.on(this.html, 'click', this.setDoorFocus, this, true);
        YU.Event.on(this.html, 'mouseout', this.setDoorFocus, this, true);

    }
    
    this.setDoorFocus = function(ev){ //event function
        this.minput.setDoorFocus(ev);
    }
    
    this.convertText = function(sta,cha){
        switch(sta){
                case "addcur"://ok 
                    this.minput.testResult('line - cursor - add');
                    this.addCur();
                break
                case "delcur"://ok
                    this.minput.testResult('line - cursor - delete');
                    this.delCur();
                break
                case "downcur": //ok
                    this.minput.testResult('line - cursor - down' + this.cursorPosition);
                    this.downCur();
                    this.minput.getFocused().setCursorTop();
                break
                case "upcur": //ok
                    this.minput.testResult('line - cursor - up' + this.cursorPosition);
                    this.upCur();
                    this.minput.getFocused().setCursorTop();
                break
                case "leftcur": //ok
                    this.minput.testResult('line - cursor - left' + this.cursorPosition);
                    this.leftCur();
                    this.minput.getFocused().setCursorTop();
                break
                case "rightcur": //ok  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    this.minput.testResult('line - cursor - right' + this.cursorPosition);
                    this.rightCur();
                    this.minput.getFocused().setCursorTop();
                break
                case "addch": //ok
                    this.minput.testResult('line - char - add' + this.cursorPosition);
                    this.addChar(cha);
                    this.parent.putInOneLine(this.order - 1);
                    this.minput.getFocused().setCursorTop();
                break
                case "delch": //ok
                    this.minput.testResult('line - char - delete');
                    this.parent.putInOneLine(this.order - 1, "delch");
                    this.minput.getFocused().setCursorTop();
                break
                case "bspacech"://ok
                    this.minput.testResult('line - char - backspace' + this.cursorPosition);
                    this.parent.putInOneLine(this.order - 1, "bspacech");
                    this.minput.getFocused().setCursorTop();
                break
                default:
                    this.html.innerHTML = ''; //first clear cursor
                    if(this.text.length != 0){  //then add font divs
                        this.charsObj = this.minput.createCharObj(this,this.text);
                        for(var i=0,ln=this.charsObj.length;i<ln;i++){
                            this.charsObj[i].setHTML();
                        }
                    }
        }
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
        if(kc == 37){ //move left
            this.convertText("leftcur");
        }
        if(kc == 38){ //move up
            this.convertText("upcur");
        }
        if(kc == 39){ //move right
            this.convertText("rightcur");
        }
        if(kc == 40){ //move down
            this.convertText("downcur");
        }
    }
    
    this.setCharsObj = function(obj){
        this.charsObj = obj;
        for(i=0,ln=this.charsObj.length; i < ln; i++){
            this.charsObj[i].setParent(this);
            this.charsObj[i].setTop();
        }
    }
        
    this.getCharsObj = function(){
        return this.charsObj;
    }
    
    this.getCharObj = function(num){
        return this.charsObj[num];
    }
    
    this.setCurPosition = function(ord){
        var len = this.charsObj.length
        if(ord <= len){
            this.cursorPosition = ord;
        }else{
            this.cursorPosition = len;
        }
    }
    
    this.setCursorTop = function(){
        this.cursor.setTop(this.charsObj, this.cursorPosition);
    }
    
    this.setOrder = function(id){
        this.order = id;
    }
    
    this.insertCharsObj = function(chars, curp){ //insert chars object; cursor position, 
                                                 //curp = -1 no cursor
        this.charsObj = chars.concat(this.charsObj);
        var ln = this.charsObj.length;
            
        for(i = 0; i < ln; i++ ){
            this.charsObj[i].setParent(this);
            this.charsObj[i].setOrder(i);
            this.charsObj[i].setTop();
        }

        if(curp != -1){
            this.minput.setFocused(this);
            this.setCurPosition(curp);
        }
    }
    
    this.putInOneLine = function(obj){ //obj:next line object
        len = this.charsObj.length;
        chars = obj.getCharsObj();
        curp  = obj.getCurPosition();
        
        this.charsObj = this.charsObj.concat(chars);
        var na = [];
        obj.setCharsObj(na);
        
        if(curp != -1){
            this.minput.setFocused(this);
            this.setCurPosition(len + curp);
        }
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
    
    this.changeStyle = function(name, val){
        YU.Dom.setStyle(this.html, name, val);
    }
    
    this.removeHTML = function(){
        this.parent.getHTML().removeChild(this.html);
    }
    
    this.getCursor = function(){
        return this.cursor;
    }
    
    this.getCurPosition = function(){
        return this.cursorPosition;
    }
   
    this.getFontSize = function(){
        return this.minput.getFontSize();
    }
    
    this.getDoor = function(){
        return this.minput.getDoor();
    }
    
    this.getHTML = function(){
        return this.html;
    }
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!private function
    
    this.createLine = function(){
        var space = -1; //space char before will remove first outer char
        var foc = -1; //first outer char position
        var chars = []; //will remove
        var fcpos = -1; //will remove first outer char
        var curp = -1; //cursor position
        
        var len = this.charsObj.length;

        for(var i = 0; i < len; i++){
            var ch = this.charsObj[i];
            
            if(ch.getChar() == ' '){space = i;}
            if(ch.getBottom() >= this.height){
                foc = i;break;
            }else{
                ch.setParent(this);
            }
        }
        if(foc != -1){
            if((foc == space) || (space == -1)){
                fcpos = foc;
            }else{
                fcpos = space + 1;
            }
            
            if(!this.parent.hasNextLine(this.order)){
                this.parent.addLastLine();  //create new line
            }

            z = 0;
            for(var i = fcpos; i < len; i++ ){  //create will remove chars objects
                chars[z] = this.charsObj[i];
                ++z;
            }
            this.charsObj.splice(fcpos, len - fcpos);//delete array

            if(this.cursorPosition >= fcpos){
                curp = (this.cursorPosition - fcpos);
            }
            this.parent.insertCharsObj((this.order + 1),chars, curp); //add to next line
            this.parent.getLine(this.order + 1).createLine(); //do next create step
        }else{
            while(this.parent.hasNextLine(this.order)){
                this.parent.deleteLine(this.order + 1);
            }
        }
    }
    
    this.setEvent = function(){
        YU.Event.on(this.html, 'mousedown', this.onMouseDown, this, true);
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
    }
 
    this.delChar = function(){
        try{
            this.charsObj[this.cursorPosition].removeHTML();//delete in DOM
        }catch(e){}
        this.charsObj.splice(this.cursorPosition,1);    //delete in chars objects array
    }
    
    this.bspaceChar = function(){
        if(this.cursorPosition > 0){
            try{
                this.charsObj[--this.cursorPosition].removeHTML();//delete in DOM
            }catch(e){}
            this.charsObj.splice(this.cursorPosition,1);    //delete in chars objects array
        }
    }
    
    this.addCur = function(){
        i = this.charsObj.length;
        if(this.cursorPosition == -1){
            this.cursor = new minputChar_cursor(this,this.minput.getImgURL());
            try{
                this.cursor.setHTML();
            }catch(e){}
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
        }else{
            if(this.parent.hasNextLine(this.order)){
                this.minput.setFocused(nl = this.parent.getLine(this.order + 1));
                nl.setCurPosition(0);
            }
        }
    }
    
    this.upCur = function(){
        if(this.cursorPosition > 0){
            --this.cursorPosition;
        }else{
            if(this.parent.hasPreLine(this.order)){
                this.minput.setFocused(nl = this.parent.getLine(this.order - 1));
                nl.setCurPosition(nl.getCharsObj().length);
            }
        }
    }
    
    this.leftCur = function(){
        if(this.parent.hasPreLine(this.order)){
            var cp = this.cursorPosition;
            this.minput.setFocused(nl = this.parent.getLine(this.order - 1));
            nl.setCurPosition(cp);
        }
    }

    this.rightCur = function(){
        if(this.parent.hasNextLine(this.order)){
            var cp = this.cursorPosition;
            this.minput.setFocused(nl = this.parent.getLine(this.order + 1));
            nl.setCurPosition(cp);
        }
    }
    

    this.setHtmlStyle = function(){
        if(this.parent.hasNextLine(this.order)){
            mar = "1px 0 1px 2px";
        }else{
            mar = "1px 2px 01px 2px";
        }
        fs = this.parent.getFontSize();
        w = Math.ceil((fs/100)*60);
        YU.Dom.setStyle(this.html,"width",w  + "px");
        YU.Dom.setStyle(this.html,"height", this.height + "px");
        YU.Dom.setStyle(this.html,"float", "left");
        YU.Dom.setStyle(this.html,"cursor","vertical-text");
        YU.Dom.setStyle(this.html,"border","0");
        YU.Dom.setStyle(this.html,"margin", mar);
        //YU.Dom.setStyle(this.html,"overflow","hidden");
        YU.Dom.setStyle(this.html,"background-color","#cca");
    }
    
    this.displayChild = function(){
        var fh = YU.Dom.getFirstChild();
        
        for(var i = 0, len = this.charsObj.length; i < len; i++){
            var h = this.charsObj[i].setHTML();
            if(i == 0){
                YU.Dom.insertBefore(h,fh);
            }else{
                YU.Dom.insertAfter(h,this.charsObj[i - 1].getHTML());
            }
        }
        if(this.cursor != ''){
            var nh = this.cursor.setHTML();
            try{
                YU.Dom.insertAfter(nh,this.charsObj[i - 1].getHTML());
            }catch(e){}
        }
    }
}
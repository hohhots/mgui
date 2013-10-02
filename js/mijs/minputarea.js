function mInputArea(minput,ht){
    this.minput = minput;
    this.ohtml  = ht;  //inputarea object's out border
    this.html;
    
    this.text        = 'aaa rrr aaa rrr aaa rr'; //initial plain text
    this.charsObj    = [];
    this.cursor      = '';
    this.cursorPosition = -1;
    
    this.linesChange = false;
    this.linenum = 4;  //none scroll bar max line number
    this.lines = [];   //lines number
    
    this.getFontSize = function(){
        return this.minput.getFontSize();
    }

    this.addLastLine = function(){
        num = this.lines.length;
        
        this.lines[num] = new mInputLine(num,this);
        this.lines[num - 1].changeStyle("margin-right", 0);
        this.linesChange = true;
    }
    
    this.deleteLine = function(order){ //delete in order line, reset lines order property
        this.lines[order].removeHTML(); //delete html element
        this.lines.splice(order,1); //delete in objects
        this.setLineOrder(order); //reset lines order value
        this.linesChange = true;
    }
    
    this.insertCharsObj = function(order, chars, curp){ //call this line order; char objects; cursor position
        this.lines[order].insertCharsObj(chars, curp);
    }
    
    this.setLineOrder  = function(order){
        for(var  i = order, ln = this.lines.length; i < ln; i++){
            this.lines[i].setOrder(i);
        }
    }

    this.hasPreLine  = function(order){
        if(--order > -1){
            return true;
        }
        return false;
    }

    this.hasNextLine  = function(order){
        if(++order < this.lines.length){
            return true;
        }
        return false;
    }
    
    this.putInOneLine = function(start, act){ //put all lines from order -1 to one line
        if(start < 0){ start = 0; }
        
        var ln = this.lines[start];
        for(var i = (start + 1), len = this.lines.length; i < len; i++){
            ln.putInOneLine(this.lines[i]);
        }

        switch(act){
            case "delch":
                ln.delChar();
            break
            case "bspacech":
                ln.bspaceChar();
            break
            case "downcur":
                ln.downCur();
            break
            case "upcur":
                ln.upCur();
            break
        }

        ln.setCharsOrder(0);
        ln.createLine();
        
        this.displayChild(start);
        this.setHtmlWidth();
    }
    
    this.getLine = function(order){
        return this.lines[order];
    }
    
    this.getMinput = function(){
        return this.minput;
    }
    
    this.getHTML = function(){
        return this.html;
    }
    
    this.setHTML = function(){
        try {
            ela = this.ohtml.appendChild(document.createElement("<div></div>"));
        } catch (e) {
            ela = this.ohtml.appendChild(document.createElement("div"));
        }
        this.html = ela;
        this.html.innerHTML = '';
        this.lines[0] = new mInputLine(0,this);
        this.convertText();
        this.displayChild(0);
        this.setHtmlStyle();
        this.setHtmlWidth();
    }
    
    this.convertText = function(){
        if(this.text.length != 0){  //then add font divs
            this.charsObj = this.minput.createCharObj(this,this.text);
            this.lines[0].setCharsObj(this.charsObj);
            this.lines[0].createLine();
        }
    }
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!private function
    
    this.displayChild = function(order){
        for(var i = order, len = this.lines.length; i < len; i++){
            this.lines[i].setHTML();
        }
    }

    this.setHtmlWidth = function(){
        if(this.linesChange == true){
            num = this.lines.length;
            h = this.lines[0].getHTML();
            hreg = YU.Dom.getRegion(h);
            if(num > 1){
                w = (num * (hreg.right - hreg.left)) + ((num + 1) * parseInt(YU.Dom.getStyle(h,"margin-left")));
            }else{
                YU.Dom.setStyle(h,"margin-left", "2px");
                YU.Dom.setStyle(h,"margin-right", "2px");
                w = (hreg.right - hreg.left) + (2 * parseInt(YU.Dom.getStyle(h,"margin-left")));
            }
            w1 = w + (2 * parseInt(YU.Dom.getStyle(this.html,"border-left-width")));
            try { //IE7
                h = this.html.appendChild(document.createElement('<div></div>'));
                this.html.removeChild(h);
                w = w + 2;
                w1 = w1 + 2;
            } catch (e) {} //firefox
            YU.Dom.setStyle(this.html,"width",w + 'px');
            YU.Dom.setStyle(this.ohtml,"width",w1 + 'px');
            
            this.linesChange == false;
        }
    }

    this.setHtmlStyle = function(){
        lh = this.lines[0].getHTML();
        reg = YU.Dom.getRegion(lh);
        w = reg.right - reg.left + (2 * parseInt(YU.Dom.getStyle(lh,"margin-left")));
        h = reg.bottom - reg.top  + (2 * parseInt(YU.Dom.getStyle(lh,"margin-top")));
        YU.Dom.setStyle(this.html,"width",w + 'px');
        YU.Dom.setStyle(this.html,"height",h + 'px');
        YU.Dom.setStyle(this.html,"cursor","default");
        YU.Dom.setStyle(this.html,"border-top","1px #000 solid");
        YU.Dom.setStyle(this.html,"border-right","1px #ccc solid");
        YU.Dom.setStyle(this.html,"border-bottom","1px #ccc solid");
        YU.Dom.setStyle(this.html,"border-left","1px #000 solid");
        
        w = w + parseInt(YU.Dom.getStyle(this.html,"border-left-width")) +
                parseInt(YU.Dom.getStyle(this.html,"border-right-width"));
        YU.Dom.setStyle(this.ohtml,"width",w + 'px');
        YU.Dom.setStyle(this.ohtml,"border-top","1px #888 solid");
        YU.Dom.setStyle(this.ohtml,"border-right","1px #fff solid");
        YU.Dom.setStyle(this.ohtml,"border-bottom","1px #fff solid");
        YU.Dom.setStyle(this.ohtml,"border-left","1px #888 solid");
        YU.Dom.setStyle(this.ohtml,"background-color","#fff");
    }
}
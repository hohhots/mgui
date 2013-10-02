function mInputPanel(minput){
    this.panel     = "mpanel"
    this.panelname = "minputpanel";
    this.minput    = minput;
    this.html;  //html back div object 2263

    this.setEvent = function(){
        YU.Event.on(window, 'resize', this.resize, this, true);
        YU.Event.on(window, 'scroll', this.scroll, this, true);
        YU.Event.on(this.html, 'mousedown', this.mouseDown, this, true);
    }
    
    this.getHTML = function(){
        return this.html;
    }
    
    this.resize = function(){
        this.checkPanel();
        vh = YU.Dom.getViewportHeight();
        st = YU.Dom.getDocumentScrollTop();
        YU.Dom.setStyle(this.html,"height", vh + st + 'px');
    }
    
    this.scroll = function(){
        this.checkPanel();
        dh = YU.Dom.getDocumentHeight();
        YU.Dom.setStyle(this.html,"height", dh + 'px');
    }
    
    this.mouseDown = function(ev){
        this.checkPanel();
        this.minput.setUnfocus(ev);
    }

    this.checkPanel = function(){
        bod  = document.getElementsByTagName("body")[0];
        chil = YU.Dom.getChildren(bod);
        di   = YU.Dom.getElementsByClassName(this.panelname, "div");
        if(chil.length > 1){
            alert('Wrong! there is many direct child element in BODY.');
        }
        if(di.length > 1){
            alert('Wrong! there is many DIV element has class = ' + this.panelname);
        }
        if(chil[0] !== di[0]){
            alert('Wrong! the only one direct child element in BODY is not DIV or has no class = ' + this.panelname);
        }        
    }
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!private functions
    
    this.setHTML = function(){
        this.checkPanel();
        body  = document.getElementsByTagName("body")[0];
        this.html = YU.Dom.getFirstChild(body);
        this.setHtmlStyle();
        
    }

    this.setHtmlStyle = function(){
        YU.Dom.setStyle(this.html,"width","100%");
        YU.Dom.setStyle(this.html,"height",YU.Dom.getDocumentHeight() + 'px');
       
        YU.Dom.setStyle(this.html,"position","absolute");
        YU.Dom.setStyle(this.html,"top","0");
        YU.Dom.setStyle(this.html,"background-color","#080");
    }
}
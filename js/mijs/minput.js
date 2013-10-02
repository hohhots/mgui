var globalRun = 0; //global variable

var YU = YAHOO.util;
YU.Event.onDOMReady((x=new mInput()).init,x,true);

function mInput(){

    this.imgURL      = imgURL;
    this.fontSize    = fontSize;
    this.fontImgURL  = fontImgURL;
   
    this.inputtextname = "minputtext";
    this.inputareaname = "minputarea";
    this.inputtest     = true;
    
    this.inputtexts  = [];
    this.inputareas  = [];
    this.test      = '';
    this.door      = '';
    this.panel     = '';
    this.focused   = '';
     
    this.init = function(){
        if(globalRun != 0){return;}
        globalRun++;
        //create elements
        this.setPanel();
        if(this.inputtest){
            this.setTest();
        }
        this.setDoor();
        this.setInputTexts();
        this.setInputAreas();
        this.setBodyStyle();
        
        //set events
        this.panel.setEvent();
        this.door.setEvent();
        for (var i = 0, len = this.inputtexts.length; i < len; i++) {
            this.inputtexts[i].setEvent();
        }
        
        this.panel.checkPanel(); //final check panel again, this line must be at last in this function
    }

    this.setUnfocus = function(ev){ //window click and door blur ocuur
        try{
            this.focused.convertText("delcur"); //delete cursor
        }catch(e){}
        this.focused  = '';
    }

    this.setFocused = function(ob){ //change get focus element,ob is object of minput subclasses
        if(this.focused !== ob){
            try{
                this.focused.convertText("delcur"); //delete cursor
            }catch(e){}
            this.focused  = ob;
        }
        this.focused.convertText("addcur");
    }
    
    this.setDoorFocus = function(ev){
        if(this.focused != ''){
            this.door.setFocus(ev);
        }
    }

    this.chCurPosition = function(kc){
        this.focused.chCurPosition(kc);
    }

    this.addChar = function(val){
        if(val == ''){
            return;
        }
        this.focused.convertText("addch", val);
    }

    this.delChar = function(){
        this.focused.convertText("delch");
        this.door.setValue('');
    }

    this.backSpaceChar = function(){
        this.focused.convertText("bspacech");
        this.door.setValue('');
    }

    this.createCharObj = function(obj,tx){
        objs = new Array();
        tx = new String(tx);

        if(tx.length == 0){alert("Wrong! Can't create object with empty text.");}

        for(i=0,ln=tx.length;i<ln; i++){
            objs[i] = this.charToDiv(i,obj,tx.charAt(i));
        }

        return objs;
    }

    this.charToDiv = function(id,obj,cha){
        fimg = this.fontImgURL;
        nch = new minputChar(id,obj);
        switch(cha){
            case "a":
                minputChar_a.prototype = nch;
                ch = new minputChar_a(fimg);break
            case "b":
                minputChar_b.prototype = nch;
                ch = new minputChar_b(id,obj,fimg);break
            case "c":
                minputChar_c.prototype = nch;
                ch = new minputChar_c(id,obj,fimg);break
            case "d":
                minputChar_d.prototype = nch;
                ch = new minputChar_d(id,obj,fimg);break
            case "e":
                minputChar_e.prototype = nch;
                ch = new minputChar_e(id,obj,fimg);break
            case "f":
                minputChar_f.prototype = nch;
                ch = new minputChar_f(id,obj,fimg);break
            case "g":
                minputChar_g.prototype = nch;
                ch = new minputChar_g(id,obj,fimg);break
            case "h":
                minputChar_h.prototype = nch;
                ch = new minputChar_h(id,obj,fimg);break
            case "i":
                minputChar_i.prototype = nch;
                ch = new minputChar_i(id,obj,fimg);break
            case "j":
                minputChar_j.prototype = nch;
                ch = new minputChar_j(id,obj,fimg);break
            case "k":
                minputChar_k.prototype = nch;
                ch = new minputChar_k(id,obj,fimg);break
            case "l":
                minputChar_l.prototype = nch;
                ch = new minputChar_l(id,obj,fimg);break
            case "m":
                minputChar_m.prototype = nch;
                ch = new minputChar_m(id,obj,fimg);break
            case "n":
                minputChar_n.prototype = nch;
                ch = new minputChar_n(id,obj,fimg);break
            case "o":
                minputChar_o.prototype = nch;
                ch = new minputChar_o(id,obj,fimg);break
            case "p":
                minputChar_p.prototype = nch;
                ch = new minputChar_p(id,obj,fimg);break
            case "q":
                minputChar_q.prototype = nch;
                ch = new minputChar_q(id,obj,fimg);break
            case "r":
                minputChar_r.prototype = nch;
                ch = new minputChar_r(fimg);break
            case "s":
                minputChar_s.prototype = nch;
                ch = new minputChar_s(id,obj,fimg);break
            case "t":
                minputChar_t.prototype = nch;
                ch = new minputChar_t(id,obj,fimg);break
            case "u":
                minputChar_u.prototype = nch;
                ch = new minputChar_u(id,obj,fimg);break
            case "v":
                minputChar_v.prototype = nch;
                ch = new minputChar_v(id,obj,fimg);break
            case "w":
                minputChar_w.prototype = nch;
                ch = new minputChar_w(id,obj,fimg);break
            case "x":
                minputChar_x.prototype = nch;
                ch = new minputChar_x(id,obj,fimg);break
            case "y":
                minputChar_y.prototype = nch;
                ch = new minputChar_y(id,obj,fimg);break
            case "z":
                minputChar_z.prototype = nch;
                ch = new minputChar_z(id,obj,fimg);break
            case "A":
                minputChar_A.prototype = nch;
                ch = new minputChar_A(id,obj,fimg);break
            case "B":
                minputChar_B.prototype = nch;
                ch = new minputChar_B(id,obj,fimg);break
            case "C":
                minputChar_C.prototype = nch;
                ch = new minputChar_C(id,obj,fimg);break
            case "D":
                minputChar_D.prototype = nch;
                ch = new minputChar_D(id,obj,fimg);break
            case "E":
                minputChar_E.prototype = nch;
                ch = new minputChar_E(id,obj,fimg);break
            case "F":
                minputChar_F.prototype = nch;
                ch = new minputChar_F(id,obj,fimg);break
            case "G":
                minputChar_G.prototype = nch;
                ch = new minputChar_G(id,obj,fimg);break
            case "H":
                minputChar_H.prototype = nch;
                ch = new minputChar_H(id,obj,fimg);break
            case "I":
                minputChar_I.prototype = nch;
                ch = new minputChar_I(id,obj,fimg);break
            case "J":
                minputChar_J.prototype = nch;
                ch = new minputChar_J(id,obj,fimg);break
            case "K":
                minputChar_K.prototype = nch;
                ch = new minputChar_K(id,obj,fimg);break
            case "L":
                minputChar_L.prototype = nch;
                ch = new minputChar_L(id,obj,fimg);break
            case "M":
                minputChar_M.prototype = nch;
                ch = new minputChar_M(id,obj,fimg);break
            case "N":
                minputChar_N.prototype = nch;
                ch = new minputChar_N(id,obj,fimg);break
            case "O":
                minputChar_O.prototype = nch;
                ch = new minputChar_O(id,obj,fimg);break
            case "P":
                minputChar_P.prototype = nch;
                ch = new minputChar_P(id,obj,fimg);break
            case "Q":
                minputChar_Q.prototype = nch;
                ch = new minputChar_Q(id,obj,fimg);break
            case "R":
                minputChar_R.prototype = nch;
                ch = new minputChar_R(id,obj,fimg);break
            case "S":
                minputChar_S.prototype = nch;
                ch = new minputChar_S(id,obj,fimg);break
            case "T":
                minputChar_T.prototype = nch;
                ch = new minputChar_T(id,obj,fimg);break
            case "U":
                minputChar_U.prototype = nch;
                ch = new minputChar_U(id,obj,fimg);break
            case "V":
                minputChar_V.prototype = nch;
                ch = new minputChar_V(id,obj,fimg);break
            case "W":
                minputChar_W.prototype = nch;
                ch = new minputChar_W(id,obj,fimg);break
            case "X":
                minputChar_X.prototype = nch;
                ch = new minputChar_X(id,obj,fimg);break
            case "Y":
                minputChar_Y.prototype = nch;
                ch = new minputChar_Y(id,obj,fimg);break
            case "Z":
                minputChar_Z.prototype = nch;
                ch = new minputChar_Z(id,obj,fimg);break
            case " ":
                minputChar_space.prototype = nch;
                ch = new minputChar_space(fimg);break
       }

       return ch;
    }

    this.testResult = function(st){
        try{
            hel = this.test.getHTML();
            val = hel.innerHTML;
            hel.innerHTML = val + '<br />' + st;
        }catch(e){}
    }

    this.getImgURL = function(){
        return this.imgURL;
    }

    this.getFontImgURL = function(){
        return fimg;
    }

    this.getFontSize = function(){
        return this.fontSize;
    }

    this.getFocused = function(){
        return this.focused;
    }

    this.getPanel = function(){
        return this.panel;
    }
    
    this.getDoor = function(){
        return this.door;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!private functions

    this.setInputTexts = function(){
        count = YU.Dom.getElementsByClassName(this.inputtextname, "div");
        this.ifunique(count);
        for (var i = 0, len = count.length; i < len; i++) {
            this.inputtexts[i] = new mInputText(this,count[i]);
            this.inputtexts[i].setHTML();
        }
    }
    
    this.setInputAreas = function(){
        count = YU.Dom.getElementsByClassName(this.inputareaname, "div");
        this.ifunique(count);
        for (var i = 0, len = count.length; i < len; i++){
            this.inputareas[i] = new mInputArea(this,count[i]);
            this.inputareas[i].setHTML();
        }
    }

    this.setDoor = function(){
        this.door = new mInputDoor(this);
        this.door.setHTML();
    }
   
    this.setPanel = function(){
        this.panel = new mInputPanel(this);
        this.panel.setHTML();
    }

    this.ifunique = function(obj){ //sure have no same id
        for (var i = 0, len = obj.length; i < len; i++) {
            for (j = 0; j < len; ++j) {
                if(i != j){
                    if(obj[i].id == obj[j].id){alert("Wrong! has multiple element id = " + obj[i].id);}
                }
            }
        }
    }

    this.setTest = function(){
        this.test = new mInputTest(this);
        this.test.setHTML();
    }
    
    this.setBodyStyle = function(){
        bod  = document.getElementsByTagName("body")[0];
        YU.Dom.setStyle(bod,"margin",0);
    }
}
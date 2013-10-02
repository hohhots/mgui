function mInputTest(minput){
    this.testdiv     = "testdiv"
    this.testname = "mtest";
    this.minput = minput;
    this.html;  //html test object

    this.setHTML = function(){ //must insert into panel div
        if(YU.Dom.inDocument(YU.Dom.get(this.testname))){
            alert("Wrong! already have test ID = " + this.testname);
        }
        
        var ph = this.minput.getPanel().getHTML();
        try {
            var elp = ph.appendChild(document.createElement('<div id="' + this.testdiv + '" style="position:absolute;top:5px;right:5px;width:200px;background-color:#090;color:#fff;"></div>'));
        } catch (e) {
            var elp = ph.appendChild(document.createElement("div"));
            elp.setAttribute("id", this.testdiv);
            elp.setAttribute("style", "position:absolute;top:5px;right:5px;width:200px;background-color:#090;color:#fff;");
        }
        this.html = elp;
    }

    this.getHTML = function(){
        return this.html;
    }
}
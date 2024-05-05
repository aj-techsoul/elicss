function elitable(selector){ 
    var i = 0;
    const self =
    {
        element: document.querySelectorAll(selector),
        length : document.querySelectorAll(selector).length,
        init: (htmlelement) => self.element.forEach((el) => {
            self.initialize(el);
            self.multiselect(el);
            self.search(el);
            self.sort(el);
            self.pagein(el);
            self.scrollin(el);
        }),
        initialize: (htmlelement) => self.element.forEach((el) => {

            if(el.hasAttribute('query')){

                    let eqvla = window.btoa(unescape(encodeURIComponent(el.getAttribute('query'))));
                   el.setAttribute('query',eqvla);
            }

            if(el.closest(".elitable_body")){
                var inits = false;
            }
            else
            {
                var inits = true;
            }

            // console.log(el);
            // console.log(inits);
            // console.log("----");

            // console.log(i);
            var tablehtml_header = '<div class="elitable_container"> <div class="elitable_header"> <div class="g laaa maaa sa1 xs1 s1 valign-c ggap elitable_header_child"></div><input type="search" placeholder="Search" name="q" class="elitable_searchbox" > </div><div class="elitable_body">';
            var tablehtml_footer = '</div><div class="elitable_footer"> <div class="g l1a m1a s1 xs1 ggap-1"><div></div><div class="g ga1a align-fc ggap-2"> <div class="g g1 align-fc"><svg  version="1.1" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="elitable_progress progress-ring" width="30" height="30"><circle class="progress-ring__circle" fill="transparent" r="10" cx="15" cy="15"/></svg></div><div class="elitable_controls"> <i class="elitable_left mdi mdi-chevron-left"></i> <i class="elitable_right mdi mdi-chevron-right"></i> </div><div><span class="elitable_totalshowing">0</span> of <span class="elitable_totalrows">0</span> entries </div></div></div></div></div>';
            
            if(inits){
            el.insertAdjacentHTML('beforebegin', tablehtml_header+tablehtml_footer);
            var eb = document.querySelectorAll(".elitable_body")[i];
            // console.log(eb);
            // console.log(i);
            eb.appendChild(el);
            }
            i++;
        }),
        search: (htmlelement) => self.element.forEach((el) => { 
            var edt_container = el.parentElement.parentElement;
          // Declare variables
          var input, filter, table, tr, td, i, txtValue;        
            
          var settotalrow = function(){
              var i = 0;
              el.querySelectorAll("tbody > tr:not([template])").forEach(atr => {
                //   console.log(atr.style.display);
                  if(atr.style.display!=='none'){
                    i++;   
                  }
              });  
              var elifooter_totalshowing = edt_container.querySelector('.elitable_totalshowing');
              elifooter_totalshowing.innerText = i;
          }

            var inputfield = edt_container.querySelector(".elitable_searchbox");
            inputfield.addEventListener("keyup",function(e){

                            // filter

           filter = inputfield.value.toUpperCase();
           input = inputfield;
           table = el;
           tr = el.querySelectorAll("tbody > tr:not([template])");
      
          // Loop through all table rows, and hide those who don't match the search query
          for (i = 0; i < tr.length; i++) {
              var tds = tr[i].querySelectorAll("td");
              var show = false;
            tds.forEach(td => {
                if (td) {                    
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        show = true;
                    }
                }
            })
            if(show){
                tr[i].style.display = "";
            }
            else
            {
                tr[i].style.display = "none";
            }
          
          }          
            setTimeout(settotalrow,100);
            });

        }),
        sort: (htmlelement) => self.element.forEach((el) => {            
            var ths = el.querySelectorAll("thead th") || el.querySelectorAll("thead td");

            var getCellValue = function(tr, idx){ return tr.children[idx].innerText || tr.children[idx].textContent; }

            var cancelsortingorder = function(idx=""){
                ths.forEach(th => {
                    th.classList.remove('asc');
                    th.classList.remove('desc');
                })
            } 
            var comparer = function(idx, asc) {  

                if(asc){
                    cancelsortingorder();
                    ths[idx].classList.add("asc");
                }
                else
                {
                    cancelsortingorder();
                    ths[idx].classList.add("desc");
                }

                return function(a, b) { return function(v1, v2) {
                    return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
                }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
            }};            
            
            
            if(ths.length > 0){
            var thindex = 0;
            ths.forEach(th =>{
            th.addEventListener("click",function(e) {
                // console.log(e.target.innerText);
                
            var table = el;
            var tblbody = el.querySelector("tbody");
                while(table.tagName.toUpperCase() != 'TABLE') table = table.parentNode;
                Array.prototype.slice.call(tblbody.querySelectorAll('tr:nth-child(n+2)'))
                    .sort(comparer(Array.prototype.slice.call(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                    .forEach(function(tr) { tblbody.appendChild(tr) });                                   

                thindex++;
           })   
           }) 
           }
        }),
        pagein: (htmlelement) => self.element.forEach((el) => {
            var edt_container = el.parentElement.parentElement;
            var total_rows = el.querySelectorAll("tbody tr:not([template])").length;                                   
            var etbl_body = edt_container.querySelector(".elitable_body");                    
            edt_container.querySelector(".elitable_totalrows").innerText = total_rows;
            
                var settotalrow = function(){
                    var i = 0;
                    el.querySelectorAll("tbody > tr:not([template])").forEach(atr => {
                        // console.log(atr.style.display);
                        if(atr.style.display!=='none'){
                            i++;
                        }
                    });  
                    edt_container.querySelector(".elitable_totalshowing").innerText = i;
                }
                
                var updateheight = function(limit){
                    limit = parseInt(limit) + 1;
                     var rowheight = el.querySelector("tbody > tr:not([template])")?.clientHeight;
                     var totalheight = limit * rowheight;
                     // etbl_body.style.maxHeight = totalheight+"px";
                     etbl_body.style.height = "fit-content";
                     settotalrow();
                }
            
                var rowlimit = edt_container.querySelector(".elitable_rowlimit")?.value || 10;
                edt_container.querySelector(".elitable_rowlimit")?.addEventListener("change",function(){
                    rowlimit = this.value;
                    updateheight(rowlimit);
                })                
                updateheight(rowlimit);

        }),
        scrollin: (htmlelement) => self.element.forEach((el) => {
            var edt_container = el.parentElement.parentElement;
            var tablewidth = el.clientWidth;            
            var mobileview = false;
            if(tablewidth <= 800){
                var mobileview = true;
            }
            // console.log(tablewidth);
            var showprogress = function(){

                if(mobileview){
                    var totallenght = edt_container.querySelector(".elitable_body tbody").scrollLeftMax || edt_container.querySelector(".elitable_body tbody").scrollWidth - edt_container.querySelector(".elitable_body tbody").clientWidth;                    
                    var lengthcovered = edt_container.querySelector(".elitable_body tbody").scrollLeft;                    
                    var lcp = lengthcovered / totallenght * 100;
                    // console.log(lcp);
                }
                else
                {
                    var totallenght = edt_container.querySelector(".elitable_body").scrollTopMax || edt_container.querySelector(".elitable_body").scrollHeight - edt_container.querySelector(".elitable_body").clientHeight;
                    var lengthcovered = edt_container.querySelector(".elitable_body").scrollTop;
                    var lcp = lengthcovered / totallenght * 100;
                    // console.log(lcp);
                }

                // console.log(edt_container.querySelectorAll(".elitable_body"));

                //  SVG progressbar
                var circle = edt_container.querySelector('.elitable_progress circle');
                var radius = circle.r.baseVal.value;
                var circumference = radius * 2 * Math.PI;

                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = `${circumference}`;

                function setProgress(percent) {
                const offset = circumference - percent / 100 * circumference;
                circle.style.strokeDashoffset = offset;
                circle.setAttribute("title",Math.round(percent)+"%");
                }

                setProgress(lcp);

                if (lcp < 101 && lcp > -1) {
                    lcp = lcp || 0;
                    setProgress(lcp);
                }                
            }

            

            var scrollit = function(directions){                

                if(mobileview){
                    var rowheight = el.querySelector(".elitable_body tbody tr:not([template])").clientWidth;     
                    // console.log(rowheight);               
                }
                else
                {
                    var rowheight = el.querySelector(".elitable_body tr:not([template])").clientHeight;
                }

                rowheight = rowheight - 1;

                if(directions == 'up'){               
                    if(mobileview){ 
                        edt_container.querySelector(".elitable_body tbody").scrollLeft = edt_container.querySelector(".elitable_body tbody").scrollLeft - rowheight;                    
                    }
                    else{
                        edt_container.querySelector(".elitable_body").scrollTop = edt_container.querySelector(".elitable_body").scrollTop - rowheight;                    
                    } 
                    
                }
                else
                {
                    if(mobileview){
                        edt_container.querySelector(".elitable_body tbody").scrollLeft = edt_container.querySelector(".elitable_body tbody").scrollLeft + rowheight;
                    }
                    else
                    {
                        edt_container.querySelector(".elitable_body").scrollTop = edt_container.querySelector(".elitable_body").scrollTop + rowheight;
                    }
                    
                }
                showprogress();
            }

            edt_container.querySelector(".elitable_controls > .elitable_left").addEventListener("click",function(e){
                scrollit('up');
            })
            edt_container.querySelector(".elitable_controls > .elitable_right").addEventListener("click",function(e){
                scrollit('down');
            })

            
            if(mobileview){
                edt_container.querySelector(".elitable_body tbody").addEventListener("scroll",function(){
                    showprogress();
                })
            }
            else
            {
                edt_container.querySelector(".elitable_body").addEventListener("scroll",function(){
                    showprogress();
                })
            }
            

        }),
        updatenumbers: (htmlelement) => self.element.forEach((el) => {
            var edt_container = el.parentElement.parentElement;

            var settotalrow = function(){
                var i = 0;
                el.querySelectorAll("tbody > tr:not([template])").forEach(atr => {
                    // console.log(atr.style.display);
                    if(atr.style.display!=='none'){
                        i++;
                    }
                });  
                edt_container.querySelector(".elitable_totalshowing").innerText = i;
            }

            setTimeout(function(){
                var totalrows = el.querySelectorAll("tbody tr:not([template])").length;  
                edt_container.querySelector(".elitable_totalrows").innerText = totalrows;
                settotalrow();                
            },1000);
            
        }),
        multiselect: (htmlelement) => self.element.forEach((el) => {
            var edt_container = el.parentElement.parentElement;
            if(edt_container.querySelector("table[multiselect]")){
                var theadcontainer = el.querySelector("thead tr") || el.querySelector("thead");
                var tbodyrows = el.querySelectorAll("tbody tr");
                theadcontainer.insertAdjacentHTML('afterbegin', "<th><input type='checkbox' class='default elitable_multiselect_checkbox' value='all' title='Select All' ></th>");
                tbodyrows.forEach(tbodytd => {                    
                    // console.log(tbodytd.id);
                    var rowid = tbodytd.id.match(/\d+/);
                    tbodytd.insertAdjacentHTML('afterbegin', "<td><input type='checkbox' class='default elitable_multiselect_children' name='elitable_multiselect' value='"+rowid+"' title='Select' ></td>");
                })
//  
                el.querySelector('.elitable_multiselect_checkbox').addEventListener('click',function(e){
                    if(e.target.checked){
                        var o = 0;
                        // console.log("checked all");
                        el.querySelectorAll(".elitable_multiselect_children:not([template])").forEach(tbtd => {
                            if(!tbtd.checked && tbtd.closest("tr").style.display!=="none"){
                                // tbtd.setAttribute("checked","checked");      
                                tbtd.checked = true;
                                o++;
                            }
                        })
                    }
                    else
                    {
                        var o = 0;                        
                        // console.log("deselect all")
                        el.querySelectorAll(".elitable_multiselect_children:not([template])").forEach(tbtd => {                                                        
                            if(tbtd.checked && tbtd.closest("tr").style.display!=="none"){
                                // tbtd.removeAttribute("checked");
                                tbtd.checked = false;
                                o++;                            
                            } 
                        })
                    }
                    
                    // console.log(o);
                    
                })
            }
        }),
        allchecked: (callback) => self.element.forEach((el) => {
            var elitable_checked = "";
            el.querySelectorAll(".elitable_multiselect_children:checked:not([template])").forEach(item => {
                // console.log(item);
                if(item.value!="null"){
                    elitable_checked = elitable_checked+item.value+",";
                }
            })
            elitable_checked = elitable_checked.replace(/(^,)|(,$)/g, "");
            // console.log(elitable_checked);
            callback(elitable_checked);
        }),
        update: (htmlelement) => self.element.forEach((el) => {            
                self.updatenumbers(el);              
        })
        


    }

    return self;
}


                

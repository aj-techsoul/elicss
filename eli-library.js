function eli(selector){
    const self =
    {
        element: document.querySelectorAll(selector),
        length : document.querySelectorAll(selector).length,
        do: (callback) => self.element.forEach((el) => {
            callback(el);
        }),
        on: (event,callback) => self.element.forEach((el) => {
            el.addEventListener(event, callback);
        }),
        append: (htmlelement) => self.element.forEach((el) => {
            el.insertAdjacentHTML('beforeend', htmlelement);
        }),
        prepend: (htmlelement) => self.element.forEach((el) => {
            el.insertAdjacentHTML('afterbegin', htmlelement);
        }),
        appendafter: (htmlelement) => self.element.forEach((el) => {
            el.insertAdjacentHTML('afterend', htmlelement);
        }),
        appendbefore: (htmlelement) => self.element.forEach((el) => {
            el.insertAdjacentHTML('beforebegin', htmlelement);
        }),
        submit : (callback) => esend(selector,function(data){
          //  console.log(data);
          //  document.querySelector('.result').innerHTML = data;
            var tag = 'Success';

            document.querySelector('.result').innerHTML = "";
            //document.querySelector('.result').innerHTML = "<script> window.location.reload(); </script>";
///////
//
var temp = document.createElement("div");
temp.innerHTML = data.result;
var script = temp.getElementsByTagName("script");
if(script[0]){
scriptcontent = script[0].innerHTML;

if(scriptcontent){
  RunScript('.result',scriptcontent);
}
}
///////


        //    var title = data.match("<script>(.*?)</script>")[1];
            // console.log(title);


            if(callback){
              callback(data);
            }


            if(data.result.indexOf(tag) !== -1){
              //  console.log(data.result);
                            //   Materialize.toast(data, 5000,'green');
                const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })

                Toast.fire({
                icon: 'success',
                title: data.result
                })

            }
            else
            {
              
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'error',
                title: data.result
              })

            }


          })


    }

    return self;
}


 function eget(url,format,callback)
 {
       var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
      //return this.responseText;
      var format = format.toUpperCase();
          switch(format){
            case "JSON":
              data = JSON.parse(this.responseText);
            break;
            default:
              data = this.responseText;
            break;
          }
          callback(data);
     }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
 }

  function epost(url,senddata,callback)
 {

       var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
          data = this.responseText;
          if(callback){
          //  data = JSON.parse(data);
            callback(data);
          }
     }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(senddata);
 }

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function esend(formid,callback){

      const form = document.querySelector(formid);
      const url = form.action;
      const files = document.querySelectorAll('[type=file]');
      const formData = new FormData(form);
      const progressbar = document.querySelector('.progress');
      console.log(files.length);
      if(files.length > 0){
        files.forEach((input) => {
          if(!input.classList.contains('swal2-file')){
          
          var fileinputname = input.attributes.name.value;
          for (let i = 0; i < input.files.length; i++) {
            let file = input.files[i];

            formData.append(fileinputname+'[]', file);
          }
        }
        })
      }
      else {
        console.log("No Files");
      }



       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             data = this.responseText;
             if(callback){
              if(isJson(data)){
                data = JSON.parse(data);
              }
              // 
             console.log(typeof data);


              if(typeof data == 'object'){

                var retdata = data.data || null;
                var retresult = data.result || null;
              }
              else
              {
                var retdata = null;
                var retresult = data || null;
              }
              var ret = { 'data':retdata,'result':retresult };
               callback(ret);
             }
          }
        };
       //xhttp.onprogress = updateProgress;
       xhttp.open("POST", url, true);

       if(progressbar){
         xhttp.onprogress = function (e) {
          //  console.log(e);
             if (e.lengthComputable) {
              total = progressbar.attributes.max.value;
              var cdiff = total / e.total;
              var progressvalue = e.loaded * cdiff;

                progressbar.attributes.value.value = progressvalue;
                  // console.log(progressvalue);
                console.log(e.loaded+  " / " + e.total);
             }
         }
       }

       xhttp.onloadstart = function (e) {
          console.log("start")
       }
       xhttp.onloadend = function (e) {
          console.log("end")
          // console.clear();
       }

    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //  console.log(formData);
       xhttp.send(formData);
}

function delrow(field,row){
  Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

    var did = field.getAttribute('data-id');  
    var tbl = field.getAttribute('data-action');
    var action = "p/delrow/"+field.getAttribute('data-action');
    epost(action,'id='+did,function(data){
        // console.log(data);
        var tag = 'Success';

                  // $('.result').html("");
                    
 if(data.indexOf(tag) !== -1){
               console.log(data);
              // hide the row
                    if(row){
                      document.querySelector(row+did).style.display = 'none';
                    }

                const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })

                Toast.fire({
                icon: 'success',
                title: data
                })

            }
            else
            {
              //    Materialize.toast(data, 5000,'red');
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'error',
                title: data
              })

            }


    })
  }
  else
  {
   console.log("You cancelled");
  }
});
}


/* Status Update */
function statusupdate(field){
  var dvalue = field.getAttribute('data-value');
  var id = field.getAttribute('data-id');
  var tbl = field.getAttribute('data-action');


  var action =  "p/STATUS_UPDATE/"+tbl;
  var senddata = 'id='+id+'&status='+dvalue;
  //alert(action);
  epost(action,senddata, function(data){

    data = JSON.parse(data);
    if(data.success){
      var tag = 'Successfully';
      // console.log(data);
        if(data.message.indexOf(tag) != -1){
            switch(dvalue){
                case '1':
                  // make it inactive
                  field.innerHTML = 'Inactive';
                  field.classList.add('red');
                  field.classList.remove('green');
                  field.setAttribute('data-value',0);
                break;
                case '0':
                  // make it active
                  field.innerHTML = 'Active';
                  field.classList.add('green');
                  field.classList.remove('red');
                  field.setAttribute('data-value',1);
                break;
            }
        }
    }    

  });
}


  function editData(field,modal,action){
      var id = field.getAttribute('data-id');
      var uid = field.getAttribute('data-uid');
      var csrf = field.getAttribute('csrf');
      var tbl = field.getAttribute('data-t');
      var editform = document.querySelector(modal+' form');
      editform.reset();

      var senddata = "id="+id+"&csrf="+csrf+"&tbl="+tbl+"&uid="+uid;
     // alert(action);
      epost("API/"+action,senddata, function(data){
          if(data != 'null')
          {
              var data = data;
              data.trim();
              data = data.replace(/\u0/,'');
            //  console.log(data);
              data = JSON.parse(data);
            //  console.log(data.id);
              // reset form values from json object
              if(data.id){
               for (const [name, valu] of Object.entries(data)) {
                  //  console.log(name, valu);

                  var el = editform.querySelectorAll('[name="'+name+'"]');
                //  console.log(el[0]);
                      if(el.length > 0){                        
                          type = el[0].type;

                  switch(type){
                      case 'checkbox':
                          el[0].setAttribute('checked', 'checked');
                          break;
                      case 'radio':
                          for (var i = 0; i < el.length; ++i) {
                              if (el[i].value == valu) {
                                el[i].setAttribute('checked','checked');
                              }
                            } 
                          break;
                      default:
                          el[0].value = valu;
                        break;
                  }
                 }                   
                }
              }

              document.querySelector(modal).classList.add('active');
              UpdateFields();

          }
          else
          {
            // Swal.fire({
            //       position: 'top-end',
            //       type: 'success',
            //       title: 'Unable to load data',
            //       showConfirmButton: false,
            //       timer: 1500
            //     })
          }
        });
    }

function getData(action,senddata='',embedtoid,processto){
    document.querySelector(processto).innerHTML = "<i class='mdi mdi-loading mdi-spin'></i>";
    epost(action,senddata,function(data){
        document.querySelector(embedtoid).innerHTML = data;
        document.querySelector(processto).innerHTML = "";
        //dtables.refresh();
    })
}


  function setFormData(action,formid){
      var form = document.querySelector(formid);
      var id = form.getAttribute('data-id');
      var csrf = form.getAttribute('csrf');
      var tbl = form.getAttribute('data-t');
      var editform = form;
      editform.reset();

      var senddata = "id="+id+"&csrf="+csrf+"&tbl="+tbl;
     // alert(action);
      epost("API/"+action,senddata, function(data){
          if(data)
          {
              var data = data;
              data.trim();
              data = data.replace(/\u0/,'');
             console.log(data);
              data = JSON.parse(data);
             console.log(data.id);
              // reset form values from json object
              if(data.id){
               for (const [name, valu] of Object.entries(data)) {
                   console.log(name, valu);

                  var el = editform.querySelectorAll('[name="'+name+'"]');
                 console.log(el[0]);
                      if(el.length > 0){                        
                          type = el[0].type;

                  switch(type){
                      case 'checkbox':
                          el[0].setAttribute('checked', 'checked');
                          break;
                      case 'radio':
                          for (var i = 0; i < el.length; ++i) {
                              if (el[i].value == valu) {
                                el[i].setAttribute('checked','checked');
                              }
                            } 
                          break;
                      default:
                          el[0].value = valu;
                        break;
                  }
                 }                   
                }
              }

            //  document.querySelector(modal).classList.add('active');
              UpdateFields();

          }
          else
          {
            Swal.fire({
                  position: 'top-end',
                  type: 'success',
                  title: 'Unable to load data',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
        });
    }





function updatetrtd(data,container="table.edt > tbody",rowid=""){
    var data = data.data;

    if(rowid){
        // alert("update");
        //update
        var tcontainer = document.querySelector(container+" "+rowid);
        var tmpl = document.querySelector(container+' tr[template]').innerHTML;
        setData(data,tmpl,tcontainer,false);
       
    }
    else
    {
        //add new
        var tcontainer = document.querySelector(container);
        var tmpl = tcontainer.querySelector(" tr[template]").outerHTML;
        setData(data,tmpl,tcontainer,true);
    }
}

function modalSubmit(formid,options,callback){
      
      
    let formdom = document.querySelector(formid);
    var modalid =  modalid || options?.modalid || "#"+formdom.closest('.modal.active').id;
    
    var  rowcolumn = options?.rowcolumn?.name || 'id';
    var  tablebody = options?.tablebody || 'table.edt > tbody';

    if(formdom.querySelector("[name="+rowcolumn+"]") && formdom.querySelector("[name="+rowcolumn+"]").value){
    // do changes in the table
    
    
    // console.log(rowcolumn);

    var fieldid = formdom.querySelector("[name="+rowcolumn+"]").value || null;  
    var rowid = options?.rowid || "#row"+fieldid;
    }

    formvalidate(formid) ? eli(formid).submit(function(data){
        // console.log(data);
        var tag = 'Success';
        if(data.result.indexOf(tag) !== -1){
            // Successfull

            if(document.querySelector("table.edt tr"+rowid)){
                // change
                var trrow = document.querySelector("table.edt tr"+rowid);
                var rowdata = data.data;
                // console.log(rowdata);
                updatetrtd(data,'table.edt > tbody',rowid);
                // todo: get the row head,for loop create tds and replace with rowida
                
            }
            else
            {
                // add a row
                updatetrtd(data);
            }
 
            // just close the modal
            modal(modalid,'close');

        }
        else{
            // not successfull
        }

      if(callback){
        callback();
      }        
    }) : console.log("Form not filled properly");
}


async function fetchData(url,callback) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    
    if(callback){
      callback(data);
    }
    return data;
    } catch (error) {
    console.error('Fetch error:', error);
  }
}

    //  SSE
    async function eliLive(url,container,embed=true,callback,runonnew){
        var runonnew = runonnew || true;
        var csrf = await fetchData("API/currentcsrf");
        if (typeof EventSource !== "undefined") {
            var source = new EventSource(url+"?csrf="+csrf);
            source.onmessage = function(event) {
              var jsondata = JSON.parse(event.data);
              if(runonnew===true && jsondata.status==='new'){
                if(document.querySelector(container)){
                  if(embed){
                      document.querySelector(container).innerHTML = atob(jsondata.message);
                   }
                   else
                   {
                      document.querySelector(container).insertAdjacentHTML('afterend',atob(jsondata.message));
                   } 
                 }
               }

               if(runonnew === false){
                if(document.querySelector(container)){
                  if(embed){
                      document.querySelector(container).innerHTML = atob(jsondata.message);
                   }
                   else
                   {
                      document.querySelector(container).insertAdjacentHTML('afterend',atob(jsondata.message));
                   } 
                 }
               }
               


               if(callback){
                  callback(atob(jsondata.message),jsondata);
                }
            };


            

          } else {
            console.error("Sorry! your browser is not updated, Kindly use SSE enabled browser.");
          }
    }

    //  SSE Table
    async function eliTableUpdate(tblelement,embed=true,callback,runonnew){
        var tedt = document.querySelector(tblelement);
        var container = tedt.querySelector('tbody') || null;
        var query = tedt.getAttribute('query') || null;
        var url = "v/tbldata/"+query+"/";
        // console.log(template);
        var runonnew = runonnew || true;
        var csrf = await fetchData("API/currentcsrf");
        if (typeof EventSource !== "undefined") {
            var source = new EventSource(url+"?csrf="+csrf);
            source.onmessage = function(event) {
              var jsondata = JSON.parse(event.data);
              if(runonnew===true && jsondata.status==='new'){
                if(container){
                  if(embed){
                      container.innerHTML = atob(jsondata.message);
                   }
                   else
                   {
                      container.insertAdjacentHTML('afterend',atob(jsondata.message));
                   }
                 }
               }

               if(runonnew === false){
                if(container){
                  if(embed){
                      container.innerHTML = atob(jsondata.message);
                   }
                   else
                   {
                      container.insertAdjacentHTML('afterend',atob(jsondata.message));
                   } 
                 }
               }
               


               if(callback){
                  callback(atob(jsondata.message),jsondata);
                }

                elitable(tblelement).updatenumbers(tblelement);

            };
          } else {
            console.error("Sorry! your browser is not updated, Kindly use SSE enabled browser.");
          }
    }


  async function eliLiveX(url,container,embed=true,callback){
        if (typeof EventSource !== "undefined") {
            var source = new EventSource(url);
            source.onmessage = function(event) {
              var jsondata = JSON.parse(event.data);
              if(document.querySelector(container)){
                if(embed){
                    document.querySelector(container).innerHTML = atob(jsondata.message);
                 }
                 else
                 {
                    document.querySelector(container).insertAdjacentHTML('afterend',atob(jsondata.message));
                 } 
               }

               if(callback){
                  callback(atob(jsondata.message),jsondata);
                }
            };

          
          } else {
            console.error("Sorry! your browser is not updated, Kindly use SSE enabled browser.");
          }
    }



function wizardSubmit(formid,nextTabhref,options,callback){

    let formdom = document.querySelector(formid);
    // var modalid =  modalid || options?.modalid || "#"+formdom.closest('.modal.active').id;
    
    var  rowcolumn = options?.rowcolumn?.name || 'id';

    if(formdom.querySelector("[name="+rowcolumn+"]") && formdom.querySelector("[name="+rowcolumn+"]").value){
    // do changes in the table
    
    
    // console.log(rowcolumn);

    var fieldid = formdom.querySelector("[name="+rowcolumn+"]").value || null;  
    var rowid = options?.rowid || "#row"+fieldid;

    }

    formvalidate(formid) ? eli(formid).submit(function(data){
        console.log(data);
        var tag = 'Success';
        if(data.result.indexOf(tag) !== -1){
            // Successfull
            if(nextTabhref){
              tabActive(nextTabhref);
            }
            else
            {
              console.log("");

            }            

        }
        else{
            // not successfull
            console.log("Failed to Success");
        }

      if(callback){
        callback();
      }        
    }) : console.log("Form not filled properly");

}

//  Process Btn
function processSubmit(formid) {
  var currentbtn = event.target;  
      console.log('Analyzing '+formid);
      var form = document.querySelector(formid);
      var required =  document.querySelectorAll(formid+" [required] ");
  //  console.log(required);
      console.log(required.length +  " Required fields found");
  //  console.log(required);
      var checked = 0;
    if(required.length > 0){
      var i = 0;
      required.forEach((field) => {
        var x = field;

        console.log(required[i].validity.valid);
        if(required[i].validity.valid == false || checkvalidity(required[i]) == false ){
          required[i].validationMessage = " Please fill "+field.getAttribute('label');
          //console.log(i+" Please fill "+field.getAttribute('label'));
          if(required[i].offsetParent){
          required[i].offsetParent.style.borderColor = 'red';
          }
          x.addEventListener('change', function(e) {
            console.log(e.target.validity.valid);

            var inp = e.target;
            if(inp.validity.valid == false  || checkvalidity(inp) == false ){
                inp.validationMessage = " Please fill "+field.getAttribute('label');
                inp.offsetParent.style.borderColor = 'red';
              }
              else {
                  inp.offsetParent.style.borderColor = 'green';
              }
          });

        }
        else {
          //console.log("filled "+ field.value);
            if(required[i].offsetParent){
              required[i].offsetParent.style.borderColor = 'green';
            }

              checked = checked+1;
        }
        i++;
      })
      form.reportValidity();
    }

    // console.log(required.length + " : " + checked);
    if(required.length == checked){
      currentbtn.classList.add("processbtn");
      eli(formid).submit(doneBTN);
    }

}

function doneBTN(data=""){
              var tag = "Success";
              var tag2 = "success";

              if(data.result.indexOf(tag) !== -1 || data.result.indexOf(tag2) !== -1){

                const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })

                Toast.fire({
                icon: 'success',
                title: data.result
                })

                var type = "success";


            }
            else
            {
              
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'error',
                title: data.result
              })


              var type = "fail";
            }

// ===================


  document.querySelector(".processbtn")?.classList.add("donebtn");
  document.querySelector(".processbtn")?.classList.add(type);  
  document.querySelector(".processbtn")?.classList.remove("processbtn");  

  setTimeout(function(){
    document.querySelector(".donebtn")?.classList.remove(type);  
    document.querySelector(".donebtn")?.classList.remove("donebtn");
    document.querySelector(".modal.active").classList.remove('active');
  },3000)
}

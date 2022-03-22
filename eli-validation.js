/// Form Validation

function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if((inputtxt.value.match(phoneno)))
        {
          return true;
        }
      else
        {
          return false;
        }
}

function checkvalidity(inp){
  switch(inp.type){
    case "tel":
      var vvalid = phonenumber(inp);
    break;
    default:
      var vvalid = true;
    break;
  }

  return vvalid;
}


//Required eli_scripts
function validSubmit(formid){
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

    console.log(required.length + " : " + checked);
    if(required.length == checked){
      eli(formid).submit();
    }

}
/* Validator */

// 
// only check validation
function formvalidate(formid){
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

    // console.log(required[i].validity.valid);
    if(required[i].validity.valid == false || checkvalidity(required[i]) == false ){
      required[i].validationMessage = " Please fill "+field.getAttribute('label');
      //console.log(i+" Please fill "+field.getAttribute('label'));


          if(required[i].hasAttribute("multiple")){
          let selcont = required[i].parentElement;
          let selcont2 = selcont.querySelector('.eli-searchable-select-tag-options');
          selcont2.style.borderBottom = '2px solid green';
          }
          else
          {
            let selcont = required[i].parentElement;
           let selcont2 = selcont; 
           selcont2.style.border = '2px solid green';
          }

      if(required[i].offsetParent){
      required[i].offsetParent.style.borderColor = 'red';
      }
      x.addEventListener('change', function(e) {
        console.log(e.target);

        var inp = e.target;
        if(inp.validity.valid == false  || checkvalidity(inp) == false ){
          console.log('122'+inp);
            inp.validationMessage = " Please fill "+field.getAttribute('label');
            inp.offsetParent.style.borderColor = 'red';
          }
          else {
              inp.offsetParent.style.borderColor = 'green';
          }


          //  select
    if(inp.classList.contains("eli-searchable-select")){
        if(inp.validity.valid == false  || checkvalidity(inp) == false ){
          let selcont = inp.parentElement;
          

          if(required[i].hasAttribute("multiple")){
          let selcont2 = selcont.querySelector('.eli-searchable-select-tag-options');
          selcont2.style.borderBottom = '2px solid red';
          }
          else
          {
           let selcont2 = selcont; 
           selcont2.style.border = '2px solid red';
          }

        }
        else
        {
          let selcont = inp.parentElement;

          if(required[i].hasAttribute("multiple")){
          let selcont2 = selcont.querySelector('.eli-searchable-select-tag-options');
          selcont2.style.borderBottom = '2px solid green';
          }
          else
          {
           let selcont2 = selcont; 
           selcont2.style.border = '2px solid green';
          }
        }
        
        // console.log(selcont);
        // selcont.querySelector(".mdi").classList.add("red-text");
      }


      });

    }
    else {
      //console.log("filled "+ field.value);

                //  select
    if(required[i].classList.contains("eli-searchable-select")){
          let selcont = required[i].parentElement;

          if(required[i].hasAttribute("multiple")){
          let selcont2 = selcont.querySelector('.eli-searchable-select-tag-options');
          selcont2.style.borderBottom = '2px solid green';
          }
          else
          {
           let selcont2 = selcont; 
           selcont2.style.border = '2px solid green';
          }

          
      }


        if(required[i].offsetParent){
          required[i].offsetParent.style.borderColor = 'green';
        }

          checked = checked+1;
    }
    i++;
  })
  form.reportValidity();
}

console.log(required.length + " : " + checked);
  if(required.length == checked){
    return true;
  }
  else
  {
    return false;
  }
}
//

/* No Validation */
function eliSubmit(formid){
  eli(formid).submit();
}

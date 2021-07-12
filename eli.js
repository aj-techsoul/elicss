/* EliCSS Framework : 3.8 */

var currentScriptPath = function () {

    var scripts = document.querySelectorAll( 'script[src]' );
    var currentScript = scripts[ scripts.length - 1 ].src;
    var currentScriptChunks = currentScript.split( '/' );
    var currentScriptFile = currentScriptChunks[ currentScriptChunks.length - 1 ];

    return currentScript.replace( currentScriptFile, '' );
}

var currentPath = function (){
    return currentScriptPath().replace(window.location.href,'');
}

let jspath = currentPath();
// let jspath = "https://cdn.jsdelivr.net/gh/AJ-TechSoul/ELICSS@3.7.2/";

function toast(){
  let body = document.body;
  var script = '<div class="toast result"></div>'
  body.innerHTML += script;
  console.log('Eli: Site Ready!');
}

function RunScript(selector,jsscript){
  target = document.querySelector(selector);
  var newScript = document.createElement("script");
  var inlineScript = document.createTextNode(jsscript);
  newScript.appendChild(inlineScript);
  target.appendChild(newScript);
}

async function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var body = document.body;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    if(url.search("shoelace") > 0){
      script.type = "module";
    }

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    body.appendChild(script);
}

async function loadCSS(url)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var body = document.body;
    var script = document.createElement('link');
    script.rel = 'stylesheet';
    script.href = url;

    // Fire the loading
    head.appendChild(script);
}

async function checkmobility(){
  /* Responsive */
  var meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  if(!document.querySelector('meta[name=viewport]')){
    eli('head').prepend(meta);
  }
  /* Favicon */
  var favicon = "assets/img/logo.png";
  var favlink = '<link rel="icon" type="image/png" href="'+ jspath +'logo.png">';
  var favlink2 = '<link rel="icon" type="image/png" href="'+favicon+'">';

  if(!document.querySelector('link[rel=icon]')){
   var http = new XMLHttpRequest();
    http.open('GET', favicon, false); 
    http.send(); 
    // console.log(http);

    if (http.status === 200) { 
      eli('head').prepend(favlink2);
     }
     else
      {
        eli('head').prepend(favlink);
      }
  }
}

      toast();      
      

        // CSS
        loadCSS(jspath+"eli-grid.css");     
        loadCSS(jspath+"eli-helpers.css");
        loadCSS(jspath+'eli-forms.css');
        loadCSS(jspath+"eli-components.css");
        loadCSS(jspath+"eli-carousel.css");
        loadCSS(jspath+"mdi/css/animate.css");
        loadCSS(jspath+"mdi/css/materialdesignicons.min.css");
        loadCSS(jspath+"swal/sweetalert2.min.css");

        // JavaScript
        loadScript(jspath+"swal/sweetalert2.all.min.js");
        loadScript(jspath+"eli-library.js");              
        loadScript(jspath+'eli-forms.js');
        loadScript(jspath+"eli-grid.js");
        loadScript(jspath+"eli-helpers.js");
        loadScript(jspath+"eli-validation.js");
        loadScript(jspath+"eli-components.js");
        loadScript(jspath+"eli-datatemplating.js");
        loadScript(jspath+"eli-image.js");
        loadScript(jspath+"eli-carousel.js");


window.addEventListener('load', async function(){
    new elislider();
    new dataTables('.dt');
    new eselect('.eselect');
    new eselect('.etags',{ 
          taggable:true 
        });
    new eselect('.etag',{ 
          taggable:true, 
          maxSelections: 1
        });


    //  Custom Code
    if(document.querySelector('.input-field')){ 
          document.querySelectorAll('.input-field > label').forEach( function(item, index) {
            item.classList.add('active');
          });
          //setTimeout(UpdateFields,3000);
      }

   await checkmobility();
});

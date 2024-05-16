/* EliCSS Framework : 4.3.3 */

const currentScriptPath = () => {
  const scripts = document.querySelectorAll('script[src]');
  const currentScript = scripts[scripts.length - 1].src;
  const isCDN = currentScript.includes('cdn.jsdelivr.net') || currentScript.includes('unpkg.com') || currentScript.includes('npm');
  if (isCDN) {
    return currentScript.split('@')[0];
  }
  const currentScriptChunks = currentScript.split('/');
  const currentScriptFile = currentScriptChunks.pop();
  return currentScript.slice(0, -currentScriptFile.length);
}

const currentPath = () => {
  const currentPath = currentScriptPath().slice(location.origin);
  return currentPath+"/";
}

const jspath = currentPath();


// XHR Fixed

if ('XMLHttpRequest' in window) {
  const xhr = new XMLHttpRequest();

  if(xhr.withCredentials !== undefined) {
    // Use XMLHttpRequest
    // console.log('Using XMLHttpRequest');
  } else {
    // Use fetch
    console.log('Using fetch');

    constWithCredentials = (url, options = {}) => {
      options.credentials = 'include';
      return fetch(url, options);
    };

    // Override XMLHttpRequest with fetch
    window.XMLHttpRequest = function() {
      return {
        open: function(method, url, async, user, password) {
          const options = {
            method,
            headers: {
              'Content-Type': 'application/x-www-formurlencoded'
            }
          };

          if (arguments.length > 3) {
            options.body = user + ':' + password;
            }

          return new Promise((resolve, reject) => {
           WithCredentials(url, options)
              .then(response => {
                if (response.ok) {
                  resolve(response);
                } else {
                  reject( Error('HTTP error ' + response.status));
                }
              })
              .catch(error => reject(error));
          });
        },

        send: function() {
          // nothing
        },

        getAllHeaders: function() {
          // Return empty string
          return '';
        },

        getResponse: function() {
          // Return null
          return null;
        },

        onreadystatechange: function() {
          // Do nothing
        },

        readyState: 4,

        status: 200,

        statusText: 'OK'
      };
    };
  }
} else {
  // Use fetch by default
  // console.log('Using fetch');

  const fetchWithCredentials = (url, options = {}) => {
    options.credentials = 'include';
    return fetch(url, options);
  };

  // Override XMLHttpRequest with fetch
  window.XMLHttpRequest = function() {
    return {
      open: function(method, url, async, user, password) {
        const options = {
          method,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        if (arguments.length > 3) {
          options.body = user + ':' + password;
        }

        return new Promise((resolve, reject) => {
          fetchWithCredentials(url, options)
            .then(response => {
              if (response.ok) {
                resolve(response);
              } else {
                reject(new Error('HTTP error ' + response.status));
              }
            })
            .catch(error => reject(error));
        });
      },

      send: function() {
        // Do nothing
      },

      getAllResponseHeaders: function() {
        // Return empty string
        return '';
      },

      getResponseHeader: function() {
        // Return null
        return null;
      },

      onreadystatechange: function() {
        // Do nothing
      },

      readyState: 4,

      status: 200,

      statusText: 'OK'
    };
  };
}

//

// == Loading ==

if(!document.querySelector("body").classList.contains("loading")){
  document.querySelector("body").classList.add("loading");
}

// =======


function toast(){
  let body = document.body;
  var script = '<div class="toast result"></div>'
  body.innerHTML += script;
  console.log('%c✔ %cEli: Site Ready!', 'color: green; font-size: 16px;', 'background: green; color: white; padding: 8px;');
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

async function checkmobility() {
    /* Responsive */
    var meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    if (!document.querySelector('meta[name=viewport]')) {
        eli('head').prepend(meta);
    }
    /* Favicon */
    var favicon = "assets/img/logo.png";
    var favlink = '<link rel="icon" type="image/png" href="' + jspath + 'logo.png">';
    var favlink2 = '<link rel="icon" type="image/png" href="' + favicon + '">';

    if (!document.querySelector('link[rel=icon]')) {
        try {
            const response = await fetch(favicon);
            if (response.ok) {
                const blob = await response.blob();
                var objectURL = URL.createObjectURL(blob);
                favlink2 = '<link rel="icon" type="image/png" href="' + objectURL + '">';
                document.querySelector('head').insertAdjacentHTML('beforeend', favlink2);
            } else {
                console.error('Failed to fetch favicon');
                document.querySelector('head').insertAdjacentHTML('beforeend', favlink);
            }
        } catch (error) {
            console.error('Error fetching favicon:', error);
            document.querySelector('head').insertAdjacentHTML('beforeend', favlink);
        }
    }
}


function eliloader(element, duration) {
  // Define keyframes
  var keyframes = [
    { opacity: 0 },
    { opacity: 1 }
  ];

  // Define animation options
  var options = {
    duration: duration || 1000,
    easing: 'ease-in-out'
  };

  // Create the animation
  var animation = element.animate(keyframes, options);

  // Set the element's opacity to 0 initially
  element.style.opacity = 1;

  // Play the animation
  animation.play();  
  document.querySelector('body.loading').classList.remove("loading");
}



      toast();      
      

        // CSS        
        loadCSS(jspath+"eli-grid.css");
        loadCSS(jspath+"eli-color.css");
        loadCSS(jspath+"eli-helpers.css");
        loadCSS(jspath+'eli-forms.css');
        loadCSS(jspath+"eli-components.css");
        loadCSS(jspath+"eli-datatables.css");
        loadCSS(jspath+"eli-searchable.css");
        loadCSS(jspath+"eli-carousel.css");
        loadCSS(jspath+"mdi/css/animate.css");
        loadCSS(jspath+"mdi/css/materialdesignicons.min.css");
        loadCSS(jspath+"sweetalert2.min.css");

        // JavaScript
        loadScript(jspath+"sweetalert2.all.min.js");
        loadScript(jspath+"eli-library.js");              
        loadScript(jspath+'eli-forms.js');
        loadScript(jspath+"eli-grid.js");
        loadScript(jspath+"eli-helpers.js");
        loadScript(jspath+"eli-validation.js");
        loadScript(jspath+"eli-components.js");
        loadScript(jspath+"eli-datatables.js");
        loadScript(jspath+"eli-searchable.js");
        loadScript(jspath+"eli-datatemplating.js");
        loadScript(jspath+"eli-image.js");
        loadScript(jspath+"eli-carousel.js");


window.addEventListener('load', async function(){
    elitable(".edt").init();
    setTimeout(function(){ searchable(".eli-searchable").searchable(); searchable(".eli-searchable-select").selectbox() },1000);

  setTimeout(function(){  
    new elislider();
    window.addEventListener('resize',()=>{
      new elislider();
    });
  },1000);

    //  Custom Code
    if(document.querySelector('.input-field')){
          document.querySelectorAll('.input-field > label').forEach( function(item, index) {
            item.classList.add('active');
          });
          setTimeout(UpdateFields,3000);
      }

   await checkmobility();

// == Loading ==
     eliloader(document.querySelector("body",100));
  // run autorun after load
  if (typeof autorun === "function") {
    // safe to use the function
    autorun();
  }
//=============

});

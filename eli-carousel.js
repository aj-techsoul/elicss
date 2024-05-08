function elislider(elem,option){
	elem = elem || ".slider";
	var sliders = document.querySelectorAll(elem);
	sliders.forEach(slider => {
    slider.classList.add('initialised');
		// per sliders 
		// options
		let options = option || {};
		options.startindex= options.startindex || slider.getAttribute('startindex') || 0;
        options.slidetoscroll= options.slidetoscroll || slider.getAttribute('slidetoscroll') || 1;
        options.slidetoshow= options.slidetoshow || slider.getAttribute('slidetoshow') || 3;
        options.gap= options.gap || slider.getAttribute('gap') || 0;
        options.cover= options.cover || slider.getAttribute('cover') || true;
        options.height= options.height || slider.getAttribute('height') || 'auto';

        //console.log(options);
        ////////////
        
        //console.log(slider);
        //////////////////////////////////////////////////////
        // slider track
        // 
        var slidertrack = slider.children[0];
        // total slides count
        var totalslidescount = slidertrack.childElementCount;
        if(slidertrack.childElementCount === 0){
            slider.classList.remove('initialised');
        }
        // total slides
        var totalslides = slidertrack.children;
       	// per slide width
        // alert(totalslidescount);

        // console.log(slidertrack.clientWidth);

        var scwidth = slidertrack.clientWidth || slidertrack.scrollWidth;
        if(totalslidescount >= options.slidetoshow){
       	  var perslidewidth = scwidth / options.slidetoshow;
        }
        else
        {
          var perslidewidth = scwidth / slidetoshow;
          // alert(perslidewidth);
        }

        // console.log(slider);
       	// console.log("perslidewidth - "+ perslidewidth);
       //	console.log(document.querySelector('body').scrollWidth);
       	
       	
       	//////////////////////////////////////////////////////
       	// Controls
       	// 
       	var slidercontrol = slider.children[1];
       	var cprev = slidercontrol.querySelector(".slider-prev");
       	var cnext = slidercontrol.querySelector(".slider-next");

       	////////////////////////////////////////////////////////       	
    		// Setup
    		// 
    		// GAP
        slidertrack.style.gap = options.gap+"px";
        // placement
        for(i=0; i < totalslidescount; i++) {
        	slide = slidertrack.children[i];
          var slidewidth = parseInt(perslidewidth - (options.gap / 2));
          if(slidewidth == 0){
            slidewidth = '100';
          }

          var slidemessurement = "%";
          if(scwidth > 100){
             slidemessurement = "px";
          }

        	slide.style.width = slidewidth+slidemessurement;

          // slide click
          slide.addEventListener('click',function(e){
            let activeslide = slidertrack.querySelector("div.active");
            activeslide?.classList.remove("active");
            if(e.target.parentElement && e.target.parentElement.nodeName==='DIV'){
              aslide = e.target.parentElement;
              aslide.classList.add('active');         
            }
            

          })

        }
        // Initial Active Slide 
        var iactslide = slidertrack.children[options.startindex];
        // console.log(iactslide);
        if(typeof iactslide !== 'undefined'){
            iactslide.classList.add("active");
            slidertrack.scrollLeft = iactslide.offsetLeft;
        }
        /////////////////////////////////////////////////////////          
        // Events
        cnext.addEventListener("click",function(e){
            // check for active slide
            let activeslide = slidertrack.querySelector("div.active");
           // console.log(activeslide);
            // check next slide
              // console.log(activeslide.nextElementSibling);
              if(activeslide?.nextElementSibling)
              {
                let nextslide = activeslide.nextElementSibling;
                // make active as inactive
                activeslide.classList.remove('active');
                // make nextslide active
                nextslide.classList.add('active');
                // scroll towards the active
                slidertrack.scrollLeft = nextslide.offsetLeft;
              }
              else
              {
                // make next slide to first slide on null
                let nextslide = slidertrack.children[0];
                // make active as inactive
                activeslide?.classList.remove('active');
                // make nextslide active
                nextslide.classList.add('active');
                // scroll towards the active
                slidertrack.scrollLeft = nextslide.offsetLeft;
              }
        })

        // Prev
        cprev.addEventListener("click",function(e){
            // check for active slide
            let activeslide = slidertrack.querySelector("div.active");
            // check next slide
            
              if(activeslide?.previousElementSibling)
              {
                let previousslide = activeslide.previousElementSibling;
                // make active as inactive
                activeslide?.classList.remove('active');
                // make previousslide active
                previousslide.classList.add('active');
                // scroll towards the active
                slidertrack.scrollLeft = previousslide.offsetLeft;
              }
              else
              {
                // make previous slide to first slide on null
                previousslide = slidertrack.children[parseInt(totalslidescount - 1)];
                // make active as inactive
                activeslide?.classList.remove('active');
                // make previousslide active
                previousslide.classList.add('active');
                // scroll towards the active
                slidertrack.scrollLeft = previousslide.offsetLeft;
              }
        })

        
                

	})
}
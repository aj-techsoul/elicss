/**
 * Object.entriesFrom() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Object.fromEntries) {
	Object.fromEntries = function (entries){
		if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries() requires a single iterable argument'); }
		let obj = {};
		for (let [key, value] of entries) {
			obj[key] = value;
		}
		return obj;
	};
}


function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


/* 
// Example 1	
var datacontainer = '#datapop';
var templatecontainer = document.querySelector(datacontainer);
var template = document.querySelector(datacontainer +' > tmp');

var data = fetch('http://localhost/rad/plugins-maker/jsonsgdata/data.php')
  .then(response => response.json())
  .then(json => setData(json,template.innerHTML,templatecontainer));
*/
//-------------------

// Example 2	
/*
var datacontainer = '#datapop';

var data = fetch('http://localhost/rad/plugins-maker/jsonsgdata/data.php')
  .then(response => response.json())
  .then(json => setDataQ(json,datacontainer));
*/
//-------------------

// Example 3	
//setDataQt("http://localhost/rad/plugins-maker/jsonsgdata/data.php",'#datapop');

//-------------------
// SetData = raw1  = you need to first fetch then you need call this function with 
// jsondata,template_innerhtml and container under which it has to embed
function setData(json,templateHTML,container,append=true){
	if(json){

	if(append==false){
		container.innerHTML = "";
	}
	////////////////////////
	////////////////////////
	// console.log(json);
	
	var i = 0;
	for(var ix = Object.keys(json).length - 1; ix >= 0; ix--) {
		let j = json[Object.keys(json)[ix]];
		if(typeof j != 'object'){    		
			j = json;
			obj = false;
		}
		else
		{
			obj = true;
		}
	

	let temp = templateHTML;
		

		// /

   

    const removeEmptyOrNull = (obj) => {

      Object.keys(obj).forEach(k =>

        (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||

        (!obj[k] && obj[k] !== undefined) && delete obj[k]

      );

      return obj;

    };

   

    var oj = removeEmptyOrNull(j);		
    // console.log(oj);

		// /

		for (const [key, value] of Object.entries(oj)) {
			// console.log(key+" - "+ typeof value+" - "+value);
				

				let mask = '{{'+key+'}}';
				temp = temp.replace(new RegExp(mask, 'g'),value);
				temp = temp.replace('template=""',"");	
				i++;					
				if(obj==false && i == Object.entries(j).length){
					container.insertAdjacentHTML('beforeend',temp);	
				}
			}
			if(obj==true){
				container.insertAdjacentHTML('beforeend',temp);	
			}
	}
	}
	else
	{
		console.log("-- Something went wrong, we didn't got any data --");
	}
	///////////
	
	///////////
	///////////
}


// setDataQ =. is for quicker than setData and here just you need to fetch and then //send the parameter of json and main container
//
function setDataQ(json,tcontainer){
	var container = document.querySelector(tcontainer);
	var template = document.querySelector(tcontainer +' > [template]') || document.querySelector(tcontainer +' > tmp') || document.querySelector(tcontainer);
	var templateHTML2 = (document.querySelector(tcontainer +' > [template]')) ? template.outerHTML :  template.innerHTML;
	templateHTML = templateHTML2.replace('template=""',"");	
	// if(!document.querySelector(tcontainer +' > [template]')){
	// 	container.innerHTML = "";
	// }

	////////////////////////
	////////////////////////
	//console.log("Q");
	var i = 0;
	for(var ix = Object.keys(json).length - 1; ix >= 0; ix--) {
		let j = json[Object.keys(json)[ix]];
		if(typeof j != 'object'){    		
			j = json;
			obj = false;
		}
		else
		{
			obj = true;
		}
	
	let temp = templateHTML;
	// temp = temp.replace('template=""',"");	
		for (const [key, value] of Object.entries(j)) {
				let mask = '{{'+key+'}}';
				temp = temp.replace(new RegExp(mask, 'g'),value);	
				i++;					
				if(obj==false && i == Object.entries(j).length){
					container.insertAdjacentHTML('beforeend',temp);	
				}
			}
			if(obj==true){
				container.insertAdjacentHTML('beforeend',temp);	
			}
	}
	///////////

	///////////
	///////////
}


// setDataQt =. is more quicker than setData and here just you don't need to fetch. 
// You just need to call this function send the parameter of url to fetch json and main container
// 
function setDataQt(urljson,tcontainer,callback=""){
	var container = document.querySelector(tcontainer);
	var template = document.querySelector(tcontainer +' > [template]') || document.querySelector(tcontainer +' > tmp') || document.querySelector(tcontainer);
	var templateHTML = (document.querySelector(tcontainer +' > [template]')) ? template.outerHTML :  template.innerHTML;
// console.log(templateHTML);
fetch(urljson)
  .then(response => response.json())
  .then(json => {
  	json = json.data || json;
	if(!document.querySelector(tcontainer +' > [template]')){
		container.innerHTML = "";
	}

	////////////////////////
	// console.log(json);
	
	var i = 0;
	for(var ix = Object.keys(json).length - 1; ix >= 0; ix--) {
		let j = json[Object.keys(json)[ix]];	
		// console.log(j);
		if(typeof j != 'object'){
			j = json;
			obj = false;
		}
		else
		{
			obj = true;
		}

	let temp = templateHTML;
	temp = temp.replace('template=""',"");
	temp = temp.replace("template=''","");	
		for (const [key, value] of Object.entries(j)) {
				let mask = '{{'+key+'}}';
				temp = temp.replace(new RegExp(mask, 'g'),value);	
				i++;					
				if(obj==false && i == Object.entries(j).length){
					container.insertAdjacentHTML('beforeend',temp);	
				}
			}
			if(obj==true){
				container.insertAdjacentHTML('beforeend',temp);					
			}
	}
	///////////

		if(callback){
			callback();
		}
 
  });	
}

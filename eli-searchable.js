function searchable(selector) {
    const self = {
        element: document.querySelectorAll(selector),
        length: document.querySelectorAll(selector).length,
        do: (callback) => self.element.forEach((el) => {
            callback(el);
        }),
        on: (event, callback) => self.element.forEach((el) => {
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
        init: (htmlelement) => self.element.forEach((el) => {
            self.searchable(el);
        }),
        searchable: (htmlelement) => self.element.forEach((el) => {

            el.addEventListener("keyup", function(e) {
                // console.log(this);

                if (el.getAttribute("dlist")) {
                    var dlist = el.getAttribute("dlist");
                    var searchable_node = el.getAttribute('searchable_node');
                    var dlist_container = document.querySelector(dlist);
                    var searchable_items = dlist_container.querySelectorAll(searchable_node);
                    // filter
                    filter = el.value.toUpperCase();
                    // console.log(filter);

                    // Loop through all table rows, and hide those who don't match the search query
                    for (i = 0; i < searchable_items.length; i++) {
                        var si = searchable_items[i];
                        var show = false;

                        if (si) {
                            txtValue = si.textContent || si.innerText;
                            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                // console.log(txtValue.toUpperCase());
                                show = true;
                                si.style.display = "";
                            } else {
                                si.style.display = "none";
                            }
                        }
                    }
                    // filter end
                } else {
                    console.error("EliCSS: Please mention dlist in eli-searchable");
                }
            })
        }),
        selectbox: (htmlelement) => self.element.forEach((el) => {
            // Multiple Select
            if (el.hasAttribute('multiple')) {                           
                var limit = 4;
                if (!el.classList.contains("default") && el.options.length <= limit) {
                    el.parentElement.style.paddingTop = '.7em';
                }
                // console.log(el); 
                var slbox_input = "";
                if (!el.classList.contains("no-search")) {
                    if (el.options.length > limit) {
                        slbox_input = '<input type="search" class="default eli-searchable-select-tag-searchbox" />';
                    }
                }
                var slbox_start = '<div class="eli-searchable-select-tag-container">' + slbox_input + '<ul class="eli-searchable-select-tag-options">';
                var slbox_end = '</ul></div>';
                var slopt = "";
                for (var i = 0; i < el.options.length; i++) {
                    if (el.options[i].value) {
                        var slopthtml = el.options[i].getAttribute("opthtml") || el.options[i].innerText;
                        var sloptval = el.options[i].value || el.options[i].innerText;
                        var sloptselected = el.options[i].selected;
                        var sloptselect = "";
                        var sloptactive = "";
                        var sloptdisable = "";
                        if (sloptselected) {
                            sloptselect = " selected='' ";
                            sloptactive = "selected";
                        }

                        if (el.options[i].hasAttribute("disabled")) {
                            sloptdisable = "disabled"
                        }

                        slopt += '<li class="' + sloptdisable + ' ' + sloptactive + '" tabindex="' + i + '" value="' + sloptval + '" >' + slopthtml + '</li>';
                    }
                }
                el.insertAdjacentHTML("afterend", slbox_start + slopt + slbox_end);

                el.nextElementSibling.querySelectorAll(".eli-searchable-select-tag-options > li").forEach(stagi => {
                    stagi.addEventListener("click", function(ed) {                      
                        var tbindex = ed.target.getAttribute('tabindex');                        
                        // el[tbindex].setAttribute("selected","");
                        if (ed.target.classList.contains("selected")) {
                            ed.target.classList.remove("selected");
                            if (el[tbindex].selected) {
                                el[tbindex].selected = false;
                            }
                        } else {
                            ed.target.classList.add("selected");
                            if (!el[tbindex].selected) {
                                el[tbindex].selected = true;
                            }
                        }
                    })
                })

                if (el.parentElement.querySelector(".eli-searchable-select-tag-searchbox")) {
                    el.parentElement.querySelector(".eli-searchable-select-tag-searchbox").addEventListener("keyup", function(e) {
                        var dlist = e.target.parentElement.querySelector(".eli-searchable-select-tag-options");
                        var searchable_node = "li";
                        var searchable_items = dlist.querySelectorAll(searchable_node);
                        // filter
                        filter = e.target.value.toUpperCase();
                        // console.log(filter);

                        // Loop through all table rows, and hide those who don't match the search query
                        for (i = 0; i < searchable_items.length; i++) {
                            var si = searchable_items[i];
                            var show = false;

                            if (si) {
                                txtValue = si.textContent || si.innerText;
                                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                    // console.log(txtValue.toUpperCase());
                                    show = true;
                                    si.style.display = "";
                                } else {
                                    si.style.display = "none";
                                }
                            }
                        }
                        // filter end   
                    })
                }
            } else {

                // Single Select    
                el.addEventListener("mousedown", function(e) {
                    // console.log(e.target);
                    if (e.target.classList.contains("default")) {
                        e.target.nextSibling.style.top = 'auto';
                        e.target.nextSibling.style.width = 'auto';
                    }

                    var selectcontainer = e.target.parentElement.querySelector(".eli-searchable-select-container");
                    selectcontainer.classList.add("active");
                    var inputbox = selectcontainer.querySelector(".eli-searchable-select-searchbox");
                    inputbox.focus();



                    // close on esc
                    inputbox.addEventListener("keyup", function(et) {
                        switch (et.keyCode) {
                            case 27:
                                // esc
                                et.target.closest(".eli-searchable-select-container").classList.remove('active');
                                el.focus();
                                // .classList.remove("active");
                                break;
                            case 40:
                                // down
                                var firstoption = et.target.parentElement.querySelector('.eli-searchable-select-optionsbox a:not([style="display: none;"]) ');
                                firstoption.focus();
                                var fieldvalue = firstoption.value || firstoption.innerText;
                                inputbox.value = fieldvalue;

                                break;
                        }
                        // console.log(et.keyCode);
                    })


                    var selectoption = function(field) {
                        var fieldvalue = field.value || field.innerText;
                        inputbox.value = "";
                        if (field.tabIndex) {
                            el[field.tabIndex].selected = "true";
                            el.focus();
                            selectcontainer.classList.remove("active");
                        }
                    }


                    selectcontainer.querySelector(".eli-searchable-select-optionsbox").addEventListener("keyup", function(et) {
                        console.log(et.target.innerText);
                        switch (et.keyCode) {
                            case 27:
                                // esc
                                et.target.closest(".eli-searchable-select-container").classList.remove('active');
                                el.focus();
                                break;
                            case 38:
                                // up
                                if (et.target.previousElementSibling) {
                                    et.target.previousElementSibling.focus();
                                    var fieldvalue = et.target.nextElementSibling.value || et.target.nextElementSibling.innerText;
                                    inputbox.value = fieldvalue;
                                }
                                break;
                            case 40:
                                // down
                                if (et.target.nextElementSibling) {
                                    et.target.nextElementSibling.focus();
                                    var fieldvalue = et.target.nextElementSibling.value || et.target.nextElementSibling.innerText;
                                    inputbox.value = fieldvalue;
                                }
                                break;
                            case 13:
                                // select
                                selectoption(et.target);
                                break;
                        }
                    })


                    selectcontainer.querySelector(".eli-searchable-select-optionsbox").addEventListener("click", function(et) {
                        selectoption(et.target);
                    })


                    // close on selecting a tag

                    // close on selecting other index or outside

                    document.addEventListener("click", function(e) {
                        // console.log(e.target.className);
                        if (!e.target.classList.contains('eli-searchable-select')) {
                            selectcontainer.classList.remove("active");
                        }
                    }, true)

                    //                console.log(document.activeElement);

                    e.preventDefault();
                })

                var parent = el.parentElement;

                var options = "";
                for (i = 0; i <= el.options.length; i++) {
                    if (el.options[i] && el.options[i].innerText) {
                        var optionbox = el.options[i];
                        var optiontxt = optionbox.getAttribute("opthtml") || optionbox.innerText;
                        var optionvalue = optionbox.value || optionbox.innerText;
                        options = options + "<a href='#' onclick='return false;' tabIndex='" + i + "' value='" + optionvalue + "' >" + optiontxt + "</a>";
                    }
                }
                var optionsbox = '<div class="eli-searchable-select-container"><input type="search" class="eli-searchable-select-searchbox default" ><div class="eli-searchable-select-optionsbox">' + options + '</div></div>';
                el.insertAdjacentHTML("afterend", optionsbox);

                if (parent.querySelector(".eli-searchable-select-searchbox")) {

                    parent.querySelector(".eli-searchable-select-searchbox").addEventListener("keyup", function(e) {
                        // console.log(this);
                        var dlist = parent.querySelector(".eli-searchable-select-optionsbox");
                        var searchable_node = "a";
                        var searchable_items = dlist.querySelectorAll(searchable_node);
                        // filter
                        filter = e.target.value.toUpperCase();
                        // console.log(filter);

                        // Loop through all table rows, and hide those who don't match the search query
                        for (i = 0; i < searchable_items.length; i++) {
                            var si = searchable_items[i];
                            var show = false;

                            if (si) {
                                txtValue = si.textContent || si.innerText;
                                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                    // console.log(txtValue.toUpperCase());
                                    show = true;
                                    si.style.display = "";
                                } else {
                                    si.style.display = "none";
                                }
                            }
                        }
                        // filter end   
                    })
                }
            }
        })
    }

    return self;
}
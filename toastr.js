var toastr = function(message, displayLength, className, completeCallback) {
		className = className || "";

		var container = document.getElementById("toast-container");

		if(container === null){
			// create notification container
			container = document.createElement('div');
			container.id = 'toast-container';
			document.body.appendChild(container);
		}

		// Select and append toast
		var newToast = createToast(message);

	    // only append toast if message is not undefined
	    if (message) {
	    	container.appendChild(newToast);
	    	var toastrs = document.getElementsByClassName("toast");
	    	if(toastrs.length > 3){
	    		$(toastrs[0]).animate({
	            	opacity: 0,
	            	top: "-40px"
	            }, 375, "linear", function(){
			    	// Execute callback
			    	if (typeof(completeCallback) === "function")
			    		completeCallback();

	                // Remove toast after it times out
	                $(this).remove();
	            });
	    	}
	    }

	    newToast.style.top = '35px';
	    newToast.style.opacity = 0;

	    // Animate toast in
	    $(newToast).animate({
	    	top: "0px",
	    	opacity: 1
	    }, 300, "linear");

	    // Allows timer to be pause while being panned
	    var timeLeft = displayLength?displayLength:6000;
	    var counterInterval = setInterval(function() {


	    	if (newToast.parentNode === null)
	    		window.clearInterval(counterInterval);

	        // If toast is not being dragged, decrease its time remaining
	        if (!newToast.classList.contains('panning')) {
	        	timeLeft -= 20;
	        }

	        if (timeLeft <= 0) {
	            // Animate toast out
	            $(newToast).animate({
	            	opacity: 0,
	            	top: "-40px"
	            }, 375, "linear", function(){
			    	// Execute callback
			    	if (typeof(completeCallback) === "function")
			    		completeCallback();

	                // Remove toast after it times out
	                $(this).remove();
	            });
	            window.clearInterval(counterInterval);
	        }
	    }, 20);

	    function createToast(html) {

	        // Create toast
	        var toast = document.createElement('div');
	        toast.classList.add('toast');
	        if (className) {
	        	var classes = className.split(' ');

	        	for (var i = 0, count = classes.length; i < count; i++) {
	        		toast.classList.add(classes[i]);
	        	}
	        }
	        // If type of parameter is HTML Element
	        if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string") {
	        	toast.appendChild(html);
	        } else if (html instanceof jQuery) {
	            // Check if it is jQuery object
	            toast.appendChild(html[0]);
	        } else {
	            // Insert as text;
	            toast.innerHTML = html;
	        }
	        

			return toast;
		}
	};

$.fn.extend({
	
	mousewheel:function (fnWheel){
		
		if ($(this).get(0).addEventListener){
		$(this).get(0).addEventListener("DOMMouseScroll",fn,false);
		$(this).get(0).addEventListener("mousewheel",fn,false);
		}
		
		if ($(this).get(0).attachEvent){
			$(this).get(0).attachEvent("onmousewheel",fn);
			};
		
		function fn(ev){
			
			var oEvent=ev||event;
			var _this=this;
			
			var down=true;
			if (oEvent.wheelDelta){
				down=oEvent.wheelDelta<0;
				}
			else{
				down=oEvent.detail>0;
				};
			fnWheel.call(_this,down,oEvent);
			
			if (oEvent.preventDefault){
				oEvent.preventDefault();
				};
			
			return false;
			};
		}
	});
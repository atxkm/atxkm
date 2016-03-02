function CCC(target){
	this.elements = [];
	this.init(target);
}
CCC.byClass = function(parent, className) {
	if(parent.getElementsByClassName) {
		return parent.getElementsByClassName(className);
	}
	var all = parent.getElementsByTagName("*");
	var re = new RegExp("(^| )" + className + "( |$)");
	var filter = [];
	for(var i = 0; i < all.length; i++) {
		if(re.test(all[i].className)){
			filter.push(all[i]);
		}
	}	
	return filter;
};
CCC.forEach = function(array, callback){
	for(var i = 0; i < array.length; i++) {
		callback.call(array[i], i);
	}
};
CCC.fixEvent = function(event) {
	if (event.expando) return event;
	event = event || window.event;
	event.expando = true;
	if( !event.preventDefault ){
		event.preventDefault = function(){	
			this.returnValue = false;
		};
	}
	if( !event.stopPropagation){
		event.stopPropagation = function(){
			this.cancelBubble = true;
		};
	}
	if( !event.target) { event.target = event.srcElement || document;}
	if (!event.relatedTarget && event.fromElement) {
		event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
	} 
	if( event.pageX == null && event.clientX != null) {
		var doc = document.documentElement, body = document.body;
		event.paceX = event.clientX + 
			(doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
		event.pageY = event.clientY + 
			(doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
	}
	return event;
};
CCC.bind = function (target, type, handler){
	if(target.addEventListener) {
		CCC.bind = function(target, type, handler){
			target.addEventListener(type, handler, false);
		};
	} else if(target.attachEvent) {
		CCC.bind = function(target, type, handler){
			target.attachEvent("on" + type, function(e){
				handler.call(target, CCC.fixEvent(e));
			});
		};
	} else {
		CCC.bind = function(target, type, handler){
			target["on" + type] = function(e){
				handler.call(target, CCC.fixEvent(e));
			};
		};
	}
	CCC.bind(target, type, handler);
};
CCC.unbind = function (target, type, handler){
	if(target.removeEventListener) {
		CCC.unbind = function(target, type, handler) {
			target.removeEventListener(type, handler, false);
		};
	} else if(target.detachEvent) {
		CCC.unbind = function(target, type, handler) {
			target.detachEvent("on" + type, handler);
		};
	} else {
		CCC.unbind = function(target, type, handler) {
			target["on" + type] = null;
		};
	}	
};
CCC.createXHR = function(){
	if(typeof XMLHttpRequest != 'undefined') {
		CCC.createXHR = function(){
			return new XMLHttpRequest();
		};
	} else if(typeof ActiveXObject != 'undefined') {
		CCC.createXHR = function(){
			if(typeof arguments.callee.activeXString != 'string') {
				var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
				var i, len;
				for(i = 0, len = versions.length; i < len; i++) {
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
					}catch(ex){
						
					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		};
	} else {
		CCC.createXHR = function(){
			throw new Error('No XHR object available.');
		}
	}
	return this.createXHR();
};
CCC.ajax = function(url, fnSucc, fnFail){
	var xhr = CCC.createXHR();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
				if(fnSucc && typeof fnSucc == 'function') {
					fnSucc(xhr.responseText);
				}
			}
		} else {
			if(fnFail && typeof fnFail == 'function') {
				fnFail();
			}
		}
	};
	xhr.open('GET', url, true);
	xhr.send(null);
};
CCC.find = function(parent, target){
	var tmp = [];
	if(typeof target == "string") {
		switch(target.charAt(0)){
		case '#' : tmp.push(document.getElementById(target.substr(1))); break;
		case '.' : tmp = CCC.byClass(parent, target.substr(1)); break;
		default : tmp = parent.getElementsByTagName(target); break;
		}
	} else if (target instanceof Array) {
		tmp = target;
	} else {
		if(target.item && target.length){
			tmp = target;
		} else {
			tmp.push(target);
		}
	}
	return tmp;
};
CCC.animate = function(target, speed, callback){
	var frame = 0;
	var endFrame = Math.round(speed / 33);
	target.isAnimated = true;
	clearInterval(target.timer);
	target.timer = setInterval(function(){
		frame++;
		if(frame > endFrame) { clearInterval(target.timer); target.isAnimated = false; return;}
		callback(frame / endFrame);
	}, 33);
};
CCC.AinB = function(o1, o2){
	while(o1){
		if(o1 == o2) {
			return true;
		}
		o1 = o1.parentNode;
	}
	return false;
};
CCC.documentReady = function(f){
	if( document.addEventListener ) {
		CCC.documentReady = function(func){
			document.addEventListener('DOMContentLoaded', function(){
				document.removeEventListener('DOMContentLoaded', arguments.callee);
				func();
			}, false); 
		};
	} else {
		CCC.documentReady = function(func){
			document.attachEvent('onreadystatechange', function(){
				if (document.readyState == 'interactive' || document.readyState == 'complete') {
					document.detachEvent('onreadystatechange', arguments.callee);
					func();
				}
			}); 
		};
	}
	CCC.documentReady(f);
};
CCC.prototype.init = function(target){
	var _this = this;
	var tmp = CCC.find(document, target);
	for(var i = 0; i < tmp.length; i++) {
		this.elements.push(tmp[i]);
	}
};
CCC.prototype.bind = function (type, handler){
	for(var i = 0; i < this.elements.length; i++) {
		CCC.bind(this.elements[i], type, handler);
	}
	return this;
};
CCC.prototype.unbind = function (type, handler){
	for(var i = 0; i < this.elements.length; i++) {
		CCC.unbind(this.elements[i], type, handler);
	}
	return this;
};
CCC.prototype.each = function(callback){
	for(var i = 0; i < this.elements.length; i++) {
		callback.call(this.elements[i], i);
	}
	return this;
};
CCC.prototype.find = function(target){
	if(this.elements.length == 0) {return new CCC([]);}
	var arr = [];
	for(var i = 0; i < this.elements.length; i++) {		
		var tmp = CCC.find(this.elements[i], target);
		for(var j = 0; j < tmp.length; j++) {
			arr.push(tmp[j]);
		}
	}
	return new CCC(arr);
};
CCC.prototype.child = function(index){
	if(this.elements.length == 0) {return new CCC([]);}
	var arr = [];
	for(var i = 0; i < this.elements.length; i++) {	
		var o = this.elements[i];
		var tmp = o.children;
		if( index < tmp.length && index >= 0) {
			arr.push(tmp[index]);
		}
	}
	return new CCC(arr);
};

CCC.prototype.siblings = function(target){
	if(this.elements.length == 0) {return new CCC([]);}
	var arr = [];
	for(var i = 0; i < this.elements.length; i++) {	
		var o = this.elements[i];
		var tmp;
		if(target) {
			tmp = CCC.find(o.parentNode, target);
		} else {
			tmp = o.parentNode.children;
		}
		for(var j = 0; j < tmp.length; j++) {
			if(tmp[j] != o) {arr.push(tmp[j]);}
		}
	}
	return new CCC(arr);
};
CCC.prototype.eq = function(index){
	if(index >= this.elements.length) {return null;}
	return this.elements[index];
};
CCC.prototype.index = function(){
	if(this.elements.length == 0) { return -1;}
	var obj = this.elements[0];
	var children = obj.parentNode.children;
	for(var i = 0, len = children.length; i < len; i++) {
		if(obj == children[0]) { return i;}
	}
};
CCC.prototype.load = function (url){
	if( this.elements.length ) {return;}
	var _this = this;
	CCC.ajax(url, function(response){
		_this.elements[0].innerHTML = response;
	});
};
CCC.prototype.show = function (){
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'block';
	}
	return this;
};
CCC.prototype.hide = function (){
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none';
	}
	return this;
};
CCC.prototype.remove = function (){
	for(var i = 0; i < this.elements.length; i++) {
		var child = this.elements[i];
		child.parentNode.removeChild(child);
	}
	return this;
};
CCC.prototype.hasClass = function (className){
	if(this.elements.length < 1) { return false;}
	var re = new RegExp("(^| )" + className + "( |$)");
	return re.test(this.elements[0].className);
};
CCC.prototype.addClass = function (className){
	var re = new RegExp("(^| )" + className + "( |$)");
	for(var i = 0; i < this.elements.length; i++) {
		if( !re.test(this.elements[i].className)) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};
CCC.prototype.removeClass = function (className){
	var re = new RegExp("(^| )" + className + "( |$)");
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].className = this.elements[i].className.replace(re, '');
	}
	return this;
};
CCC.prototype.slideDown = function (speed){
	speed = Math.max(0, speed) | 250;
	for(var i = 0; i < this.elements.length; i++) {
		var target = this.elements[i];
		if(parseInt(target.style.height) > 0) {
			continue;
		}
		target.style.display = 'block';
		target.style.overflow = 'hidden';
		if( !target.height) {target.height = target.offsetHeight;}
		/* Use closure to save current target */
		(function(target){
			var start = 0;
			var change = target.height;
			target.style.height = "0px";
			CCC.animate(target, speed, function(scale){
				target.style.height = (start + change * scale) + 'px';
			});
		})(target);
	}	
	return this;
};
CCC.prototype.slideUp = function (speed){
	speed = Math.max(0, speed) | 250;
	for(var i = 0; i < this.elements.length; i++) {
		var target = this.elements[i];
		if(target.offsetHeight == 0) {
			continue;
		}
		target.style.display = 'block';
		target.style.overflow = 'hidden';
		(function(target){
			if( !target.height) {target.height = target.offsetHeight;}
			var start = target.offsetHeight;
			var change = -start;
			CCC.animate(target, speed, function(scale){
				if(scale >= 1) {
					target.style.display = 'none';
				}
				target.style.height = (start + change * scale) + 'px';
			});
		})(target);
	}	
	return this;
};
/* touchScope, maxValueScope, whether stop when touchend */
CCC.prototype.touchSlide = function (scope, maxScope, noStop){
	if(!scope) {
		scope = this;
	} else if (typeof scope == 'string') {
		scope = new CCC(scope);
	}
	if(maxScope && typeof maxScope == 'string') {
		maxScope = new CCC(maxScope).eq(0) || document.documentElement;
	} else {
		maxScope = document.documentElement;
	}
	var curX = 0;
	var curT = 0;
	var speedX = 0;
	var friction = 0.9;
	
	this.bind('touchstart', function(e){
		var self = this;
		clearTimeout(self.timer);
		var dw = maxScope.clientWidth - self.offsetWidth;
		if(dw >= 0) { return; }
		var dx = self.offsetLeft - e.touches[0].pageX;
		curT = (new Date).getTime();
		scope.bind('touchmove', move);
		scope.bind('touchend', end);
		
		function move(e){
			var x = e.touches[0].pageX;
			var t = (new Date).getTime();						
			var dt = Math.max((t - curT) / 20, 1);			
			
			if( Math.abs(x - curX) > 1) { 
				speedX = Math.floor((x - curX) / dt);
				curX = x;
				curT = t;
			}
			
			self.thisX = x + dx;
			if(self.thisX > 0) { self.thisX = 0;}
			else if(self.thisX < dw) { self.thisX = dw;}
			self.style.marginLeft = self.thisX + 'px';
			e.stopPropagation();
			e.preventDefault();
		}
		function end(e){
			scope.unbind('touchmove', move);
			scope.unbind('touchend', end);
			if(noStop) {
				toEnd();
			}
		}
		function toEnd(){
			if( Math.abs(speedX) < 1 ){ return; }
			
			var tbc = true;
			speedX *= friction;			
			self.thisX += speedX;
			if(self.thisX > 0) { self.thisX = 0; tbc = false;}
			else if(self.thisX < dw) { self.thisX = dw; tbc = false; }
			self.style.marginLeft = self.thisX + 'px';
			
			if(tbc) {
				self.timer = setTimeout(toEnd, 33);
			}
		}
	});
	return this;
};
function _(arg){
	return new CCC(arg);
}

(function(){
	var ua = navigator.userAgent;
	var test = ua.match(/msie\s+([\d.]+)/i);
	if(test) {
		/*IE lte 8*/
		var version = parseFloat(test[1]);

		if(version < 9.0) {
			_('#cssWap').remove();
			_('#cssPc').eq(0).media = '';
		}
	}
	/* UC */
	var control = navigator.control || {};
	if (control.gesture) {
		control.gesture(false);
	}
})();

CCC.documentReady(function(){
	var _navbar = _('.header-nav');
	var _headerNav = _navbar.find('li');
	var clientWidth = document.documentElement.clientWidth;
	var isTouch = ("ontouchstart" in document);
	if( !isTouch) {
		_headerNav.bind('mouseover', function(e){
			var self = this;
			self.timer = setTimeout(function(){
				if( !CCC.AinB(e.relatedTarget, self) ){
					_(self.children[0]).addClass('hover');
					_(self).find('dl').slideDown();
				}
			},300);
		});
		_headerNav.bind('mouseout', function(e){
			clearTimeout(this.timer);
			if( !CCC.AinB(e.relatedTarget, this) ){
				_(this.children[0]).removeClass('hover');
				_(this).find('dl').slideUp();
			}
		});	
	} else {
		_headerNav.bind('click', function(e){
			if( this.children.length < 2 ) {
				return;
			}
			e.preventDefault();
			if(this.children[1].isAnimated) {
				return;
			}
			var _childA = _(this.children[0]);
			if(_childA.hasClass('hover')) {
				_childA.removeClass('hover');
				_(this).find('dl').slideUp();
				return;
			}
			var _prevA = _(this.parentNode).find('.hover');
			_prevA.removeClass('hover');
			_prevA.siblings('dl').slideUp();
			_childA.addClass('hover');
			_childA.siblings('dl').slideDown();
		});
		if(clientWidth <= 640) {
			_navbar.touchSlide('.header', null, true);
			_('#inn_pic_scroll').touchSlide(null, '#outer_zy', true);
		}
	}
});

/* Zhang Bingxue */
CCC.documentReady(function(){
	var bImgChange=document.getElementById("bimgchange");
	var bTabBtn=document.getElementById("btabbtn");
	if( !bImgChange || !bTabBtn) {
		return;
	}
	var aBtnLi=bTabBtn.getElementsByTagName("li");
	var timer=null;
	var ind=0;
	
	var imgchange=function(obj1,obj2){
		for(var i=0;i<obj1.length;i++){
			obj1[i].index=i;
			obj1[i].onclick=function(){
				clearInterval(timer);
				setTimeout(move, 33);
				for(var i=0;i<obj1.length;i++){
					obj1[i].className="bnav";		
				};
				this.className="bnav bactive";
				ind = this.index;
				obj2.src="pic/zbx/"+(this.index+1)+".jpg"
			};
		};
		function move(){
			clearInterval(timer);
			timer=setInterval(function(){
				ind++;
				for(var i=0;i<obj1.length;i++){
					obj1[i].className="bnav";		
				};
				if(ind>obj1.length-1){
					ind=0;
				};
				obj1[ind].className="bnav bactive";
				obj2.src="pic/zbx/"+(ind+1)+".jpg"
			},4000);	
		}
		move();	
	}
	imgchange(aBtnLi,bImgChange);
});

/* Zhou Yi */
CCC.documentReady(function(){
	if( document.documentElement.clientWidth <= 640) {return;}

	var Tween = {};
	Tween.Linear = function(t,b,c,d){ return c*t/d + b; };
	Tween.Cubic = {
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        }
    };
	var Inner=document.getElementById('inn_pic_scroll');	
	if(Inner == null) { return;}	
	var oLeft=document.getElementById('left_scroll');
	var oRight=document.getElementById('right_scroll');
	var InnerWidth = Inner.offsetWidth;
	var aLiWidth = Inner.children[0].offsetWidth;
	var aLiLength = Inner.children.length;
	var direction = 1, left = 0;
	var curIndex = 0, nextIndex = 0, curLeft = 0, curChange = 0;
	Inner.innerHTML += Inner.innerHTML; /* copy */	
	
	var smallPicScroll = moveAndStop(function(t, d){
		left = Tween.Cubic.easeOut(t, curLeft, curChange, d);
		Inner.style.left = left + 'px';
	}, function(){
		curIndex = nextIndex;
		nextIndex += direction;
		curLeft = Inner.offsetLeft;
		if( direction > 0 && curIndex >= aLiLength ) {
			curLeft = 0; nextIndex = 1;
		} else if ( direction < 0 && curIndex <= 0 ) {
			curLeft = -InnerWidth; nextIndex = aLiLength - 1;
		}
		curChange = - aLiWidth * nextIndex - curLeft;
	}, 1000, 3000);
	
	oLeft.onclick=function (){ moveAndChange(-1); };
	oRight.onclick=function (){ moveAndChange(1); };
	smallPicScroll.start();
	function moveAndChange(d){
		smallPicScroll.stopAndStart();
		if(direction != d) {
			direction = d;
			curLeft += InnerWidth * d;
		}
		smallPicScroll.startMove();
	}
	
	/*人气活动*/
	var MarInn=document.getElementById('margue_zy');
	var MarInnHeight = MarInn.offsetHeight; 
	var oLiHeight = MarInn.children[0].offsetHeight;
	var curTop = 0, top = 0;
	MarInn.innerHTML += MarInn.innerHTML; /* copy */		
	moveAndStop(function(t, d){
		top = Tween.Linear(t, 0, oLiHeight, d);
		MarInn.style.top =  (- (curTop + top)) + 'px';
	}, function(){
		if(curTop >= MarInnHeight) { curTop = 0; }
		if(top >= oLiHeight) { curTop += oLiHeight; }
	}, 500, 2000).start();	

	function moveAndStop(moveCallback, haltCallback, speed, halt){
		speed = speed || 1000; 
		halt = halt || 3000;
		var frame = 0;
		var frames = Math.floor(speed / 33);
		var haltTimer = null, moveTimer = null, stopTimer = null;
		var hasMoveCallback = !!(moveCallback && typeof moveCallback == 'function');
		var hashaltCallback = !!(haltCallback && typeof haltCallback == 'function');
		function run(){
			clearInterval(haltTimer);
			haltTimer = setInterval(moveFunc, halt);
		}		
		function moveFunc(){
			frame = 0;
			if(hashaltCallback) haltCallback(); /* 暂停时回调 */
			clearInterval(moveTimer);			
			if(hasMoveCallback) moveTimer = setInterval(eachMoveFunc, 33);
		}
		function eachMoveFunc(){
			frame++;
			if(frame > frames) { clearInterval(moveTimer); return; }
			moveCallback(frame, frames); /* 移动时回调 */
		}		
		return {
			start: function(){ this.stop(); run(); },
			startMove: function(){ moveFunc(); },
			stop: function(){ clearInterval(moveTimer); clearInterval(haltTimer); clearTimeout(stopTimer);},
			stopAndStart: function(t){ t = t || 3000; this.stop(); stopTimer = setTimeout(run, t);}
		};
	}
});
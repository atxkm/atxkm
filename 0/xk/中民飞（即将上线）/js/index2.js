window.onload=function(){
	
	

	
	
	
		
	


	function byClass(obj,name)
	{
		var arr = [];
		var allclass = obj.getElementsByTagName("*");
		for(var i=0; i<allclass.length; i++)
		{
			if(allclass[i].className == name)
			{
				arr.push(allclass[i]);
			}
		}
		return arr;	
	}
	var oPul = document.getElementById("pul1");
	var ppzuo = byClass(document,"ppzuo");
	var ppyou = byClass(document,"ppyou");
	var pLis = oPul.getElementsByTagName("li");
	var pps = byClass(document,"addul");
	var pps2 = byClass(document,"addull");
	var pps3 = byClass(document,"text");
	for(var i=0; i<pLis.length; i++)
	{
		pLis[i].index = i;
		
		pLis[i].onmouseover = function()
		{
			var aa =document.getElementById("pn"+(this.index+1));
			aa.style.background = "url(images/bbb.jpg) right 0 no-repeat";
			aa.style.color = "#0154a4";
			this.style.background = "url(images/hhh.jpg) 0 0 repeat-x";
			ppzuo[this.index].style.display = "block";
			ppyou[this.index].style.display = "block";
			
			
			
			pps[this.index].style.width = this.offsetWidth+'px';
			pps2[this.index].style.width = this.offsetWidth+'px';
			pps3[this.index].style.width = this.offsetWidth+'px';
			pps[this.index].style.display = "block";
			pps2[this.index].style.display = "block";
			pps[this.index].style.zIndex = "99999";
			pps3[this.index].style.display = "block"
		}
		pLis[i].onmouseout = function()
		{ 
			var aa =document.getElementById("pn"+(this.index+1));
			aa.style.color = "#4e4e4e";
			aa.style.background ="url(images/tang.jpg) right 0 no-repeat";
			this.style.background = "url(images/pnav_bg.jpg) 0 0 repeat-x";
			pps[this.index].style.display = "none";
			ppzuo[this.index].style.display = "none";
			ppyou[this.index].style.display = "none";
			pps2[this.index].style.display = "none";
			pps[this.index].style.zIndex = "99999";
			pps3[this.index].style.display = "none"
		}
	}
	
 
 var DD_belatedPNG = {
     ns: 'DD_belatedPNG',
     imgSize: {},
     delay: 10,
     nodesFixed: 0,
     createVmlNameSpace: function () { 
         if (document.namespaces && !document.namespaces[this.ns]) {
             document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
         }
     },
     createVmlStyleSheet: function () { 
        
         var screenStyleSheet, printStyleSheet;
         screenStyleSheet = document.createElement('style');
         screenStyleSheet.setAttribute('media', 'screen');
         document.documentElement.firstChild.insertBefore(screenStyleSheet, document.documentElement.firstChild.firstChild);
         if (screenStyleSheet.styleSheet) {
             screenStyleSheet = screenStyleSheet.styleSheet;
             screenStyleSheet.addRule(this.ns + '\\:*', '{behavior:url(#default#VML)}');
             screenStyleSheet.addRule(this.ns + '\\:shape', 'position:absolute;');
             screenStyleSheet.addRule('img.' + this.ns + '_sizeFinder', 'behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;'); /* large negative top value for avoiding vertical scrollbars for large images, suggested by James O'Brien, http://www.thanatopsic.org/hendrik/ */
             this.screenStyleSheet = screenStyleSheet;
             
             printStyleSheet = document.createElement('style');
             printStyleSheet.setAttribute('media', 'print');
             document.documentElement.firstChild.insertBefore(printStyleSheet, document.documentElement.firstChild.firstChild);
             printStyleSheet = printStyleSheet.styleSheet;
             printStyleSheet.addRule(this.ns + '\\:*', '{display: none !important;}');
             printStyleSheet.addRule('img.' + this.ns + '_sizeFinder', '{display: none !important;}');
         }
     },
     readPropertyChange: function () {
         var el, display, v;
         el = event.srcElement;
         if (!el.vmlInitiated) {
             return;
         }
         if (event.propertyName.search('background') != -1 || event.propertyName.search('border') != -1) {
             DD_belatedPNG.applyVML(el);
         }
         if (event.propertyName == 'style.display') {
             display = (el.currentStyle.display == 'none') ? 'none' : 'block';
             for (v in el.vml) {
                 if (el.vml.hasOwnProperty(v)) {
                     el.vml[v].shape.style.display = display;
                 }
             }
         }
         if (event.propertyName.search('filter') != -1) {
             DD_belatedPNG.vmlOpacity(el);
         }
     },
     vmlOpacity: function (el) {
         if (el.currentStyle.filter.search('lpha') != -1) {
             var trans = el.currentStyle.filter;
             trans = parseInt(trans.substring(trans.lastIndexOf('=')+1, trans.lastIndexOf(')')), 10)/100;
             el.vml.color.shape.style.filter = el.currentStyle.filter; 
             el.vml.image.fill.opacity = trans;
         }
     },
     handlePseudoHover: function (el) {
         setTimeout(function () { 
             DD_belatedPNG.applyVML(el);
         }, 1);
     },
    
     fix: function (selector) {
         if (this.screenStyleSheet) {
             var selectors, i;
             selectors = selector.split(','); 
             for (i=0; i<selectors.length; i++) {
                 this.screenStyleSheet.addRule(selectors[i], 'behavior:expression(DD_belatedPNG.fixPng(this))');
             }
         }
     },
     applyVML: function (el) {
         el.runtimeStyle.cssText = '';
         this.vmlFill(el);
         this.vmlOffsets(el);
         this.vmlOpacity(el);
         if (el.isImg) {
             this.copyImageBorders(el);
         }
     },
     attachHandlers: function (el) {
         var self, handlers, handler, moreForAs, a, h;
         self = this;
         handlers = {resize: 'vmlOffsets', move: 'vmlOffsets'};
         if (el.nodeName == 'A') {
             moreForAs = {mouseleave: 'handlePseudoHover', mouseenter: 'handlePseudoHover', focus: 'handlePseudoHover', blur: 'handlePseudoHover'};
             for (a in moreForAs) {            
                 if (moreForAs.hasOwnProperty(a)) {
                     handlers[a] = moreForAs[a];
                 }
             }
         }
         for (h in handlers) {
             if (handlers.hasOwnProperty(h)) {
                 handler = function () {
                     self[handlers[h]](el);
                 };
                 el.attachEvent('on' + h, handler);
             }
         }
         el.attachEvent('onpropertychange', this.readPropertyChange);
     },
     giveLayout: function (el) {
         el.style.zoom = 1;
         if (el.currentStyle.position == 'static') {
             el.style.position = 'relative';
         }
     },
     copyImageBorders: function (el) {
         var styles, s;
         styles = {'borderStyle':true, 'borderWidth':true, 'borderColor':true};
         for (s in styles) {
             if (styles.hasOwnProperty(s)) {
                 el.vml.color.shape.style[s] = el.currentStyle[s];
             }
         }
     },
     vmlFill: function (el) {
         if (!el.currentStyle) {
             return;
         } else {
             var elStyle, noImg, lib, v, img, imgLoaded;
             elStyle = el.currentStyle;
         }
         for (v in el.vml) {
             if (el.vml.hasOwnProperty(v)) {
                 el.vml[v].shape.style.zIndex = elStyle.zIndex;
             }
         }
         el.runtimeStyle.backgroundColor = '';
         el.runtimeStyle.backgroundImage = '';
         noImg = true;
         if (elStyle.backgroundImage != 'none' || el.isImg) {
             if (!el.isImg) {
                 el.vmlBg = elStyle.backgroundImage;
                 el.vmlBg = el.vmlBg.substr(5, el.vmlBg.lastIndexOf('")')-5);
             }
             else {
                 el.vmlBg = el.src;
             }
             lib = this;
             if (!lib.imgSize[el.vmlBg]) {
                 img = document.createElement('img');
                 lib.imgSize[el.vmlBg] = img;
                 img.className = lib.ns + '_sizeFinder';
                 img.runtimeStyle.cssText = 'behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;'; /* make sure to set behavior to none to prevent accidental matching of the helper elements! */
                 imgLoaded = function () {
                     this.width = this.offsetWidth; 
                     this.height = this.offsetHeight;
                     lib.vmlOffsets(el);
                 };
                 img.attachEvent('onload', imgLoaded);
                 img.src = el.vmlBg;
                 img.removeAttribute('width');
                 img.removeAttribute('height');
                 document.body.insertBefore(img, document.body.firstChild);
             }
             el.vml.image.fill.src = el.vmlBg;
             noImg = false;
         }
         el.vml.image.fill.on = !noImg;
         el.vml.image.fill.color = 'none';
         el.vml.color.shape.style.backgroundColor = elStyle.backgroundColor;
         el.runtimeStyle.backgroundImage = 'none';
         el.runtimeStyle.backgroundColor = 'transparent';
     },
    
     vmlOffsets: function (el) {
         var thisStyle, size, fudge, makeVisible, bg, bgR, dC, altC, b, c, v;
         thisStyle = el.currentStyle;
         size = {'W':el.clientWidth+1, 'H':el.clientHeight+1, 'w':this.imgSize[el.vmlBg].width, 'h':this.imgSize[el.vmlBg].height, 'L':el.offsetLeft, 'T':el.offsetTop, 'bLW':el.clientLeft, 'bTW':el.clientTop};
         fudge = (size.L + size.bLW == 1) ? 1 : 0;
       
         makeVisible = function (vml, l, t, w, h, o) {
             vml.coordsize = w+','+h;
             vml.coordorigin = o+','+o;
             vml.path = 'm0,0l'+w+',0l'+w+','+h+'l0,'+h+' xe';
             vml.style.width = w + 'px';
             vml.style.height = h + 'px';
             vml.style.left = l + 'px';
             vml.style.top = t + 'px';
         };
         makeVisible(el.vml.color.shape, (size.L + (el.isImg ? 0 : size.bLW)), (size.T + (el.isImg ? 0 : size.bTW)), (size.W-1), (size.H-1), 0);
         makeVisible(el.vml.image.shape, (size.L + size.bLW), (size.T + size.bTW), (size.W), (size.H), 1 );
         bg = {'X':0, 'Y':0};
         if (el.isImg) {
             bg.X = parseInt(thisStyle.paddingLeft, 10) + 1;
             bg.Y = parseInt(thisStyle.paddingTop, 10) + 1;
         }
         else {
             for (b in bg) {
                 if (bg.hasOwnProperty(b)) {
                     this.figurePercentage(bg, size, b, thisStyle['backgroundPosition'+b]);
                 }
             }
         }
         el.vml.image.fill.position = (bg.X/size.W) + ',' + (bg.Y/size.H);
         bgR = thisStyle.backgroundRepeat;
         dC = {'T':1, 'R':size.W+fudge, 'B':size.H, 'L':1+fudge}; /* these are defaults for repeat of any kind */
         altC = { 'X': {'b1': 'L', 'b2': 'R', 'd': 'W'}, 'Y': {'b1': 'T', 'b2': 'B', 'd': 'H'} };
         if (bgR != 'repeat' || el.isImg) {
             c = {'T':(bg.Y), 'R':(bg.X+size.w), 'B':(bg.Y+size.h), 'L':(bg.X)}; /* these are defaults for no-repeat - clips down to the image location */
             if (bgR.search('repeat-') != -1) { /* now let's revert to dC for repeat-x or repeat-y */
                 v = bgR.split('repeat-')[1].toUpperCase();
                 c[altC[v].b1] = 1;
                 c[altC[v].b2] = size[altC[v].d];
             }
             if (c.B > size.H) {
                 c.B = size.H;
             }
             el.vml.image.shape.style.clip = 'rect('+c.T+'px '+(c.R+fudge)+'px '+c.B+'px '+(c.L+fudge)+'px)';
         }
         else {
             el.vml.image.shape.style.clip = 'rect('+dC.T+'px '+dC.R+'px '+dC.B+'px '+dC.L+'px)';
         }
     },
     figurePercentage: function (bg, size, axis, position) {
         var horizontal, fraction;
         fraction = true;
         horizontal = (axis == 'X');
         switch(position) {
             case 'left':
             case 'top':
                 bg[axis] = 0;
                 break;
             case 'center':
                 bg[axis] = 0.5;
                 break;
             case 'right':
             case 'bottom':
                 bg[axis] = 1;
                 break;
             default:
                 if (position.search('%') != -1) {
                     bg[axis] = parseInt(position, 10) / 100;
                 }
                 else {
                     fraction = false;
                 }
         }
         bg[axis] = Math.ceil(  fraction ? ( (size[horizontal?'W': 'H'] * bg[axis]) - (size[horizontal?'w': 'h'] * bg[axis]) ) : parseInt(position, 10)  );
         if (bg[axis] % 2 === 0) {
             bg[axis]++;
         }
         return bg[axis];
     },
     fixPng: function (el) {
         el.style.behavior = 'none';
         var lib, els, nodeStr, v, e;
         if (el.nodeName == 'BODY' || el.nodeName == 'TD' || el.nodeName == 'TR') { /* elements not supported yet */
             return;
         }
         el.isImg = false;
         if (el.nodeName == 'IMG') {
             if(el.src.toLowerCase().search(/\.png$/) != -1) {
                 el.isImg = true;
                 el.style.visibility = 'hidden';
             }
             else {
                 return;
             }
         }
         else if (el.currentStyle.backgroundImage.toLowerCase().search('.png') == -1) {
             return;
         }
         lib = DD_belatedPNG;
         el.vml = {color: {}, image: {}};
         els = {shape: {}, fill: {}};
         for (v in el.vml) {
             if (el.vml.hasOwnProperty(v)) {
                 for (e in els) {
                     if (els.hasOwnProperty(e)) {
                         nodeStr = lib.ns + ':' + e;
                         el.vml[v][e] = document.createElement(nodeStr);
                     }
                 }
                 el.vml[v].shape.stroked = false;
                 el.vml[v].shape.appendChild(el.vml[v].fill);
                 el.parentNode.insertBefore(el.vml[v].shape, el);
             }
         }
         el.vml.image.shape.fillcolor = 'none';
       
         el.vml.image.fill.type = 'frame'; 
         el.vml.color.fill.on = false; 
         lib.attachHandlers(el);
         lib.giveLayout(el);
         lib.giveLayout(el.offsetParent);
         el.vmlInitiated = true;
         lib.applyVML(el); 
     }
 };
 try {
     document.execCommand("BackgroundImageCache", false, true); 
 } catch(r) {}
 DD_belatedPNG.createVmlNameSpace();
 DD_belatedPNG.createVmlStyleSheet();
}
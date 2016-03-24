window.onload=function(){

var header=document.getElementById('header');

	var navS=document.getElementById('navS').getElementsByTagName('a');
	
	var navLists=document.getElementById('navLists').getElementsByTagName('div');

//this method can be make us get element by ths class Name.
	function byClass(parent,oClass){
	var aEl=parent.getElementsByTagName("*");
	var arr=[];
	for (var i=0; i<aEl.length; i++){
		if (aEl[i].className==oClass){
			arr.push(aEl[i]);
			}
		}
		return arr;
	}
	
	//This method is made for Taget can be fixed on the screen.
	function IE6Fixed(fixTarget){
		if(navigator.userAgent.indexOf('MSIE 6.0')!=-1){
			window.onscroll=window.onresize=function(){
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				fixTarget.style.top=scrollTop;
			}
		}
	}
	
	//Make ’buy model’ model fixed on the screen.
	
	var buyModel=byClass(header,'buymodel')[0];
	IE6Fixed(buyModel);
	
	//clicked nav for IE6
	function clickedBg(bgTarget,bgUrl){
		//if(navigator.userAgent.indexOf('MSIE 6.0')!=-1){
			bgTarget[0].style.background=bgUrl;
			for(var i=0;i<bgTarget.length;i++){
				bgTarget[i].index=i;
				bgTarget[i].onclick=function(){
					for(var j=0;j<bgTarget.length;j++){
						bgTarget[j].style.background='';
					}
					bgTarget[this.index].style.background=bgUrl;
				}
			}
		//}
	}
	
	function menuShow(menuTar,onTar){
		
		for(var i=0;i<onTar.length;i++){
			onTar[i].index=i;
			onTar[i].onmouseover=function(){
				for(var j=0;j<menuTar.length;j++){
					menuTar[j].style.display='none';
				}
				menuTar[this.index].style.display='block';
				if(navigator.userAgent.indexOf('MSIE 6.0')!=-1){
					menuTar[this.index].style.left=(this.index-1)*115-3+'px'
				}
				else if((window.attachEvent&&navigator.userAgent.indexOf('Opera') === -1)&&this.index>=3){
					menuTar[this.index].style.left=(this.index-1)*115-6+'px'
				}
				else if(!(window.attachEvent&&navigator.userAgent.indexOf('Opera')!==-1)&&this.index<=3){
					menuTar[this.index].style.left=(this.index-1)*115-2+'px'
				}
				else if(!(window.attachEvent&&navigator.userAgent.indexOf('Opera')!==-1)&&this.index>3){
					menuTar[this.index].style.left=(this.index-1)*115-7+'px'
				}
				menuTar[this.index].onclick=function(){
					this.style.display='block'
				}
				onTar[this.index].onclick=function(){
					menuTar[this.index].style.display='none';
					menuTar[this.index].onclick=function(){
						this.style.display='none';
					}
				}
				menuTar[this.index].onmouseover=function(){
					this.style.display='block';
				}
				menuTar[this.index].onmouseout=function(){
					this.style.display='none';
				}
			}		
			onTar[i].onmouseout=function(){
				menuTar[this.index].style.display='none';
			}
		}
	}
	
	menuShow(navLists,navS);
	clickedBg(navS,'url(img/nav_button.jpg) no-repeat');
	
}


$(function(){

	var mHDM=document.getElementById('mHDM');

		//$('.photography,.styleSug,.acInfo,.scene,.ourAdvan').hide();
		
	var parentUl = mHDM.getElementsByTagName('ul');

	for (var  i=0 ; i<parentUl.length ; i++){

		var childEl = parentUl[i].childNodes[1].getElementsByTagName('a')[0];
		
		
		childEl.onclick = function(e){
			
			var e=e||event;
			var childCound = this.parentNode.parentNode.children;
			var childCounds = this.parentNode.parentNode.parentNode.getElementsByTagName('ul');
			for(var z = 0 ; z < childCounds.length ; z++ ){
				var childCoundsEl = childCounds[z].getElementsByTagName('li');
				for(var x = 1 ; x < childCoundsEl.length ; x ++ ){
					childCoundsEl[x].getElementsByTagName('a')[0].style['display'] = 'none';
				}
				for(var l = 0 ; l < childCoundsEl.length ; l ++ ){
					childCoundsEl[l].getElementsByTagName('a')[0].style['opacity'] = "";
					
				}
			}
			this.style['opacity'] = 1;
			for(var j= 1; j<childCound.length ; j++){
				childCound[j].getElementsByTagName('a')[0].style['display'] = 'block';
			}

			e.cancelBubble=true;
		}
	}
	document.ontouchstart=function (){
		for(var i = 0 ; i <parentUl.length ; i++){
			var childEl = parentUl[i].childNodes[1].getElementsByTagName('a')[0];
				childEl.style['backgroundColor'] = '';
			var childCounds = parentUl[i].children;
			for(var j = 1 ; j <childCounds.length ; j ++ ){
				childCounds[j].getElementsByTagName('a')[0].style['display'] = 'none';
				childCounds[j].getElementsByTagName('a')[0].style['backgroundColor'] = '';
			}
		}
	};	
});

window.addEventListener("load", function () {

        var conView = document.getElementById("mHDM");

			PagingScrollViewPage(conView);

});
/*获取css样式*/
function getDefaultStyle(conView,attribute){ // 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性   
 	return parseInt(conView.style[attribute] || document.defaultView.getComputedStyle(conView,false)[attribute]);   
}
//触屏滑动判断
function PagingScrollViewPage(conView) {
	//公共变量
	var _startTime = 0,
		_startPageX = 0,
		_startPageY = 0;

	var _endTime = 0,
		_endPageX = 0,
		_endPageY = 0;

	var _conViewLeft = 0,
		conLeftView = 0 ;
		
	var conViewWidth=conView.offsetWidth;	
	/*触摸点开始时的XY及时间*/
	conView.addEventListener("touchstart", function (event) {
		_startTime = (new Date()).getTime();
		_startPageX = event.touches[0].pageX;
		_startPageY = event.touches[0].pageY;
		
		_conViewLeft = getDefaultStyle(conView,"left");
	}, false);
	conView.addEventListener("touchmove", function (event) {
		_endPageX = event.touches[0].pageX;
		_endPageY = event.touches[0].pageY;
		changeMove();
		event.preventDefault();
		conLeftView=getDefaultStyle(conView,'left');
	}, false);
	conView.addEventListener("touchend", function (event) {
	}, false);

	function changeMove(){
		var dx = _startPageX - _endPageX ;//alert(conView.offsetWidth-document.body.clientWidth);
		if (dx > 3&&Math.abs(_conViewLeft - dx)<conView.offsetWidth-document.body.clientWidth) {
			
			conView.style.left = (_conViewLeft - dx) + "px";
		}
		else if (dx < -3&&_conViewLeft - dx<0) {
				conView.style.left = (_conViewLeft - dx) + "px";
			}
	}

}

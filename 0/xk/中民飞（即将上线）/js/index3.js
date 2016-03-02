
window.onload=function(){
	
	var oSpan=document.getElementById("job");
	var aSpan=oSpan.getElementsByTagName("span");
	var aDiv=oSpan.children;
	
	for(var i=0; i<aSpan.length; i++){
		
		var ind=0;
		aSpan[i].index=i;
		aSpan[i].onclick=function(){
		
			ind++;
			var x=aSpan[this.index].innerHTML;
			if(x=="+"){
				
				aDiv[this.index*2+1].style.display="block";
				this.innerHTML="-";
				}
			else{
				
				aDiv[this.index*2+1].style.display="none";
				this.innerHTML="+";
				};
			
			};
		};
	
	};

/*
	(function(){
	var control = navigator.control || {};
	if (control.gesture) {
	        control.gesture(false);
	}
})();*/ //禁止uc左右滑动

$(function(){
	//大图1
	var timer=null;
	var index=0;
	function move(){
		
		$("#bpicy li").css("display","none");
		$("#bpicy li").eq(index%$("#bpicy_point li").length).css("display","block");
		$("#bpicy_point li a").removeClass("bpicy_point_h");
		$("#bpicy_point li a").eq(index%$("#bpicy_point li").length).addClass("bpicy_point_h");
		}
	function fnmove(){
		
		timer=setInterval(function(){
		
		index++
		move();
		},4000);
		}
	fnmove();
	$(".bpicboxy_a").click(function(){
		
		clearInterval(timer)
		index=$(".bpicboxy_a").index(this)
		move();
		fnmove();
		})
    
	//新闻滚动
	var news_timer=null;
	
	news_timer=setInterval(function(){
		
		$("#msgboxy_con").animate({"margin-top":-$(".msgboxy").height()},function(){
			
			$("#msgboxy_con li:eq(0)").appendTo($("#msgboxy_con"));
			$("#msgboxy_con").css("margin-top","0");
			})
		},4000);
	//无缝滚动
	$("#move_apic").css("margin-left",-$("#move_apic li:eq(0)").outerWidth(true))
	var pic_timer=null;
	
	function picmove(){
		
		pic_timer=setInterval(function(){
		
			$("#move_apic").animate({"margin-left":-$("#move_apic li:eq(0)").outerWidth(true)*2},function(){

				$("#move_apic li:eq(0)").appendTo($("#move_apic"));
				$("#move_apic").css("margin-left",-$("#move_apic li:eq(0)").outerWidth(true));
				})
			},4000)
		}
	
	picmove();
	function pic_moveR(){
		
		if(parseInt($("#move_apic").css("margin-left"))==parseInt(-$("#move_apic li:eq(0)").outerWidth(true))){
			
			clearInterval(pic_timer);
			$("#move_apic").animate({"margin-left":-$("#move_apic li:eq(0)").outerWidth(true)*2},function(){
				
				$("#move_apic li:eq(0)").appendTo($("#move_apic"));
				$("#move_apic").css("margin-left",-$("#move_apic li:eq(0)").outerWidth(true));
				})
			picmove();
			}
		};
	function pic_moveL(){
		
		if(parseInt($("#move_apic").css("margin-left"))==parseInt(-$("#move_apic li:eq(0)").outerWidth(true))){
			
			clearInterval(pic_timer);
			$("#move_apic").animate({"margin-left":0},function(){

				$("#move_apic li").last().prependTo($("#move_apic"));
				$("#move_apic").css("margin-left",-$("#move_apic li:eq(0)").outerWidth(true));
				})
			picmove();
			}
		}
	$(".move_bton_r span").click(function(){
		
		pic_moveR();
		});
		
	$(".move_bton_l span").click(function(){
		
		pic_moveL();
		});
		
	var cl=$("#bpicy")
	Hammer(cl).on("swipeleft", function(event) {
	  
		clearInterval(timer)
		index++;
		move();
		fnmove();
		event.stopPropagation()
    	});
	Hammer(cl).on("swiperight", function(event) {
        
		clearInterval(timer)
		index--;
		move();
		fnmove();
		event.stopPropagation()
    	});
	//web端 滑动 2
	Hammer($(".move_picy_mid")).on("swipeleft", function() {
        
		pic_moveR();
    	});
	Hammer($(".move_picy_mid")).on("swiperight", function() {
        
		pic_moveL();
    	});
	});
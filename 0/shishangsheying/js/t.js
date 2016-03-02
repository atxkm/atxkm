var hoverSign = true;  //标记 以确定元素删除前不产生新的元素
var hoverOut=false;	//标记 以确定鼠标在产生的图片上时，已离开之前的hover区域,不产生重复的离开函数

$(function() {
	if (document.body.offsetWidth > 640 || document.documentElement.clientWidth > 640) {
		show($('#adv_con_t'));
		magnify($('#info_wrap_t img'));
	}

	$(".clas_con_t").each(function(i){
	    var divH = $(this).height();
	    var p = $('p', $(this)).eq(0);
	    while (p.outerHeight() > divH) {
	        p.text(p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
    	};
    });

	var oAdv = document.getElementById('h3_adv_t');
	var oNew = document.getElementById('h3_new_t');
	var oCla = document.getElementById('h3_cla_t');
	if(window.addEventListener){
		oAdv.addEventListener("touchend", function() {
			window.location.href = 'intion.html';
		});
		oNew.addEventListener("touchend", function() {
			window.location.href = 'list.html';
		});
		oCla.addEventListener("touchend", function() {
			window.location.href = 'intion.html';
		});
	}
});

$(window).resize(function(event) {
	$(".clas_con_t").each(function(i){
	    var divH = $(this).height();
	    var $p = $('p', $(this)).eq(0);
	    while ($p.outerHeight() > divH) {
	        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
    	};
    });
});

function show(element) {
	element.hover(function() {
		if (hoverSign) {
			hoverSign = false;
			$(this).append('<div id="detail">' + $(this).text() + '</div>');
			$('#detail').css({
				position: 'absolute',
				left: '0',
				top: '50%',
				background: '#fff',
				border: '2px dotted #666',
				width: '96%',
				height: '0.1em',
				overflow: 'hidden',
				textIndent: '2em',
				fontSize: '1.2em',
				lineHeight: '1.4'
			});
			if ($(this).attr('id') == 'adv_con_t') {
				$('#detail').css({
					left: '38.8%',
					width: '60%',
					lineHeight: '1.6'
				});
			}
			$('#detail').stop().animate({
				height: $(this).innerHeight() - '6',
				top: '0'
			}, 100);
			var obj = document.getElementById('detail');
			fnWheel(obj, function(down) {
				if (down) {
					obj.scrollTop += 20;
				} else {
					obj.scrollTop -= 20;
				};
			});
		}
	}, function() {
		$('#detail').stop().animate({
			height: '0.1em',
			top: '50%'
		}, 100, function() {
			$('#detail').remove();
			hoverSign = true;
		});
	});
}

function fnWheel(obj, fnWheel) {
	if (obj.addEventListener) {
		obj.addEventListener("DOMMouseScroll", fn, false);
	};
	obj.onmousewheel = fn;

	function fn(ev) {
		var oEvent = ev || event;
		var down = true;
		if (oEvent.wheelDelta) {
			down = oEvent.wheelDelta < 0;
		} else {
			down = oEvent.detail > 0;
		};
		fnWheel(down);
		if (oEvent.preventDefault) {
			oEvent.preventDefault();
		};
		return false;
	};
};

function magnify(obj) {
	obj.parent().hover(function(event) {
		var th = $(this).children('img').eq(0);
		if (hoverSign) {
			hoverSign = false;
			$('body').css('position', 'relative');
			$('body').append('<div id="imgBig_t"><img src="' + th.attr('src') + '" alt="放大后的图"/></div>');

			var oImg = new Image();
			oImg.src = th.attr('src');
			var width = oImg.width,
				height = oImg.height;

			$('#imgBig_t img').css({
				'width': $('.clas_pic_t').width(),
				'margin': '0',
				'float': 'left'
			});

			$('#imgBig_t').css({
				position: 'absolute',
				top: $(this).offset().top,
				left: $(this).offset().left-$(this).width(),
				border: '1px solid black',
				zIndex: '999',
				overflow: 'hidden'
			});

			$('#imgBig_t').stop().animate({
				'top': ($(window).innerHeight() - height) / 2 + $(window).scrollTop(),
				'left': ($(window).innerWidth() - width) / 2 + $(window).scrollLeft(),
			},333);

			$('#imgBig_t img').stop().animate({
				'width': width,
			},333);
			hoverOut=true;
		}
	}, function(event) {
		if(hoverOut){
			hoverOut=false;
			var l = $('#imgBig_t').offset().left - $(window).scrollLeft();
			var t = $('#imgBig_t').offset().top - $(window).scrollTop();
			var ot=$(this).offset().top;
			var ol=$(this).offset().left;
			if (event.clientX < l || event.clientX > l + $('#imgBig_t').width() || event.clientY < t || (event.clientY > t + $('#imgBig_t').height())) {
				$('#imgBig_t img').stop().animate({
					'width': $('.clas_pic_t').width(),
				},168);

				$('#imgBig_t').stop().animate({
					'top': ot,
					'left':ol
				}, 168, function() {
					$('#imgBig_t').remove();
					hoverSign = true;
				});
			} else {
				$('#imgBig_t').mouseout(function(event) {
					$('#imgBig_t img').stop().animate({
						'width': $('.clas_pic_t').width(),
					},168);

					$('#imgBig_t').stop().animate({
						'top': ot,
						'left':ol
					}, 168, function() {
						$('#imgBig_t').remove();
						hoverSign = true;
					});
				});
			};
		}
	});
}
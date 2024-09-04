;(function($){
	$.fn.carousel = function(param){
		var carousel = param.carousel,
		indexContainer = param.indexContainer,
		list = $(carousel).children("li"),
		len = list.length,
		prev = param.prev,
		next = param.next,
		timing = param.timing,
		animateTime = param.animateTime,
		autoPlay = param.autoPlay,
		timer,
		index = 1,
		indexList,
		indexClassName = "js_index",
		action = true,
		totalWidtn = list.width()*(list.length+2),
		direction = param.direction;


		for(var i = 1;i <= list.length;i++){
			$(indexContainer).append("<li>"+i+"</li>")
		}
		$(carousel).width(totalWidtn)
		.append($(list[0]).clone())
		.prepend($(list[list.length-1]).clone())
		.css("left","-"+list.width()+"px");
		list = $(carousel).children("li");
		indexList = $(indexContainer).children("li");
		$(indexList[index-1]).addClass(indexClassName);


		if (autoPlay) {
			startTiming();
			$(carousel+","+prev+","+next+","+indexContainer).hover(function(){
				window.clearInterval(timer);
			},function(){
				startTiming();
			});
		}


		function startTiming(){

			switch (direction) {
				case "right" :
					timer = window.setInterval("$.rightChangeImg();",timing);
				break;
				case "left" :
					timer = window.setInterval("$.leftChangeImg();",timing);
				break;
				default:
					timer = window.setInterval("$.leftChangeImg();",timing);
			}
		};


		$.extend({changeIndex:function(index){
			$(indexList).removeClass(indexClassName);
			$(indexList[index]).addClass(indexClassName);
		}});



		$.extend({leftChangeImg:function(){
			action = false;
			if (index==len) {
				index = 0;
				$(carousel).stop(true,true).css("left","0px");
			}
			index++;
			$(carousel).stop(true,true).animate({
				left : "-="+list.width()+"px"
			},animateTime);
			setTimeout(function(){
				if (index==len) {
					index = 0;
					$(carousel).stop(true,true).css("left","0px");
				}
				action = true;
			},animateTime);
			$.changeIndex(index-1);
		}});


		$.extend({rightChangeImg:function(){
			action = false;
			if (index==0) {
				index = len;
				$(carousel).stop(true,true).css("left","-"+left+"px");
			}
			index--;
			var left = totalWidtn-list.width()*2;
			$(carousel).stop(true,true).animate({
				left : "+="+list.width()+"px"
			},animateTime);
			setTimeout(function(){
				if (index==0) {
					index = len;
					$(carousel).stop(true,true).css("left","-"+left+"px");
				}
				action = true;
			},animateTime);
			if (index == 0) {
				$.changeIndex(len-1);
			}else{
				$.changeIndex(index-1);
			}
		}});


		$(next).on("click",function(){
			var nowLeft = Math.abs(parseInt($(carousel).css("left")));
			var left = totalWidtn-list.width()*2;
			if (action) {
				if (nowLeft == left) {
					index = 0;
					$(carousel).stop(true,true).css("left","0px");
				}
				$.leftChangeImg();
			}
		});


		$(prev).on("click",function(){
			var nowLeft = Math.abs(parseInt($(carousel).css("left")));
			var left = totalWidtn-list.width()*2;
			if (action) {
				if (nowLeft == 0) {
					index = len;
					$(carousel).stop(true,true).css("left","-"+left+"px");
				}
				$.rightChangeImg();
			}
		});


		indexList.on("click",function(){
			var no = $(this).index()+1;
			if (action) {
				if (no > index) {
					$.changeIndex(no-1);
					action = false;
					var left = (no - index)*list.width();
					index = no;
					$(carousel).stop(true,true).animate({
						left : "-="+left+"px"
					},animateTime);
					setTimeout(function(){
						action = true;
					},animateTime);
				}else if (no < index) {
					$.changeIndex(no-1);
					action = false;
					var left = (index - no)*list.width();
					index = no;
					$(carousel).stop(true,true).animate({
						left : "+="+left+"px"
					},animateTime);
					setTimeout(function(){
						action = true;
					},animateTime);
				}

			}
		});
	}
})(jQuery);
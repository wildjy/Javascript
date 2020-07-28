
var dragShowSlider = {
	SHOW_SPEED : 900,
	isTrans : false, 
	init : function() {

		$('.main_drag_slider .good').on('mouseenter', function(){
			if ( $(this).hasClass('active') == false  ) 
			$('.good-name', this).stop().fadeIn((window.underIE9 ) ? 1 : 200);
			$('a .over').stop(true, true).fadeIn((window.underIE9 ) ? 1 : 200);
			$('a .over', this).stop(true, true).fadeOut((window.underIE9 ) ? 1 : 200);
			$('a .ico', this).stop(true, true).fadeIn((window.underIE9 ) ? 1 : 200);
		});

		$('.main_drag_slider .good').on('mouseleave', function(){
			if ( $(this).hasClass('active') == false )
			$('.good-name', this).stop().fadeOut((window.underIE9 ) ? 1 : 200);
			$('a .over').stop(true, true).fadeOut((window.underIE9 ) ? 1 : 200);
			$('a .over', this).stop(true, true).fadeOut((window.underIE9 ) ? 1 : 200);
			$('a .ico', this).stop(true, true).fadeOut((window.underIE9 ) ? 1 : 200);
		});
	},
};

var DragBySlider = {
	DragBS : null,
	selectedIndex : 0,
	slideContentTotalCount : 0,
	posX : 0,
	bar : null,
	slider : null,
	sliderContentContainer : null,
	oriX : 0,
	sliderWidth : 0,
	startX : 0,
	endX : 0,
	centerX : 0,
	CONTENT_W : 332,
	CONTENT_B_W : 470,
	contentW : 0,
	init : function() {
		DragBS = DragBySlider;
		DragBS.slideContentTotalCount = $('.product_ShowSlider .dragSlider_Type .good').length;
		if ( DragBS.slideContentTotalCount  % 2 == 0 ) {
			var good = $('.product_ShowSlider .dragSlider_Type .drag_slider .good:first-child').clone();
			$('.product_ShowSlider .dragSlider_Type .drag_slider').append(good);
			//$('.product_ShowSlider .dragSlider_Type .good:last-child').remove();
			DragBS.slideContentTotalCount = $('.product_ShowSlider .dragSlider_Type .good').length;
		}
		DragBS.bar = $('.product_ShowSlider .slider .bar');
		DragBS.slider = $('.product_ShowSlider .slider');
		DragBS.sliderContentContainer = $('.product_ShowSlider .dragSlider_Type');
		//DragBS.oriX = parseInt(DragBS.slider.offset().left();
		DragBS.sliderWidth = DragBS.slider.width() - DragBS.bar.width();
		DragBS.startX = 1;
		DragBS.endX = DragBS.sliderWidth - 1;
		DragBS.centerX = (DragBS.endX - DragBS.startX) / 2;
		DragBS.contentW = DragBS.slideContentTotalCount * DragBS.CONTENT_W - DragBS.CONTENT_W;
		DragBS.selectedIndex = Math.floor(DragBS.slideContentTotalCount/2);
		DragBS.setUI();
		DragBS.setSlideContent();
		//if ( $.browser.mobile ) DragBS.setSwipe();

		$('.main_drag_slider').on('mousemove', function(e){
			if ( e.clientX < 100 ) {
				$('.slide-btn.prev', this).fadeIn(300);
			} else {
				$('.slide-btn.prev', this).fadeOut(200);
			}

			if ( parseInt($(window).innerWidth()) - e.clientX < 100 ) {
				$('.slide-btn.next', this).fadeIn(300);
			} else {
				$('.slide-btn.next', this).fadeOut(200);
			}
		});

		$('.main_drag_slider').on('mouseleave', function(e){
			$('.slide-btn.prev', this).fadeOut(200);
			$('.slide-btn.next', this).fadeOut(200);
		});

		$('.main_drag_slider .slide-btn.prev').on('click', function(e){
			DragBS.goPrev();
			return false;
		});
		$('.main_drag_slider .slide-btn.next').on('click', function(e){
			DragBS.goNext();
			return false;
		});
	},
	setUI : function() {
		DragBS.posX = DragBS.centerX;
		DragBS.bar.css({'left':DragBS.posX});
		DragBS.bar.on('drag', function( ev, dd ){
			DragBS.updateSlideContent(dd.offsetX);
			//stopMotion($('.anim-obj', DragBS.bar)[0]);
		});

		DragBS.bar.on('dragend', function( ev, dd ){
			DragBS.updateSlideContent(dd.offsetX);
			DragBS.setSlideContent();
		});

		DragBS.sliderContentContainer.css({'margin-left': -DragBS.CONTENT_W/2})
	},

	updateSlideContent : function(offsetX) {
		DragBS.oriX = parseInt(DragBS.slider.offset().left);
		DragBS.posX = offsetX - DragBS.oriX;
		DragBS.posX = Math.max(DragBS.startX, Math.min(DragBS.posX,DragBS.endX));
		DragBS.bar.css({ left:DragBS.posX });

		var per = DragBS.posX / DragBS.sliderWidth;
		var contentX = DragBS.contentW * per;
		$('.product_ShowSlider .drag_slider').stop().animate({'left':-contentX}, 400 , 'easeOutQuint');
		DragBS.selectedIndex = Math.round(per * (DragBS.slideContentTotalCount-1)) ;
		DragBS.selectedIndex = Math.min(DragBS.selectedIndex, DragBS.slideContentTotalCount-1);
		var selectedContent = $('.product_ShowSlider .drag_slider .good:eq(' + DragBS.selectedIndex + ')');
		$('.product_ShowSlider .drag_slider .good').each(function(index){
			
			if ( index == selectedContent.index() ) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('selected active');
			}
		});
		$('.product_ShowSlider .drag_slider .good .good-name').hide().attr('style', '');
		selectedContent.addClass('active');
	},

	setSlideContent : function() {
		
		var per = DragBS.selectedIndex / (DragBS.slideContentTotalCount - 1);
		
		var selectedContent = $('.product_ShowSlider .drag_slider .good:eq(' + DragBS.selectedIndex + ')');
		var contentX = DragBS.CONTENT_W * DragBS.selectedIndex;

		DragBS.posX = Math.round(per * DragBS.sliderWidth);
		DragBS.posX = Math.max(DragBS.startX, Math.min(DragBS.posX, DragBS.endX));
		DragBS.bar.animate({'left':DragBS.posX}, 200);
		

		$('.product_ShowSlider .drag_slider .good .good-name').hide().attr('style', '');
		$('.product_ShowSlider .drag_slider .good').removeClass('selected active');
		selectedContent.addClass('selected active');
		DragBS.sliderContentContainer.stop().animate({'margin-left': -DragBS.CONTENT_B_W/2}, 400);
		$('.product_ShowSlider .drag_slider').stop().animate({'left':-contentX}, 600 , 'easeOutQuad', function(){
			$('.good-name', selectedContent).stop().fadeIn( (window.underIE9 ) ? 1 : 200 ).attr('style', 'display:block !important');
		});
	},

	goNext : function() {
		DragBS.selectedIndex ++;
		DragBS.selectedIndex = Math.min(DragBS.selectedIndex, DragBS.slideContentTotalCount-1);
		DragBS.setSlideContent();
	},


	goPrev : function() {
		DragBS.selectedIndex --;
		DragBS.selectedIndex = Math.max(0,DragBS.selectedIndex);
		DragBS.setSlideContent();
	},

	setSwipe : function() {

		$('.main_drag_slider .drag_slider').swipe( {
				
			click:function(event, target) {
				var href = $(event.target).parent().attr('href');
				self.location.href = href;
			},

            swipe:function(event, direction, distance, duration, fingerCount) {
				if ( direction == 'left') {
					DragBS.goNext();
				} 

				if ( direction == 'right') {
					DragBS.goPrev();
				} 
			},
			triggerOnTouchEnd: true,
			excludedElements: 'a .good',
			allowPageScroll:"vertical",
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:50
		});
	
	},

	show : function(isFirst) {
		
		var speed2 = (isFirst) ? dragShowSlider.SHOW_SPEED * .5 : dragShowSlider.SHOW_SPEED ;
		dragShowSlider.isTrans = true;
		$('.main_drag_slider').stop().show().css({'top':0}).animate({'top':0}, dragShowSlider.SHOW_SPEED , 'easeOutQuad', function(){
			$(this).addClass('active');
			dragShowSlider.isTrans = false;
		});
		$('.main_drag_slider .slider').stop().css({'bottom':-900,'alpha':0}).animate({'bottom':62, 'alpha':1}, dragShowSlider.SHOW_SPEED , 'easeOutQuad');
		$('.main_drag_slider .good').each(function(index){
			$(this).stop().css({'top':1400}).stop().delay(Math.abs(DragBS.selectedIndex - index) * 100).animate({'top':0}, speed2, 'easeInOutQuint');
		});
		if ( isFirst ) return;
	}
};



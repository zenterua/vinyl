/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/

/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style, headerHeight, is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
		headerHeight = $('header').outerHeight();
		$('.bannerHeight .cell-view').css('height', winH);
		$('.pageHeight .cell-view').css('height', winH);
	};

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){	
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
		pageScrolled();		
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if($('.wow').length && !_ismobile) {
		var wow = new WOW().init();
	}
	if(_ismobile) {
		$('body').addClass('mobile');
		$('.videoBanner').hide();
	} 
		_functions.pageCalculations();
		_functions.scrollCall();
		pageScrolled();
		lightBox();	
	setTimeout( function() {
		$('.SelectBox').SumoSelect();
		$('#loader-wrapper').fadeOut(300);
		_functions.initSwiper();
	}, 800);

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		$('body').addClass('loaded');
		// Masonry
	    if ($('.grid').length) {
	        $('.grid').isotope({
		        itemSelector: '.grid-item',
		        layoutMode: 'masonry',
		        percentPosition: true,
		        stamp: ".stamp",
		        masonry: {
		          columnWidth: '.grid-sizer'
		        }
	        });
	    }
	    if ( !_ismobile && !is_Mac && $('.jarallax').length) {
	   		$('.jarallax').jarallax({
			    speed: 0.4,
			    noIos: true
			});
	    }
	    if (is_Mac) {
	    	$('.jarallax').addClass('fixed-background');
	    }
	    if(_ismobile) {
	    	changePhoto();
	    }
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
				if(_ismobile) {
		    	changePhoto();
		    }

		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}


	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.parent().find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 
		           767: { slidesPerView: ($t.attr('data-xs-slides')!='auto')?parseInt($t.attr('data-xs-slides'), 10):'auto', slidesPerGroup: ($t.attr('data-xs-slides')!='auto' && $t.data('center')!='1' && $t.data('group')=='1')?parseInt($t.attr('data-xs-slides'), 10):1, paginationType: 'fraction'}, 
		           991: { slidesPerView: ($t.attr('data-sm-slides')!='auto')?parseInt($t.attr('data-sm-slides'), 10):'auto', slidesPerGroup: ($t.attr('data-sm-slides')!='auto' && $t.data('center')!='1' && $t.data('group')=='1')?parseInt($t.attr('data-sm-slides'), 10):1, paginationType: 'fraction' }, 
		           1199: { slidesPerView: ($t.attr('data-md-slides')!='auto')?parseInt($t.attr('data-md-slides'), 10):'auto', slidesPerGroup: ($t.attr('data-md-slides')!='auto' && $t.data('center')!='1' && $t.data('group')=='1')?parseInt($t.attr('data-md-slides'), 10):1, paginationType: 'bullets' }, 
		           1550: { slidesPerView: ($t.attr('data-lg-slides')!='auto')?parseInt($t.attr('data-lg-slides'), 10):'auto', slidesPerGroup: ($t.attr('data-lg-slides')!='auto' && $t.data('center')!='1' && $t.data('group')=='1')?parseInt($t.attr('data-lg-slides'), 10):1, paginationType: 'bullets' } 
		        } : {},
		        paginationType: 'bullets',
		        slidesPerGroup: ($t.is('[data-group]'))?parseInt($t.attr('data-slides-per-view'), 10):1,
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
				parallax: (_isFF)?($t.data('parallax'), 0): (_ismobile)?($t.data('parallax'), 0): ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				preloadImages: ($t.is('[data-preload]'))?parseInt($t.data('preload'), 10):0,
				centeredSlides: ($t.is('[data-centered]'))?parseInt($t.data('centered'), 10):0,
				roundLengths: ($t.is('[data-round]'))?$t.data('round'):false,
				onTransitionStart: function(swiper) {
					removeVideo();
				},
				onSliderMove: function(swiper) {
					removeVideo();
				},
				onTransitionEnd: function(swiper) {
					addVideo();
					// Couple Slider
					if ($t.hasClass('coupleTop')) {
						var activeSlide = swiper.activeIndex,
						    slidersWrapper = $t.closest('.coupleSwipers');

						if( $('.coupleBottom').lenght ){
							swipers['swiper-' + slidersWrapper.find('.coupleBottom').attr('id')].slideTo(activeSlide);
							slidersWrapper.find('.coupleBottom .coupleActive').removeClass('coupleActive');
							slidersWrapper.find('.coupleBottom .swiper-slide').eq(activeSlide).addClass('coupleActive');
						}	
					}
				},
				paginationBulletRender: function (swiper, index, className) {
					if ( $t.siblings(".customPagination").length ) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					} else{
						return '<span class="' + className + '"></span>';
					}
		        }
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};
	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/
	//open and close popup
	$(document).on('click', '.open-popup', function(){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden, overflow-hidden-popup');
		return false;
	});

	$(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close, .btnClose-popup', function(){
		if( $(this).hasClass('defaultLayer') ) {return false;}
		$('.popup-wrapper, .popup-content').removeClass('active');
		$('html').removeClass('overflow-hidden, overflow-hidden-popup');
		setTimeout(function(){
			$('.ajax-popup').remove();
		},300);
		return false;
	});
	
	//Function OpenPopup
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden, overflow-hidden-popup');
		return false;
	}

	//Tabs
	var tabsFinish = 0;
	$('.tab-menu').on('click', function() {
		if($(this).hasClass('active') || tabsFinish) return false;
		tabsFinish = 1;
        var tabsWrapper = $(this).closest('.tabMainWrapper'),
        	tabsMenu = tabsWrapper.find('.tab-menu'),
        	tabsItem = tabsWrapper.find('.tab-entry'),
        	index = tabsMenu.index(this),
        	thisContent = $(this).find('.as').html();
       	$('.responsiveTab .as').html(thisContent);
       	$('.responsiveTab i').removeClass('iconRotate');
       	if(winW < 767) {
       		$('.tabMenuWrapper').slideToggle(400);
       	}
        
        tabsItem.filter(':visible').fadeOut( function(){
        	tabsItem.eq(index).fadeIn( 50,  function() {
        		if ( tabsWrapper.find('.swiperMainWrapper').length ) {
        			var swiperTab = $(this).find('.swiper-container').attr('id');
	        		tabsFinish = 0;
	        		swipers['swiper-' + swiperTab].update();
        		} else {
					tabsFinish = 0;
        		}
        	});
        });
        tabsMenu.removeClass('active');
        $(this).addClass('active');
    });

	//Accordeon
	$('.accordeon-title').on('click', function(){
		$(this).closest('.accordeon').find('.accordeon-title').not(this).removeClass('active').next().slideUp();
		$(this).addClass('active').next().slideDown();
	});

	//Hamburger
	$('.hamburger').on('click', function() {
		$(this).toggleClass('hamburgerActive');
		$('.headerWrapper').toggleClass('openMenu');
		$("#content-block").toggleClass('openMenuBg');
		$('.catalogWrapper').removeClass('openCatalog');
		$('.catalogLayer').removeClass('activeLayer');
		$('body, html').removeClass('overflow-hidden');
	});

	//Open/Close search
	$('.headerSearch').on('click', function() {
		$('.searchWrapper').addClass('searchOpen');
		$('body, html').addClass('overflow-hidden, overflow-hidden-popup');
	});
	$('.closeSearch').on('click', function() {
		$('.searchWrapper').removeClass('searchOpen');
		$('body, html').removeClass('overflow-hidden, overflow-hidden-popup');
	});
	$('.searchCloseLayer').on('click', function() {
		$('.closeSearch').click();
	});

	// Open/hide catalog
	$('.catalogButtonWrapper').on('click', function() {
		$('.catalogWrapper').toggleClass('openCatalog');
		$('.catalogLayer').toggleClass('activeLayer');
		$('body, html').toggleClass('overflow-hidden');
	});

	// Catalog close layer
	$('.catalogLayer').on('click', function() {
		$(this).removeClass('activeLayer');
		$('.catalogWrapper').removeClass('openCatalog');
		$('body, html').removeClass('overflow-hidden');
	});

	//Responsive drop down
	$('nav p').on('click', function() {
		if($('.hamburger').is(':hidden')){return false;}
		$(this).parent().find('> i').toggleClass('iconRotate');
		$(this).parent().find('> ul').slideToggle(350);
	});

	$('.selectLanguage p').on('click', function() {
		$(this).parent().find('ul').slideToggle(350);
		$(this).parent().find('i').toggleClass('iconRotate');
	});

	//Countdown
	if ( $('.countdown').length ) {
		$('.countdown').ClassyCountdown({
	    labelsOptions: {
            lang: {
                days: 'ДНІВ',
                hours: 'ГОДИН',
                minutes: 'ХВИЛИН',
                seconds: 'СЕКУНД'
            }
        },
        style: {
        	days: {
                gauge: {
                	thickness: 0.04,
                    bgColor: "rgba(255,255,255, .3)",
                    fgColor: "#fff"
                },
                textCSS: 'font-size: 30px; font-family: Roboto; color:#fff'
                },
			hours: {
                gauge: {
                	thickness: 0.04,
                    bgColor: "rgba(255,255,255, .3)",
                    fgColor: "#fff"
                },
                textCSS: 'font-size: 30px; font-family: Roboto; color:#fff'
            },
            minutes: {
                gauge: {
                	thickness: 0.04,
                    bgColor: "rgba(255,255,255, .3)",
                    fgColor: "#fff"
                },
                textCSS: 'font-size: 30px; font-family: Roboto; color:#fff'
            },
            seconds: {
                gauge: {
                	thickness: 0.04,
                    bgColor: "rgba(255,255,255, .3)",
                    fgColor: "#fff"
                },
                textCSS: 'font-size: 30px; font-family: Roboto; color:#fff'
            }
        },
	    end: $.now() + $('.countdownWrapper').data('count-time')
	});
	}

	//Product counter
	$('.counterButton').on('click', function() {
		var productCount = $(this).parent().find('.productInput').val(),
			closestThisCounter = $(this).closest('.cartTableRow'),
			cartPrice = closestThisCounter.find('.cartProductPrice'),
			cartProductPrice = closestThisCounter.find('.cartProductPrice').find('p').html(),
			cartProductNewPrice = closestThisCounter.find('.cartProductPrice').find('span').html(),
			cartProductsSum = closestThisCounter.find('.cartProductsSum').find('p'),
			cartMainPrice = $('.cartMainPrice').find('p'),
			newProductSum;

		if ($(this).hasClass('moreProduct')) {
			productCount++;
			$(this).parent().find('.productInput').val(productCount);

			//Cart product counter
			if ( cartPrice.hasClass('newPrice') ) {
				newProductSum = parseInt(cartProductNewPrice) * productCount;
				cartProductsSum.html(newProductSum);
			} else {
				newProductSum = parseInt(cartProductPrice) * productCount;
				cartProductsSum.html(newProductSum);
			}
		} else if ($(this).hasClass('lessProduct') && productCount > 1) {
			productCount--;
			$(this).parent().find('.productInput').val(productCount);

			//Cart product counter
			if ( cartPrice.hasClass('newPrice') ) {
				newProductSum = parseInt(cartProductNewPrice) * productCount;
				cartProductsSum.html(newProductSum);
			} else {
				newProductSum = parseInt(cartProductPrice) * productCount;
				cartProductsSum.html(newProductSum);
			}
		}
		cartAll();
	});

	var $thisProduct = 0,
		productName = 0;

	//Delate product popup
	$('.delateButton').on('click', function() {
		var thisButton = $(this);
		if (_ismobile) {
			thisButton.closest('.productRemoveWrapper').remove();
		} else {
			thisButton.closest('.popup-content').find('.delateConfirm').addClass('openConfirm'); // open confirm popup
			productName = thisButton.closest('.productRemoveWrapper').find('.ourProduct .as a').html(); // take product name
			$thisProduct = thisButton.closest('.productRemoveWrapper');
			$('.delateConfirm .as span').html(productName);
		}
	});

	//Delate confirm
	$('.delateConfirm a').on('click', function(e) {
		e.preventDefault();
		if ( $(this).hasClass('delateProduct') ) {
			$thisProduct.remove();
			cartAll(); // function for calculation cart popup price
			$('.delateConfirm').removeClass('openConfirm');
		} else {
			$('.delateConfirm').removeClass('openConfirm');
		}
	});

    // Couple swiper
    $('.coupleBottom .swiper-slide').on('click', function () {
        var slideIndex = $(this).closest('.swiper-wrapper').find('.swiper-slide').index($(this));
        swipers['swiper-'+$(this).closest('.coupleSwipers').find('.coupleTop').attr('id')].slideTo(slideIndex);
    });

 	// Product detail like
 	$('.productDetailLike, .addToCartButton').on('click', function(e) {
 		e.preventDefault();
 		$('.headerLike .cartCounter').addClass('showFavoCounter');
 	});

    // Counter only number
    $('.onlyNumber').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // Delate categoty filter
    $(document).on('click', '.delateFilter', function(e) {
		e.preventDefault();
    	$(this).closest('li').remove();
    });

    // Responsive drop down tab-menu
    $('.responsiveTab').on('click', function() {
    	$(this).parent().find('.tabMenuWrapper').slideToggle(400);
    	$(this).find('i').toggleClass('iconRotate');
    });

    //Comments stars select
	$('.selectStars .selectS').hover( function() {

		var starsIndex = $(this).index(),
			$icons = $(this).parent().find('.selectS'),
		    starSlice = $icons.slice(0,starsIndex+1),
		    starsInfo = $('.ratingInfo').find('span');

		$icons.removeClass('icon-star').addClass('icon-star-empty');
		$(starSlice).removeClass('icon-star-empty');
		$(starSlice).addClass('icon-star');	


		switch(starsIndex) {
			case 0:
				starsInfo.removeClass('showStarsInfo');
				starsInfo.eq(0).addClass('showStarsInfo');
				break;
			case 1:
				starsInfo.removeClass('showStarsInfo');
				starsInfo.eq(0).addClass('showStarsInfo');
				break;
			case 2:
				starsInfo.removeClass('showStarsInfo');
				starsInfo.eq(1).addClass('showStarsInfo');
				break;
			case 3:
				starsInfo.removeClass('showStarsInfo');
				starsInfo.eq(1).addClass('showStarsInfo');
				break;
			case 4:
				starsInfo.removeClass('showStarsInfo');
				starsInfo.eq(2).addClass('showStarsInfo');
				break;
		}
	});


	// Contact scoll to
	$('.scrollToButton').on('click', function(e) {
		e.preventDefault();
		var scrollTo = $('.scrollToPosition').offset().top;
		$('body, html').animate({scrollTop: scrollTo}, 666);
	});

	// Phone mask
	$("#phone").inputmask("+38 (999) 999 99 99");

	// Product detail popup
	$('.coupleSize .coupleTop .detailProduct').on('click', function() {
		var coupleIndexSlide = $(this).closest('.swiper-wrapper').find('.swiper-slide').index($(this).parent()),
			popupDataRel = $(this).data('rel');

		openPopup(popupDataRel);
		swipers['swiper-'+ $('.popupProduct .swiper-container').attr('id')].slideTo(coupleIndexSlide, 0);
	});

	// FUNCTIONS

	//Animate header after scroll
	function pageScrolled() {
		if ( winScr > 50 ) {
			$('header').addClass('pageScrolled');
			$('.catalogWrapper.style2').addClass('pageScrolled');
		} else {
			$('header').removeClass('pageScrolled');
			$('.catalogWrapper.style2').removeClass('pageScrolled');
		}
	}

	//Cart counter final
	function cartAll() {
		var  $product = $('.cartProductsSum p'),
			sum = 0;
			for(var i=0;i<$product.length; i++)	{
				sum += parseInt($product.eq(i).html(), 10);

			}
		$('.cartMainPrice p').text(sum);
	}

	//Lightbox gallery
	function lightBox() {
		if ($('.lightbox').length) {
			var lightbox = $('.lightbox').simpleLightbox({
			disableScroll: false,
			captionSelector: 'self',
			closeText: '',
			alertErrorMessage: "Error",
			history: false,
			navText: ['','']
			});
		}
	}

	function removeVideo() {
		if ($('.swiperMainWrapper').hasClass('videoBannerWrapper') && $('.videoSlide').hasClass('swiper-slide-active')) {
			$('.videoSlide').find('.videoBanner video').attr('src', '');
		}
	}

	function addVideo() {
		if ($('.swiperMainWrapper').hasClass('videoBannerWrapper') && $('.videoSlide').hasClass('swiper-slide-active')) {
			var bannerVideoPath = $('.videoSlide.swiper-slide-active').find('.videoBanner').data('video-src');
			$('.videoSlide.swiper-slide-active').find('.videoBanner video').attr('src', bannerVideoPath);
		}
	}

	// Function for change photo for laptop and mobile
	function changePhoto() {
		if ($('.pageBanner.changeResponsivePhoto' ).length ) {
			var bannerBg = $('.pageBanner .bgImage'),
				bannerMobileImg =  bannerBg.data('img-mobile'),
				bannerLaptopImg =  bannerBg.data('img-laptop'),
				defaultImg = bannerBg.data('img-desktop');
			if (winW > 992) {
				bannerBg.css('background-image', 'url('+defaultImg+')');
				// $('#jarallax-container-0 > div').css('background-image', 'url('+defaultImg+')'); <-- this is for jarallax
			} else if (winW < 767 ) {
				bannerBg.css('background-image', 'url('+bannerMobileImg+')');
				// $('#jarallax-container-0 > div').css('background-image', 'url('+bannerMobileImg+')'); <-- this is for jarallax
			} else if (winW < 991 ) {
				bannerBg.css('background-image', 'url('+bannerLaptopImg+')');
				// $('#jarallax-container-0 > div').css('background-image', 'url('+bannerLaptopImg+')'); <-- this is for jarallax
			}
		}
	}

	// Delivery select radio
	$('.deliveryForm .checkbox-entry input').on('change', function() {
		var deliveryRadio = $(this).attr('data-delivery-radio'),
			deliveryRadioName = $(this).attr('name');
		if ( deliveryRadio == 1 && deliveryRadioName == 1 ) {
			$('.deliveryForm').find('.deliveryContent').not(this).slideUp(350);
			$(this).closest('.deliveryForm').find('.deliveryContent.box1').slideToggle(350);
		} else if ( deliveryRadio == 2 && deliveryRadioName == 1 ) {
			$('.deliveryForm').find('.deliveryContent').not(this).slideUp(350);
			$(this).closest('.deliveryForm').find('.deliveryContent.box2').slideToggle(350);
		} else if ( deliveryRadio == 3 && deliveryRadioName == 1 ) {
			$('.deliveryForm').find('.deliveryContent').not(this).slideUp(350);
		}
	});

	// Sort table
    if ($('.sort-table').length) {
	    $('.sort-table').tablesorter();
	    $('.sort-table th').on('click', function() {
	    	$(this).find('i').toggleClass('tableIconRotate');
	    });
    }

    // Esc close popup
    $(document).keyup(function(e) {
    	if (e.keyCode === 27 ) {
    		$('.popup-wrapper, .popup-content').removeClass('active');
    		$('body, html').removeClass('overflow-hidden, overflow-hidden-popup');
    	}
    });

    // Catalog search button
    $('.catalogSearch li').on('click', function() {
    	$('.catalogSearchButton').removeClass('active');
    	$(this).find('.catalogSearchButton').addClass('active');
    });

	// AJAX
	$(document).on('click', '.ajaxButton', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		$('.ajaxLoader').fadeIn();
		$.ajax({
			type:"GET",
			async:true,
			url: url,
			success:function(response){
				var responseObject = $($.parseHTML(response));
				$('.popup-wrapper').removeClass('active');
				$('.popup-content').removeClass('active');
				$('.catalogLayer').removeClass('activeLayer');
				// Set time out for front end
				setTimeout(function() {
					$('.ajaxWrapperContent *').remove();
					$('.ajaxWrapperContent').append(responseObject);
					$('.ajaxContent').animate({opacity: 1, top: 0}, 1100);
					$('.ajaxLoader').fadeOut();
				}, 1500);
			}
		});
    });

    $(".catalogWrapper input").on('change', function(e) { 
    	var url = $(this).parent().data('ajax-url');
		$('.ajaxLoader').fadeIn();
		$.ajax({
			type:"GET",
			async:true,
			url: url,
			success:function(response){
				var responseObject = $($.parseHTML(response));
				$('.popup-wrapper').removeClass('active');
				$('.popup-content').removeClass('active');
				$('html').removeClass('overflow-hidden');
				$('.catalogWrapper').removeClass('openCatalog');
				$('.catalogLayer').removeClass('activeLayer');
				// Set time out for front end
				setTimeout(function() {
					$('.ajaxWrapperContent *').remove();
					$('.ajaxWrapperContent').append(responseObject);
					$('.ajaxContent').animate({opacity: 1, top: 0}, 1100);
					$('.ajaxLoader').fadeOut();
				}, 1500);
			}
		});
    });

    SmoothScroll({animationTime: 800, stepSize: 120})

});
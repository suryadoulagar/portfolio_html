(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');


		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});


		$('form').placeholder();


		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});


		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right'
			});

		if (skel.vars.IEVersion < 9)
			$header.removeClass('alt');

		if ($banner.length > 0
			&& $header.hasClass('alt')) {

			$window.on('resize', function () { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom: $header.outerHeight(),
				terminate: function () { $header.removeClass('alt'); },
				enter: function () { $header.addClass('alt'); },
				leave: function () { $header.removeClass('alt'); $header.addClass('reveal'); }
			});

		}


		var $banner = $('#banner');

		if ($banner.length > 0) {


			if (skel.vars.IEVersion < 12) {

				$window.on('resize', function () {

					var wh = $window.height() * 0.60,
						bh = $banner.height();

					$banner.css('height', 'auto');

					window.setTimeout(function () {

						if (bh < wh)
							$banner.css('height', wh + 'px');

					}, 0);

				});

				$window.on('load', function () {
					$window.triggerHandler('resize');
				});

			}

			var video = $banner.data('video');

			if (video)
				$window.on('load.banner', function () {


					$window.off('load.banner');


					if (!skel.vars.mobile
						&& !skel.breakpoint('large').active
						&& skel.vars.IEVersion > 9)
						$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

				});


			$banner.find('.more')
				.addClass('scrolly');

		}


		$('.flex-tabs').each(function () {

			var t = jQuery(this),
				tab = t.find('.tab-list li a'),
				tabs = t.find('.tab');

			tab.click(function (e) {

				var x = jQuery(this),
					y = x.data('tab');


				tab.removeClass('active');
				x.addClass('active');


				tabs.removeClass('active');
				t.find('.' + y).addClass('active');

				e.preventDefault();

			});

		});


		$('.scrolly').scrolly({
			offset: function () {
				return $header.height() - 2;
			}
		});

	});

})(jQuery);
$(document).ready(function () {
	hljs.initHighlighting();
	screenLog.init();
	superplaceholder({
	    el: document.querySelector('textarea'),
	    sentences: [ 'Input some data', 'It can be anything', 'String or Number', 'Object or Array', 'ArrayBuffer or Uint16Array'],
	    options: {
			letterDelay: 50,
			sentenceDelay: 400,
			startOnFocus: false,
			loop: true
		}
	});

	function unhighlightAllNavBarLinks() {
		$('.features-nav-link').removeClass('is-active');
    	$('.download-nav-link').removeClass('is-active');
    	$('.security-nav-link').removeClass('is-active');
    	$('.docs-nav-link').removeClass('is-active');
    	$('.usage-nav-link').removeClass('is-active');
    	$('.live-demo-nav-link').removeClass('is-active');
	}

    $(window).on('scroll', function () {
        var topOffset = $(this).scrollTop(),
        	viewportHeight = document.documentElement.clientHeight;

        // showing scroll to top logic
        if ($(this).scrollTop() > 100) {
            $('#scrollUp').fadeIn();
        } else {
            $('#scrollUp').fadeOut();
        }

        // nav bar activation logic
        unhighlightAllNavBarLinks();
        if (topOffset > 1 * viewportHeight && topOffset < 2 * viewportHeight) {
        	$('.features-nav-link').addClass('is-active');
        } else if (topOffset > 2 * viewportHeight && topOffset < 3 * viewportHeight) {
        	$('.download-nav-link').addClass('is-active');
        } else if (topOffset > 3 * viewportHeight && topOffset < 4 * viewportHeight) {
        	$('.security-nav-link').addClass('is-active');
        } else if (topOffset > 4 * viewportHeight && topOffset < 8 * viewportHeight) {
        	$('.docs-nav-link').addClass('is-active');
        } else if (topOffset > 8 * viewportHeight && topOffset < 10 * viewportHeight) {
        	$('.usage-nav-link').addClass('is-active');
        } else if (topOffset > 10 * viewportHeight && topOffset < 12 * viewportHeight) {
        	$('.live-demo-nav-link').addClass('is-active');
        } else {
        	unhighlightAllNavBarLinks()
        }
    });

    $('#scrollUp').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $('.mdl-layout__drawer-button').click(function () {
    	$('.mdl-layout__obfuscator').addClass('is-visible');
    	$('.mdl-layout__drawer').addClass('is-visible');
    });

    $('.mdl-layout__obfuscator').click(function () {
    	$(this).removeClass('is-visible');
    	$('.mdl-layout__drawer').removeClass('is-visible');
    });

    $('input[name=options]').change(function () {
    	var encType = $('input[name=options]:checked').val();
    	if (encType === 'base64' || encType === '') {
    		$('#secret-key').addClass('disabled');
    		$('#secret-key').attr('disabled', true);
    		$('#secret-key').val('');
    	} else {
    		$('#secret-key').removeClass('disabled');
    		$('#secret-key').attr('disabled', false);
    	}
    });

    $('#run').click(function () {
    	$('#run').addClass('disabled');
    	$('#run').attr('disabled', true);
    	setTimeout(function () {
    		$('#run').removeClass('disabled');
    		$('#run').attr('disabled', false);
    	}, 1000); // prevent multiple clicks
    	$('.console').show();
    	var input, encType, isCompression, secretKey, config;

    	input = $('#user-input').val();
    	encType = $('input[name=options]:checked').val();
    	isCompression = $('#is-compression:checked').val() || false;
    	secretKey = $('#secret-key').val().trim();

    	input = JSON.stringify(input);

    	config = {
    		encodingType: encType,
    		isCompression: isCompression,
    	};

    	if (secretKey) {
    		config.encryptionSecret = secretKey;
    	}

    	localStorage.clear(); // fresh start
    	var lib = new SecureLS(config);

    	lib.set('test', input);
    	output = lib.get('test');
    	output = JSON.parse(output)

    	var d = new Date();
    	var datestring = d.getDate()  + '-' + (d.getMonth()+1) + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    	console.log('Date: ', datestring);
    	console.log('____________________________________________');
    	console.log('Config', encType.toUpperCase() || 'No encryption', isCompression ? ', compress data' : ', NO data compression');
    	console.log('Data Stored as: ', localStorage.getItem('test') || '\'\'');
    	console.log('Encryption Secret used: ', lib.utils.encryptionSecret || 'none');
    	console.log('Output: ', output || '\'\'');
    	console.log('____________________________________________');

    });
});
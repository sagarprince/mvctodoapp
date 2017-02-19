jQuery(document).ready(function() {
	jQuery('#opentodo').click(function() {		
		chrome.windows.create({
			url: 'index.html',
			type: 'popup',
			width: 360,
			height: 500
		});
	});
});
$(document).ready(function() {
	let composition = $('.music');
	let audio = composition.get(0);

	let playButton = $('.play-icon');
	let elapsed = $('.currrent');
	let time = $('.length');

	// toggle play/pause button
	function toggleAudio() {
		if (!audio.paused) {
			audio.pause();
			playButton.attr('src', 'images/play%20icon%20white.svg');
		} else if (audio.paused) {
			audio.play();
			playButton.attr('src', 'images/pause%20icon%20white.svg');
		}
	};

	playButton.click(function() {
		toggleAudio();
	});
});



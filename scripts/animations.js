$(document).ready(function() {
	let composition = $('.music');
	let audio = composition.get(0);

	let playButton = $('.play-icon');
	let volumeButton = $('.volume-icon');

	let elapsed = $('.currrent');
	let time = $('.length');

	// toggle play/pause button
	function toggleAudio() {
		if (!audio.paused) {
			audio.pause();
			playButton.attr({'src':'images/play%20icon%20white.svg', 'alt':'play icon'});
		} else if (audio.paused) {
			audio.play();
			playButton.attr({'src':'images/pause%20icon%20white.svg', 'alt':'pause icon'});
		}
	};

	// toggle volume on/off
	function toggleVolume() {
		if (!audio.muted) {
			audio.muted = true;
			volumeButton.attr({'src':'images/volume-up.svg', 'alt':'volume on icon'});
		} else {
			audio.muted = false;
			volumeButton.attr({'src':'images/volume-mute.svg', 'alt':'volume off icon'});
		}
	};

	playButton.click(function() {
		toggleAudio();
	});
	volumeButton.click(function() {
		toggleVolume();
	});
});



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

	// get duration of song
	function getDuration() {
		let mins = Math.floor(audio.duration / 60);
		let secs = Math.floor(audio.duration % 60);

		let minutes = `${mins < 10 ? `0${mins}` : `${mins}`}`;
		let seconds = `${secs < 10 ? `0${secs}` : `${secs}`}`;

		return `${minutes}:${seconds}`;
	}



	// function calls
	time.text(getDuration());
	playButton.click(function() {
		toggleAudio();
	});
	volumeButton.click(function() {
		toggleVolume();
	});
});



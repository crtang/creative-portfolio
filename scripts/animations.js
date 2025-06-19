$(document).ready(function() {
	let composition = $('.music');
	let audio = composition.get(0);

	let playButton = $('.play-icon');
	let volumeButton = $('.volume-icon');
	let volumeSlider = $('.volume-slider');

	let progress = $('.progress');

	let elapsed = $('.current');
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

	// calculate duration of song
	function getDuration() {
		let mins = Math.floor(audio.duration / 60);
		let secs = Math.floor(audio.duration % 60);

		let minutes = `${mins < 10 ? `0${mins}` : `${mins}`}`;
		let seconds = `${secs < 10 ? `0${secs}` : `${secs}`}`;

		return `${minutes}:${seconds}`;
	}

	// set maximum value for song progress
	function setSongProgress() {
		progress.max = Math.floor(audio.duration);
	}

	if (audio.readyState > 0) {
		setSongProgress();
	} else {
		audio.addEventListener('loadedmetadata', () => {
			time.text(getDuration());
			setSongProgress();
		})
	}


	// calculate time elapsed for song
	function timeElapsed() {
		let mins = Math.floor(audio.currentTime / 60);
		let secs = Math.floor(audio.currentTime % 60);

		let minutes = `${mins < 10 ? `0${mins}` : `${mins}`}`;
		let seconds = `${secs < 10 ? `0${secs}` : `${secs}`}`;

		return `${minutes}:${seconds}`;
	}

	// get time elapsed
	function getTimeElapsed() {
		elapsed.text(timeElapsed());
	}



	// function calls
	time.text(getDuration());

	playButton.click(function() {
		toggleAudio();
	});

	volumeButton.click(function() {
		toggleVolume();
	});

	// show volume controls when hovering over volume button
	volumeButton.hover(function() {
		volumeSlider.removeClass('hide');
	}, function() {
		volumeSlider.addClass('hide');
	});

	audio.addEventListener('ended', function() {
		playButton.attr({'src':'images/play%20icon%20white.svg', 'alt':'play icon'});
	});
});



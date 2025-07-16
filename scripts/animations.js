$(document).ready(function() {
	let composition = $('.music');
	let audio = composition.get(0);
	
	// const bufferedMusic = audio.buffered.end(audio.buffered.length - 1);
	// const seekableMusic = audio.seekable.end(audio.seekable.length - 1);

	let volumeSlider = $('.volume-slider');

	let playButton = $('.play-icon');
	let volumeButton = $('.volume-icon');

	const progress = $('.progress');

	let elapsed = $('.current');
	let time = $('.length');

	

	// keep timer running for song while playing
	// setInterval????
	// or while playing?
	// calculate % of time elapsed - currentTime / duration
	// set progress to same %
	// call elapsed.text(timeElapsed());
	function progressMade() {
		let musicPlayed = audio.currentTime / audio.duration;
		progress.value = musicPlayed * 100;
		elapsed.text(timeElapsed);
	}

	// toggle play/pause button
	function toggleAudio() {
		if (!audio.paused) {
			clearInterval();
			audio.pause();
			playButton.attr({'src':'images/play%20icon%20white.svg', 'alt':'play icon'});
		} else if (audio.paused) {
			setInterval(progressMade(), 1000);
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
	
	// calculate time elapsed when time is sought
	progress.on('input', function() {
		const newTime = progress.value / progress.max * audio.duration;
		elapsed.text(newTime);
		// move song forward to time sought
		audio.currentTime = newTime;
	});



	// function calls
	time.text(getDuration());

	playButton.click(function() {
		toggleAudio();
	});

	volumeButton.click(function() {
		toggleVolume();
	});

	audio.addEventListener('ended', function() {
		playButton.attr({'src':'images/play%20icon%20white.svg', 'alt':'play icon'});
	});
});



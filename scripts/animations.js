$(document).ready(function() {
	function isSafari() {
		const userAgent = navigator.userAgent;
		const isSafariBrowser = userAgent.includes("Safari");

		return isSafariBrowser;
	}

	if (!isSafari()) {
		$('.audio-icon').addClass('not-safari-audio-icons');
		$('.volume-button').addClass('not-safari-audio-icons');
	}



	let composition = $('.music');
	let audio = composition.get(0);
	
	// const bufferedMusic = audio.buffered.end(audio.buffered.length - 1);
	// const seekableMusic = audio.seekable.end(audio.seekable.length - 1);

	let volumeSlider = $('.volume-slider');
	let volumeSet = $('.volume-set');

	let playButton = $('.play-icon');
	let volumeButton = $('.volume-icon');

	const songTime = $('.song-time');
	const songProgress = $('.song-progress');

	let elapsed = $('.current');
	let time = $('.length');

	

	volumeSet.width((audio.volume * 100).toString() + "%");
	
	// toggle play/pause button
	function toggleAudio() {
		if (!audio.paused) {
			clearInterval();
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
			volumeButton.attr({'src':'images/volume-mute.svg', 'alt':'volume on icon'});
		} else {
			audio.muted = false;
			volumeButton.attr({'src':'images/volume-up.svg', 'alt':'volume off icon'});
		}
	};

	$(document).keydown(function(event) {
		if (event.key == " ") {
			toggleAudio();
			event.preventDefault();
		}

		if (event.key == "s" || event.key == "S") {
			audio.pause();
			clearInterval;
			audio.currentTime = 0;
			event.preventDefault();
		}

		if (event.key == "m" || event.key == "M") {
			toggleVolume();
			event.preventDefault;
		}
	});

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
		songProgress.max = Math.floor(audio.duration);
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

	// calculated time
	function timeSought(i) {
		let mins = Math.floor(i / 60);
		let secs = Math.floor(i % 60);

		let minutes = `${mins < 10 ? `0${mins}` : `${mins}`}`;
		let seconds = `${secs < 10 ? `0${secs}` : `${secs}`}`;

		return `${minutes}:${seconds}`;
	}
	
	// calculate time elapsed when time is sought
	songTime.on('click', function(e) {
		const timeWidth = parseFloat(window.getComputedStyle(songTime[0]).width);
		const progressWidth = parseFloat(e.offsetX);
		songProgress.width(parseInt(progressWidth / timeWidth * 100).toString() + "%");

		const timeToSeek = parseFloat(parseFloat(e.offsetX / timeWidth) * audio.duration).toFixed(0);
		elapsed.text(timeSought(timeToSeek));
		// move song forward to time sought
		audio.currentTime = timeToSeek;
	});



	// function calls
	time.text(getDuration());

	volumeSlider.click(function(e) {
		const volumeMax = parseFloat(window.getComputedStyle(volumeSlider[0]).width);
		const newVolume = parseFloat(e.offsetX);

		volumeSet.width(parseInt(newVolume / volumeMax * 100).toString() + "%");
		audio.volume = newVolume / volumeMax;

		console.log(audio.volume);
	});

	setInterval(() => {
		elapsed.text(timeElapsed());
		songProgress.width((audio.currentTime / audio.duration * 100).toString() + "%");
	}, 500);

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



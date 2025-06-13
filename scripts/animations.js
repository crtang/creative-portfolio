$(function() {
	let composition = $('.music');
	let audio = composition.get(0);
	let play_button = $('.play-icon');
	let timeline = $('.timeline');
	let time = $('.length');
	let elapsed = $('.current');
	let volume_slider = $('.volume-slider');
	let volume_button = $('.volume-icon');

	audio.loop = false;

	// get duration of audio
	function get_duration(num) {
		let minutes = Math.floor(num / 60);
		let secs = Math.floor(num % 60);
		let seconds = secs < 10 ? `0${secs}` : `${secs}`;

		return `${minutes}:${seconds}`;
	}

	// display duration of audio
	function display_duration () {
		time.text(get_duration(audio.duration));
	}


	audio.onloadedmetadata = function() {
		display_duration();
	};

	// play or pause/stop audio
	function toggle_audio() {
		if (!audio.paused || audio.ended) {
			audio.pause();
			play_button.attr('src', 'images/play%20icon%20white.svg');
		} else if (!audio.started) {
			audio.play();
			play_button.attr('src', 'images/pause%20icon%20white.svg');
		}
	}

	// click volume slider to change volume
	function change_volume(e) {
		let slider_width = window.getComputedStyle(volume_slider).width;
		let new_volume = e.offsetX / parseInt(slider_width);

		audio.volume = new_volume;
		$(".controls .volume-percentage").style.width = new_volume * 100 + '%';
	}

	// mute volume or turn up volume
	function toggle_sound() {
		if (!audio.muted) {
			audio.muted = true;
		 	volume_button.attr('src', 'images/volume-mute.svg');
		} else if (audio.muted) {
			audio.muted = false;
			volume_button.attr('src', 'images/volume-up.svg');
		}
	}

	play_button.on("click", toggle_audio());
	volume_slider.on("click", change_volume());
	volume_button.on("click", toggle_sound());
});



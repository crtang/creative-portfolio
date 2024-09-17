$(document).ready(function() {
	let composition = $('.music');
	let audio = composition.get(0);
	let play_button = $('.play-icon');
	let timeline = $('.timeline');
	let volume_slider = $('.volume-slider');
	let volume_button = $('.volume-icon');
	let progress_bar = $('.progress').get(0);

	// get duration of audio
	function getDuration(num) {
		let seconds = parseInt(num);
		let minutes = seconds % 60;

		seconds -= minutes * 60;

		return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
	}

	// play or pause/stop audio
	function toggle_audio() {
		if (!composition.get(0).paused) {
			composition.get(0).pause();
			play_button.attr('src', 'images/play%20icon%20white.svg');
		} else if (!composition.get(0).started) {
			composition.get(0).play();
			play_button.attr('src', 'images/pause%20icon%20white.svg');
		}
	}

	if (composition.get(0).started) {
		// update audio time elapsed
		setInterval(() => {
			console.log(progress_bar);

			progress_bar.style.width = audio.currentTime / audio.duration * 100 + '%';
			$(".current").textContent = getDuration(audio.currentTime);
		}, 500);
	}

	// get duration of composition
	audio.addEventListener("loadeddata", () => {
		$(".length").textContent = getDuration(audio.duration);
		
		audio.volume = .75;
	}, false);

	// click on timeline to skip around
	function skip_time(e) {
		let timeline_width = window.getComputedStyle(timeline).width;
		let time_to_seek = e.offsetX / parseInt(timeline_width) * audio.duration;

		audio.currentTime = time_to_seek;
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

	play_button.click(toggle_audio);
	timeline.click(skip_time);
	volume_slider.click(change_volume);
	volume_button.click(toggle_sound);
});



$(document).ready(function() {
	var composition = $('.music');
	var play_button = $('.play-icon');

	function toggle_audio() {
		if (!composition.get(0).paused) {
			composition.get(0).pause();
			console.log("Paused track");
			play_button.attr('src', 'images/play icon white.svg');
			/* console.log("Changed icon to play icon"); */
		} else if (!composition.get(0).started) {
			composition.get(0).play();
			console.log("Playing track");
			play_button.attr('src', 'images/pause icon white.svg');
			/* console.log("Changed icon to pause icon"); */
		}
	}

	play_button.click(toggle_audio);
});



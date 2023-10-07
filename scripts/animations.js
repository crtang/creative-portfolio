$(document).ready(function() {
	var composition = document.querySelector('.music');
	var play_buttom = document.querySelector('.play-icon');

	function play_audio() {
		composition.play();
		play_button.innerHTML = '<img src="images/pause%20icon%20white.svg" height="50" alt="play icon" />';
	}
});



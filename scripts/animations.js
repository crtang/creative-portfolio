if (document.readyState === 'complete') {
	let composition = document.querySelector('.music');
	let audio = composition.get(0);
	let play_button = document.querySelector('.play-icon');
	
	audio.loop = false;
}



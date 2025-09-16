const PageController = {
	settings: {
		developmentMode: false,
		ee: 0,
		developmentSettings: {
			stopGoAhead: false,
			hiddenCount: 0,
		},
		// Người dùng cho phép bật âm thanh hay không?
		isAllowAudio: true,
		zoom: {
			max: 3,
			min: 0.3,
		},
		isButtonsDisabled: false,
	},
};

window.onload = function () {
	window.__cam = document.querySelector("#cam");
}
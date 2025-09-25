const messenger = new TabMessenger("scene");

// Nhận lệnh load scene
messenger.on("LOAD_SCENE", (payload) => {
	loadScene(payload.data);
});

// Báo READY về cho admin
messenger.send("SCENE_READY", { version: "1.0.0", fps: 60 });

// Load data
messenger.on("LOAD_DATA", (payload) => {
	if (payload.data) {
		loadScene(payload.data.scene);
		loadLocations(payload.data.locations || []);
	}	
});

// Báo khi đóng tab
window.addEventListener("beforeunload", () => {
	messenger.send("SCENE_CLOSED");
});

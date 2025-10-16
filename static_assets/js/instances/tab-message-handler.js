const messenger = new TabMessenger("scene");

function toastMessage(message, type = "success", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `z-[120] fixed bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 ${
		type === "success" ? "bg-green-500" : "bg-red-500 text-white"
	} `;
    toast.textContent = message;
    document.body.appendChild(toast);
    console.log("Toast message:", message);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, duration);
}

messenger.start = function() {
	// Nhận lệnh load scene
	messenger.on("LOAD_SCENE", (payload) => {
		loadScene(payload.data);
	});

	// Báo READY về cho admin
	messenger.send("SCENE_READY", { version: "1.0.0", fps: 60 });

	// Load data
	messenger.on("LOAD_DATA", (payload) => {
        toastMessage("Đang tải cảnh...", "success", 2000);
		console.log("LOAD_DATA", payload);
		if (payload.data) {
			console.log("data load:", payload.data);
			loadScene(payload.data.scene);
			loadLocations(payload.data.locations || []);
			loadHotspots(payload.data.hotspots || []);
		}
	});

	// Load data
	messenger.on("ACK_ACTION", (payload) => {
        toastMessage(payload.message || "Action completed", payload.type, 4000);
        messenger.ack = null;
	});

	// Báo khi đóng tab
	window.addEventListener("beforeunload", () => {
		messenger.send("SCENE_CLOSED");
	});
};
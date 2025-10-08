const messenger = new TabMessenger("scene");

messenger.start = function() {
      // Nhận lệnh load scene
    messenger.on("LOAD_SCENE", (payload) => {
        loadScene(payload.data);
    });

    // Báo READY về cho admin
    messenger.send("SCENE_READY", { version: "1.0.0", fps: 60 });

    // Load data
    messenger.on("LOAD_DATA", (payload) => {
        console.log("LOAD_DATA", payload);
        if (payload.data) {
            console.log("data load:", payload.data)
            loadScene(payload.data.scene);
            loadLocations(payload.data.locations || []);
            loadHotspots(payload.data.hotspots || []);
        }	
    });

    // Báo khi đóng tab
    window.addEventListener("beforeunload", () => {
        messenger.send("SCENE_CLOSED");
    });
};
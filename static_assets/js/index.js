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

var __hotspots = [
];

var currentScene = {
	id: "scene-001",
	name: "Demo Scene 001",
	rotation: { x: 0, y: 0, z: 0 }
};

const MenuController = {
	setFavorite: function () {
		const rotation = getCurrentRotation();
		console.log(
			"Vị trí hiện tại đã được đặt làm vị trí mặc định:",
			rotation
		);
		if (messenger) {
			messenger.send("SET_FAVORITE_POSITION", {
				data: {
					id: currentScene.id,
					rotation,
				},
			});
            messenger.ack = new Date().getTime();
            setTimeout(() => {
				if (messenger.ack) {
					toastMessage(
						"Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin hoặc thử lại 1 lần nữa",
						"error",
						8000
					);
					messenger.ack = null;
				}
			}, 5000);
		} else {
			toastMessage(
				"Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin",
				"error",
				8000
			);
		}
	},
	toggleCustomValuePopup: function () {
		const popup = document.querySelector("#popup-custom-value");
		popup.classList.toggle("hidden");
	},
	addHotspot: function (type = "goAHead") {
		const uniqueId = `hotspot-${Date.now()}`;

		const spot = {
			id: uniqueId,
			title: "Điểm di chuyển",
			type: type,
			position: { x: 0, y: 1.6, z: -3 },
			rotation: { x: 0, y: 0, z: 0 },
		};

		const aEntity = createAxisEntity(spot);
	},
	saveCurrentScene: () => {
		if (!currentScene || !currentScene.id) {
			console.warn("No current scene to save.");
			return;
		}
		const spots = getSpotsFromScene();
		currentScene.spots = spots;
		console.log("Current scene data to save:", currentScene);
		if (messenger) {
			messenger.send("SAVE_CURRENT_SCENE", { data: currentScene });
            messenger.ack = new Date().getTime();
            setTimeout(() => {
                if (messenger.ack) {
                    toastMessage(
						"Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin hoặc thử lại 1 lần nữa",
						"error",
						8000
					);
                    messenger.ack = null;
                }
            }, 5000);
		} else {
            toastMessage("Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin", "error", 8000);
        }
	},
	openMenuLeft: () => {
        const sidebar = document.querySelector("#side-menu");
        if (sidebar) {
            sidebar.classList.toggle("-translate-x-full");
        }
    }
};

function controllMenu(el) {
	const controller = el.getAttribute("data-controller");
	const data = el.getAttribute("data-controller-attribute");
	if (controller) {
		MenuController[controller](data);
	}
}

window.onload = function () {
	window.__cam = document.querySelector("#cam");
	handleTabModify();
	const locationBtn = document.querySelector(".btn-add-location");
	const submenu = document.querySelector(".submenu");

    if (locationBtn && submenu){
        locationBtn.addEventListener("click", () => {
                submenu.classList.toggle("hidden");
        });
    }

    handleCloseSlideBar();

    // Check when scene loaded
    const scene = document.querySelector('a-scene');
    if (scene.hasLoaded) {
        console.log('Scene has already loaded');
        if (messenger) {
            messenger.start();
        }
    } else {
        scene.addEventListener('loaded', () => {
            console.log('Scene loaded event fired');
            if (messenger) {
                messenger.start();
            }
        });
    }
}
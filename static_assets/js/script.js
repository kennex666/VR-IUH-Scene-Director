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

const convertXYZToString = ({ x, y, z }) => {
	return `${x} ${y} ${z}`;
}

const randomString = (length = 6) => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

/**
 * Select the location in the popup select
 * @param {string} objId - The object id to select location for
 */
const selectLocationTab = (objId) => {
	const id = document.querySelector(`#${objId}`).getAttribute("location-id");
	const type = document.querySelector(`#${objId}`).getAttribute("location-type");
	if (!id) {
		console.warn("No current object selected.");
		return;
	}
	
	const selectLocationEl = document.querySelector("#pop-cus-val-select");
	const selectLocationTypeEl = document.querySelector(
		"#pop-cus-val-type-hotspot-select"
	);
	// check if there is no data options in select
	const option = selectLocationEl.querySelector(`option[value="${id}"]`);
	if (!option) {
		const option = document.createElement("option");
		option.value = id;
		option.textContent = id;
		selectLocationEl.appendChild(option);
		option.selected = true;
	} else {
		option.selected = true;
	}

    if (type && selectLocationTypeEl) {
        const optionType = selectLocationTypeEl.querySelector(`option[value="${type}"]`);
		if (!optionType) {
			const option = document.createElement("option");
			option.value = type;
			option.textContent = type;
			selectLocationTypeEl.appendChild(option);
			option.selected = true;
		} else {
			optionType.selected = true;
		}
	}
}

/**
 * Set the custom object tab values
 * @param {string} id 
 * @param {Object} param1 - The custom object values
 */
const setCustomObjectTab = (id, { posX, posY, posZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ }) => {
	const popup = document.querySelector("#popup-custom-value");
	popup.setAttribute("current-object-id", id);
	popup.querySelector("input[data-input='posX']").value = posX;
	popup.querySelector("input[data-input='posY']").value = posY;
	popup.querySelector("input[data-input='posZ']").value = posZ;
	popup.querySelector("input[data-input='rotX']").value = rotX;
	popup.querySelector("input[data-input='rotY']").value = rotY;
	popup.querySelector("input[data-input='rotZ']").value = rotZ;
	popup.querySelector("input[data-input='scaleX']").value = scaleX;
	popup.querySelector("input[data-input='scaleY']").value = scaleY;
	popup.querySelector("input[data-input='scaleZ']").value = scaleZ;
	selectLocationTab(id);
}

/**
 * Handle popup tab modify
 */
const handleTabModify = () => {
	const popup = document.querySelector("#popup-custom-value");

	// handle chuyển tab
	const tabButtons = popup.querySelectorAll("button[data-tab]");
	const tabContents = popup.querySelectorAll(".tab-content [tab]");

    // Listen select change 
    const selectLocationEl = document.querySelector(
		"#pop-cus-val-type-hotspot-select"
	);
    selectLocationEl.addEventListener("change", (e) => {
        const currentObjId = popup.getAttribute("current-object-id");
        console.log("Input changed for object:", currentObjId);
        if (currentObjId) {
            // Apply all attributes to the object
            const obj = document.getElementById(currentObjId);
            if (!obj) {
                console.warn("Object not found:", currentObjId);
                return;
            }

            const oldType = obj.getAttribute("location-type");

            const locationId = obj.getAttribute("location-id");
            if (oldType != popup.querySelector("#pop-cus-val-type-hotspot-select").value) {
                changeTypeHotspot(
                    locationId,
                    popup.querySelector("#pop-cus-val-type-hotspot-select")
                        .value
                );
            }
        }
    });

	// Listen input change
	const inputs = popup.querySelectorAll("input[data-input]");
	inputs.forEach(input => {
		input.addEventListener("input", () => {
			const currentObjId = popup.getAttribute("current-object-id");
			console.log("Input changed for object:", currentObjId);
			if (currentObjId) {
				// Apply all attributes to the object
				const obj = document.getElementById(currentObjId);
				if (!obj) {
					console.warn("Object not found:", currentObjId);
					return;
				}
				const posXInput = popup.querySelector("input[data-input='posX']");
				const posYInput = popup.querySelector("input[data-input='posY']");
				const posZInput = popup.querySelector("input[data-input='posZ']");
				const rotXInput = popup.querySelector("input[data-input='rotX']");
				const rotYInput = popup.querySelector("input[data-input='rotY']");
				const rotZInput = popup.querySelector("input[data-input='rotZ']");
				const scaleXInput = popup.querySelector("input[data-input='scaleX']");
				const scaleYInput = popup.querySelector("input[data-input='scaleY']");
				const scaleZInput = popup.querySelector("input[data-input='scaleZ']");

				const position = {
					x: parseFloat(posXInput.value) || 0,
					y: parseFloat(posYInput.value) || 0,
					z: parseFloat(posZInput.value) || 0,
				};
				const rotation = {
					x: parseFloat(rotXInput.value) || 0,
					y: parseFloat(rotYInput.value) || 0,
					z: parseFloat(rotZInput.value) || 0,
				};
				const scale = {
					x: parseFloat(scaleXInput.value) || 1,
					y: parseFloat(scaleYInput.value) || 1,
					z: parseFloat(scaleZInput.value) || 1,
				};
				obj.setAttribute("position", position);
				obj.setAttribute("rotation", rotation);
				obj.setAttribute("scale", scale);
			}
		});
	});

	tabButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			const tab = btn.getAttribute("data-tab");

			if (tab === "position" || tab === "rotation" || tab === "scale") {
				tabButtons.forEach(b => {
					if (b === btn) {
						b.classList.add("bg-white/30");
					} else {
						b.classList.remove("bg-white/30");
					}
				});
				// ẩn hết
				tabContents.forEach(c => c.classList.add("hidden"));
				// hiện cái tab được chọn
				const active = popup.querySelector(`[tab="${tab}"]`);
				if (active) active.classList.remove("hidden");
			}

			if (tab === "save") {
				// lấy input values
				const inputs = popup.querySelectorAll("input[data-input]");
				const values = {};
				inputs.forEach(i => {
					values[i.dataset.input] = parseFloat(i.value) || 0;
				});
				console.log("Saved values:", values);
			}

			if (tab === "close") {
				popup.classList.add("hidden");
			}
		});
	});

	popup.setAttribute("current-object-id", "");

	document.addEventListener("position-change", (e) => {
		const currentObjId = popup.getAttribute("current-object-id");
		if (currentObjId && currentObjId !== e.detail.id) {
			console.log("Not the same object, ignore position-change event", currentObjId, e.detail.id);
			return;
		}
		const { x, y, z } = e.detail;
		const posXInput = popup.querySelector("input[data-input='posX']");
		const posYInput = popup.querySelector("input[data-input='posY']");
		const posZInput = popup.querySelector("input[data-input='posZ']");
		if (posXInput) posXInput.value = x.toFixed(6);
		if (posYInput) posYInput.value = y.toFixed(6);
		if (posZInput) posZInput.value = z.toFixed(6);
	});

	document.addEventListener("rotation-change", (e) => {
		const currentObjId = popup.getAttribute("current-object-id");
		if (currentObjId && currentObjId !== e.detail.id) {
			console.log(
				"Not the same object, ignore rotation-change event",
				currentObjId,
				e.detail.id
			);
			return;
		}
		const { x, y, z } = e.detail;
		const rotXInput = popup.querySelector("input[data-input='rotX']");
		const rotYInput = popup.querySelector("input[data-input='rotY']");
		const rotZInput = popup.querySelector("input[data-input='rotZ']");
		if (rotXInput) rotXInput.value = x.toFixed(6);
		if (rotYInput) rotYInput.value = y.toFixed(6);
		if (rotZInput) rotZInput.value = z.toFixed(6);
	});

	document.addEventListener("scale-change", (e) => {
		const currentObjId = popup.getAttribute("current-object-id");
		if (currentObjId && currentObjId !== e.detail.id) {
			console.log(
				"Not the same object, ignore scale-change event",
				currentObjId,
				e.detail.id
			);
			return;
		}
		const { x, y, z } = e.detail;
		const scaleXInput = popup.querySelector("input[data-input='scaleX']");
		const scaleYInput = popup.querySelector("input[data-input='scaleY']");
		const scaleZInput = popup.querySelector("input[data-input='scaleZ']");
		if (scaleXInput) scaleXInput.value = x.toFixed(6);
		if (scaleYInput) scaleYInput.value = y.toFixed(6);
		if (scaleZInput) scaleZInput.value = z.toFixed(6);
	});


	document.getElementById("pop-cus-val-select").addEventListener("change", (e) => {
		const selectedId = e.target.value;
		const currentObjId = popup.getAttribute("current-object-id");
		
		if (!currentObjId) {
			console.warn("No current object selected.");
			return;
		}
		const obj = document.getElementById(currentObjId);
		obj.setAttribute("location-id", selectedId);
	});

}

/**
 * Get the current rotation of the camera
 * @returns {Object} The current rotation {x, y, z}
 */
const getCurrentRotation = () => {
	let cameraEl = document.querySelector("#cam");
	// Access the custom-look component
	console.log(cameraEl.components);
	if (!cameraEl || !cameraEl.components["custom-look"]) {
		console.warn("Camera or custom-look component not found.");
		return { x: 0, y: 0, z: 0 };
	}
	let rotation = cameraEl.components["custom-look"].getCurrentRotation();
	return rotation;
}
/**
 * Create an axis entity for the hotspot
 * @param {Object} spot - The hotspot data
 * @returns {HTMLElement} The created axis entity
 */
const createAxisEntity = (spot) => {
	const axisHelper = document.createElement("a-entity");
	axisHelper.id = `axis-entity-${randomString(12)}-${Date.now()}`;

	axisHelper.setAttribute("location-id", spot.id || "unknown-spot-id");
	axisHelper.setAttribute("location-type", spot.type || "unknown-spot-type");

	switch (spot.type) {
		case "goAHead":
			axisHelper.appendChild(createSpot(spot));
			break;
		case "highLight":
			axisHelper.appendChild(createLHighlightSpots(spot));
			break;
		case "markPoint":
			axisHelper.appendChild(createMarkPoint(spot));
			break;
		default:
			axisHelper.appendChild(createSpot(spot));
			break;
	}

	console.log("Added new hotpot:", axisHelper);

	document.querySelector("a-scene").appendChild(axisHelper);
	axisHelper.setAttribute("axis-helper", "");
	
	setTimeout(() => {
		axisHelper.setAttribute("position", spot.position);
		axisHelper.setAttribute("rotation", spot.rotation);
		axisHelper.setAttribute("scale", spot.scale);
	}, 1)
	return axisHelper;
}

/**
 * Open popup custom value
 */
const openCustomValuePop = () => {
	const popup = document.querySelector("#popup-custom-value");
	popup.classList.toggle("hidden", false);
}

const MenuController = {
	setFavorite: function () {
		const rotation = getCurrentRotation();
		alert("Vị trí hiện tại đã được đặt làm vị trí mặc định!");
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
		}
		alert("Dữ liệu hiện tại đã được lưu (xem console để biết chi tiết).");
	},
	openMenuLeft: () => {
        const sidebar = document.querySelector("#side-menu");
        if (sidebar) {
            sidebar.classList.toggle("-translate-x-full");
        }
    }
};

function loadLocations(locations) {
	if (!Array.isArray(locations)) {
		console.warn("Invalid locations data:", locations);
		return;
	}
	const popupSelect = document.getElementById("pop-cus-val-select");
	// Xóa hết option cũ (trừ cái đầu tiên)
	const options = popupSelect.querySelectorAll("option");
	for (let i = 1; i < options.length; i++) {
		popupSelect.removeChild(options[i]);
	}
	for (let loc of locations) {
		const option = document.createElement("option");
		option.value = loc.id;
		option.textContent = loc.title;
		popupSelect.appendChild(option);
	}
	// Ghi log số lượng location đã load
	console.log("Locations loaded:", locations.length);
}

function controllMenu(el) {
	const controller = el.getAttribute("data-controller");
	const data = el.getAttribute("data-controller-attribute");
	if (controller) {
		MenuController[controller](data);
	}
}

function removeAllSpots() {
	const sceneEl = document.querySelector("a-scene");
	const spots = sceneEl.querySelectorAll("a-entity[axis-helper]");
	
	for (let spot of spots) {
		sceneEl.removeChild(spot);
	}
	console.log("All spots removed.", { removedCount: spots.length });
}

function handleCloseSlideBar() {
    const btnClose = document.querySelector("#close-side-menu");
    const sidebar = document.querySelector("#side-menu");
    if (btnClose && sidebar) {
        btnClose.addEventListener("click", () => {
            sidebar.classList.toggle("-translate-x-full");
        });
    }
}

function loadScene(data) {
	const sceneData = data || null;
	if (!sceneData || !sceneData.id) {
		console.warn("Invalid scene data:", sceneData);
		return;
	}

	currentScene = sceneData;
	console.log("Loading scene:", sceneData);

	removeAllSpots();

	const sceneEl = document.querySelector("a-scene");
	// Check if array
    if (sceneData.assets && sceneData.assets && Array.isArray(sceneData.assets)) {
        sceneData.assets = sceneData.assets[0];
    }
	if (sceneData.assets && sceneData.assets.images && sceneData.assets.images.highQuality) {
		const skyEl = sceneEl.querySelector("a-sky");
		if (skyEl) {
			skyEl.setAttribute("src", sceneData.assets.images.highQuality);
			skyEl.setAttribute("rotation", sceneData.rotation || { x: 0, y: 0, z: 0 });
			console.log("Sky image updated:", sceneData.assets.images.highQuality);
		}	
	} else {
		console.warn("No valid sky image found in scene data.");
	}

	const spots = sceneData.spots || [];
	for (let spot of spots) {
		const aEntity = createAxisEntity(spot);
	};

	console.log("Scene loaded with spots:", spots.length);
	// Load default rotation
	if (sceneData.rotation) {
		let cameraEl = document.querySelector("#cam");
		if (cameraEl && cameraEl.components["custom-look"]) {
			cameraEl.emit("update-xy", { x: sceneData.rotation.x, y: sceneData.rotation.y });
			console.log("Camera rotation updated to:", sceneData.rotation);
		}
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
       

    let sceneTest = {
		id: "Cs1-Sky-1224",
		title: "Trụ sở chính",
		isDefault: true,
		isHighlight: true,
		rotation: { x: -0.7160000000000002, y: 1.5120000000000005, z: 0 },
		description:
			"Trường có trụ sở chính tại số 12 Nguyễn Văn Bảo, phường 1 quận Gò Vấp, Tp.HCM  là nơi phục vụ cho việc học tập và nghiên cứu của giảng viên, sinh viên tất cả các khoa gồm nhiều khu vực chức năng như các phòng học lý thuyết hiện đại, thư viện rộng lớn, khu vực thực hành với các phòng lab được trang bị đầy đủ thiết bị, khu vực thể thao và khuôn viên xanh mát. Ngoài ra, còn có các khu vực giải trí và căn tin phục vụ nhu cầu ăn uống của sinh viên.",
		assets: {
			audios: {
				background: "./static_assets/audio/background.mp3",
				description: "./static_assets/audio/description.mp3",
			},
			images: {
				type: "IMAGE_360",
				preview: "./static_assets/img/360/Cs1-Sky-1224.jpg",
				highQuality: "./static_assets/img/360/Cs1-Sky-1224.jpg",
			},
		},
		spots: [
			{
				id: "Cs1-HallE-1224",
				type: "goAHead",
				title: "Nhà hiệu bộ",
				position: { x: -5.632, y: -9.5, z: -0.049 },
				rotation: { x: -90, y: 90, z: 0 },
				scale: { x: 1, y: 1, z: 1 },
			},
			{
				id: "Cs1-HallE4-1224",
				type: "markPoint",
				title: "Hội trường E4",
				position: { x: -3.57, y: -3.47, z: 0 },
				rotation: { x: 0, y: 0, z: 0 },
				scale: { x: 1, y: 1, z: 1 },
			},
			// {
			// 	id: "Cs1-PracticeRoomSmartGrid-1224",
			// 	type: "markPoint",
			// 	title: "Phòng thực hành Smart Grid",
			// 	position: { x: -4.49, y: -2.2, z: 0.184 },
			// 	rotation: { x: 0, y: 0, z: 0 },
			// 	scale: { x: 1, y: 1, z: 1 },
			// }
		],
	};

    // loadScene(sceneTest);

    // loadHotspots(__hotspots);
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
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

const convertXYZToString = ({ x, y, z }) => {
	return `${x} ${y} ${z}`;
}

const sceneTest = 	{
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
			type: "goAhead",
			title: "Nhà hiệu bộ",
			position: { x: -5.632, y: -9.5, z: -0.049 },
			rotation: { x: -90, y: 90, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-HallH-1224",
			type: "markPoint",
			title: "Phòng truyền thống",
			position: { x: -3.7, y: -7, z: 3.4 },
			rotation: { x: 0, y: 0, z: 0 },
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
		{
			id: "Cs1-HallLibrary-1224",
			type: "markPoint",
			title: "Thư viện",
			position: { x: -0.02, y: -3.47, z: 1.743 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-PracticeRoomSmartGrid-1224",
			type: "markPoint",
			title: "Phòng thực hành Smart Grid",
			position: { x: -4.49, y: -2.2, z: 0.184 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-EngineRoom4.0-1224",
			type: "markPoint",
			title: "Phòng nhà máy 4.0",
			position: { x: -4.38, y: -3.63, z: -1.627 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-PracticeRoomBanking-1224",
			type: "markPoint",
			title: "Phòng mô phỏng Ngân hàng",
			position: { x: -4.95, y: -2.89, z: -2.439 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-PracticeRoomAccounting-1224",
			type: "markPoint",
			title: "Phòng mô phỏng Kế toán",
			position: { x: -4.31, y: -3.1, z: -2.439 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-IUHBar-0425",
			type: "markPoint",
			title: "IUH Bar",
			position: { x: -5 , y: -0.8, z: 0.162 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-TrainingRoom-0425",
			type: "markPoint",
			title: "Phòng đào tạo",
			position: { x: -5.36, y: -5.23, z: 2.432 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-InternationalTrainingInstitute-0425",
			type: "markPoint",
			title: "Viện Đào tạo Quốc tế",
			position: { x: -4, y: -5.23, z: 2.432 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-HallE-0425",
			type: "markPoint",
			title: "Sảnh nhà hiệu bộ",
			position: { x: -3.067, y: -3.853, z: -0.0 },
			rotation: { x: 0, y: 0, z: 0.0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-E7-0425",
			type: "markPoint",
			title: "Hội trường A7",
			position: { x: -0.554, y: -3.177, z: 3.986 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
	],
}

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
}

const handleTabModify = () => {
	const popup = document.querySelector("#popup-custom-value");

	// handle chuyển tab
	const tabButtons = popup.querySelectorAll("button[data-tab]");
	const tabContents = popup.querySelectorAll(".tab-content [tab]");

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
}

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

const createAxisEntity = (spot) => {
	const axisHelper = document.createElement("a-entity");
	axisHelper.id = `axis-entity-${Date.now()}`;

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

const getSpotsFromScene = () => {
	const sceneEl = document.querySelector("a-scene");
	const spots = sceneEl.querySelectorAll("a-entity[location-id]");
	const result = [];
	spots.forEach(spot => {
		const id = spot.getAttribute("location-id") || "unknown-id";
		const type = spot.getAttribute("location-type") || "goAhead";
		const position = spot.getAttribute("position") || { x: 0, y: 0, z: 0 };
		const rotation = spot.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
		const scale = spot.getAttribute("scale") || { x: 1, y: 1, z: 1 };
		result.push({
			id,
			type,
			title: "Unknown Title",
			position,
			rotation,
			scale,
		});
	});
	return result;
}

const openCustomValuePop = () => {
	const popup = document.querySelector("#popup-custom-value");
	popup.classList.toggle("hidden", false);
}

const MenuController = {
	setFavorite: function() {
		const cam = document.querySelector("#cam");
		const rotation = getCurrentRotation();
		alert("Vị trí hiện tại đã được đặt làm vị trí mặc định!");
		console.log("Vị trí hiện tại đã được đặt làm vị trí mặc định:", rotation);
	},
	toggleCustomValuePopup: function() {
		const popup = document.querySelector("#popup-custom-value");
		popup.classList.toggle("hidden");
	},
	addHotpots: function(type = "goAHead") {
		const uniqueId = `hotspot-${Date.now()}`;
		

		const spot = {
			id: uniqueId,
			title: "Điểm di chuyển",
			type: type,
			position: { x: 0, y: 1.6, z: -3 },
			rotation: { x: 0, y: 0, z: 0 },
		};

		const aEntity = createAxisEntity(spot);
	}
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

function loadScene(data) {
	const sceneData = data || sceneTest;
	if (!sceneData || !sceneData.id) {
		console.warn("Invalid scene data:", sceneData);
		return;
	}

	removeAllSpots();

	const sceneEl = document.querySelector("a-scene");
	
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
}

window.onload = function () {
	window.__cam = document.querySelector("#cam");
	handleTabModify();
	const locationBtn = document.querySelector(".btn-add-location");
	const submenu = document.querySelector(".submenu");

	locationBtn.addEventListener("click", () => {
		submenu.classList.toggle("hidden");
	});
}
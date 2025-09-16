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

const setCustomObjectTab = (id, { posX, posY, posZ, rotX, rotY, rotZ }) => {
	const popup = document.querySelector("#popup-custom-value");
	popup.setAttribute("current-object-id", id);
	popup.querySelector("input[data-input='posX']").value = posX;
	popup.querySelector("input[data-input='posY']").value = posY;
	popup.querySelector("input[data-input='posZ']").value = posZ;
	popup.querySelector("input[data-input='rotX']").value = rotX;
	popup.querySelector("input[data-input='rotY']").value = rotY;
	popup.querySelector("input[data-input='rotZ']").value = rotZ;
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
				obj.setAttribute("position", position);
				obj.setAttribute("rotation", rotation);
			}
		});
	});

	tabButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			const tab = btn.getAttribute("data-tab");

			if (tab === "position" || tab === "rotation") {
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
				popup.style.display = "none";
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
	}
}

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
}
/**
 * Get the position in front of the camera
 * @param {number} distance Distance in front of the camera
 * @returns {Object} Position {x, y, z}
 */
function getForwardPosition(distance = 5) {
    const sceneEl = document.querySelector("a-scene");
	const cameraEl = sceneEl.querySelector("#cam");

	if (!cameraEl) return console.warn("Không tìm thấy camera.");

	// --- Lấy position và rotation từ camera ---
	const camPos = cameraEl.getAttribute("position");
	const camRot = cameraEl.getAttribute("rotation");

	// --- Tính vị trí hotspot phía trước camera ---
	const radY = THREE.MathUtils.degToRad(camRot.y);
	const radX = THREE.MathUtils.degToRad(camRot.x);

	const hotspotPos = {
		x: camPos.x - distance * Math.sin(radY),
		y: camPos.y + distance * Math.sin(radX),
		z: camPos.z - distance * Math.cos(radY),
	};

    return hotspotPos;  
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


AFRAME.components["look-controls"].Component.prototype.onTouchMove = function (
	t
) {
	if (this.touchStarted && this.data.touchEnabled) {
		setTimeout(() => {
			this.pitchObject.rotation.x +=
				((Math.PI * (t.touches[0].pageY - this.touchStart.y)) /
					this.el.sceneEl.canvas.clientHeight) *
				0.5;

			this.yawObject.rotation.y +=
				((Math.PI * (t.touches[0].pageX - this.touchStart.x)) /
					this.el.sceneEl.canvas.clientWidth) *
				0.3;

			// Chống vượt quá 90 độ
			this.pitchObject.rotation.x = Math.max(
				Math.PI / -2,
				Math.min(Math.PI / 2, this.pitchObject.rotation.x)
			);
			this.touchStart = {
				x: t.touches[0].pageX,
				y: t.touches[0].pageY,
			};
		}, 150);
	}
};

AFRAME.registerComponent("custom-look", {
	init: function () {
		let el = this.el;
		el.addEventListener("update-xy", function (t) {
			let lookControls = el.components["look-controls"];
			if (lookControls) {
				lookControls.pitchObject.rotation.x = t.detail.x;
				lookControls.yawObject.rotation.y = t.detail.y;
			}
		});
	},
	getCurrentRotation: function () {
		let lookControls = this.el.components["look-controls"];
		if (lookControls) {
			return {
				x: lookControls.pitchObject.rotation.x,
				y: lookControls.yawObject.rotation.y,
			};
		}
	},
});
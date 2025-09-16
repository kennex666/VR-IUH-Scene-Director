AFRAME.registerComponent("hotspots", {
	init: function () {
		this.el.addEventListener("reloadspots", function (evt) {
			console.log("Reloading spots", evt.detail);
			// Lấy toàn bộ nhóm điểm hiện tại và đặt scale về 0
			var currspotgroup = document.getElementById(evt.detail.currspots);
			const spotGroupElement = document.getElementById("spots");
			const locationId = evt.detail.newspots.replace("spotGroup-", "");
			if (currspotgroup) currspotgroup.setAttribute("scale", "0 0 0");
			logger && logger.enterScene(locationId);

			// Lấy toàn bộ nhóm điểm mới và đặt scale về 1
			// Load only click point
			// remove first child of spotGroupElement
			while (spotGroupElement.firstChild) {
				spotGroupElement.removeChild(spotGroupElement.firstChild);
			}
			for (const key in dataLocation) {
				if (key == locationId) {
					const location = dataLocation[key];
					const spotGroup = createSpotGroup(
						key,
						location,
						dataLocation[key]?.isDefault ? true : false
					);
					spotGroupElement.appendChild(spotGroup);
					break;
				}
			}

			var newspotgroup = document.getElementById(evt.detail.newspots);

			loadDataLocation(evt.detail.newspots.replace("spotGroup-", ""));
			if (newspotgroup) newspotgroup.setAttribute("scale", "1 1 1");
		});
	},
});

AFRAME.registerComponent("spot", {
	schema: {
		linkto: { type: "string", default: "" },
		spotgroup: { type: "string", default: "" },
		previewTitle: { type: "string", default: "Next to" },
		type: { type: "string", default: "goAhead" }, // Thêm thuộc tính type
	},
	init: function () {
		var el = this.el;

		var data = this.data;

		// el.setAttribute("look-at", "#cam");

		if (data.type != "highLight") {
			// Load preview image
			let mouseMoveHandler = function (e) {
				// const overlay = document.getElementById("overlay");
				// if (overlay) {
				// 	if (!overlay.classList.contains("hidden")) {
				// 		const queryTarget = document.querySelector("#target-info");
				// 		const img = document.querySelector("#target-info > img");

				// 		if (!img || !img.src) {
				// 			// ❌ Không có ảnh hoặc chưa có src
				// 			queryTarget.classList.toggle("hidden", true);
				// 			return;
				// 		}
				// 	}
				// }
				if (PageController.settings.isButtonsDisabled) {
					return;
				}
				console.log("Mouse move");
				const infospot = document.getElementById("target-info");
				if (infospot) {
					const infospotWidth = infospot.offsetWidth;
					const infospotHeight = infospot.offsetHeight;
					let { x, y } = getPointerXY(e);

					let infoPositionY =
						y - infospotHeight - 20 < 0
							? y + 20
							: y - infospotHeight - 20;
					let infoPositionX =
						x + infospotWidth + 30 > window.innerWidth
							? x - infospotWidth - 20
							: x;

					infospot.style.left = infoPositionX + "px";
					infospot.style.top = infoPositionY + "px";

					infospot.querySelector("img").src =
						dataLocation[
							data.linkto.slice(1, data.linkto.length)
						].assets.images.preview;
					infospot.querySelector("p").textContent = data.previewTitle;
				}
			};

			el.addEventListener("mouseenter", function (e) {
				if (PageController.settings.isButtonsDisabled) {
					return;
				}
				let hotspotGroup = el.parentElement;
				if (hotspotGroup) {
					let scale = hotspotGroup.getAttribute("scale");
					// console.log("Mouse enter - Scale của hotspot:", scale);

					if (scale.x < 0.01 && scale.y < 0.01 && scale.z < 0.01) {
						console.log("Mouse hover hidden point");
						return;
					}
				}
				const infospot = document.getElementById("target-info");
				if (infospot) {
					// get mouse position and move the infospot
					infospot.classList.toggle("hidden", false);

					e.target.sceneEl.canvas.addEventListener(
						"mousemove",
						mouseMoveHandler
					);

					if (isTouchDevice) {
						document.addEventListener("touchmove", function (e) {
							mouseMoveHandler(e);
						});
					}

					logger &&
						logger.hoverHotspot(
							data.linkto.slice(1, data.linkto.length)
						);
				}
			});

			el.addEventListener("mouseleave", function (e) {
				if (PageController.settings.isButtonsDisabled) {
					return;
				}
				const infospot = document.getElementById("target-info");
				if (infospot) {
					// hide the infospot
					// remove the mousemove event listener
					infospot.classList.toggle("hidden", true);
					e.target.sceneEl.canvas.removeEventListener(
						"mousemove",
						mouseMoveHandler
					);
					if (isTouchDevice) {
						document.removeEventListener("touchmove", function (e) {
							mouseMoveHandler(e);
						});
					}
				}
			});

			el.addEventListener("click", function (e) {
				if (PageController.settings.isButtonsDisabled) {
					return;
				}
				if (PageController.settings.developmentSettings.stopGoAhead)
					return;
				let hotspotGroup = el.parentElement;
				let scale = hotspotGroup.getAttribute("scale");
				if (scale.x < 0.01 && scale.y < 0.01 && scale.z < 0.01) {
					// console.log("Không hiển thị tooltip do scale là 0 0 0");
					console.log("Mouse click hidden point");
					return;
				}
				// Đặt nguồn skybox thành hình ảnh mới theo điểm
				// old handle for reset camera
				// camera.components["look-controls"].yawObject.rotation.set(0, 0, 0);
				// camera.components['look-controls'].pitchObject.rotation.set(0, 0, 0);

				// Tắt tooltip
				const infospot = document.getElementById("target-info");
				if (infospot) {
					// hide the infospot
					// remove the mousemove event listener
					infospot.classList.toggle("hidden", true);
					e.target.sceneEl.canvas.removeEventListener(
						"mousemove",
						mouseMoveHandler
					);
				}

				var sky = document.getElementById("skybox");
				sky.setAttribute("src", data.linkto);

				turnRotate();
				var spotcomp = document.getElementById("spots");
				var currspots = this.parentElement.getAttribute("id");
				// Tạo sự kiện cho component spots để thay đổi dữ liệu điểm
				spotcomp.emit("reloadspots", {
					newspots: data.spotgroup,
					currspots: currspots,
				});

				turnRotate();
			});
		}
	},
});

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
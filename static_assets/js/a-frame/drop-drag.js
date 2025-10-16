AFRAME.registerComponent("handle-drag-and-drop", {
    schema: {
        // Define any schema properties if needed
        axis: { type: "string", default: "x" },
        targetEl: { type: "selector", default: "#targetBox" }
    },
    init: function (){
        const el = this.el;
        const data = this.data;
        this.isHolding = false;
        this.isHoldThisObject = false;
        this.targetEl = data.targetEl;
        this.handleMovement(el);

        // Check góc nhìn
        
    },
    handleMovement: function (el) {

        el.addEventListener("mouseenter", (event) => {
            const isVisible = this.el.parentElement.getAttribute("visible");
			if (!isVisible) return;
            if (window.__holdingAxis && window.__holdingAxis !== this.data.axis) return;

            if (window.__holdingTarget && window.__holdingTarget !== this.el) return;
			this.isHoldThisObject = true;
            window.__cam.components["look-controls"].pause();
            window.__holdingAxis = this.data.axis;
            window.__holdingTarget = this.el;
		});

        window.addEventListener("mousemove", (event) => {
			if (!this.isHoldThisObject || !this.isHolding) return;
			if (window.__holdingTarget !== this.el) return;

			const cam = document.querySelector("#cam").object3D;
			const target = this.targetEl.object3D;
			const moveSpeed = 0.03;

			// hướng camera
			const dir = new THREE.Vector3();
			cam.getWorldDirection(dir);
			const right = new THREE.Vector3()
				.crossVectors(cam.up, dir)
				.normalize();
			const up = cam.up.clone().normalize();

			// hướng trục của object
			const xAxis = new THREE.Vector3(1, 0, 0)
				.applyQuaternion(target.quaternion)
				.normalize();
			const yAxis = new THREE.Vector3(0, 1, 0)
				.applyQuaternion(target.quaternion)
				.normalize();
			const zAxis = new THREE.Vector3(0, 0, 1)
				.applyQuaternion(target.quaternion)
				.normalize();

			// vector kéo theo chuột
			const moveVec = new THREE.Vector3()
				.addScaledVector(right, event.movementX * moveSpeed)
				.addScaledVector(up, -event.movementY * moveSpeed);

			// chiếu lên trục đang kéo
			let axisVec =
				this.data.axis === "x"
					? xAxis
					: this.data.axis === "y"
					? yAxis
					: zAxis;

			const dragVec = axisVec
				.clone()
				.multiplyScalar(moveVec.dot(axisVec));

			target.position.add(dragVec);
			this.targetEl.setAttribute("position", target.position);
		});
        window.addEventListener("mouseup", (event) => {
            this.isHolding = false;
            this.isHoldThisObject = false;
            window.__cam.components["look-controls"].play();
            window.__holdingAxis = null;
            window.__holdingTarget = null;
        });

        window.addEventListener("mousedown", (event) => {
            this.isHolding = true;
        });
    },
    getCurrentCameraDirection: function() {
        const cam = document.querySelector("#cam");
        const direction = new THREE.Vector3();
        cam.object3D.getWorldDirection(direction);
        return direction;
    },
    getCameraRotation: function() {
        const cam = document.querySelector("#cam");
        const rotation = cam.getAttribute("rotation");
        return rotation;
    },
    handleXYZMovement: function() {
        const direction = this.getCurrentCameraDirection();
        const rotation = this.getCameraRotation();
        // console.log(direction);
        return {
			xDirect: rotation.y >= 90 ? -1 : 1,
			yDirect: 1,
			zDirect: direction.x >= 0 ? 1 : -1,
		};
    },
})
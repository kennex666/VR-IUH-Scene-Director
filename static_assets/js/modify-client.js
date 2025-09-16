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
        el.addEventListener("mouseleave", (event) => {
			this.isHoldThisObject = true;

        });

        el.addEventListener("mouseenter", (event) => {
			this.isHoldThisObject = true;
            window.__cam.components["look-controls"].pause();
		});

        window.addEventListener("mousemove", (event) => {
            if (this.isHoldThisObject && this.isHolding) {
                const { xDirect, yDirect, zDirect } = this.handleXYZMovement();
                const { x, y, z } = this.targetEl.getAttribute("position");
                if (this.data.axis === "x")
                    this.targetEl.setAttribute("position", {
						x: x + event.movementX * 0.01 * xDirect,
						y: y,
						z: z,
					});
                else if (this.data.axis === "y")
                    this.targetEl.setAttribute("position", {
						x: x,
						y: y - (event.movementY * 0.01 * yDirect),
						z: z,
					}); 
                else if (this.data.axis === "z")
                    this.targetEl.setAttribute("position", {
						x: x,
						y: y,
						z: z - (event.movementY * 0.01 + event.movementX * 0.01 * zDirect),
					});

                // Dispatch event position-change
                const newPos = this.targetEl.getAttribute("position");
                document.dispatchEvent(new CustomEvent("position-change", {
                    detail: {
                        id: this.targetEl.id,
                        x: newPos.x,
                        y: newPos.y,
                        z: newPos.z,
                    }
                }));
                // console.log("Position changed:", newPos);
            }
        });
        window.addEventListener("mouseup", (event) => {
            this.isHolding = false;
            this.isHoldThisObject = false;
            window.__cam.components["look-controls"].play();
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
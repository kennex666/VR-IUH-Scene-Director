function createAxis({id, rotation, axis, color}) {
	const axisEntity = document.createElement("a-entity");
	axisEntity.setAttribute("handle-drag-and-drop", `axis: ${axis}; targetEl: #${id}`);
	axisEntity.setAttribute("class", "axis clickable");
	axisEntity.setAttribute("rotation", rotation);

	const shaft = document.createElement("a-entity");
	shaft.setAttribute(
		"geometry",
		"primitive: cylinder; radius: 0.005; height: 1.2"
	);
	shaft.setAttribute("position", "0 0.6 0");
	shaft.setAttribute("material", `color: ${color}`);
	shaft.setAttribute("class", "axis clickable");

	const head = document.createElement("a-entity");
	head.setAttribute(
		"geometry",
		"primitive: cone; radiusBottom: 0.06; height: 0.2"
	);
	head.setAttribute("position", "0 1.3 0");
	head.setAttribute("material", `color: ${color}`);
	head.setAttribute("class", "axis clickable");

	axisEntity.appendChild(shaft);
	axisEntity.appendChild(head);

	return axisEntity;
}

/**
 * Tạo helper trục X,Y,Z
 * @param {string} id - id của entity (mặc định "targetBox")
 * @param {string} position - vị trí (mặc định "0 1.25 -3")
 */
function createAxisHelper(id = "targetBox", position = "0 1.25 -3") {
	const container = document.querySelector(`#${id}`);
	if (!container) {
		console.error(`Element with id "${id}" not found.`);
		return false;
	}
	container.setAttribute("position", position);
	container.setAttribute("rotation", "0 0 0");

	const entity = document.createElement("a-entity");
    entity.setAttribute("class", "axis-helper");

	// X axis (red)
	entity.appendChild(createAxis({
        id: id,
        axis: "x",
        color: "#ff4444",
        rotation: "0 0 -90"
    }));

	// Y axis (green)
	entity.appendChild(createAxis({
        id: id,
        axis: "y",
        color: "#44ff44",
        rotation: "0 0 0"
    }));

	// Z axis (blue)
	entity.appendChild(createAxis({
        id: id,
        axis: "z",
        color: "#4444ff",
        rotation: "90 0 0"
    }));
    container.appendChild(entity);

    return true;
}
AFRAME.registerComponent("axis-helper", {
    init: function () {
        const el = this.el;
        createAxisHelper(el.id);
        this.isSelected = false;

        const groupAxis = el.querySelector(".axis-helper");

        groupAxis.setAttribute("visible", false);
    }
});

AFRAME.registerComponent("axis-selector", {
    init: function () {
        const el = this.el;
        const parent = el.parentElement;

        el.addEventListener("click", (event) => {
            const groupAxis = parent.querySelector(".axis-helper");
            if (groupAxis) {
                const isVisible = groupAxis.getAttribute("visible");
                groupAxis.setAttribute("visible", !isVisible);
            }
        });
    }
});

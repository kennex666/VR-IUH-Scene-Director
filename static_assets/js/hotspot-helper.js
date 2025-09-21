function createLHighlightSpots(spot) {
	const spotElement = document.createElement("a-image");
	const imgData = createImageCanvasWithFont({
		text: spot.title,
		fontSize: 100,
		color: "white",
		imageType: "jpg",
	});
	spotElement.setAttribute("src", imgData);
	// Đặt kích thước cho `a-image`
	setScaleBasedOnTitleLength(spotElement, spot.title);

	// Đặt các thuộc tính `spot`
		spotElement.setAttribute("look-at", "#cam");
	// Đặt thuộc tính `position`
	const position = `${spot.position.x} ${spot.position.y} ${spot.position.z}`;
	spotElement.setAttribute("position", position);
    spotElement.classList.add("clickable");
    spotElement.setAttribute("axis-selector", "");

	return spotElement;
}

function createMarkPoint(spot) {
	// Tạo mặt phẳng vô hình
	const planeElement = document.createElement("a-plane");
	planeElement.setAttribute("color", "transparent");
	planeElement.setAttribute("opacity", "0");
	planeElement.setAttribute("width", "1");
	planeElement.setAttribute("height", "1");
	planeElement.setAttribute("look-at", "#cam");

	// Đặt các thuộc tính `spot` cho mặt phẳng
	
	// Đặt thuộc tính `position` cho mặt phẳng
	const position = `0 0 0`;
	planeElement.setAttribute("position", position);

	// Tạo `a-ring` bên trong mặt phẳng
	const ringElement = document.createElement("a-ring");
	ringElement.setAttribute("radius-inner", "0.02");
	ringElement.setAttribute("radius-outer", "0.07");
	ringElement.setAttribute("look-at", "#cam");
	ringElement.setAttribute("color", "#fff");

	// Thêm animation cho `a-ring`
	ringElement.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeOutQuad; loop: true"
	);
	ringElement.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeOutQuad; loop: true"
	);

	const ringElement2 = document.createElement("a-ring");
	ringElement2.setAttribute("radius-inner", "0.00");
	ringElement2.setAttribute("radius-outer", "0.05");
	ringElement2.setAttribute("look-at", "#cam");
	ringElement2.setAttribute("color", "#FF6B6B");

	// Thêm animation cho `a-ring`
	ringElement2.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeInOutSine; loop: true"
	);
	ringElement2.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeInOutSine; loop: true"
	);

	const ringElement3 = document.createElement("a-ring");
	ringElement3.setAttribute("radius-inner", "0.07");
	ringElement3.setAttribute("radius-outer", "0.09");
	ringElement3.setAttribute("look-at", "#cam");
	ringElement3.setAttribute("color", "#262261");

	// Thêm animation cho `a-ring`
	ringElement3.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeInOutSine; loop: true"
	);
	ringElement3.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeInOutSine; loop: true"
	);

	// const colors = ["#EEDF7A", "#FF6B6B", "#6BCB77", "#4D96FF", "#C780FA"];
	// let currentColorIndex = 0;

	// const intervalId = setInterval(() => {
	// 	currentColorIndex = (currentColorIndex + 1) % colors.length;
	// 	ringElement.setAttribute("color", colors[currentColorIndex]);
	// 	console.log("Change color to", colors[currentColorIndex]);
	// }, 500); // đổi màu mỗi 0.5s

	// 262261

	// Thêm `a-ring` vào mặt phẳng
	planeElement.appendChild(ringElement);
	planeElement.appendChild(ringElement2);
	planeElement.appendChild(ringElement3);
    planeElement.classList.add("clickable");
	planeElement.setAttribute("axis-selector", "");

	return planeElement;
}


function createSpot(spot) {
	const spotElement = document.createElement("a-image");

	// Đặt các thuộc tính `spot`
	
	// Đặt thuộc tính `position`
	const position = `0 0 0`;
	spotElement.setAttribute("position", position);
	spotElement.setAttribute("src", "#hotspot");

	// lấy rotation của spot
	spotElement.setAttribute(
		"rotation",
		`0 0 0`
	);

	// animation cho spot khi hover vào to len va nho lai
	// spotElement.addEventListener("mouseenter", () => {
	// 	spotElement.setAttribute(
	// 		"animation",
	// 		"property: scale; to: 1.3 1.3 1.3; dur: 500; easing: linear; loop: false"
	// 	);
	// });
	// spotElement.addEventListener("mouseleave", () => {
	// 	spotElement.setAttribute(
	// 		"animation",
	// 		"property: scale; from: 1 1 1; to: 1.3 1.3 1.3; dir: alternate; dur: 700; loop: true"
	// 	);
	// });

	spotElement.setAttribute(
		"animation",
		"property: scale; from: 1 1 1; to: 1.3 1.3 1.3; dir: alternate; dur: 700; loop: true"
	);
    
    spotElement.classList.add("clickable");
	spotElement.setAttribute("axis-selector", "");

	return spotElement;
}

function createSpotGroup(id, location, isShow = false) {
	const spotGroup = document.createElement("a-entity");
	spotGroup.id = "spotGroup" + "-" + id;

	spotGroup.setAttribute("scale", isShow ? "1 1 1" : "0 0 0");

	if (location.spots)
		location.spots.forEach((spot) => {
			if (spot.type == "goAhead") {
				const spotElement = createSpot(spot);
				spotGroup.appendChild(spotElement);
			} else if (spot.type == "highLight") {
				const spotElement = createLHighlightSpots(spot);
				spotGroup.appendChild(spotElement);
			} else if (spot.type == "markPoint") {
				const spotElement = createMarkPoint(spot);
				spotGroup.appendChild(spotElement);
			}
		});

	return spotGroup;
}
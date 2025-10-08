/*
    Event listener for adding a new hotspot
*/
document.addEventListener("add-hotspot", (event) => {
	const spot = event.detail;

	const aEntity = createAxisEntity(spot);

	document.querySelector("a-scene").appendChild(aEntity);

	setTimeout(() => {
		findHotspot(spot.id);
	}, 300);
});

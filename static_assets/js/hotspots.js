function HotspotsElement ( { id, name, imageUrl } ) {
    //      <li>
    //     <button class="w-full text-left px-2 py-1 rounded hover:bg-white/30 relative" data-location-id="Cs1-Sky-1224" onclick="">
    //       <img src="./static_assets/img/360/Cs1-E7-0425.jpg" alt="Trụ sở chính" class="w-full h-28 object-cover inline-block">
    //       <div class="bottom-1 absolute px-2 py-1 bg-[--color-primary] text-sm">Trụ sở chính</div>
    //     </button>
    //   </li>
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = "w-full text-left px-2 py-1 rounded hover:bg-white/30 relative";
    button.setAttribute('data-location-id', id);
    button.setAttribute('onclick', `findHotspot('${id}')`);
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    img.className = "w-full h-28 object-cover inline-block";
    const div = document.createElement('div');
    div.className = "bottom-1 absolute px-2 py-1 bg-[--color-primary] text-sm";
    div.textContent = name;
    button.appendChild(img);
    button.appendChild(div);
    li.appendChild(button);
    return li;
}

function findHotspot(id) {
	const sceneEl = document.querySelector("a-scene");
	const hotspot = sceneEl.querySelector(`a-entity[location-id='${id}']`);
	const hotspotHitBox = hotspot?.querySelector("[axis-selector]");
	const cameraEl = sceneEl.querySelector("[camera]");
	const lookComponent = cameraEl?.components["custom-look"];
    const data = __hotspots.find(h => h.id === id);

	if (hotspot && hotspotHitBox) {
		// Gọi click
		const click = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		hotspotHitBox.dispatchEvent(click);

		// --- Lấy vị trí của hotspot ---
		const hotspotPos = new THREE.Vector3();
		hotspot.object3D.getWorldPosition(hotspotPos);

		// --- Lấy vị trí của camera ---
		const cameraPos = new THREE.Vector3();
		cameraEl.object3D.getWorldPosition(cameraPos);

		// --- Tính hướng nhìn ---
		const targetVector = new THREE.Vector3()
			.subVectors(hotspotPos, cameraPos)
			.normalize();
		const targetRotation = new THREE.Euler().setFromVector3(
			new THREE.Vector3(
				Math.asin(targetVector.y),
				Math.atan2(-targetVector.x, -targetVector.z),
				0
			)
		);

		// --- Cập nhật rotation cho camera ---
		cameraEl.object3D.rotation.x = targetRotation.x;
		cameraEl.object3D.rotation.y = targetRotation.y;

		// --- Nếu custom-look có sự kiện cập nhật ---
		if (lookComponent) {
			cameraEl.emit("update-xy", {
				x: targetRotation.x,
				y: targetRotation.y,
			});
		}
        return true;
	} else {
        // Create popup to select type of hotspot
        PopupSelectTypeHotspot((selectedType) => {
            // Dispatch event add-hotspot
            document.dispatchEvent(
				new CustomEvent("add-hotspot", {
					detail: {
						id: id,
						type: selectedType,
						position: getForwardPosition(5),
						rotation: { x: 0, y: 0, z: 0 },
						scale: { x: 1, y: 1, z: 1 },
						title: data.name,
						imageUrl: data.imageUrl,
					},
				})
			);
        });
        return false;
	}
}

function PopupSelectTypeHotspot(onSelect) {
    const popup = document.createElement('div');
    popup.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    popup.innerHTML = `
        <div class="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 class="text-lg font-bold mb-4">Chọn loại hotspot</h2>
            <div class="mb-4 text-sm">Điểm này chưa được thêm vào cảnh mới, hãy chọn loại hotpots:</div>
            <select id="hotspot-type" class="w-full border border-gray-300 rounded p-2 mb-4">
                <option value="goAHead">Mũi tên chỉ đường</option>
                <option value="markPoint">Điểm nhấp nháy</option>
            </select>
            <div class="flex justify-end">
                <button id="cancel-btn" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button id="select-btn" class="bg-blue-500 text-white px-4 py-2 rounded">Select</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector('#cancel-btn').onclick = () => {
        document.body.removeChild(popup);
    };
    popup.querySelector('#select-btn').onclick = () => {
        const selectedType = popup.querySelector('#hotspot-type').value;
        onSelect(selectedType);
        document.body.removeChild(popup);
    };
}

function loadHotspots(hotspots) {
    const container = document.getElementById("location-list");
    if (!container) {
        console.error('Element with id "location-list" not found.');
        return;
    }   
    container.innerHTML = ''; // Clear existing hotspots

    hotspots.forEach(hotspot => {
        const hotspotElement = HotspotsElement(hotspot);
        container.appendChild(hotspotElement);
    })
}
let sceneTest = {
	id: "Cs1-Sky-1224",
	title: "Trụ sở chính",
	isDefault: true,
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
			type: "goAHead",
			title: "Nhà hiệu bộ",
			position: { x: -5.632, y: -9.5, z: -0.049 },
			rotation: { x: -90, y: 90, z: 0 },
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
		// {
		// 	id: "Cs1-PracticeRoomSmartGrid-1224",
		// 	type: "markPoint",
		// 	title: "Phòng thực hành Smart Grid",
		// 	position: { x: -4.49, y: -2.2, z: 0.184 },
		// 	rotation: { x: 0, y: 0, z: 0 },
		// 	scale: { x: 1, y: 1, z: 1 },
		// }
	],
};

// loadScene(sceneTest);

// loadHotspots(__hotspots);
// loadLocations([sceneTest]);
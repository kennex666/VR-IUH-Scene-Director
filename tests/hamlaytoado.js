// Select the camera entity
let cameraEl = document.querySelector("[camera]");

// Access the custom-look component
let rotation = cameraEl.components["custom-look"].getCurrentRotation();

console.log("Current Rotation:", rotation);

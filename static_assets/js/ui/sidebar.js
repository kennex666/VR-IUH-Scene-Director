/**
 * Register event to handle close sidebar
 */
function handleCloseSlideBar() {
	const btnClose = document.querySelector("#close-side-menu");
	const sidebar = document.querySelector("#side-menu");
	if (btnClose && sidebar) {
		btnClose.addEventListener("click", () => {
			sidebar.classList.toggle("-translate-x-full");
		});
	}
}

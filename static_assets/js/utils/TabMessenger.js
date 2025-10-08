class TabMessenger {
	constructor(role, targetWindow = null, targetOrigin = "*") {
		this.role = role;
		this.targetWindow = targetWindow;
		this.targetOrigin = targetOrigin;
		this.handlers = {};

		this.listener = (event) => {
			const { type, payload } = event.data || {};
			if (type && this.handlers[type]) {
				this.handlers[type](payload, event);
			}
		};

		window.addEventListener("message", this.listener);
	}

	on(type, handler) {
		this.handlers[type] = handler;
	}

	send(type, payload) {
		if (this.role === "admin" && this.targetWindow) {
			this.targetWindow.postMessage({ type, payload }, this.targetOrigin);
		} else if (this.role === "scene" && window.opener) {
			window.opener.postMessage({ type, payload }, this.targetOrigin);
		}
	}

	destroy() {
		window.removeEventListener("message", this.listener);
		this.handlers = {};
		this.targetWindow = null;
	}
}

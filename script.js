const app = new Application({
	el: "canvas",
	width: 500,
	height: 500,
	backgound: "#d2d2d2",
});

const bezier = new Bezier({
	step: 0.001,
	nodes: [
		{ x: 100, y: 100 },
		{ x: 400, y: 200 },
		{ x: 100, y: 400 },
		{ x: 150, y: 150 },
		{ x: 450, y: 250 },
		{ x: 150, y: 450 },
	],
});

let pointUnderMouse = null;

app.container.push(bezier);

app.tickHandlers.push(({ fps }) => {
	if (app.mouse.over && app.mouse.click) {
		pointUnderMouse = bezier.getPointUnder(
			(app.mouse.x - app.camera.offsetX) / app.camera.scale,
			(app.mouse.y - app.camera.offsetY) / app.camera.scale
		);
	}

	if (!pointUnderMouse && app.mouse.left) {
		app.camera.offsetX += app.mouse.dx;
		app.camera.offsetY += app.mouse.dy;
	}

	if (!app.mouse.left) {
		pointUnderMouse = null;
	}

	if (app.mouse.over && pointUnderMouse) {
		pointUnderMouse.x = (app.mouse.x - app.camera.offsetX) / app.camera.scale;
		pointUnderMouse.y = (app.mouse.y - app.camera.offsetY) / app.camera.scale;
	}
});

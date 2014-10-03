window.onload = function () {
	var canvas = document.getElementById('canvasBox');

	var Scene = new QUICKIE.inintScene(canvas);

	Scene.addMesh("Soleil", 34, new BABYLON.Vector3(0, 0, 0), "soleil");
	Scene.addMesh("Mercure", 2, new BABYLON.Vector3(0, 0, 58 / 2), "Mercure");
	Scene.addMesh("Vénus", 6, new BABYLON.Vector3(0, 0, 108 / 2), "Venus");
	Scene.addMesh("Terre", 6, new BABYLON.Vector3(0, 0, 150 / 2), "Terre");
	Scene.addMesh("Mars", 3, new BABYLON.Vector3(0, 0, 228 / 2), "Mars");
	Scene.addMesh("Jupiter", 22, new BABYLON.Vector3(0, 0, 408 / 2), "Jupiter");
	Scene.addMesh("Saturne", 18, new BABYLON.Vector3(0, 0, 550 / 2), "Saturne");

     new QUICKIE.animation(Scene.scene);

}
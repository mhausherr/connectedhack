var QUICKIE = QUICKIE || {};

(function () {

	// Contructor
	QUICKIE.inintScene = function (connectedCanvas) {
		this.connectedCanvas = connectedCanvas;
		var that = this;

		// Check support
		if (!BABYLON.Engine.isSupported()) {
			window.alert('Browser not supported');
		} else {
			// Babylon
			this.engine = new BABYLON.Engine(this.connectedCanvas, true);
			this.scene = new BABYLON.Scene(this.engine);

			//Adding Camera
			this.originCamera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(-100, 20, 0), this.scene);
			this.originCamera.attachControl(this.connectedCanvas, true);
			//this.originCamera.setTarget(new BABYLON.Vector3(0, 50, 0));

			this.objCameraOculus = new BABYLON.OculusOrientedCamera.BuildOculusStereoCamera(this.scene, "Oculus", this.originCamera.minZ,
			this.originCamera.maxZ, this.originCamera.position,
			{ yaw: 3, pitch: 0, roll: 0 }, false, true, true);

			// Light
			this.light0 = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), this.scene);
			this.light0.specular = new BABYLON.Color3(0, 0, 0);

			this.light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 700), this.scene);
			this.light1.specular = new BABYLON.Color3(0, 0, 0);
			this.light1.diffuse = new BABYLON.Color3(70 / 255, 70 / 255, 70 / 255);

			this.engine.runRenderLoop(function () {
				that.scene.render();
			});
		}

		// - - - SKYBOX - - - 
		this.skybox = BABYLON.Mesh.CreateBox("skyBox", 900, this.scene);
		this.skybox.isPickable = false;
		var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
		skyboxMaterial.backFaceCulling = false;
		this.skybox.material = skyboxMaterial;
		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/Images/skybox/skyboxEtoile", this.scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	};

	QUICKIE.inintScene.prototype.addMesh = function (nom, taille, placement, material) {

		var object = new BABYLON.Mesh.CreateSphere(nom, taille + 20, taille, this.scene, true);

		if (material) {
			var mat = new BABYLON.StandardMaterial(nom, this.scene);
			if (material == "soleil") {
				mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
				mat.specularColor = new BABYLON.Color3(1, 1, 1);
				mat.specularPower = 32;
				mat.ambientColor = new BABYLON.Color3(1, 1, 1);
				mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
			}
			mat.diffuseTexture = new BABYLON.Texture("/Images/" + material + ".jpg", this.scene);
			object.material = mat;
		}
		object.position = placement;

		if (nom == "Saturne") {
			var SaturneAnneaux = new BABYLON.Mesh.CreateTorus("Anneaux", 38, 9, 40, this.scene, false);
			var matSaturneAnneaux = new BABYLON.StandardMaterial("SaturneAnneaux", this.scene);
			matSaturneAnneaux.diffuseTexture = new BABYLON.Texture("/Images/annSat.jpg", this.scene);
			SaturneAnneaux.material = matSaturneAnneaux;
			SaturneAnneaux.scaling.y = 0.0001;
			SaturneAnneaux.parent = object;
		}
	};

})();
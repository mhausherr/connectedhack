var QUICKIE = QUICKIE || {};

(function () {

	// Contructor
	QUICKIE.animation = function (scene) {
		this.scene = scene;
		this.rotation = {
			mercure: 0,
			venus: 0,
			terre: 0,
			mars: 0,
			jupiter: 0,
			saturne : 0
		};
		this.radius = {
			mercure: 58 / 2,
			venus: 108 / 2,
			terre: 150 / 2,
			mars: 228 / 2,
			jupiter: 408 / 2,
			saturne: 550 / 2
		};
		var that = this;

		this.scene.registerBeforeRender(function () {
			that.rotationPlanet();
			that.movePlanet();
		});
	}

	QUICKIE.animation.prototype.movePlanet = function () {
		for (var i = 0; i < this.scene.meshes.length; i++) {
			this.scene.meshes[i].position.y = 0;
			switch (this.scene.meshes[i].name) {
				case "Mercure":
					this.rotation.mercure += 0.005;
					this.scene.meshes[i].position.x = Math.sin(this.rotation.mercure) * this.radius.mercure;
					this.scene.meshes[i].position.z = Math.cos(this.rotation.mercure) * this.radius.mercure;
					break;
				case "Vénus":
					this.rotation.venus += 0.01;
					this.scene.meshes[i].position.x = Math.sin(this.rotation.venus) * this.radius.venus;
					this.scene.meshes[i].position.z = Math.cos(this.rotation.venus) * this.radius.venus;
					break;
				case "Terre":
					this.rotation.terre += 0.003;
					this.scene.meshes[i].position.x = Math.sin(this.rotation.terre) * this.radius.terre;
					this.scene.meshes[i].position.z = Math.cos(this.rotation.terre) * this.radius.terre;
					break;
				case "Mars":
					this.rotation.mars += 0.009;
					this.scene.meshes[i].position.x = Math.sin(this.rotation.mars) * this.radius.mars;
					this.scene.meshes[i].position.z = Math.cos(this.rotation.mars) * this.radius.mars;
					break;
				case "Jupiter":
					this.rotation.jupiter += 0.002;
					this.scene.meshes[i].position.x = Math.sin(this.rotation.jupiter) * this.radius.jupiter;
					this.scene.meshes[i].position.z = Math.cos(this.rotation.jupiter) * this.radius.jupiter;
					break;
				case "Saturne":
					this.rotation.saturne += 0.003;
					this.scene.meshes[i].position.x = Math.sin(this.rotation.saturne) * this.radius.saturne;
					this.scene.meshes[i].position.z = Math.cos(this.rotation.saturne) * this.radius.saturne;
					break;
			}
		}
	};

	QUICKIE.animation.prototype.rotationPlanet = function () {
		for (var i = 0; i < this.scene.meshes.length; i++) {
			if (this.scene.meshes[i].name != "skyBox" && this.scene.meshes[i].name != "Soleil") {
				this.scene.meshes[i].rotation.y += 0.009;
			}
			if (this.scene.meshes[i].name == "Soleil") {
				this.scene.meshes[i].rotation.y += 0.0005;
			}
		}
	}

})();
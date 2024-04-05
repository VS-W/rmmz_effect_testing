//=============================================================================
// InputTesting.js
//=============================================================================
/*:
 * @plugindesc Testing user input.
 *
 * @author LMZ
 *
 * @help
 *
 * TODO: [help info]
 *
 * License
 * TODO: [license]
 *
 * COMPATIBILITY
 * TODO: [compatibility concerns]
 */
 
 (function() {
	// Default to false when not testing, set using actual event.
	let inEvent = false;
	let debug = true;

	if (debug) {
		inEvent = true;

		setInterval(() => {
			// console.log(`up: ${LMZ_key_obj["up"]["status"]}\nleft: ${LMZ_key_obj["left"]["status"]}\ndown: ${LMZ_key_obj["down"]["status"]}\nright: ${LMZ_key_obj["right"]["status"]}`);
			// console.log(OcRam.Time_System.getTimeString().replace(":", "").split(""));
		}, 10);
	}

	let LMZ_key_obj = {
		"up": {"status": false},
		"left": {"status": false},
		"down": {"status": false},
		"right": {"status": false}
	}

	window.addEventListener("blur", (e) => {
		console.log("blur");

		LMZ_key_obj["up"]["status"] = false;
		LMZ_key_obj["left"]["status"] = false;
		LMZ_key_obj["down"]["status"] = false;
		LMZ_key_obj["right"]["status"] = false;
	});

	document.addEventListener("keydown", (e) => {
		if (inEvent) {
			if (!e.repeat) {
				LMZ_handleKeyDown(e.code);
			}
		}
	});

	document.addEventListener("keyup", (e) => {
		if (inEvent) {
			LMZ_handleKeyUp(e.code);
		}
	});

	function LMZ_handleKeyDown(key) {
		// console.log("pressed: ", key);
		switch (key) {
			case "ArrowUp":
				LMZ_key_obj["up"]["status"] = true;
				break;
			case "ArrowLeft":
				LMZ_key_obj["left"]["status"] = true;
				break;
			case "ArrowDown":
				LMZ_key_obj["down"]["status"] = true;
				break;
			case "ArrowRight":
				LMZ_key_obj["right"]["status"] = true;
				break;
			case "KeyW":
				LMZ_key_obj["up"]["status"] = true;
				break;
			case "KeyA":
				LMZ_key_obj["left"]["status"] = true;
				break;
			case "KeyS":
				LMZ_key_obj["down"]["status"] = true;
				break;
			case "KeyD":
				LMZ_key_obj["right"]["status"] = true;
				break;
		}
	}

	function LMZ_handleKeyUp(key) {
		// console.log("released:", key);
		switch (key) {
			case "ArrowUp":
				LMZ_key_obj["up"]["status"] = false;
				break;
			case "ArrowLeft":
				LMZ_key_obj["left"]["status"] = false;
				break;
			case "ArrowDown":
				LMZ_key_obj["down"]["status"] = false;
				break;
			case "ArrowRight":
				LMZ_key_obj["right"]["status"] = false;
				break;
			case "KeyW":
				LMZ_key_obj["up"]["status"] = false;
				break;
			case "KeyA":
				LMZ_key_obj["left"]["status"] = false;
				break;
			case "KeyS":
				LMZ_key_obj["down"]["status"] = false;
				break;
			case "KeyD":
				LMZ_key_obj["right"]["status"] = false;
				break;
		}
	}

	function getUsedPictureIDs() {
		let pictureIds = [];

		if ($gameScreen._pictures) {
			let pictures = $gameScreen._pictures;

			for (let i = 1; i < pictures.length; i++) {
				// Check if the picture exists (not null or undefined)
				if (pictures[i]) {
					// Add the picture ID to the array
					pictureIds.push(i);
				}
			}
		}

		return pictureIds;
	}

	// Call the function to get an array of used picture IDs
	// let usedPictureIds = getUsedPictureIDs();

 })();
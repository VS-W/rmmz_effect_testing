//=============================================================================
// LMZ_Bar.js
//=============================================================================
/*:
 * @plugindesc Simple animated progress bar.
 *
 * @author LMZ

 * @target MZ

 * @command ShowBar
 * @text Show Bar
 * @desc Shows the bar.

 * @command HideBar
 * @text Hide Bar
 * @desc Hides the bar.
 *
 * @command SetBarColor
 * @text Set Bar Color
 * @desc Set the color of the bar.
 * @arg color
 * @type string
 * @default #F000FF
 * @text Color
 * @desc Color as hex value.
 * 
 * @command SetBarPercent
 * @text Set Bar Percent
 * @desc Set the fill percent of the bar.
 * @arg percent
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.5
 * @text Percent
 * @desc Percent (as a decimal).
 */

let LMZ_bar, LMZ_bar_active = false;

(() => {
	class LMZ_Bar_Object {
		constructor() {
			this.allSprites = [];
			this.allIntervals = [];

			this.spritesheetName = 'bar2';
			this.barColor = '#00FF00';
			this.barBorderSize = 8;
			this.barInterior = 24;
			this.barHeight = 40;
			this.barLength = 500;
			this.yOffset = 10;

			this.animationSpeed = 2; // number of elapsed game frames between animation frames
			this.frameShift = 2; // number of pixels to move over on each frame across the bar
			this.animationFrames = 127; // pixels between loops of the animation
			this.fillPercent = 0.8; // change this to how much of the bar is filled

			this.reverse = true; // move along the bar forwards (false) or backwards (true)?

			this.x_anchor = 0;
			this.y_anchor = 0;

			this.currentFrame = 0;
			this.animationCounter = 0;
			this.lastFillPercent = this.fillPercent;
			this.animationFrames = this.animationFrames / this.frameShift;
		}

		setFillPercent(percent) {
			if (percent > 1) {
				percent = 1;
			}
			this.fillPercent = percent;
			if (!LMZ_bar_active) {
				this.lastFillPercent = this.fillPercent;
			}
		}
	}

	function LMZ_hideBar(bar) {
		if (bar.allSprites) {
			bar.allSprites.forEach(sprite => {
				SceneManager._scene.removeChild(sprite);
			});
		}
		LMZ_bar_active = false;
	}

	function LMZ_showBar(bar) {
		LMZ_hideBar(bar);
		LMZ_bar_active = true;

		let barBitmap = new Bitmap(bar.barLength, bar.barInterior);
		let spritesheetBitmap = ImageManager.loadPicture(bar.spritesheetName);
		let lineSprite = new Sprite();
		let frameSprite = new Sprite();
		let baseBar = new Sprite();
		bar.allSprites.push(lineSprite);
		bar.allSprites.push(frameSprite);
		bar.allSprites.push(baseBar);

		barBitmap.fillRect(0, 0, bar.barLength * bar.fillPercent - (bar.barBorderSize * 2), bar.barInterior, bar.barColor);

		baseBar.bitmap = barBitmap;
		baseBar.anchor.x = bar.x_anchor;
		baseBar.anchor.y = bar.y_anchor;

		baseBar.x = ((Graphics.width - bar.barLength) / 2) + bar.barBorderSize;
		baseBar.y = bar.yOffset + bar.barBorderSize;
		baseBar.opacity = 200;

		frameSprite.bitmap = spritesheetBitmap;
		frameSprite.anchor.x = bar.x_anchor;
		frameSprite.anchor.y = bar.y_anchor;

		frameSprite.setFrame(0, 0, bar.barLength, bar.barHeight);
		frameSprite.x = (Graphics.width - bar.barLength) / 2;
		frameSprite.y = bar.yOffset;
		frameSprite.opacity = 225;

		lineSprite.bitmap = spritesheetBitmap;
		lineSprite.anchor.x = bar.x_anchor;
		lineSprite.anchor.y = bar.y_anchor;

		lineSprite.setFrame((bar.currentFrame * bar.frameShift), bar.barHeight, bar.barLength * bar.fillPercent - (bar.barBorderSize * 2), bar.barInterior);
		lineSprite.x = ((Graphics.width - bar.barLength) / 2) + bar.barBorderSize;
		lineSprite.y = bar.yOffset + bar.barBorderSize;
		lineSprite.opacity = 150;

		lineSprite.update = function() {
			Sprite.prototype.update.call(this);

			bar.animationCounter++;

			if (bar.animationCounter >= bar.animationSpeed) {
				bar.animationCounter = 0;

				if (bar.reverse) {
					bar.currentFrame--;
					if (bar.currentFrame < 0) {
						bar.currentFrame = bar.animationFrames;
					}
				} else {
					bar.currentFrame++;
					if (bar.currentFrame >= bar.animationFrames) {
						bar.currentFrame = 0;
					}
				}

				if (bar.lastFillPercent != bar.fillPercent) {
					// TODO: actual smoothing instead of bar lol
					let diff = Math.abs(bar.lastFillPercent - bar.fillPercent) * 100;
					let changeRate = 0.009;
					if (diff >= 50) {
						changeRate = 0.008;
					} else if (diff >= 40) {
						changeRate = 0.007;
					} else if (diff >= 30) {
						changeRate = 0.006;
					} else if (diff >= 20) {
						changeRate = 0.005;
					} else if (diff >= 10) {
						changeRate = 0.004;
					} else if (diff >= 5) {
						changeRate = 0.003;
					} else if (diff >= 2) {
						changeRate = 0.002;
					} else {
						changeRate = 0.001;
					}
					if (bar.lastFillPercent > bar.fillPercent) {
						bar.lastFillPercent = bar.lastFillPercent - changeRate;
						if (bar.lastFillPercent < bar.fillPercent) {
							bar.lastFillPercent = bar.fillPercent;
						}
					} else {
						bar.lastFillPercent = bar.lastFillPercent + changeRate;
						if (bar.lastFillPercent > bar.fillPercent) {
							bar.lastFillPercent = bar.fillPercent;
						}
					}
					barBitmap.clear();
					barBitmap.fillRect(0, 0, bar.barLength * bar.lastFillPercent - (bar.barBorderSize * 2), bar.barInterior, bar.barColor);
				}
				this.setFrame((bar.currentFrame * bar.frameShift), bar.barHeight, bar.barLength * bar.lastFillPercent - (bar.barBorderSize * 2), bar.barInterior);
			}
		};
		SceneManager._scene.addChild(baseBar);
		SceneManager._scene.addChild(frameSprite);
		SceneManager._scene.addChild(lineSprite);
	}

	function LMZ_initOverrides() {
		console.log("Setting overrides...");

		let LMZ_Scene_Map_start = Scene_Map.prototype.start;
		Scene_Map.prototype.start = function() {
			LMZ_Scene_Map_start.call(this);
			console.log("Map is opened");
			
			if (LMZ_bar !== undefined && LMZ_bar_active) {
				LMZ_showBar(LMZ_bar);
			}
		};
		
		let LMZ_Scene_MenuBase_start = Scene_MenuBase.prototype.start;
		Scene_MenuBase.prototype.start = function() {
			LMZ_Scene_MenuBase_start.call(this);
			
			console.log("Menu is opened");
		};

		let LMZ_Scene_MenuBase_terminate = Scene_MenuBase.prototype.terminate;
		Scene_MenuBase.prototype.terminate = function() {
			LMZ_Scene_MenuBase_terminate.call(this);
			
			console.log("Menu is closed");
		};
	}

	LMZ_initOverrides();
	LMZ_bar = new LMZ_Bar_Object();

	PluginManager.registerCommand("LMZ_Bar", "ShowBar", () => {
		console.log("DEBUG: SHOW BAR");
		LMZ_showBar(LMZ_bar);
	});
	PluginManager.registerCommand("LMZ_Bar", "HideBar", () => {
		console.log("DEBUG: HIDE BAR");
		LMZ_hideBar(LMZ_bar);
	});
	PluginManager.registerCommand("LMZ_Bar", "SetBarColor", (args) => {
		console.log("DEBUG: SET BAR COLOR", args.color);
		LMZ_bar.barColor = args.color;
		if (LMZ_bar_active) {
			LMZ_showBar(LMZ_bar);
		}
	});
	PluginManager.registerCommand("LMZ_Bar", "SetBarPercent", (args) => {
		console.log("DEBUG: SET BAR PERCENT", args.percent);
		LMZ_bar.setFillPercent(args.percent);
	});
})();

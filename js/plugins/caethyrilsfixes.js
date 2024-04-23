/*:
 * @target MZ
 * @plugindesc Fixes from Caethyril on the RPG Maker forums
 * @author Caethyril
 */

// Override! Always return true (default: false if game doc is not in focus).
SceneManager.isGameActive = function() { return true; };

// Allow character original pattern default changes
void (alias => {
	Game_CharacterBase.prototype.isOriginalPattern = function() {
		if ("_originalPattern" in this)
		return this.pattern() === this._originalPattern;
		return alias.apply(this, arguments);
	};
})(Game_CharacterBase.prototype.isOriginalPattern);

void (alias => {
	Game_CharacterBase.prototype.resetPattern = function() {
		alias.apply(this, arguments);
		if ("_originalPattern" in this)
		this.setPattern(this._originalPattern);
	};
})(Game_CharacterBase.prototype.resetPattern);

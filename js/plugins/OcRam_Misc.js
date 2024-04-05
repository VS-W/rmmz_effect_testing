//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Misc.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Misc", "1.01");

/*:
 * @target MZ
 * @plugindesc v1.01 This plugin has a lots of miscellaneous stuff.
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Events
 * @orderAfter OcRam_Credits
 * @orderAfter OcRam_Title_Info
 * @orderAfter OcRam_Title_Shuffler
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS - None
 * ============================================================================
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Map turn steps
 * @type number
 * @min 0
 * @max 9999
 * @desc Steps for 'one turn' on map.
 * 0 = Use RPG Maker default (=20)
 * @default 0
 * 
 * @param Show "Always Dash"
 * @type boolean
 * @desc Show "Always Dash" in options scene?
 * @default true
 *
 * @param "Always Dash" value
 * @parent Show "Always Dash"
 * @type boolean
 * @desc Value for "Always Dash"? (IF IT'S NOT SHOWN)
 * @default false
 *
 * @param Show "Command Remember"
 * @type boolean
 * @desc Show "Command Remember" in options scene?
 * @default true
 *
 * @param "Command Remember" value
 * @parent Show "Command Remember"
 * @type boolean
 * @desc Value for "Command Remember"? (IF IT'S NOT SHOWN)
 * @default false
 *
 * @param Show "Touch UI"
 * @type boolean
 * @desc Show "Touch UI" in options scene?
 * @default true
 *
 * @param "Touch UI" value
 * @parent Show "Touch UI"
 * @type boolean
 * @desc Value for "Touch UI"? (IF IT'S NOT SHOWN)
 * @default false
 *
 * @param Show "Exit" command
 * @type boolean
 * @desc Show Exit Command in title scene.
 * NOTE: Works only in 'desktop mode'.
 * @default true
 *
 * @param Exit caption
 * @parent Show "Exit" command
 * @type text
 * @desc Show this text for 'Exit' command.
 * @default Exit Game
 * 
 * @param On map damage popup
 * @type boolean
 * @desc Use on map damage popup? NOTE: Consider to disable OcRam_Indicator HP notifications!
 * @default true
 *
 * @param Damage Y offset
 * @parent On map damage popup
 * @type number
 * @min -9999
 * @max 9999
 * @desc On map damage sprite Y-offset in pixels.
 * @default 0
 *
 * @param On map damage font
 * @parent On map damage popup
 * @type text
 * @desc Font family for on map damage? (Defaults to GameFont in MV and NumberFont in MZ)
 * @default 
 *
 * @param Pixel perfect rendering
 * @type boolean
 * @desc Use pixel perfect rendering in this project?
 * @default true
 *
 * @param CE on transfer
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event on player transfer (after new map is loaded).
 * @default 0
 *
 * @param CE on map start
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event on map start (after any scene).
 * @default 0
 *
 * @param Start full screen
 * @type boolean
 * @desc Starts game in fullscreen (or at least makes request for it).
 * @default false
 * 
 * @param Options max commands
 * @parent On map damage popup
 * @type number
 * @min 0
 * @max 99
 * @desc Maximum number of commands in options. 0 = Use defaults.
 * @default 0
 *
 * @param Use custom cursor
 * @type boolean
 * @desc Use custom cursor?
 * Uses file './icon/cursor.png' if enabled.
 * @default false
 * 
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * This plugin was never ment to be published, but I hope it serves other 
 * RPG makers also. This plugin should cover all those "minor" things
 * that I thought won't need own dedicated plugin for it.
 * 
 * Originally this plugin had "No dead followers" feature, but I gave it new 
 * life in OcRam_Followers as "Dead followers are" feature.
 *
 * This plugin is a collection of small functions. Such as:
 *   - Map turn steps
 *   - On map damage (damage floor/states/events)
 *   - Pixel perfect rendering on/off!
 *   - Start game on full screen? + JS calls for full screen on/off!
 *   - Show Exit Command + Exit caption
 *   - Speaker name <title> texts (center + fade)
 *   - Since editor doesn't give option to set (and hide) general options...
 *       - "Always Dash" + option to show / hide it
 *       - "Remember Command" + option to show / hide it
 *       - "Touch UI" + option to show / hide it (only for MZ)
 *   - Run notetag JS evals on (see notetags section):
 *       - Item: onAdd / onRemove / onUse
 *       - State: onAdd / onRemove / onTick
 *   - Common events when
 *       - After player transfer (after "new" map is loaded)
 *       - On map start (after any scene)
 * 
 * TIP: Run common events via OcRam.runCE(common_event_id)
 *
 * NOTE: "Exit" command works only if VisuMZ plugins are not imported
 *       and Utils.isNwjs() returns true.
 *       
 * ----------------------------------------------------------------------------
 * JavaScript
 * ============================================================================
 * OcRam.Misc.setFullScreen(true) // To set full screen
 * OcRam.Misc.setFullScreen(false) // To set windowed screen
 *
 * ----------------------------------------------------------------------------
 * <Notetags>
 * ============================================================================
 * Add <title> tag to 'speaker name' field to fade and center texts!
 * TIP: <title:500> will wait total of 500 frames, instead of 4 frames per char
 * 
 * State 'onAdd' / 'onRemove' JS evaluations in state 'Note' field. Example:
 *     <evalOnAdd>
 *         console.log('State applied:', $dataStates[stateId]);
 *     </evalOnAdd>
 *     <evalOnRemove>
 *         console.log('State removed:', $dataStates[stateId]);
 *     </evalOnRemove>
 *     <evalOnTick>
 *         console.log('State tick:', $dataStates[stateId]);
 *     </evalOnTick>
 * 
 * Item 'onUse' evaluations in item 'Note' field. Example:
 *     <evalOnAdd>
 *         console.log("Item added:", item);
 *     </evalOnAdd>
 *     <evalOnRemove>
 *         console.log("Item removed:", item);
 *     </evalOnRemove>
 *     <evalOnUse>
 *         console.log("Item used:", item);
 *     </evalOnUse>
 *     
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE & COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2022, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2022/04/22 v1.00 - Initial release
 * 2022/11/11 v1.01 - NEW plugin parameter: Options max commands
 *                    Compatibility fix with OcRam_Input_EX
 *                    Fixed some bugs if map was terminated while on map 
 *                    damage popups were shown.
 *                    New plugin parameter: "Use custom cursor"
 *                    Add <title> tag to 'speaker name' to fade and center txt!
 *                    \| waits for 3 frames/character and use \^ to auto close 
 *                    message. IN MV use <speaker><title></speaker> tag in 
 *                    MESSAGE field to 'simulate' speaker name as it is in MZ!
 * 
 * ----------------------------------------------------------------------------
 * RMMZ overrides (destructive declarations) are listed here
 * ============================================================================
 * Game_Actor.prototype.stepsForTurn // If Map turn steps > 0
 * Scene_Title.prototype.commandWindowRect // If exit command is enabled
 * Window_Options.prototype.addGeneralOptions // If any general opts are hidden
 * Scene_Options.prototype.maxCommands // If "Options max commands" > 0
 */

class Sprite_MapDamage extends Sprite_Damage {

    constructor(y_offset) {
        super();
        this._duration = 60;
        this._yOffset = y_offset;
    }

    setup(target, amount) {
        this._target = target;
        this._colorType = amount >= 0 ? 3 : 2;
        this.createDigits(amount);
    }

    damageColor() {
        return ColorManager.textColor(this._colorType);
    }

    fontSize() {
        return $gameSystem.mainFontSize() - 4;
    }

    update() {
        this.x = this._target.screenX();
        this.y = this._target.screenY() + this._yOffset;
        if (this.opacity < 1) {
            this.destroy(); return;
        } super.update();
    }

    destroy(options) {
        super.destroy(options);
        if (!OcRam.scene()) return; const spriteset = OcRam.scene()._spriteset;
        if (!spriteset || !spriteset._characterSprites) return;
        spriteset._characterSprites.remove(this);
        spriteset.removeChild(this);
    }

    isTile() { return false; }
    isObjectCharacter() { return false; }

}

if (!OcRam.isMZ()) {

    Sprite_MapDamage.prototype.createDigits = function (value) {
        const string = Math.abs(value).toString();
        const h = this.fontSize();
        const w = Math.floor(h * 0.75);
        for (let i = 0; i < string.length; i++) {
            const sprite = this.createChildSprite(w, h);
            sprite.bitmap.drawText(string[i], 0, 0, w, h, "center");
            sprite.x = (i - (string.length - 1) / 2) * w;
            sprite.dy = -i;
        }
    };

    Sprite_MapDamage.prototype.createChildSprite = function (width, height) {
        const sprite = new Sprite();
        sprite.bitmap = this.createBitmap(width, height);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 1;
        sprite.y = -40;
        sprite.ry = sprite.y;
        this.addChild(sprite);
        return sprite;
    };

    Sprite_MapDamage.prototype.createBitmap = function (width, height) {
        const bitmap = new Bitmap(width, height);
        bitmap.fontFace = this.fontFace();
        bitmap.fontSize = this.fontSize();
        bitmap.textColor = this.damageColor();
        bitmap.outlineColor = this.outlineColor();
        bitmap.outlineWidth = this.outlineWidth();
        return bitmap;
    };

    Sprite_MapDamage.prototype.outlineColor = () => "rgba(0, 0, 0, 0.7)";
    Sprite_MapDamage.prototype.outlineWidth = () => 4;

}

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this;

    const _exitCommand = OcRam.getBoolean(this.parameters['Show "Exit" command']) && Utils.isNwjs();
    const _exitCaption = this.parameters['Exit caption'] || 'Exit Game';
    const _mapTurnSteps = Number(this.parameters['Map turn steps'] || 0);
    const _maxOptionCommands = Number(this.parameters['Options max commands'] || 0);
    const _pixelPerfect = OcRam.getBoolean(this.parameters['Pixel perfect rendering']);
    const _optShowAlwaysDash = OcRam.getBoolean(this.parameters['Show "Always Dash"']);
    const _optAlwaysDashValue = OcRam.getBoolean(this.parameters['"Always Dash" value']);
    const _optShowCommandRemember = OcRam.getBoolean(this.parameters['Show "Command Remember"']);
    const _optCommandRememberValue = OcRam.getBoolean(this.parameters['"Command Remember" value']);
    const _optShowTouchUI = OcRam.getBoolean(this.parameters['Show "Touch UI"']);
    const _optTouchUIValue = OcRam.getBoolean(this.parameters['"Touch UI" value']);
    const _useOnMapDamage = OcRam.getBoolean(this.parameters['On map damage popup']);
    const _mapDamageOffsetY = Number(this.parameters['Damage Y offset'] || 0);
    const _onTransferCE = Number(this.parameters['CE on transfer'] || 0);
    const _onMapStartCE = Number(this.parameters['CE on map start'] || 0);
    const _startFullScreen = OcRam.getBoolean(this.parameters['Start full screen']);

    let _onMapDamageFont = this.parameters['On map damage font'];

    this.debug("Imported.VisuMZ_0_CoreEngine:", Imported.VisuMZ_0_CoreEngine, "|", "_exitCommand", _exitCommand);

    if (OcRam.getBoolean(this.parameters['Use custom cursor'])) {
        document.querySelector(':root').style.cursor = "url('./icon/cursor.png'),auto";
    } // If cursor isn't found, fallback to default one...

    let _msgLineNumber = 0;
    let _defaultMessageOutline = 0;
    let _isTitleMessage = false;
    let _titleMessageWait = false;

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    const processStateNotetags = function () { // State evaluations
        $dataStates.forEach(state => {
            if (state && state.note) {
                let tmp_eval = (state.note + "").getClosedTags("evalOnTick").join("\n");
                if (tmp_eval) state.customTickEval = new Function("subject", tmp_eval);
                tmp_eval = (state.note + "").getClosedTags("evalOnAdd").join("\n");
                if (tmp_eval) state.customAddEval = new Function("subject", tmp_eval);
                tmp_eval = (state.note + "").getClosedTags("evalOnRemove").join("\n");
                if (tmp_eval) state.customRemoveEval = new Function("subject", tmp_eval);
            }
        });
    };

    const processItemNotetags = function () { // Item evaluations
        $dataItems.forEach(state => {
            if (state && state.note) {
                let tmp_eval = (state.note + "").getClosedTags("evalOnUse").join("\n");
                if (tmp_eval) state.customUseEval = new Function("battler", tmp_eval);
                tmp_eval = (state.note + "").getClosedTags("evalOnAdd").join("\n");
                if (tmp_eval) state.customAddEval = new Function("amount", tmp_eval);
                tmp_eval = (state.note + "").getClosedTags("evalOnRemove").join("\n");
                if (tmp_eval) state.customRemoveEval = new Function("amount", tmp_eval);
            }
        });
    };

    const getUnEscapedText = txt => (txt + "").replaceAll(/.c\[.*?\]/gi, "").replaceAll(/.\|/gi, "").replaceAll(/.\^/gi, "");
    const getUnEscapedLen = txt => (getUnEscapedText(txt) + "").length;

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.setFullScreen = full => {
        if (full && !Graphics._isFullScreen()) Graphics._requestFullScreen();
        if (!full && Graphics._isFullScreen()) Graphics._cancelFullScreen();
    };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    if (_exitCommand) { // Exit command shown?
        this.debug("Title EXIT command is enabled!");
        this.extend(Window_TitleCommand, "makeCommandList", function () {
            _this["Window_TitleCommand_makeCommandList"].apply(this, arguments);
            this.addCommand(_exitCaption, "exitGame");
        }); this.extend(Scene_Title, "createCommandWindow", function () {
            _this["Scene_Title_createCommandWindow"].apply(this, arguments);
            this._commandWindow.setHandler("exitGame", this.commandExitGame.bind(this));
        }); this.extend(Scene_Title, "commandExitGame", function () {
            this._commandWindow.close(); this.fadeOutAll(); SceneManager.exit();
        }); let _titleMenuItems = 4; let _titleMenuYOffset = 10; // Check OcRam_Credits parameters
        if (Imported.OcRam_Credits && OcRam.getBoolean(OcRam.Credits.parameters["Add Credits to Title"])) {
            _titleMenuItems = Number(OcRam.Credits.parameters["Title Menu Items"]) + 1;
            _titleMenuYOffset = Number(OcRam.Credits.parameters["Title Menu Y-Offset"]) + 20;
        } Scene_Title.prototype.commandWindowRect = function () { // OVERWRITE!
            const offsetX = $dataSystem.titleCommandWindow.offsetX;
            const offsetY = $dataSystem.titleCommandWindow.offsetY + _titleMenuYOffset;
            const ww = this.mainCommandWidth();
            const wh = this.calcWindowHeight(_titleMenuItems, true);
            const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
            const wy = Graphics.boxHeight - wh - 96 + offsetY;
            return new Rectangle(wx, wy, ww, wh);
        };
    }

    if (_pixelPerfect) { // For pixel perfect scaling/zoom/rendering
        this.extend(Bitmap, "initialize", function () { // By default in RPG Maker core Bitmap._smooth is true...
            _this["Bitmap_initialize"].apply(this, arguments); this._smooth = false;
        }); this.extend(Graphics, "_createCanvas", function () {
            _this["Graphics__createCanvas"].apply(this, arguments);
            this._canvas.style.imageRendering = "pixelated"; // TY again w3schools!
        });
    }

    this.extend(DataManager, "isDatabaseLoaded", function () { // Pre-process all state and item evals...
        if (!_this["DataManager_isDatabaseLoaded"].apply(this, arguments)) return false;
        processStateNotetags(); processItemNotetags(); return true; // When DB is loaded!
    });

    // ------------------------------------------------------------------------------
    // Item JS EVALS based on notetags (using pre-compiled "evals")
    // ==============================================================================
    this.extend(Game_Party, "gainItem", function (item, amount, includeEquip) {
        _this["Game_Party_gainItem"].apply(this, arguments);
        if (amount < 0) { // Item was removed
            if (item && item.customRemoveEval)
                try { item.customRemoveEval.call(item, amount); }
                catch (e) { console.warn("item.customRemoveEval", e, item, amount); }
        } else if (amount > 0) { // Item was added
            if (item && item.customAddEval)
                try { item.customAddEval.call(item, amount); }
                catch (e) { console.warn("item.customAddEval", e, item, amount); }
        }
    });

    //** Item evaluation (on use) */
    this.extend(Game_Battler, "consumeItem", function (item) {
        _this["Game_Battler_consumeItem"].apply(this, arguments);
        if (item && item.customUseEval)
            try { item.customUseEval.call(item, this); }
            catch (e) { console.warn("item.customUseEval", e, item); }
    });

    this.extend(DataManager, "createGameObjects", function () {
        _this["DataManager_createGameObjects"].apply(this, arguments);
        _onMapDamageFont = _onMapDamageFont || (OcRam.isMZ() ? $gameSystem.numberFontFace() : 'GameFont')
        Sprite_MapDamage.prototype.fontFace = () => _onMapDamageFont;
    });

    // ------------------------------------------------------------------------------
    // On map damage! \o/
    // ==============================================================================
    if (_useOnMapDamage) {
        Game_Actor.prototype.createMapDamageSprite = function (amount) {
            if (!amount) return; const character = this.getCharacter(); if (!OcRam.scene() || !character) return;
            const spriteset = OcRam.scene()._spriteset; if (!spriteset || !spriteset._characterSprites) return;
            const sprite = new Sprite_MapDamage(_mapDamageOffsetY);
            sprite.x = character._x * OcRam.twh[0] + 24;
            sprite.y = character._y * OcRam.twh[1] + 24 + _mapDamageOffsetY;
            sprite.setup(character, amount);
            spriteset._characterSprites.push(sprite);
            spriteset.addChild(sprite);
            _this.debug("ON MAP DAMAGE:", sprite, character, amount);
        };
        const makeDamagePopUp = (actor, prev_hp) => {
            if (!OcRam.scene().isMap()) return;
            const amount = actor._hp - prev_hp;
            actor.createMapDamageSprite(amount);
        };
        if (Game_Actor.prototype.setHp) {
            this.extend(Game_Actor, "setHp", function () {
                const prev_hp = this._hp;
                _this["Game_Actor_setHp"].apply(this, arguments);
                makeDamagePopUp(this, prev_hp);
            });
        } else {
            Game_Actor.prototype.setHp = function (value) {
                const prev_hp = this._hp;
                Game_BattlerBase.prototype.setHp.call(this, value);
                makeDamagePopUp(this, prev_hp);
            };
        }
    }

    // ------------------------------------------------------------------------------
    // State JS EVALS based on notetags (using pre-compiled "evals")
    // ==============================================================================
    this.extend(Game_Battler, "addState", function (stateId) {
        const state = $dataStates[stateId];
        const prevState = this.isStateAffected(stateId);
        _this["Game_Battler_addState"].apply(this, arguments);
        const curState = this.isStateAffected(stateId);
        if (!prevState && curState && state && state.customAddEval)
            try { state.customAddEval.call(state, this); }
            catch (e) { console.warn("state.customAddEval", e, state, this); }
    });

    this.extend(Game_Battler, "removeState", function (stateId) {
        const state = $dataStates[stateId];
        const prevState = this.isStateAffected(stateId);
        _this["Game_Battler_removeState"].apply(this, arguments);
        const curState = this.isStateAffected(stateId);
        if (prevState && !curState && state && state.customRemoveEval)
            try { state.customRemoveEval.call(state, this); }
            catch (e) { console.warn("state.customRemoveEval", e, state, this); }
    });

    this.extend(Game_Battler, "onTurnEnd", function () { // Check state "ticks"!
        _this["Game_Battler_onTurnEnd"].apply(this, arguments);
        this._states.forEach(stateId => {
            const state = $dataStates[stateId];
            if (state && state.customTickEval) try {
                state.customTickEval.call(state, this);
            } catch (e) { console.warn("state.customTickEval", e, state, this); }
        });
    });

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    if (_mapTurnSteps) { //** How many steps will it take for 1 turn while in map? */
        Game_Actor.prototype.stepsForTurn = function () {
            return _mapTurnSteps;
        };
    }

    // Modify generic options, if any generic option is hidden...
    if (!_optShowAlwaysDash || !_optShowCommandRemember || !_optShowTouchUI) {
        Window_Options.prototype.addGeneralOptions = function () {
            if (_optShowAlwaysDash) this.addCommand(TextManager.alwaysDash, "alwaysDash");
            if (_optShowCommandRemember) this.addCommand(TextManager.commandRemember, "commandRemember");
            if (OcRam.isMZ() && _optShowTouchUI) this.addCommand(TextManager.touchUI, "touchUI");
        }; this.extend(ConfigManager, "makeData", function () {
            const config = _this["ConfigManager_makeData"].apply(this, arguments);
            if (!_optShowAlwaysDash) config.alwaysDash = _optAlwaysDashValue;
            if (!_optShowCommandRemember) config.commandRemember = _optCommandRememberValue;
            if (OcRam.isMZ() && !_optShowTouchUI) config.touchUI = _optTouchUIValue;
            return config;
        }); this.extend(ConfigManager, "applyData", function () {
            _this["ConfigManager_applyData"].apply(this, arguments);
            if (!_optShowAlwaysDash) this.alwaysDash = _optAlwaysDashValue;
            if (!_optShowCommandRemember) this.commandRemember = _optCommandRememberValue;
            if (OcRam.isMZ() && !_optShowTouchUI) this.touchUI = _optTouchUIValue;
        }); Scene_Options.prototype.maxCommands = function () { // Increase value when adding option items.
            let items = Imported.OcRam_Indicators ? Imported.OcRam_Input_EX ? 11 : 10 : Imported.OcRam_Input_EX ? 8 : 7;
            if (!_optShowAlwaysDash) items--; if (!_optShowCommandRemember) items--; if (!_optShowTouchUI) items--;
            return items;
        };
    } else { // IF ALL generic options are shown use default core code... else apply above changes...
        this.debug("Using generic options as defined in RPG Maker core scripts...");
    }

    // Overwrite Scene_Options.prototype.maxCommands if defined in plugin paramters...
    if (_maxOptionCommands) Scene_Options.prototype.maxCommands = () => _maxOptionCommands;

    this.extend(Game_Player, "performTransfer", function () {
        _this["Game_Player_performTransfer"].apply(this, arguments);
        if (_onTransferCE) OcRam.runCE(_onTransferCE);
    });

    // ================== For <title> Messages! ==================
    if (!OcRam.isMZ() && !Imported.OcRam_Events) { // Show Text and 'simulate' speaker name in MV
        this.extend(Game_Interpreter, "command101", function () {
            _isTitleMessage = false; _titleMessageWait = 0;
            if (this.nextEventCode() === 401) {
                const nxt_cmd = this._list[this._index + 1];
                let txt = nxt_cmd.parameters[0];
                const speaker_name = (txt + '').getClosedTags("speaker");
                if (speaker_name) {
                    if (!$gameMessage.isBusy()) {
                        nxt_cmd.parameters[0] = (txt + '').replaceAll(/\<speaker\>.*?\<\/speaker\>/gi, "");
                        requestAnimationFrame(() => { nxt_cmd.parameters[0] = txt; });
                    }
                } $gameMessage.setSpeakerName(speaker_name || '');
            } return _this["Game_Interpreter_command101"].apply(this, arguments);
        });
    }

    this.extend(Game_Message, "setSpeakerName", function (speakerName) {
        const tt = (speakerName + '').getOpenTags("title");
        if (speakerName == "<title>" || (tt && tt.length > 0)) {
            this._speakerName = "";
            _titleMessageWait = Number(tt[0]);
            _isTitleMessage = true; return;
        } else {
            _isTitleMessage = false; _titleMessageWait = 0;
        } _this["Game_Message_setSpeakerName"].apply(this, arguments);
    });

    this.extend(Game_Message, "clear", function () {
        _this["Game_Message_clear"].apply(this, arguments);
        _isTitleMessage = false; _titleMessageWait = 0;
    });
    
    this.extend(Window_Message, "newLineX", function (textState) {
        const ret = _this["Window_Message_newLineX"].apply(this, arguments);
        if (!_defaultMessageOutline && this.contents.outlineWidth != 6) _defaultMessageOutline = this.contents.outlineWidth;
        if (_isTitleMessage) {
            this.contents.outlineWidth = 6;
            this.contentsOpacity = 0;
            _msgLineNumber = 0;
            const t = $gameMessage._texts[_msgLineNumber];
            const w = this.textWidth(getUnEscapedText(t)); this._lineShowFast = true;
            return this.contents.width * 0.5 - w * 0.5;
        } this.contentsOpacity = 255; this.contents.outlineWidth = _defaultMessageOutline;
        return ret;
    });

    this.extend(Window_Message, "update", function () {
        _this["Window_Message_update"].apply(this, arguments);
        if (_isTitleMessage && this.contentsOpacity < 255 && this._waitCount > 52) {
            const new_opacity = this.contentsOpacity + 5;
            this.contentsOpacity = new_opacity > 255 ? 255 : new_opacity;
        }
    });

    this.extend(Window_Message, "clearFlags", function () {
        _this["Window_Message_clearFlags"].apply(this, arguments);
        if (_isTitleMessage) this._lineShowFast = true;
    });

    this.extend(Window_Message, "processNewLine", function (textState) {
        if (!_isTitleMessage) {
            _this["Window_Message_processNewLine"].apply(this, arguments); return;
        } _msgLineNumber++;
        const t = $gameMessage._texts[_msgLineNumber];
        const w = this.textWidth(getUnEscapedText(t));
        _this["Window_Message_processNewLine"].call(this, textState);
        textState.x = this.contents.width * 0.5 - w * 0.5;
        this._lineShowFast = true;
    });

    this.extend(Window_Message, "processEscapeCharacter", function (code, textState) {
        if (_isTitleMessage && code === "|") {
            this.startWait(_titleMessageWait || ((getUnEscapedLen(textState.text) | 0) * 4 + 8)); return;
        } _this["Window_Message_processEscapeCharacter"].apply(this, arguments);
    });

    this.extend(Window_Message, "updateWait", function () {
        if (_isTitleMessage) {
            if (this.isTriggered()) {
                this._waitCount = 0; return true;
            } else if (this._waitCount < 52) {
                const new_opacity = this.contentsOpacity - 5;
                this.contentsOpacity = new_opacity > 0 ? new_opacity : 0;
            }
        } return _this["Window_Message_updateWait"].apply(this, arguments);
    });

    // ================== For <title> Messages! END ==================

    var Scene_Splash = Scene_Splash || null; // When you don't know if object is declared, only then var should be used...
    if (_startFullScreen) {
        if (Scene_Splash && OcRam.getBoolean(OcRam.Title_Shuffler.parameters['Show splash screen'])) {
            /* Splash screen is handled in OcRam_Title_Shuffler.js */
        } else {
            this.extend(Scene_Title, "start", function () {
                Graphics._requestFullScreen(); _this["Scene_Title_start"].apply(this, arguments);
            });
        }
    }

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => {
        if (_onMapStartCE) OcRam.runCE(_onMapStartCE);
    }; this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = sm => { };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    /*PluginManager.registerCommand(this.name, "cmd", args => {
        doSomething(args.param);
    });*/

}.bind(OcRam.Misc)());
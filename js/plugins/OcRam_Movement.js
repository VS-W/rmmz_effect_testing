//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Movement.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Movement", "1.11");

/*:
 * @target MZ
 * @plugindesc v1.11 This plugin provides diagonal/pseudo-pixel movement features for your 
 * RPG Maker MZ/MV -project!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderBefore OcRam_Events
 * @orderBefore OcRam_Followers
 * @orderBefore OcRam_Audio
 * @orderBefore OcRam_Lights
 * @orderBefore OcRam_Passages
 * @orderBefore OcRam_Local_Coop
 * @orderBefore OcRam_NPC_Scheduler
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS - None
 * ============================================================================
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Enable pixel movement
 * @type boolean
 * @desc Enable pixel movement feature (requires bit more CPU power)? false = will use only diagonal movement.
 * @default true
 *
 * @param Default to pixel
 * @parent Enable pixel movement
 * @type boolean
 * @desc Default all events to pixel movement?
 * @default false
 *
 * @param Center on gather
 * @parent Enable pixel movement
 * @type boolean
 * @desc Center player x/y pos on gather command to nearest tile?
 * @default true
 *
 * @param Follower gap
 * @parent Enable pixel movement
 * @type number
 * @decimals 0
 * @min 1
 * @max 4
 * @desc Minimum gap in steps between followers (for pixel movement only)?
 * @default 3
 * 
 * @param Adjust diagonal speed
 * @type boolean
 * @desc Adjust diagonal speed to feel more natural?
 * NOTE: Pixel movement will auto disable this parameter.
 * @default false
 *
 * @param Default to diagonal
 * @type boolean
 * @desc Default all events to diagonal movement?
 * @default false
 *
 * @param Diagonal event start
 * @type boolean
 * @desc Allow event starting diagonally?
 * @default false
 *
 * @param Unlimited path finding
 * @type boolean
 * @desc NOTE: If this is enabled: Make sure there are no UN-REACHABLE areas in your maps!
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
 * Sub-/pseudo pixel movement is used in this plugin to to give nice 
 * performance boost while feeling like actual pixel move!
 *
 * Features:
 *  - Pseudo pixel movement (16 sub tiles per 1 tile)
 *    So shortest passage for 1 tile is four (4) steps.
 *  - Follower gap defined in "steps" 1 step 25% tile width/height
 *    (only available when Pseudo pixel move is used)
 *  - Diagonal movement with sprite sheet support!
 *  - Smart event collide check (glides only on most top/bottom corners)
 *  - Corner glide (won't get stuck to corners)
 *  - Above features also applies to events if desired so
 *
 * To specify that character sheet is DIAGONAL add ! at the end of the
 * file name example: Actor1!
 * 
 * File format for diagonal characters is following:
 * down x 3     down right x 3      down x 3     down right x 3
 * left x 3     down left x 3       left x 3     down left x 3
 * right x 3    up right x 3        right x 3    up right x 3
 * up x 3       up left x 3         up x 3       up left x 3
 * down x 3     down right x 3      down x 3     down right x 3
 * left x 3     down left x 3       left x 3     down left x 3
 * right x 3    up right x 3        right x 3    up right x 3
 * up x 3       up left x 3         up x 3       up left x 3
 * 
 * NOTE 1: Pixel movement always includes also diagonal movement!
 * NOTE 2: If VisuMZ_1_EventsMoveCore is used make sure to disable it's 8-dir
 *         movement to avoid huge lag!
 * NOTE 3: If "Unlimited path finding" is enabled, make sure your maps 
 *         doesn't have ANY unreachable areas!
 * 
 * ----------------------------------------------------------------------------
 * Notetags
 * ============================================================================
 * Event notetags (specific for 'this' event only)
 *    <movement:normal>        Enables tile based movement
 *    <movement:diagonal>      Enables diagonal movement
 *    <movement:pixel>         Enables pixel movement (and diagonal)
 *
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * -
 *
 * ----------------------------------------------------------------------------
 * JavaScript commands
 * ============================================================================
 * OcRam.Movement.isDiagonalDir(dir)    // true if diagonal else is false
 * OcRam.getHorzVert(dir)      // Return [xdir, ydir]
 * OcRam.Movement.getHorzVertDir(dir)   // Return 1, 3, 7 or 9
 * 
 * Game_CharacterBase.prototype.setPixelMove(bool)
 * Game_CharacterBase.prototype.setDiagonalMove(bool)
 * Example in event:        this.event().setPixelMove(true);
 * -OR- If in move route:   this.setPixelMove(true);
 * 
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your project by ANY MEANS (including: donations,
 * crypto-mining, micro-transactions, advertisements, merchandises etc..)
 * it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard licenses requires credits.
 * ALL of my plugins for 1 project = 40 EUR (standard licenses).
 *
 * License for lifetime is 3x base price of any license / bundle. Permission
 * to use this type of license only in projects where you own most of it.
 * Else project license OR project owner lifetime license is required.
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2020/10/10 v1.00 - Initial release
 * 2020/10/25 v1.01 - Compatibility patch for OcRam_Followers.
 *                    New JS call to center character to tile.
 *                    Center characters on "Jump" and "Gather" command.
 *                    Endless loop in diagonal "find to" func is now fixed.
 * 2021/03/07 v1.02 - Fixed event move type "Approach" to work properly if
 *                    "direction fix" was "on".
 *                    Fixed a rare "stack overflow" bug! (caused by recursive 
 *                    moveStraight()) + Some optimization (CPU is now happier)
 *                    New parameter: Block non-passable goal
 * 2021/04/02 v1.03 - getHorzVert is now part of OcRam core.
 *                    Support for OcRam_Events (pull & push + lift & throw)
 *                    Optimized findDirectionTo algorithm.
 *                    >> More iterations in lesser time = SMARTER pathfind!
 *                    Thus: "Block non-passable goal" has become obsolete!
 * 2021/06/04 v1.04 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Compatibility patch for OcRam_Events.js v1.02
 * 2021/06/10 v1.05 - Support for diagonal sprite sheets (Credits to Yin)
 *                    New plugin parameter "Diagonal event start"
 * 2021/10/21 v1.06 - Fixed a bug with diagonal character.moveRandom()
 *                    New plugin parameter (Unlimited path finding)
 * 2021/12/01 v1.07 - Doesn't check diagonal start for autorun and parallel
 *                    events anymore (prevented event start...)
 * 2022/01/23 v1.08 - Follower gap issue addressed (Credits to OMGerm)
 *                    JS: setFollowerGap and resetFollowerGap
 *                    BUG FIX: Loopped map + occasional pixel move crash
 * 2022/04/22 v1.09 - increaseSteps && onPlayerWalk is now tilebased even if
 *                    pseudo-pixel movement is used (before fix was x4 faster)
 *                    This also fixed a bug where states/floor damage didn't
 *                    apply to followers on map (de-synched steps /w player)
 *                    "Event on touch" now works with OcRam_Events
 *                    "Diagonal hug" on wall won't bug followers anymore!
 *                    Different event will reset "stepsToTrigger" (pixel move)
 * 2022/07/10 v1.10 - Same as character level + Player/Event touch now works
 *                    properly without OcRam_Local_Coop (Credits to OMGerm)
 *                    Also fixed state ticks on map without OcRam_Local_Coop!
 * 2022/11/11 v1.11 - RETRO plugin order check fix (for MV)
 *                    
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * Game_Actor.prototype.turnEndOnMap (if pixel)
 * Game_Player.prototype.getInputDirection
 * Game_Character.prototype.findDirectionTo
 * Game_CharacterBase.prototype.canPassDiagonally
 * Game_CharacterBase.prototype.moveDiagonally
 * Game_Character.prototype.moveForward
 * Game_Character.prototype.turnTowardCharacter (if diagonal)
 * Game_Character.prototype.moveTowardCharacter
 * Game_Character.prototype.turnAwayFromCharacter (if diagonal)
 * Game_Character.prototype.moveAwayFromCharacter
 * Game_Character.prototype.moveRandom (if diagonal)
 * Game_Player.prototype.forceMoveForward (if pixel)
 * Game_Follower.prototype.chaseCharacter (if pixel)
 * Game_Vehicle.prototype.pos (if pixel)
 * Sprite_Character.characterPatternX // IF diagonal sprite sheet is used
 * Sprite_Character.characterPatternY
 */

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...
    const _pixelMovementEnabled = OcRam.getBoolean(this.parameters['Enable pixel movement']);
    const _adjustDiagonalSpeed = _pixelMovementEnabled ? false : OcRam.getBoolean(this.parameters['Adjust diagonal speed']);
    const _defaultToDiagonal = OcRam.getBoolean(this.parameters['Default to diagonal']);
    const _defaultToPixel = OcRam.getBoolean(this.parameters['Default to pixel']);
    const _centerOnGather = OcRam.getBoolean(this.parameters['Center on gather']);
    const _allowDiagonalEventStart = OcRam.getBoolean(this.parameters['Diagonal event start']);
    const _unlimitedPathFinding = OcRam.getBoolean(this.parameters['Unlimited path finding']);
    let _followerGap = Number(this.parameters['Follower gap'] || 3) - 1;
    let _lastEventId = 0;

    // Arrays to optimize base code...
    const _rightTurn45Array = [0, 4, 1, 2, 7, 0, 3, 8, 9, 6];
    const _leftTurn45Array = [0, 2, 3, 6, 1, 0, 9, 4, 7, 8];
    const _dirArr = [1, 2, 3, 4, 6, 7, 8, 9];
    const SP_GRID = 0.25; // Sub/pseudo pixel movement 4x4
    let _twSP = [1 - SP_GRID, 1 - SP_GRID];

    OcRam.Local_Coop.resetCurrentPlayer = () => { };

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    let followersFollow = () => { return OcRam.Followers.follow(); };

    const isDiagonalDir = dir => {
        switch (dir) {
            case 1: case 3: case 7: case 9:
                return true; break;
            default: return false;
        }
    };

    const getHorzVertDir = (horz, vert) => {
        // Just in case [horz, vert] needs to be converted to single digit...
        if (horz == 4 && vert == 2) return 1;
        if (horz == 6 && vert == 2) return 3;
        if (horz == 4 && vert == 8) return 7;
        if (horz == 6 && vert == 8) return 9;
    };

    const turnRight45 = direction => {
        return _rightTurn45Array[direction];
    };

    const turnLeft45 = direction => {
        return _leftTurn45Array[direction];
    };

    const roundUpSPX = (n, d) => {
        if (d == 4) {
            return Math.floor(n + _twSP[0]);
        } else {
            return Math.ceil(n - _twSP[0]);
        }
    };

    const roundUpSPY = (n, d) => {
        if (d == 8) {
            return Math.floor(n + _twSP[1]);
        } else {
            return Math.ceil(n - _twSP[1]);
        }
    };

    const centerCharacter = character => {
        character.centerToTile();
    };

    const anyCXYEvents = (x, y) => {
        return !!($gameMap.events().find(ev => {
            return ev.pos(x, y) && ev._priorityType == 1 && !ev._isThrough;
        }));
    };

    const limitNonPassableGoal = (goalX, goalY, isEvent) => {
        if (anyCXYEvents(goalX, goalY)) return true;
        if (isEvent) {
            if ($gameMap.isEventAlwaysAllowed(goalX, goalY)) return false;
            if ($gameMap.isEventAlwaysBlocked(goalX, goalY)) return true;
        } else {
            if ($gameMap.isPlayerAlwaysAllowed(goalX, goalY)) return false;
            if ($gameMap.isPlayerAlwaysBlocked(goalX, goalY)) return true;
        } return !$gameMap.isLadder(goalX, goalY) && !$gameMap.isCounter(goalX, goalY) && !$gameMap.isTilePassable(goalX, goalY);
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.isDiagonalDir = direction => {
        return isDiagonalDir(direction);
    };

    this.getHorzVert = direction => {
        return OcRam.getHorzVert(direction);
    };

    this.getHorzVertDir = (horz, vert) => {
        return getHorzVertDir(horz, vert);
    };

    this.centerCharacter = character => {
        centerCharacter(character);
    };

    this.pixelMoveEnabled = () => {
        return _pixelMovementEnabled;
    };

    this.resetFollowerGap = () => {
        this.setFollowerGap(Number(this.parameters['Follower gap'] || 3));
    };

    this.resetSteps = () => {
        if (Imported.OcRam_Local_Coop) {
            OcRam.Local_Coop.resetSteps(this.getFollowerGap()); return;
        } if (_pixelMovementEnabled) {
            $gamePlayer._prevSteps[0] = [$gamePlayer._x, $gamePlayer._y];
            $gamePlayer._prevSteps[1] = $gamePlayer._prevSteps[0];
            $gamePlayer._prevSteps[2] = $gamePlayer._prevSteps[0];
            $gamePlayer._prevSteps[3] = $gamePlayer._prevSteps[0];
            if (!followersFollow()) return;
            OcRam.followers().forEach(f => {
                if (f._prevSteps) {
                    if (f._x != $gamePlayer._x || f._y != $gamePlayer._y) f.jumpTo($gamePlayer);
                }
            });
        }
    };

    this.setFollowerGap = gap => {
        if (gap) _followerGap = Number(gap).clamp(1, 4) - 1;
        if (Imported.OcRam_Local_Coop) {
            OcRam.Local_Coop.resetSteps(this.getFollowerGap());
        } else { 
            this.resetSteps();
        }
    };

    this.getFollowerGap = () => {
        return _followerGap + 1;
    };

    // ------------------------------------------------------------------------------
    // Plugin Classes - Class_Name
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    ImageManager.hasDiagonalSpriteSheet = function (filename) {
        return filename.right(filename.length - 1).indexOf("!") > -1;
    };

    Game_CharacterBase.prototype.hasDiagonalSpriteSheet = function () {
        return this._hasDiagonalSpriteSheet;
    };

    Game_CharacterBase.prototype.setPixelMove = function (v) {
        this._pixelMovementDisabled = !v;
    };

    Game_CharacterBase.prototype.setDiagonalMove = function (v) {
        this._diagonalMovementDisabled = !v;
    };

    Game_CharacterBase.prototype.centerToTile = function () {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
    };

    Game_Character.prototype.turnRight45 = function () {
        this.setDirection(_rightTurn45Array[this.direction()]);
    };

    Game_Character.prototype.turnLeft45 = function () {
        this.setDirection(_rightLeft45Array[this.direction()]);
    };

    Game_CharacterBase.prototype.executeMove = function (direction) {
        if (isDiagonalDir(direction)) {
            const hv = OcRam.getHorzVert(direction);
            this.moveDiagonally(hv[0], hv[1]);
        } else {
            this.moveStraight(direction);
        }
    };

    Game_CharacterBase.prototype.isCollidedWithEvents_OC = function (x, y, d, mx, my) {

        if (this.isPlayer()) {
            if (this.isInAirship()) return false;
            let idir = this.getInputDirection();
            if (isDiagonalDir(idir)) return false;
        }

        let events = $gameMap.eventsXyNt(x, y);
        let ret = events.some(event => event.isNormalPriority());

        ret = ret && ((mx < 0.5 && my < 0.1) || (my < 0.5 && mx < 0.1));

        if (!ret) {
            switch (d) {
                case 2: case 8:
                    if (mx > 0.5 && my < 0.1) {
                        events = $gameMap.eventsXyNt(x + 1, y);
                        ret = events.some(event => event.isNormalPriority());
                    } break;
                case 4: case 6:
                    if (my > 0.5 && mx < 0.1) {
                        events = $gameMap.eventsXyNt(x, y + 1);
                        ret = events.some(event => event.isNormalPriority());
                    } break;
            }
        }

        return ret;

    };

    Game_Map.prototype.roundXSPWithDirection = function (x, d) {
        return this.roundX(x + (d === 6 ? SP_GRID : d === 4 ? -SP_GRID : 0));
    };

    Game_Map.prototype.roundYSPWithDirection = function (y, d) {
        return this.roundY(y + (d === 2 ? SP_GRID : d === 8 ? -SP_GRID : 0));
    };

    Game_Map.prototype.xSPWithDirection = function (x, d) {
        return x + (d === 6 ? SP_GRID : d === 4 ? -SP_GRID : 0);
    };

    Game_Map.prototype.ySPWithDirection = function (y, d) {
        return y + (d === 2 ? SP_GRID : d === 8 ? -SP_GRID : 0);
    };

    Game_Character.prototype.getNeighborNodes = function (x1, y1, cl) {
        const ret = [];
        for (let j = 0; j < 8; j++) {
            const direction = _dirArr[j];
            if (isDiagonalDir(direction)) {
                const hv = OcRam.getHorzVert(direction);
                const x2 = $gameMap.roundXWithDirection(x1, (direction == 3 || direction == 9) ? 6 : 4);
                const y2 = $gameMap.roundYWithDirection(y1, (direction == 7 || direction == 9) ? 8 : 2);
                const pos2 = y2 * $gameMap.width() + x2; if (cl.includes(pos2)) continue;
                if (!this.canPassDiagonally(x1, y1, hv[0], hv[1])) continue;
                ret.push({ x: x2, y: y2, pos: pos2 });
            } else {
                const x2 = $gameMap.roundXWithDirection(x1, direction);
                const y2 = $gameMap.roundYWithDirection(y1, direction);
                const pos2 = y2 * $gameMap.width() + x2; if (cl.includes(pos2)) continue;
                if (!this.canPass(x1, y1, direction)) continue;
                ret.push({ x: x2, y: y2, pos: pos2 });
            }
        } return ret;
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    if (_pixelMovementEnabled) {

        this.extend(Game_CharacterBase, "jump", function (xPlus, yPlus) {
            if (this.isPlayer() || this.isFollower()) {
                this._stepsToTrigger = 4; const xy = [this._x + xPlus, this._y + yPlus];
                this._prevSteps = [xy, xy, xy, xy];
            } _this["Game_CharacterBase_jump"].apply(this, arguments);
        });

        const _specialAliases = [
            Game_Map.prototype.autotileType,
            Game_Map.prototype.checkLayeredTilesFlags,
            Game_Map.prototype.eventIdXy,
            Game_Map.prototype.eventsXy,
            Game_Map.prototype.eventsXyNt,
            Game_Map.prototype.regionId,
            Game_Map.prototype.terrainTag,
            Game_Map.prototype.tileEventsXy,
            Game_Map.prototype.isPassable,
            Game_Player.prototype.startMapEvent,
            Game_Vehicle.prototype.isLandOk
        ]; // Only parameters are manipulated... We need integers NOT floats...

        Game_Map.prototype.autotileType = function (x, y) {
            return _specialAliases[0].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.checkLayeredTilesFlags = function (x, y, bit) {
            return _specialAliases[1].call(this, Math.round(x), Math.round(y), bit);
        }; Game_Map.prototype.eventIdXy = function (x, y) {
            return _specialAliases[2].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.eventsXy = function (x, y) {
            return _specialAliases[3].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.eventsXyNt = function (x, y) {
            return _specialAliases[4].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.regionId = function (x, y) {
            return _specialAliases[5].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.terrainTag = function (x, y) {
            return _specialAliases[6].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.tileEventsXy = function (x, y) {
            return _specialAliases[7].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.isPassable = function (x, y, d, hl) {
            return _specialAliases[8].call(this, Math.round(x), Math.round(y), d, hl);
        }; Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {
            return _specialAliases[9].call(this, Math.round(x), Math.round(y), triggers, normal);
        }; Game_Vehicle.prototype.isLandOk = function (x, y, d) {
            return _specialAliases[10].call(this, Math.round(x), Math.round(y), d);
        };
        
        this.extend(Game_CharacterBase, "isMapPassable", function (x, y, d) {
            if (x > $gameMap.width() - 1) x %= $gameMap.width();
            if (y > $gameMap.height() - 1) y %= $gameMap.height();
            return _this["Game_CharacterBase_isMapPassable"].call(this, x, y, d);
        });

        this.extend(Game_CharacterBase, "locate", function () {
            _this["Game_CharacterBase_locate"].apply(this, arguments);
            if (this.isPlayer() || this.isFollower()) {
                this._stepsToTrigger = 4;
                this._prevSteps = [[this._x, this._y], [this._x, this._y], [this._x, this._y], [this._x, this._y]];
            }
        });

        this.extend(Game_Player, "increaseSteps", function () {
            if (this._stepsToTrigger > 0) this._stepsToTrigger--;
            if (this._stepsToTrigger < 1 || this._pixelMovementDisabled) {
                OcRam.followers().forEach(f => {
                    f._stepsToTrigger = 0;
                }); _this.debug("increaseSteps >>", this);
                _this["Game_Player_increaseSteps"].apply(this, arguments);
            } if (!this._followers.areMoving()) {
                this._followers.updateMove();
            } this._prevSteps[3] = this._prevSteps[2];
            this._prevSteps[2] = this._prevSteps[1];
            this._prevSteps[1] = this._prevSteps[0];
            this._prevSteps[0] = [this._x, this._y];
        });

        this.extend(Game_Actor, "onPlayerWalk", function () {
            if ($gamePlayer._stepsToTrigger > 0) return;
            OcRam.followers().forEach(f => {
                f._stepsToTrigger = 0;
            }); _this["Game_Actor_onPlayerWalk"].apply(this, arguments);
            requestAnimationFrame(() => {
                $gamePlayer._stepsToTrigger = 4;
            });
        });

        this.extend(Game_Player, "jump", function () {
            if (this._x % 1 != 0 || this._y % 1 != 0) this.centerToTile();
            _this["Game_Player_jump"].apply(this, arguments);
        });

        if (_centerOnGather) {
            this.extend(Game_Followers, "gather", function () {
                if (this._x % 1 != 0 || this._y % 1 != 0) {
                    $gamePlayer.centerToTile();
                    requestAnimationFrame(() => {
                        _this["Game_Followers_gather"].apply(this, arguments);
                    });
                } else {
                    _this["Game_Followers_gather"].apply(this, arguments);
                }
            });
        }

        this.extend(Game_Vehicle, "getOn", function () {
            _this["Game_Vehicle_getOn"].apply(this, arguments);
            if (this.isAirship()) $gamePlayer._pixelMovementDisabled = true;
        });

        this.extend(Game_Vehicle, "getOff", function () {
            _this["Game_Vehicle_getOff"].apply(this, arguments);
            if (this.isAirship()) $gamePlayer._pixelMovementDisabled = !_pixelMovementEnabled;
        });

        // New methods
        Game_CharacterBase.prototype.pos_OC = function (x, y) {
            return Math.abs(this._x - x) < 1 && Math.abs(this._y - y) < 1;
            //return Math.round(this._x) === Math.round(x) && Math.round(this._y) === Math.round(y);
        };

        // Overwrites
        Game_Actor.prototype.turnEndOnMap = function () {
            this.onTurnEnd();
            if (this.result().hpDamage > 0) {
                this.performMapDamage();
            } requestAnimationFrame(() => {
                if ($gameParty.allBattleMembersAreDead()) SceneManager.goto(Scene_Gameover);
            });
        };

        Game_Event.prototype.checkEventTriggerTouch = function (x, y) {
            if (!$gameMap.isEventRunning()) {
                if (this._trigger === 2 && $gamePlayer.pos_OC(x, y)) {
                    $gamePlayer._stepsToTrigger = 0; // This is not triggered by player so steps doesn't matter...
                    if (!this.isJumping() && this.isNormalPriority()) {
                        this.start();
                    }
                }
            }
        };

    } else {
        Game_CharacterBase.prototype.checkPixelMove = function () { };
        Game_CharacterBase.prototype.pos_OC = function (x, y) { return this.pos(x, y); };
    }

    this.extend(Game_CharacterBase, "initMembers", function () {
        _this["Game_CharacterBase_initMembers"].apply(this, arguments);
        if (!this.isEvent()) {
            this._pixelMovementDisabled = !_pixelMovementEnabled;
            this._diagonalMovementDisabled = false;
        }
    });

    this.extend(Game_CharacterBase, "moveStraight", function (d, recursive) {

        this._hvDir = false;

        if (_pixelMovementEnabled && !this._pixelMovementDisabled) { /* Override */

            const rx = roundUpSPX(this._x, d);
            const ry = roundUpSPY(this._y, d);

            const mx = this._x % 1;
            const my = this._y % 1;

            const ux = $gameMap.roundXWithDirection(rx, d);
            const uy = $gameMap.roundYWithDirection(ry, d);

            let suc = false;

            if (this.isCollidedWithEvents_OC(ux, uy, d, mx, my)) {
                /* do nada... */
            } else {
                suc = this.canPass(rx, ry, d);
                if (suc) { // Glide for smoother movement
                    if (mx != 0 && (d == 8 || d == 2)) {
                        suc = this.canPass(roundUpSPX(this._x + 1, d), ry, d);
                        if (!suc && !recursive) { this.moveStraight(4, true); return; }
                    } else if (my != 0 && (d == 4 || d == 6)) {
                        suc = this.canPass(rx, roundUpSPY(this._y + 1, d), d);
                        if (!suc && !recursive) { this.moveStraight(8, true); return; }
                    }
                } else {
                    if (mx != 0 && (d == 8 || d == 2)) {
                        suc = this.canPass(roundUpSPX(this._x + 1, d), ry, d);
                        if (suc && !recursive) { this.moveStraight(6, true); return; }
                    } else if (my != 0 && (d == 4 || d == 6)) {
                        suc = this.canPass(rx, roundUpSPY(this._y + 1, d), d);
                        if (suc && !recursive) { this.moveStraight(2, true); return; }
                    }
                }
            }

            this.setMovementSuccess(suc);

            if (this.isMovementSucceeded()) {
                this.setDirection(d);
                this._x = $gameMap.roundXSPWithDirection(this._x, d);
                this._y = $gameMap.roundYSPWithDirection(this._y, d);
                this._realX = $gameMap.xSPWithDirection(this._x, this.reverseDir(d));
                this._realY = $gameMap.ySPWithDirection(this._y, this.reverseDir(d));
                this.increaseSteps();
            } else {
                this.setDirection(d);
                this.checkEventTriggerTouchFront(d);
            }

        } else {
            _this["Game_CharacterBase_moveStraight"].apply(this, arguments);
        }

    });

    if (_adjustDiagonalSpeed) {
        this.extend(Game_CharacterBase, "distancePerFrame", function () {
            let distance = _this["Game_CharacterBase_distancePerFrame"].apply(this, arguments);
            if (this._hvDir) distance *= 0.8; return distance;
        });
    }

    this.extend(Game_Character, "turnAwayFromCharacter", function (character) {
        if (this._diagonalMovementDisabled) {
            _this["Game_Character_turnAwayFromCharacter"].apply(this, arguments);
        } else {
            const sx = this.deltaXFrom(character.x);
            const sy = this.deltaYFrom(character.y);
            if (sx != 0 && sy != 0) {
                if (sx < 0 && sy > 0) { this._hvDir = [4, 2]; this.setDirection(1); }
                if (sx > 0 && sy > 0) { this._hvDir = [6, 2]; this.setDirection(3); }
                if (sx < 0 && sy < 0) { this._hvDir = [4, 8]; this.setDirection(7); }
                if (sx > 0 && sy < 0) { this._hvDir = [6, 8]; this.setDirection(9); }
            } else {
                if (Math.abs(sx) > Math.abs(sy)) {
                    this.setDirection(sx > 0 ? 6 : 4);
                } else if (sy !== 0) {
                    this.setDirection(sy > 0 ? 2 : 8);
                }
            }
        }
    });

    this.extend(Game_Character, "turnTowardCharacter", function (character) {
        if (this._diagonalMovementDisabled) {
            _this["Game_Character_turnTowardCharacter"].apply(this, arguments);
        } else {
            const sx = this.deltaXFrom(character.x);
            const sy = this.deltaYFrom(character.y);
            if (sx != 0 && sy != 0) {
                if (sx > 0 && sy < 0) { this._hvDir = [4, 2]; this.setDirection(1); }
                if (sx < 0 && sy < 0) { this._hvDir = [6, 2]; this.setDirection(3); }
                if (sx > 0 && sy > 0) { this._hvDir = [4, 8]; this.setDirection(7); }
                if (sx < 0 && sy > 0) { this._hvDir = [6, 8]; this.setDirection(9); }
            } else {
                if (Math.abs(sx) > Math.abs(sy)) {
                    this.setDirection(sx > 0 ? 4 : 6);
                } else if (sy !== 0) {
                    this.setDirection(sy > 0 ? 8 : 2);
                }
            }
        }
    });

    this.extend(Game_Player, "executeMove", function (direction) {
        if (isDiagonalDir(direction)) {
            const hv = OcRam.getHorzVert(direction);
            this.moveDiagonally(hv[0], hv[1]);
        } else {
            _this["Game_Player_executeMove"].apply(this, arguments);
        }
    });

    if (_pixelMovementEnabled) {
        this.extend(Game_Actor, "checkFloorEffect", function() {
            if ($gamePlayer.isOnDamageFloor()) {
                if ($gamePlayer._stepsToTrigger < 1) {
                    _this["Game_Actor_checkFloorEffect"].apply(this, arguments);
                }
            }
        });
    }

    this.extend(Game_Player, "clearTransferInfo", function () {
        $gamePlayer._stepsToTrigger = Imported.OcRam_Local_Coop ? 2 : 4; _lastEventId = 0;
        OcRam.followers().forEach(f => { f._stepsToTrigger = $gamePlayer._stepsToTrigger; });
        _this["Game_Player_clearTransferInfo"].apply(this, arguments);
    });

    this.extend(Game_Event, "initialize", function () {

        _this["Game_Event_initialize"].apply(this, arguments);

        this._pixelMovementDisabled = !_defaultToPixel;
        if (!_pixelMovementEnabled) this._pixelMovementDisabled = true;
        this._diagonalMovementDisabled = !_defaultToDiagonal;

        if (this.event() && this.event().meta) {
            const mm = this.event().meta.movement;
            if (mm) {
                switch (mm.toLowerCase()) {
                    case "pixel": this._pixelMovementDisabled = false; this._diagonalMovementDisabled = false; break;
                    case "diagonal": this._diagonalMovementDisabled = false; break;
                    case "normal": this._pixelMovementDisabled = true; this._diagonalMovementDisabled = true; break;
                }
            }
        }

    });

    this.extend(Game_Event, "start", function () {
        if (this._trigger > 2) { // Do not check steps & diagonal start for autorun and parallel events...
            _this["Game_Event_start"].apply(this, arguments); return;
        } const pc = OcRam.playerCharacter();
        if (_lastEventId && _lastEventId != this._eventId) pc._stepsToTrigger = 0;
        if (_pixelMovementEnabled && (this._trigger == 1 || this._trigger == 2)) {
            if (pc._stepsToTrigger > 0) {
                OcRam.Local_Coop.resetCurrentPlayer(
                    OcRam.listHasStopCodes(this.list())
                ); return;
            }
        } if (!_allowDiagonalEventStart && this.isDiagonallyStarted()) return;
        pc._stepsToTrigger = 4; _this["Game_Event_start"].apply(this, arguments);
        _lastEventId = this._eventId;
    });

    this.extend(Game_Character, "moveRandom", function () {
        if (this._diagonalMovementDisabled) {
            _this["Game_Character_moveRandom"].apply(this, arguments);
        } else {
            const d = _dirArr[Math.randomInt(8)];
            if (isDiagonalDir(d)) {
                const hv = OcRam.getHorzVert(d);
                if (this.canPassDiagonally(this.x, this.y, hv[0], hv[1])) {
                    this.moveDiagonally(hv[0], hv[1]);
                }
            } else {
                if (this.canPass(this.x, this.y, d)) {
                    this.moveStraight(d);
                }
            }
        }
    });

    // Diagonal sprite sheets
    const _old_Sprite_Character_characterPatternX = Sprite_Character.prototype.characterPatternX;
    this.extend(Sprite_Character, "setCharacterBitmap", function () {
        _this["Sprite_Character_setCharacterBitmap"].apply(this, arguments);
        this._hasDiagonalSpriteSheet = ImageManager.hasDiagonalSpriteSheet(this._characterName);
        if (this._hasDiagonalSpriteSheet) {
            this.characterPatternX = function () {
                return this._character.direction() % 2 ? this._character.pattern() + 3 : this._character.pattern();
            };
            this.characterPatternY = function () {
                let d = this._character.direction();
                if (d % 2) {
                    switch (d) {
                        case 1: d = 4; break;
                        case 3: d = 2; break;
                        case 7: d = 8; break;
                        case 9: d = 6; break;
                    }
                }; return (d - 2) / 2;
            };
        } else {
            this.characterPatternX = function () { return _old_Sprite_Character_characterPatternX.call(this); };
            this.characterPatternY = function () {
                let d = this._character.direction();
                if (d % 2) {
                    switch (d) {
                        case 1: d = 4; break;
                        case 3: d = 6; break;
                        case 7: d = 4; break;
                        case 9: d = 6; break;
                    }
                }; return (d - 2) / 2;
            };
        }
    });

    Game_Follower.prototype.forceMoveForward = function () {
        const ot = this._through;
        this.setThrough(true);
        this._pixelMovementDisabled = true;
        this.moveForward();
        this._pixelMovementDisabled = !_pixelMovementEnabled;
        this.setThrough(ot);
    };

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    if (_pixelMovementEnabled) {

        Game_Player.prototype.forceMoveForward = function () {
            this.setThrough(true);
            this._pixelMovementDisabled = true;
            this.moveForward();
            this._pixelMovementDisabled = !_pixelMovementEnabled;
            this.setThrough(false);
        };

        Game_Vehicle.prototype.pos = function (x, y) {
            if (this._mapId === $gameMap.mapId()) {
                if (!this._driving) {
                    return Game_Character.prototype.pos_OC.call(this, x, y);
                } else {
                    return Game_Character.prototype.pos.call(this, x, y);
                }
            } else {
                return false;
            }
        };

        Game_Player.prototype.getOnVehicle = function () {
            const direction = this.direction();
            const x1 = Math.round(this.x);
            const y1 = Math.round(this.y);
            const x2 = $gameMap.roundXWithDirection(x1, direction);
            const y2 = $gameMap.roundYWithDirection(y1, direction);
            if ($gameMap.airship().pos(x1, y1)) {
                this._vehicleType = "airship";
            } else if ($gameMap.ship().pos(x2, y2)) {
                this._vehicleType = "ship";
            } else if ($gameMap.boat().pos(x2, y2)) {
                this._vehicleType = "boat";
            }
            if (this.isInVehicle()) {
                this._vehicleGettingOn = true;
                if (!this.isInAirship()) {
                    this.forceMoveForward();
                }
                this.gatherFollowers();
            }
            return this._vehicleGettingOn;
        };

        Game_Follower.prototype.chaseCharacter = function (character) {
            let sx = 0; let sy = 0;
            if (character._prevSteps) {
                if (character._pixelMovementDisabled) {
                    sx = this.deltaXFrom(character._prevSteps[0][0]);
                    sy = this.deltaYFrom(character._prevSteps[0][1]);
                } else {
                    sx = this.deltaXFrom(character._prevSteps[_followerGap][0]);
                    sy = this.deltaYFrom(character._prevSteps[_followerGap][1]);
                }
            } else {
                sx = this.deltaXFrom(character.x);
                sy = this.deltaYFrom(character.y);
            } if ((sy > -0.25 && sy < 0.25) && (sx > -0.25 && sx < 0.25)) return;
            if (sx !== 0 && sy !== 0) {
                this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
            } else if (sx !== 0) {
                this.moveStraight(sx > 0 ? 4 : 6);
            } else if (sy !== 0) {
                this.moveStraight(sy > 0 ? 8 : 2);
            } this.setMoveSpeed($gamePlayer.realMoveSpeed());
            this._prevSteps[3] = this._prevSteps[2];
            this._prevSteps[2] = this._prevSteps[1];
            this._prevSteps[1] = this._prevSteps[0];
            this._prevSteps[0] = [this._x, this._y];
        };

    }

    Game_Character.prototype.moveForward = function () {
        const d = this.direction();
        if (d % 2) {
            const hv = OcRam.getHorzVert(d);
            this.moveDiagonally(hv[0], hv[1]);
        } else {
            this.moveStraight(d);
        }
    };

    Game_Character.prototype.moveTowardCharacter = function (character) {
        this.executeMove(OcRam.getDirectionToCharacterFromXY(character, this._x, this._y));
    };

    Game_Character.prototype.moveAwayFromCharacter = function (character) {
        this.executeMove(this.reverseDir(OcRam.getDirectionToCharacterFromXY(character, this._x, this._y)));
    };

    Game_CharacterBase.prototype.moveDiagonally = function (horz, vert) {

        this._hvDir = [horz, vert];

        let suc = this.canPassDiagonally(roundUpSPX(this._x, horz), roundUpSPY(this._y, vert), horz, vert);
        let inv = false;

        if (!suc) { // Diagonal pass failed ...Can pass horz / vert?

            if (vert == 8) {
                if (!this.canPass(roundUpSPX(this._x, horz), roundUpSPY(this._y, horz) + 1, horz)) inv = true;
            } else {
                if (!this.canPass(roundUpSPX(this._x, horz), roundUpSPY(this._y, horz) - 1, horz)) inv = true;
            }

            if (inv) {
                suc = this.canPass(roundUpSPX(this._x, horz), roundUpSPY(this._y, horz), horz);
                if (suc) { this.moveStraight(horz); return; }
                suc = this.canPass(roundUpSPX(this._x, vert), roundUpSPY(this._y, vert), vert);
                if (suc) { this.moveStraight(vert); return; }
            } else {
                suc = this.canPass(roundUpSPX(this._x, vert), roundUpSPY(this._y, vert), vert);
                if (suc) { this.moveStraight(vert); return; }
                suc = this.canPass(roundUpSPX(this._x, horz), roundUpSPY(this._y, horz), horz);
                if (suc) { this.moveStraight(horz); return; }
            }

        }

        this.setMovementSuccess(suc);

        if (this.isMovementSucceeded()) {
            if (_pixelMovementEnabled && !this._pixelMovementDisabled) {
                this._x = $gameMap.roundXSPWithDirection(this._x, horz);
                this._y = $gameMap.roundYSPWithDirection(this._y, vert);
                this._realX = $gameMap.xSPWithDirection(this._x, this.reverseDir(horz));
                this._realY = $gameMap.ySPWithDirection(this._y, this.reverseDir(vert));
            } else {
                this._x = $gameMap.roundXWithDirection(this._x, horz);
                this._y = $gameMap.roundYWithDirection(this._y, vert);
                this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
                this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
            } this.increaseSteps();
        }

        this.setDirection(getHorzVertDir(horz, vert));

    };

    Game_CharacterBase.prototype.canPassDiagonally = function (x, y, horz, vert) {
        const x2 = $gameMap.roundXWithDirection(x, horz);
        const y2 = $gameMap.roundYWithDirection(y, vert);
        if (this.canPass(x, y, vert) && this.canPass(x, y2, horz) &&
            this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
            return true;
        } return false;
    };

    Game_Character.prototype.findDirectionTo = function (goalX, goalY) {

        if (this.x === goalX && this.y === goalY) return 0;

        const use_sl = _unlimitedPathFinding && (limitNonPassableGoal(goalX, goalY, this.isEvent()) && !this._through);

        const searchLimit = this.searchLimit();
        const mapWidth = $gameMap.width();
        const nodeList = [];
        const openList = [];
        const closedList = [];
        const start = {};

        let best = start;

        start.parent = null;
        if (_pixelMovementEnabled) {
            start.x = Math.round(this.x);
            start.y = Math.round(this.y);
        } else {
            start.x = this.x;
            start.y = this.y;
        }

        start.g = 0;
        start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
        start.pos = start.y * mapWidth + start.x;

        nodeList.push(start);
        openList.push(start.pos);

        while (nodeList.length > 0) {

            let bestIndex = 0;
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].f < nodeList[bestIndex].f) bestIndex = i;
            } const current = nodeList[bestIndex];

            nodeList.splice(bestIndex, 1);
            openList.splice(openList.indexOf(current.pos), 1);
            closedList.push(current.pos);

            if (current.x === goalX && current.y === goalY) {
                best = current; break;
            } if (use_sl && current.g >= searchLimit) continue;

            // Get only neighbor nodes which are passable and NOT closed
            this.getNeighborNodes(current.x, current.y, closedList).forEach(neighbor => {
                const i = openList.indexOf(neighbor.pos);
                const g2 = current.g + 1; // Increase node cost
                if (i < 0) { // Node not yet processsed!
                    neighbor.parent = current; neighbor.g = g2;
                    neighbor.f = g2 + $gameMap.distance(neighbor.x, neighbor.y, goalX, goalY);
                    nodeList.push({ ...neighbor }); openList.push(neighbor.pos);
                    if (neighbor.f - neighbor.g < best.f - best.g) best = { ...neighbor };
                } else if (g2 < nodeList[i].g) { // Node already processed, but is it better?
                    neighbor.parent = current; neighbor.g = g2;
                    neighbor.f = g2 + $gameMap.distance(neighbor.x, neighbor.y, goalX, goalY);
                    if (neighbor.f - neighbor.g < best.f - best.g) best = { ...neighbor };
                }
            });

        }

        while (best.parent && best.parent !== start) best = best.parent;

        const deltaX1 = $gameMap.deltaX(best.x, start.x);
        const deltaY1 = $gameMap.deltaY(best.y, start.y);

        if (deltaY1 > 0) {
            return (deltaX1 < 0) ? 1 : (deltaX1 > 0) ? 3 : 2;
        } else if (deltaX1 < 0) {
            return (deltaY1 < 0) ? 7 : (deltaY1 > 0) ? 1 : 4;
        } else if (deltaX1 > 0) {
            return (deltaY1 < 0) ? 9 : (deltaY1 > 0) ? 3 : 6;
        } else if (deltaY1 < 0) {
            return (deltaX1 < 0) ? 7 : (deltaX1 > 0) ? 9 : 8;
        }

        // If dead end...
        const deltaX2 = this.deltaXFrom(goalX);
        const deltaY2 = this.deltaYFrom(goalY);
        const daX = Math.abs(deltaX2);
        const daY = Math.abs(deltaY2);

        if (daX == 1 && daY == 0.5) { this.moveStraight(2); return 2; }
        if (daX == 0.5 && daY == 1) { this.moveStraight(6); return 6; }

        if (daX > daY) {
            return deltaX2 > 0 ? (deltaY2 > 0 ? 7 : deltaY2 < 0 ? 1 : 4) : (deltaY2 > 0 ? 9 : deltaY2 < 0 ? 3 : 6);
        } else if (deltaY2 !== 0) {
            return deltaY2 > 0 ? (deltaX2 > 0 ? 7 : deltaX2 < 0 ? 9 : 8) : (deltaX2 > 0 ? 1 : deltaX2 < 0 ? 3 : 2);
        }

        return 0;

    };

    Game_Player.prototype.getInputDirection = function () {
        return Input.dir8;
    };

    if (_pixelMovementEnabled) {

        this.extend(Game_Actor, "initialize", function () {
            _this["Game_Actor_initialize"].apply(this, arguments); this._turnSteps = 0;
        });

        Game_Party.prototype.onPlayerWalk = function (follower) { // Only "player" characters will trigger this.
            const a = $gamePlayer ? $gamePlayer.getActor() : null;
            if (a) a.onPlayerWalk();
        }; let _stateTicked = false;
        Game_Actor.prototype.onPlayerWalk = function () {
            const p = $gamePlayer;
            this._turnSteps++; this.clearResult();
            this.checkFloorEffect(p);
            if (p.isNormal()) {
                if (!_stateTicked && this._turnSteps % (5 * this.stepsForTurn()) == 0) {
                    _stateTicked = true; requestAnimationFrame(() => { _stateTicked = false; });
                    p.getActor().turnEndOnMap();
                    if (followersFollow() && OcRam.followers()) {
                        OcRam.followers().map(c => c.getActor()).forEach(a => {
                            a.turnEndOnMap();
                        });
                    } for (const state of this.states()) {
                        this.updateStateSteps(state);
                    } this.showAddedStates();
                    this.showRemovedStates();
                    this._turnSteps = 0;
                }
            }
        }; Game_Actor.prototype.checkFloorEffect = function () {
            const p = $gamePlayer;
            if (p._stepsToTrigger < 1) {
                if (p.isOnDamageFloor()) {
                    if (followersFollow()) {
                        for (const actor of OcRam.followers().map(c => c.getActor())) {
                            actor.executeFloorDamage();
                        }
                    } const a = $gamePlayer.getActor();
                    if (a) a.executeFloorDamage();
                    p._stepsToTrigger = 4;
                }
            }
        };

    }

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    /*PluginManager.registerCommand("OcRam_" + this.name, "command", function (args) {
        _this.debug("Plugin command: command", args);
    });*/

}.bind(OcRam.Movement)());
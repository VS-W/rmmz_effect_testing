//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Battle_Core.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Battle_Core", "1.06");

/*:
 * @target MZ
 * @plugindesc v1.06 This plugin provides battle features like action sequences, substitute behaviours, animated SV enemies, enhanced damage popups and much more!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 * @command battleCommand
 * @text Party Command Window
 * @desc Enable/disable party command window.
 *
 * @arg enabled
 * @type boolean
 * @default true
 * @text Enabled
 * @desc True = Party Command Window Enabled ELSE it is disabled.
 * 
 * @command actorCommand
 * @text Actor Command
 * @desc Enable/disable actor command.
 *
 * @arg command
 * @type select
 * @option Attack
 * @value 0
 * @option Guard
 * @value 1
 * @option Item
 * @value 2
 * @option Skill
 * @value 3
 * @default 0
 * @text Command
 * @desc Which command is going to be enabled/disabled?
 * 
 * @arg enabled
 * @type boolean
 * @default true
 * @text Enabled
 * @desc True = Command is enabled ELSE it is disabled.
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Confirm All Scopes
 * @type boolean
 * @desc Confirm selection on any scope!
 * @default true
 *
 * @param All Popups At Once
 * @type boolean
 * @desc Display ALL damage/collapse/etc... at once.
 * @default true
 *
 * @param Enhanced Damage Popups
 * @type boolean
 * @desc OcRam style damage popups (HP damage 0 = Immune,
 * Evade/Resist/Miss and Critical texts)!
 * @default true
 *
 * @param Digit Spacing
 * @parent Enhanced Damage Popups
 * @type number
 * @decimals 0
 * @min -999
 * @max 999
 * @desc Space between digits in pixels. (base glyph width is widest glyph between characters 0 and 9)
 * @default -2
 *
 * @param Miss Text
 * @parent Enhanced Damage Popups
 * @type text
 * @desc Text to display when battler Missed attack.
 * TIP: Game system number font is used here.
 * @default Miss
 *
 * @param Evade Text
 * @parent Enhanced Damage Popups
 * @type text
 * @desc Text to display when battler Evades physical attack.
 * TIP: Game system number font is used here.
 * @default Evade
 *
 * @param Resist Text
 * @parent Enhanced Damage Popups
 * @type text
 * @desc Text to display when battler Evades NON-physical attack.
 * TIP: Game system number font is used here.
 * @default Resist
 *
 * @param Immune Text
 * @parent Enhanced Damage Popups
 * @type text
 * @desc Text to display in battle when battler does 0 damage.
 * TIP: Game system number font is used here.
 * @default Immune
 *
 * @param Critical Text
 * @parent Enhanced Damage Popups
 * @type text
 * @desc Text to display in battle when battler does CRITICAL hit.
 * TIP: Game system number font is used here.
 * @default Critical
 *
 * @param Number Font Face
 * @parent Enhanced Damage Popups
 * @type text
 * @desc Font face for number font if other than default.
 * (if empty - Game system number font is used here)
 * @default 
 *
 * @param Number Font Size
 * @parent Enhanced Damage Popups
 * @type number
 * @min 0
 * @max 255
 * @desc Font size for number font if other than default.
 * (0 = Game system font size + 4)
 * @default 0
 *
 * @param Number Outline Width
 * @parent Enhanced Damage Popups
 * @type number
 * @min 0
 * @max 255
 * @desc Outline width for number font if other than default (4).
 * @default 4
 *
 * @param Battle Cursor
 * @type boolean
 * @desc Select cursor in battle scene?
 * (../img/ocram/battle_cursor.png)
 * @default true
 *
 * @param Cursor Anchor X
 * @parent Battle Cursor
 * @type number
 * @decimals 2
 * @desc Battle Cursor X anchor.
 * @default 0.50
 *
 * @param Cursor Anchor Y
 * @parent Battle Cursor
 * @type number
 * @decimals 2
 * @desc Battle Cursor Y anchor.
 * @default 1.50
 * 
 * @param Battle Windows
 * @type boolean
 * @desc Battle Windows
 * @default true
 * 
 * @param Skip Emerged Message
 * @parent Battle Windows
 * @type boolean
 * @desc Skip emerged message.
 * @default true
 *
 * @param Skip Party Command
 * @parent Battle Windows
 * @type boolean
 * @desc Skip party command window at the start of the battle.
 * @default true
 *
 * @param Disable Party Command
 * @parent Battle Windows
 * @type boolean
 * @desc Disable party command window for good.
 * @default false
 *
 * @param Disable Actor Command
 * @parent Battle Windows
 * @type boolean
 * @desc Disable actor command window for good. WARNING! You'll need to handle commands by other means.
 * @default false
 *
 * @param Command Window
 * @parent Battle Windows
 * @type select
 * @option Window (Default)
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Actor/Party command window style.
 * @default 0
 * 
 * @param Other Battle Windows
 * @parent Battle Windows
 * @type select
 * @option Window (Default)
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Other battle window styles.
 * @default 0
 *
 * @param Battle Icons
 * @type boolean
 * @desc Use battle icons?
 * @default true
 *
 * @param Attack Icon
 * @parent Battle Icons
 * @type number
 * @desc Attack Icon
 * @default 76
 *
 * @param Guard Icon
 * @parent Battle Icons
 * @type number
 * @desc Guard Icon
 * @default 81
 *
 * @param Item Icon
 * @parent Battle Icons
 * @type number
 * @desc Item Icon
 * @default 176
 *
 * @param Skill Icon
 * @parent Battle Icons
 * @type number
 * @desc Generic skill icon
 * @default 79
 *
 * @param Fight Icon
 * @parent Battle Icons
 * @type number
 * @desc Fight Icon
 * @default 76
 *
 * @param Escape Icon
 * @parent Battle Icons
 * @type number
 * @desc Escape Icon
 * @default 82
 * 
 * @param Skill Type Icons
 * @parent Battle Icons
 * @type struct<SkillTypeIcons>[]
 * @desc Icons for skill types
 * @default ["{\"skillId\":\"1\",\"iconIndex\":\"79\"}"]
 *
 * @param Automate Action Sequences
 * @type boolean
 * @desc Automates action sequences based on weapon and skill attributes (if skill notetags are not defined).
 * @default true
 *
 * @param Melee Init
 * @parent Automate Action Sequences
 * @type note
 * @desc Single target NOT 'missile' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default ""
 *
 * @param Melee Perform
 * @parent Automate Action Sequences
 * @type note
 * @desc Single target NOT 'missile' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default "playMotion('guard'); jump();\nperformAttack();"
 *
 * @param Melee Finish
 * @parent Automate Action Sequences
 * @type note
 * @desc Single target NOT 'missile' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default "playMotion('escape'); wait(60); jumpHome();"
 *
 * @param Ranged Init
 * @parent Automate Action Sequences
 * @type note
 * @desc Single target AND 'missile' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default "playMotion('guard'); wait(30);"
 *
 * @param Ranged Perform
 * @parent Automate Action Sequences
 * @type note
 * @desc Single target AND 'missile' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default "performAttack();"
 *
 * @param Ranged Finish
 * @parent Automate Action Sequences
 * @type note
 * @desc Single target AND 'missile' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default ""
 *
 * @param Magic Init
 * @parent Automate Action Sequences
 * @type note
 * @desc Skill is defined as 'Magic' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default "playMotion('chant'); wait(80);\nplayAnimation(52); wait(80);"
 *
 * @param Magic Perform
 * @parent Automate Action Sequences
 * @type note
 * @desc Skill is defined as 'Magic' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default ""
 *
 * @param Magic Finish
 * @parent Automate Action Sequences
 * @type note
 * @desc Skill is defined as 'Magic' (and no action sequence notetags are defined). Enter = Wait previous line!
 * @default ""
 *
 * @param Substitute Behaviour
 * @parent Automate Action Sequences
 * @type select
 * @option Do nothing
 * @value 0
 * @option Jump
 * @value 1
 * @option Move
 * @value 2
 * @min 0
 * @max 2
 * @desc On substitute Jump, Move or Do nothing
 * @default 1
 *
 * @param Battler Commands
 * @type boolean
 * @desc Battler Commands.
 * @default true
 * 
 * @param Show Attack
 * @parent Battler Commands
 * @type boolean
 * @desc Shows the default attack command
 * @default true
 *
 * @param Show Guard
 * @parent Battler Commands
 * @type boolean
 * @desc Shows the default guard command
 * @default true
 *
 * @param Show Skill
 * @parent Battler Commands
 * @type boolean
 * @desc Shows the default skill command
 * @default true
 *
 * @param Show Item
 * @parent Battler Commands
 * @type boolean
 * @desc Shows the default item command
 * @default true
 *
 * @param Battle Common Events
 * @type boolean
 * @desc Battle common events.
 * @default true
 *
 * @param On Battle Start
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event to run on battle start?
 * @default 0
 *
 * @param On Battle Turn End
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event to run on turn end?
 * @default 0
 *
 * @param On Battle End
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event to run on battle end?
 * @default 0
 *
 * @param On Battle Win
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event to run on win?
 * @default 0
 *
 * @param On Battle Lose
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event to run on lose?
 * @default 0
 *
 * @param On Battle Escape
 * @parent Battle Common Events
 * @type common_event
 * @desc Common event to run on escape?
 * @default 0
 *
 * @param Battle Action CE
 * @parent Battle Common Events
 * @type boolean
 * @desc "Battle Action" common events. Requires "Enhanced Damage Popups" feature enabled!
 * @default true
 * 
 * @param On Critical Hit
 * @parent Battle Action CE
 * @type common_event
 * @desc Common event to run on critical hit?
 * @default 0
 *
 * @param On Miss
 * @parent Battle Action CE
 * @type common_event
 * @desc Common event to run on miss?
 * @default 0
 *
 * @param On Evade
 * @parent Battle Action CE
 * @type common_event
 * @desc Common event to run on evade?
 * @default 0
 *
 * @param On Resist
 * @parent Battle Action CE
 * @type common_event
 * @desc Common event to run on resist?
 * @default 0
 *
 * @param On Immune
 * @parent Battle Action CE
 * @type common_event
 * @desc Common event to run on immune?
 * @default 0
 *
 * @param Battle Field
 * @type boolean
 * @desc Define battle field top and bottom where battlers can be.
 * @default true
 * 
 * @param Battlefield Top
 * @parent Battle Field
 * @type number
 * @decimals 2
 * @desc Adjust top of the battle field.
 * @default 0.54
 * 
 * @param Battlefield Bottom
 * @parent Battle Field
 * @type number
 * @decimals 2
 * @desc Adjust bottom of the battle field.
 * @default 0.70
 * 
 * @param Adjust Actors X
 * @parent Battle Field
 * @type number
 * @decimals 2
 * @desc Adjust Actors X based on width of the screen. 1 = Most right.
 * @default 0.85
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
 * This plugin provides core battle functions like:
 *     - Battler z-index by y-axis
 *     - Adjust battlefield pos and dimensions & battler x/y
 *     - Animated enemies with motions (SV) or "vanilla" static graphics
 *     - Fly/Float mode (in battle) for enemies / actors
 *     - Action Sequences (JS eval)
 *     - Substitute Behaviours (STATE specifics - via notetags)
 *     - Perform all damage / collapse at once
 *     - Skipping emerged / party command windows
 *     - Disabling party command window
 *     - Disabling / Enabling Actor commands
 *     - Some basic battle common events
 *     - Battle Window Styles, Battle Cursor and Command Icons
 *     - Enhanced Damage Popups with Evade, Resist, Crit and Immune popups!
 *
 * This plugin was created to have battle core and action sequences which are
 * compatible with Mokusei Penguins awesome MPP_Pseudo3DBattle -plugin!
 * Also overrides in this plugin are minimal* for maximum compatibility with
 * other plugins!
 *
 * * More features used = More overrides done...
 *
 * NOTE1: If MPP_Pseudo3DBattle is used it is required v1.2.1 or later.
 *
 * NOTE2: Use unique names for skill types. Other wise plugin will load first
 *        icon that matches the skill type name.
 *
 * NOTE3: Custom number font (overrides NumberFont in MZ if used), mainly
 *        made for MV to support also number fonts :)
 * 
 * WARNING! If "Enhanced damage pop-ups" are used in MV it will override
 *          way the damage numbers are drawn! (In MZ engine draws text to 
 *          bitmap -vs- in MV engine draws from bitmap to bitmap)
 * 
 * Note to myself (damage calc): Game_Action.prototype.evalDamageFormula
 * 
 * ----------------------------------------------------------------------------
 * Animated enemies
 * ============================================================================
 * To use SV enemies use $ prefix before sheet name (example: $my_charsheet)
 * NOTE: This will override some Game_Enemy methods to have motions enabled.
 * SV enemy sheet is exactly same as actor sheet! So no extra study there.
 *
 * Enemy / Actor notetags
 * ----------------------------------------------------------------------------
 * <flying:96:4>   Enable fly/float mode + set altitude and y fluctuation
 *                 (Note: Altitude < Fluctuation = disabled = 0:0)
 *                 
 * Motions: Normal/Abnormal/Sleep/KO
 * <flying:h:f/h:f/h:f/h:f> h = height, f = fluctuation
 * Abnormal defaults to Normal and Sleep/KO defaults to 0:0
 *
 * NOTE: If OcRam_Followers "Dead followers are" ghost or gone KO state is
 * handled as normal state, but only when battle starts. If ghost is revived
 * and then killed again KO motion applies normally.
 * 
 * <weapon_type:1> This is for SV enemy graphics only!
 * 
 * TIP: Use flying JS method in damage formulas! Example (immune if flying):
 * b.isFlying() ? 0 : a.atk * 4 - b.def * 2 + 5
 * 
 * ----------------------------------------------------------------------------
 * Action Sequenses
 * ============================================================================
 * Or what about Reid/Harold are so bad*ss guys with swinging swords so hard 
 * that they don't need to be close to the target?! Now you can move your 
 * battlers with action sequences! (with JS eval notetags) -Or- then just use 
 * OcRam automated action sequences for some basic sequencing  without need to
 * know how to script at all (based on skill types, scope and weapon motions).
 * 
 * Available motions: walk, wait, chant, guard, damage, evade, thrust, swing, 
 * missile, skill, spell, item, escape, victory, dying, abnormal, sleep, dead
 * 
 * For action sequence commands default target is always skill user.
 * 
 * Action Sequences: Notetags
 * ----------------------------------------------------------------------------
 * Skill notetags (action sequences):
 *   <init>JS_Code_Here();</init> // Eval before actual action is started
 *   <perform>JS_Code_Here();</perform> // Eval action is performed
 *   <finish>JS_Code_Here();</finish> // Eval after action is performed
 *
 * Example simple attack skill:
 * <init>if (weaponMotion() != 'missile') playMotion('guard');</init>
 * <perform>if (weaponMotion() != 'missile') jump();</perform>
 * <finish>
 * if (weaponMotion() != 'missile') { playMotion('escape'); jumpHome(); }
 * </finish>
 *
 * ==== VERY IMPORTANT! VERY IMPORTANT! == VERY IMPORTANT! VERY IMPORTANT! ====
 * NOTE: ENTER will always create NEW eval == if, switch and such statements
 * MUST BE in same row! Example: if (a) { doThingsNow(); doThingsThen(); }
 * switch (a) { case 0: boo(); break; case 1: hoo(); break }
 *
 * Example below will cause 2 ERRORS and always executes both "doThings"!
 * if (a) {
 *     doThingsNow();
 *     doThingsThen();
 * }
 *
 * NOTE2: ENTER will also wait for previous wait(xx); function!
 * 
 * Action Sequences: JS calls (scope (this) == OcRam.Battle_Core)
 * ----------------------------------------------------------------------------
 * DEFAULT SUBJECT == SKILL USER (if ommitted parameters)
 * DEFAULT TARGET == ACTION TARGET[0] (if ommitted parameters)
 * Jump altitude default is 1. For example 2 makes jump twice as high!
 * Durations defaults to 30 frames.
 *
 * wait(frames); // Tell battle scene to wait this amount of frames (Use Enter)
 * locate(xoffset, yoffset, target, subject); // Locates subject to target
 * locateXY(x, y, subject); // Locates subject to XY
 * move(duration, xoffset, yoffset, target, subject); // Move to target
 * moveXY(x, y, duration, subject); // Move subject to XY within time span
 * jump(altitude, duration, xoffset, yoffset, target, subject); // Jump to targ
 * jumpXY(x, y, altitude, duration, subject); // Subject jumps to XY
 * jumpHome(altitude, duration, subject); // Jump home
 * playMotion(motion, subject); // Play motion on subject (remember wait)
 * playAnimation(animationId, mirror, targets); // Play animation on targets
 * clearMotion(subject); // Clears motions from subject
 * mirrored(value, subject); // Flip battler horizontally?
 * weaponMotion(subject); // What weapon motion given subject has?
 * performAttack(do_damage, actor); // Performs attack motion (+do damage?)!
 * 
 * Other examples:
 * target.isFlying() // Returns true if target is flying
 * // Parameters in pairs (height, fluctuation): norm, abnorm, sleep, ko 
 * target.setFlying(16, 4, 16, 12, 4, 4, 0, 0)
 * target.evalDamageNow() // Evals damage now! (specied in action formula)
 * 
 * ----------------------------------------------------------------------------
 * Substitute
 * ============================================================================
 * To change SUBSTITUTE default behaviour type to STATE notefield:
 * <substitute>
 * this._action.isPhysical() && this._action.isForOne()
 * </substitute>
 * 
 * Some JScript eval examples on Substitute behaviour:
 * ----------------------------------------------------------------------------
 * Default behaviour:
 * target.isDying() && !this._action.isCertainHit()
 *
 * Substitute always on 1 target physical attacks:
 * this._action.isPhysical() && this._action.isForOne()
 *
 * Substitute always on magical attacks:
 * this._action.isMagical()
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
 * COMMERCIAL USE: (Standard license: 10 EUR, No-credits license: 50 EUR)
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
 * Copyright (c) 2022, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2021/10/21 v1.00 - Initial release
 * 2021/12/01 v1.01 - VisuMZ Battle Core compatibility patch.
 *                    (NOTE: All overlapping features such as: Action Seq.,
 *                    sort by Y-axis and all popups at once will be disabled 
 *                    in OcRam_Battle_Core if VisuMZ Battle Core is used)
 * 2022/01/23 v1.02 - battle_cursor.png is now defined as required asset
 * 2022/04/22 v1.03 - Battler collapse on map bug fixed
 *                    Fixed bug when setFlying() didn't have battler sprite.
 *                    NEW <flying:Normal/Abnormal/Sleep/KO> custom flying 
 *                    height and fluctuation for each motion (Credits to r66r)
 * 2022/04/30 v1.04 - RETRO support for RPG Maker MV!
 *                    Number font face, size, outline plugin parameters!
 *                    Please note that if you use "Number font" feature in
 *                    MZ it will override default Number Font...
 * 2022/07/10 v1.05 - <width_offset> & <height_offset> notations for battlers
 *                    <no_shadow> to disable battler shadow
 * 2022/11/11 v1.06 - New plugin param to disable Actor Command Window
 *                    (Credits to BlueToo)
 *                    
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * BattleManager.applySubstitute (for dynamic substituting)
 * Sprite_Actor.setActorHome (for relative battler positions)
 * Sprite_Actor.damageOffsetX (for relative battler positions)
 * Spriteset_Battle.createEnemies (checks if SV enemy is used)
 * Scene_Battle.updateCancelButton (for party command window enable/disable)
 * 
 * BattleManager.displayStartMessages (if Skip Emerged is enabled)
 * Scene_Battle.changeInputWindow (if Skip or Disable Party Command is enabled)
 * Window_Command.drawItem (if icons are used and icon is found)
 *
 * BattleManager.updateAction (if "All Popups At Once" is enabled)
 * Window_BattleLog.isFastForward (if "All Popups At Once" is enabled)
 * Window_BattleLog.displayActionResults (if "All Popups At Once" is enabled)
 * Window_BattleLog.displayHpDamage (if "All Popups At Once" is enabled)
 * Window_BattleLog.displayAddedStates (if "All Popups At Once" is enabled)
 *
 * Game_Action.needsSelection (if "Confirm All Scopes" is enabled)
 * Window_BattleActor.select (if "Confirm All Scopes" is enabled)
 * Window_BattleEnemy.select (if "Confirm All Scopes" is enabled)
 *
 * Sprite_Damage.setup (if "Enchanced Damage Popups" is enabled)
 * Sprite_Damage.createDigits (if "Enchanced Damage Popups" is enabled)
 * Sprite_Damage.createMiss (if "Enchanced Damage Popups" is enabled)
 * Sprite_Damage.updateFlash (if "Enchanced Damage Popups" is enabled)
 * Sprite_Damage.updateOpacity (if "Enchanced Damage Popups" is enabled)
 *
 * Some of the Game_Enemy methods (if enemy SV sheet is used ($ prefixed))
 *  - retreat, performDamage/Evasion/MagicEvasion/Collapse and refreshMotion
 *  - And also Sprite_Actor.initialize
 *  
 * @requiredAssets
 * img/ocram/battle_cursor.png
 * 
 */
/*~struct~SkillTypeIcons:
 *
 * @param skillId
 * @text Skill Id
 * @type number
 * @desc Skill type Id.
 * @default 0
 *
 * @param iconIndex
 * @text Icon Index
 * @type number
 * @desc Icon index.
 * @default 0
 * 
 * @
~*/ // End of structs

/** Custom battle cursor class */
function Sprite_BattleCursor() {
    this.initialize(...arguments);
}

Sprite_BattleCursor.prototype = Object.create(Sprite.prototype);
Sprite_BattleCursor.prototype.constructor = Sprite_BattleCursor;

Sprite_BattleCursor.prototype.initialize = function (battler) {
    Sprite.prototype.initialize.call(this);
    this.loadBitmap(); this.initMembers(battler);
    if (battler._enemy) this.scale.x *= -1; // Flip cursor for static enemies also
};

Sprite_BattleCursor.prototype.initMembers = function (battler) {
    this._battler = battler._actor || battler._battler; this._sprite = battler;
    this._reverse = false; this.visible = false;
    this._animationCount = 0; this._animFrames = 20;
    this.anchor.x = OcRam.getFloat(OcRam.Battle_Core.parameters['Cursor Anchor X']);
    this.anchor.y = OcRam.getFloat(OcRam.Battle_Core.parameters['Cursor Anchor Y']);
};

Sprite_BattleCursor.prototype.loadBitmap = function () {
    this.bitmap = ImageManager.loadOcRamBitmap('battle_cursor');
};

Sprite_BattleCursor.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this._battler.isSelected() && !this._battler.isDead() && this._sprite) {
        if (!this._homeY) this._homeY = -this._sprite.height;
        this._animationCount++;
        const cbcc = this._animationCount % this._animFrames;
        if (cbcc == 0) this._reverse = !this._reverse;
        if (this._reverse) {
            this.y = this._homeY + cbcc;
        } else {
            this.y = (this._homeY + this._animFrames) - cbcc;
        } if (!this.visible) this.visible = true;
    } else if (this._animationCount > 0) {
        this.visible = false; this._reverse = false;
        this._animationCount = 0; this.y = this._homeY;
    }
};

(function () {

    if (!OcRam.isMZ()) {

        Window_Selectable.prototype.itemLineRect = function (index) { // BUG FIX for RETRO v0.11 (const keyword is missing!)
            const rect = this.itemRect(index); rect.width -= this.textPadding(); return rect;
        };

        Game_System.prototype.numberFontFace = function () { // NEW - in MV there's no equivalent "number font" in MV
            return "GameFont";
        };

        Sprite_Damage.prototype.damageColor = function () { // NEW - in MV there's no equivalent "damageColor"
            return ColorManager.textColor(this._colorType);
        };

        Sprite_Damage.prototype.fontFace = function () { // NEW as defined in MZ
            return $gameSystem.numberFontFace();
        };

        Sprite_Damage.prototype.fontSize = function () { // NEW as defined in MZ
            return $gameSystem.mainFontSize() + 4;
        };

        Sprite_Damage.prototype.outlineWidth = function () { // NEW as defined in MZ
            return 4;
        };

        Sprite_Damage.prototype.outlineColor = function () { // NEW as defined in MZ
            return "rgba(0, 0, 0, 0.7)";
        };

        Scene_Battle.prototype.hideSubInputWindows = function () { // NEW as defined in MZ
            this._actorWindow.deactivate();
            this._enemyWindow.deactivate();
            this._skillWindow.deactivate();
            this._itemWindow.deactivate();
            this._actorWindow.hide();
            this._enemyWindow.hide();
            this._skillWindow.hide();
            this._itemWindow.hide();
        };

        Spriteset_Base.prototype.findTargetSprite = function (/*target*/) { // NEW as defined in MZ
            return null;
        };

        Spriteset_Battle.prototype.findTargetSprite = function (target) { // NEW as defined in MZ
            return this.battlerSprites().find(sprite => sprite.checkBattler(target));
        };

        Sprite_Battler.prototype.checkBattler = function (battler) { // NEW as defined in MZ
            return this._battler === battler;
        };

        Sprite_Actor.prototype.mainSprite = function () { // New in MV exists in MZ
            return this._mainSprite;
        };

        Game_Temp.prototype.requestAnimation = function (targets, animationId, mirror) { // Shows animation on 'targets'
            if ($dataAnimations[animationId]) {
                // In MV there's no animation queue...
                /*const request = {
                    targets: targets,
                    animationId: animationId,
                    mirror: mirror
                }; this._animationQueue.push(request);*/
                for (const target of targets) {
                    if (target.startAnimation) {
                        target.startAnimation(animationId, mirror, 0);
                    }
                }
            }

        };

        const MV_SpriteDamage_initialize = Sprite_Damage.prototype.initialize;
        Sprite_Damage.prototype.initialize = function () {
            MV_SpriteDamage_initialize.call(this, arguments);
            this._colorType = 0; // This prevents some errors occuring, but this alone won't make MZ style TEXT to BITMAP functionality...
        };

        const MV_SpriteDamage_createDigits = Sprite_Damage.prototype.createDigits;
        Sprite_Damage.prototype.createDigits = function (p1, p2) {
            if (p2 == undefined || p2 == null) { // MZ has no 'baseRow' param instead it's 'color' type...
                MV_SpriteDamage_createDigits.call(this, this._colorType < 2 ? 0 : 2, p1);
            } else { // MV style damage as it is...
                MV_SpriteDamage_createDigits.call(this, p1, p2);
            }
        };

        if (OcRam.getBoolean(this.parameters['Enhanced Damage Popups'])) { // Use MZ style damage popups?
            // NOTE: Overwrites may break other MV plugins! These are not considered as 'safe'!
            // Overwrite (MV: bitmap >> text) vs. (MZ: text >> bitmap)
            // Only used when text to bitmap damage pop-ups are in use (MZ style)!
            Sprite_Damage.prototype.createDigits = function (p1, p2) {
                const value = (p2 == undefined || p2 == null) ? p1 : p2;
                const string = Math.abs(value).toString();
                const h = this.fontSize();
                const w = Math.floor(h * 0.75);
                for (let i = 0; i < string.length; i++) {
                    const sprite = this.createChildSprite(w, h);
                    sprite.bitmap.drawText(string[i], 0, 0, w, h, "center");
                    sprite.x = (i - (string.length - 1) / 2) * w;
                    sprite.dy = -i;
                }
            }; Sprite_Damage.prototype.createChildSprite = function (width, height) {
                const sprite = new Sprite();
                sprite.bitmap = this.createBitmap(width, height);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 1;
                sprite.y = -40;
                sprite.ry = sprite.y;
                this.addChild(sprite);
                return sprite;
            }; Sprite_Damage.prototype.createBitmap = function (width, height) {
                const bitmap = new Bitmap(width, height);
                bitmap.fontFace = this.fontFace();
                bitmap.fontSize = this.fontSize();
                bitmap.textColor = this.damageColor();
                bitmap.outlineColor = this.outlineColor();
                bitmap.outlineWidth = this.outlineWidth();
                return bitmap;
            };
        }

        // OcRam only START
        Sprite_Actor.prototype.shouldStepForward = function () { // New
            return this._actor.isInputting() || this._actor.isActing();
        }; const MV_Sprite_Actor_stepForward = Sprite_Actor.prototype.stepForward;
        Sprite_Actor.prototype.stepForward = function () {
            if (!this.shouldStepForward()) return;
            if (BattleManager._tmpSubject == null) return;
            MV_Sprite_Actor_stepForward.call(this);
        }; // OcRam only END

    }

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _MPP_Pseudo3DBattle = PluginManager._scripts.includes("MPP_Pseudo3DBattle");

    const _skipEmergedMessage = OcRam.getBoolean(this.parameters['Skip Emerged Message']);
    const _skipPartyCommand = OcRam.getBoolean(this.parameters['Skip Party Command']);
    let _disablePartyCommand = OcRam.getBoolean(this.parameters['Disable Party Command']);
    const _disableActorCommand = OcRam.getBoolean(this.parameters['Disable Actor Command']);
    const _useBattleCursor = OcRam.getBoolean(this.parameters['Battle Cursor']);
    const _confirmAllScopes = OcRam.getBoolean(this.parameters['Confirm All Scopes']);
    const _battleDigitSpacing = Number(this.parameters['Digit Spacing']);
    const _battleMissText = ('' + this.parameters['Miss Text']);
    const _battleEvadeText = ('' + this.parameters['Evade Text']);
    const _battleResistText = ('' + this.parameters['Resist Text']);
    const _battleImmuneText = ('' + this.parameters['Immune Text']);
    const _battleCriticalText = ('' + this.parameters['Critical Text']);
    const _battlersXMultiplier = OcRam.getFloat(this.parameters['Adjust Actors X']) || 0.85;
    const _battlefieldTop = OcRam.getFloat(this.parameters['Battlefield Top']) || 0.48;
    const _battlefieldBottom = OcRam.getFloat(this.parameters['Battlefield Bottom']) || 0.68;
    const _enhancedDamagePopUps = OcRam.getBoolean(this.parameters['Enhanced Damage Popups']);

    const _numberFontFace = this.parameters['Number Font Face'];
    const _numberFontSize = Number(this.parameters['Number Font Size']);
    const _numberOutlineWidth = Number(this.parameters['Number Outline Width']) || 4;

    const isSystemFont = fn => {
        return fn == "rmmz-numberfont" || fn == "rmmz-mainfont" || fn == "GameFont";
    };

    if (_numberFontSize) {
        Sprite_Damage.prototype.fontSize = function () {
            return _numberFontSize;
        };
    } else if (!OcRam.isMZ()) {
        Sprite_Damage.prototype.fontSize = function () {
            return $gameSystem.mainFontSize() + 4;
        };
    } if (_numberFontFace) {
        if (OcRam.isMZ()) {
            this.extend(Scene_Boot, "loadGameFonts", function () {
                _this["Scene_Boot_loadGameFonts"].apply(this, arguments);
                if (!isSystemFont(_numberFontFace)) FontManager.load("ocram-number", _numberFontFace);
            });
        } else {
            Game_System.prototype.numberFontFace = function () { // NEW - in MV there's no equivalent "number font" in MV
                return "ocram-number";
            }; Graphics.loadFont("ocram-number", "./fonts/" + _numberFontFace);
        }
        Sprite_Damage.prototype.fontFace = function () {
            return "ocram-number";
        };
    } else if (!OcRam.isMZ()) {
        Sprite_Damage.prototype.fontFace = function () {
            return $gameSystem.numberFontFace();
        };
    }

    if (!OcRam.isMZ()) {
        Sprite_Damage.prototype.outlineWidth = function () { // NEW
            return _numberOutlineWidth;
        }; Sprite_Damage.prototype.outlineColor = function () { // NEW
            return "rgba(0, 0, 0, 0.7)";
        };
    }

    let _showAttack = OcRam.getBoolean(this.parameters['Show Attack']);
    let _showGuard = OcRam.getBoolean(this.parameters['Show Guard']);
    let _showSkill = OcRam.getBoolean(this.parameters['Show Skill']);
    let _showItem = OcRam.getBoolean(this.parameters['Show Item']);
    let _autoActionSequences = OcRam.getBoolean(this.parameters['Automate Action Sequences']);
    let _substituteType = Number(this.parameters['Substitute Behaviour']);

    // Automated Action Sequences
    let _autoActSeqMeleeInit = OcRam.getNote(this.parameters['Melee Init']);
    let _autoActSeqMeleePerform = OcRam.getNote(this.parameters['Melee Perform']);
    let _autoActSeqMeleeFinish = OcRam.getNote(this.parameters['Melee Finish']);
    let _autoActSeqRangedInit = OcRam.getNote(this.parameters['Ranged Init']);
    let _autoActSeqRangedPerform = OcRam.getNote(this.parameters['Ranged Perform']);
    let _autoActSeqRangedFinish = OcRam.getNote(this.parameters['Ranged Finish']);
    let _autoActSeqMagicInit = OcRam.getNote(this.parameters['Magic Init']);
    let _autoActSeqMagicPerform = OcRam.getNote(this.parameters['Magic Perform']);
    let _autoActSeqMagicFinish = OcRam.getNote(this.parameters['Magic Finish']);

    const _commandWindowType = Number(this.parameters['Command Window']);
    const _otherBattleWindowType = Number(this.parameters['Other Battle Windows']);

    const _useBattleIcons = OcRam.getBoolean(this.parameters['Battle Icons']);
    const _attackIcon = Number(this.parameters['Attack Icon']);
    const _guardIcon = Number(this.parameters['Guard Icon']);
    const _itemIcon = Number(this.parameters['Item Icon']);
    const _genericIcon = Number(this.parameters['Skill Icon']);
    const _fightIcon = Number(this.parameters['Fight Icon']);
    const _escapeIcon = Number(this.parameters['Escape Icon']);

    const _showAllPopupsAtOnce = Imported.VisuMZ_1_BattleCore ? false : OcRam.getBoolean(this.parameters['All Popups At Once']);

    const _skillTypeIcons = [];
    (OcRam.getJSONArray(this.parameters['Skill Type Icons']) || []).forEach(itm => {
        _skillTypeIcons.push({ skillId: Number(itm.skillId), iconIndex: Number(itm.iconIndex) });
    });

    // Common events
    const _useBattleCE = OcRam.getBoolean(this.parameters['Battle Common Events']);
    const _battleCE = {}; // BattleManager
    _battleCE["startBattle"] = Number(this.parameters['On Battle Start']);
    _battleCE["endTurn"] = Number(this.parameters['On Battle Turn End']);
    _battleCE["endBattle"] = Number(this.parameters['On Battle End']);
    _battleCE["processVictory"] = Number(this.parameters['On Battle Win']);
    _battleCE["processDefeat"] = Number(this.parameters['On Battle Lose']);
    _battleCE["onEscapeSuccess"] = Number(this.parameters['On Battle Escape']);
    _battleCE["onEvade"] = Number(this.parameters['On Evade']);
    _battleCE["onMiss"] = Number(this.parameters['On Miss']);
    _battleCE["onResist"] = Number(this.parameters['On Resist']);
    _battleCE["onImmune"] = Number(this.parameters['On Immune']);
    _battleCE["onCritical"] = Number(this.parameters['On Critical Hit']);

    const _subtituteStates = []; // Prefind all states where substitute is found
    const _skillIconTerms = []; let _digitFontWidth = 8;

    let _substituteBattler = null;
    let _ceTarget = null;

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    const getMetaTag = (note, tag) => {
        const rex = new RegExp("\<" + tag + "\>\n?(.*?)\n?\<\/" + tag + "\>", "gi");
        const ret = rex.exec(note);
        return (ret != null) ? ret[1] : "";
    };

    const rndBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Finds sprite for battler
    const findTargetSprite = game_battler => {
        if (!OcRam.scene()._spriteset) return null;
        return OcRam.scene()._spriteset.findTargetSprite(game_battler);
    };

    // If no Action Sequence notetags are defined and automated action sequenses are in use...
    const automatedActionSequence = (skill, phase) => {
        if (!_autoActionSequences) return "";
        const stype = skill.stypeId; const is_magic = $dataSystem.magicSkills.indexOf(stype) > -1;
        if (!is_magic && skill.scope == 1) {
            const wmotion = weaponMotion();
            if (wmotion != "missile") { // Single target no magic nor missile damage
                switch (phase) {
                    case 0: return _autoActSeqMeleeInit; break;
                    case 1: return _autoActSeqMeleePerform; break;
                    case 2: return _autoActSeqMeleeFinish; break;
                }
            } else if (wmotion == "missile") { // Single target no magic and IS missile damage
                switch (phase) {
                    case 0: return _autoActSeqRangedInit; break;
                    case 1: return _autoActSeqRangedPerform; break;
                    case 2: return _autoActSeqRangedFinish; break;
                }
            }
        } else if (is_magic) { // This skill is defined as "Magic" skill
            switch (phase) {
                case 0: return _autoActSeqMagicInit; break;
                case 1: return _autoActSeqMagicPerform; break;
                case 2: return _autoActSeqMagicFinish; break;
            }
        }
    };

    // Action Sequence Functions
    const wait = frames => {
        let lw = BattleManager._logWindow; if (!lw) return; lw._waitCount = frames; lw._waitMode = 'OcRam';
    }; const locate = (xoffset, yoffset, target, subject) => {
        const s = subject || BattleManager._tmpSubject; s.locate(xoffset, yoffset, target);
    }; const locateXY = (x, y, subject) => {
        const s = subject || BattleManager._tmpSubject; s.locateXY(x, y);
    }; const move = (duration, xoffset, yoffset, target, subject) => {
        const s = subject || BattleManager._tmpSubject; s.moveBattler(duration, xoffset, yoffset, target);
    }; const moveXY = (x, y, duration, subject) => {
        const s = subject || BattleManager._tmpSubject; s.moveBattlerXY(x, y, duration);
    }; const jump = (altitude, duration, xoffset, yoffset, target, subject) => {
        const s = subject || BattleManager._tmpSubject; s.jump(altitude, duration, xoffset, yoffset, target);
    }; const jumpXY = (x, y, altitude, duration, subject) => {
        const s = subject || BattleManager._tmpSubject; s.jumpXY(x, y, altitude, duration);
    }; const jumpHome = (altitude, duration, subject) => {
        const s = subject || BattleManager._tmpSubject; s.jumpHome(altitude, duration);
    }; const playMotion = (motion, subject) => {
        const s = subject || BattleManager._tmpSubject; s.requestMotion(motion); s.requestMotionRefresh();
    }; const playAnimation = (animationId, mirror, targets) => {
        const s = targets || [BattleManager._tmpSubject];
        $gameTemp.requestAnimation(s, animationId, mirror);
    }; const clearMotion = (subject) => {
        const s = subject || BattleManager._tmpSubject; s.clearMotion();
    }; const mirrored = (value, subject) => {
        const s = subject || BattleManager._tmpSubject; s.mirrored(value);
    }; const weaponMotion = subject => {
        const s = subject || BattleManager._tmpSubject; if (!s) return "";
        if (!s.hasNoWeapons || s.hasNoWeapons()) return "thrust";
        const weapon = s.weapons()[0];
        const motion = $dataSystem.attackMotions[weapon.wtypeId].type;
        switch (motion) {
            case 0: return "thrust"; break;
            case 1: return "swing"; break;
            case 2: return "missile"; break;
            default: return "thrust"; break;
        }
    }; const performAttack = (eval_damage, subject, target) => {
        const s = subject || BattleManager._tmpSubject;
        if (s.performAttack) s.performAttack();
        if (eval_damage) {
            s.evalDamageNow(target);
            SoundManager.playActorDamage();
        }
    };

    // To be passed to scoped eval!
    const _evalParams = "subject, target, action, findTargetSprite, wait, mirrored, playMotion, playAnimation, clearMotion, locate, locateXY, move, moveXY, jump, jumpXY, jumpHome, weaponMotion, performAttack";
    const _evalArgs = [findTargetSprite, wait, mirrored, playMotion, playAnimation, clearMotion, locate, locateXY, move, moveXY, jump, jumpXY, jumpHome, weaponMotion, performAttack];

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.getSubject = () => BattleManager._tmpSubject;
    this.getAction = () => BattleManager._tmpAction;
    this.getTarget = () => BattleManager._targets.length > 0 ? BattleManager._targets[0] : _ceTarget;

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    // Allow multiple damages to start from 0 offset
    Sprite_Battler.prototype.createDamageSpriteToRoot = function () {
        const sprite = new Sprite_Damage();
        sprite.x = this.x + this.damageOffsetX();
        sprite.y = this.y + this.damageOffsetY();
        sprite.setup(this._battler);
        this._damages.push(sprite);
        this.parent.addChild(sprite);
    };

    // New method for drawing icons in commands
    Window_Command.prototype.commandIcon = function (index) {
        const name = this.commandName(index); const fi = _skillIconTerms.indexOf(name);
        if (fi > -1) {
            switch (name) {
                case TextManager.attack: return _attackIcon; break;
                case TextManager.guard: return _guardIcon; break;
                case TextManager.item: return _itemIcon; break;
                case TextManager.fight: return _fightIcon; break;
                case TextManager.escape: return _escapeIcon; break;
                default:
                    const f = _skillTypeIcons.find(i => i.skillId == fi);
                    if (f) {
                        return f.iconIndex;
                    } else {
                        return _genericIcon;
                    } break;
            }
        } return 0;
    };

    // New wait mode for Window_BattleLog!
    Window_BattleLog.prototype.waitForOcRam = function (cb, args) {
        if (this._waitMode == "OcRam") {
            requestAnimationFrame(() => {
                this.waitForOcRam(cb, args);
            });
        } else {
            return cb.apply(this, args);
        }
    };

    // Excutes Action Sequences in order!
    Window_BattleLog.prototype.doActionSequenses = function (eval_js, subject, action, phase) {
        if (eval_js == "" || Imported.VisuMZ_1_BattleCore) return;
        BattleManager._actionSequence = true;
        const evals = (eval_js + "\n").split("\n");
        const target = _this.getTarget();
        evals.forEach(es => {
            if (es != "") {
                try {
                    this.waitForOcRam(
                        OcRam.scopedEval, [_this, es, _evalParams, [subject, target, action].concat(_evalArgs)]
                    );
                } catch (e) { console.warn("Error on Action Sequence (phase " + phase + "):", e); }
            }
        });
    };

    // Sort battlers by Y-axis!
    if (OcRam.isMZ()) { // Logics for MZ
        Spriteset_Battle.prototype.sortSprites = function (a, b) {
            if (!a._isBattlerSprite) return 0; if (!b._isBattlerSprite) return -1;
            if (b.isJumping()) return -1; if (a.isJumping()) return 0;
            const ay = a.y + a._altitude; const by = b.y + b._altitude;
            if (ay < by) return -1; if (ay > by) return 1; return 0;
        };
    } else { // Logics for MV
        Spriteset_Battle.prototype.sortSprites = function (a, b) {
            if (a._isDamage) return 1; if (b._isDamage) return -1;
            if (b.isJumping && b.isJumping()) return -1;
            if (a.isJumping && a.isJumping()) return 0;
            const ay = a.y + (a._altitude | 0); const by = b.y + (b._altitude | 0);
            if (ay < by) return -1; if (ay > by) return 1; return 0;
        };
    }
    
    // New property if battler is mirrored
    Object.defineProperty(Sprite_Battler.prototype, 'mirrored', {
        get: function () {
            return this._mirrored;
        },
        set: function (value) {
            if (this.mirrored && !value) {
                this.scale.x *= -1;
                this._mirrored = false;
            }
            if (!this.mirrored && value) {
                this.scale.x *= -1;
                this._mirrored = true;
            }
        },
        configurable: true
    });

    // Game_Actor or Game_Enemy
    Game_Battler.prototype.mirrored = function (value) {
        findTargetSprite(this).mirrored = value;
    };

    if (!Imported.VisuMZ_1_BattleCore) {

        // Substitute visually also...
        Game_Battler.prototype.moveToSubstitute = function (target) {
            if (!_substituteType) return;
            const t = findTargetSprite(target);
            t.startMove(-((t.getWidth() * 0.5) | 0), 0, 15); // Flinch battler to be substituted
            switch (_substituteType) {
                case 1: this.jump(1, 15, -t.getWidth(), 0, target); break;
                case 2:
                    const s = findTargetSprite(this);
                    const tx = t._homeX - s._homeX;
                    const ty = t._homeY - s._homeY;
                    s.startMove(tx, ty, 15); break;
            }
        };

        // Instantly locate battler to target
        Game_Battler.prototype.locate = function (xoffset, yoffset, target) { // Game_Actor or Game_Enemy

            const this_sprite = findTargetSprite(this);
            const t = target || BattleManager._targets.length > 0 ? BattleManager._targets[0] : this;
            const target_sprite = findTargetSprite(t);
            const w = target_sprite.getWidth();
            const h = 0;

            let xPlus = target_sprite.x + w - this_sprite.x + (xoffset || 0) + this_sprite._offsetX;
            let yPlus = (target_sprite.y) - (this_sprite.y) + (yoffset || 0) + this_sprite._offsetY +
                (this_sprite._targetAltitude ? -(h + this_sprite._targetAltitude - target_sprite._targetAltitude) : target_sprite._targetAltitude);

            this_sprite.startMove(xPlus, yPlus, 0);

        };

        Game_Battler.prototype.locateXY = function (x, y) {
            const this_sprite = findTargetSprite(this);
            const xPlus = x - this_sprite.x + this_sprite._offsetX;
            const yPlus = y - this_sprite.y + this_sprite._offsetY;
            this_sprite.startMove(xPlus, yPlus, 0);
        };

        // Move battlers!
        Game_Battler.prototype.moveBattler = function (duration, xoffset, yoffset, target) { // Game_Actor or Game_Enemy

            const this_sprite = findTargetSprite(this);
            const t = _substituteBattler || (target || (BattleManager._targets.length > 0 ? BattleManager._targets[0] : this));
            const target_sprite = findTargetSprite(t);
            const w = target_sprite.getWidth();

            let xPlus = (target_sprite.x + w - this_sprite.x + (xoffset || 0)) + this_sprite._offsetX;
            let yPlus = (target_sprite.y) - (this_sprite.y) + (yoffset || 0) + this_sprite._offsetY +
                (this_sprite._targetAltitude ? -(this_sprite._targetAltitude - target_sprite._targetAltitude) : target_sprite._targetAltitude);

            const d = duration || 30;

            this_sprite.startMove(xPlus, yPlus, d); wait(d);

        };

        Game_Battler.prototype.moveBattlerXY = function (x, y, duration) {
            const this_sprite = findTargetSprite(this);
            const xPlus = x - this_sprite.x + this_sprite._offsetX;
            const yPlus = y - this_sprite.y + this_sprite._offsetY;
            const d = duration || 30;
            this_sprite.startMove(xPlus, yPlus, d); wait(d);
        };

        // Jumping battlers!
        Game_Battler.prototype.jump = function (altitude, duration, xoffset, yoffset, target) { // Game_Actor or Game_Enemy

            const this_sprite = findTargetSprite(this);
            const t = _substituteBattler || (target || (BattleManager._targets.length > 0 ? BattleManager._targets[0] : this));
            const target_sprite = findTargetSprite(t);
            const w = target_sprite.getWidth();

            let xPlus = (target_sprite.x + w - this_sprite.x + (xoffset || 0)) + this_sprite._offsetX;
            let yPlus = (target_sprite.y) - (this_sprite.y) + (yoffset || 0) + this_sprite._offsetY +
                (this_sprite._targetAltitude ? -(this_sprite._targetAltitude - target_sprite._targetAltitude) : target_sprite._targetAltitude);

            const d = duration || 30;

            this_sprite.startMove(xPlus, yPlus, d); wait(d);
            this_sprite._jumpPeak = d * 0.5; this_sprite._jumpCount = d;
            this_sprite._jumpAltitude = (altitude == undefined ? 1 : altitude) * 0.5;

        };

        Game_Battler.prototype.jumpXY = function (x, y, altitude, duration) {
            const this_sprite = findTargetSprite(this);
            const xPlus = x - this_sprite.x + this_sprite._offsetX;
            const yPlus = y - this_sprite.y + this_sprite._offsetY;
            const d = duration || 30;
            this_sprite.startMove(xPlus, yPlus, d); wait(d);
            this_sprite._jumpPeak = d * 0.5; this_sprite._jumpCount = d;
            this_sprite._jumpAltitude = (altitude == undefined ? 1 : altitude) * 0.5;
        };

        // This battler will jump to home...
        Game_Battler.prototype.jumpHome = function (altitude, duration) { // Game_Actor or Game_Enemy
            const this_sprite = findTargetSprite(this); const d = duration || 30;
            this_sprite.startMove(0, 0, d); wait(d);
            this_sprite._jumpPeak = d * 0.5; this_sprite._jumpCount = d;
            this_sprite._jumpAltitude = (altitude == undefined ? 1 : altitude) * 0.5;
        };

        // Tweaked version of Game_CharacterBase.prototype.jumpHeight
        Sprite_Battler.prototype.jumpHeight = function () {
            return this.isJumping() ? (
                (this._jumpPeak * this._jumpPeak - Math.pow(Math.abs(this._jumpCount - this._jumpPeak), 2)) * this._jumpAltitude
            ) : 0;
        };

        // Shadow while jumping...
        this.extend(Sprite_Actor, "updateShadow", function () {
            _this["Sprite_Actor_updateShadow"].apply(this, arguments);
            this._shadowSprite.y = this.jumpHeight() + this._altitude;
        });

        // When calculating battler positions consider jump height...
        this.extend(Sprite_Battler, "updatePosition", function () {
            _this["Sprite_Battler_updatePosition"].apply(this, arguments);
            if (this._targetAltitude > this._altitude) this._altitude += 0.25;
            if (this._targetAltitude < this._altitude) this._altitude -= 0.25;
            if (this._yFluctuation !== null) {
                if (this._targetAltitude == this._altitude | 0) {
                    if (this._reverseYFluctuation) {
                        this._targetAltitude -= this._yFluctuation;
                    } else {
                        this._targetAltitude += this._yFluctuation;
                    } this._reverseYFluctuation = !this._reverseYFluctuation;
                }
            } this.y -= (this.jumpHeight() + this._altitude);
        });

        Sprite_Battler.prototype.updateJump = function () { this._jumpCount--; };
        Sprite_Battler.prototype.isJumping = function () { return this._jumpCount > 0; };
        Game_Battler.prototype.evalDamageNow = function (target) {
            const action = BattleManager._tmpAction; // Game_Action
            const t = target || _this.getTarget();
            const ts = findTargetSprite(t);
            action.apply(t);
            ts.createDamageSpriteToRoot();
            if (t.hp === 0) {
                t.addState(t.deathStateId());
                if (t.performCollapse) t.performCollapse();
            } else {
                t.removeState(t.deathStateId());
            } t.requestMotionRefresh();
        };

        Game_Enemy.prototype.performAttack = function () {
            const de = $dataEnemies[this._enemyId]; if (!de) return;
            const wtypeId = de.meta && de.meta.weapon_type ? Number(de.meta.weapon_type) : 0;
            const attackMotion = $dataSystem.attackMotions[wtypeId];
            if (attackMotion) {
                if (attackMotion.type === 0) {
                    this.requestMotion("thrust");
                } else if (attackMotion.type === 1) {
                    this.requestMotion("swing");
                } else if (attackMotion.type === 2) {
                    this.requestMotion("missile");
                }
                this.startWeaponAnimation(attackMotion.weaponImageId);
            }
        };

        // Update jump count...
        this.extend(Sprite_Battler, "update", function () {
            _this["Sprite_Battler_update"].apply(this, arguments);
            if (this.isJumping()) this.updateJump();
        });

        this.extend(Spriteset_Battle, "update", function () {
            _this["Spriteset_Battle_update"].apply(this, arguments);
            this._battleField.children.sort(this.sortSprites);
        });

    } else {
        Game_Battler.prototype.moveToSubstitute = function (target) { };
    }

    Sprite_Battler.prototype.refreshFlying = function (force_altitude) {
        
        if (!this._motionAltitude || !this._motionFluctuation) return;
        const battler = this._battler; if (!battler) {
            _this.debug("refreshFlying(" + force_altitude + ") - BATTLER NOT FOUND, CAN'T USE MOTION INDEX!", this._motionAltitude, this._motionFluctuation);
            this._targetAltitude = this._motionAltitude[0];
            this._yFluctuation = this._motionFluctuation[0];
            if (force_altitude) this._altitude = this._targetAltitude;
            this._reverseYFluctuation = true; return;
        }

        // Ghosts have "Normal" flying state instead of "KO", but only if they are dead at battle start.
        const ghost = battler._ghosted && (Imported.OcRam_Followers && Number(OcRam.Followers.parameters["Dead followers are"]) > 0);
        const mi = ghost ? 0 : battler ? battler.stateMotionIndex() > 3 ? 0 : battler.stateMotionIndex() : 0;
        _this.debug("refreshFlying(" + force_altitude + ") - BATTLER FOUND", battler.stateMotionIndex(), this._motionAltitude, this._motionFluctuation);

        this._targetAltitude = this._motionAltitude[mi];
        this._yFluctuation = this._motionFluctuation[mi];
        if (force_altitude) this._altitude = this._targetAltitude;
        this._reverseYFluctuation = true;

    };

    Sprite_Battler.prototype.setFlying = function (nh, nf, ah, af, sh, sf, kh, kf, force_altitude) {

        nh = nh || 0; ah = OcRam.isOmitted(ah) ? nh : ah || 0; sh = sh || 0; kh = kh || 0;
        nf = nf || 0; af = OcRam.isOmitted(af) ? nf : af || 0; sf = sf || 0; kf = kf || 0;

        this._motionAltitude = [0, 0, 0, 0];
        this._motionFluctuation = [null, null, null, null];

        if (nh >= nf && nh) {
            this._motionAltitude[0] = nh;
            this._motionFluctuation[0] = nf;
        }

        if (ah >= af && ah) {
            this._motionAltitude[1] = ah;
            this._motionFluctuation[1] = af;
        }

        if (sh >= sf && sh) {
            this._motionAltitude[2] = sh;
            this._motionFluctuation[2] = sf;
        }

        if (kh >= kf && kh) {
            const a = (Imported.OcRam_Followers && Number(OcRam.Followers.parameters['Dead followers are'] || 0)) ? true : this._battler;
            this._motionAltitude[3] = !a ? kh : nh;
            this._motionFluctuation[3] = !a ? kf : nf;
        }

        this.refreshFlying(force_altitude);

    }; Game_Battler.prototype.setFlying = function (nh, nf, ah, af, sh, sf, kh, kf, force_altitude) { const ts = findTargetSprite(this); if (ts) ts.setFlying(nh, nf, ah, af, sh, sf, kh, kf, force_altitude); };
    Sprite_Battler.prototype.isFlying = function () { return this._altitude > 0; };
    Game_Battler.prototype.isFlying = function () { return findTargetSprite(this).isFlying(); };

    // Get width / height of the battler sprite
    Sprite_Battler.prototype.getWidth = function () {
        const sv = !!this._actor || this._svEnemy;
        const meta = this._battler._actorId ? $dataActors[this._battler._actorId].meta : this._battler._enemyId ? $dataEnemies[this._battler._enemyId].meta : null;
        let w_offset = 0;
        if (meta) {
            if (meta['width_offset']) w_offset = Number(meta['width_offset']);
        } const bm = sv ? this.mainSprite()._bitmap : this._bitmap;
        if (bm) {
            const ret = sv ? (bm.width / 9) + w_offset : bm.width + w_offset;
            return this._battler.isActor() ? -ret : ret;
        } console.warn("Couldn't find battler bitmap!");
        return 0; // Shouldn't occur...
    }; Sprite_Battler.prototype.getHeight = function () {
        const sv = !!this._actor || this._svEnemy;
        const meta = this._battler._actorId ? $dataActors[this._battler._actorId].meta : this._battler._enemyId ? $dataEnemies[this._battler._enemyId].meta : null;
        let h_offset = 0;
        if (meta) {
            if (meta['height_offset']) w_offset = Number(meta['height_offset']);
        } const bm = sv ? this.mainSprite()._bitmap : this._bitmap;
        if (bm) {
            const ret = sv ? (bm.height / 6) + h_offset : bm.height + h_offset;
            return ret;
        } console.warn("Couldn't find battler bitmap!");
        return 0; // Shouldn't occur...
    };

    Sprite_Damage.prototype.runOC_CE = function (cmd, target) {
        _ceTarget = target; const ceid = Number(_battleCE[cmd]); if (ceid) OcRam.forceCE(ceid);
    };

    Game_BattlerBase.prototype.initFlyingMeta = function (mi) {
        const battler = this.enemy && this.enemy() ? this.enemy() : this.actor && this.actor() ? this.actor() : null;
        if (!battler) return; const meta = battler.meta; if (!meta) return; mi = mi || 0;
        if (meta.no_shadow) {
            requestAnimationFrame(() => { // Wait for battler sprite
                const ts = findTargetSprite(this);
                if (ts) {
                    ts.createShadowSprite = () => { };
                    ts.updateShadow = () => { };
                    if (ts._shadowSprite) ts._shadowSprite.opacity = 0;
                }
            });
        } if (meta.flying) {
            const arr = (meta.flying + "///").split("/");
            const m0 = (arr[0] + ":").split(":");
            const m1 = (arr[1] + ":").split(":");
            const m2 = (arr[2] + ":").split(":");
            const m3 = (arr[3] + ":").split(":");
            requestAnimationFrame(() => { // Wait for battler sprite
                const ts = findTargetSprite(this); if (!ts) {
                    console.warn("SPRITE NOT FOUND FOR BATTLER:", this); return;
                }
                ts.setFlying(
                    Number(m0[0]), Number(m0[1]),
                    m1[0] != "" ? Number(m1[0]) : null, m1[1] != "" ? Number(m1[1]) : null,
                    m2[0] != "" ? Number(m2[0]) : null, m2[1] != "" ? Number(m2[1]) : null,
                    m3[0] != "" ? Number(m3[0]) : null, m3[1] != "" ? Number(m3[1]) : null,
                    true, mi
                );
            });
        }
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    this.extend(Game_BattlerBase, "revive", function () { // revive check if it's flying!
        _this["Game_BattlerBase_revive"].apply(this, arguments);
        const ts = findTargetSprite(this); if (ts) ts.refreshFlying(false);
    });

    // If has multiple damages already
    this.extend(Sprite_Battler, "createDamageSprite", function () {
        if (this._damages.length > 0) {
            this.createDamageSpriteToRoot();
        } else {
            _this["Sprite_Battler_createDamageSprite"].apply(this);
        }
    });

    if (_useBattleCE) {

        // Apply battle common events - New method exceptionally in 'Aliases' section....
        BattleManager.applyBattleCE = function (command, args) {
            if (_battleCE[command]) OcRam.runCE(_battleCE[command]);
            return _this["BattleManager_" + command].apply(this, args);
        };

        // Battle Common Events
        this.extend(BattleManager, "startBattle", function () {
            return this.applyBattleCE("startBattle", arguments);
        }); this.extend(BattleManager, "endTurn", function () {
            return this.applyBattleCE("endTurn", arguments);
        }); this.extend(BattleManager, "endBattle", function () {
            return this.applyBattleCE("endBattle", arguments);
        }); this.extend(BattleManager, "processVictory", function () {
            $gameMessage.setBackground(_otherBattleWindowType);
            return this.applyBattleCE("processVictory", arguments);
        }); this.extend(BattleManager, "processDefeat", function () {
            $gameMessage.setBackground(_otherBattleWindowType);
            return this.applyBattleCE("processDefeat", arguments);
        }); this.extend(BattleManager, "onEscapeSuccess", function () {
            return this.applyBattleCE("onEscapeSuccess", arguments);
        });

    } else {

        // Apply windows styles even if BCE's are not in use...
        this.extend(BattleManager, "processVictory", function () {
            $gameMessage.setBackground(_otherBattleWindowType);
            return _this["BattleManager_processVictory"].apply(this, arguments);
        }); this.extend(BattleManager, "processDefeat", function () {
            $gameMessage.setBackground(_otherBattleWindowType);
            return _this["BattleManager_processDefeat"].apply(this, arguments);
        });

    }

    // If action is sequenced ... do not 'flinch' ...
    this.extend(Sprite_Actor, "shouldStepForward", function () {
        if (BattleManager._actionSequence) return false;
        return _this["Sprite_Actor_shouldStepForward"].apply(this, arguments);
    }); this.extend(Sprite_Battler, "inHomePosition", function () {
        if (BattleManager._actionSequence) return true;
        return _this["Sprite_Battler_inHomePosition"].apply(this, arguments);
    });

    Sprite_Battler.prototype.updateCollapseAltitude = function (c) {
        if (c > 0) {
            this._altitude--; requestAnimationFrame(() => { this.updateCollapseAltitude(c - 1); });
        } else {
            this._targetAltitude = 0;
        }
    };

    this.extend(Game_Battler, "performCollapse", function () {
        _this["Game_Battler_performCollapse"].apply(this, arguments);
        if (!BattleManager._spriteset) return;
        if (this.enemy) {
            const sprite = BattleManager._spriteset._enemySprites.find(itm => itm._battler === this);
            if (sprite) sprite.updateCollapseAltitude(sprite._altitude);
        } else if (this.actor) {
            const sprite = BattleManager._spriteset._actorSprites.find(itm => itm._battler === this);
            if (sprite) sprite.updateCollapseAltitude(sprite._altitude);
        }
    });

    // _isBattlerSprite will be checked when sorting battlers z by y-axis
    this.extend(Sprite_Battler, "initialize", function () {
        _this["Sprite_Battler_initialize"].apply(this, arguments);
        this._jumpCount = 0; this._yFluctuation = null;
        this._altitude = 0; this._targetAltitude = 0;
        if (this._battler) {
            this._battler.initFlyingMeta();
        } this._isBattlerSprite = true;
    });

    if (_useBattleCursor) { // Create Battle Select Cursor!

        this.extend(Sprite_Enemy, "setBattler", function () {
            _this["Sprite_Enemy_setBattler"].apply(this, arguments);
            if (this._battler) this._battler.initFlyingMeta();
            if (!this._battleCursorSprite && this._battler) {
                this._battleCursorSprite = new Sprite_BattleCursor(this);
                this.addChild(this._battleCursorSprite);
            }
        });

        this.extend(Sprite_Actor, "setBattler", function (battler) {
            if (!this._battler && battler) battler.initFlyingMeta();
            _this["Sprite_Actor_setBattler"].apply(this, arguments);
            if (!this._battleCursorSprite && this._actor) {
                this._battleCursorSprite = new Sprite_BattleCursor(this);
                this.addChild(this._battleCursorSprite);
            }
        });

    } else {

        this.extend(Sprite_Enemy, "setBattler", function () {
            _this["Sprite_Enemy_setBattler"].apply(this, arguments);
            if (this._battler) this._battler.initFlyingMeta();
        });

        this.extend(Sprite_Actor, "setBattler", function (battler) {
            if (!this._battler && battler) battler.initFlyingMeta();
            _this["Sprite_Actor_setBattler"].apply(this, arguments);
        });

    }

    // New wait mode to support wait(...) command...
    this.extend(Window_BattleLog, "updateWaitMode", function () {
        if (this._waitMode == "OcRam") {
            if (this._waitCount < 1) {
                this._waitMode = ""; return false;
            } return true;
        } return _this["Window_BattleLog_updateWaitMode"].apply(this, arguments);
    });

    // Action sequence <init></init> eval // subject = Game_Actor or Game_Enemy, action = Game_Action
    this.extend(Window_BattleLog, "performActionStart", function (subject, action) {
        BattleManager._tmpSubject = subject;
        BattleManager._tmpAction = action;
        if (action && action._item) {
            const itm = action._item; const id = itm._itemId; let eval_js = "";
            switch (itm._dataClass) {
                case "skill":
                    const skill = $dataSkills[id];
                    if (skill) eval_js = (skill.note + "").getClosedTags("init");
                    if (eval_js == "") eval_js = automatedActionSequence(skill, 0); break;
                case "item":
                    const ditm = $dataItems[id];
                    if (ditm) eval_js = (ditm.note + "").getClosedTags("init");
                    break;
            } if (eval_js != "") this.doActionSequenses(eval_js, subject, action, "init");
        } this.waitForOcRam(_this["Window_BattleLog_performActionStart"], arguments);
    });

    // Action sequence <perform></perform> eval // subject = Game_Actor or Game_Enemy, action = Game_Action
    this.extend(Window_BattleLog, "performAction", function (subject, action) {
        if (action && action._item) {
            const itm = action._item; const id = itm._itemId; let eval_js = "";
            switch (itm._dataClass) {
                case "skill":
                    const skill = $dataSkills[id];
                    if (skill) eval_js = (skill.note + "").getClosedTags("perform");
                    if (eval_js == "") eval_js = automatedActionSequence(skill, 1); break;
                case "item":
                    const ditm = $dataItems[id];
                    if (ditm) eval_js = (ditm.note + "").getClosedTags("perform");
                    break;
            } if (eval_js != "") this.doActionSequenses(eval_js, subject, action, "perform");
        } this._tmpAction = { ...action };
        this.waitForOcRam(_this["Window_BattleLog_performAction"], arguments);
    });

    // Action sequence <finish></finish> eval // subject = Game_Actor or Game_Enemy, action = Game_Action
    this.extend(Window_BattleLog, "performActionEnd", function (subject) {
        const action = this._tmpAction; this._tmpAction = null;
        if (action && action._item) {
            const itm = action._item; const id = itm._itemId; let eval_js = "";
            switch (itm._dataClass) {
                case "skill":
                    const skill = $dataSkills[id];
                    if (skill) eval_js = (skill.note + "").getClosedTags("finish");
                    if (eval_js == "") eval_js = automatedActionSequence(skill, 2); break;
                case "item":
                    const ditm = $dataItems[id];
                    if (ditm) eval_js = (ditm.note + "").getClosedTags("finish");
                    break;
            } if (eval_js != "") this.doActionSequenses(eval_js, subject, action, "finish");
        } this.waitForOcRam(_this["Window_BattleLog_performActionEnd"], arguments);
        BattleManager._actionSequence = false; _ceTarget = null;
        BattleManager._tmpSubject = null; BattleManager._tmpAction = null;
    });

    if (_useBattleIcons) { // If command has an icon do it OcRam way otherwise default to RM style
        this.extend(Window_Command, "drawItem", function (index) {
            if (!$gameParty.inBattle()) {
                _this["Window_Command_drawItem"].apply(this, arguments); return;
            } const ii = this.commandIcon(index);
            if (ii > 0) {
                const rect = this.itemLineRect(index);
                const align = this.itemTextAlign();
                this.resetTextColor();
                this.changePaintOpacity(this.isCommandEnabled(index));
                this.drawIcon(ii, rect.x, rect.y);
                this.drawText(this.commandName(index), rect.x + 32, rect.y, rect.width - 32, align);
                return;
            } _this["Window_Command_drawItem"].apply(this, arguments);
        });
    }

    // Command Window Styles...
    this.extend(Window_ActorCommand, "initialize", function () {
        _this["Window_ActorCommand_initialize"].apply(this, arguments);
        this.setBackgroundType(_commandWindowType);
    }); this.extend(Window_PartyCommand, "initialize", function () {
        _this["Window_PartyCommand_initialize"].apply(this, arguments);
        this.setBackgroundType(_commandWindowType);
    });
    
    // Actor Command Window...
    this.extend(Window_ActorCommand, "makeCommandList", function () {
        if (_showAttack && _showGuard && _showSkill && _showItem) { // Use default cmd list
            _this["Window_ActorCommand_makeCommandList"].apply(this, arguments);
        } else {
            if (this._actor) {
                if (_showAttack) { this.addAttackCommand(); }
                if (_showGuard) { this.addGuardCommand(); }
                if (_showSkill) { this.addSkillCommands(); }
                if (_showItem) { this.addItemCommand(); }
            }
        }
    });

    // For SV enemies!
    this.extend(ImageManager, "loadSvActor", function (filename) {
        if (('' + filename).left(1) == "$") {
            return this.loadSvEnemy(filename);
        } return _this["ImageManager_loadSvActor"].apply(this, arguments);
    });

    // Window styles...
    this.extend(BattleManager, "processEscape", function () {
        $gameMessage.setBackground(_otherBattleWindowType);
        _this["BattleManager_processEscape"].apply(this, arguments);
    }); this.extend(Window_BattleEnemy, "show", function () {
        this.setBackgroundType(_otherBattleWindowType);
        _this["Window_BattleEnemy_show"].apply(this, arguments);
    }); this.extend(Window_BattleSkill, "show", function () {
        this.setBackgroundType(_otherBattleWindowType);
        _this["Window_BattleSkill_show"].apply(this, arguments);
        this._helpWindow.setBackgroundType(_otherBattleWindowType);
    }); this.extend(Window_BattleItem, "show", function () {
        this.setBackgroundType(_otherBattleWindowType);
        _this["Window_BattleItem_show"].apply(this, arguments);
        this._helpWindow.setBackgroundType(_otherBattleWindowType);
    });

    this.extend(Sprite_Actor, "refreshMotion", function () {
        const actor = this._actor;
        if (actor) {
            const stateMotion = actor.stateMotionIndex();
            switch (stateMotion) {
                case 1: // Abnormal
                    if (this._currentStateMotion != stateMotion) {
                        _this.debug("Flying: Abnormal");
                        if (this._mainSprite) {
                            this.width = this._mainSprite.width;
                            this.height = this._mainSprite.height;
                        } this._currentStateMotion = stateMotion;
                        this.refreshFlying();
                    } break;
                case 2: // Sleep
                    if (this._currentStateMotion != stateMotion) {
                        _this.debug("Flying: Sleep");
                        if (this._mainSprite) {
                            this.width = this._mainSprite.width;
                            this.height = this._mainSprite.height;
                        } this._currentStateMotion = stateMotion;
                        this.refreshFlying();
                    } break;
                case 3: // KO
                    if (this._currentStateMotion != stateMotion) {
                        _this.debug("Flying: KO");
                        if (this._mainSprite) {
                            this.width = this._mainSprite.width;
                            this.height = this._mainSprite.height;
                        } this._currentStateMotion = stateMotion;
                        this.refreshFlying();
                    } break;
                default: // Normal
                    if (this._currentStateMotion != stateMotion) {
                        _this.debug("Flying: Normal");
                        if (this._mainSprite) {
                            this.width = this._mainSprite.width;
                            this.height = this._mainSprite.height;
                        } this._currentStateMotion = stateMotion;
                        this.refreshFlying();
                    } break;
            }
        } _this["Sprite_Actor_refreshMotion"].apply(this, arguments);
    });

    this.extend(Sprite_Actor, "initialize", function (battler, is_enemy) {

        if (is_enemy) { // It is actually an enemy with SV char sheet....

            Sprite_Battler.prototype.initialize.call(this, battler);

            //this._actor = battler;
            this._enemy = battler;
            this._svEnemy = true;
            this._motionType = 0;
            this._motionRefresh = true;

            this.setHome(battler.screenX(), battler.screenY());

            if (_MPP_Pseudo3DBattle) {
                this._mirrored = true;
            } else {
                this._mirrored = false;
                this.mirrored = true;
            }

            // OVERWRITES FOR Game_Enemy in case of SV sheet is used...
            this.retreat = () => { };

            this._enemy.performAction = function(action) {
                Game_Battler.prototype.performAction.call(this, action);
                if (action.isAttack()) {
                    this.performAttack();
                } else if (action.isGuard()) {
                    this.requestMotion("guard");
                } else if (action.isMagicSkill()) {
                    this.requestMotion("spell");
                } else if (action.isSkill()) {
                    this.requestMotion("skill");
                } else if (action.isItem()) {
                    this.requestMotion("item");
                }
            };

            this.refreshMotion = () => {
                const actor = this._enemy;
                const motionGuard = Sprite_Actor.MOTIONS['guard'];
                if (actor) {
                    if (this._motion === motionGuard && !BattleManager.isInputting()) return;
                    const stateMotion = actor.stateMotionIndex();
                    switch (stateMotion) {
                        case 1: // Abnormal
                            if (this._currentStateMotion != stateMotion) {
                                _this.debug("Flying: Abnormal");
                                if (this._mainSprite) {
                                    this.width = this._mainSprite.width;
                                    this.height = this._mainSprite.height;
                                } this._currentStateMotion = stateMotion;
                                this.refreshFlying();
                            } break;
                        case 2: // Sleep
                            if (this._currentStateMotion != stateMotion) {
                                _this.debug("Flying: Sleep");
                                if (this._mainSprite) {
                                    this.width = this._mainSprite.width;
                                    this.height = this._mainSprite.height;
                                } this._currentStateMotion = stateMotion;
                                this.refreshFlying();
                            } break;
                        case 3: // KO
                            if (this._currentStateMotion != stateMotion) {
                                _this.debug("Flying: KO");
                                if (this._mainSprite) {
                                    this.width = this._mainSprite.width;
                                    this.height = this._mainSprite.height;
                                } this._currentStateMotion = stateMotion;
                                this.refreshFlying();
                            } break;
                        default: // Normal
                            if (this._currentStateMotion != stateMotion) {
                                _this.debug("Flying: Normal");
                                if (this._mainSprite) {
                                    this.width = this._mainSprite.width;
                                    this.height = this._mainSprite.height;
                                } this._currentStateMotion = stateMotion;
                                this.refreshFlying();
                            } break;
                    }
                    if (actor.isInputting() || actor.isActing()) {
                        this.startMotion("walk");
                    } else if (stateMotion === 3) {
                        this.startMotion("dead");
                    } else if (stateMotion === 2) {
                        this.startMotion("sleep");
                    } else if (actor.isChanting()) {
                        this.startMotion("chant");
                    } else if (actor.isGuard() || actor.isGuardWaiting()) {
                        this.startMotion("guard");
                    } else if (stateMotion === 1) {
                        this.startMotion("abnormal");
                    } else if (actor.isDying()) {
                        this.startMotion("dying");
                    } else if (actor.isUndecided()) {
                        this.startMotion("walk");
                    } else {
                        this.startMotion("wait");
                    }
                }
            };

            this._enemy.performDamage = function () {
                Game_Battler.prototype.performDamage.call(this);
                if (this.isSpriteVisible()) {
                    this.requestMotion("damage");
                } else {
                    $gameScreen.startShake(5, 5, 10);
                }
                SoundManager.playEnemyDamage();
            };

            if (!OcRam.isMZ()) { // In MV it seems that enemies just always 'wait'.. so force _motion.index to 0
                this.updateMotion = function () {
                    this.setupMotion();
                    this.setupWeaponAnimation();
                    if (this._enemy.isMotionRefreshRequested()) {
                        this.refreshMotion();
                        this._enemy.clearMotion();
                    } this.updateMotionCount();
                    if (this._motion.index == 1) this._motion.index = 0;
                };
            }

            this._enemy.performEvasion = function () {
                Game_Battler.prototype.performEvasion.call(this);
                this.requestMotion("evade");
            };

            this._enemy.performMagicEvasion = function () {
                Game_Battler.prototype.performMagicEvasion.call(this);
                this.requestMotion("evade");
            };

            this._enemy.performCollapse = function () {
                Game_Battler.prototype.performCollapse.call(this);
                switch (this.collapseType()) {
                    case 0: SoundManager.playEnemyCollapse(); break;
                    case 1: SoundManager.playBossCollapse1(); break;
                    case 2: break;
                } this.requestMotionRefresh();
            }; return; // Never go further if it's SV enemy...

        }

        // If not SV enemy - Just do what ever Sprite_Actor_initialize does :)
        _this["Sprite_Actor_initialize"].apply(this, arguments);

    });

    this.extend(DataManager, "createGameObjects", function () { // Get widest digit glyph!
        _this["DataManager_createGameObjects"].apply(this, arguments);
        for (let i = 0; i < 10; i++) {
            const tmp = (i + '').width(($gameSystem.mainFontSize() + 4) + "px" + $gameSystem.numberFontFace());
            if (_digitFontWidth < tmp) _digitFontWidth = tmp;
        }
    });

    this.extend(Scene_Battle, "changeInputWindow", function () {
        if (_skipPartyCommand || _disablePartyCommand) { // changeInputWindow overwrite
            this.hideSubInputWindows();
            if (BattleManager.isInputting()) {
                if (BattleManager.actor()) {
                    if (!_disableActorCommand) this.startActorCommandSelection();
                } else {
                    if (this._skippedPCW && !_disablePartyCommand) {
                        this.startPartyCommandSelection();
                    } else {
                        requestAnimationFrame(() => {
                            this.selectNextCommand();
                            this._skippedPCW = true;
                        });
                    }
                }
            } else {
                this.endCommandSelection();
            } return;
        } _this["Scene_Battle_changeInputWindow"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    Scene_Battle.prototype.updateCancelButton = function () {
        if (_disablePartyCommand) {
            if (this._cancelButton) this._cancelButton.visible = false;
        } else {
            if (this._cancelButton && !this._cancelButton.visible) this._cancelButton.visible = true;
        }
    };

    if (_enhancedDamagePopUps) {

        Sprite_Damage.prototype.setup = function (target) { // Overwrite!
            const result = target.result();
            if (result.missed || result.evaded) {
                this._colorType = 0;
                if (result.evaded) {
                    this._flashColor = [64, 64, 255, 160]; // Flash evade/resist
                    this._flashDuration = 60; // Flash evade/resist
                    this._reFlash = true; // Flash evade/resist
                    if (result.physical) {
                        this.runOC_CE("onEvade", target); this.createEvade();
                    } else {
                        this.runOC_CE("onResist", target); this.createResist();
                    }
                } else {
                    this._flashColor = [255, 96, 96, 160]; // Flash miss
                    this._flashDuration = 60; // Flash miss
                    this._reFlash = true; // Flash miss
                    this.runOC_CE("onMiss", target); this.createMiss();
                }
            } else if (result.hpAffected) {
                if (!result.hpDamage) {
                    this._flashColor = [128, 128, 128, 160]; // Flash immune
                    this._flashDuration = 60; // Flash immune
                    this._reFlash = true; // Flash immune
                    this.runOC_CE("onImmune", target); this.createImmune();
                } else {
                    this._colorType = result.hpDamage >= 0 ? 0 : 1;
                    this.createDigits(result.hpDamage);
                }
            } else if (target.isAlive() && result.mpDamage !== 0) {
                this._colorType = result.mpDamage >= 0 ? 2 : 3;
                this.createDigits(result.mpDamage);
            }
            if (result.critical) {
                this.runOC_CE("onCritical", target);
                this.createCritical(); // Show also critical text
                this.setupCriticalEffect();
            }
        };

        Sprite_Damage.prototype.createDigits = function (value) { // Overwrite
            const string = Math.abs(value).toString();
            const h = this.fontSize();
            const ow = Math.floor(h * 0.75);
            const w = (_digitFontWidth + this.outlineWidth() * 2) + _battleDigitSpacing;
            for (let i = 0; i < string.length; i++) {
                const sprite = this.createChildSprite(ow, h * 2); // Reserve height for crits...
                sprite.bitmap.drawText(string[i], 0, 0, ow, h, "center");
                sprite.x = (i - (string.length - 1) / 2) * w;
                sprite.dy = -i;
            }
        };

        Sprite_Damage.prototype.updateFlash = function () { // Overwrite
            if (this._flashDuration > 0) {
                const d = this._flashDuration--;
                this._flashColor[3] *= (d - 1) / d;
            } else if (this._reFlash) { // Re-flash
                this.setupCriticalEffect();
            }
        };

        Sprite_Damage.prototype.updateOpacity = function () { // Overwrite
            if (this._duration < 20) { // More time for fade
                this.opacity = (255 * this._duration) / 20;
            }
        };

        Sprite_Damage.prototype.createBattleText = function (text, color_index, y_offset) { // NEW
            const h = this.fontSize();
            const w = Math.floor(h * 3.0);
            const sprite = this.createChildSprite(w, h);
            this._colorType = (color_index | 0) || 0;
            sprite.bitmap.drawText(text, 0, 0, w, h, "center");
            sprite.dy = (y_offset | 0) || 0;
        };

        Sprite_Damage.prototype.createMiss = function () { // Overwrite
            this.createBattleText(_battleMissText);
        };

        Sprite_Damage.prototype.createEvade = function () { // NEW - When Physical Evades
            this.createBattleText(_battleEvadeText, 1);
        };

        Sprite_Damage.prototype.createResist = function () { // NEW - When Magic Evade
            this.createBattleText(_battleResistText, 1);
        };

        Sprite_Damage.prototype.createImmune = function () { // NEW - When 0 HP damage
            this.createBattleText(_battleImmuneText, 2);
        };

        Sprite_Damage.prototype.createCritical = function () { // NEW - When critical
            this.createBattleText(_battleCriticalText, 10, -10);
        };

        this.extend(Sprite_Damage, "setupCriticalEffect", function () {
            _this["Sprite_Damage_setupCriticalEffect"].apply(this, arguments);
            this._reFlash = true; // Enable re-flashing!
        });

        this.extend(Sprite_Damage, "update", function () {
            _this["Sprite_Damage_update"].apply(this, arguments); this.y--; // Scroll up
        });

        this.extend(Sprite_Damage, "initialize", function () { // Damage popup duration
            _this["Sprite_Damage_initialize"].apply(this, arguments);
            this._duration = 120; this._isDamage = true;
        });

    } else {
        this.extend(Sprite_Damage, "initialize", function () { // Damage popup for default damage popups
            _this["Sprite_Damage_initialize"].apply(this, arguments); this._isDamage = true;
        });
    }


    if (_showAllPopupsAtOnce) {

        Window_BattleLog.prototype.isFastForward = () => false;

        // Invoke all at the same time...
        BattleManager.updateAction = function () {
            requestAnimationFrame(() => {
                if (this.updateActionDelayed()) this.updateAction();
            });
        };

        BattleManager.updateActionDelayed = function () {
            const target = this._targets.shift();
            if (target) {
                this.invokeAction(this._subject, target);
            } else {
                this.endAction();
            } return target;
        };

        // Insta execute all...
        Window_BattleLog.prototype.displayActionResults = function (subject, target) { // Overwrite
            if (target.result().used) {
                this.pushBaseLine();
                this.displayCritical(target);
                this.popupDamage(target);
                this.popupDamage(subject);
                this.displayDamage(target);
                this.displayAffectedStatus(target);
                this.displayFailure(target);
                this.waitForNewLine();
                this.popBaseLine();
            }
        };

        // Insta execute damage
        Window_BattleLog.prototype.displayHpDamage = function (target) {
            if (target.result().hpAffected) {
                if (target.result().hpDamage > 0 && !target.result().drain) {
                    this.performDamage(target); //this.push("performDamage", target);
                }
                if (target.result().hpDamage < 0) {
                    this.performRecovery(target); //this.push("performRecovery", target);
                }
                this.addText(this.makeHpDamageText(target)); //this.push("addText", this.makeHpDamageText(target));
            }
        };

        // Insta execute collapse
        Window_BattleLog.prototype.displayAddedStates = function (target) {
            const result = target.result();
            const states = result.addedStateObjects();
            for (const state of states) {
                const stateText = target.isActor() ? state.message1 : state.message2;
                if (state.id === target.deathStateId()) {
                    this.performCollapse(target); //this.push("performCollapse", target);
                }
                if (stateText) {
                    this.push("popBaseLine");
                    this.push("pushBaseLine");
                    this.push("addText", stateText.format(target.name()));
                    this.push("waitForEffect");
                }
            }
        };

    }

    if (_skipEmergedMessage) { // displayStartMessages overwrite
        BattleManager.displayStartMessages = function () {
            if (this._preemptive) {
                $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
            } else if (this._surprise) {
                $gameMessage.add(TextManager.surprise.format($gameParty.name()));
            }
        };
    }

    Sprite_Actor.prototype.setActorHome = function (index) {
        if (this._enemy) return;
        const w = Graphics.width * _battlersXMultiplier - 220;
        const rstep = (_battlefieldBottom - _battlefieldTop) * 0.33;
        const col = Math.ceil((index + 1) / 4);
        const offset_x = w + ((index % 4) * 32) + (col * 96);
        const offset_y = Graphics.height * (_battlefieldTop + rstep * (index % 4));
        this.setHome(offset_x, offset_y);
    };

    Spriteset_Battle.prototype.createEnemies = function () {
        const enemies = $gameTroop.members();
        const sprites = [];
        for (const enemy of enemies) {
            if (('' + enemy.battlerName()).left(1) == "$") {
                sprites.push(new Sprite_Actor(enemy, true));
            } else {
                sprites.push(new Sprite_Enemy(enemy));
            }
        }
        sprites.sort(this.compareEnemySprite.bind(this));
        for (const sprite of sprites) {
            this._battleField.addChild(sprite);
        }
        this._enemySprites = sprites;
    };

    Sprite_Actor.prototype.damageOffsetX = () => 0;
    Sprite_Actor.prototype.damageOffsetY = () => 0;

    if (_confirmAllScopes) {

        Game_Action.prototype.needsSelection = function () {
            /* 0 = None
             * 1 = Enemy, One
             * 2 = Enemy, All
             * 3 = Enemy, 1 Random
             * 4 = Enemy, 2 Random
             * 5 = Enemy, 3 Random
             * 6 = Enemy, 4 Random
             * 7 = Ally, 1, Alive
             * 8 = Ally, All, Alive
             * 9 = Ally, 1, Dead
             * 10 = Ally, All, Dead
             * 11 = User
             * 12 = Ally, 1, Unconditional
             * 13 = Ally, All, Unconditional
             * 14 = All Enemies & Allies
             */ return this.item().scope != 0;
        };

        Window_BattleActor.prototype.select = function (index) {

            const undecided_action = BattleManager._currentActor ? BattleManager._currentActor._actions[0] : null; if (!undecided_action) return;
            const skill = BattleManager._currentActor._actions[0]._item._dataClass == "item" ? $dataItems[undecided_action._item._itemId] : $dataSkills[undecided_action._item._itemId];

            if (skill) {
                switch (skill.scope) { // Ally, All
                    case 8: case 10: case 13:
                        Window_BattleStatus.prototype.select.call(this, OcRam.isMZ() ? -1 : BattleManager._actorIndex);
                        $gameParty.select(this.actor(index), true); return; break;
                    case 11: // User
                        Window_BattleStatus.prototype.select.call(this, OcRam.isMZ() ? -1 : BattleManager._actorIndex);
                        $gameParty.select(BattleManager._currentActor); return; break;
                    case 14:
                        $gameParty.select(BattleManager._currentActor, true);
                        $gameTroop.select(BattleManager._targets[0], true); return; break;
                }
            }

            Window_BattleStatus.prototype.select.call(this, index);
            $gameParty.select(this.actor(index));

        };

        Window_BattleEnemy.prototype.select = function (index) {

            const undecided_acton = BattleManager._currentActor ? BattleManager._currentActor._actions[0] : null;
            const skill = undecided_acton ? $dataSkills[undecided_acton._item._itemId] : null;
            if (skill) {
                switch (skill.scope) { // Enemy, All
                    case 2: case 3: case 4: case 5: case 6:
                        Window_Selectable.prototype.select.call(this, OcRam.isMZ() ? -1 : 0);
                        $gameTroop.select(this.enemy(), true); return; break;
                    case 14:
                        $gameParty.select(BattleManager._currentActor, true);
                        $gameTroop.select(this.enemy(), true); return; break;
                }
            }

            Window_Selectable.prototype.select.call(this, index);
            $gameTroop.select(this.enemy());

        };

        this.extend(Game_Unit, "select", function (activeMember, select_all) {
            if (select_all) {
                for (const member of this.members()) member.select(); return;
            } _this["Game_Unit_select"].apply(this, arguments);
        });

        // Hide Troops AND Actors (in case ALL scope is used...)
        Window_BattleActor.prototype.hide = function () {
            Window_BattleStatus.prototype.hide.call(this);
            $gameParty.select(null); $gameTroop.select(null);
        }; Window_BattleEnemy.prototype.hide = function () {
            Window_Selectable.prototype.hide.call(this);
            $gameTroop.select(null); $gameParty.select(null);
        };

    }

    BattleManager.applySubstitute = function (target) {

        _substituteBattler = null;

        const substitute = target.friendsUnit().substituteBattler();

        if (!substitute || target === substitute) return target;
        if (!_substituteType) _substituteBattler = substitute;

        let substitute_evals = "";
        substitute._states.forEach(s => {
            _subtituteStates.forEach(ss => {
                if (ss == s) {
                    substitute_evals += getMetaTag($dataStates[s].note, "substitute") + "\n";
                }
            });
        }); const this_behaviour = substitute_evals || "target.isDying() && !this._action.isCertainHit(); ";
        _this.debug("All substitute evals:", this_behaviour, "vs.", substitute_evals);

        if (this_behaviour != "" && eval(this_behaviour)) {
            substitute.moveToSubstitute(target); // Substitute also visually
            this._logWindow.displaySubstitute(substitute, target);
            return substitute;
        } return target;

    };

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { };

    this.loadPluginData = gs => {
        _disablePartyCommand = gs._disablePartyCommand;
        _showAttack = gs._showAttack;
        _showGuard = gs._showGuard;
        _showSkill = gs._showSkill;
        _showItem = gs._showItem;
    };

    this.savePluginData = gs => {
        gs._disablePartyCommand = _disablePartyCommand;
        gs._showAttack = _showAttack;
        gs._showGuard = _showGuard;
        gs._showSkill = _showSkill;
        gs._showItem = _showItem;
    };

    this.onMapStart = sm => {
        if (_subtituteStates.length < 1) {
            $dataStates.forEach(s => {
                if (s && s.traits && s.traits.find(t => t.code == 62 && t.dataId == 2)) {
                    _subtituteStates.push(s.id);
                }
            }); if (_subtituteStates.length < 1) _subtituteStates.push(-1);
        }
    };

    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = sm => {
        $dataSystem.skillTypes.forEach(itm => {
            _skillIconTerms.push(itm);
        });
        _skillIconTerms.push(TextManager.attack);
        _skillIconTerms.push(TextManager.guard);
        _skillIconTerms.push(TextManager.item);
        _skillIconTerms.push(TextManager.fight);
        _skillIconTerms.push(TextManager.escape);
    };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "battleCommand", function (args) {
        _this.debug("Plugin command: battleCommand", args);
        _disablePartyCommand = !OcRam.getBoolean(args.enabled);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "actorCommand", function (args) {
        _this.debug("Plugin command: actorCommand", args);
        switch (Number(args.command)) {
            case 0: _showAttack = OcRam.getBoolean(args.enabled); break;
            case 1: _showGuard = OcRam.getBoolean(args.enabled); break;
            case 2: _showItem = OcRam.getBoolean(args.enabled); break;
            case 3: _showSkill = OcRam.getBoolean(args.enabled); break;
        }
    });

}.bind(OcRam.Battle_Core)());
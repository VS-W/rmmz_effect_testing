//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Lights.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.15) alert("OcRam core v1.15 or greater is required!");

OcRam.addPlugin("Lights", "1.13");

/*:
 * @target MZ
 * @plugindesc v1.13 You may use JavaScript, event comments or plugin commands to control different type of light sources.
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Time_System
 * @orderBefore OcRam_Local_Coop
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command lightBG
 * @text Light layer BG
 * @desc Light layer BG / tint.
 *
 * @arg color
 * @type text
 * @default #ffffffff
 * @text BG color
 * @desc Color is given in hexadecimal RGBA format.
 *
 * @arg fadeTime
 * @type number
 * @decimals 0
 * @min 0
 * @max 120
 * @default 0
 * @text Fade time
 * @desc How long does it take to get to the target color?
 *
 * @command lightPlayer
 * @text Player light
 * @desc Light source for the player.
 *
 * @arg lightData
 * @type struct<LightData>
 * @default {"LightType":"1","Radius":"300","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.000"}
 * @text Light data
 * @desc Light source for the player.
 *
 * @command lightFollower
 * @text Follower light
 * @desc Light source for the follower(s).
 *
 * @arg followerIndex
 * @type number
 * @decimals 0
 * @min 0
 * @max 3
 * @default 0
 * @text Follower index
 * @desc Which follower to light up? 0 = All
 *
 * @arg lightData
 * @type struct<LightData>
 * @default {"LightType":"1","Radius":"300","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.000"}
 * @text Light data
 * @desc Light source for the follower(s).
 *
 * @command lightEventById
 * @text Light event by id
 * @desc Create light to event by given id.
 *
 * @arg eventId
 * @type number
 * @decimals 0
 * @min 0
 * @default 0
 * @text Event Id
 * @desc Which event to light up? 0 = This event
 *
 * @arg lightData
 * @type struct<LightData>
 * @default {"LightType":"1","Radius":"300","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.000"}
 * @text Light data
 * @desc Light source for the event.
 *
 * @command lightEventsByName
 * @text Light events by name
 * @desc Create lights to all events by given name.
 *
 * @arg eventName
 * @type text
 * @default MyEvent
 * @text Event name
 * @desc Which events to light up?
 *
 * @arg lightData
 * @type struct<LightData>
 * @default {"LightType":"1","Radius":"300","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.000"}
 * @text Light data
 * @desc Light source for the events.
 * 
 * @command lightBattle
 * @text Battle light
 * @desc Light source for the battles.
 *
 * @arg lightData
 * @type struct<LightData>
 * @default {"LightType":"1","Radius":"300","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.000"}
 * @text Light data
 * @desc Light source for the battles. (right light source will be inverted)
 *
 * @command lightEnemy
 * @text Enemy light
 * @desc Light source for the enemies in battles.
 *
 * @arg lightData
 * @type struct<LightData>
 * @default {"LightType":"1","Radius":"300","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.000"}
 * @text Light data
 * @desc Light source for the enemies in battles. (overrides map event light data)
 * 
 * @command lightTerrain
 * @text Terrain light
 * @desc Light source for the specified terrain tag.
 *
 * @arg tagId
 * @type number
 * @decimals 0
 * @min 1
 * @max 7
 * @default 1
 * @text Terrain tag id
 * @desc Which terrain tag light source we edit?
 *
 * @arg lightData
 * @type struct<LightData>
 * @default {"LightType":"1","Radius":"300","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.000"}
 * @text Light data
 * @desc Light source for the specified terrain tag. NOTE: EX-PARAMS WON'T BE APPLIED!
 *
 * @arg updateType
 * @type select
 * @option Shared (whole region)
 * @value 0
 * @option Individual (Random)
 * @value 1
 * @default 0
 * @text Update type
 * @desc Update type for terrain light (fire/flicker are based on random so all are same except 'Shared').
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Use OcRam_Local_Coop
 * @type boolean
 * @desc https://ocram-codes.net/plugins.aspx?engine=mz
 * @default true
 *
 * @param Use P1 light for P2-P4
 * @parent Use OcRam_Local_Coop
 * @type boolean
 * @desc Use player 1 light source for all players.
 * @default true
 *
 * @param Use OcRam_Time_System
 * @type boolean
 * @desc https://ocram-codes.net/plugins.aspx?engine=mz
 * @default true
 *
 * @param Use ALSO TS tinting
 * @parent Use OcRam_Time_System
 * @type boolean
 * @desc Use ALSO time system built-in auto tinting?
 * @default false
 *
 * @param Night BG color
 * @parent Use OcRam_Time_System
 * @type text
 * @desc Background color for night.
 * @default #303040ff
 *
 * @param Dawn BG color
 * @parent Use OcRam_Time_System
 * @type text
 * @desc Background color for dawn.
 * @default #ffaa80ff
 *
 * @param Day BG color
 * @parent Use OcRam_Time_System
 * @type text
 * @desc Background color for day.
 * @default #ffffffff
 *
 * @param Dusk BG color
 * @parent Use OcRam_Time_System
 * @type text
 * @desc Background color for dusk.
 * @default #ffaa80ff
 *
 * @param Use tint indoors
 * @parent Use OcRam_Time_System
 * @type boolean
 * @desc Use day phase tint also in <indoors> maps
 * @default false
 *
 * @param Indoors night
 * @parent Use tint indoors
 * @type text
 * @desc Indoors background color for night.
 * @default #303040ff
 *
 * @param Indoors dawn
 * @parent Use tint indoors
 * @type text
 * @desc Indoors background color for dawn.
 * @default #ffaa80ff
 *
 * @param Indoors day
 * @parent Use tint indoors
 * @type text
 * @desc Indoors background color for day.
 * @default #ffffffff
 *
 * @param Indoors dusk
 * @parent Use tint indoors
 * @type text
 * @desc Indoors background color for dusk.
 * @default #ffaa80ff
 * 
 * @param Other settings
 * @desc This parameter is just for grouping
 *
 * @param Battle light data
 * @parent Other settings
 * @type struct<LightData>
 * @desc Light source for battle lights
 * @default {"LightType":"1","Radius":"400","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0"}
 *
 * @param Player light data
 * @parent Other settings
 * @type struct<LightData>
 * @desc Default light source for player.
 * @default {"LightType":"1","Radius":"400","Color":"#ffea00ff","OffsetX":"0","OffsetY":"0","Degrees":"360","Angle":"0","Rotation":"0","StartAt":"0.1"}
 * 
 * @param Flashlight up fix value
 * @parent Other settings
 * @type number
 * @desc When player light source is cone aka. flashlight. Adjust Y value if player faces up.
 * @default 12
 *
 * @param Viewbox margin
 * @parent Other settings
 * @type number
 * @min 0
 * @max 1024
 * @desc Margin for lights viewbox (used to fill areas caused by 'shake screen')
 * @default 64
 * 
 * @param Lights kill switchId
 * @parent Other settings
 * @type switch
 * @desc Kill switch id. If this switch is ON ALL lights are OFF
 * @default 6
 *
 * @param Battle tint
 * @parent Other settings
 * @type select
 * @option OcRam_Lights (default)
 * @value 0
 * @option "Vanilla" tint only
 * @value 1
 * @option No tint at all
 * @value 2
 * @desc Battle scene tint mode.
 * @default 0
 *
 * @param Force center player light
 * @parent Other settings
 * @type boolean
 * @desc To be used with MZ/MV3D plugins for example. Forces player light ALWAYS to center of the screen.
 * @default false
 *
 * @param Debug mode
 * @parent Other settings
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * This plugin will add 1 layer for light sources. You may use event comments
 * or plugin commands to control different type of light sources.
 *
 * Light data for characters, terrain and events are carried over save/load.
 * Example if you change light source via plugin command it will be saved
 * on game save and when loaded light data will persist!
 *
 * NOTE: If you use OcRam_Local_Coop/OcRam_Time_System make sure they are
 * up-to-date and imported BEFORE OcRam_Lights -plugin.
 *
 * If OcRam_Time_System is in use: "light_bg" plugin command will override any
 * time bound auto tinting until next time player is transferred.
 *
 * ----------------------------------------------------------------------------
 * Event comments
 * ============================================================================
 * *Comment* <light:type:radius:color>
 * *Comment* <light-ex:x,y:degrees:angle:rotation:startAt>
 *
 * Example for 'fire' put following comment to active page:
 * *Comment* <light:5:300:#ffdd00ff:360>
 * 
 * Example light source with 60 degree cone, offset 2 tiles up, start angle 
 * 45deg and is rotating slowly: *Comment* <light-ex:0,-96:60:45:1>
 *
 * NOTE: Event may have SEVERAL light sources and each <light...> comment
 * should be followed by <light-ex...> comment! IF plugin command is used to 
 * this event, it will override multiple light sources created via event 
 * comments! Each event PAGE may include individual light source.
 * 
 * MULTIPLE LIGHT SOURCES WORKS ONLY FOR EVENTS!
 * 
 * EXAMPLE ON MULTIPLE EVENT COMMENTING (with static and cycling color):
 * *Comment* <light:1:300:[60,#ff0000,#00ff00,#0000ff]>
 * *Comment* <light-ex:0,0:45:0:0:0>
 * *Comment* <light:1:300:#ffffff>
 * *Comment* <light-ex:0,0:45:180:0:0>
 * 
 * NOTE2: Ex-parameters will be applied on base light source so you may have
 * for example flickering/strobo or pulsating rotating flash light effect!
 * 
 * ALL COLOR PARAMETERS CAN BE REPLACED WITH COLOR CYCLES!:
 *  Syntax for color cycle is [fade,color1,color2,etc...]
 *  fade is given as frames between 2 colors
 *
 *     Example for 120 frames cycling red-green-blue event comment:
 *     *Comment* <light:1:400:[120,#ff0000,#00ff00,#0000ff]>
 *
 *     Example for 60 frames cycling red-blue plugin command:
 *     *Plugin Command* light_player 1 300 [60,#ff0000,#0000ff]
 *
 * Following types are possible
 *   0 = Light OFF
 *   1 = Fixed (like normal LED)
 *   2 = Flickering little (like little broken light) 90% on / 10% off
 *   3 = Flickering (like almost broken light) 50% on / 50% off
 *   4 = Flickering a lot (like realy broken light) 10% on / 90% off
 *   5 = Fire
 *   6 = Strobo
 *   7 = Pulsating fast
 *   8 = Pulsating
 *   9 = Pulsating slow
 * 
 * ----------------------------------------------------------------------------
 * Tileset meta tags for terrain light default values (in TILESET note field)
 * NOTE: You do not NEED to setup default values if plugin cmds are used
 * ============================================================================
 * Example for terrain tag 1: <light1:1:48:#ffffff:0>
 * ...
 * Example for terrain tag 7: <light7:1:48:#ffffff:1>
 * Last parameter is terrain light update type:
 *      0 = Shared (All lights with this tag share same update cycle)
 *      1 = Individual (Psychedelic random)
 *
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * Light Types:
 *     0 = Light OFF
 *     1 = Fixed (like normal LED)
 *     2 = Flickering little (like little broken light) 90% on / 10% off
 *     3 = Flickering (like almost broken light) 50% on / 50% off
 *     4 = Flickering a lot (like realy broken light) 10% on / 90% off
 *     5 = Fire
 *     6 = Strobo
 *     7 = Pulsating fast
 *     8 = Pulsating
 *     9 = Pulsating slow
 *   
 * LIGHT_DATA:
 *  {
 *      "LightType":"1",
 *      "Radius":"300",
 *      "Color":"#ffea00ff",
 *      "OffsetX":"0",
 *      "OffsetY":"0",
 *      "Degrees":"360",
 *      "Angle":"0",
 *      "Rotation":"0",
 *      "StartAt":"0.000"
 *  }
 * 
 * MV example: OcRam_Lights/lightBG #404080ff 4
 * lightBG              To set light layer background color
 * >> color             Color is given in hexadecimal RGBA format.
 * >> fadeTime          How long does it take to get to the target color?
 * 
 * MV example: OcRam_Lights/lightPlayer LIGHT_DATA
 * lightPlayer          Set player light
 * >> lightData         See "Light data"
 * 
 * MV example: OcRam_Lights/lightFollower 0 LIGHT_DATA
 * lightFollower        Set follower light
 * >> followerIndex     Which follower to light up? 0 = All
 * >> lightData         See "Light data"
 * 
 * MV example: OcRam_Lights/lightEventById 1 LIGHT_DATA
 * lightEventById       Set event light by id
 * >> eventId           Which event to light up? 0 = This event
 * >> lightData         See "Light data"
 * 
 * MV example: OcRam_Lights/lightEventsByName Torch LIGHT_DATA
 * lightEventsByName    Set event lights by name
 * >> eventName         Which events to light up?
 * >> lightData         See "Light data"
 * 
 * MV example: OcRam_Lights/lightBattle LIGHT_DATA
 * lightBattle          Set battle lights
 * >> lightData         See "Light data"
 * 
 * MV example: OcRam_Lights/lightEnemy LIGHT_DATA
 * lightEnemy           Set enemy battle lights
 * >> lightData         See "Light data"
 * 
 * MV example: OcRam_Lights/lightTerrain 3 LIGHT_DATA 1
 * lightTerrain         Set light for desired terrain tag
 * >> tagId             Which terrain tag light source we edit? 1 to 7
 * >> lightData         See "Light data"
 * >> updateType        0 = Shared (whole region), 1 = Individual (Random)
 * 
 * ----------------------------------------------------------------------------
 * JavaScript commands
 * ============================================================================
 * Player and follower objects will have getEventsInLightRadius() -function
 * To use this function, below is example how to iterate results:
 * $gamePlayer.getEventsInLightRadius().forEach(function(a) {...});
 * 
 * Game event objects will have getObjectsInLightRadius() (returns array) and 
 * isPlayerInLightRadius() (returns boolean) -functions
 * 
 * EVENT SCOPE: 
 * this.event().isPlayerInLightRadius();
 * this.event().getObjectsInLightRadius().forEach(function(a) {...});
 * 
 * GENERIC SCOPE: 
 * $gameMap.events()[x].isPlayerInLightRadius();
 * $gameMap.events()[x].getObjectsInLightRadius().forEach(function(a) {...});
 * 
 * NOTE: isPlayerInLightRadius() will also check if follower is in radius!
 * 
 * Create lights via JS (player, events, etc...) (overwrites all lightdata):
 * OcRam.Lights.createLight($gamePlayer, 1, "#ffffffff", 300, ex_params);
 * 
 * JS to ADD new light source to EVENT (Other lights will be preserved):
 * this.event().addLight(1, "#ffffffff", 300, ex_params);
 * 
 * * ex_params = {offset: [0, 0], degrees: 0, angle: 0, rotation: 0};
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
 * 2020/09/03 v1.00 - Initial release for v1.00
 * 2020/09/05 v1.01 - Uses now core v1.01 <indoors> check (Credits to blade911)
 * 2020/09/19 v1.02 - Terrain lights are now properly initialized
 * 2020/09/29 v1.03 - Battle lights plugin command works now properly
 * 2020/10/25 v1.04 - Compatibility patch for OcRam_Followers
 * 2020/11/30 v1.05 - playerInLightRadius now has possibility to give player
 *                    region id array to return always false and
 *                    Game_Character._stealthMode to avoid playerInRadius.
 *                    + $gameParty.setStealthMode(bool)
 *                    Compatibility patch for VisuMZ_1_EventsMoveCore
 *                    (spawn new events - Credits to poorrabit)
 * 2021/03/07 v1.06 - WARNING: This patch may NOT be 100% backward compatible!
 *                    (if JS has been used to edit light layer directly etc...)
 *                    playerInLightRadius is now aware of passability and it's
 *                    parameter 'region_id_array' replaced by 'xray' mode!
 *                    Added new JS OcRam.Lights.forceDayPhase() to force
 *                    dayphase autotint (Credits to OpenTanget)
 *                    Optimized light refreshing methods!
 *                    >> Compositing done directly to light layer without 
 *                       removing/adding child + sprite each frame!
 *                    >> Optimized lights culling + events are now culled
 *                       (specially BIG maps will run MUCH smoother!)
 *                    >> Optimized terrain lights (light-ex params are 
 *                       stripped-off + has dedicated update method)!
 *                    New feature: Terrain light update type:
 *                    Shared, Individual (randomized)
 *                    Now favors < 181 degree lights more than 181-359 degree
 *                    lights (360 degrees is still default)
 *                    Multiple colors now accepts more than 3 colors.
 *                    NEW JS to ADD lights to EVENT: ev.addLight(...)
 *                    Indoors tint parameters 4x (used with indoors auto tint)
 *                    (Credits to Moon_Haven)
 * 2021/04/02 v1.07 - Occasional "forEach of null" bug has been fixed.
 *                    Game_Character.isLit() // Character has lights on?
 *                    Tint bug with Time_System after load fixed!
 * 2021/06/04 v1.08 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Light BG re-tint after load bug fixed!
 *                    Light type 0 won't crash save files no longer
 *                    (Credits to Gurkengelee)
 * 2021/09/15 v1.09 - Battler lights! + MPP_Pseudo3DBattle support!
 *                    PIXI.Container is no longer used - using only PIXI.Sprite
 *                    as light layer (1 "layer" less stuff).
 *                    event.getObjectsInLightRadius and isPlayerInLightRadius
 *                    now works as intended! (Credits to Zaphitos)
 * 2021/10/21 v1.10 - Plugin meta data (order/base) is now editor compatible!
 * 2021/12/01 v1.11 - Map lights & battle lights are now public layers in
 *                    scene spriteset (to allow fireflies above light layer)!
 *                    Fixed bug where terrain lights plugin commands weren't
 *                    cleared after new game or load.
 * 2022/01/23 v1.12 - Seamless map transfer tinting with OcRam_Map_Transfer!
 *                    Support for <parallax> tagged events (Requires
 *                    OcRam_Events plugin) (Credits to Gabezin)
 *                    No more follower lights while in vehicle!
 *                    New plugin parameter "Battle tint" (Credits: jedite1000)
 * 2022/07/10 v1.13 - isPlayerInLightRadius uses floor instead of ceil when
 *                    calculating radius to get more precise results.
 *                    (Credits to David_Ribeiro)
 *                    New plugin parameter "Force center player light"
 *                    (Credits to SloppyJoeStudios)
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * - No overrides -
 */
/*~struct~LightData:
 *
 * @param LightType
 * @type select
 * @option None
 * @value 0
 * @option Normal
 * @value 1
 * @option Flicker little
 * @value 2
 * @option Flicker
 * @value 3
 * @option Flicker a lot
 * @value 4
 * @option Fire
 * @value 5
 * @option Strobo
 * @value 6
 * @option Pulsating slow
 * @value 7
 * @option Pulsating
 * @value 8
 * @option Pulsating fast
 * @value 9
 * @desc Light type for this light source.
 * @default 1
 *
 * @param Radius
 * @type number
 * @decimals 0
 * @min 48
 * @max 1000
 * @desc Radius in pixels.
 *
 * @param Color
 * @type text
 * @desc Color as #rrggbbaa. Example: #ffffffff or array (item 0 = transition time) [60,#ff0000ff,#0000ffff,etc...]
 * @default #ffffffff
 * 
 * @param OffsetX
 * @type number
 * @decimals 0
 * @min -1000
 * @max 1000
 * @desc Light source x-offset.
 * @default 0
 * 
 * @param OffsetY
 * @type number
 * @decimals 0
 * @min -1000
 * @max 1000
 * @desc Light source y-offset.
 * @default 0
 * 
 * @param Degrees
 * @type number
 * @decimals 0
 * @min 1
 * @max 360
 * @desc Light source cone degrees (360 = full circle, 180 = half circle).
 * @default 360
 * 
 * @param Angle
 * @type number
 * @decimals 0
 * @min 0
 * @max 360
 * @desc Light source fixed angle (or start angle if rotated).
 * @default 0
 * 
 * @param Rotation
 * @type number
 * @decimals 3
 * @min 0
 * @max 1000
 * @desc Rotation degrees per frame.
 * @default 0.000
 * 
 * @param StartAt
 * @type number
 * @decimals 3
 * @min 0
 * @max 1
 * @desc Start light gradient position. Example 0.2 would start light gradient 20% from epicenter.
 * @default 0.000
 * 
 * @
~*/ // End of structs

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    OcRam.Map_Transfer = {};
    OcRam.Map_Transfer.isTransfering = () => false;

    // Player default light
    let _playerLightData = JSON.parse(this.parameters['Player light data']);
    let _playerLightType = Number(_playerLightData.LightType) || 0;
    let _playerLightRadius = Number(_playerLightData.Radius) || 0;
    let _playerLightColor = _playerLightData.Color || '#ffffffff';
    let _playerLightExParams = { offset: [_playerLightData.OffsetX, _playerLightData.OffsetY], degrees: _playerLightData.Degrees, angle: _playerLightData.Angle, rotation: _playerLightData.Rotation, startAt: _playerLightData.StartAt };
    let _followerLightExParams = [_playerLightExParams, _playerLightExParams, _playerLightExParams];
    let _flashLightUpFixValue = Number(this.parameters['Flashlight up fix value']) || 0;

    // OcRam_Local_Coop
    let _useLocalCoop = OcRam.getBoolean(this.parameters['Use OcRam_Local_Coop']);
    const _useP1LightForAll = OcRam.getBoolean(this.parameters['Use P1 light for P2-P4']);

    // OcRam_Time_System
    let _useTimeSystem = OcRam.getBoolean(this.parameters['Use OcRam_Time_System']);
    const _useAutoTint = OcRam.getBoolean(this.parameters['Use ALSO TS tinting']);
    const _forceCenterPlayerLight = OcRam.getBoolean(this.parameters['Force center player light']);
    const _nightBGColor = OcRam.regulateHexRGBA(this.parameters['Night BG color'] || '#303040ff');
    const _dawnBGColor = OcRam.regulateHexRGBA(this.parameters['Dawn BG color'] || '#ffaa80ff');
    const _dayBGColor = OcRam.regulateHexRGBA(this.parameters['Day BG color'] || '#ffffffff');
    const _duskBGColor = OcRam.regulateHexRGBA(this.parameters['Dusk BG color'] || '#ffaa80ff');
    const _useTintIndoors = OcRam.getBoolean(this.parameters['Use tint indoors']);
    const _tintNightIndoors = OcRam.regulateHexRGBA(this.parameters['Indoors night'] || '#303040ff');
    const _tintDawnIndoors = OcRam.regulateHexRGBA(this.parameters['Indoors dawn'] || '#ffaa80ff');
    const _tintDayIndoors = OcRam.regulateHexRGBA(this.parameters['Indoors day'] || '#ffffffff');
    const _tintDuskIndoors = OcRam.regulateHexRGBA(this.parameters['Indoors dusk'] || '#ffaa80ff');
    const _battleTint = Number(this.parameters['Battle tint'] || 0);

    // Generic options
    let _battleLightData = JSON.parse(this.parameters['Battle light data']);
    let _battleLightExParams = { offset: [_battleLightData.OffsetX, _battleLightData.OffsetY], degrees: _battleLightData.Degrees, angle: _battleLightData.Angle, rotation: _battleLightData.Rotation, startAt: OcRam.getFloat(_battleLightData.StartAt) };
    const _margin = Number(this.parameters['Viewbox margin']) || 64;
    const _killSwitchId = Number(this.parameters['Lights kill switchId']) || 0; let _prevDayPhase = -1;

    // For faster memory access...
    let _mapLights = null; let _battleLights = null;
    let _terrainLightSources = []; let _pluginCmdNotations = [null, null, null, null, null, null, null]; let _tileMapNotations = [];
    let _terrainLightExParams = { offset: [0, 0], degrees: 0, angle: 0, rotation: 0, startAt: 0 };

    let _lightScreenXFunc = Game_CharacterBase.prototype.screenX_OC;
    let _lightScreenYFunc = function () {
        return ($gameMap.adjustY_OC(this._realY) * OcRam.twh[1] + OcRam.twh50[1]) | 0;
    };

    if (_useTimeSystem) {
        if (!Imported.OcRam_Time_System) {
            this.debug("OcRam_Time_System must be declared BEFORE OcRam_Lights!", "Can't use time system!"); _useTimeSystem = false;
        } else {
            if (parseFloat(OcRam.Time_System.version) < 1.00) {
                this.debug("OcRam_Time_System must be at least v1.00!", "Can't use time system!"); _useTimeSystem = false;
            }
        } if (_useTimeSystem) {
            this.debug("OcRam_Time_System", "Loaded successfully!"); OcRam.Time_System._useAutoTint = _useAutoTint;
            this.debug("_dayPhaseVarId=" + OcRam.Time_System._dayPhaseVarId, "_effectTransitionTime=" + OcRam.Time_System._effectTransitionTime);
        }
    }

    let _tintBG = ''; let _currentTintColor = OcRam.hexToRGBA("#ffffffff"); let _fireFramesLimit = 6;
    let _intervalHandle = null; let _fireOpacity = 1; let _flickTimeOn = 24; let _flickTimeOff = 240;

    let _enemyLightData = null;

    // Pre-calculate for faster processing...
    const _dirMatrix = [0, 225, 270, 315, 180, 0, 0, 135, 90, 45];

    // For optimization...
    let _eventsWithLightData = []; const _terrainTagLightBases = [{}, {}, {}, {}, {}, {}, {}, {}]; let _activeTerrainLights = [];

    // Debugging purposes....
    /*this.getTLS = () => { return _terrainLightSources; };
    this.getLightLayer = () => { return _mapLights; };
    this.getEventsWithLightData = () => { return _eventsWithLightData; }
    this.lightsCullingTest = iterations => {
        let started = Date.now();
        for (let i = 0; i < iterations; i++) {
            lightsCulling();
        } console.log("lightsCulling (iterations " + iterations + ") / time:" + (Date.now() - started));
    };*/

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    // Load only events with light data to process with...
    const refreshEventsWithLightData = () => {
        _eventsWithLightData = [];
        $gameMap.events().forEach(ev => {
            if (ev._lightData) _eventsWithLightData.push(ev);
        });
    };

    // Called on transfers...
    const clearLights = () => {
        _eventsWithLightData = []; _terrainLightSources = [];
        const scene = SceneManager._scene; if (!scene) return;
        const spriteset = scene._spriteset; if (!spriteset) return;
        spriteset.removeChild(spriteset._lights); spriteset._lights = null;
    };

    // Reset all parameters to plugin defaults
    const resetToPluginDefaults = () => {
        _playerLightData = JSON.parse(this.parameters['Player light data']);
        _playerLightType = Number(_playerLightData.LightType) || 0;
        _playerLightRadius = Number(_playerLightData.Radius) || 0;
        _playerLightColor = _playerLightData.Color || '#ffffffff';
        _playerLightExParams = { offset: [_playerLightData.OffsetX, _playerLightData.OffsetY], degrees: _playerLightData.Degrees, angle: _playerLightData.Angle, rotation: _playerLightData.Rotation, startAt: _playerLightData.StartAt };
        _followerLightExParams = [_playerLightExParams, _playerLightExParams, _playerLightExParams];
        _battleLightData = JSON.parse(this.parameters['Battle light data']);
        _battleLightExParams = { offset: [_battleLightData.OffsetX, _battleLightData.OffsetY], degrees: _battleLightData.Degrees, angle: _battleLightData.Angle, rotation: _battleLightData.Rotation, startAt: OcRam.getFloat(_battleLightData.StartAt) };
    };

    // Check if light sources are in screen (do they need to be processed?)
    const lightsCulling = () => {

        if (!OcRam._doCulling) return;

        // Which terrain lights are in screen?
        _terrainLightSources.forEach(tl => {
            if (tl._offScreen) { // Is it in screen now?
                if (OcRam.isInScreen(tl._x, tl._y)) { tl._offScreen = false; }
            } else { // Is it off screen now?
                if (!OcRam.isInScreen(tl._x, tl._y)) { tl._offScreen = true; }
            }
        }); // Which events are in screen?
        $gameMap.events().forEach(ev => {
            if (ev._fixedToParallax) { ev._offScreen = false; return; }
            if (ev._offScreen) { // Is it in screen now?
                if (OcRam.isInScreen(ev._x, ev._y)) { ev._offScreen = false; }
            } else { // Is it off screen now?
                if (!OcRam.isInScreen(ev._x, ev._y)) { ev._offScreen = true; }
            }
        }); return;

    };

    // Setup one terrain light based on x, x and tag
    const setupTerrainLightByTag = (x, y, tag) => {

        let obj = null; let color = "";

        if (_pluginCmdNotations[tag]) { // Is plugin command given to override some region lights?
            obj = {
                _x: x, _y: y,
                _realX: x, _realY: y,
                _direction: 5, _tagId: tag,
                screenX_OC: _lightScreenXFunc,
                screenY_OC: _lightScreenYFunc,
            }; obj._lightData = new Light_Data(parseInt(_pluginCmdNotations[tag][0]), _pluginCmdNotations[tag][2], parseInt(_pluginCmdNotations[tag][1]), null, obj, parseInt(_pluginCmdNotations[tag][3]));
            color = _pluginCmdNotations[tag][2];
        } else {
            if (_tileMapNotations[tag]) { // Use tileset note field if plugin commands were not found for this tag
                obj = {
                    _x: x, _y: y,
                    _realX: x, _realY: y,
                    _direction: 5, _tagId: tag,
                    screenX_OC: _lightScreenXFunc,
                    screenY_OC: _lightScreenYFunc,
                }; obj._lightData = new Light_Data(parseInt(_tileMapNotations[tag][0]), _tileMapNotations[tag][2], parseInt(_tileMapNotations[tag][1]), null, obj, parseInt(_tileMapNotations[tag][3]));
                color = _tileMapNotations[tag][2];
            }
        }

        if (obj) { // Is terrain light base already declared?
            if (!_activeTerrainLights.find(t => {
                return t == tag;
            })) {
                _activeTerrainLights.push(tag);
                _terrainTagLightBases[tag] = new Light_Data(obj._lightData._lightType, color, obj._lightData._radius, null, null, -1);
            } _terrainLightSources.push(obj);
        }

    };

    const clearLightsInterval = () => {
        if (_intervalHandle != null) { // Let's clear this interval
            this.debug("Interval cleared!", _intervalHandle);
            window.clearInterval(_intervalHandle);
            _intervalHandle = null;
        }
    };

    const startTinting = (color, duration) => {

        if (_intervalHandle != null) {
            this.debug("Old tint found... Starting new one... ", color + ", " + duration);
            clearLightsInterval();
        }

        this.debug("Tint started! ", color + ", " + duration);
        let target_color = OcRam.hexToRGBA(color);
        window._targetLightBGColorRGBA_OC = target_color;

        if (duration < 1) {
            this.debug("Tint done! ", target_color); _currentTintColor = target_color;
            _tintBG = 'rgba(' + target_color.r + ', ' + target_color.g + ', ' + target_color.b + ', ' + target_color.a + ')';
            return;
        }

        const one_step = 16.666667; // 16.666667 ~1 frame (60 FPS)
        const total_steps = (1000 / one_step);

        // Pre-calculate how much each color is added on each step
        const add_red = (target_color.r - _currentTintColor.r) / (duration * total_steps);
        const add_green = (target_color.g - _currentTintColor.g) / (duration * total_steps);
        const add_blue = (target_color.b - _currentTintColor.b) / (duration * total_steps);
        let add_opa = 0; add_opa = parseFloat((target_color.a - _currentTintColor.a) / (duration * total_steps));

        // Example one step is 10ms total steps is 100 = 1sec = 1000ms
        // Example: 5 sec fade is 5 * 100 * 10 = 5000 ms = 5 sec
        let counter = 0; let counter_target = duration * total_steps;

        _intervalHandle = window.setInterval(function () {

            counter++; // It's important to increase counter... IMO

            _currentTintColor.r += add_red;
            _currentTintColor.g += add_green;
            _currentTintColor.b += add_blue;
            _currentTintColor.a = _currentTintColor.a + add_opa;

            if (counter > counter_target) { // Check if we have reached time limit given
                _this.debug("Tint done! ", target_color); _currentTintColor = target_color; clearLightsInterval();
            } _tintBG = 'rgba(' + (_currentTintColor.r | 0) + ', ' + (_currentTintColor.g | 0) + ', ' + (_currentTintColor.b | 0) + ', ' + _currentTintColor.a + ')';

        }, one_step); // Each step is [one_step]ms
    };

    const triggerDayPhase = instant_tint => {

        const day_phase_var = OcRam.Time_System._dayPhaseVarId;

        if (_prevDayPhase != $gameVariables.value(day_phase_var) || _prevDayPhase == -1) {
            if ($gameMap._forcedTint_OC) return;
            this.debug("Day phase variable changed. Phase:", $gameVariables.value(day_phase_var) + ", isInstant: " + instant_tint);
            _prevDayPhase = $gameVariables.value(day_phase_var);
            let this_color = '';
            switch (_prevDayPhase) {
                case 1: this_color = (OcRam.isIndoors() && _useTintIndoors) ? _tintNightIndoors : _nightBGColor; break;
                case 2: this_color = (OcRam.isIndoors() && _useTintIndoors) ? _tintDawnIndoors : _dawnBGColor; break;
                case 3: this_color = (OcRam.isIndoors() && _useTintIndoors) ? _tintDayIndoors : _dayBGColor; break;
                case 4: this_color = (OcRam.isIndoors() && _useTintIndoors) ? _tintDuskIndoors : _duskBGColor; break;
            } if (OcRam.isIndoors() && !_useTintIndoors) this_color = '#ffffffff';
            if (this_color) startTinting(this_color, (instant_tint) ? 0 : parseInt(OcRam.Time_System._effectTransitionTime / 60));
        }

    };

    const createNewLightData = (obj, light_data) => { // Game_System saves only data NOT actual references... Need to re-attach 'em!
        if (!light_data || light_data._lightType == 0) {
            if (obj) obj._lightData = null; light_data = undefined; return;
        } if (obj) {
            if (!light_data || (!light_data._originalColor && !light_data._color)) {
                obj._lightData = null;
            } else {
                const c = (!light_data._originalColor) ? OcRam.rgbaToHex(light_data._color) : light_data._originalColor;
                obj._lightData = new Light_Data(light_data._lightType, c, light_data._radius, light_data._lightExParams);
                light_data = undefined;
            }
        }
    };

    const createNewLightDataArr = (obj, light_data) => { // Game_System saves only data NOT actual references... Need to re-attach 'em!
        if (obj) {
            if (!light_data) {
                obj._lightData = null;
            } else {
                obj._lightData = [];
                for (let i = 0; i < light_data.length; i++) {
                    obj._lightData.push(new Light_Data(light_data[i]._lightType, light_data[i]._originalColor, light_data[i]._radius, light_data[i]._lightExParams));
                } light_data = undefined;
            }
        }
    };

    // Objects are always 'byref' in JS >> lets make it 'byval'... Sorry for VB terms here LOL
    const exParamCopy = ex_params => {
        let tmp = { offset: [0, 0], degrees: 0, angle: 0, rotation: 0 };
        if (ex_params) {
            tmp.offset[0] = parseInt(ex_params.offset[0]) || 0;
            tmp.offset[1] = parseInt(ex_params.offset[1]) || 0;
            tmp.degrees = parseInt(ex_params.degrees) || 360;
            tmp.rotation = parseInt(ex_params.rotation) || 0;
            tmp.angle = parseInt(ex_params.angle) || 0;
            tmp.startAt = OcRam.getFloat(ex_params.startAt);
        } return tmp;
    };

    const getLightData = function (args) {
        const ld = OcRam.getJSON(args.lightData);
        return [ld, {
            offset: [Number(ld.OffsetX), Number(ld.OffsetY)],
            degrees: Number(ld.Degrees),
            angle: Number(ld.Angle),
            rotation: OcRam.getFloat(ld.Rotation),
            startAt: OcRam.getFloat(ld.StartAt)
        }];
    };

    // Allows usage of css styled colors AND numeric values in code.
    // Example: eval("ocHaxor_" + "rgba(255, 0, 0, 0)" + ";") == ocHaxor_rgb(255, 0, 0, 0);
    const ocHaxor_rgba = (r, g, b, a) => {
        return {
            r: parseInt(r),
            g: parseInt(g),
            b: parseInt(b),
            a: parseFloat(a).toFixed(2)
        };
    };

    let followerLightUpdate = ctx => {
        OcRam.followers().forEach(f => { // Follower lights
            f.updateLightData_OC(ctx, f);
        });
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================

    // Create and OVERWRITE ALL lightdata with NEW light data
    this.createLight = (obj, type, color, radius, ex) => {
        if (!obj) return;
        obj._lightData = new Light_Data(type, color, radius, ex);
    };

    // Player light parameters: type, color, radius and light-ex
    this.getPlayerLightData = () => [_playerLightType, _playerLightColor, _playerLightRadius, _playerLightExParams];

    // Get all events with lightdata
    this.getEventsWithLightData = () => _eventsWithLightData;

    // Force day phase NOW!
    this.forceDayPhase = instant => {
        _prevDayPhase = -1; $gameMap._forcedTint_OC = false;
        triggerDayPhase(instant);
    };

    // Manually call refreshEventsWithLightData()
    this.refreshEventsWithLightData = () => { refreshEventsWithLightData(); };

    // ------------------------------------------------------------------------------
    // Plugin Classes
    // ==============================================================================

    /** Light_Data class for single light source */
    class Light_Data {

        constructor(light_type, light_color, radius, ex_params, terrain_light_obj, update_type) { // Init some stuff...

            let color = light_color;
            this._originalColor = color;

            this._colorIndex = 1; this._cycleCounter = 0; this._cycleFader = 0;
            if (light_color.indexOf("]") > 0) {
                this._multipleColors = [];
                light_color = light_color.replace("[", "");
                light_color = light_color.replace("]", "");
                const arr_tmp = light_color.split(","); color = arr_tmp[1];
                for (let i = 1; i < arr_tmp.length; i++) {
                    this._multipleColors.push(OcRam.hexToRGBA(arr_tmp[i]));
                } _this.debug("NEW - light rotator: ", arr_tmp);
                this._cycleFader = arr_tmp[0] - 0;
                this._colorCount = arr_tmp.length - 1;
                this._cycleCounter = arr_tmp[0] + 1;
            } else {
                this._multipleColors = null;
                this._colorCount = 1;
            }

            // Static stuff... updated only on page activation etc...
            this._lightType = light_type;
            this._color = OcRam.hexToRGBA(color);
            this._radius = radius;

            // To be updated later on...
            this._x = 0; this._y = 0; this._dir = 0;

            this._currentColor = OcRam.hexToRGBA(color);
            this._currentRadius = radius;
            this._flickIsOn = false;
            this._flicksRemaining = 0;

            if (update_type == -1) { // SHARED TERRAIN DATA
                if (this._lightType == 5 && this._colorCount > 1) {
                    this.fire = function () {
                        if (this._flicksRemaining >= _fireFramesLimit) {
                            this._flicksRemaining = 0;
                            this._currentRadius = this._radius * (0.98 + (0.04 * Math.random()));
                            _fireOpacity = 0.85 + (0.15 * Math.random());
                        } this._currentColor.a = this._color.a * _fireOpacity;
                        this._currentRadius = this._radius * _fireOpacity;
                        if (Math.random() < 0.666) { this._flicksRemaining++; }
                    };
                }
            }

            if (terrain_light_obj) {
                this.fire = function () {
                    if (this._flicksRemaining >= _fireFramesLimit) {
                        this._flicksRemaining = 0;
                        this._currentRadius = this._radius * (0.98 + (0.04 * Math.random()));
                        _fireOpacity = 0.85 + (0.15 * Math.random());
                    } this._currentColor.a = this._color.a * _fireOpacity;
                    this._currentRadius = this._radius * _fireOpacity;
                    if (Math.random() < 0.666) { this._flicksRemaining++; }
                };
                this._x = terrain_light_obj._x - 0;
                this._y = terrain_light_obj._y - 0;
                this._tagId = terrain_light_obj._tagId;
                this._lightExParams = _terrainLightExParams;
                this._sharedTerrain = update_type != 1;
                if (update_type != 0) { // All terrain lights are individual! (cool, but slightly more resource intensive)
                    if (this._colorCount > 1) {
                        switch (update_type) {
                            case 1: // Individual "random"
                                this._colorIndex = (this._colorCount * Math.random()) | 0;
                                this._cycleCounter = (this._cycleFader * Math.random()) | 0;
                                break;
                        } if (this._colorIndex < 0) this._colorIndex = 0;
                        const target_color = this._multipleColors[this._colorIndex];
                        this._preCalcColorSteps = [
                            (target_color.r - this._currentColor.r) / this._cycleFader,
                            (target_color.g - this._currentColor.g) / this._cycleFader,
                            (target_color.b - this._currentColor.b) / this._cycleFader,
                            (target_color.a - this._currentColor.a) / this._cycleFader
                        ];
                    } if (this._lightType > 6) { // Pulsating
                        switch (update_type) {
                            case 1: // Individual "random"
                                this._currentColor.a = (this._color.a * Math.random()); break;
                        }
                    } if (this._lightType == 6) { // Strobo
                        if (Math.random() > 0.5) {
                            this._flickIsOn = true;
                        } else {
                            this._flickIsOn = false;
                        }
                    }
                }
            } else {
                this._rotationCounter = 0;
                this._lightExParams = exParamCopy(ex_params);
                if (this._lightExParams) { // Ex-Parameters found!
                    this._lightExParams.offset[0] = Number(this._lightExParams.offset[0]);
                    this._lightExParams.offset[1] = Number(this._lightExParams.offset[1]);
                    this._lightExParams.degrees = Number(this._lightExParams.degrees) || 360;
                    this._lightExParams.rotation = OcRam.getFloat(this._lightExParams.rotation);
                    this._lightExParams.angle = Number(this._lightExParams.angle);
                    this._lightExParams.startAt = OcRam.getFloat(this._lightExParams.startAt);
                } else { // No Ex-Params were given...
                    this._lightExParams = { offset: [0, 0], degrees: 0, angle: 0, rotation: 0, startAt: 0 };
                }
            }

        }

        updateColorCycle() {
            if (this._colorCount > 1) { // Pre-calculate color steps for faster processing!
                if (this._cycleCounter > this._cycleFader) {
                    let target_color = this._multipleColors[this._colorIndex];
                    this._preCalcColorSteps = [
                        (target_color.r - this._currentColor.r) / this._cycleFader,
                        (target_color.g - this._currentColor.g) / this._cycleFader,
                        (target_color.b - this._currentColor.b) / this._cycleFader,
                        (target_color.a - this._currentColor.a) / this._cycleFader
                    ]; this._colorIndex = (this._colorIndex + 1) % this._colorCount; this._cycleCounter = 0;
                } this._cycleCounter++; // Do cycle based on precalculated values
                this._currentColor.r = (this._currentColor.r + this._preCalcColorSteps[0]) | 0;
                this._currentColor.g = (this._currentColor.g + this._preCalcColorSteps[1]) | 0;
                this._currentColor.b = (this._currentColor.b + this._preCalcColorSteps[2]) | 0;
                this._currentColor.a = this._currentColor.a + this._preCalcColorSteps[3];
            }
        }

        flickerLittle() {
            if (this._flicksRemaining == 0) {
                if (!this._flickIsOn) {
                    this._flicksRemaining = (_flickTimeOn * Math.random()) | 0; this._flickIsOn = true;
                } else {
                    this._flicksRemaining = (_flickTimeOff * Math.random()) | 0; this._flickIsOn = false;
                }
            } else { this._flicksRemaining--; }
            this._currentColor.a = (this._flickIsOn) ? 0 : this._color.a;
        }

        flicker() {
            if (this._flicksRemaining == 0) {
                if (!this._flickIsOn) {
                    this._flicksRemaining = (_flickTimeOn * 3 * Math.random()) | 0; this._flickIsOn = true;
                } else {
                    this._flicksRemaining = (_flickTimeOn * 3 * Math.random()) | 0; this._flickIsOn = false;
                }
            } else { this._flicksRemaining--; }
            this._currentColor.a = (this._flickIsOn) ? 0 : this._color.a;
        }

        flickerLot() {
            if (this._flicksRemaining == 0) {
                if (!this._flickIsOn) {
                    this._flicksRemaining = (_flickTimeOff * Math.random()) | 0; this._flickIsOn = true;
                } else {
                    this._flicksRemaining = (_flickTimeOn * Math.random()) | 0; this._flickIsOn = false;
                }
            } else { this._flicksRemaining--; }
            this._currentColor.a = (this._flickIsOn) ? 0 : this._color.a;
        }

        fire() {
            if (this._flicksRemaining >= _fireFramesLimit) {
                this._flicksRemaining = 0;
                this._currentRadius = this._radius * (0.98 + (0.04 * Math.random()));
                _fireOpacity = 0.92 + (0.08 * Math.random());
            } this._currentColor.r = (this._color.r * _fireOpacity) | 0;
            this._currentColor.g = (this._color.g * _fireOpacity) | 0;
            this._currentColor.b = (this._color.b * _fireOpacity) | 0;
            this._currentColor.a = this._color.a * _fireOpacity;
            if (Math.random() < 0.75) { this._flicksRemaining++; }
        }

        strobo() {
            if (this._flicksRemaining == 0) {
                this._flicksRemaining = 2;
                this._flickIsOn = !this._flickIsOn;
            } else { this._flicksRemaining--; }
            this._currentColor.a = (this._flickIsOn) ? 0 : this._color.a;
        }

        pulsatingSlow() {
            if (this._flickIsOn) {
                this._currentColor.a = this._currentColor.a - 0.005;
            } else {
                this._currentColor.a = this._currentColor.a + 0.005;
            } if (this._currentColor.a < 0.0051) {
                this._flickIsOn = false;
            } else if (this._currentColor.a >= this._color.a) {
                this._flickIsOn = true;
            }
        }

        pulsating() {
            if (this._flickIsOn) {
                this._currentColor.a = this._currentColor.a - 0.01;
            } else {
                this._currentColor.a = this._currentColor.a + 0.01;
            } if (this._currentColor.a < 0.011) {
                this._flickIsOn = false;
            } else if (this._currentColor.a >= this._color.a) {
                this._flickIsOn = true;
            }
        }

        pulsatingFast() {
            if (this._flickIsOn) {
                this._currentColor.a = this._currentColor.a - 0.03;
            } else {
                this._currentColor.a = this._currentColor.a + 0.03;
            } if (this._currentColor.a < 0.031) {
                this._flickIsOn = false;
            } else if (this._currentColor.a >= this._color.a) {
                this._flickIsOn = true;
            }
        }

        update(ctx, obj) {

            if (!this._lightType) return; // Light is off

            // These must be updated even if event is not moving...
            this._x = obj.screenX_OC() + _margin + (obj._fixedToParallax ? $gameMap._parallaxX * ($gameMap._parallaxLoopX ? 24 : 48) : 0);
            this._y = obj.screenY_OC() + _margin + (obj._fixedToParallax ? $gameMap._parallaxY * ($gameMap._parallaxLoopY ? 24 : 48) : 0);
            this._dir = obj._direction;
            this._flickIsOn = this._flickIsOn || false;
            this._flicksRemaining = this._flicksRemaining || 0;
            this.updateColorCycle();

            switch (this._lightType) { // Light sources that needs computing
                case 1: break; // Normal
                case 2: this.flickerLittle(); break; // Flickering little (like little broken light) 90% on / 10 % off
                case 3: this.flicker(); break; // Flickering (like almost broken light) 50% on / 50 % off
                case 4: this.flickerLot(); break; // Flickering a lot (like realy broken light) 10% on / 90 % off
                case 5: this.fire(); break; // Try to simulate fire
                case 6: this.strobo(); break; // Strobo...
                case 7: this.pulsatingSlow(); break; // Pulsating SLOW
                case 8: this.pulsating(); break; // Pulsating
                case 9: this.pulsatingFast(); break; // Pulsating FAST
            }

            if (this._lightExParams.degrees == 0 || this._lightExParams.degrees == 360) { // "Normal" full circle light source
                ctx.radialGradient((this._x + this._lightExParams.offset[0]) | 0, (this._y + this._lightExParams.offset[1]) | 0, this._currentRadius | 0, this._currentColor);
            } else { // Cone light source
                let angle = this._lightExParams.angle || _dirMatrix[this._dir]; // Use angle if defined else direction
                if (this._lightExParams.rotation != 0) { // Is rotating?
                    this._lightExParams.angle += this._lightExParams.rotation;
                    if (this._lightExParams.angle > 360) this._lightExParams.angle = 0;
                    angle = this._lightExParams.angle | 0;
                } if (obj.isPlayer_Lights_OC() && this._dir == 8) { // Fix for "flash light" effect
                    ctx.radialCone((this._x + this._lightExParams.offset[0]) | 0, (this._y + this._lightExParams.offset[1] - _flashLightUpFixValue) | 0, this._currentRadius | 0, this._currentColor, angle, this._lightExParams.degrees, this._lightExParams.startAt);
                } else {
                    ctx.radialCone((this._x + this._lightExParams.offset[0]) | 0, (this._y + this._lightExParams.offset[1]) | 0, this._currentRadius | 0, this._currentColor, angle, this._lightExParams.degrees, this._lightExParams.startAt);
                }
            }

        }

        updateTerrain(ctx, obj) {
            if (!this._lightType) return; // Light is off
            // These must be updated even if terrain light is not 'moving'...
            this._x = obj.screenX_OC() + _margin; this._y = obj.screenY_OC() + _margin;
            if (this._sharedTerrain) {
                ctx.radialGradient(this._x | 0, this._y | 0, _terrainTagLightBases[obj._tagId]._currentRadius | 0, _terrainTagLightBases[obj._tagId]._currentColor);
            } else {
                this.updateColorCycle();
                switch (this._lightType) { // Light sources that needs computing
                    case 1: break; // Normal
                    case 2: this.flickerLittle(); break; // Flickering little (like little broken light) 90% on / 10 % off
                    case 3: this.flicker(); break; // Flickering (like almost broken light) 50% on / 50 % off
                    case 4: this.flickerLot(); break; // Flickering a lot (like realy broken light) 10% on / 90 % off
                    case 5: this.fire(); break; // Try to simulate fire
                    case 6: this.strobo(); break; // Strobo...
                    case 7: this.pulsatingSlow(); break; // Pulsating SLOW
                    case 8: this.pulsating(); break; // Pulsating
                    case 9: this.pulsatingFast(); break; // Pulsating FAST
                } ctx.radialGradient(this._x | 0, this._y | 0, this._currentRadius | 0, this._currentColor);
            }
        }

    }

    /**  Light layer for light sources */
    class OcRam_Light_Layer extends Sprite {

        constructor() {
            const w = (Graphics.width + _margin * 2) | 0;
            const h = (Graphics.height + _margin * 2) | 0;
            super(new Bitmap(w, h));
            this._width = w; this._height = h;
            this.x = -_margin; this.y = -_margin;
            this._lightSprite = new Sprite(this.viewport);
            this.blendMode = PIXI.BLEND_MODES.MULTIPLY;
            this.bitmap.smooth = false;
            this._bgCtx = this.bitmap.canvas.getContext("2d");
            this._bgCtx.globalCompositeOperation = "copy";
            _this.debug("OcRam_Light_Layer.prototype.initialize", this);
        }

        updateBattleLights() {
            this.newLightFrame(); // Draw light layer background
            if ($gameSwitches.value(_killSwitchId)) { this.updateLightFrame(); return false; }
            this._leftLightSource._lightData.update(this._bgCtx, this._leftLightSource);
            this._rightLightSource._lightData.update(this._bgCtx, this._rightLightSource);
            this._battleScene._actorSprites.forEach(itm => {
                if (itm._lightData && itm._battler && !itm._battler.isDead()) itm._lightData.update(this._bgCtx, itm);
            });
            this._battleScene._enemySprites.forEach(itm => {
                if (itm._lightData && itm._battler && !itm._battler.isDead() && itm._battler.isAppeared()) itm._lightData.forEach(ld => ld.update(this._bgCtx, itm));
            }); this.updateLightFrame();
        }

        updateMapLights() {

            this.newLightFrame(); // Draw light layer background
            if ($gameSwitches.value(_killSwitchId)) { this.updateLightFrame(); return false; }

            // Update $gamePlayer/follower light source(s)
            if (!$gamePlayer._lightData) {
                $gamePlayer._lightData = new Light_Data(_playerLightType, _playerLightColor, _playerLightRadius * 0.5, _playerLightExParams);
                if (_forceCenterPlayerLight) { // No extra iffing in frequent updates instead override default func...
                    $gamePlayer._lightData.update = function (ctx, obj) {
                        if (!this._lightType) return; // Light is off

                        // These must be updated even if event is not moving...
                        this._x = (Graphics.width * 0.5) + (this._currentRadius * 0.5) - (_margin * 0.5);
                        this._y = (Graphics.height * 0.5) + (this._currentRadius * 0.5) - 48;
                        this._dir = obj._direction;
                        this._flickIsOn = this._flickIsOn || false;
                        this._flicksRemaining = this._flicksRemaining || 0;
                        this.updateColorCycle();

                        switch (this._lightType) { // Light sources that needs computing
                            case 1: break; // Normal
                            case 2: this.flickerLittle(); break; // Flickering little (like little broken light) 90% on / 10 % off
                            case 3: this.flicker(); break; // Flickering (like almost broken light) 50% on / 50 % off
                            case 4: this.flickerLot(); break; // Flickering a lot (like realy broken light) 10% on / 90 % off
                            case 5: this.fire(); break; // Try to simulate fire
                            case 6: this.strobo(); break; // Strobo...
                            case 7: this.pulsatingSlow(); break; // Pulsating SLOW
                            case 8: this.pulsating(); break; // Pulsating
                            case 9: this.pulsatingFast(); break; // Pulsating FAST
                        }

                        if (this._lightExParams.degrees == 0 || this._lightExParams.degrees == 360) { // "Normal" full circle light source
                            ctx.radialGradient((this._x + this._lightExParams.offset[0]) | 0, (this._y + this._lightExParams.offset[1]) | 0, this._currentRadius | 0, this._currentColor);
                        } else { // Cone light source
                            let angle = this._lightExParams.angle || _dirMatrix[this._dir]; // Use angle if defined else direction
                            if (this._lightExParams.rotation != 0) { // Is rotating?
                                this._lightExParams.angle += this._lightExParams.rotation;
                                if (this._lightExParams.angle > 360) this._lightExParams.angle = 0;
                                angle = this._lightExParams.angle | 0;
                            } if (obj.isPlayer_Lights_OC() && this._dir == 8) { // Fix for "flash light" effect
                                ctx.radialCone((this._x + this._lightExParams.offset[0]) | 0, (this._y + this._lightExParams.offset[1] - _flashLightUpFixValue) | 0, this._currentRadius | 0, this._currentColor, angle, this._lightExParams.degrees, this._lightExParams.startAt);
                            } else {
                                ctx.radialCone((this._x + this._lightExParams.offset[0]) | 0, (this._y + this._lightExParams.offset[1]) | 0, this._currentRadius | 0, this._currentColor, angle, this._lightExParams.degrees, this._lightExParams.startAt);
                            }
                        }
                    }
                }
                
            } $gamePlayer._lightData.update(this._bgCtx, $gamePlayer); followerLightUpdate(this._bgCtx);

            _eventsWithLightData.forEach(ev => { // Update EVENT light sources
                if (!ev._offScreen && ev._lightData) ev._lightData.forEach(ld => ld.update(this._bgCtx, ev));
            });

            _activeTerrainLights.forEach(t => { // Refresh terrain light shared data
                const tld = _terrainTagLightBases[t];
                tld.updateColorCycle();
                switch (tld._lightType) { // Light sources that needs computing
                    case 1: break; // Normal
                    case 2: tld.flickerLittle(); break; // Flickering little (like little broken light) 90% on / 10 % off
                    case 3: tld.flicker(); break; // Flickering (like almost broken light) 50% on / 50 % off
                    case 4: tld.flickerLot(); break; // Flickering a lot (like realy broken light) 10% on / 90 % off
                    case 5: tld.fire(); break; // Try to simulate fire
                    case 6: tld.strobo(); break; // Strobo...
                    case 7: tld.pulsatingSlow(); break; // Pulsating SLOW
                    case 8: tld.pulsating(); break; // Pulsating
                    case 9: tld.pulsatingFast(); break; // Pulsating FAST
                }
            });

            _terrainLightSources.forEach(tl => {
                if (!tl._offScreen) tl._lightData.updateTerrain(this._bgCtx, tl);
            });

            this.updateLightFrame();

        }

        newLightFrame() { // New frame for light layer!
            this.bitmap.fillRect(0, 0, this._width, this._height, _tintBG);
            if (_tintBG == '') return; // No lights...
            this._bgCtx.globalCompositeOperation = "lighter";
        }

        updateLightFrame() { // Set things ready for the next frame!
            this._bgCtx.globalCompositeOperation = "copy";
        }

    }

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    Game_CharacterBase.prototype.isPlayer_Lights_OC = function () { return false; };
    Game_Player.prototype.isPlayer_Lights_OC = function () { return true; };
    Game_Follower.prototype.isPlayer_Lights_OC = function () { return true; };

    // Character has lights on?
    Game_CharacterBase.prototype.isLit = function () {
        return this._lightData && this._lightData._lightType;
    }; Game_Event.prototype.isLit = function () {
        if (!this._lightData) return false;
        return !!(this._lightData.find(ld => {
            return ld._lightType;
        }));
    };

    // Setup new light data for follower
    Game_Follower.prototype.setupLightData = function (light_type, light_radius, light_color) {
        if (light_type != 0) {
            this._lightData = new Light_Data(light_type, light_color, parseInt(light_radius * 0.5), _followerLightExParams[this._memberIndex - 1]);
        } else {
            this._lightData = null;
        }
    };

    // Stealth mode is used to disable isPlayerInLightRadius
    Game_Party.prototype.setStealthMode = function (v) {
        $gamePlayer._stealthMode = v;
        OcRam.followers().forEach(f => {
            f._stealthMode = v;
        });
    };

    // Add NEW light to event
    Game_Event.prototype.addLight = function (obj, type, color, radius, ex) {
        if (!isArray(this._lightData)) obj._lightData = [];
        this._lightData.push(new Light_Data(type, color, radius, ex));
    };

    // Is player or follower in radius of this event?
    Game_Event.prototype.isPlayerInLightRadius = function (xray) { // Must have valid light source - else will return always false
        if (!$gameMap) return false;
        if ($gamePlayer._stealthMode) return false;
        if (!this.isLit()) return false;
        let in_range = false;
        this._lightData.forEach(ld => {
            if (!in_range) {
                const r = (ld._radius / OcRam.twh[0]) | 0;
                const deg = ld._lightExParams ? ld._lightExParams.degrees : 360;
                in_range = this.lineOfSight($gamePlayer, r, deg, xray);
                if (!in_range) {
                    $gamePlayer._followers.visibleFollowers().find(f => {
                        if (!f._stealthMode && this.lineOfSight(f, r, deg, xray)) {
                            in_range = true; return true;
                        }
                    });
                }
            }
        }); return in_range;
    };

    // Get all objects in light radius
    Game_Event.prototype.getObjectsInLightRadius = function (xray) { // Must have valid light source - else will return always false
        if (!$gameMap) return []; if (!this.isLit()) return [];
        let events_in_range = [];
        this._lightData.forEach(ld => {
            const r = Math.ceil(ld._radius / OcRam.twh[0]);
            const deg = ld._lightExParams ? ld._lightExParams.degrees : 360;
            this.eventsInLineOfSight(r, deg, xray).forEach(ev => {
                events_in_range.push(ev);
            }); if (this.lineOfSight($gamePlayer, r, deg, xray)) events_in_range.push($gamePlayer);
            $gamePlayer._followers.visibleFollowers().forEach(f => {
                if (this.lineOfSight(f, r, deg, xray)) events_in_range.push(f);
            });
        }); return events_in_range;
    };

    // Get events in light radius
    Game_Player.prototype.getEventsInLightRadius = function (xray) { // Must have valid light source - else will return always false
        if (!$gameMap) return []; if (!this.isLit()) return [];
        let ld = this._lightData; const r = Math.ceil(ld._radius / OcRam.twh[0]);
        return this.eventsInLineOfSight(r, ld._lightExParams ? ld._lightExParams.degrees : 360, xray);
    }; Game_Follower.prototype.getEventsInLightRadius = function (xray) { // Must have valid light source - else will return always false
        if (!$gameMap) return []; if (!this.isLit()) return [];
        let ld = this._lightData; const r = Math.ceil(ld._radius / OcRam.twh[0]);
        return this.eventsInLineOfSight(r, ld._lightExParams ? ld._lightExParams.degrees : 360, xray);
    };

    // New method to setup light data for game event
    Game_Event.prototype.setupNewLightData = function () {

        const cmts = this.getOpenTags("light");
        const cmts_ex = this.getOpenTags("light-ex");

        if (cmts.length < 1) { // No light data
            this._lightData = null;
        } else { // We got light data, but is it valid?

            this._lightData = [];

            for (let i = 0; i < cmts.length; i++) {

                // <light:[type:0-9]:[radius:1-1000]:[color:#rrggbbaa]>
                let ls_params = (cmts[i] + "::::").split(":");
                ls_params[1] = Number((ls_params[1]));
                ls_params[2] = Number((ls_params[2]));
                ls_params[3] = ('' + ls_params[3]);

                let ex_params = { offset: [0, 0], degrees: 0, angle: 0, rotation: 0 };
                if (cmts_ex && i < cmts_ex.length && cmts_ex[i]) { // Extended parameters
                    // <light-ex:x,y:degrees:angle:rotation:startAt>
                    let tmp = (cmts_ex[i] + "::::").split(":");
                    try {
                        ex_params.offset = eval("[" + tmp[1] + "]");
                    } catch (ex) {
                        ex_params.offset = [0, 0];
                    } ex_params.degrees = Number(tmp[2]);
                    ex_params.angle = Number(tmp[3]);
                    ex_params.rotation = OcRam.getFloat(tmp[4]);
                    ex_params.startAt = OcRam.getFloat(tmp[5]);
                }

                this._lightData.push(new Light_Data(parseInt(ls_params[1]), ls_params[3], parseInt(ls_params[2]) * 0.5, ex_params))

            }

        }

        if (!OcRam._justTransfered) {
            _eventsWithLightData.remove(this);
            if (this._lightData) _eventsWithLightData.push(this);
        }

    };

    // Save light data to game system
    Game_System.prototype.saveLightData = function () {

        let target_color = window._targetLightBGColorRGBA_OC;
        if (target_color === undefined) target_color = null;

        this._lightBGColor = (target_color == null) ? _tintBG : 'rgba(' + target_color.r + ', ' + target_color.g + ', ' + target_color.b + ', ' + target_color.a + ')';
        this._forcedTint_OC = $gameMap._forcedTint_OC;

        this._playerLightData_OC = [];
        this._playerLightData_OC.push($gamePlayer._lightData);

        OcRam.followers().forEach(ev => {
            if (ev) this._playerLightData_OC.push(ev._lightData);
        });

        this._eventLightData_OC = [];
        $gameMap._events.forEach(ev => {
            if (ev) this._eventLightData_OC.push(ev._lightData);
        });

        this._pluginCmdNotations = _pluginCmdNotations;

    };

    // Load light data from game system
    Game_System.prototype.loadLightData = function () {

        if (this._lightBGColor !== undefined) { // Do not break old saves...

            _tintBG = (this._lightBGColor).toLowerCase();
            if (_tintBG.indexOf("rgba(") > -1) {
                _currentTintColor = eval("ocHaxor_" + _tintBG + ";");
            } else {
                _currentTintColor = eval("ocHaxor_rgba(255, 255, 255, 1)");
            } _currentTintColor.a = Number(_currentTintColor.a);

            $gameMap._forcedTint_OC = this._forcedTint_OC; let i = 0;
            createNewLightData($gamePlayer, this._playerLightData_OC[i]);
            for (i; i < $gamePlayer._followers.visibleFollowers().length;) {
                createNewLightData($gamePlayer._followers.visibleFollowers()[i], this._playerLightData_OC[++i]);
            } i = 0;

            $gameMap._events.forEach(ev => {
                if (ev) {
                    createNewLightDataArr(ev, this._eventLightData_OC[i++]);
                }
            });

            _pluginCmdNotations = this._pluginCmdNotations;

        }

    };

    Game_Map.prototype.initTerrainLights = function () {

        if (DataManager.isEventTest()) return;

        _tileMapNotations = [];
        const ts_meta = $dataTilesets[$dataMap.tilesetId].meta;
        for (let i = 0; i < 8; i++) {
            if (ts_meta["light" + i]) {
                _tileMapNotations.push((ts_meta["light" + i] + "::").split(":"));
            } else {
                _tileMapNotations.push(null);
            }
        }

        const flags = this.tilesetFlags();
        _terrainLightSources = []; _activeTerrainLights = [];
        for (let x = 0; x < this.width(); x++) {
            for (let y = 0; y < this.height(); y++) {
                if (this.isValid(x, y)) {
                    const tiles = this.layeredTiles(x, y);
                    for (let i = 0; i < tiles.length; i++) {
                        const tag = flags[tiles[i]] >> 12;
                        if (tag > 0) {
                            setupTerrainLightByTag(x, y, tag);
                        }
                    }
                }
            }
        }

        requestAnimationFrame(() => { lightsCulling(); });

    };

    Game_CharacterBase.prototype.isEvent_OC = function () { return false; };
    Game_Event.prototype.isEvent_OC = function () { return true; };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    this.extend(Game_Player, "refreshBushDepth", function () {
        _this["Game_Player_refreshBushDepth"].apply(this, arguments); lightsCulling();
    });

    // Set clear light data on player transfer
    this.extend(Game_Player, "performTransfer", function () {
        clearLightsInterval(); _this["Game_Player_performTransfer"].apply(this, arguments);
        $gameMap._forcedTint_OC = false; clearLights();
    });

    // Modify followerLightUpdate() to avoid extra iffing in every frame...
    this.extend(Game_Player, "getOnVehicle", function () {
        OcRam.followers().forEach(f => { // Follower lights
            f._lightData = null;
        }); followerLightUpdate = ctx => { };
        _this["Game_Player_getOnVehicle"].apply(this, arguments);
    }); this.extend(Game_Player, "getOffVehicle", function () {
        followerLightUpdate = ctx => {
            OcRam.followers().forEach(f => { // Follower lights
                $gameTemp._reservePlayerIndexJoined = -1;
                f.updateLightData_OC(ctx, f);
            });
        }; _this["Game_Player_getOffVehicle"].apply(this, arguments);
    });

    this.extend(Game_Event, "setupPage", function () {
        _this["Game_Event_setupPage"].apply(this, arguments);
        this.setupNewLightData();
    });

    this.extend(Spriteset_Map, "update", function () {
        _this["Spriteset_Map_update"].apply(this, arguments); this._lights.updateMapLights();
    });

    this.extend(Spriteset_Battle, "update", function () {
        _this["Spriteset_Battle_update"].apply(this, arguments);
        if (this._lights) this._lights.updateBattleLights();
    });

    this.extend(Scene_Battle, "terminate", function () {
        _this["Scene_Battle_terminate"].apply(this, arguments);
        if (_battleTint != 0) {
            if (_battleTint == 1) { // Tint only!
                $gameScreen.startTint([0, 0, 0, 0], 0);
            } OcRam.Lights.forceDayPhase(true);
        }
    });

    if (_useTimeSystem) { // Use OcRam_Time_System?
        this.extend(Game_Variables, "onChange", function () {
            _this["Game_Variables_onChange"].apply(this, arguments); triggerDayPhase(false);
        });
    }

    this.extend(Scene_Boot, "isReady", function () {

        let ret = _this["Scene_Boot_isReady"].apply(this, arguments);

        if (_useLocalCoop) {
            if (!Imported.OcRam_Local_Coop) {
                console.warn("OcRam_Local_Coop not found!", "Can't use local coop!"); _useLocalCoop = false;
            } else {
                if (parseFloat(OcRam.Local_Coop.version) < 1.01) {
                    console.warn("OcRam_Local_Coop must be at least v1.01!", "Can't use local coop!"); _useLocalCoop = false;
                }
            } _this.debug("OcRam_Local_Coop", "Loaded successfully!");
        }

        if (_useLocalCoop && _useP1LightForAll) {
            let _prevFollowerLightData = []; for (let i = 0; i < Number(OcRam.parameters['Max battle members']) - 1; i++) _prevFollowerLightData.push(null);
            Game_Follower.prototype.updateLightData_OC = function (ctx) {
                if (!$gamePlayer._lightData || !$gamePlayer._lightData._lightType) return;
                if (this._playerIndex_OC) {
                    if ($gameTemp._reservePlayerIndexJoined != 0 && ($gameTemp._reservePlayerIndexJoined == this._memberIndex || !this._lightData)) {
                        if ($gamePlayer.isInVehicle()) return;
                        $gameTemp._reservePlayerIndexJoined = 0;
                        _prevFollowerLightData[this._memberIndex - 1] = this._lightData;
                        this._lightData = new Light_Data(_playerLightType, _playerLightColor, _playerLightRadius * 0.5, _playerLightExParams);
                    } if (this._lightData) this._lightData.update(ctx, this);
                } else {
                    if ($gameTemp._reservePlayerIndexLeft != 0 && $gameTemp._reservePlayerIndexLeft == this._memberIndex) {
                        $gameTemp._reservePlayerIndexLeft = 0;
                        this._lightData = _prevFollowerLightData[this._memberIndex - 1] || null;
                    } if (this._lightData) this._lightData.update(ctx, this);
                }
            };
        } else {
            Game_Follower.prototype.updateLightData_OC = function (ctx) {
                if (this._lightData) this._lightData.update(ctx, this);
            };
        }

        return ret;

    });

    this.extend(Game_Interpreter, "command301", function () {
        if (!_enemyLightData) _enemyLightData = this.event()._lightData;
        return _this["Game_Interpreter_command301"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = function () {
        clearLightsInterval(); _terrainLightSources = []; 
        _pluginCmdNotations = []; resetToPluginDefaults();
    };

    this.loadPluginData = gs => {
        this.clearPluginData();
        gs.loadLightData();
    };

    this.savePluginData = gs => {
        gs.saveLightData();
    };

    this.onMapStart = sm => {
        $gameMap.initTerrainLights();
    };

    this.onMapTerminate = sm => { };

    this.createLowerMapLayer = sm => {
        sm._lights = new OcRam_Light_Layer(sm);
        sm.addChild(sm._lights);
        if (_useTimeSystem) { // Use OcRam_Time_System?
            if (!$gameMap._forcedTint_OC) {
                if (OcRam.isIndoors() && !_useTintIndoors) {
                    this.debug("Indoors", "NO TINT!");
                    if (_intervalHandle != null) {
                        window.clearInterval(_intervalHandle);
                        _intervalHandle = null; // Let's clear this interval
                    } _tintBG = '#ffffffff'; _currentTintColor = OcRam.hexToRGBA("#ffffffff");
                } else {
                    if (!OcRam._menuCalled) {
                        _prevDayPhase = -1; triggerDayPhase(!OcRam.Map_Transfer.isTransfering());
                    }
                }
            }
        }
    };

    this.createLowerBattleLayer = sb => {

        if (_battleTint != 0) {
            if (_battleTint == 1) { // Tint only!
                const tmp = [_currentTintColor.r, _currentTintColor.g, _currentTintColor.b, 0];
                tmp[0] += 50; if (tmp[0] > 255) tmp[0] = 255; tmp[0] -= 255;
                tmp[1] += 50; if (tmp[1] > 255) tmp[1] = 255; tmp[1] -= 255;
                tmp[2] += 50; if (tmp[2] > 255) tmp[2] = 255; tmp[2] -= 255;
                $gameScreen.startTint(tmp, 0);
            } return;
        }

        sb._lights = new OcRam_Light_Layer(sb);
        sb.addChild(sb._lights);

        // Add battle lights
        const tmp_y = parseInt(Graphics.height * 0.5) - OcRam.twh[1]; sb._lights._leftLightSource = {};
        sb._lights._rightLightSource = {};
        sb._lights._leftLightSource.isPlayer_Lights_OC = function () { return false; };
        sb._lights._leftLightSource._battleSrc = "left";
        sb._lights._leftLightSource._realX = 0;
        sb._lights._leftLightSource._realY = tmp_y;
        sb._lights._leftLightSource._direction = 6;
        sb._lights._leftLightSource.screenX_OC = function () { return this._realX; };
        sb._lights._leftLightSource.screenY_OC = function () { return this._realY; };
        sb._lights._leftLightSource._lightData = new Light_Data(parseInt(_battleLightData.LightType),
            _battleLightData.Color, parseInt(_battleLightData.Radius), _battleLightExParams);

        sb._lights._rightLightSource.isPlayer_Lights_OC = function () { return false; };
        sb._lights._rightLightSource._battleSrc = "right";
        sb._lights._rightLightSource._realX = Graphics.width;
        sb._lights._rightLightSource._realY = tmp_y;
        sb._lights._rightLightSource._direction = 4;
        sb._lights._rightLightSource.screenX_OC = function () { return this._realX; };
        sb._lights._rightLightSource.screenY_OC = function () { return this._realY; };
        sb._lights._rightLightSource._lightData = new Light_Data(parseInt(_battleLightData.LightType),
            _battleLightData.Color, parseInt(_battleLightData.Radius), _battleLightExParams);

        sb._lights._battleScene = sb;

        if (_battleLightExParams.offset[0]) { // Adjust right light source correctly by offset parameter...
            sb._lights._rightLightSource._realX = sb._lights._rightLightSource._realX + (-(_battleLightExParams.offset[0] * 2));
        }

        if ($gamePlayer._lightData) {
            sb._actorSprites.forEach(itm => {
                itm.screenX_OC = function () { return this.x; };
                itm.screenY_OC = function () { return this.y; };
                itm.isPlayer_Lights_OC = () => true;
                itm._lightData = new Light_Data(_playerLightType, _playerLightColor, _playerLightRadius * 0.5, _playerLightExParams);
            });
        }

        if (_enemyLightData) {
            sb._enemySprites.forEach(itm => {
                itm.isPlayer_Lights_OC = () => false;
                itm.screenX_OC = function () { return this.x; };
                itm.screenY_OC = function () { return this.y; };
                itm._lightData = _enemyLightData;
            });
        }

    };

    this.onMapLoaded = sm => {
        refreshEventsWithLightData();
    };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "lightBG", function (args) {
        _this.debug("Plugin command: lightBG", args);
        if ($gameMap != null) $gameMap._forcedTint_OC = true;
        if (args.color == null) {
            startTinting("#ffffffff", 0);
        } else {
            if (Number(args.fadeTime)) {
                startTinting(args.color, Number(args.fadeTime));
            } else {
                startTinting(args.color, 0);
            }
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "lightPlayer", function (args) {

        _this.debug("Plugin command: lightPlayer", args); const lda = getLightData(args);
        const ev = $gamePlayer; _playerLightType = Number(lda[0].LightType);
        _playerLightExParams = lda[1];

        if (_playerLightType != 0) {
            _playerLightRadius = Number(lda[0].Radius);
            _playerLightColor = lda[0].Color;
            ev._lightData = new Light_Data(_playerLightType, _playerLightColor, _playerLightRadius * 0.5, _playerLightExParams);
        } else {
            ev._lightData = null;
            _playerLightRadius = 0;
            _playerLightColor = '';
        }

    });

    PluginManager.registerCommand("OcRam_" + this.name, "lightFollower", function (args) {

        _this.debug("Plugin command: lightFollower", args); const lda = getLightData(args);
        const light_type = Number(lda[0].LightType);

        OcRam.followers().forEach(f => {
            if (Number(args.followerIndex) == 0 || f._memberIndex == Number(args.followerIndex)) {
                const ev = f; ev._lightData = (light_type != 0) ? new Light_Data(light_type, lda[0].Color, Number(lda[0].Radius) * 0.5, lda[1]) : null;
            }
        });

    });

    PluginManager.registerCommand("OcRam_" + this.name, "lightEventById", function (args) {

        _this.debug("Plugin command: lightEventById", args, $gameMap);
        if (!$gameMap) return; const lda = getLightData(args);
        const light_type = Number(lda[0].LightType);

        let ev = null;
        if (Number(args.eventId) == 0) {
            ev = $gameMap.getEventById(Number(this._eventId));
        } else {
            ev = $gameMap.getEventById(Number(args.eventId));
        } if (!ev) return;

        ev._lightData = (light_type != 0) ? [new Light_Data(light_type, lda[0].Color, Number(lda[0].Radius) * 0.5, lda[1])] : null;
        refreshEventsWithLightData();

    });

    PluginManager.registerCommand("OcRam_" + this.name, "lightEventsByName", function (args) {

        if (!$gameMap) return; const lda = getLightData(args);
        let events = []; events = $gameMap.getEventsByName(args.eventName + '');
        _this.debug("Plugin command: lightEventsByName", args, events);
        if (events.length < 1) return;
        const light_type = Number(lda[0].LightType);

        let ev = null;
        events.forEach(e => {
            ev = $gameMap.getEventById(e._eventId);
            ev._lightData = (light_type != 0) ? [new Light_Data(light_type, lda[0].Color, Number(lda[0].Radius) * 0.5, lda[1])] : null;
        }); refreshEventsWithLightData();

    });

    PluginManager.registerCommand("OcRam_" + this.name, "lightBattle", function (args) {

        _this.debug("Plugin command: lightBattle", args);

        const ldb = getLightData(args);

        _battleLightData.LightType = Number(ldb[0].LightType);
        _battleLightData.Radius = Number(ldb[0].Radius);
        _battleLightData.Color = (ldb[0].Color + '');

        _battleLightExParams.offset = [Number(ldb[1].offset[0]), Number(ldb[1].offset[0])];
        _battleLightExParams.degrees = Number(ldb[1].degrees);
        _battleLightExParams.angle = Number(ldb[1].angle);
        _battleLightExParams.rotation = OcRam.getFloat(ldb[1].rotation);
        _battleLightExParams.startAt = OcRam.getFloat(ldb[1].startAt);

    });

    PluginManager.registerCommand("OcRam_" + this.name, "lightEnemy", function (args) {
        _this.debug("Plugin command: lightEnemy", args);
        const ldb = getLightData(args); _enemyLightData = null;
        _enemyLightData = (Number(ldb[0].LightType) != 0) ? [new Light_Data(Number(ldb[0].LightType), ldb[0].Color, Number(ldb[0].Radius) * 0.5, ldb[1])] : null;
    });

    PluginManager.registerCommand("OcRam_" + this.name, "lightTerrain", function (args) {

        _this.debug("Plugin command: lightTerrain", args);

        const light_data = OcRam.getJSON(args.lightData);
        const tag_id = Number(args.tagId);
        const light_type = Number(light_data.LightType);
        const light_radius = Number(light_data.Radius);
        const light_color = (light_data.Color + '');
        const update_type = Number(args.updateType);

        if (light_type > -1) {
            _pluginCmdNotations[tag_id] = [light_type, light_radius, light_color, update_type];
        } else {
            _pluginCmdNotations[tag_id] = null;
        } if ($gameMap) $gameMap.initTerrainLights();

    });

}.bind(OcRam.Lights)());
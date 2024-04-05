//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Weather_System.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Weather_System", "1.09");

/*:
 * @target MZ
 * @plugindesc v1.09 Add automated Weather System to your RPG Maker MZ/MV projects!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Time_System
 * @orderBefore OcRam_Audio
 * @orderBefore OcRam_Lights
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command clearWeather
 * @text Clear Weather
 * @desc Clears weather.
 *
 * @command disableAutoWeather
 * @text Disable Auto-Weather
 * @desc Disables automated weather system.
 *
 * @command enableAutoWeather
 * @text Enable Auto-Weather
 * @desc Enables automated weather system.
 *
 * @command setCoreWeather
 * @text Set Weather
 * @desc Sets new weather effect! Built-in weathers only (use "Set Custom Weather" to set custom weathers)!
 *
 * @arg weatherId
 * @type select
 * @option None
 * @value 0
 * @option Rain
 * @value -1
 * @option Storm
 * @value -2
 * @option Snow
 * @value -3
 * @default 0
 * @text Primary Weather
 * @desc All positive numbers = Weather id (0 and below are "built-in core" weathers see instructions)
 * 
 * @arg SupportWeathers
 * @type struct<SupportWeathers>
 * @text Support Weathers
 * @desc Any support weathers to applied?
 * @default 
 *
 * @arg power
 * @type number
 * @decimals 0
 * @min 1
 * @max 9
 * @default 5
 * @text Weather Power
 * @desc Weather power for primary weather.
 *
 * @arg belowPower
 * @type number
 * @decimals 0
 * @min 1
 * @max 9
 * @default 5
 * @text Weather Below Power
 * @desc Weather power for below layer.
 *
 * @arg abovePower
 * @type number
 * @decimals 0
 * @min 1
 * @max 9
 * @default 5
 * @text Weather Above Power
 * @desc Weather power for above layer.
 * 
 * @arg transition
 * @type number
 * @decimals 0
 * @min 0
 * @default 120
 * @text Transition Time
 * @desc How many frames for weather to achieve full power?
 *
 * @arg duration
 * @type number
 * @decimals 0
 * @min 0
 * @max 9999
 * @default 0
 * @text Weather Duration
 * @desc How many in-game minutes should this weather last? (0 = Forever)
 *
 * @command randomWeather
 * @text Random Weather
 * @desc Randomize new weather effect from desired weather pool!
 *
 * @arg poolId
 * @type number
 * @decimals 0
 * @min -1
 * @default 0
 * @text Weather Pool Id
 * @desc All positive numbers = pool id (0 = From current pool(s), -1 = From any pool)
 * 
 * @command setWeather
 * @text Set Custom Weather
 * @desc Sets new weather effect! Weather data is loaded from plugin paramaters.
 *
 * @arg weatherId
 * @type number
 * @decimals 0
 * @min -10
 * @default 0
 * @text Weather Id
 * @desc All positive numbers = Weather id (0 and below are "built-in core" weathers see instructions)
 *
 * @arg power
 * @type number
 * @decimals 0
 * @min 1
 * @max 9
 * @default 5
 * @text Weather Power
 * @desc Weather power.
 *
 * @arg transition
 * @type number
 * @decimals 0
 * @min 0
 * @default 120
 * @text Transition Time
 * @desc How many frames for weather to achieve full power?
 *
 * @arg duration
 * @type number
 * @decimals 0
 * @min 0
 * @max 9999
 * @default 0
 * @text Weather Duration
 * @desc How many in-game minutes should this weather last? (0 = Forever)
 *
 * @command randomWeather
 * @text Random Weather
 * @desc Randomize new weather effect from desired weather pool!
 *
 * @arg poolId
 * @type number
 * @decimals 0
 * @min -1
 * @default 0
 * @text Weather Pool Id
 * @desc All positive numbers = pool id (0 = From current pool(s), -1 = From any pool)
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Use enhanced weather
 * @type boolean
 * @desc Do you want OcRam tuned weather effects?
 * (for built-in weather types: rain/storm/snow/fireflies)
 * @default true
 *
 * @param Max weather sprites
 * @parent Use enhanced weather
 * @type number
 * @min 5
 * @max 80
 * @desc Adjusts the maximum weather sprite multiplier (enhanced weather). More sprites needs more computing...
 * @default 40
 * 
 * @param Max weather sprites below
 * @parent Use enhanced weather
 * @type number
 * @min 5
 * @max 80
 * @desc Adjusts the maximum weather sprite multiplier (enhanced weather). More sprites needs more computing...
 * @default 20
 *
 * @param Max weather sprites above
 * @parent Use enhanced weather
 * @type number
 * @min 5
 * @max 80
 * @desc Adjusts the maximum weather sprite multiplier (enhanced weather). More sprites needs more computing...
 * @default 20
 *
 * @param Firefly particles
 * @parent Use enhanced weather
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 10
 * @desc Adjusts the max. weather sprite multiplier for fireflies (default 1). More sprites needs more computing...
 * @default 1
 *
 * @param Max firefly size
 * @parent Use enhanced weather
 * @type number
 * @min 1
 * @max 10
 * @desc Adjusts the maximum size of one firefly...
 * @default 3
 *
 * @param Firefly color
 * @parent Use enhanced weather
 * @type struct<RGBA>
 * @desc Adjusts the default color of fireflies...
 * @default {"red": "255", "green": "255", "blue": "196", "alpha": "1"}
 *
 * @param Firework particles
 * @parent Use enhanced weather
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 40
 * @desc Adjusts the max. weather sprite multiplier for fireworks (default 6). More sprites needs more computing...
 * @default 6
 *
 * @param Firework SE
 * @parent Use enhanced weather
 * @type number
 * @type file
 * @dir audio/se
 * @desc Firework sound effect. (Leave empty to have no SE)
 * @default Blow4
 *
 * @param Firework variation
 * @parent Use enhanced weather
 * @type number
 * @decimals 0
 * @min 0
 * @max 50
 * @desc Adjusts the firework pitch variation.
 * 0 = No variation at all, 50 = Full variation
 * @default 25
 *
 * @param Wind BGS
 * @parent Use enhanced weather
 * @type file
 * @dir audio/bgs
 * @desc Wind background sound. (Leave empty to have no BGS)
 * @default Wind1
 *  
 * @param Use dynamic weather
 * @type boolean
 * @desc Do you want to automate weather system? (Requires meta
 * data from tileset/map and pools/weathers to be configured)
 * @default true
 *
 * @param Clear instructions
 * @parent Use dynamic weather
 * @type struct<PluginCommand>[]
 * @desc Use to clear any supportive weather effects set by plugin commands.
 * @default []
 *
 * @param Indoors instructions
 * @parent Use dynamic weather
 * @type struct<PluginCommand>[]
 * @desc Use to hide any supportive weather effects in indoor maps.
 * @default []
 *
 * @param Weather pools
 * @parent Use dynamic weather
 * @type struct<WeatherPools>[]
 * @desc Weather pools for automatic weather effects.
 * @default ["{\"Id\":\"1\",\"Name\":\"Spring\",\"PowerBoost\":\"0\",\"MinClearTime\":\"30\",\"MaxClearTime\":\"300\",\"ClearChance\":\"50\",\"ProbableWeatherIds\":\"[\\\"0\\\"]\",\"ProbableBonus\":\"25\",\"ImprobableWeatherIds\":\"[\\\"0\\\"]\",\"ImprobablePenalty\":\"25\"}","{\"Id\":\"2\",\"Name\":\"Summer\",\"PowerBoost\":\"0\",\"MinClearTime\":\"30\",\"MaxClearTime\":\"300\",\"ClearChance\":\"50\",\"ProbableWeatherIds\":\"[\\\"0\\\"]\",\"ProbableBonus\":\"25\",\"ImprobableWeatherIds\":\"[\\\"0\\\"]\",\"ImprobablePenalty\":\"25\"}","{\"Id\":\"3\",\"Name\":\"Autumn\",\"PowerBoost\":\"1\",\"MinClearTime\":\"30\",\"MaxClearTime\":\"300\",\"ClearChance\":\"40\",\"ProbableWeatherIds\":\"[\\\"1\\\",\\\"2\\\"]\",\"ProbableBonus\":\"25\",\"ImprobableWeatherIds\":\"[]\",\"ImprobablePenalty\":\"25\"}","{\"Id\":\"4\",\"Name\":\"Winter\",\"PowerBoost\":\"0\",\"MinClearTime\":\"30\",\"MaxClearTime\":\"300\",\"ClearChance\":\"50\",\"ProbableWeatherIds\":\"[\\\"0\\\"]\",\"ProbableBonus\":\"25\",\"ImprobableWeatherIds\":\"[\\\"0\\\"]\",\"ImprobablePenalty\":\"25\"}"]
 *
 * @param Weathers
 * @parent Use dynamic weather
 * @type struct<Weather>[]
 * @desc All possible weathers.
 * @default ["{\"Id\":\"1\",\"Name\":\"Rain\",\"Type\":\"1\",\"PossiblePoolIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\"]\",\"PluginCommands\":\"[]\",\"WeatherBGS1\":\"\",\"WeatherBGS2\":\"\",\"MinDuration\":\"60\",\"MaxDuration\":\"480\"}","{\"Id\":\"2\",\"Name\":\"Storm\",\"Type\":\"2\",\"PossiblePoolIds\":\"[\\\"1\\\", \\\"2\\\", \\\"3\\\"]\",\"PluginCommands\":\"[]\",\"WeatherBGS1\":\"\",\"WeatherBGS2\":\"\",\"MinDuration\":\"30\",\"MaxDuration\":\"480\"}","{\"Id\":\"3\",\"Name\":\"Snow\",\"Type\":\"3\",\"PossiblePoolIds\":\"[\\\"4\\\"]\",\"PluginCommands\":\"[]\",\"WeatherBGS1\":\"\",\"WeatherBGS2\":\"\",\"MinDuration\":\"60\",\"MaxDuration\":\"480\"}"]
 *
 * @param Min storm power
 * @type number
 * @desc Adjusts the minimum 'storm' power where lightnings appear.
 * 0 = Always on.
 * Default: 4
 * @default 4
 * 
 * @param Lightning wait
 * @parent Min storm power
 * @type number
 * @desc Adjusts the minimum time next lightning can appear.
 * 0 = No lightnings
 * Default: 4
 * @default 4
 * 
 * @param Lightning frequency
 * @parent Min storm power
 * @type number
 * @desc Adjusts the BASE frequency of lightnings.
 * Percent chance per second with storm power 5.
 * 0 = No lightnings
 * Default: 10
 * @default 10
 *
 * @param Lightning variation
 * @parent Min storm power
 * @type number
 * @decimals 2
 * @desc Adjusts the thunder power variation (volume and pan).
 * 0 = No variation at all, 1 = Mute
 * Default: 0.25
 * @default 0.25
 * 
 * @param Thunder SE
 * @parent Min storm power
 * @type file
 * @dir audio/se
 * @desc Thunder sound effect. (Leave empty to have no SE)
 * @default Thunder9
 *
 * @param Storm BGS
 * @parent Min storm power
 * @type file
 * @dir audio/bgs
 * @desc Storm background sound. (Leave empty to have no BGS)
 * @default Storm2
 * 
 * @param Lightning CE
 * @parent Min storm power
 * @type common_event
 * @desc Run run this event when ever lightning strikes!
 * @default 0
 *
 * @param Min blizzard power
 * @type number
 * @desc Adjusts the minimum 'snow' power where it comes to blizzard.
 * Default: 5
 * @default 5
 *
 * @param Blizzard BGS
 * @parent Min blizzard power
 * @type file
 * @dir audio/bgs
 * @desc Blizzard background sound. (Leave empty to have no BGS)
 * @default Wind1
 *
 * @param Min pouring power
 * @type number
 * @desc Adjusts the minimum 'rain' power when it's 'pouring'.
 * Default: 5
 * @default 5
 *
 * @param Rain BGS
 * @parent Min pouring power
 * @type file
 * @dir audio/bgs
 * @desc Rain background sound. (Leave empty to have no BGS)
 * @default River
 *
 * @param Pouring BGS
 * @parent Min pouring power
 * @type file
 * @dir audio/bgs
 * @desc Pouring background sound. (Leave empty to have no BGS)
 * @default Storm1
 *
 * @param Battle Weather
 * @type boolean
 * @desc Inherit weather effects to battle screen?
 * @default true
 *
 * @param Disable weather indoors
 * @type boolean
 * @desc Do you want to disable weather in <indoors> tagged maps/tilesets?
 * @default true
 *
 * @param Transition time
 * @type number
 * @desc How many frames to wait for full effect.
 * Default: 300
 * @default 300
 *
 * @param Weather Variable
 * @type variable
 * @desc Variable where current weather ID is stored.
 * 0 = Not in use
 * @default 10
 * 
 * @param No flashing on indoor maps
 * @type boolean
 * @desc If enabled/true no more flash effect indoors (won't disable audio). To disable audio also use <no_lightnings> tag!
 * @default false
 * 
 * @param Indoors volume multiplier
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @desc Adjusts the BGS volume multiplier.
 * 0 = No audio at all, 1 = full volume / Default: 0.25
 * @default 0.25
 * 
 * @param Indoors pitch multiplier
 * @type number
 * @decimals 2
 * @min 0
 * @max 2
 * @desc Adjusts the BGS pitch multiplier.
 * @default 0.8
 * 
 * @param Weather captions
 * @type boolean
 * @desc This parameter is used for grouping
 * @default true
 * 
 * @param Clear caption
 * @parent Weather captions
 * @type text
 * @desc Caption for built-in clear weather
 * @default Clear
 * 
 * @param Rain caption
 * @parent Weather captions
 * @type text
 * @desc Caption for built-in rain weather
 * @default Rain
 * 
 * @param Storm caption
 * @parent Weather captions
 * @type text
 * @desc Caption for built-in storm weather
 * @default Storm
 * 
 * @param Snow caption
 * @parent Weather captions
 * @type text
 * @desc Caption for built-in snow weather
 * @default Snow
 * 
 * @param Use title weather
 * @type boolean
 * @desc Do you wish to enable title weathers?
 * @default true
 *
 * @param Weather id
 * @parent Use title weather
 * @type number
 * @min -10
 * @max 9999
 * @desc 0 = Not in use, (below 0 are "built-in" weathers see instructions) 1 and greater = custom weather.
 * @default 0
 * 
 * @param Title weather power
 * @parent Use title weather
 * @type number
 * @min 1
 * @max 9
 * @desc Weather power as in RPG Maker editor.
 * @default 5
 * 
 * @param Show weather in menu
 * @type boolean
 * @desc Show weather in menu.
 * @default true
 * 
 * @param Built-in weather duration
 * @min 0
 * @max 9999
 * @type number
 * @desc How many in-game minutes should built-in 'vanilla' weather command last? 0 = Forever
 * Default: 1440
 * @default 1440
 * 
 * @param Weather darkness
 * @type number
 * @desc How dark the strongest storm can be? Number given; is power * multiplier for dimmer opacity.
 * Default: 8
 * @default 8
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
 * Weather Extensions to default weather system. This is what this plugin does:
 *      - Weather can be inherited to battle scene
 *      - Add weathers to title screen!
 *      - Storm, blizzard and rain may have BGS (volume varied by power)
 *      - Dynamic lightnings to storm (on desired power via auto pan / pitch)
 *      - Weather BGS is DEDICATED, so it won't interfere other BGS
 *      - Choose if you want to use 'OcRam tuned' enhanced weather effects!
 *        (Also enables extra built-in weathers like "Fireflies", "Wind",
 *        "Fall", "Raise" and "Fireworks" via plugin commands and/or JS)
 *      - 3 weather layers to give more options for simultaneous weathers!
 *            Below weather:  "Wind left", "Wind right", "Fall" and "Raise"
 *            Weather (core): "Rain", "Storm" and "Snow"
 *            Top most:       "Fireflies", "Raise", "Fall", "Fireworks"
 *            (The "TOP MOST" layer is also ABOVE OcRam_Lights layer!)
 *
 * Each layer may have 1 weather effect at same time. "None" weather type will
 * clear ALL layers with given parameters. Use JS or plugin commands to set
 * desired layers to anything you want.
 *
 * NOTE: Custom weathers always clears ALL other weathers when called!
 *       Custom weathers may have also new 'support' weather effects!
 *
 * Enhanced weather sprites have individual 'depth' and 'snow' type of weather
 * has BLIZZARD mode (adjusted by parameter 'Min blizzard power')!
 *
 * You may use in-game weather command. OR you can implement your own weather
 * system with little configuring and plugin commands!
 *
 * BGS2 is reserved for built-in weathers. BGS3 is for additional custom BGS.
 *
 * NOTE: Using weather info elements requires OcRam_Time_System -plugin!
 * Get it from: https://ocram-codes.net/plugins.aspx?engine=mz
 * 
 * Usage (for CUSTOM/DYNAMIC weather system):
 *
 * 1. Setup weather pools and different type of weathers
 *
 * 2. Write to tileset/map meta which pools it is using. (If meta isn't written
 *    random weather IS NOT in use >> you have to use plugin commands)
 *    META EXAMPLE (for tileset/map): <weather-pools:1,2>
 *    NOTE: Map meta will override tileset meta
 *
 * ----------------------------------------------------------------------------
 * Notetags
 * ============================================================================
 * Lightning strikes can be heard also inside maps, but not so loud! Or you
 * can disable lightnings totally with <no_lightnings> tag!
 *
 * <no_lightnings> will also mute bgs2 and bgs3! Otherwise indoor maps are
 * decresed weather volume by 75% as default.
 *
 * <weather-pools:1,2...> map-/tileset notetag will tell weather system which
 * weather pools to use in this map.
 *
 * ----------------------------------------------------------------------------
 * Plugin commands (in MV >> RETRO plugin command builder is your friend)
 * ============================================================================
 * weather Ids:
 *     -11 = Fireworks (above normal weather and lights layer)
 *     -10 = Raise (above normal weather and lights layer)
 *     -9 = Fall (above normal weather and lights layer)
 *     -8 = Raise (behind normal weather layer)
 *     -7 = Fall (behind normal weather layer)
 *     -6 = Wind left
 *     -5 = Wind right
 *     -4 = Fireflies (above normal weather and lights layer)
 *     -3 = Snow (built-in core)
 *     -2 = Storm (built-in core)
 *     -1 = Rain (built-in core)
 *     0 = Clear
 *     > 0 = Custom weather id
 * 
 * MV example: OcRam_Weather_System/clearWeather
 * clearWeather         Clear weather and execute "Clear" instructions
 * 
 * MV example: OcRam_Weather_System/disableAutoWeather
 * disableAutoWeather   Disables automatic weather system
 * 
 * MV example: OcRam_Weather_System/enableAutoWeather
 * enableAutoWeather    Enables automatic weather system
 *
 * MV example: OcRam_Weather_System/setCoreWeather 0 -7 -4 9 320 480
 * setCoreWeather       Set weather combo with any power for any duration
 * >> weatherId         0 none, -1 rain, -2 storm, -3 snow
 * >> SupportWeathers   struct<SupportWeathers>
 * >> power             Weather power. 0 to 9
 * >> belowPower        Weather power. 0 to 9
 * >> abovePower        Weather power. 0 to 9
 * >> transition        How many frames for weather to achieve full power?
 * >> duration          How many in-game minutes? (0 = Forever)
 * 
 * MV example: OcRam_Weather_System/setWeather 1 9 320 480
 * setWeather           Set any weather with any power for any duration
 * >> weatherId         See "weather Ids"
 * >> power             Weather power. 0 to 9
 * >> transition        How many frames for weather to achieve full power?
 * >> duration          How many in-game minutes? (0 = Forever)
 * 
 * MV example: OcRam_Weather_System/randomWeather 0
 * randomWeather        Randomize new weather - NOW!
 * >> poolId            -1 = Any pool, 0 = Current, > 0 = pool id
 * 
 * ----------------------------------------------------------------------------
 * Usage - JavaScript (New methods / functions)
 * ============================================================================
 * // Returns weather object based on given id in JSON format
 * OcRam.Weather_System.getJsonWeatherById(weather_id);
 * 
 * // Returns CURRENT weather object in JSON format
 * OcRam.Weather_System.getCurrentWeather();
 * 
 * // Returns CURRENT weather name
 * OcRam.Weather_System.getWeatherName();
 * 
 * // Returns CURRENT weather duration as number
 * OcRam.Weather_System.currentWeatherDuration();
 * 
 * // Returns ALL weather objects in JSON format
 * OcRam.Weather_System.getWeathers();
 * 
 * // Returns ALL weather POOL objects in JSON format
 * OcRam.Weather_System.getWeatherPools();
 * 
 * // Executes given clear commands and set built-in weather to 'none'
 * $gameScreen.clearAllWeatherFX();
 * 
 * // Start weather by given weather id (use force parameter to force it)
 * $gameScreen.setWeatherById(weather_id, power, fade, duration, forced);
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
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2020/09/03 v1.00 - Initial release
 * 2020/09/19 v1.01 - Weather plugin instructions now work as intended!
 *                    Instant weather transitions between indoors-outdoors!
 * 2021/03/07 v1.02 - New JS OcRam.Weather_System.onNewWeather()
 *                    Optimized weather update function!
 * 2021/06/04 v1.03 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Saved weather now persist over save/load
 * 2021/10/21 v1.04 - Fixed indoors weather BGS multiplier bug.
 *                    (Credits to Foerster)
 * 2021/12/01 v1.05 - New built-in weather types "*Fireflies", "*Fireworks", 
 *                    "Wind right", "Wind left", "Fall" and "Raise"!
 *                    (customizable speed, rotation and particle bitmaps
 *                    (* fireflies and fireworks has fixed particles))
 *                    Now weathers may have totally custom conditions!!!
 *                    (only at night time/certain var must be something etc...
 *                    eval is performed only for non-forced weathers)
 *                    NEW feature added "Title weathers"!
 *                    Fixed irrelevant warnings if dynamic weather plugin
 *                    command had no arguments.
 *                    Added snowflake rotation to make it "float with wind".
 * 2022/01/23 v1.06 - OcRam.Weather_System.randomizeParticles()
 *                    (seamless map transfer calls this automatically)
 *                    <no_lightnings> will now disable also fireworks
 *                    and in addition no weather BGS at all.
 *                    BGS on "Wind" support weather now works as intended.
 *                    default_particle.png is now defined as required asset
 * 2022/04/22 v1.07 - Now game system saves whole weather object as it is!
 *                    (including support weathers and their parameters)
 *                    Lightining flashes works again after map terminate and
 *                    cleaned some double definitions in code base
 * 2022/11/11 v1.08 - Bug fix: "Cannot set property '_icon' of null"
 *                    (Credits to Pozinhofan, pf111)
 * 2022/19/11 v1.09 - HotFix when save occured without "support weathers"
 *                    Especially while <indoors> (Credits to Pozinhofan)
 *                    
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 *     Game_Interpreter.command236 (Set weather effect)
 * 
 * @requiredAssets
 * img/ocram/default_particle.png
 * @requiredAssets
 * img/ocram/weather-1.png
 * @requiredAssets
 * img/ocram/weather-2.png
 * @requiredAssets
 * img/ocram/weather-3.png
 * @requiredAssets
 * img/ocram/weather0.png
 * @requiredAssets
 * img/ocram/weather1.png
 * @requiredAssets
 * img/ocram/weather2.png
 * @requiredAssets
 * img/ocram/weather3.png
 * @requiredAssets
 * img/ocram/weather4.png
 * @requiredAssets
 * img/ocram/weather5.png
 * @requiredAssets
 * img/ocram/weather6.png
 * @requiredAssets
 * img/ocram/weather7.png
 * @requiredAssets
 * img/ocram/weather8.png
 * @requiredAssets
 * img/ocram/weather9.png
 * @requiredAssets
 * img/ocram/weather10.png
 * @requiredAssets
 * img/ocram/weather11.png
 * @requiredAssets
 * img/ocram/weather12.png
 * @requiredAssets
 * img/ocram/weather13.png
 * @requiredAssets
 * img/ocram/weather14.png
 * @requiredAssets
 * img/ocram/weather15.png
 * @requiredAssets
 * img/ocram/weather16.png
 * @requiredAssets
 * img/ocram/weather17.png
 * @requiredAssets
 * img/ocram/weather18.png
 * @requiredAssets
 * img/ocram/weather19.png
 * @requiredAssets
 * img/ocram/weather20.png
 */
/*~struct~WeatherPools:
 *
 * @param Id
 * @type number
 * @min 1
 * @desc Pool ID (use this ID on meta data and plugin commands).
 *
 * @param Name
 * @type text
 * @desc Pool name (more human readable).
 * @default My_Pool_Name
 *
 * @param PowerBoost
 * @type number
 * @min -8
 * @max 8
 * @desc Boost weather power by this number. -8 to 8
 * @default 0
 *
 * @param MinClearTime
 * @type number
 * @default 120
 * @desc Minimum duration for 1 cycle of clear weather.
 * (if no weather effects are applied)
 *
 * @param MaxClearTime
 * @type number
 * @default 240
 * @desc Maximum duration for 1 cycle of clear weather.
 * (if no weather effects are applied)
 *
 * @param ClearChance
 * @type number
 * @min 0
 * @max 100
 * @desc Adjusts the BASE chance % for clear weather on each time weather is randomized. 100 = always clear weather.
 * @default 50
 *
 * @param ProbableWeatherIds
 * @type number[]
 * @desc Weathers that are probable in this pool.
 * @default ["0"]
 *
 * @param ProbableBonus
 * @type number
 * @min 0
 * @max 100
 * @desc Adjusts the bonus to probable weathers roll. 100 = always this weather.
 * @default 25
 *
 * @param ImprobableWeatherIds
 * @type number[]
 * @desc Weathers that are probable in this pool.
 * @default ["0"]
 *
 * @param ImprobablePenalty
 * @type number
 * @min 0
 * @max 100
 * @desc Adjusts the penalty to improbable weathers roll. 100 = never this weather.
 * @default 25
 *
 */
/*~struct~PluginCommand:
 * 
 * @param Plugin
 * @type text
 * @desc Plugin name EXACTLY as it is written!
 * @default OcRam_Layers
 * 
 * @param Command
 * @type text
 * @desc Plugin command EXACTLY as it is written!
 * @default setLayer
 * 
 * @param Arguments
 * @type text
 * @desc Example: {opacity:$[(power/9) * 255]!, 
 * duration:$[transition]!,speed:$[rndNz(-3,3)]!}
 * @default {templateName:'Fog'}
 * 
 */
/*~struct~Weather:
 *
 * @param Id
 * @type number
 * @desc Weather ID.
 * @default 1
 *
 * @param Name
 * @type text
 * @desc Weather name.
 * @default Weather1
 *
 * @param Type
 * @text Primary Weather
 * @desc Weather type.
 * @type select
 * @option None
 * @value 0
 * @option Rain
 * @value 1
 * @option Storm
 * @value 2
 * @option Snow
 * @value 3
 * @default 0
 *
 * @param SupportWeathers
 * @text Support Weathers
 * @desc Any support weathers to applied?
 * @type struct<SupportWeathers>
 * @default
 *
 * @param PossiblePoolIds
 * @text Possible Pool Ids
 * @type number[]
 * @desc Possible pool Ids.
 * @default ["1", "2", "3"]
 *
 * @param PluginCommands
 * @text Plugin Commands
 * @type struct<PluginCommand>[]
 * @desc Use to have supportive weather effects.
 * @default []
 *
 * @param WeatherBGS1
 * @text Weather BGS1
 * @type file
 * @dir audio/bgs
 * @desc Play this BGS on dedicated channel 1. NOTE: This channel is also used by CORE weathers.
 *
 * @param WeatherBGS2
 * @text Weather BGS2
 * @type file
 * @dir audio/bgs
 * @desc Play this BGS on dedicated channel 2.
 *
 * @param MinDuration
 * @text Min Duration
 * @type number
 * @desc Minimum duration of this weather.
 * @default 60
 *
 * @param MaxDuration
 * @text Max Duration
 * @type number
 * @desc Maximum duration of this weather.
 * @default 480
 * 
 * @param WeatherCondition
 * @text Weather Condition
 * @type text
 * @desc Weather condition eval (only non-forced weathers). Example "only at night": OcRam.Time_System.dayPhase() == 1
 * @default 
 * 
 * @param ConditionAction
 * @text Condition Action
 * @type select
 * @option Clear Weather
 * @value 0
 * @option Randomize new weather
 * @value 1
 * @desc If condition is NOT met choose action.
 * @default 0
 *
 */
/*~struct~RGBA:
 *
 * @param red
 * @type number
 * @min 0
 * @max 255
 * @desc Amount of red color.
 * @text Red
 * @default 255
 *
 * @param green
 * @type number
 * @min 0
 * @max 255
 * @desc Amount of green color.
 * @text Green
 * @default 255
 *
 * @param blue
 * @type number
 * @min 0
 * @max 255
 * @desc Amount of blue color.
 * @text Blue
 * @default 255
 *
 * @param alpha
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @desc Amount of opacity color.
 * @text Opacity
 * @default 1
 */
/*~struct~SupportWeathers:
 * 
 * @param TypeBelow
 * @text Weather Below
 * @desc Secondary weather type (below core weather). (supportive effect)
 * @type select
 * @option None
 * @value 0
 * @option Wind right
 * @value 5
 * @option Wind left
 * @value 6
 * @option Fall
 * @value 7
 * @option Raise
 * @value 8
 * @default 0
 * 
 * @param BelowSpeed
 * @text - Below Speed
 * @desc Particle move speed. (1.00 = Normal)
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 2
 * @default 1.00
 * 
 * @param BelowRotate
 * @text - Below Rotate
 * @desc Particle rotate speed. (1.00 = Normal, 0 = Disabled)
 * @type number
 * @decimals 2
 * @min -3
 * @max 3
 * @default 1.00
 * 
 * @param BelowParticle
 * @text - Below Particle
 * @desc Particle image name in ./img/ocram -folder.
 * @type text
 * @default default_particle
 * 
 * @param BelowChance
 * @text - Below Chance
 * @desc Is support weather always applied or is it random chance?
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 1.00
 * @default 1
 *
 * @param BelowDynamic
 * @text - Dynamic
 * @desc Does weather power effect speed and rotation?
 * @type boolean
 * @default true
 * 
 * @param TypeAbove
 * @text Weather Above
 * @desc Secondary weather type (above core weather and OcRam_Lights). (supportive effect)
 * @type select
 * @option None
 * @value 0
 * @option Fireflies
 * @value 4
 * @option Fall (above)
 * @value 9
 * @option Raise (above)
 * @value 10
 * @option Fireworks
 * @value 11
 * @default 0
 *
 * @param AboveSpeed
 * @text - Above Speed
 * @desc Particle move speed. (1.00 = Normal)
 * NOTE: Fireflies/Fireworks are fixed.
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 3
 * @default 1.00
 *
 * @param AboveRotate
 * @text - Above Rotate
 * @desc Particle rotate speed. (1.00 = Normal, 0 = Disabled)
 * NOTE: Fireflies/Fireworks are fixed.
 * @type number
 * @decimals 2
 * @min 0
 * @max 3
 * @default 1.00
 *
 * @param AboveParticle
 * @text - Above Particle
 * @desc Particle image name in ./img/ocram -folder.
 * NOTE: Fireflies/Fireworks are fixed.
 * @type text
 * @default default_particle
 *
 * @param AboveChance
 * @text - Above Chance
 * @desc Is support weather always applied or is it random chance?
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 1.00
 * @default 1
 *
 * @param AboveDynamic
 * @text - Dynamic
 * @desc Does weather power effect speed and rotation?
 * @type boolean
 * @default true
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

    const _useTitleWeather = OcRam.getBoolean(this.parameters['Use title weather']);
    let _titleWeather = Number(this.parameters['Weather id']);
    let _titleWeatherPower = Number(this.parameters['Title weather power']);
    if (Imported.OcRam_Title_Shuffler) {
        _titleWeather = {}; _titleWeatherPower = 0;
    } else { // Simultate OcRam_Title_Shuffler :)
        let tmp = {};
        tmp.weatherId = _titleWeather;
        tmp.customWeatherId = _titleWeather > 0 ? _titleWeather : 0;
        _titleWeather = tmp;
    } const _battleWeather = OcRam.getBoolean(this.parameters['Battle Weather']);
    const _minStormPower = Number(this.parameters['Min storm power']);
    const _lightningWait = Number(this.parameters['Lightning wait']);
    const _lightningFrequency = Number(this.parameters['Lightning frequency']);
    const _lightningCE = Number(this.parameters['Lightning CE'] || 0);
    const _minBlizzardPower = Number(this.parameters['Min blizzard power']);
    const _blizzardBGS = String(this.parameters['Blizzard BGS']);
    const _lightningVariation = parseFloat(this.parameters['Lightning variation']);
    const _fireworkVariation = Number(this.parameters['Firework variation'] || 0);
    const _thunderSE = String(this.parameters['Thunder SE']);
    const _fireworkSE = String(this.parameters['Firework SE']);
    const _pouringBGS = String(this.parameters['Pouring BGS']);
    const _stormBGS = String(this.parameters['Storm BGS']);
    const _windBGS = String(this.parameters['Wind BGS']);
    const _weatherVarId = Number(this.parameters['Weather Variable']);
    const _transitionTime = Number(this.parameters['Transition time']);
    const _maxWeatherSprites = Number(this.parameters['Max weather sprites'] || 40);
    const _maxWeatherSpritesAbove = Number(this.parameters['Max weather sprites above'] || 20);
    const _maxWeatherSpritesBelow = Number(this.parameters['Max weather sprites below'] || 20);
    const _fireworkParticleMultiplier = OcRam.getFloat(this.parameters['Firework particles'] || 6);
    const _fireflyParticleMultiplier = OcRam.getFloat(this.parameters['Firefly particles'] || 1);

    const _minPouringPower = Number(this.parameters['Min pouring power']);
    const _rainBGS = String(this.parameters['Rain BGS']);
    const _weatherName0 = String(this.parameters['Clear caption']);
    const _weatherName1 = String(this.parameters['Rain caption']);
    const _weatherName2 = String(this.parameters['Storm caption']);
    const _weatherName3 = String(this.parameters['Snow caption']);

    const _useEnhancedWeather = OcRam.getBoolean(this.parameters['Use enhanced weather']);
    let _useDynamicWeather = OcRam.getBoolean(this.parameters['Use dynamic weather']);
    const _disableWeatherIndoors = OcRam.getBoolean(this.parameters['Disable weather indoors']);
    const _clearInstructions = OcRam.getJSON(this.parameters['Clear instructions']);
    const _indoorsInstructions = OcRam.getJSON(this.parameters['Indoors instructions']);
    const _jsonPools = OcRam.getJSONArray(this.parameters['Weather pools']);
    const _jsonWeathers = OcRam.getJSONArray(this.parameters['Weathers']);
    const _showWeatherInMenu = OcRam.getBoolean(this.parameters['Show weather in menu']);
    let _builtInWeatherDuration = Number(this.parameters['Built-in weather duration']);
    const _weatherDarkness = Number(this.parameters['Weather darkness']);
    const _indoorsVolumeMultiplier = parseFloat(this.parameters['Indoors volume multiplier']);
    const _indoorsPitchMultiplier = parseFloat(this.parameters['Indoors pitch multiplier']);
    const _noFlashIndoors = OcRam.getBoolean(this.parameters['No flashing on indoor maps']);
    let _fireflyMaxSize = Number(this.parameters['Max firefly size']) || 3;
    const _fireflyColorParam = OcRam.getJSON(this.parameters['Firefly color']);

    const _simoultaneusFireworks = 10;

    let _fireflyColor = _fireflyColorParam ? [
        Number(_fireflyColorParam.red),
        Number(_fireflyColorParam.green),
        Number(_fireflyColorParam.blue),
        OcRam.getFloat(_fireflyColorParam.alpha)
    ] : [255, 255, 196, 1];

    const _altMenu = Window_MenuCommand.prototype.numVisibleRows ? true : false;

    if (_weatherDarkness < 1) _weatherDarkness = 8;
    _jsonWeathers.push({ Id: 0, Name: _weatherName0, PossiblePoolIds: "[]", Type: 0, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -1, Name: _weatherName1, PossiblePoolIds: "[]", Type: 1, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -2, Name: _weatherName2, PossiblePoolIds: "[]", Type: 2, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -3, Name: _weatherName3, PossiblePoolIds: "[]", Type: 3, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -4, Name: _weatherName0, PossiblePoolIds: "[]", Type: 4, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -5, Name: _weatherName0, PossiblePoolIds: "[]", Type: 5, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -6, Name: _weatherName0, PossiblePoolIds: "[]", Type: 6, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -7, Name: _weatherName0, PossiblePoolIds: "[]", Type: 7, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -8, Name: _weatherName0, PossiblePoolIds: "[]", Type: 8, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -9, Name: _weatherName0, PossiblePoolIds: "[]", Type: 9, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -10, Name: _weatherName0, PossiblePoolIds: "[]", Type: 10, MinDuration: 60, MaxDuration: 360 });
    _jsonWeathers.push({ Id: -11, Name: _weatherName0, PossiblePoolIds: "[]", Type: 11, MinDuration: 60, MaxDuration: 360 });

    this.debug("Weather pools (" + _jsonPools.length + "):", _jsonPools);
    this.debug("Weathers (" + _jsonWeathers.length + "):", _jsonWeathers);

    let _gameSysLoading = false;
    let _isIndoors = false;
    let _noLightnings = false;
    let _weatherDurationCounter = 0;
    let _possibleWeatherPools = [];
    let _possibleWeathers = [];
    let _currentRndPool = null;
    let _currentRndWeather = null;
    let _prevSeason = 0;
    let _useTimeSystem = false;

    let _currentBelowParticle = "default_particle";
    let _currentAboveParticle = "default_particle";

    // Do 'storm flashing' with given parameters.
    let _framesPassed = 0; let _lightningTimer = 0;
    let _prevWeather = _titleWeather; let _prevWeatherPower = _titleWeatherPower;

    const _screenCenterXY = [0, 0];
    let _maxDistance = 0;

    // REGULATE POOLS
    _jsonPools.forEach(t => {
        t.Id = Number(t.Id);
        t.ClearChance = Number(t.ClearChance);
        t.ImprobablePenalty = Number(t.ImprobablePenalty);
        t.MaxClearTime = Number(t.MaxClearTime);
        t.MinClearTime = Number(t.MinClearTime);
        t.PowerBoost = Number(t.PowerBoost);
        t.ProbableBonus = Number(t.ProbableBonus);
        t.ImprobableWeatherIds = eval((t.ImprobableWeatherIds).replace(/\"/gi, ""));
        t.ProbableWeatherIds = eval((t.ProbableWeatherIds).replace(/\"/gi, ""));
    });

    // REGULATE WEATHERS
    const regulateSupportWeathers = sw => {
        const tmp = sw ? OcRam.getJSON(sw) : {};
        if (!tmp) return sw;
        if (!sw) {
            tmp.TypeAbove = 0; tmp.TypeBelow = 0;
            tmp.AboveSpeed = 0.01; tmp.BelowSpeed = 0.01;
            tmp.AboveRotate = 0; tmp.BelowRotate = 0;
            tmp.AboveChance = 1; tmp.BelowChance = 1;
            tmp.AboveParticle = "default_particle";
            tmp.BelowParticle = "default_particle";
        } else {
            tmp.TypeAbove = Number(tmp.TypeAbove);
            tmp.TypeBelow = Number(tmp.TypeBelow);
            tmp.AboveSpeed = OcRam.getFloat(tmp.AboveSpeed);
            tmp.BelowSpeed = OcRam.getFloat(tmp.BelowSpeed);
            tmp.AboveRotate = OcRam.getFloat(tmp.AboveRotate);
            tmp.BelowRotate = OcRam.getFloat(tmp.BelowRotate);
            tmp.AboveChance = OcRam.getFloat(tmp.AboveChance);
            tmp.BelowChance = OcRam.getFloat(tmp.BelowChance);
            tmp.AboveParticle = "" + tmp.AboveParticle;
            tmp.BelowParticle = "" + tmp.BelowParticle;
        } tmp.AbovePower = 0; tmp.BelowPower = 0; return tmp;
    }; _jsonWeathers.forEach(t => {
        t.Id = Number(t.Id);
        t.Type = Number(t.Type);
        t.SupportWeathers = regulateSupportWeathers(t.SupportWeathers);
        t.MaxDuration = Number(t.MaxDuration);
        t.MinDuration = Number(t.MinDuration);
        t.PossiblePoolIds = eval((t.PossiblePoolIds).replace(/\"/gi, ""));
        t.PluginCommands = eval(t.PluginCommands);
        // t._icon = t._icon; // Bitmap loaded later
    });

    const updateAllWeatherLayers = (below, weather, top) => {
        top.type = $gameScreen.weatherAboveType();
        top.power = $gameScreen.weatherAbovePower();
        below.type = $gameScreen.weatherBelowType();
        below.power = $gameScreen.weatherBelowPower();
        weather.type = $gameScreen.weatherType();
        weather.power = $gameScreen.weatherPower();
    };

    const isParticleOffScreen = particle => { // For smooth transition between wind to fall/raise
        if (particle.x > Graphics.width + 100) { particle._rbDir = 6; return true; }
        if (particle.y > Graphics.height + 100) { particle._rbDir = 2; return true; }
        if (particle.x < -100) { particle._rbDir = 4; return true; }
        if (particle.y < -100) { particle._rbDir = 8; return true; }
        if (particle._rbDir) particle._rbDir = 0; return false;
    }; const isParticleOffScreen2 = particle => { // For smooth transition between wind to fall/raise
        if (particle.x > Graphics.width + 100) { particle._rbDir2 = 6; return true; }
        if (particle.y > Graphics.height + 100) { particle._rbDir2 = 2; return true; }
        if (particle.x < -100) { particle._rbDir2 = 4; return true; }
        if (particle.y < -100) { particle._rbDir2 = 8; return true; }
        if (particle._rbDir2) particle._rbDir2 = 0; return false;
    };

    // For weather effects to check looping map loop point
    // Let's assume "no looping map" (much faster reborn func)
    let _mapMW = 0; let _mapMH = 0;
    this.wasLoopPoint = () => false;

    // ------------------------------------------------------------------------------
    // OcRam - Enhanced weather overrides
    // ==============================================================================
    // Do all possible pre-calculations to optimize per frame updates!
    //const _maxDepth = 20;
    const _pi16 = Math.PI / 16;
    const _pi8 = Math.PI / 8;
    const _preCalcSnowSin = 3 * Math.sin(_pi16);
    const _preCalcSnowCos = 2 * Math.cos(_pi16);
    const _preCalcBlizzardSin = 3 * Math.sin(_pi8);
    const _preCalcBlizzardCos = 2 * Math.cos(_pi8);
    const _preCalcRainSin = 5 * Math.sin(_pi16);
    const _preCalcRainCos = 5 * Math.cos(_pi16);
    const _preCalcStormSin = 6 * Math.sin(_pi8);
    const _preCalcStormCos = 6 * Math.cos(_pi8);

    Sprite.prototype.checkReborn = function (weather) {
        if (this.opacity < 40) weather._rebornSprite(this);
    }; const _rebornFunc = Sprite.prototype.checkReborn;
    Sprite.prototype.changeDir = function () { };

    if (_useEnhancedWeather) {

        this.debug("USING ENHANCED WEATHER!", _useEnhancedWeather);

        const OC_Weather_initialize = Weather.prototype.initialize;
        Weather.prototype.initialize = function () {
            OC_Weather_initialize.call(this);
            this._maxWeatherSprites = _maxWeatherSprites;
        };

        // Create bitmaps (pre-drawn and -calculated)
        Weather.prototype._createBitmaps = function () {

            let tmp_depth = 0;

            this._rainBitmap = [];
            for (let i = 0; i < 3; i++) {
                tmp_depth = 0.8 + ((i + 1) * 0.25); // pre-calc speed multiplier
                this._rainBitmap.push(new Bitmap(1, 20 + (i * 10)));
                this._rainBitmap[i].fillAll("white");
                this._rainBitmap[i]._depth_OC = tmp_depth;
            } this._rainBitmap.destroy = function () {
                this.forEach(bm => { bm.destroy(); });
            };

            this._stormBitmap = [];
            for (let i = 0; i < 3; i++) {
                tmp_depth = 0.8 + ((i + 1) * 0.25); // pre-calc speed multiplier
                this._stormBitmap.push(new Bitmap(2, 40 + (i * 15)));
                this._stormBitmap[i].fillAll("white");
                this._stormBitmap[i]._depth_OC = tmp_depth;
            } this._stormBitmap.destroy = function () {
                this.forEach(bm => { bm.destroy(); });
            };

            this._snowBitmap = [];
            for (let i = 0; i < 3; i++) {
                tmp_depth = (i + 2);
                this._snowBitmap.push(new Bitmap(tmp_depth * 4, tmp_depth * 4));
                this._snowBitmap[i].drawCircle(tmp_depth, tmp_depth, tmp_depth, "white");
                this._snowBitmap[i]._depth_OC = tmp_depth;
            } this._snowBitmap.destroy = function () {
                this.forEach(bm => { bm.destroy(); });
            };

        };

        Weather.prototype._updateAllSprites = function () { // Override
            if (OcRam.isIndoors()) return;
            const maxSprites = this.type == "fireworks" ?
                _maxWeatherSpritesAbove * _fireworkParticleMultiplier * _simoultaneusFireworks :
                Math.floor(this.power * this._maxWeatherSprites);
            while (this._sprites.length < maxSprites) {
                this._addSprite();
            }
            while (this._sprites.length > maxSprites) {
                this._removeSprite();
            } if (OcRam.Map_Transfer.isTransfering()) return;
            this._sprites.forEach(function (sprite) {
                this._updateSprite(sprite);
                sprite.x = sprite.ax - this.origin.x;
                sprite.y = sprite.ay - this.origin.y;
            }, this);
        };

        // Override totally ...no need to switch anything >> Everything is pre-calculated!
        Weather.prototype._updateSprite = function (sprite) {
            sprite.ax -= sprite._horizontalSpeed;
            sprite.ay += sprite._verticalSpeed;
            sprite.opacity -= sprite._fadeSubtractor;
            sprite.changeDir(); sprite.checkReborn(this);
        };

        Weather.prototype._updateDimmer = function () { // Make dimmer little bit darker
            switch (this.type) {
                case "rain": case "storm": case "snow":
                    this._dimmerSprite.opacity = Math.floor(this.power * _weatherDarkness); break;
                default: this._dimmerSprite.opacity = 0; break;
            }
        };

        // We need this to have _fadeSubtractor initialized...
        const OC_Weather_addSprite = Weather.prototype._addSprite;
        Weather.prototype._addSprite = function () {
            OC_Weather_addSprite.call(this);
            this._sprites[this._sprites.length - 1]._fadeSubtractor = 255;
        };

        Weather.prototype._rebornSprite = function (sprite) {

            let x_adjust = 0; const bm_index = Math.randomInt(3);

            switch (this.type) {
                case "rain": sprite.changeDir = function () { }; sprite.checkReborn = _rebornFunc;
                    sprite.bitmap = this._rainBitmap[bm_index];
                    sprite._depth_OC = this._rainBitmap[bm_index]._depth_OC;
                    sprite.rotation = _pi16;
                    sprite._verticalSpeed = _preCalcRainCos * sprite._depth_OC;
                    sprite._horizontalSpeed = _preCalcRainSin * sprite._depth_OC;
                    sprite.opacity = 120; sprite._fadeSubtractor = 6; break;
                case "storm": sprite.changeDir = function () { }; sprite.checkReborn = _rebornFunc;
                    sprite.bitmap = this._stormBitmap[bm_index];
                    sprite._depth_OC = this._stormBitmap[bm_index]._depth_OC;
                    sprite.rotation = _pi8;
                    sprite._verticalSpeed = _preCalcStormCos * sprite._depth_OC;
                    sprite._horizontalSpeed = _preCalcStormSin * sprite._depth_OC;
                    sprite.opacity = 80; sprite._fadeSubtractor = 4; break;
                case "snow": sprite.changeDir = function () {
                        this.rotation -= this._rotator;
                    }; sprite.checkReborn = _rebornFunc;
                    sprite.bitmap = this._snowBitmap[bm_index];
                    sprite._depth_OC = this._snowBitmap[bm_index]._depth_OC;
                    sprite._verticalSpeed = _preCalcBlizzardCos + Math.randomInt(3);
                    sprite._rotator = ((5 + Math.randomInt(3)) * 0.015);
                    if (this.power >= _minBlizzardPower) {
                        sprite.rotation = _pi8; x_adjust = 140;
                        sprite._horizontalSpeed = _preCalcBlizzardSin + Math.randomInt(2) + 4;
                        sprite._fadeSubtractor = 4;
                    } else {
                        sprite.rotation = _pi16;
                        sprite._verticalSpeed = _preCalcSnowCos;
                        sprite._horizontalSpeed = _preCalcSnowSin + (Math.randomInt(2) - 1);
                        sprite._fadeSubtractor = 1;
                    } sprite.opacity = 180; break;
            }

            sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x + x_adjust;
            sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
            sprite.opacity += Math.randomInt(60);

        };

        this.extend(Spriteset_Map, "createWeather", function () {
            this._weatherBelow = new WeatherBelow();
            this.addChild(this._weatherBelow);
            _this["Spriteset_Map_createWeather"].apply(this, arguments);
            if (Imported.OcRam_Lights) {
                this._weatherAbove = new WeatherAbove();
                requestAnimationFrame(() => {
                    this.addChild(this._weatherAbove);
                });
            } else {
                this._weatherAbove = new WeatherAbove();
                this.addChild(this._weatherAbove);
            }
        });

        Spriteset_Map.prototype.updateWeather = function () { // Override
            updateAllWeatherLayers(this._weatherBelow, this._weather, this._weatherAbove);
            const dx = $gameMap.displayX() * $gameMap.tileWidth();
            const dy = $gameMap.displayY() * $gameMap.tileHeight();
            this._weather.origin.x = dx; this._weather.origin.y = dy;
            this._weatherBelow.origin.x = dx; this._weatherBelow.origin.y = dy;
            this._weatherAbove.origin.x = dx; this._weatherAbove.origin.y = dy;
        };

        Weather.prototype.updateFlash = function () { }; // Update flash does nothing by default...

        Weather.prototype.updateFlashStorm = function () {
            _framesPassed++;
            if (_framesPassed > 60) {
                _framesPassed = 0; _lightningTimer++;
                if (_lightningTimer > _lightningWait) {
                    if (100 * Math.random() < _lightningFrequency + (this.power - 5)) {
                        if (_noLightnings) {
                            _lightningTimer = 0;
                        } else {
                            if (_lightningCE) OcRam.runCE(_lightningCE);
                            let variation = 1 - _lightningVariation; variation += _lightningVariation * Math.random();
                            if (variation < 0) { variation = 0; } if (variation > 1) { variation = 1; }
                            if (OcRam.isIndoors()) {
                                if (!_noFlashIndoors) $gameScreen.startFlash([255, 255, 255, 196 * variation], [60]); // startFlash: command224
                                const this_se = { name: _thunderSE, volume: 40 * variation, pitch: 60, pan: 0, pos: 0 };
                                AudioManager.playSe(this_se); _lightningTimer = 0; // playSe: command250
                            } else {
                                $gameScreen.startFlash([255, 255, 255, 255 * variation], [60]); // startFlash: command224
                                const this_se = { name: _thunderSE, volume: 90 * variation, pitch: 60, pan: 0, pos: 0 };
                                AudioManager.playSe(this_se); _lightningTimer = 0; // playSe: command250
                            }
                        }
                    }
                }
            }
        };

        Game_Screen.prototype.changeWeather = function (type, power, duration) { // Override
            const w = _this.getWeatherLayer(); if (!w) {
                console.warn("No _weather layer?"); return;
            } // No weather layer huh?!?
            w._maxWeatherSprites = _maxWeatherSprites;
            if (type !== "none" || duration === 0) {
                this._weatherType = type;
            } if (type == "storm") {
                if (power >= _minStormPower) {
                    w.updateFlash = function () { // Ok we got lightning storm now!
                        this.updateFlashStorm();
                    };
                } else { w.updateFlash = () => { }; }
            } else {
                w.updateFlash = () => { };
            } this._weatherPowerTarget = type === "none" ? 0 : power;
            this._weatherDuration = duration;
            if (duration === 0) {
                this._weatherPower = this._weatherPowerTarget;
            }
        };

    } else { // No enhanced weather fx, but weather effects indoors should be still hidden...
        const OC_Weather_updateAllSprites = Weather.prototype._updateAllSprites;
        Weather.prototype._updateAllSprites = function () {
            if (OcRam.isIndoors()) return;
            OC_Weather_updateAllSprites.call(this);
        };
    }

    // ------------------------------------------------------------------------------
    // OcRam - Enhanced weather NEW weather layers...
    // ==============================================================================
    class WeatherBelow extends Weather {

        constructor() {
            super(); if (!_useEnhancedWeather) this.opacity = 0;
            this._maxWeatherSprites = _maxWeatherSpritesBelow;
            this._particleSpeed = 1; this._particleRotation = 1;
        }

        _rebornSprite(sprite) {

            const bm_index = Math.randomInt(3);

            switch (this.type) {
                case "wind_left": sprite.bitmap = this._particle[bm_index]; sprite.rotation = -90;
                    switch (sprite._rbDir2) {
                        case 2: sprite.ay = this.origin.y - 20; break;
                        case 4: sprite.ax = Graphics.width + this.origin.x + 20; break;
                        case 6: sprite.ax = this.origin.x - 20; break;
                        case 8: sprite.ay = Graphics.height + this.origin.y + 20; break;
                        default:
                            sprite.ay = (Math.randomInt(Graphics.height + 200) - 100) + this.origin.y;
                            sprite.ax = Math.randomInt(Graphics.width) + this.origin.x;
                    } sprite.changeDir = function () {
                        this.rotation -= this._rotator;
                    }; sprite.checkReborn = function (weather) {
                        if (isParticleOffScreen2(this)) {
                            if (!_this.wasLoopPoint(weather, this)) weather._rebornSprite(this);
                        }
                    }; sprite._verticalSpeed = (0.5 + Math.random());
                    sprite._horizontalSpeed = (_preCalcBlizzardSin + Math.randomInt(3) + 2) * this._particleSpeed;
                    sprite._rotator = ((3 + Math.randomInt(7)) * 0.01) * this._particleRotation;
                    sprite._fadeSubtractor = 0; sprite.opacity = 255; break;
                case "wind_right": sprite.bitmap = this._particle[bm_index]; sprite.rotation = 90;
                    switch (sprite._rbDir2) {
                        case 2: sprite.ay = this.origin.y - 40; break;
                        case 4: sprite.ax = Graphics.width + this.origin.x + 40; break;
                        case 6: sprite.ax = this.origin.x - 40; break;
                        case 8: sprite.ay = Graphics.height + this.origin.y + 40; break;
                        default:
                            sprite.ay = (Math.randomInt(Graphics.height + 200) - 100) + this.origin.y;
                            sprite.ax = Math.randomInt(Graphics.width) + this.origin.x;
                    } sprite.changeDir = function () {
                        this.rotation -= this._rotator;
                    }; sprite.checkReborn = function (weather) {
                        if (isParticleOffScreen2(this)) {
                            if (!_this.wasLoopPoint(weather, this)) weather._rebornSprite(this);
                        }
                    }; sprite._verticalSpeed = (0.5 + Math.random());
                    sprite._horizontalSpeed = -(_preCalcBlizzardSin + Math.randomInt(3) + 2) * this._particleSpeed;
                    sprite._rotator = ((3 + Math.randomInt(7)) * 0.01) * this._particleRotation;
                    sprite._fadeSubtractor = 0; sprite.opacity = 255; break;
                case "fall":
                    sprite.bitmap = this._particle[bm_index]; sprite.rotation = 180;
                    switch (sprite._rbDir) {
                        case 2: sprite.ay = this.origin.y - 40; break;
                        case 4: sprite.ax = Graphics.width + this.origin.x + 40; break;
                        case 6: sprite.ax = this.origin.x - 40; break;
                        case 8: sprite.ay = Graphics.height + this.origin.y + 40; break;
                        default:
                            sprite.ay = Math.randomInt(Graphics.height + 200) - 100 + this.origin.y;
                            sprite.ax = Math.randomInt(Graphics.width) + this.origin.x;
                            break;
                    } sprite.changeDir = function () {
                        this.rotation -= this._rotator;
                    }; sprite.checkReborn = function (weather) {
                        if (isParticleOffScreen(this)) {
                            if (!_this.wasLoopPoint(weather, this)) weather._rebornSprite(this);
                        }
                    }; sprite._verticalSpeed = (1.5 + Math.random()) * this._particleSpeed
                    sprite._horizontalSpeed = Math.random() - 0.5;
                    sprite._rotator = ((1 + Math.randomInt(4)) * 0.01) * this._particleRotation;
                    sprite._fadeSubtractor = 0; sprite.opacity = 255; break;
                case "raise":
                    sprite.bitmap = this._particle[bm_index]; sprite.rotation = 0;
                    switch (sprite._rbDir) {
                        case 2: sprite.ay = this.origin.y - 40; break;
                        case 4: sprite.ax = Graphics.width + this.origin.x + 40; break;
                        case 6: sprite.ax = this.origin.x - 40; break;
                        case 8: sprite.ay = Graphics.height + this.origin.y + 40; break;
                        default:
                            sprite.ay = Math.randomInt(Graphics.height + 200) - 100 + this.origin.y;
                            sprite.ax = Math.randomInt(Graphics.width) + this.origin.x;
                            break;
                    } sprite.changeDir = function () {
                        this.rotation -= this._rotator;
                    }; sprite.checkReborn = function (weather) {
                        if (isParticleOffScreen(this)) {
                            if (!_this.wasLoopPoint(weather, this)) weather._rebornSprite(this);
                        }
                    }; sprite._verticalSpeed = -(1.5 + Math.random()) * this._particleSpeed
                    sprite._horizontalSpeed = Math.random() - 0.5;
                    sprite._rotator = ((1 + Math.randomInt(4)) * 0.01) * this._particleRotation;
                    sprite._fadeSubtractor = 0; sprite.opacity = 255; break;
            }

        }

        _createBitmaps() {
            this._particle = []; this._particle.push(new Bitmap(1, 1));
            this._particle.push(new Bitmap(1, 1)); this._particle.push(new Bitmap(1, 1));
            if (_useEnhancedWeather) this.setParticle(1, 1, _currentBelowParticle, 0);
        }

        destroy() {
            const options = { children: true, texture: true };
            PIXI.Container.prototype.destroy.call(this, options);
        }

        setParticle(speed, rotation, particle, power, cb) {
            if (power) {
                this._particleSpeed = speed * (0.8 + (power * 0.04));
                this._particleRotation = rotation * (0.8 + (power * 0.04));
            } else {
                this._particleSpeed = speed;
                this._particleRotation = rotation;
            } _currentBelowParticle = particle;
            ImageManager.loadOcRamBitmap(_currentBelowParticle, 0, bitmap => {
                this._particle[0] = bitmap;
                const w = bitmap.width; const h = bitmap.height;
                let nw = (w * 0.8) | 0;
                let nh = (h * 0.8) | 0;
                const bm1 = new Bitmap(nw, nh);
                bm1.blt(bitmap, 0, 0, w, h, 0, 0, nw, nh);
                this._particle[1] = bm1;
                nw *= 0.8; nh *= 0.8;
                const bm2 = new Bitmap(nw, nh);
                bm2.blt(bitmap, 0, 0, w, h, 0, 0, nw, nh);
                this._particle[2] = bm2;
                if (cb) cb.call($gameScreen);
            }); this._sprites.forEach(sprite => {
                sprite._rbDir = 0; sprite._rbDir2 = 0;
            });
        }

    }

    class WeatherAbove extends Weather {

        constructor() {
            super(); if (!_useEnhancedWeather) this.opacity = 0;
            this._maxWeatherSprites = _maxWeatherSpritesAbove;
            this._fireworkCounter = 0; this._fwRebornStart = 0;
            this._fwRebornCount = 0;
            this._fwRebornEnd = _maxWeatherSpritesAbove * _fireworkParticleMultiplier;
        }

        checkFireworks() {
            
            if (this.type != "fireworks" || _noLightnings) return;

            if (this._fireworkCounter > 0) {
                this._fireworkCounter--;
            } else {
                const ax = Math.randomInt(Graphics.width + 120) - 60 + this.origin.x;
                const ay = Math.randomInt((Graphics.height * (this._btScene ? 0.333 : 1)) + 120) - 60 + this.origin.y;
                
                this._fireworkCounter = 100 - (10 * this.power) + Math.randomInt(40);
                this._fwRebornCount = this._maxWeatherSprites * _fireworkParticleMultiplier;
                this._fwRebornStart += this._fwRebornCount;
                this._fwRebornEnd = this._fwRebornStart + this._fwRebornCount;
                if (this._fwRebornStart >= this._fwRebornCount * _simoultaneusFireworks) this._fwRebornStart = 0;
                this._fireworkXY = [ax, ay]; this._fwRebornCount = 10 + this._fwRebornCount * Math.random();
                
                requestAnimationFrame(() => {
                    this._fireworkXY = null;
                });

                const dx = Math.abs(_screenCenterXY[0] - (ax - this.origin.x));
                const dy = Math.abs(_screenCenterXY[1] - (ay - this.origin.y));
                let se_multiplier = 1 - ((dx + dy) / _maxDistance) + (0.25 * Math.random());
                if (se_multiplier > 1) se_multiplier = 1;
                if (se_multiplier < 0.15) se_multiplier = 0.15;

                AudioManager.playSe({
                    name: _fireworkSE,
                    volume: (100 * (_noLightnings ? 0 : se_multiplier)) * (OcRam.isIndoors() ? _indoorsVolumeMultiplier : 1),
                    pitch: 100 + (((_fireworkVariation * 2) * Math.random()) - _fireworkVariation),
                    pan: 0, pos: 0
                });

                let c = []; let cc = 0;
                if (Math.random() > 0.5) {
                    if (Math.random() < 0.2) {
                        c.push(0); c.push(6); c.push(12);
                    } else {
                        cc = Math.randomInt(6); c.push(cc); c.push(cc + 6); c.push(cc + 12);
                    }
                } else {
                    if (Math.random() > 0.4) {
                        if (Math.random() < 0.2) {
                            c.push(0); c.push(6); c.push(12);
                            c.push(1); c.push(7); c.push(13);
                        } else {
                            cc = Math.randomInt(6); c.push(cc); c.push(cc + 6); c.push(cc + 12);
                            cc = Math.randomInt(6); c.push(cc); c.push(cc + 6); c.push(cc + 12);
                        }
                    } else {
                        cc = Math.random() > 0.5 ? 0 : 1; c.push(cc); c.push(cc + 6); c.push(cc + 12);
                        cc = Math.randomInt(6); c.push(cc); c.push(cc + 6); c.push(cc + 12);
                        cc = Math.randomInt(6); c.push(cc); c.push(cc + 6); c.push(cc + 12);
                    }
                } this._FWC = c;

                $gameScreen.startFlash([255, 255, 255, 64 * Math.random()], [30]);

                _this.debug("BANG! @", ax, ay, "Power:", this.power, "Reborn start/end", this._fwRebornStart, this._fwRebornEnd);

            }
        }

        _updateAllSprites() {
            this.checkFireworks();
            super._updateAllSprites();
        }

        _rebornSprite(sprite) {

            let x_adjust = 0; const bm_index = Math.randomInt(3);

            switch (this.type) {
                case "fireflies":
                    sprite._rebornCount = 3 + Math.randomInt(1);
                    sprite.bitmap = this._firefliesBitmap[bm_index];
                    sprite._verticalSpeed = _preCalcBlizzardCos + Math.randomInt(3);
                    sprite.rotation = _pi16;
                    sprite._verticalSpeed = (Math.randomBetween(-2, 2) * 0.2);
                    sprite._horizontalSpeed = _preCalcSnowSin + (Math.randomInt(2) - 1);
                    sprite._fadeSubtractor = 2 + Math.randomInt(2);
                    sprite.changeDir = function () {
                        if (Math.random() * 0.5 > 0.2) {
                            this._verticalSpeed += (0.5 - Math.random()) * 0.3;
                            if (this._verticalSpeed > 0.8) this._verticalSpeed = 0.8;
                            if (this._verticalSpeed < -0.8) this._verticalSpeed = -0.8;
                        } if (Math.random() * 0.5 > 0.2) {
                            this._horizontalSpeed += (0.5 - Math.random()) * 0.3;
                            if (this._horizontalSpeed > 0.8) this._horizontalSpeed = 0.8;
                            if (this._horizontalSpeed < -0.8) this._horizontalSpeed = -0.8;
                        }
                    }; sprite.checkReborn = function (weather) {
                        if (isParticleOffScreen(this)) {
                            if (!_this.wasLoopPoint(weather, this)) {
                                weather._rebornSprite(this); return;
                            }
                        } if (this.opacity < 40) {
                            if (--this._rebornCount > 0) this.opacity = 195 + Math.randomInt(60);
                        } if (this.opacity < 40) weather._rebornSprite(sprite);
                    }; sprite.opacity = 195;
                    sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x + x_adjust;
                    sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
                    sprite.opacity += Math.randomInt(60);
                    break;
                case "fireworks":
                    if (this._fwRebornCount < 1) return;
                    this._fwRebornCount--;
                    sprite.changeDir = function () {
                        this._verticalSpeed += 0.02;
                    }; sprite.checkReborn = function (weather) {
                        if (weather.type != "fireworks") weather._rebornSprite(sprite);
                        if (this._spriteIndex < weather._fwRebornStart) return;
                        if (this._spriteIndex > weather._fwRebornEnd) return;
                        if (weather._fireworkXY) weather._rebornSprite(sprite);
                    }; if (!this._fireworkXY) return;
                    sprite.bitmap = this._fireworks[this._FWC[Math.randomInt(this._FWC.length)]];
                    sprite.opacity = 255;
                    sprite._horizontalSpeed = 2 - (4 * Math.random());
                    sprite._verticalSpeed = 2 - (4 * Math.random());
                    sprite.ax = this._fireworkXY[0]; sprite.ay = this._fireworkXY[1];
                    sprite._fadeSubtractor = 3 + Math.randomInt(2); break;
                case "fall_above":
                    sprite.bitmap = this._particle[bm_index]; sprite.rotation = 180;
                    switch (sprite._rbDir) {
                        case 2: sprite.ay = this.origin.y - 40; break;
                        case 4: sprite.ax = Graphics.width + this.origin.x + 40; break;
                        case 6: sprite.ax = this.origin.x - 40; break;
                        case 8: sprite.ay = Graphics.height + this.origin.y + 40; break;
                        default:
                            sprite.ay = Math.randomInt(Graphics.height + 200) - 100 + this.origin.y;
                            sprite.ax = Math.randomInt(Graphics.width) + this.origin.x; break;
                    } sprite.changeDir = function () {
                        this.rotation -= this._rotator;
                    }; sprite.checkReborn = function (weather) {
                        if (isParticleOffScreen(this)) {
                            if (!_this.wasLoopPoint(weather, this)) weather._rebornSprite(this);
                        }
                    }; sprite._verticalSpeed = (1.5 + Math.random()) * this._particleSpeed
                    sprite._horizontalSpeed = Math.random() - 0.5;
                    sprite._rotator = ((1 + Math.randomInt(4)) * 0.01) * this._particleRotation;
                    sprite._fadeSubtractor = 0; sprite.opacity = 255; break;
                case "raise_above":
                    sprite.bitmap = this._particle[bm_index]; sprite.rotation = 0;
                    switch (sprite._rbDir) {
                        case 2: sprite.ay = this.origin.y - 40; break;
                        case 4: sprite.ax = Graphics.width + this.origin.x + 40; break;
                        case 6: sprite.ax = this.origin.x - 40; break;
                        case 8: sprite.ay = Graphics.height + this.origin.y + 40; break;
                        default:
                            sprite.ay = Math.randomInt(Graphics.height + 200) - 100 + this.origin.y;
                            sprite.ax = Math.randomInt(Graphics.width) + this.origin.x;
                            break;
                    } sprite.changeDir = function () {
                        this.rotation -= this._rotator;
                    }; sprite.checkReborn = function (weather) {
                        if (isParticleOffScreen(this)) {
                            if (!_this.wasLoopPoint(weather, this)) weather._rebornSprite(this);
                        }
                    }; sprite._verticalSpeed = -(1.5 + Math.random()) * this._particleSpeed
                    sprite._horizontalSpeed = Math.random() - 0.5;
                    sprite._rotator = ((1 + Math.randomInt(4)) * 0.01) * this._particleRotation;
                    sprite._fadeSubtractor = 0; sprite.opacity = 255; break;
            }

        }

        _addSprite() {
            super._addSprite();
            this._sprites[this._sprites.length - 1]._fadeSubtractor = 255;
            this._sprites[this._sprites.length - 1]._spriteIndex = this._sprites.length;
        }

        _createBitmaps() {

            let tmp_depth = 0;
            this._firefliesBitmap = [];
            for (let i = 0; i < 3; i++) {
                if (_useEnhancedWeather) {
                    tmp_depth = (i + _fireflyMaxSize);
                    const wh = tmp_depth * 4;
                    this._firefliesBitmap.push(new Bitmap(wh, wh));
                    const c = _fireflyColor.clone();
                    this._firefliesBitmap[i].drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.333, "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] + ")");
                    this._firefliesBitmap[i].drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.666, "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] * 0.333 + ")");
                    this._firefliesBitmap[i].drawCircle(tmp_depth, tmp_depth, tmp_depth, "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] * 0.333 + ")");
                } else {
                    this._firefliesBitmap.push(new Bitmap(1, 1));
                }
            } this._firefliesBitmap.destroy = function () {
                this.forEach(bm => { bm.destroy(); });
            };

            this._fireworks = [];
            for (let i = 0; i < 3; i++) {
                if (_useEnhancedWeather) {
                    tmp_depth = (i + 1);
                    const wh = tmp_depth * 4;
                    let bm = new Bitmap(wh, wh);
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth, "rgba(255, 255, 255, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.666, "rgba(255, 255, 255, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.333, "rgba(255, 255, 255, 1)");
                    this._fireworks.push(bm); // Silver
                    bm = new Bitmap(wh, wh);
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth, "rgba(255, 196, 128, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.666, "rgba(255, 240, 196, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.333, "rgba(255, 255, 250, 1)");
                    this._fireworks.push(bm); // Gold
                    bm = new Bitmap(wh, wh);
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth, "rgba(255, 0, 0, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.666, "rgba(255, 128, 128, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.333, "rgba(255, 255, 255, 1)");
                    this._fireworks.push(bm); // Red
                    bm = new Bitmap(wh, wh);
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth, "rgba(0, 255, 0, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.666, "rgba(128, 255, 128, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.333, "rgba(255, 255, 255, 1)");
                    this._fireworks.push(bm); // Green
                    bm = new Bitmap(wh, wh);
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth, "rgba(0, 0, 255, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.666, "rgba(128, 128, 255, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.333, "rgba(255, 255, 255, 1)");
                    this._fireworks.push(bm); // Blue
                    bm = new Bitmap(wh, wh);
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth, "rgba(255, 0, 255, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.666, "rgba(255, 128, 255, 0.333)");
                    bm.drawCircle(tmp_depth, tmp_depth, tmp_depth * 0.333, "rgba(255, 255, 255, 1)");
                    this._fireworks.push(bm); // Purple
                } else {
                    this._fireworks.push(new Bitmap(1, 1));
                }
            } this._fireworks.destroy = function () {
                this.forEach(bm => { bm.destroy(); });
            };

            this._particle = []; this._particle.push(new Bitmap(1, 1));
            this._particle.push(new Bitmap(1, 1)); this._particle.push(new Bitmap(1, 1));
            if (_useEnhancedWeather) this.setParticle(1, 1, _currentAboveParticle, 0);

        }

        destroy () {
            const options = { children: true, texture: true };
            PIXI.Container.prototype.destroy.call(this, options);
            this._firefliesBitmap.destroy(); this._fireworks.destroy();
        }

        setParticle(speed, rotation, particle, power, cb) {
            if (power) {
                this._particleSpeed = speed * ((power + 4) / 9);
                this._particleRotation = rotation * ((power + 4) / 9);
            } else {
                this._particleSpeed = speed;
                this._particleRotation = rotation;
            } _currentAboveParticle = particle;
            this._btScene = OcRam.scene().isBattle() || OcRam.scene().isTitle();
            ImageManager.loadOcRamBitmap(_currentAboveParticle, 0, bitmap => {
                this._particle[0] = bitmap;
                const w = bitmap.width; const h = bitmap.height;
                let nw = (w * 0.8) | 0;
                let nh = (h * 0.8) | 0;
                const bm1 = new Bitmap(nw, nh);
                bm1.blt(bitmap, 0, 0, w, h, 0, 0, nw, nh);
                this._particle[1] = bm1;
                nw *= 0.8; nh *= 0.8;
                const bm2 = new Bitmap(nw, nh);
                bm2.blt(bitmap, 0, 0, w, h, 0, 0, nw, nh);
                this._particle[2] = bm2;
                if (cb) cb.call($gameScreen);
            }); this._sprites.forEach(sprite => {
                sprite._rbDir = 0;
            });
        }

    }

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    const getBuiltInWeatherType = wid => {
        switch (Math.abs(wid)) {
            case 1: return "rain"; break;
            case 2: return "storm"; break;
            case 3: return "snow"; break;
            case 4: return "fireflies"; break;
            case 5: return "wind_right"; break;
            case 6: return "wind_left"; break;
            case 7: return "fall"; break;
            case 8: return "raise"; break;
            case 9: return "fall_above"; break;
            case 10: return "raise_above"; break;
            case 11: return "fireworks"; break;
            default: return "none"; break;
        }
    };
    
    const getBuiltInWeatherTypeId = wn => {
        switch (("" + wn).toLowerCase()) {
            case "rain": return 1; break;
            case "storm": return 2; break;
            case "snow": return 3; break;
            case "fireflies": return 4; break;
            case "wind_right": return 5; break;
            case "wind_left": return 6; break;
            case "fall": return 7; break;
            case "raise": return 8; break;
            case "fall_above": return 9; break;
            case "raise_above": return 10; break;
            case "fireworks": return 11; break;
            default: return 0; break;
        }
    };

    const executeBuiltInWeather = (_params, support_weathers) => { // [type, power, delay, (wait)], Support Weathers Object

        this.debug("Executed built-in weather", _params, "Support Weathers:", support_weathers);

        _currentRndWeather = _currentRndWeather || {};
        _weatherDurationCounter = _builtInWeatherDuration;

        const type = _params[0] + "";
        const power = parseInt(_params[1] || 0);
        const duration = parseInt(_params[2] || 0);
        const seconds = duration / 60;

        support_weathers = regulateSupportWeathers(support_weathers);
        AudioManager.fadeOutBgs2(seconds); AudioManager.fadeOutBgs3(seconds);

        _currentBelowParticle = support_weathers.BelowParticle;
        _currentAboveParticle = support_weathers.AboveParticle;

        switch (type) { // Support weather as main weather
            case "none": // Core, Clears ALL layers
                $gameVariables.setValue(_weatherVarId, 0);
                _currentRndWeather = _this.getJsonWeatherById(0);
                _currentRndWeather.Power = 0; break;
            case "rain": // Core
                $gameVariables.setValue(_weatherVarId, -1);
                _currentRndWeather = _this.getJsonWeatherById(-1);
                _currentRndWeather.Power = power; break;
            case "storm": // Core
                $gameVariables.setValue(_weatherVarId, -2);
                _currentRndWeather = _this.getJsonWeatherById(-2);
                _currentRndWeather.Power = power; break;
            case "snow": // Core
                $gameVariables.setValue(_weatherVarId, -3);
                _currentRndWeather = _this.getJsonWeatherById(-3);
                _currentRndWeather.Power = power; break;
            case "fireflies": // Above, Support
                $gameVariables.setValue(_weatherVarId, -4);
                _currentRndWeather = _this.getJsonWeatherById(-4);
                _currentRndWeather.Power = power; break;
            case "wind_right": // Below, Support
                $gameVariables.setValue(_weatherVarId, -5);
                _currentRndWeather = _this.getJsonWeatherById(-5);
                _currentRndWeather.Power = power; break;
            case "wind_left": // Below, Support
                $gameVariables.setValue(_weatherVarId, -6);
                _currentRndWeather = _this.getJsonWeatherById(-6);
                _currentRndWeather.Power = power; break;
            case "fall": // Below, Support
                $gameVariables.setValue(_weatherVarId, -7);
                _currentRndWeather = _this.getJsonWeatherById(-7);
                _currentRndWeather.Power = power; break;
            case "raise": // Below, Support
                $gameVariables.setValue(_weatherVarId, -8);
                _currentRndWeather = _this.getJsonWeatherById(-8);
                _currentRndWeather.Power = power; break;
            case "fall_above": // Above, Support
                $gameVariables.setValue(_weatherVarId, -9);
                _currentRndWeather = _this.getJsonWeatherById(-9);
                _currentRndWeather.Power = power; break;
            case "raise_above": // Above, Support
                $gameVariables.setValue(_weatherVarId, -10);
                _currentRndWeather = _this.getJsonWeatherById(-10);
                _currentRndWeather.Power = power; break;
            case "fireworks": // Above, Support
                $gameVariables.setValue(_weatherVarId, -11);
                _currentRndWeather = _this.getJsonWeatherById(-11);
                _currentRndWeather.Power = power; break;
        }

        _currentRndWeather.SupportWeathers = support_weathers;
        $gameScreen.changeAllWeathers(type, power, duration, support_weathers);

    };

    const getCurrentWeatherBGS23 = pwid => {
        const cwid = pwid || $gameVariables.value(_weatherVarId);
        let this_bgs = { name: '', volume: 0, pitch: 100, pan: 0, pos: 0 };
        switch (cwid) {
            case -1: // Rain
                if (_currentRndWeather.Power >= _minPouringPower) {
                    this_bgs = { name: _pouringBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                } else {
                    this_bgs = { name: _rainBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                } break;
            case -2: // Storm
                this_bgs = { name: _stormBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 }; break;
            case -3: // Snow
                if (_currentRndWeather.Power >= _minBlizzardPower) {
                    this_bgs = { name: _blizzardBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                } break;
            case -4: case -7: case -8: case -9: case -10:
                this_bgs = { name: "", volume: 0, pitch: 100, pan: 0, pos: 0 }; break;
            case -5: case -6: // Wind
                this_bgs = { name: _windBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 }; break;
            default:
                if (_currentRndWeather) this_bgs = {
                    name: _currentRndWeather.WeatherBGS1, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0
                }; if (this_bgs.name == "" && _currentRndWeather) {
                    switch (_currentRndWeather.Type) {
                        case 1:
                            if (_currentRndWeather.Power >= _minPouringPower) {
                                this_bgs = { name: _pouringBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                            } else {
                                this_bgs = { name: _rainBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                            } break;
                        case 2:
                            this_bgs = { name: _stormBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 }; break;
                        case 3:
                            if (_currentRndWeather.Power >= _minBlizzardPower) {
                                this_bgs = { name: _blizzardBGS, volume: (_currentRndWeather.Power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                            } break;
                    }
                } break;
        } if (OcRam.isIndoors()) { this_bgs.volume *= (_noLightnings ? 0 : _indoorsVolumeMultiplier); this_bgs.pitch *= _indoorsPitchMultiplier; }
        return this_bgs;
    };

    const getWeatherPools = () => {

        _possibleWeatherPools = [];

        if (DataManager.isEventTest()) return;

        let tileset_meta = $dataMap ? $dataMap.meta : undefined;
        if (tileset_meta["weather-pools"] !== undefined) {
            _this.debug("weather-pools meta tag found in MAP note field!", tileset_meta);
            let arr_tmp = (tileset_meta["weather-pools"] + ",").split(",");
            for (let i = 0; i < arr_tmp.length; i++) {
                if (parseInt(arr_tmp[i]) > 0) _possibleWeatherPools.push(parseInt(arr_tmp[i]));
            }
        } else if ($dataTilesets[$gameMap._tilesetId]) {
            tileset_meta = $dataTilesets[$gameMap._tilesetId].meta;
            if (tileset_meta["weather-pools"] !== undefined) {
                _this.debug("weather-pools meta tag found in TILESET note field!", tileset_meta);
                let arr_tmp = (tileset_meta["weather-pools"] + ",").split(",");
                for (let i = 0; i < arr_tmp.length; i++) {
                    if (parseInt(arr_tmp[i]) > 0) _possibleWeatherPools.push(parseInt(arr_tmp[i]));
                }
            } else {
                _this.debug("weather-pools meta tag was NOT found!", tileset_meta);
            }
        }

    };

    const getPossibleWeathers = pool_id => {
        _possibleWeathers = [];
        _jsonWeathers.forEach(json_weather => {
            let tmp_arr = json_weather.PossiblePoolIds;
            for (let i = 0; i < tmp_arr.length; i++) {
                if (parseInt(tmp_arr[i]) == pool_id) _possibleWeathers.push(parseInt(json_weather.Id));
            }
        });
    };

    const getJsonPoolById = pool_id => {
        let ret = null;
        _jsonPools.forEach(json_pool => {
            if (parseInt(json_pool.Id) == pool_id) ret = json_pool;
        }); return ret;
    };

    const executePluginCommand = (plugin_command, power, transition) => {

        if (_gameSysLoading) return;

        let cmd = OcRam.getJSON(plugin_command);

        let args = {}; let str_args = cmd.Arguments;
        try {
            str_args = parsePluginCmd(str_args, power, transition);
            if (str_args != "") {
                eval(String('args = ' + str_args));
            } else {
                args = {};
            }
        } catch (ex) {
            console.warn("WARNING! executePluginCommand:", ex, "\n>>>>> " + str_args);
            args = {};
        }

        requestAnimationFrame(() => {
            PluginManager.callCommand(
                $gameMap._interpreter,
                cmd.Plugin,
                cmd.Command,
                args
            );
        });

        this.debug("Executed (" + cmd.Plugin + ") plugin command: ", cmd.Command, args);

    };

    const rnd = (min, max) => {
        return Math.randomInt(Math.ceil(max) - Math.ceil(min)) + Math.ceil(min);
    };

    const rndFloat = (min, max, precision) => {
        return parseFloat(((max - min) * Math.random() + min).toPrecision(precision || 2));
    };

    const rndNz = (min, max) => {
        if (Math.ceil(min) == 0 && Math.ceil(max) == 0) return 1;
        let ret = 0;
        while (ret == 0) {
            ret = rnd(min, max);
        } return ret;
    };

    const parsePluginCmd = (cmd, power, transition) => {

        // LUNATIC MODE IN PLUGIN COMMAND ARGUMENTS:
        // {zIndex:3,imageName:'Fog',opacity:$[(power/9)*255]!,fader:$[255/(transition+1)]!,scrollX:$[rndNz(-3,3)]!,scrollY:$[rndNz(-3,3)]!}
        // Syntax MUST BE $[...]! CAN'T BE NESTED example: $[$[...]!]!
        // To have JS eval type $[jsToEvalHere();]! anywhere in plugin command
        //      power key word refers to current weather power
        //      transition key word refers to current weather transition time (in frames)
        //      rnd(-3, 3) const will give random INTEGER between -3 and 3
        //      rndFloat(-3, 3, 2) const will give random 2 decimal FLOAT between -3 and 3
        //      rndNz(-3, 3) const will give random INTEGER between -3 and 3, but no zero

        // ps. Great place to fiddle with regex: https://regex101.com/
        let ret = cmd; let evals = (ret).match(/\$\[(.*?)\]\!/gm);
        if (evals == undefined) return ret; let str_tmp = "";

        transition = Number(transition);
        if (isNaN(transition)) transition = _transitionTime;
        power = Number(power);
        if (isNaN(power)) power = Math.randomBetween(1, 9);

        evals.forEach(ev => {
            str_tmp = ev.toString().replace("\$\[", "");
            str_tmp = str_tmp.replace("\]\!", "");
            eval("str_tmp=" + (str_tmp + '').toString());
            ret = ret.replace(ev.toString(), str_tmp);
        });

        return ret;

    };

    const setWeatherById = (weather_id, power, fade, duration, forced) => {

        if (OcRam.isOmitted(power) || isNaN(power)) power = Math.randomBetween(1, 9);
        const below_power = power; const above_power = power;
        if (OcRam.isOmitted(fade)) fade = _transitionTime;

        $gameScreen.clearAllWeatherFX(fade);

        let str_type = "none"; _weatherDurationCounter = duration;

        if (_currentRndPool == null) {
            _currentRndPool = { Id: 1, Name: "Default Pool", PowerBoost: 0, MinClearTime: 30, MaxClearTime: 300, ClearChance: 50, ProbableWeatherIds: [0], ProbableBonus: 25, ImprobableWeatherIds: [0], ImprobablePenalty: 25 };
        }

        if (_currentRndPool.PowerBoost) {
            power += parseInt(_currentRndPool.PowerBoost);
            power = (power > 9) ? 9 : (power < 1) ? 1 : power;
        }

        if (parseInt(weather_id) < 0 && forced) {
            str_type = getBuiltInWeatherType(weather_id);
            executeBuiltInWeather( // This weather is direct built-in weather id
                [str_type, power, (isNaN(fade + 0)) ? _transitionTime : fade, false]
            ); return;
        }

        let this_weather = _this.getJsonWeatherById(weather_id); // Try to find weather by this id

        if (this_weather) { // We got weather object!

            if (!forced && this_weather.WeatherCondition) {
                try {
                    const condition_met = eval(this_weather.WeatherCondition);
                    if (!condition_met) {
                        _this.debug("Condition was NOT met!", this_weather.WeatherCondition);
                        $gameScreen.clearAllWeatherFX(fade); _currentRndWeather = null;
                        if (this_weather.ConditionAction) setRandomWeather(); return;
                    }
                } catch (e) {
                    console.warn("Weather Condition Eval error:", e);
                }
            }

            let probability_adjust = 0;

            if (_currentRndPool.ProbableWeatherIds && _currentRndPool.ProbableWeatherIds.length) {
                for (let i = 0; i < _currentRndPool.ProbableWeatherIds.length; i++) {
                    if (parseInt(_currentRndPool.ProbableWeatherIds[i]) == weather_id) {
                        _this.debug("This is probable weather (" + weather_id + "):", _currentRndPool.ProbableWeatherIds);
                        probability_adjust = -parseInt(_currentRndPool.ProbableBonus);
                    }
                }
            }

            if (_currentRndPool.ImprobableWeatherIds && _currentRndPool.ImprobableWeatherIds.length) {
                for (let i = 0; i < _currentRndPool.ImprobableWeatherIds.length; i++) {
                    if (parseInt(_currentRndPool.ImprobableWeatherIds[i]) == weather_id) {
                        _this.debug("This is improbable weather (" + weather_id + "):", _currentRndPool.ImprobableWeatherIds);
                        probability_adjust = parseInt(_currentRndPool.ImprobablePenalty);
                    }
                }
            }

            if ((100 * Math.random() <= probability_adjust + parseInt(_currentRndPool.ClearChance)) && !forced) {
                //_this.debug("probability_adjust:", probability_adjust);
                if (probability_adjust > 0) { setRandomWeather(); return; }
                $gameScreen.clearAllWeatherFX(fade); _currentRndWeather = null;
                _weatherDurationCounter = duration || (Math.randomInt(parseInt(_currentRndPool.MaxClearTime) - parseInt(_currentRndPool.MinClearTime)) + parseInt(_currentRndPool.MinClearTime));
                _this.debug("Clear weather...", "For duration: " + _weatherDurationCounter); return;
            }

            let this_bgs = { name: '', volume: 0, pitch: 100, pan: 0, pos: 0 };
            $gameVariables.setValue(_weatherVarId, weather_id); // SET Weather ID variable

            // Execute built-in weather also apply above and below types (default to none)
            const sw = regulateSupportWeathers(this_weather.SupportWeathers);
            sw.BelowPower = below_power; sw.AbovePower = above_power;
            str_type = getBuiltInWeatherType(this_weather.Type);
            executeBuiltInWeather([str_type, power, (isNaN(fade + 0)) ? _transitionTime : fade, false], sw);

            // Set current weather for indoors/outdoors swapping!
            _currentRndWeather = this_weather; _currentRndWeather.Power = power;

            $gameVariables.setValue(_weatherVarId, weather_id); // SET Weather ID variable

            if (OcRam.isIndoors() && _disableWeatherIndoors) return; // IF weather was changed indoors and it should not >> don't do it...

            // Execute supportive plugin commands
            const cmd_arr = this_weather.PluginCommands;
            if (cmd_arr && cmd_arr.length) {
                for (let i = 0; i < cmd_arr.length; i++) {
                    if (cmd_arr[i]) { //const parsed_cmd = parsePluginCmd(cmd_arr[i], power);
                        executePluginCommand(cmd_arr[i], power, (isNaN(fade + 0)) ? _transitionTime : fade);
                    }
                }
            }

            if (weather_id > 0) { // Only custom weathers
                // Execute BGS - Will override any default BGS from CORE weathers...
                if (this_weather.WeatherBGS1 != "") {
                    if (!AudioManager._currentBgs2 || AudioManager._currentBgs2.name != this_weather.WeatherBGS1) {
                        this_bgs = { name: this_weather.WeatherBGS1, volume: (power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                        AudioManager.stopBgs2(); AudioManager.playBgs2(this_bgs); this_bgs = { name: '', volume: 0, pitch: 100, pan: 0, pos: 0 };
                    }
                } if (this_weather.WeatherBGS2 != "") {
                    if (!AudioManager._currentBgs3 || AudioManager._currentBgs3.name != this_weather.WeatherBGS2) {
                        this_bgs = { name: this_weather.WeatherBGS2, volume: (power * 10 + 10), pitch: 100, pan: 0, pos: 0 };
                        AudioManager.stopBgs3(); AudioManager.playBgs3(this_bgs);
                    }
                }
            }

            _weatherDurationCounter = duration || rnd(this_weather.MinDuration, this_weather.MaxDuration); // How long does this weather exist?

            _this.debug("setWeatherById(" + weather_id + ", " + power + ") | For duration: " + _weatherDurationCounter, this_weather);
            _this.onNewWeather();

        }
    };

    const setRandomWeather = pool => {

        if (_possibleWeatherPools == null) getWeatherPools();

        let randomized_pool_id = 0;
        randomized_pool_id = (!pool) ? _possibleWeatherPools[Math.randomInt(_possibleWeatherPools.length)] : pool;

        if (randomized_pool_id !== undefined) {
            _this.debug("Randomized pool id:", randomized_pool_id);
            _currentRndPool = getJsonPoolById(randomized_pool_id);
            getPossibleWeathers(randomized_pool_id);
            const randomized_weather_id = _possibleWeathers[Math.randomInt(_possibleWeathers.length)];
            if (randomized_weather_id !== undefined) {
                _this.debug("Randomized weather id:", randomized_weather_id);
                setWeatherById(randomized_weather_id, (Math.randomInt(8) + 1));
            }
        }

    };

    const setIndoorsFlag = () => { // Use this const only if time system is NOT imported

        if (DataManager.isEventTest()) return;

        let tileset_meta = $dataMap.meta;
        if (tileset_meta["no_lightnings"] !== undefined) {
            _this.debug("'No lightnings' meta tag found in MAP note field!", tileset_meta);
            _noLightnings = true;
        } else {
            tileset_meta = $dataTilesets[$dataMap.tilesetId].meta;
            if (tileset_meta["no_lightnings"] !== undefined) {
                _this.debug("'No lightnings' meta tag found in TILESET note field!", tileset_meta);
                _noLightnings = true;
            } else {
                _this.debug("'No lightnings' meta tag was NOT found!", tileset_meta);
                _noLightnings = false;
            }
        }

        if (_useTimeSystem) return;

        tileset_meta = $dataMap.meta;
        if (tileset_meta["indoors"] !== undefined) {
            _this.debug("Indoors meta tag found in MAP note field!", tileset_meta);
            _isIndoors = true;
        } else {
            tileset_meta = $dataTilesets[$dataMap.tilesetId].meta;
            if (tileset_meta["indoors"] !== undefined) {
                _this.debug("Indoors meta tag found in TILESET note field!", tileset_meta);
                _isIndoors = true;
            } else {
                _this.debug("Indoors meta tag was NOT found!", tileset_meta);
                _isIndoors = false;
            }
        }
    };

    const getRandomPoolId = () => {
        return parseInt(_jsonPools[Math.randomInt(_jsonPools.length)].Id);
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.getJsonWeatherById = weather_id => {
        return _jsonWeathers.find(p => Number(p.Id) == Number(weather_id));
    };

    this.getWeatherLayer = () => {
        const s = OcRam.scene(); if (!s) return;
        const ss = s._weatherContainer || s._spriteset;
        if (!ss) return; return ss._weather;
    };

    this.getWeatherBelowLayer = () => {
        const s = OcRam.scene(); if (!s) return;
        const ss = s._weatherContainer || s._spriteset;
        if (!ss) return; return ss._weatherBelow;
    };

    this.getWeatherAboveLayer = () => {
        const s = OcRam.scene(); if (!s) return;
        const ss = s._weatherContainer || s._spriteset;
        if (!ss) return; return ss._weatherAbove;
    };

    this.randomizeParticles = () => {

        const s = OcRam.scene(); if (!s) return;
        const ss = s._weatherContainer || s._spriteset;
        if (!ss) return; ss.updateWeather();

        const wlb = ss._weatherBelow;
        wlb._sprites.forEach(s => {
            s._rbDir = 0; s._rbDir2 = 0;
            s.ay = Math.randomInt(Graphics.height + 200) - 100 + wlb.origin.y;
            s.ax = Math.randomInt(Graphics.width) + wlb.origin.x; s.opacity = 1;
            s.x = s.ax - wlb.origin.x;
            s.y = s.ay - wlb.origin.y;
            wlb._rebornSprite(s); wlb._updateSprite(s); s.update();
        }); wlb.update();
        wlb._sprites.forEach(function (sprite) {
            this._updateSprite(sprite);
            sprite.x = sprite.ax - this.origin.x;
            sprite.y = sprite.ay - this.origin.y;
        }, wlb);

        const wla = ss._weatherAbove;
        wla._sprites.forEach(s => {
            s._rbDir = 0; 
            s.ay = Math.randomInt(Graphics.height + 200) - 100 + wlb.origin.y;
            s.ax = Math.randomInt(Graphics.width) + wlb.origin.x; s.opacity = 1;
            s.x = s.ax - wla.origin.x;
            s.y = s.ay - wla.origin.y;
            wla._rebornSprite(s); wla._updateSprite(s); s.update();
            
        }); wla.update();
        wla._sprites.forEach(function (sprite) {
            this._updateSprite(sprite);
            sprite.x = sprite.ax - this.origin.x;
            sprite.y = sprite.ay - this.origin.y;
        }, wla);

        ss.update();

    };

    this.getWeatherName = () => {
        if (_weatherVarId != 0) {
            const wn = this.getJsonWeatherById(Number($gameVariables.value(_weatherVarId)));
            if (wn) {
                return this.getJsonWeatherById(Number($gameVariables.value(_weatherVarId))).Name;
            } else {
                return _weatherName0;
            }
        } else {
            return _weatherName0;
        }
    };

    this.getCurrentWeather = () => this.getJsonWeatherById(Number($gameVariables.value(_weatherVarId)));
    this.getWeathers = () => _jsonWeathers;
    this.getWeatherPools = () => _jsonPools;
    this.currentWeatherDuration = () => _weatherDurationCounter;

    this.setTitleWeather = (weather_obj, power) => {

        if (!OcRam.scene().isTitle()) return;

        _clearInstructions.forEach(plugin_cmd => {
            executePluginCommand(plugin_cmd, 0, 0);
        }); AudioManager.fadeOutBgs2(0); AudioManager.fadeOutBgs3(0);
        $gameScreen.changeWeather("none", 0, 0);
        $gameScreen.changeWeatherBelow("none", 0, 0);
        $gameScreen.changeWeatherAbove("none", 0, 0);

        if (!_useTitleWeather) return;

        // Make ALL weather sprites go away NOW!
        let wl = _this.getWeatherAboveLayer(); wl.power = 0;
        while (wl._sprites.length > 1) {
            wl._removeSprite();
        } wl = _this.getWeatherLayer(); wl.power = 0;
        while (wl._sprites.length > 1) {
            wl._removeSprite();
        } wl = _this.getWeatherBelowLayer(); wl.power = 0;
        while (wl._sprites.length > 1) {
            wl._removeSprite();
        }

        _prevWeather = -1000; _prevWeatherPower = -1000;
        _titleWeather = weather_obj;
        _titleWeatherPower = Number(power);

    };

    this.setRandomWeather = pool_id => {
        setRandomWeather(pool_id);
    }; this.onNewWeather = () => { };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Game_Screen.prototype.weatherBelowType = function () { return this._weatherBelowType; };
    Game_Screen.prototype.weatherBelowPower = function () { return this._weatherBelowPower; };
    Game_Screen.prototype.weatherAboveType = function () { return this._weatherAboveType; };
    Game_Screen.prototype.weatherAbovePower = function () { return this._weatherAbovePower; };

    Game_Screen.prototype.changeAllWeathers = function (type, power, duration, sw) {

        _this.debug("changeAllWeathers", type, power, duration, sw);

        sw = regulateSupportWeathers(sw);
        const type_below = sw.TypeBelow;
        const type_above = sw.TypeAbove;

        switch (type) {
            case "none": // "none" weather clears ALL layers and executes plugin clear instructions
                if ($gameVariables) {
                    $gameVariables.setValue(_weatherVarId, 0);
                    _currentRndWeather = _this.getJsonWeatherById(0);
                    _currentRndWeather.SupportWeathers = sw;
                    _currentRndWeather.Power = (type_below || type_above) ? power : 0;
                } duration = (isNaN(Number(duration) + 0)) ? _transitionTime : duration;
                _clearInstructions.forEach(plugin_cmd => {
                    executePluginCommand(plugin_cmd, 0, duration);
                }); if (duration) {
                    AudioManager.fadeOutBgs2(duration / 60); // Rain, Storm, Blizzard
                    AudioManager.fadeOutBgs3(duration / 60); // Wind
                } else {
                    AudioManager.stopBgs2(); AudioManager.stopBgs3();
                } this.changeWeather(type, 0, duration);
                if (!type_below) this.changeWeatherBelow(type, 0, duration);
                if (!type_above) this.changeWeatherAbove(type, 0, duration);
                _this.debug("Weather...", "cleared! duration:", duration); break;
            case "rain": this.changeWeather(type, power, duration); AudioManager.playBgs2(getCurrentWeatherBGS23(-1)); break;
            case "storm": this.changeWeather(type, power, duration); AudioManager.playBgs2(getCurrentWeatherBGS23(-2)); break;
            case "snow": this.changeWeather(type, power, duration); AudioManager.playBgs2(getCurrentWeatherBGS23(-3)); break;
            case "fireflies": case "fall_above": case "raise_above": case "fireworks": this.changeWeatherAbove(type, power, duration); break;
            case "wind_right": this.changeWeather(type, power, duration); AudioManager.playBgs3(getCurrentWeatherBGS23(-5)); break;
            case "wind_left": this.changeWeather(type, power, duration); AudioManager.playBgs3(getCurrentWeatherBGS23(-6)); break;
            case "fall": case "raise": this.changeWeatherBelow(type, power, duration); break;
        };

        switch (Math.abs(type_below)) {
            case 5: // wind_right
                this.changeWeatherBelow('wind_right', sw.BelowPower, duration, sw.BelowSpeed, sw.BelowRotate, sw.BelowParticle);
                AudioManager.playBgs3(getCurrentWeatherBGS23(-5)); break;
            case 6: // wind_left
                this.changeWeatherBelow('wind_left', sw.BelowPower, duration, sw.BelowSpeed, sw.BelowRotate, sw.BelowParticle);
                AudioManager.playBgs3(getCurrentWeatherBGS23(-6)); break;
            case 7: // fall
                this.changeWeatherBelow('fall', sw.BelowPower, duration, sw.BelowSpeed, sw.BelowRotate, sw.BelowParticle); break;
            case 8: // raise
                this.changeWeatherBelow('raise', sw.BelowPower, duration, sw.BelowSpeed, sw.BelowRotate, sw.BelowParticle); break;
        }

        switch (Math.abs(type_above)) {
            case 4: // fireflies
                this.changeWeatherAbove('fireflies', sw.AbovePower, duration, sw.AboveSpeed, sw.AboveRotate, sw.AboveParticle); break;
            case 9: // fall_above
                this.changeWeatherAbove('fall_above', sw.AbovePower, duration, sw.AboveSpeed, sw.AboveRotate, sw.AboveParticle); break;
            case 10: // raise_above
                this.changeWeatherAbove('raise_above', sw.AbovePower, duration, sw.AboveSpeed, sw.AboveRotate, sw.AboveParticle); break;
            case 11: // fireworks
                this.changeWeatherAbove('fireworks', sw.AbovePower, duration, sw.AboveSpeed, sw.AboveRotate, sw.AboveParticle); break;
        }

        _this.onNewWeather();

    };

    Game_Screen.prototype.changeWeatherBelow = function (type, power, duration, speed, rotation, particle, persistant) {
        const w = _this.getWeatherBelowLayer(); if (!w) {
            console.warn("No _weatherBelow layer?"); return; // No weather layer huh?!?
        } w._maxWeatherSprites = _maxWeatherSpritesBelow;
        if (persistant) {
            if (!_currentRndWeather.SupportWeathers) _currentRndWeather.SupportWeathers = regulateSupportWeathers({});
            _currentRndWeather.SupportWeathers.TypeBelow = getBuiltInWeatherTypeId(type);
            _currentRndWeather.SupportWeathers.BelowSpeed = speed || 1;
            _currentRndWeather.SupportWeathers.BelowRotate = rotation || 0;
            _currentRndWeather.SupportWeathers.BelowChance = 1;
            _currentRndWeather.SupportWeathers.BelowParticle = particle;
        } w.setParticle(speed || 1, rotation || 0, particle || _currentBelowParticle, power || 0, () => {
            if (type !== "none" || duration === 0) {
                this._weatherBelowType = type;
            } this._weatherBelowPowerTarget = type === "none" ? 0 : power;
            this._weatherBelowDuration = duration;
            if (duration === 0) {
                this._weatherBelowPower = this._weatherBelowPowerTarget;
            }
        });
    };

    Game_Screen.prototype.changeWeatherAbove = function (type, power, duration, speed, rotation, particle, persistant) {
        const w = _this.getWeatherAboveLayer(); if (!w) {
            console.warn("No _weatherAbove layer?"); return; // No weather layer huh?!?
        } switch (type) {
            case "fireflies": w._maxWeatherSprites = _maxWeatherSpritesAbove * _fireflyParticleMultiplier; break;
            default: w._maxWeatherSprites = _maxWeatherSpritesAbove; break;
        } if (persistant) {
            if (!_currentRndWeather.SupportWeathers) _currentRndWeather.SupportWeathers = regulateSupportWeathers({});
            _currentRndWeather.SupportWeathers.TypeAbove = getBuiltInWeatherTypeId(type);
            _currentRndWeather.SupportWeathers.AboveSpeed = speed || 1;
            _currentRndWeather.SupportWeathers.AboveRotate = rotation || 0;
            _currentRndWeather.SupportWeathers.AboveChance = 1;
            _currentRndWeather.SupportWeathers.AboveParticle = particle;
        } w.setParticle(speed || 1, rotation || 0, particle || _currentAboveParticle, power || 0, () => {
            if (type !== "none" || duration === 0) {
                this._weatherAboveType = type;
            } this._weatherAbovePowerTarget = type === "none" ? 0 : power;
            this._weatherAboveDuration = duration;
            if (duration === 0) {
                this._weatherAbovePower = this._weatherAbovePowerTarget;
            }
        });
    };

    Spriteset_Battle.prototype.createWeather = function () {
        this._weatherBelow = new WeatherBelow();
        this.addChild(this._weatherBelow);
        this._weather = new Weather();
        this.addChild(this._weather);
        this._weatherAbove = new WeatherAbove();
        requestAnimationFrame(() => {
            this.addChild(this._weatherAbove);
        });
    };

    Spriteset_Battle.prototype.updateWeather = function () {

        if (!_battleWeather) {
            this._weatherBelow.type = 0; this._weatherBelow.power = 0; 
            this._weather.type = 0; this._weather.power = 0;
            this._weatherAbove.type = 0; this._weatherAbove.power = 0;
            return;
        }

        updateAllWeatherLayers(this._weatherBelow, this._weather, this._weatherAbove);
        this._weather.origin.x = 0; this._weather.origin.y = 0;
        this._weatherBelow.origin.x = 0; this._weatherBelow.origin.y = 0;
        this._weatherAbove.origin.x = 0; this._weatherAbove.origin.y = 0;

    };

    Game_Screen.prototype.setWeatherById = (weather_id, power, fade, duration, forced) => {
        setWeatherById(Number(weather_id), Number(power), Number(fade), Number(duration), OcRam.getBoolean(forced));
    };

    Game_Screen.prototype.clearAllWeatherFX = function (fade) {
        executeBuiltInWeather(["none", 0, fade, false]);
        _this.debug("Weather...", "cleared! fade:", fade);
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    if (Imported.OcRam_Time_System) {
        if (parseFloat(OcRam.Time_System.version) < 1.00) {
            console.warn("OcRam_Time_System must be at least v1.00!", "Can't use time system!");
        } else {
            _this.debug("OcRam_Time_System:", "Loaded successfully!"); _useTimeSystem = true;
        }
    }

    if (_useTimeSystem) { // We have time system >> Extend time system interval loop
        const OC_Window_processInterval_OC = window.processInterval_OC;
        window.processInterval_OC = function () {
            OC_Window_processInterval_OC.call(this);
            if (_useDynamicWeather) {
                _weatherDurationCounter--; // NEW WEATHER?
                if (_weatherDurationCounter < 1) setRandomWeather();
            }
        };
    } else { // Create own timer and isIndoors -check
        window._OC_Weather_Timer = window.setInterval(function () {
            if (_useDynamicWeather) {
                if (!OcRam._menuCalled) {
                    _weatherDurationCounter--; // NEW WEATHER?
                    if (_weatherDurationCounter < 1) setRandomWeather();
                }
            }
        }, 1000);
        Game_System.prototype.isIndoors = function () { return _isIndoors; };
    }

    // Battle Weather // rpg_sprites.js
    this.extend(Spriteset_Battle, "update", function () {
        this.updateWeather(); _this["Spriteset_Battle_update"].apply(this, arguments);
    });

    // Do not check if is battle screen. Also play bgs, if specified.
    Game_Interpreter.prototype.command236 = function () { // WEATHER: type|power|delay|wait
        const p = this._list[this._index].parameters;
        executeBuiltInWeather(p); if (p[3]) this.wait(p[2]); return true;
    };

    // Snap to Weather_update - rpg_core.js
    this.extend(Weather, "update", function () {
        _this["Weather_update"].apply(this, arguments); this.updateFlash();
    });

    if (_useTitleWeather) {

        // TITLE WEATHER
        this.extend(Scene_Title, "createForeground", function () {
            _this["Scene_Title_createForeground"].apply(this, arguments);
            this.createWeatherContainer();
        });

        Scene_Title.prototype.createWeatherContainer = function () { // New method

            if (this._weatherContainer) {
                /* Top most or weather container already created!*/
            } else {
                this._weatherContainer = new Sprite();
                if (!this._spriteset) this._weatherContainer.z = 100;
                this.addChild(this._weatherContainer);
            } const weather_container = this._weatherContainer || this;

            weather_container._weatherBelow = new WeatherBelow();
            weather_container._weatherBelow.type = "";
            weather_container._weatherBelow.power = 0;
            weather_container._weatherBelow.origin.x = 0;
            weather_container._weatherBelow.origin.y = 0;
            weather_container.addChild(weather_container._weatherBelow);

            weather_container._weather = new Weather();
            weather_container._weather.type = "";
            weather_container._weather.power = 0;
            weather_container._weather.origin.x = 0;
            weather_container._weather.origin.y = 0;
            weather_container.addChild(weather_container._weather);

            weather_container._weatherAbove = new WeatherAbove();
            weather_container._weatherAbove.type = "";
            weather_container._weatherAbove.power = 0;
            weather_container._weatherAbove.origin.x = 0;
            weather_container._weatherAbove.origin.y = 0;
            requestAnimationFrame(() => { weather_container.addChild(weather_container._weatherAbove); });
            
        };

        this.extend(Scene_Title, "start", function () {

            OcRam._isIndoors = false;
            _screenCenterXY[0] = Graphics.width * 0.5;
            _screenCenterXY[1] = Graphics.height * 0.5;
            _maxDistance = (Graphics.width + Graphics.height + 240) * 0.5;
            _this["Scene_Title_start"].apply(this, arguments);
            if (!_titleWeather || Imported.OcRam_Title_Shuffler) return;
            const weather = _this.getJsonWeatherById(_titleWeather.customWeatherId || _titleWeather.weatherId);

            requestAnimationFrame(() => { // Waits for layers to be created...

                const weather_container = this._weatherContainer || this;
                let type = getBuiltInWeatherType(weather.Type);
                weather_container._weather.type = type;
                weather_container._weather.power = 0;
                weather_container._weatherBelow.type = type;
                weather_container._weatherBelow.power = 0;
                weather_container._weatherAbove.type = type;
                weather_container._weatherAbove.power = 0;

                const wid = Number(_titleWeather.customWeatherId || _titleWeather.weatherId);
                if (wid < 0) {
                    const sw = {
                        TypeBelow: 0,
                        BelowSpeed: _titleWeather.weatherSpeed,
                        BelowRotate: _titleWeather.weatherRotation,
                        BelowParticle: _titleWeather.weatherParticle,
                        BelowChance: 1,
                        BelowDynamic: _titleWeather.weatherDynamic,
                        TypeAbove: 0,
                        AboveSpeed: _titleWeather.weatherSpeed,
                        AboveRotate: _titleWeather.weatherRotation,
                        AboveParticle: _titleWeather.weatherParticle,
                        AboveChance: 1,
                        AboveDynamic: _titleWeather.weatherDynamic
                    }; switch (wid) {
                        case -4: case -9: case -10: case -11: sw.TypeAbove = -wid;
                        case -5: case -6: case -7: case -8: sw.TypeBelow = -wid;
                    } executeBuiltInWeather([type, _titleWeatherPower, 0, false], sw);
                } else if (wid > 0) {
                    setWeatherById(wid, _titleWeatherPower, 1, -1, true);
                } else {
                    $gameScreen.clearAllWeatherFX();
                }

            });
        });

        Scene_Title.prototype.updateWeather = function () {
            const wid = Number(_titleWeather.customWeatherId || _titleWeather.weatherId);
            if (_prevWeather != wid || _prevWeatherPower != _titleWeatherPower) {
                $gameScreen.clearAllWeatherFX();
                const weather_container = this._weatherContainer || this;
                if (!weather_container._weather) return;
                _prevWeather = wid; _prevWeatherPower = _titleWeatherPower;
                const weather = _this.getJsonWeatherById(wid);
                if (weather) {
                    let type = getBuiltInWeatherType(weather.Type);
                    $gameScreen.changeAllWeathers(type, (!type || type == "none" ? 0 : _titleWeatherPower), 0, null);
                    updateAllWeatherLayers(
                        weather_container._weatherBelow,
                        weather_container._weather,
                        weather_container._weatherAbove
                    ); if (wid < 0) {
                        const sw = {
                            TypeBelow: 0,
                            BelowSpeed: _titleWeather.weatherSpeed,
                            BelowRotate: _titleWeather.weatherRotation,
                            BelowParticle: _titleWeather.weatherParticle,
                            BelowChance: 1,
                            BelowDynamic: _titleWeather.weatherDynamic,
                            TypeAbove: 0,
                            BelowSpeed: _titleWeather.weatherSpeed,
                            BelowRotate: _titleWeather.weatherRotation,
                            BelowParticle: _titleWeather.weatherParticle,
                            BelowChance: 1,
                            BelowDynamic: _titleWeather.weatherDynamic
                        }; switch (wid) {
                            case -4: case -9: case -10: case -11: sw.TypeAbove = -wid;
                            case -5: case -6: case -7: case -8: sw.TypeBelow = -wid;
                        } executeBuiltInWeather([type, _titleWeatherPower, 0, false], sw);
                    } else if (wid > 0) {
                        setWeatherById(wid, _titleWeatherPower, 1, -1, true);
                    } else {
                        $gameScreen.clearAllWeatherFX();
                    }
                }
            }
        };

        this.extend(Game_Screen, "updateWeather", function () {
            _this["Game_Screen_updateWeather"].apply(this, arguments);
            if (this._weatherBelowDuration > 0) {
                const d = this._weatherBelowDuration;
                const t = this._weatherBelowPowerTarget;
                this._weatherBelowPower = (this._weatherBelowPower * (d - 1) + t) / d;
                this._weatherBelowDuration--;
                if (this._weatherBelowDuration === 0 && this._weatherBelowPowerTarget === 0) {
                    this._weatherBelowType = "none";
                }
            }
            if (this._weatherAboveDuration > 0) {
                const d = this._weatherAboveDuration;
                const t = this._weatherAbovePowerTarget;
                this._weatherAbovePower = (this._weatherAbovePower * (d - 1) + t) / d;
                this._weatherAboveDuration--;
                if (this._weatherAboveDuration === 0 && this._weatherAbovePowerTarget === 0) {
                    this._weatherAboveType = "none";
                }
            }
        });

        this.extend(Scene_Title, "update", function () {
            _this["Scene_Title_update"].apply(this, arguments); this.updateWeather();
        });

        this.extend(Scene_Title, "terminate", function () {
            setWeatherById(0, 0, 0, 0, true); // Clear title weather!
            _this["Scene_Title_terminate"].apply(this, arguments);
        });

    }

    // ------------------------------------------------------------------------------
    // OcRam - 'Clock' window to MENU
    // ==============================================================================

    if ((!OcRam.Time_System || (!OcRam.getBoolean(OcRam.Time_System.parameters['Show clock in menu'])) && _showWeatherInMenu)) {

        this.debug("OcRam.Time_System not imported or no clock info shown in menu");

        this.getWeathers().forEach(w => {
            if (w) {
                if (w.Id < -3) {
                    w._icon = ImageManager.loadOcRamBitmap("weather0");
                } else {
                    w._icon = ImageManager.loadOcRamBitmap("weather" + w.Id);
                }
            }
        });

        // ------------------------------------------------------------------------------
        // Window_Clock (in menu)
        // ==============================================================================
        class Window_Clock extends Window_Base {

            constructor(rect) {
                super(rect); this.refresh();
            }

            refresh() {
                const width = this.contents.width - this.itemPadding() * 2 + 10;
                this.contents.clear(); this.resetTextColor();
                this.contents.fontSize = $gameSystem.mainFontSize() - 2;
                this.contents.fontFace = $gameSystem.mainFontFace();
                this.drawText(_this.getWeatherName(), 0, 0, width, 'left');
                const bm = (_this.getCurrentWeather())._icon;
                if (bm) {
                    this.contents.blt(bm, 0, 0, bm.width, bm.height, this.contents.width - bm.width - 1, 0);
                }
            }

            open() {
                this.refresh();
                super.open(this);
            }

        }

        if (_altMenu) {

            // HORIZONTAL MENU (ALT_MENU)
            Scene_Menu.prototype.timeWindowRect = function () {
                const ww = Graphics.boxWidth - this.goldWindowRect().width;
                const wh = this.goldWindowRect().height; const wx = 0;
                const wy = this.mainAreaBottom() - wh;
                return new Rectangle(wx, wy, ww, wh);
            };

        } else {
            Scene_Menu.prototype.commandWindowRect = function () {
                const ww = this.mainCommandWidth();
                const wh = this.mainAreaHeight() - this.goldWindowRect().height - this.timeWindowRect().height;
                const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
                const wy = this.mainAreaTop();
                return new Rectangle(wx, wy, ww, wh);
            };

            Scene_Menu.prototype.timeWindowRect = function () {
                const ww = this.mainCommandWidth();
                const wh = this.calcWindowHeight(1, false);
                const wx = Graphics.boxWidth - ww;
                const wy = this.mainAreaBottom() - this.calcWindowHeight(1, true) - wh;
                return new Rectangle(wx, wy, ww, wh);
            };
        }

        this.extend(Scene_Menu, "create", function () {
            _this["Scene_Menu_create"].apply(this, arguments);
            this.createClockWindow();
        });

        Scene_Menu.prototype.createClockWindow = function () {
            this._clockWindow = new Window_Clock(this.timeWindowRect());
            this.addWindow(this._clockWindow);
        };

    }

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = function () { };

    this.loadPluginData = gs => {

        this.getWeathers().forEach(w => {
            if (w) {
                if (w.Id < -3) {
                    w._icon = ImageManager.loadOcRamBitmap("weather0");
                } else {
                    w._icon = ImageManager.loadOcRamBitmap("weather" + w.Id);
                }
            }
        });

        _weatherDurationCounter = gs._weatherDurationCounter;
        _currentRndWeather = gs._currentWeather || null;
        if (_currentRndWeather) {
            if (_currentRndWeather.Id < -3) {
                _currentRndWeather._icon = ImageManager.loadOcRamBitmap("weather0");
            } else {
                _currentRndWeather._icon = ImageManager.loadOcRamBitmap("weather" + _currentRndWeather.Id);
            }
        } _useDynamicWeather = gs._useDynamicWeather; _gameSysLoading = true;

    };

    this.savePluginData = gs => {
        gs._weatherDurationCounter = _weatherDurationCounter;
        if (_currentRndWeather) _currentRndWeather._icon = null; // For MV compatibility (with RETRO.js)
        gs._currentWeather = { ..._currentRndWeather } || null;
        gs._useDynamicWeather = _useDynamicWeather;
    };

    this.onMapStart = sm => {

        if (_gameSysLoading && _currentRndWeather) {
            if (_currentRndWeather.Id > 0) {
                setWeatherById(parseInt(_currentRndWeather.Id), parseInt(_currentRndWeather.Power), 0, _weatherDurationCounter, true);
            } else {
                let type = getBuiltInWeatherType(_currentRndWeather.Id);
                executeBuiltInWeather([type, Number(_currentRndWeather.Power), 0, false], _currentRndWeather.SupportWeathers);
            } _gameSysLoading = false;
        }

        const w = _this.getWeatherLayer(); if (w) {
            if (w.type == "storm") {
                if (w.power >= _minStormPower) {
                    w.updateFlash = function () { // Ok we got lightning storm now!
                        this.updateFlashStorm();
                    };
                } else { w.updateFlash = () => { }; }
            } else { w.updateFlash = () => { }; }
        }

    };

    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };

    this.createLowerBattleLayer = sb => {
        sb.createWeather();
    };

    this.onMapLoaded = sm => {

        _mapMW = ($gameMap.width() - 1) * OcRam.twh[0];
        _mapMH = ($gameMap.height() - 1) * OcRam.twh[1];

        // To save a lot of "iffing" in weather sprite reborn func let's predefine them!
        switch ($dataMap.scrollType) {
            case 1: // Scroll Y
                this.wasLoopPoint = function (weather, sprite) {
                    if (weather.origin.y > _mapMH) { sprite.ay += weather.origin.y; return true; }
                    if (sprite.y > _mapMH) { sprite.ay -= (_mapMH + 48); return true; }
                    return false;
                }; break;
            case 2: // Scroll X
                this.wasLoopPoint = function (weather, sprite) {
                    if (weather.origin.x > _mapMW) { sprite.ax += weather.origin.x; return true; }
                    if (sprite.x > _mapMW) { sprite.ax -= (_mapMW + 48); return true; }
                    return false;
                }; break;
            case 3: // Scroll XY
                this.wasLoopPoint = function (weather, sprite) {
                    if (weather.origin.x > _mapMW) { sprite.ax += weather.origin.x; return true; }
                    if (weather.origin.y > _mapMH) { sprite.ay += weather.origin.y; return true; }
                    if (sprite.x > _mapMW) { sprite.ax -= (_mapMW + 48); return true; }
                    if (sprite.y > _mapMH) { sprite.ay -= (_mapMH + 48); return true; }
                    return false;
                }; break;
            default: // No scroll - No loop point... Ever!
                this.wasLoopPoint = () => false; break;
        }

        if (OcRam._menuCalled) { return; }
        else { setIndoorsFlag(); }

        if (OcRam.isIndoors()) {

            _indoorsInstructions.forEach(plugin_cmd => {
                executePluginCommand(plugin_cmd);
            }); let this_bgs = { name: '', volume: 0, pitch: 100, pan: 0, pos: 0 };

            if (_noLightnings) {
                AudioManager._keepBGS23 = false;
                AudioManager.stopBgs2(); AudioManager.stopBgs3();
                AudioManager._keepBGS23 = true;
            } else {
                const ctype = _currentRndWeather ? -_currentRndWeather.Type : 0;
                this_bgs = getCurrentWeatherBGS23(ctype); AudioManager.playBgs2(this_bgs);
                const sw = _currentRndWeather ? _currentRndWeather.SupportWeathers : {};
                if (sw && sw.TypeBelow) {
                    if (sw.TypeBelow == 5 || sw.TypeBelow == 6) {
                        this_bgs = getCurrentWeatherBGS23(-sw.TypeBelow); AudioManager.playBgs3(this_bgs);
                    } else {
                        this_bgs = getCurrentWeatherBGS23(0); AudioManager.playBgs3(this_bgs);
                    }
                } else {
                    this_bgs = getCurrentWeatherBGS23(0); AudioManager.playBgs3(this_bgs);
                }
            }

        } else {
            if (_currentRndWeather != null) {
                if (_currentRndWeather.Id > 0) {
                    const old_dura = _weatherDurationCounter;
                    setWeatherById(parseInt(_currentRndWeather.Id), parseInt(_currentRndWeather.Power), 0, _weatherDurationCounter, true);
                    _weatherDurationCounter = old_dura;
                } else {
                    const old_dura = _weatherDurationCounter;
                    executeBuiltInWeather([getBuiltInWeatherType(_currentRndWeather.Id), _currentRndWeather.Power, 0, false], _currentRndWeather.SupportWeathers);
                    _weatherDurationCounter = old_dura;
                }
            }
        }

        _possibleWeatherPools = null;

        if (_useTimeSystem && !OcRam._justLoaded) {
            if (_prevSeason !== OcRam.Time_System._seasonId) {
                setRandomWeather();
            } _prevSeason = OcRam.Time_System._seasonId;
        }

    };

    this.onDatabaseLoaded = function (dm) { };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "clearWeather", function (args) {
        _this.debug("Plugin command: clearWeather", args); $gameScreen.clearAllWeatherFX(_transitionTime);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "disableAutoWeather", function (args) {
        _this.debug("Plugin command: disableAutoWeather", args); _useDynamicWeather = false;
    });

    PluginManager.registerCommand("OcRam_" + this.name, "enableAutoWeather", function (args) {
        _this.debug("Plugin command: enableAutoWeather", args); _useDynamicWeather = true;
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setCoreWeather", function (args) {
        _this.debug("Plugin command: setCoreWeather", args); // [weather_id] [power] [fade] [duration]
        const wid = Number(args.weatherId);
        const transition = Number(args.transition) || _transitionTime;
        $gameScreen.clearAllWeatherFX(transition);
        if (wid > 0) {
            setWeatherById(wid, Number(args.power), Number(transition), Number(args.duration), true);
        } else if (wid <= 0) {
            const tmp = _builtInWeatherDuration;
            _builtInWeatherDuration = Number(args.duration) || _builtInWeatherDuration;
            let type = getBuiltInWeatherType(wid);
            const sw = regulateSupportWeathers(args.SupportWeathers);
            sw.AbovePower = Number(args.abovePower); sw.BelowPower = Number(args.belowPower);
            executeBuiltInWeather([type, Number(args.power), Number(transition), false], sw);
            _builtInWeatherDuration = tmp;
        } //else { $gameScreen.clearAllWeatherFX(Number(args.transition)); }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setWeather", function (args) {
        _this.debug("Plugin command: setWeather", args); // [weather_id] [power] [fade] [duration]
        const wid = Number(args.weatherId);
        const transition = Number(args.transition) || _transitionTime;
        $gameScreen.clearAllWeatherFX(transition);
        if (wid > 0) {
            setWeatherById(wid, Number(args.power), Number(transition), Number(args.duration), true);
        } else if (wid <= 0) {
            const tmp = _builtInWeatherDuration;
            _builtInWeatherDuration = Number(args.duration) || _builtInWeatherDuration;
            let type = getBuiltInWeatherType(wid);
            executeBuiltInWeather([type, Number(args.power), Number(transition), false], null);
            _builtInWeatherDuration = tmp;
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "randomWeather", function (args) {
        _this.debug("Plugin command: randomWeather", args);
        switch (Number(args.poolId)) {
            case -1: setRandomWeather(getRandomPoolId()); break;
            case 0: setRandomWeather(); break;
            default: setRandomWeather(Number(args.poolId)); break;
        }
    });

}.bind(OcRam.Weather_System)());
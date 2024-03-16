//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Time_System.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.13) alert("OcRam core v1.13 or greater is required!");

OcRam.addPlugin("Time_System", "1.12");

/*:
 * @target MZ
 * @plugindesc v1.12 Advanced Time System for your RPG Maker MZ/MV projects.
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderBefore OcRam_Weather_System
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command startTime
 * @text Start Time
 * @desc Starts Time System clock.
 *
 * @command stopTime
 * @text Stop Time
 * @desc Stops Time System clock.
 *
 * @command showTime
 * @text Show Time
 * @desc Show Time System clock?
 *
 * @command hideTime
 * @text Hide Time
 * @desc Hide Time System clock?
 *
 * @command reverseTime
 * @text Reverse Time
 * @desc Reverse time itself!
 *
 * @arg reversed
 * @type boolean
 * @default false
 * @text Reverse Time
 * @desc Reverse time true / false.
 *
 * @command timeInterval
 * @text Time interval
 * @desc Set time interval in milliseconds.
 *
 * @arg interval
 * @type number
 * @decimals 0
 * @min 250
 * @max 600000
 * @default 1000
 * @text Time interval
 * @desc Time interval in milliseconds.
 *
 * @command addTime
 * @text Add time
 * @desc Add seconds, minutes, hours, days or months to time.
 *
 * @arg amount
 * @type number
 * @decimals 0
 * @min 1
 * @max 600000
 * @default 1
 * @text Amount
 * @desc Amount of time units to add?
 *
 * @arg unit
 * @type select
 * @option Minutes
 * @value Minutes
 * @option Hours
 * @value Hours
 * @option Days
 * @value Days
 * @option Months
 * @value Months
 * @default Minutes
 * @text Unit
 * @desc Time unit.
 *
 * @command setDateTime
 * @text Set date and time
 * @desc Set date and time.
 *
 * @arg year
 * @type number
 * @decimals 0
 * @default 1000
 * @text Year
 * @desc Year.
 *
 * @arg month
 * @type number
 * @decimals 0
 * @default 1
 * @text Month
 * @desc Month.
 *
 * @arg day
 * @type number
 * @decimals 0
 * @default 1
 * @text Day
 * @desc Day.
 *
 * @arg hour
 * @type number
 * @decimals 0
 * @default 12
 * @text Hour
 * @desc Hour.
 *
 * @arg minute
 * @type number
 * @decimals 0
 * @default 0
 * @text Minute
 * @desc Minute.
 *
 * @command setDate
 * @text Set date
 * @desc Set date.
 *
 * @arg year
 * @type number
 * @decimals 0
 * @default 1000
 * @text Year
 * @desc Year
 *
 * @arg month
 * @type number
 * @decimals 0
 * @default 1
 * @text Month
 * @desc Month.
 *
 * @arg day
 * @type number
 * @decimals 0
 * @default 1
 * @text Day
 * @desc Day.
 *
 * @command setTime
 * @text Set time
 * @desc Set time.
 *
 * @arg hour
 * @type number
 * @decimals 0
 * @default 12
 * @text Hour
 * @desc Hour.
 *
 * @arg minute
 * @type number
 * @decimals 0
 * @default 0
 * @text Minute
 * @desc Minute.
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Variables and switches
 * @desc This parameter is just for grouping.
 *
 * @param Time interval variable Id
 * @parent Variables and switches
 * @type variable
 * @desc Variable Id where value effects the time speed in game.
 * How many milliseconds (IRL) is one minute of game time?
 * Default: 1
 * @default 1
 *
 * @param Time enabled switch Id
 * @parent Variables and switches
 * @type switch
 * @desc Off = Time is stopped, On = Time is going on.
 * @default 1
 *
 * @param Season variable Id
 * @parent Variables and switches
 * @type variable
 * @desc Variable Id where value represents current season
 * (Spring=1, Summer=2, Autumn=3, Winter=4) handled by plugin.
 * @default 2
 *
 * @param Day phase variable Id
 * @parent Variables and switches
 * @type variable
 * @desc Variable Id where value represents current day phase
 * (Night=1, Dawn=2, Day=3, Dusk=4) handled by plugin.
 * @default 3
 *
 * @param Year variable Id
 * @parent Variables and switches
 * @type variable
 * @desc This variable keeps track for years.
 * @default 4
 *
 * @param Month variable Id
 * @parent Variables and switches
 * @type variable
 * @desc This variable keeps track for months.
 * @default 5
 *
 * @param Day variable Id
 * @parent Variables and switches
 * @type variable
 * @desc This variable keeps track for days.
 * @default 6
 *
 * @param Hour variable Id
 * @parent Variables and switches
 * @type variable
 * @desc This variable keeps track for hours.
 * @default 7
 *
 * @param Minute variable Id
 * @parent Variables and switches
 * @type variable
 * @desc This variable keeps track for minutes.
 * @default 8
 * 
 * @param Weekday variable Id
 * @parent Variables and switches
 * @type variable
 * @desc Weekdays: 0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri, 5 = Sat, 6 = Sun.
 * @default 9
 * 
 * @param Night switch Id
 * @parent Variables and switches
 * @type switch
 * @desc Switch id for the night phase.
 * (ON = When it's night and OFF = When it's not night).
 * @default 2
 *
 * @param Dawn switch Id
 * @parent Variables and switches
 * @type switch
 * @desc Switch id for the dawn phase.
 * (ON = When it's dawn and OFF = When it's not dawn).
 * @default 3
 *
 * @param Day switch Id
 * @parent Variables and switches
 * @type switch
 * @desc Switch id for the day phase.
 * (ON = When it's day and OFF = When it's not day).
 * @default 4
 *
 * @param Dusk switch Id
 * @parent Variables and switches
 * @type switch
 * @desc Switch id for the dusk phase.
 * (ON = When it's dusk and OFF = When it's not dusk).
 * @default 5
 *
 * @param Time cycles
 * @type boolean
 * @desc Just for groupping! Set custome time cycles here.
 * @default false
 *
 * @param Season captions
 * @parent Time cycles
 * @type text[]
 * @desc Captions for the seasons.
 * @default ["Spring","Summer","Autumn","Winter"]
 *
 * @param Month captions
 * @parent Time cycles
 * @type text[]
 * @desc Captions for the months. (Must have same amount of captions as 'short' version)
 * @default ["January","February","March","April","May","June","July","August","September","October","November","December"]
 *
 * @param Month captions (short)
 * @parent Time cycles
 * @type text[]
 * @desc Captions for the short name months. (Must have same amount of captions as 'long' version)
 * @default ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
 *
 * @param Weekday captions
 * @parent Time cycles
 * @type text[]
 * @desc Captions for the weekdays. (Must have same amount of captions as 'short' version)
 * @default ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
 *
 * @param Weekday captions (short)
 * @parent Time cycles
 * @type text[]
 * @desc Captions for the short name weekdays. (Must have same amount of captions as 'long' version)
 * @default ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
 *
 * @param Days per month
 * @parent Time cycles
 * @type number
 * @min 1
 * @max 9999
 * @desc How many days are there in 1 month?
 * @default 30
 *
 * @param Hours per day
 * @parent Time cycles
 * @type number
 * @min 2
 * @max 9999
 * @desc How many hours are there in 1 day?
 * @default 24
 *
 * @param Minutes per hour
 * @parent Time cycles
 * @type number
 * @min 2
 * @max 9999
 * @desc How many minutes are there in 1 hour?
 * @default 60
 *
 * @param Seasons start month
 * @parent Time cycles
 * @type number
 * @min 1
 * @max 9999
 * @desc What month determinates start of seasons (Spring as default starts at month 3)
 * @default 3
 *
 * @param Night phase start
 * @parent Time cycles
 * @type number
 * @desc When does night phase start? (It will end when dawn phase starts)
 * @default 22
 *
 * @param Dawn phase start
 * @parent Time cycles
 * @type number
 * @desc When does dawn phase start? (It will end when day phase starts)
 * @default 6
 *
 * @param Day phase start
 * @parent Time cycles
 * @type number
 * @desc When does day phase start? (It will end when dusk phase starts)
 * @default 10
 *
 * @param Dusk phase start
 * @parent Time cycles
 * @type number
 * @desc When does dusk phase start? (It will end when night phase starts)
 * @default 18
 *
 * @param Show clock in menu
 * @type boolean
 * @desc Display clock in menu?
 * @default true
 * 
 * @param Custom menu position
 * @parent Show clock in menu
 * @type boolean
 * @desc Use custom menu position (x, y, w, h). NOTE: Menu layout stays untouched - time window is only appended!
 * @default false
 * 
 * @param X Eval
 * @parent Custom menu position
 * @type text
 * @desc Eval to use when x is calculated.
 * @default Graphics.boxWidth - this.mainCommandWidth()
 * 
 * @param Y Eval
 * @parent Custom menu position
 * @type text
 * @desc Eval to use when y is calculated.
 * @default this.mainAreaBottom() - this.calcWindowHeight(1, true) - this.calcWindowHeight(_showWeatherInMenu ? 3 : 2, false)
 * 
 * @param Width Eval
 * @parent Custom menu position
 * @type text
 * @desc Eval to use when width is calculated.
 * @default this.mainCommandWidth()
 * 
 * @param Height Eval
 * @parent Custom menu position
 * @type text
 * @desc Eval to use when height is calculated.
 * @default this.calcWindowHeight(_showWeatherInMenu ? 3 : 2, false)
 * 
 * @param Force time layout
 * @parent Show clock in menu
 * @type select
 * @option [Auto]
 * @value 0
 * @option Horizontal (wide window)
 * @value 1
 * @option Vertical (tall window)
 * @value 2
 * @desc Force time window layout?
 * @default 0
 * 
 * @param Time format
 * @parent Show clock in menu
 * @type select
 * @option 24h clock
 * @value 0
 * @option 12h clock (AM/PM)
 * @value 1
 * @desc Time format.
 * @default 0
 * 
 * @param Date format
 * @parent Show clock in menu
 * @type select
 * @option Day/Month/Year
 * @value 0
 * @option Month/Day/Year
 * @value 1
 * @option Year/Month/Day
 * @value 2
 * @option [Only weekdays + time]
 * @value 3
 * @option [None] - I use only time
 * @value 4
 * @desc Date format.
 * @default 0
 * 
 * @param Time caption
 * @parent Show clock in menu
 * @type text
 * @desc Caption for "time".
 * @default Time
 * 
 * @param Show clock in map
 * @type boolean
 * @desc Display clock in map?
 * @default true
 * 
 * @param Clock align in map
 * @parent Show clock in map
 * @type select
 * @option Bottom-Left
 * @value 1
 * @option Bottom-Center
 * @value 2
 * @option Bottom-Right
 * @value 3
 * @option Top-Left
 * @value 7
 * @option Top-Center
 * @value 8
 * @option Top-Right
 * @value 9
 * @desc What is the position of the clock in map window?
 * @default 9
 * 
 * @param Clock type in map
 * @parent Show clock in map
 * @type select
 * @option Plain text (just time)
 * @value 0
 * @option Analog
 * @value 1
 * @option Digital
 * @value 2
 * @desc What type of clock should be used?
 * @default 0
 * 
 * @param Clock padding in map
 * @parent Show clock in map
 * @type number
 * @desc What is the padding of the clock in pixels?
 * @default 8
 * 
 * @param Clock center X
 * @parent Show clock in map
 * @type number
 * @desc What is the center of clock in X-axis?
 * @default 172
 *
 * @param Clock center Y
 * @parent Show clock in map
 * @type number
 * @desc What is the center of clock in Y-axis?
 * @default 48
 * 
 * @param Minute hand length
 * @parent Show clock in map
 * @type number
 * @desc What is the length of the minute hand in pixels?
 * @default 40
 * 
 * @param Hour hand length
 * @parent Show clock in map
 * @type number
 * @desc What is the length of the hour hand in pixels?
 * @default 25
 * 
 * @param Digital clock width
 * @parent Show clock in map
 * @type number
 * @desc What is the width of the digital clock (if used)?
 * @default 70
 * 
 * @param Digital font face
 * @parent Show clock in map
 * @type text
 * @desc What is the font face of the digital clock (if used)?
 * @default rmmz-mainfont
 * 
 * @param Digital font size
 * @parent Show clock in map
 * @type number
 * @desc What is the font size of the digital clock (if used)?
 * @default 24
 * 
 * @param Digital blink
 * @parent Show clock in map
 * @type boolean
 * @desc Blink digital clock time seperator (if used)?
 * @default true
 * 
 * @param Clock elements
 * @parent Show clock in map
 * @type struct<ClockElement>[]
 * @desc Clock elements in map clock
 * @default ["{\"X\":\"5\",\"Y\":\"0\",\"Width\":\"120\",\"Align\":\"0\",\"FontFace\":\"rmmz-mainfont\",\"FontSize\":\"18\",\"Type\":\"0\"}","{\"X\":\"7\",\"Y\":\"28\",\"Width\":\"90\",\"Align\":\"0\",\"FontFace\":\"rmmz-mainfont\",\"FontSize\":\"18\",\"Type\":\"9\"}","{\"X\":\"7\",\"Y\":\"48\",\"Width\":\"90\",\"Align\":\"0\",\"FontFace\":\"rmmz-mainfont\",\"FontSize\":\"18\",\"Type\":\"7\"}","{\"X\":\"90\",\"Y\":\"40\",\"Width\":\"32\",\"Align\":\"0\",\"FontFace\":\"rmmz-mainfont\",\"FontSize\":\"18\",\"Type\":\"16\"}"]
 * 
 * @param Color tinting
 * @desc This parameter is just for grouping.
 *
 * @param Effect transition time
 * @parent Color tinting
 * @type number
 * @desc Time in frames for effects to change.
 * (from day to dusk etc...)
 * @default 480
 *
 * @param Night tint color
 * @parent Color tinting
 * @type struct<RGBG>
 * @desc Night auto tint color.
 * @default {"Red":"-96","Green":"-96","Blue":"-32","Gray":"48"}
 *
 * @param Dawn tint color
 * @parent Color tinting
 * @type struct<RGBG>
 * @desc Dawn auto tint color.
 * @default {"Red":"68","Green":"-32","Blue":"-32","Gray":"0"}
 *
 * @param Day tint color
 * @parent Color tinting
 * @type struct<RGBG>
 * @desc Day auto tint color.
 * @default {"Red":"0","Green":"0","Blue":"0","Gray":"0"}
 *
 * @param Dusk tint color
 * @parent Color tinting
 * @type struct<RGBG>
 * @desc Dusk auto tint color.
 * @default {"Red":"68","Green":"-32","Blue":"-32","Gray":"0"}
 *
 * @param Auto tint indoors
 * @parent Color tinting
 * @type boolean
 * @desc Tint screen also in <indoors> tagged maps.
 * @default false
 *
 * @param Indoors night
 * @parent Auto tint indoors
 * @type struct<RGBG>
 * @desc Night auto tint color.
 * @default {"Red":"-96","Green":"-96","Blue":"-32","Gray":"48"}
 *
 * @param Indoors dawn
 * @parent Auto tint indoors
 * @type struct<RGBG>
 * @desc Dawn auto tint color.
 * @default {"Red":"68","Green":"-32","Blue":"-32","Gray":"0"}
 *
 * @param Indoors day
 * @parent Auto tint indoors
 * @type struct<RGBG>
 * @desc Day auto tint color.
 * @default {"Red":"0","Green":"0","Blue":"0","Gray":"0"}
 *
 * @param Indoors dusk
 * @parent Auto tint indoors
 * @type struct<RGBG>
 * @desc Dusk auto tint color.
 * @default {"Red":"68","Green":"-32","Blue":"-32","Gray":"0"}
 *
 * @param Other parameters
 * @desc This parameter is just for grouping
 * 
 * @param Start date and time
 * @parent Other parameters
 * @type text
 * @desc Start date and time for new game?
 * year/month/day hour(24h):minute (ie. 1000/12/30 23:59)
 * @default 1000/1/1 12:00
 *
 * @param Season change CE
 * @parent Other parameters
 * @type common_event
 * @desc Run run this event + built-in features when season changes
 * 0 = Not in use (use only built-in features)
 * @default 0
 * 
 * @param Day phase CE
 * @parent Other parameters
 * @type common_event
 * @desc Common event to trigger on dayphases.
 * 0 = Not in use (use built-in features)
 * @default 0
 * 
 * @param Use only CE on day phases
 * @parent Other parameters
 * @type boolean
 * @desc If this option is on/true it will DISABLE built-in dayphase functionality, if CE is used!
 * @default true
 *
 * @param Stop time on interact
 * @parent Other parameters
 * @type boolean
 * @desc Stops time while player is interacting with events.
 * @default false
 *
 * @param Stop time in battles
 * @parent Other parameters
 * @type boolean
 * @desc Stop time during battles.
 * @default true
 *
 * @param Stop time indoors
 * @parent Other parameters
 * @type boolean
 * @desc Stop time in <indoors> tagged maps.
 * @default false
 *
 * @param Auto-start timer
 * @parent Other parameters
 * @type boolean
 * @desc Enable 'Time enabled switch' on new game?
 * @default true
 * 
 * @param Auto BGM Fade
 * @parent Other parameters
 * @type number
 * @min 0
 * @max 60
 * @desc Auto BGM Fade in/out time in seconds.
 * @default 2
 * 
 * @param Auto BGS Fade
 * @parent Other parameters
 * @type number
 * @min 0
 * @max 60
 * @desc Auto BGS Fade in time in seconds.
 * @default 2
 * 
 * @param Change tileset immediatly
 * @parent Other parameters
 * @type boolean
 * @desc Will change tileset immediatly when season is changed.
 * @default false
 *
 * @param Use realtime
 * @parent Other parameters
 * @type boolean
 * @desc If true, overrides ALL custom cycles and start time!
 * "Change tileset immediatly" is recommended to be "true"
 * @default false
 *
 * @param Debug mode
 * @parent Other parameters
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * This plugin will give you core platform to create your own time system.
 *
 * Variables and switches are used for 2 reasons.
 *   1. They are automatically saved and are ready to use when game is loaded
 *   2. It gives much easier control (via change variable/switch command)
 *
 * For each season change this plugin will change tileset to corresponding
 * season next time player is transfered.
 * 
 * Dynamic days in month, months in year, days in week etc...!
 * 
 * NOTE: If short month/weekday captions are different from their long version:
 * array that has less captions will be used as max months/weekdays
 * 
 * NOTE2: If month count is not divisible by the number of seasons, remaining
 * months will be added to last season!
 * 
 * NOTE3: Using "Weather info" requires OcRam_Weather_System -plugin!
 * Get it from: https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * NOTE4: Custom menu position default values are calculated based on RTP
 * menu layout. Custom menu position DOESN'T overwrite menu layout it only
 * appends time/weather window to existing menu layout with given parameters!
 * 
 * NOTE5: Using realtime will disable any custom time cycles. "Start time"
 * is forced to the current date when new game is started. Also other functions
 * /commands to control time are disabled. (interval, reverse time etc...)
 * 
 * ----------------------------------------------------------------------------
 * Seasons tileset changes and day phases
 * ============================================================================
 *
 * Use TILESET NOTE field to define tileset to use for each season. 
 * <season_name:tileset_id> Example: <winter:7> uses tileset with id 7 
 * when it's season called 'winter'.
 *
 * Use <indoors> tag in tileset/map note field to flag it as "indoors".
 * 
 * Use <seasons:disabled> tag in MAP note field to disable season changes
 * in this map. You may also OVERRIDE tileset season id tags in MAP NOTE field.
 *
 * IF day phase common event is not used (value is 0):
 *   Night will default tint(-96, -96, -32, 48)
 *   Dawn will default tint(68, -32, -32, 0)
 *   Day will default tint(0, 0, 0, 0)
 *   Dusk will default tint(68, -32, -32, 0)
 *
 * Or you can do your own eventing via common events (You may need some
 * light/layer/weather/audio plugins to accomplish what you want)
 *
 * ----------------------------------------------------------------------------
 * Season / Day phase specific BGS
 * ============================================================================
 * You may use tileset and map note fields to add "notetags" for season and
 * day phase specific BGS!
 *
 * Tileset notetags inheritance (goto next line if not found):
 *   <bgs-season:night_bgs,dawn_bgs,day_bgs,dusk_bgs>
 *   <bgs-season:night_bgs,dawn_bgs,default_bgs>
 *   <bgs-season:night_bgs,default_bgs>
 *   <bgs-season:default_bgs>
 *   <bgs:night_bgs,dawn_bgs,day_bgs,dusk_bgs>
 *   <bgs:night_bgs,dawn_bgs,default_bgs>
 *   <bgs:night_bgs,default_bgs>
 *   <bgs:default_bgs>
 *   
 * BGM notetags are working sameway as BGS notetags
 *   <bgm-season:night_bgm,dawn_bgm,day_bgm,dusk_bgm> 
 *   <bgm:night_bgm,dawn_bgm,day_bgm,dusk_bgm> 
 *   <bgm:default_bgm> etc...
 *
 * MAP notetags will OVERRIDE tileset notetags!
 *
 * BGS EXAMPLES:
 *   <bgs:birds> // Default BGS (in this case only on spring)
 *   <bgs-winter:wind> // In winter times wind always blows
 *   <bgs-summer:crickets,birds> // Crickets at night and default to birds
 *   <bgs-autumn:owl,birds> // Owl at night and default to birds
 * 
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * 
 * Time units:
 *     Minutes
 *     Hours
 *     Days
 *     Months
 * 
 * MV example: OcRam_Time_System/startTime
 * startTime        Starts Time System clock
 * 
 * MV example: OcRam_Time_System/stopTime
 * stopTime         Stops Time System clock
 * 
 * MV example: OcRam_Time_System/showTime
 * showTime         Show Time System clock?
 * 
 * MV example: OcRam_Time_System/hideTime
 * hideTime         Hide Time System clock?
 * 
 * MV example: OcRam_Time_System/reverseTime false
 * reverseTime      Reverse time itself!
 * >> reversed      Reverse time true / false.
 * 
 * MV example: OcRam_Time_System/timeInterval 1000
 * timeInterval     To adjust time interval in milliseconds
 * >> interval      Time interval in milliseconds.
 * 
 * MV example: OcRam_Time_System/addTime 8 Hours
 * addTime          To add desired amount of time
 * >> amount        Amount of time units to add?
 * >> unit          See "Time unit."
 * 
 * MV example: OcRam_Time_System/setDateTime 1000 12 30 23 59
 * setDateTime      To set date and time.
 * >> year          Year?
 * >> month         Month?
 * >> day           Day?
 * >> hour          Hour?
 * >> minute        Minute?
 * 
 * MV example: OcRam_Time_System/setDate 1000 12 30
 * setDate          To set date.
 * >> year          Year?
 * >> month         Month?
 * >> day           Day?
 * 
 * MV example: OcRam_Time_System/setTime 23 59
 * setTime          To set time.
 * >> hour          Hour?
 * >> minute        Minute?
 * 
 * ----------------------------------------------------------------------------
 * JS calls
 * ============================================================================
 * To get datetime related strings:
 *   OcRam.Time_System.getMonthString();       // Return: "Jan"
 *   OcRam.Time_System.getMonthStringLong();   // Return: "January"
 *   OcRam.Time_System.getWeekdayString();     // Return: "Mon"
 *   OcRam.Time_System.getWeekdayStringLong(); // Return: "Monday"
 *   OcRam.Time_System.getDayMonth();          // Return: "13. Jan"
 *   OcRam.Time_System.getDayMonthLong();      // Return: "13. January"
 *   OcRam.Time_System.getDateString();        // Return: "13. Jan 2000"
 *   OcRam.Time_System.getDateStringLong();    // Return: "13. January 2000"
 *   OcRam.Time_System.getTimeString();        // Return: "13:30" / "01:30 PM"
 *   OcRam.Time_System.getSeasonString();      // Return: "Spring"
 *   OcRam.Time_System.getSeasonById(1);       // Returns "Spring"
 *   OcRam.Time_System.getSeasonByMonth(6);    // Returns "Summer"
 *   OcRam.Time_System.onDayPhase();           // Can be extended with JS!
 * 
 * NOTE: "Date format" -plugin parameter will alter getDayMonth, 
 *       getDayMonthLong, getDateString and getDateStringLong results.
 *       Default Date format is "Day/Month/Year"
 * 
 * To trigger autoplay(s) any time use script line:
 *   $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
 *
 * To show/hide map clock JS calls:
 *   $gameSystem.showMapClock(); $gameSystem.hideMapClock();
 *
 * Check if indoors JS call:    OcRam.isIndoors();
 *   
 * Check if time is reversed:   OcRam.Time_System.isTimeReversed();
 *  
 * Check between different dates:
 *   let d1 = OcRam.getCurrentDateInt();
 *   let d2 = OcRam.getDateInt(2020, 12, 31, 23, 59);
 *   if (d1 > d2) ... // d1 greater than d2?
 *   if (d2 - d1) ... // Date diff checks
 *   
 * To force seasonal tileset change NOW:
 *   OcRam.Time_System.updateSeasonalTileset();
 * 
 * To add time:
 *   OcRam.Time_System.addMinutes(minutes_to_add);
 *   OcRam.Time_System.addHours(hours_to_add);
 *   OcRam.Time_System.addDays(days_to_add);
 *   OcRam.Time_System.addMonths(months_to_add);
 *
 * To subtract time:
 *   OcRam.Time_System.subtractMinutes(minutes_to_subtract);
 *   OcRam.Time_System.subtractHours(hours_to_subtract);
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
 * 2020/09/06 v1.01 - New pluging command "Reverse time" (Credits to JosephG)
 * 2020/09/19 v1.02 - New JS call OcRam.Time_System.getCurrentDateInt()
 *                    New JS call OcRam.Time_System.getDateInt(y, m, d, h, n)
 *                    New JS calls to add / subtract time (Credits to JosephG)
 * 2020/09/27 v1.03 - Map clock window is now under messages layer
 *                    + Compatibility patch for OcRam passages
 * 2020/10/10 v1.04 - Date format feature added (Credits: Resurrection Games)
 * 2021/03/07 v1.05 - New JS call OcRam.Time_System.onDayPhase() can be 
 *                    extended with you very own JS
 *                    Day phase variable is also updated while indoors!
 *                    Fixed bug where night tint didn't occur w/o OcRam_Lights
 *                    Night/dawn/day/dusk switch ids for easier eventing!
 *                    Indoors tint parameters 4x (used with indoors auto tint)
 *                    (Credits to Moon_Haven)
 * 2021/04/02 v1.06 - Support for VisuMZ "New game on start" QoL setting
 * 2021/06/04 v1.07 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Time won't be stopped anymore if game is saved via menu
 * 2021/08/17 v1.08 - Clock type "Plain text" won't crash menu anymore
 *                    (Credits to Padramyr)
 * 2021/08/29 v1.09 - Added new Date format [None] - If only time is used
 *                    Added menu time window custom position parameter(s)
 *                    (Credits to Killuki Zaoldyeck)
 *                    Added new Date format [Weekdays + time]
 *                    New plugin parameter "Time" caption
 *                    New plugin parameter to force time window layout to
 *                    horizontal (wide) or vertical (tall)
 *                    Fixed bug: Spamming menu won't freeze time anymore
 *                    (Especially with VisuMZ menu)!
 *                    Hours per day and minutes per hour are now configurable!
 *                    (Credits to r66r)
 *                    "Stop time on interact" won't freeze time anymore on
 *                    map transfer (Credits to Dustin)
 * 2021/10/21 v1.10 - Plugin meta data (order/base) is now editor compatible!
 *                    "Battle time stop" parameter fixed (Credits to r66r)
 * 2021/12/01 v1.11 - Compatibilty patch with OcRam_Weather_System v1.05!
 *                    OcRam.Time_System.dayPhase() 1:Night 2:Dawn 3:Day 4:Dusk
 * 2022/01/23 v1.12 - $gameSystem.isClockShown() and seamless map transfer
 *                    tinting with OcRam_Map_Transfer!
 *                    New plugin param "Use realtime" (Credits: IntoTheDrink)
 *                    Added BGS Fade parameter and merged fade out/in BGM
 *                    Also fixed bug when used auto BGM notetags
 *                    updateSeasonalTileset() changes tileset only if found 1!
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * Scene_Menu.commandWindowRect (IF clock is show in menu)
 *
 * @requiredAssets
 * img/ocram/analog.png
 * @requiredAssets
 * img/ocram/digital.png
 * @requiredAssets
 * img/ocram/dawn.png
 * @requiredAssets
 * img/ocram/day.png
 * @requiredAssets
 * img/ocram/dusk.png
 * @requiredAssets
 * img/ocram/night.png
 */
/*~struct~RGBG:
 *
 * @param Red
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Red color.
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Green color.
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @type number
 * @desc Amount of Blue color.
 *
 * @param Gray
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Gray color.
 */

/*~struct~ClockElement:
 *
 * @param X
 * @type number
 * @min -9999
 * @max 9999
 * @desc X position of the element.
 * @default 0
 *
 * @param Y
 * @type number
 * @min -9999
 * @max 9999
 * @desc Y position of the element.
 * @default 0
 *
 * @param Width
 * @type number
 * @min 64
 * @max 9999
 * @type number
 * @desc Width in pixels.
 * @default 100
 * 
 * @param Align
 * @type number
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2
 * @desc Text align.
 * @default 0
 * 
 * @param FontFace
 * @type text
 * @desc Font face.
 * @default rmmz-mainfont
 * 
 * @param FontSize
 * @type number
 * @desc Font size.
 * @default 18
 *
 * @param Type
 * @type select
 * @option Day. Month Year
 * @value 0
 * @option Day. Month (short) Year
 * @value 1
 * @option Day. Month
 * @value 2
 * @option Day. Month (short)
 * @value 3
 * @option Day.
 * @value 4
 * @option Month
 * @value 5
 * @option Month (short)
 * @value 6
 * @option Weekday
 * @value 7
 * @option Weekday (short)
 * @value 8
 * @option Season
 * @value 9
 * @option Year
 * @value 10
 * @option Time (hh:mm)
 * @value 11
 * @option Weather name
 * @value 12
 * @option Day phase icon
 * @value 16
 * @option Weather icon
 * @value 17
 * @desc Element content
 * @default 0
 * 
 * @
~*/ // End of structs

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    let _startRealTime = ""; OcRam.Map_Transfer = {};
    OcRam.Map_Transfer.isTransfering = () => false;

    const _useRealTime = OcRam.getBoolean(this.parameters['Use realtime']);
    (function () {
        const d = new Date(); _startRealTime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    });

    const _autoStartTimer = OcRam.getBoolean(this.parameters['Auto-start timer']);
    const _timeEnabledSwitchId = Number(this.parameters['Time enabled switch Id']);
    const _timeIntervalVarId = Number(this.parameters['Time interval variable Id']);
    const _seasonVarId = Number(this.parameters['Season variable Id']);
    const _dayPhaseVarId = Number(this.parameters['Day phase variable Id']);
    const _seasonCE = Number(this.parameters['Season change CE']);
    const _dayPhaseCE = Number(this.parameters['Day phase CE']);
    const _yearVarId = Number(this.parameters['Year variable Id']);
    const _monthVarId = Number(this.parameters['Month variable Id']);
    const _dayVarId = Number(this.parameters['Day variable Id']);
    const _weekdayVarId = Number(this.parameters['Weekday variable Id']);
    const _hourVarId = Number(this.parameters['Hour variable Id']);
    const _minuteVarId = Number(this.parameters['Minute variable Id']);
    const _nightSwitchId = Number(this.parameters['Night switch Id']);
    const _dawnSwitchId = Number(this.parameters['Dawn switch Id']);
    const _daySwitchId = Number(this.parameters['Day switch Id']);
    const _duskSwitchId = Number(this.parameters['Dusk switch Id']);
    const _effectTransitionTime = Number(this.parameters['Effect transition time']);
    const _stopTimeInBattles = OcRam.getBoolean(this.parameters['Stop time in battles']);
    const _stopTimeIndoors = OcRam.getBoolean(this.parameters['Stop time indoors']);
    const _autoTintIndoors = OcRam.getBoolean(this.parameters['Auto tint indoors']);
    const _timeCaption = this.parameters['Time caption'] || "Time";
    const _startDateStamp = _useRealTime ? _startRealTime : this.parameters['Start date and time'];
    const _bgmFadeDuration = Number(this.parameters['Auto BGM Fade'] || 0);
    const _bgsFadeDuration = Number(this.parameters['Auto BGS Fade'] || 0);
    const _useOnlyCE = OcRam.getBoolean(this.parameters['Use only CE on day phases']);
    const _stopTimeOnInteract = OcRam.getBoolean(this.parameters['Stop time on interact']);
    const _showClockInMenu = OcRam.getBoolean(this.parameters['Show clock in menu']);
    const _useCustomMenuTimeWindow = OcRam.getBoolean(this.parameters['Custom menu position']);
    const _customMenuTimeWindowX = ('' + this.parameters['X Eval']);
    const _customMenuTimeWindowY = ('' + this.parameters['Y Eval']);
    const _customMenuTimeWindowW = ('' + this.parameters['Width Eval']);
    const _customMenuTimeWindowH = ('' + this.parameters['Height Eval']);
    const _forceAltMenu = Number(this.parameters['Force time layout']);
    const _altMenu = (!_forceAltMenu) ? ((Window_MenuCommand.prototype.numVisibleRows || Imported.VisuMZ_1_MainMenuCore) ? true : false) : _forceAltMenu == 1 ? true : false;
    let _showClockInMap = OcRam.getBoolean(this.parameters['Show clock in map']);
    const _mapClockAlign = Number(this.parameters['Clock align in map']);
    const _mapClockPadding = Number(this.parameters['Clock padding in map']);
    const _clockType = Number(this.parameters['Clock type in map']);
    const _minuteHandLength = Number(this.parameters['Minute hand length']);
    const _hourHandLength = Number(this.parameters['Hour hand length']);
    const _changeTilesetImmediatly = OcRam.getBoolean(this.parameters['Change tileset immediatly']);
    const _shortWeekdayCaptions = OcRam.getArray(this.parameters['Weekday captions (short)'], ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    const _weekdayCaptions = OcRam.getArray(this.parameters['Weekday captions'], ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
    const _shortMonthCaptions = OcRam.getArray(this.parameters['Month captions (short)'], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    const _monthCaptions = OcRam.getArray(this.parameters['Month captions'], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    const _seasonCaptions = OcRam.getArray(this.parameters['Season captions'], ["Spring", "Summer", "Autumn", "Winter"]);
    const _epiCenter = [Number(this.parameters['Clock center X']), Number(this.parameters['Clock center Y'])];
    let _clockElements = OcRam.getJSONArray(this.parameters['Clock elements']);
    const _tintNight = OcRam.regulateRGBG(JSON.parse(this.parameters['Night tint color']));
    const _tintDawn = OcRam.regulateRGBG(JSON.parse(this.parameters['Dawn tint color']));
    const _tintDay = OcRam.regulateRGBG(JSON.parse(this.parameters['Day tint color']));
    const _tintDusk = OcRam.regulateRGBG(JSON.parse(this.parameters['Dusk tint color']));
    const _tintNightIndoors = !this.parameters['Indoors night'] ? _tintNight : OcRam.regulateRGBG(JSON.parse(this.parameters['Indoors night']));
    const _tintDawnIndoors = !this.parameters['Indoors dawn'] ? _tintDawn : OcRam.regulateRGBG(JSON.parse(this.parameters['Indoors dawn']));
    const _tintDayIndoors = !this.parameters['Indoors day'] ? _tintDay : OcRam.regulateRGBG(JSON.parse(this.parameters['Indoors day']));
    const _tintDuskIndoors = !this.parameters['Indoors dusk'] ? _tintDusk : OcRam.regulateRGBG(JSON.parse(this.parameters['Indoors dusk']));
    const _nightStart = Number(this.parameters['Night phase start']) || 22;
    const _dawnStart = Number(this.parameters['Dawn phase start']) || 6;
    const _dayStart = Number(this.parameters['Day phase start']) || 10;
    const _duskStart = Number(this.parameters['Dusk phase start']) || 18;
    const _digitalClockWidth = Number(this.parameters['Digital clock width'] || 70);
    const _digitalFontSize = Number(this.parameters['Digital font size'] || 24);
    const _digitalFontFace = this.parameters['Digital font face'] || 'rmmz-mainfont';
    const _digitalBlink = OcRam.getBoolean(this.parameters['Digital blink']);
    const _daysPerMonth = Number(this.parameters['Days per month'] || 30);
    const _seasonStartMonth = Number(this.parameters['Seasons start month'] || 3);
    const _timeFormat = Number(this.parameters['Time format'] || 0);
    const _dateFormat = Number(this.parameters['Date format'] || 0);

    const _hoursPerDay = Number(this.parameters['Hours per day'] || 24);
    const _hoursPerDayM1 = _hoursPerDay - 1;
    const _noonHour = (_hoursPerDay * 0.5) | 0;
    const _minutesPerHour = Number(this.parameters['Minutes per hour'] || 60);
    const _minutesPerHourM1 = _minutesPerHour - 1;

    const _maxMonths = _monthCaptions.length < _shortMonthCaptions.length ? _monthCaptions.length : _shortMonthCaptions.length;
    const _maxWeekdays = _weekdayCaptions.length < _shortWeekdayCaptions.length ? _weekdayCaptions.length : _shortWeekdayCaptions.length;
    const _maxSeasons = _seasonCaptions.length; const _seasonLength = Math.floor(_maxMonths / _maxSeasons); let _oldSeason = null;

    let _prevMin = -1; let _prevHour = -1; let _weatherInUse = false; let _timeReversed = false; let _showWeatherInMenu = false;
    let _seasonMetaFound = false;

    _clockElements.forEach(ce => { // Regulate numbers
        ce.X = Number(ce.X); ce.Y = Number(ce.Y); ce.Width = Number(ce.Width);
        ce.Align = Number(ce.Align); ce.Type = Number(ce.Type);
    });

    const _margX = 4; const _margY = (Imported.VisuMZ_1_MainMenuCore) ? 0 : 4; // MENU CLOCK/WEATHER marginals....

    const _phaseSwitchesInUse = (_nightSwitchId && _dawnSwitchId && _daySwitchId && _duskSwitchId);
    if (!_phaseSwitchesInUse) {
        console.warn("Day phase switches are NOT in use:", "night:" + _nightSwitchId, "dawn:" + _dawnSwitchId, "day:" + _daySwitchId, "dusk:" + _duskSwitchId)
    }

    // Warnings!
    if (_shortMonthCaptions.length != _monthCaptions.length) {
        console.warn('Month "long" captions should have same amount of months as "short" month captions');
    } if (_shortWeekdayCaptions.length != _weekdayCaptions.length) {
        console.warn('Weekday "long" captions should have same amount of days as "short" weekday captions');
    } if (_maxMonths % _maxSeasons != 0) console.warn('Months are not divisible by the number of seasons!');

    // Trying to make phases logical...
    if (_nightStart < _duskStart) _nightStart = _hoursPerDay;
    if (_duskStart < _dayStart) _duskStart = _dayStart + 1;
    if (_dayStart < _dawnStart) _dayStart = _dawnStart + 1;
    if (_dawnStart > _nightStart) _dawnStart = _nightStart - 1;

    this._timeEnabledSwitchId = _timeEnabledSwitchId; this._dayPhaseVarId = _dayPhaseVarId;
    this._effectTransitionTime = _effectTransitionTime; this._useAutoTint = true;

    let _prevInterVal = 0; let _justLoaded = false; let _prevTSEnabledState = _autoStartTimer;
    let _isNewOrLoaded = false; let _gameJustLoaded = false;
    let _isInteracting = false; this._prevTilesetId = 0; this._seasonId = 0;

    let _weatherVariableId = 0; let _prevMonth = 0;
    let _clockBitmap = null; let _phaseBitmaps = [];

    let _bgsFadeHandle = null; let _bgmFadeHandle = null;

    // Pre-build season checker
    let _preBuiltSeasons = [];
    function buildSeasonMonths() {
        let m = _seasonStartMonth; let s = null; let tmp = [];
        for (let i = 0; i < _maxSeasons; i++) {
            tmp = [];
            for (let j = 0; j < _seasonLength; j++) {
                tmp.push(m);
                m++; if (m > _maxMonths) m = (m % _maxMonths);
            } s = { Id: i + 1, Name: _seasonCaptions[i], Months: tmp };
            _preBuiltSeasons.push(s);
        }
        for (let i = 0; i < _maxMonths % _maxSeasons; i++) {
            _preBuiltSeasons[_preBuiltSeasons.length - 1].Months.push(m);
            m++; if (m > _maxMonths) m = (m % _maxMonths);
        }
    } buildSeasonMonths();

    this.debug("Pre-built seasons:", _preBuiltSeasons, "Seasons:", _maxSeasons, "Season length:", _seasonLength);

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    const updateDayPhaseVar = phase => {
        $gameVariables.setValue(_dayPhaseVarId, phase);
        if (!_phaseSwitchesInUse) return;
        switch (phase) {
            case 1:
                $gameSwitches.setValue(_nightSwitchId, true);
                $gameSwitches.setValue(_dawnSwitchId, false);
                $gameSwitches.setValue(_daySwitchId, false);
                $gameSwitches.setValue(_duskSwitchId, false);
                break;
            case 2:
                $gameSwitches.setValue(_dawnSwitchId, true);
                $gameSwitches.setValue(_nightSwitchId, false);
                $gameSwitches.setValue(_daySwitchId, false);
                $gameSwitches.setValue(_duskSwitchId, false);
                break;
            case 3:
                $gameSwitches.setValue(_daySwitchId, true);
                $gameSwitches.setValue(_nightSwitchId, false);
                $gameSwitches.setValue(_dawnSwitchId, false);
                $gameSwitches.setValue(_duskSwitchId, false);
                break;
            case 4:
                $gameSwitches.setValue(_duskSwitchId, true);
                $gameSwitches.setValue(_nightSwitchId, false);
                $gameSwitches.setValue(_dawnSwitchId, false);
                $gameSwitches.setValue(_daySwitchId, false);
                break;
        }
    }

    const playBGS = (bgs_name, bgs_vol, bgs_pitch, bgs_pan, bgs_pos) => {
        if (AudioManager._currentBgs && AudioManager._currentBgs.name == bgs_name) return;
        const has_bgs = AudioManager._currentBgs && AudioManager._currentBgs.name != "";
        if (has_bgs || bgs_name == "") {
            AudioManager.fadeOutBgs(_bgsFadeDuration);
            if (bgs_name == "") return;
        } const tmp_bgs = {
            name: bgs_name,
            volume: bgs_vol,
            pitch: bgs_pitch,
            pan: bgs_pan,
            pos: bgs_pos
        }; if (_bgsFadeHandle) clearTimeout(_bgsFadeHandle);
        _bgsFadeHandle = setTimeout(() => {
            _bgsFadeHandle = null;
            this.debug("playBGS:", tmp_bgs);
            AudioManager.playBgs(tmp_bgs);
            AudioManager.fadeInBgs(_bgsFadeDuration);
        }, has_bgs ? _bgsFadeDuration * 1000 : 1);
    };

    const playBGM = (bgm_name, bgm_vol, bgm_pitch, bgm_pan, bgm_pos) => {
        if (AudioManager._currentBgm && AudioManager._currentBgm.name == bgm_name) return;
        const has_bgm = AudioManager._currentBgm && AudioManager._currentBgm.name != "";
        if (has_bgm || bgm_name == "") {
            AudioManager.fadeOutBgm(_bgmFadeDuration);
            if (bgm_name == "") return;
        } const tmp_bgm = {
            name: bgm_name,
            volume: bgm_vol,
            pitch: bgm_pitch,
            pan: bgm_pan,
            pos: bgm_pos
        }; if (_bgmFadeHandle) clearTimeout(_bgmFadeHandle);
        _bgmFadeHandle = setTimeout(() => {
            _bgmFadeHandle = null;
            this.debug("playBGM:", tmp_bgm);
            AudioManager.playBgm(tmp_bgm);
            AudioManager.fadeInBgm(_bgmFadeDuration);
        }, has_bgm ? _bgmFadeDuration * 1000 : 1);
    };

    const initTimeVars = () => {

        this.debug("initTimeVars", _startDateStamp);

        let dTmp = (_startDateStamp + " ").split(" ")[0] + "//";
        let y = parseInt((dTmp).split("/")[0]);
        let m = parseInt((dTmp).split("/")[1]);
        let d = parseInt((dTmp).split("/")[2]);

        dTmp = (_startDateStamp + " ").split(" ")[1] + ":";
        let h = parseInt((dTmp).split(":")[0]);
        let n = parseInt((dTmp).split(":")[1]);

        if (d == 0) d = 1;
        if (m == 0) m = 1;
        if (d > _daysPerMonth) d = _daysPerMonth;
        if (m > _maxMonths) m = _maxMonths;
        if (h > 23) h = 23;
        if (n > 59) n = 59;

        $gameVariables.setValue(_yearVarId, y);
        $gameVariables.setValue(_monthVarId, m);
        $gameVariables.setValue(_dayVarId, d);
        $gameVariables.setValue(_hourVarId, h);
        $gameVariables.setValue(_minuteVarId, n);

        const season = this.getSeasonByMonth(parseInt(m));
        if (season && season.Id != $gameVariables.value(_seasonVarId)) {
            $gameVariables.setValue(_seasonVarId, season.Id); $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
            this._seasonId = season.Id; _oldSeason = season.Id;
        }

        if (h > 21 || h < 6) { // Night
            updateDayPhaseVar(1);
        } else if (h > 5 && h < 10) { // Dawn
            updateDayPhaseVar(2);
        } else if (h > 9 && h < 18) { // Day
            updateDayPhaseVar(3);
        } else if (h > 17 && h < 22) { // Dusk
            updateDayPhaseVar(4);
        }

        $gameSwitches.setValue(_timeEnabledSwitchId, _autoStartTimer);

    };

    const _rtcFunc = () => {
        if ($dataMap == null && !$gameParty.inBattle()) return; const d = new Date();
        const ymdhn = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];
        if ($gameVariables.value(_yearVarId) != ymdhn[0]) $gameVariables.setValue(_yearVarId, ymdhn[0]);
        if ($gameVariables.value(_monthVarId) != ymdhn[1]) $gameVariables.setValue(_monthVarId, ymdhn[1]);
        if ($gameVariables.value(_dayVarId) != ymdhn[2]) $gameVariables.setValue(_dayVarId, ymdhn[2]);
        if ($gameVariables.value(_hourVarId) != ymdhn[3]) $gameVariables.setValue(_hourVarId, ymdhn[3]);
        $gameVariables.setValue(_minuteVarId, ymdhn[4]);
    };

    const initTimer = () => {

        if ($gameVariables.value(_timeIntervalVarId) < 250) $gameVariables.setValue(_timeIntervalVarId, 250);

        if (window._OC_Timer !== undefined) {
            this.debug("clearInterval (initTimer):", window._OC_Timer);
            window.clearInterval(window._OC_Timer);
            window._OC_Timer = undefined;
        }

        if (OcRam.isIndoors() && _stopTimeIndoors) return;

        if (window._OC_Timer === undefined) {
            window._OC_Timer = window.setInterval(function () {
                window.processInterval_OC();
            }, _useRealTime ? 1000 : $gameVariables.value(_timeIntervalVarId));
            this.debug("setInterval:", window._OC_Timer);
        }

    };

    const getSeasonText = season => {
        const s = this.getSeasonById(season);
        return s ? s.Name : "";
    };

    const addMonths = months_to_add => {
        this.addDays(months_to_add * _daysPerMonth);
    };

    let setWeekday = () => {
        let sum = $gameVariables.value(_yearVarId) * _maxMonths * _daysPerMonth;
        sum += $gameVariables.value(_monthVarId) * _daysPerMonth + $gameVariables.value(_dayVarId);
        sum = sum % _maxWeekdays; if (sum != $gameVariables.value(_weekdayVarId)) $gameVariables.setValue(_weekdayVarId, sum);
    }; if (_useRealTime) {
        setWeekday = () => {
            const wd = (new Date().getDay() + 6) % 7;
            if (wd != $gameVariables.value(_weekdayVarId)) $gameVariables.setValue(_weekdayVarId, wd);
        };
    }
    
    const checkPhases = () => {

        setWeekday(); let no_transition_time = _justLoaded && !OcRam.Map_Transfer.isTransfering();

        if (!_autoTintIndoors) { // Check no auto tint for indoors...
            if (OcRam.isIndoors()) {
                if (no_transition_time) {
                    this.debug("Phase:", "Indoors");
                    $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
                    if (_dayPhaseCE == 0) {
                        $gameScreen.startTint([0, 0, 0, 0], 0);
                    } else {
                        OcRam.runCE(_dayPhaseCE);
                    }
                }
            }
        }

        const hour = $gameVariables.value(_hourVarId);
        const fxTransitionTime = no_transition_time ? 0 : _effectTransitionTime;
        const auto_tint = this._useAutoTint;

        // Day phase
        const day_phase = $gameVariables.value(_dayPhaseVarId);
        if (hour > (_nightStart - 1) || hour < _dawnStart) { // Night
            if (day_phase != 1 || no_transition_time) { // First occurance or instant tint
                updateDayPhaseVar(1); $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
                if (!OcRam.isIndoors() || _autoTintIndoors) {
                    if (_dayPhaseCE == 0 || !_useOnlyCE) {
                        const tt = (!OcRam.isIndoors()) ? _tintNightIndoors : _tintNight;
                        this.debug("Night phase (hour " + hour + ", " + fxTransitionTime + ", auto tint: " + auto_tint + ")", tt);
                        if (auto_tint) $gameScreen.startTint([tt.Red, tt.Green, tt.Blue, tt.Gray], fxTransitionTime);
                        if (_dayPhaseCE != 0) OcRam.runCE(_dayPhaseCE);
                    } else {
                        this.debug("Night phase", "(CE:" + _dayPhaseCE + ")"); OcRam.runCE(_dayPhaseCE);
                    }
                } this.onDayPhase();
            }
        } else if (hour > (_dawnStart - 1) && hour < _dayStart) { // Dawn
            if (day_phase != 2 || no_transition_time) { // First occurance or instant tint
                updateDayPhaseVar(2); $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
                if (!OcRam.isIndoors() || _autoTintIndoors) {
                    if (_dayPhaseCE == 0 || !_useOnlyCE) {
                        const tt = (!OcRam.isIndoors()) ? _tintDawn : _tintDawnIndoors;
                        this.debug("Dawn phase (hour " + hour + ", " + fxTransitionTime + ", auto tint: " + auto_tint + ")", tt);
                        if (auto_tint) $gameScreen.startTint([tt.Red, tt.Green, tt.Blue, tt.Gray], fxTransitionTime);
                        if (_dayPhaseCE != 0) OcRam.runCE(_dayPhaseCE);
                    } else {
                        this.debug("Dawn phase", "(CE:" + _dayPhaseCE + ")"); OcRam.runCE(_dayPhaseCE);
                    }
                } this.onDayPhase();
            }
        } else if (hour > (_dayStart - 1) && hour < _duskStart) { // Day
            if (day_phase != 3 || no_transition_time) { // First occurance or instant tint
                updateDayPhaseVar(3); $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
                if (!OcRam.isIndoors() || _autoTintIndoors) {
                    if (_dayPhaseCE == 0 || !_useOnlyCE) {
                        const tt = (!OcRam.isIndoors()) ? _tintDay : _tintDayIndoors;
                        this.debug("Day phase (hour " + hour + ", " + fxTransitionTime + ", auto tint: " + auto_tint + ")", tt);
                        if (auto_tint) $gameScreen.startTint([tt.Red, tt.Green, tt.Blue, tt.Gray], fxTransitionTime);
                        if (_dayPhaseCE != 0) OcRam.runCE(_dayPhaseCE);
                    } else {
                        this.debug("Day phase", "(CE:" + _dayPhaseCE + ")"); OcRam.runCE(_dayPhaseCE);
                    }
                } this.onDayPhase();
            }
        } else if (hour > (_duskStart - 1) && hour < _nightStart) { // Dusk
            if (day_phase != 4 || no_transition_time) { // First occurance or instant tint
                updateDayPhaseVar(4); $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
                if (!OcRam.isIndoors() || _autoTintIndoors) {
                    if (_dayPhaseCE == 0 || !_useOnlyCE) {
                        const tt = (!OcRam.isIndoors()) ? _tintDusk : _tintDuskIndoors;
                        this.debug("Dusk phase (hour " + hour + ", " + fxTransitionTime + ", auto tint: " + auto_tint + ")", tt);
                        if (auto_tint) $gameScreen.startTint([tt.Red, tt.Green, tt.Blue, tt.Gray], fxTransitionTime);
                        if (_dayPhaseCE != 0) OcRam.runCE(_dayPhaseCE);
                    } else {
                        this.debug("Dusk phase", "(CE:" + _dayPhaseCE + ")"); OcRam.runCE(_dayPhaseCE);
                    }
                } this.onDayPhase();
            }
        }

    };

    const addDays = days_to_add => {

        if (days_to_add == 0) return;

        let add_m = 0; let add_d = parseInt(days_to_add);

        if (add_d >= _daysPerMonth) { add_m = parseInt(add_d / _daysPerMonth); } // param over 1 month (_daysPerMonth days)
        add_d = add_d % _daysPerMonth; // take days for further use

        // get current time
        let cur_d = $gameVariables.value(_dayVarId);
        let cur_m = $gameVariables.value(_monthVarId);
        let cur_y = $gameVariables.value(_yearVarId);

        // add time
        cur_d += add_d; // max _daysPerMonth
        cur_m += add_m; // max 12

        // check modulos
        if (cur_d > _daysPerMonth) { cur_d = (cur_d % _daysPerMonth); cur_m++; }
        if (cur_m > _maxMonths) { cur_m = (cur_m % _maxMonths); cur_y++; }

        // set variables
        if ($gameVariables.value(_yearVarId) != cur_y) $gameVariables.setValue(_yearVarId, cur_y);
        if ($gameVariables.value(_monthVarId) != cur_m) $gameVariables.setValue(_monthVarId, cur_m);
        if ($gameVariables.value(_dayVarId) != cur_d) $gameVariables.setValue(_dayVarId, cur_d);

        this.debug("time stamp:", cur_y + "." + cur_m + "." + cur_d);

        checkPhases();

    };

    const checkSeason = () => {

        const no_transition_time = _justLoaded; let month = $gameVariables.value(_monthVarId);
        let fxTransitionTime = no_transition_time ? 0 : _effectTransitionTime;

        const season = this.getSeasonByMonth(parseInt(month)); this.debug("checkSeason:", season);
        if (season && season.Id != $gameVariables.value(_seasonVarId)) {
            this.debug(season.Name, "(month " + month + ", " + no_transition_time + ")");
            $gameVariables.setValue(_seasonVarId, season.Id); $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
            if (_seasonCE != 0) OcRam.runCE(_seasonCE); this._seasonId = season.Id;
        }

    };

    const subtractMinutes = minutes_to_subtract => {

        if (minutes_to_subtract == 0) return;

        let add_h = 0; let add_d = 0; let add_m = 0; let add_n = parseInt(minutes_to_subtract);
        if (add_n > _minutesPerHourM1) { add_h = parseInt(add_n / _minutesPerHour); } // param over 1 hour (60 min)
        add_n = add_n % _minutesPerHour; // take minutes for further use
        if (add_h > _hoursPerDayM1) { add_d = parseInt(add_h / _hoursPerDay); } // param over 1 day (24 hours)
        add_h = add_h % _hoursPerDay; // take hours for further use
        if (add_d > _daysPerMonth) { add_m = parseInt(add_d / _daysPerMonth); } // param over 1 month (_daysPerMonth days)
        add_d = add_d % _daysPerMonth; // take days for further use

        // get current time
        let cur_n = $gameVariables.value(_minuteVarId);
        let cur_h = $gameVariables.value(_hourVarId);
        let cur_d = $gameVariables.value(_dayVarId);
        let cur_m = $gameVariables.value(_monthVarId);
        let cur_y = $gameVariables.value(_yearVarId);

        // add time
        cur_n -= add_n; // max 59
        cur_h -= add_h; // max 23
        cur_d -= add_d; // max _daysPerMonth
        cur_m -= add_m; // max _maxMonths

        // check modulos
        if (cur_n < 0) { cur_n = 58 - cur_n; cur_h--; }
        if (cur_h < 0) { cur_h = 22 - cur_h; cur_d--; }
        if (cur_d < 1) { cur_d = (_daysPerMonth - cur_d); cur_m--; }
        if (cur_m < 1) { cur_m = (_maxMonths - cur_m); cur_y--; }

        // set variables
        if ($gameVariables.value(_yearVarId) != cur_y) $gameVariables.setValue(_yearVarId, cur_y);
        if ($gameVariables.value(_monthVarId) != cur_m) $gameVariables.setValue(_monthVarId, cur_m);
        if ($gameVariables.value(_dayVarId) != cur_d) $gameVariables.setValue(_dayVarId, cur_d);
        if ($gameVariables.value(_hourVarId) != cur_h) $gameVariables.setValue(_hourVarId, cur_h);
        $gameVariables.setValue(_minuteVarId, cur_n);

        if (_prevMonth != cur_m) {
            _prevMonth = cur_m;
            checkSeason();
        }

        this.debug("time stamp:", cur_y + "." + cur_m + "." + cur_d + " " + cur_h + ":" + cur_n);

        checkPhases();

    };

    const subtractHours = hours_to_subtract => {
        subtractMinutes(hours_to_subtract * _minutesPerHour);
    };

    const addMinutes = minutes_to_add => {

        if (minutes_to_add == 0) return;

        if (minutes_to_add < 0) {
            subtractMinutes(-Number(minutes_to_add)); return;
        }

        let add_h = 0; let add_d = 0; let add_m = 0; let add_n = parseInt(minutes_to_add);
        if (add_n > _minutesPerHourM1) { add_h = parseInt(add_n / _minutesPerHour); } // param over 1 hour (60 min)
        add_n = add_n % _minutesPerHour; // take minutes for further use
        if (add_h > _hoursPerDayM1) { add_d = parseInt(add_h / _hoursPerDay); } // param over 1 day (24 hours)
        add_h = add_h % _hoursPerDay; // take hours for further use
        if (add_d > _daysPerMonth) { add_m = parseInt(add_d / _daysPerMonth); } // param over 1 month (_daysPerMonth days)
        add_d = add_d % _daysPerMonth; // take days for further use

        // get current time
        let cur_n = $gameVariables.value(_minuteVarId);
        let cur_h = $gameVariables.value(_hourVarId);
        let cur_d = $gameVariables.value(_dayVarId);
        let cur_m = $gameVariables.value(_monthVarId);
        let cur_y = $gameVariables.value(_yearVarId);

        // add time
        cur_n += add_n; // max 59
        cur_h += add_h; // max 23
        cur_d += add_d; // max _daysPerMonth
        cur_m += add_m; // max _maxMonths

        // check modulos
        if (cur_n > _minutesPerHourM1) { cur_n = cur_n % _minutesPerHour; cur_h++; }
        if (cur_h > _hoursPerDayM1) { cur_h = cur_h % _hoursPerDay; cur_d++; }
        if (cur_d > _daysPerMonth) { cur_d = (cur_d % _daysPerMonth); cur_m++; }
        if (cur_m > _maxMonths) { cur_m = (cur_m % _maxMonths); cur_y++; }

        // set variables
        if ($gameVariables.value(_yearVarId) != cur_y) $gameVariables.setValue(_yearVarId, cur_y);
        if ($gameVariables.value(_monthVarId) != cur_m) $gameVariables.setValue(_monthVarId, cur_m);
        if ($gameVariables.value(_dayVarId) != cur_d) $gameVariables.setValue(_dayVarId, cur_d);
        if ($gameVariables.value(_hourVarId) != cur_h) $gameVariables.setValue(_hourVarId, cur_h);
        $gameVariables.setValue(_minuteVarId, cur_n);

        if (_prevMonth != cur_m) {
            _prevMonth = cur_m;
            checkSeason();
        }

        this.debug("time stamp:", cur_y + "." + cur_m + "." + cur_d + " " + cur_h + ":" + cur_n);

        checkPhases();

    };

    const addHours = hours_to_add => {
        addMinutes(hours_to_add * _minutesPerHour);
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.onDayPhase = () => {

    };

    this.dayPhase = () => {
        if (!$gameVariables) return 0;
        return $gameVariables.value(_dayPhaseVarId);
    };

    this.getDateInt = (y, m, d, h, n) => {
        let val = n;
        val += h * _minutesPerHour;
        val += d * _minutesPerHour * _hoursPerDay;
        val += m * _minutesPerHour * _hoursPerDay * _daysPerMonth;
        val += y * _minutesPerHour * _hoursPerDay * _daysPerMonth * _maxMonths;
        return val;
    };

    this.getCurrentDateInt = () => {
        let val = Number($gameVariables.value(_minuteVarId));
        val += Number($gameVariables.value(_hourVarId)) * _minutesPerHour;
        val += Number($gameVariables.value(_dayVarId)) * _minutesPerHour * _hoursPerDay;
        val += Number($gameVariables.value(_monthVarId)) * _minutesPerHour * _hoursPerDay * _daysPerMonth;
        val += Number($gameVariables.value(_yearVarId)) * _minutesPerHour * _hoursPerDay * _daysPerMonth * _maxMonths;
        return val;
    };

    this.getDayMonth = () => {
        switch (_dateFormat) {
            case 1: case 2: // month day
                return this.getMonthString() + " " + $gameVariables.value(_dayVarId) + ". "; break;
            case 3: case 4: return ""; break; // Only time is used
            default: // day month
                return $gameVariables.value(_dayVarId) + ". " + this.getMonthString(); break;
        }
    };

    this.getDayMonthLong = () => {
        switch (_dateFormat) {
            case 1: case 2: // month day
                return this.getMonthStringLong() + " " + $gameVariables.value(_dayVarId) + ". "; break;
            case 3: return ""; break; // Only time is used
            default: // day month
                return $gameVariables.value(_dayVarId) + ". " + this.getMonthStringLong(); break;
        }
    };

    this.getDateString = () => {
        switch (_dateFormat) {
            case 2: // Year first
                return $gameVariables.value(_yearVarId) + " " + this.getDayMonth(); break;
            case 3: case 4: return ""; break; // Only time is used
            default: // Year last
                return this.getDayMonth() + " " + $gameVariables.value(_yearVarId); break;
        }
    };

    this.getDateStringLong = () => {
        switch (_dateFormat) {
            case 2: // Year first
                return $gameVariables.value(_yearVarId) + " " + this.getDayMonthLong(); break;
            case 3: return ""; break; // Only time is used
            default: // Year last
                return this.getDayMonthLong() + " " + $gameVariables.value(_yearVarId); break;
        }
    };

    this.getTimeString = () => {
        if (_timeFormat == 0) { // 24h
            return ($gameVariables.value(_hourVarId) % _hoursPerDay).padZero(2) + ":" + ($gameVariables.value(_minuteVarId) % _minutesPerHour).padZero(2);
        } else { // 12h
            const ampm = $gameVariables.value(_hourVarId) > _noonHour ? " PM" : " AM";
            return ($gameVariables.value(_hourVarId) % _noonHour).padZero(2) + ":" + $gameVariables.value(_minuteVarId).padZero(2) + ampm;
        }
    };

    this.getWeekdayString = () => {
        if (_dateFormat == 4) return "";
        return _shortWeekdayCaptions[$gameVariables.value(_weekdayVarId) % _maxWeekdays];
    };

    this.getWeekdayStringLong = () => {
        if (_dateFormat == 4) return "";
        return _weekdayCaptions[$gameVariables.value(_weekdayVarId) % _maxWeekdays];
    };

    this.getMonthString = () => {
        if (_dateFormat > 2) return "";
        return _shortMonthCaptions[Number(($gameVariables.value(_monthVarId)) - 1) % _maxMonths];
    };

    this.getMonthStringLong = () => {
        if (_dateFormat > 2) return "";
        return _monthCaptions[Number(($gameVariables.value(_monthVarId)) - 1) % _maxMonths];
    };

    this.getSeasonString = () => {
        if (_dateFormat > 2) return "";
        let season = Number($gameVariables.value(_seasonVarId)) - 1;
        if (!season) season = 0; if (season < 0) season = 0; if (season > 3) season = 3;
        return _seasonCaptions[season];
    };

    this.getSeasonById = id => {
        let tmp = null;
        _preBuiltSeasons.forEach(s => {
            if (s.Id == id) tmp = s; return;
        }); return tmp;
    };

    this.getSeasonByMonth = month => {
        let tmp = null;
        _preBuiltSeasons.forEach(s => {
            return s.Months.forEach(m => {
                if (m == month) tmp = s; return;
            });
        }); return tmp;
    };

    this.updateSeasonalTileset = check_season => {
        if ($gameParty.inBattle()) return; // Do not change tileset if in battle
        if (check_season) checkSeason(); if (!_seasonMetaFound) return; // Seasonal tileset was not found!
        if (_oldSeason != $gameVariables.value(_seasonVarId)) {
            _oldSeason = $gameVariables.value(_seasonVarId);
            if ($gameMap) {
                if (OcRam.Passages) OcRam.Passages.forceTilesetReload();
                $gamePlayer.reserveTransfer($gameMap._mapId, $gamePlayer._x, $gamePlayer._y, $gamePlayer._direction, 0);
            }
        }
    };

    this.isTimeReversed = () => {
        return _timeReversed;
    };

    if (_useRealTime) {
        this.addMinutes = function (v) { };
        this.addHours = function (v) { };
        this.addDays = function (v) { };
        this.addMonths = function (v) { };
        this.subtractMinutes = function (v) { };
        this.subtractHours = function (v) { };
    } else {
        this.addMinutes = function (v) {
            addMinutes(v)
        }; this.addHours = function (v) {
            addHours(v)
        }; this.addDays = function (v) {
            addDays(v)
        }; this.addMonths = function (v) {
            addMonths(v)
        }; this.subtractMinutes = function (v) {
            subtractMinutes(v)
        }; this.subtractHours = function (v) {
            subtractHours(v)
        };
    }

    // ------------------------------------------------------------------------------
    // Plugin Classes
    // ==============================================================================

    /** Clock in menu */  
    class Window_Clock extends Window_Base {

        constructor(rect) {
            super(rect); this.refresh();
        }

        refresh() {

            let width = this.contents.width - this.itemPadding() * 2 + 10;
            this.contents.clear(); this.resetTextColor();
            this.contents.fontSize = $gameSystem.mainFontSize() - 2;
            this.contents.fontFace = $gameSystem.mainFontFace();

            if (_altMenu && OcRam.isMZ()) {

                let time_string = ''; 

                if (_showWeatherInMenu) { // Weather + Alt/Visu/Menu
                    
                    let bm = (OcRam.Weather_System.getCurrentWeather())._icon;
                    let phase = Number($gameVariables.value(_dayPhaseVarId)) - 1; if (!phase) phase = 0; if (phase < 0) phase = 0; if (phase > 3) phase = 3; if (!bm) bm = _phaseBitmaps[phase];
                    time_string = ((_timeFormat == 0) ? _this.getWeekdayStringLong() : _this.getWeekdayString()) + ' ' + _this.getDayMonth() + ' ' + $gameVariables.value(_yearVarId);

                    this.changeTextColor(ColorManager.systemColor());
                    this.drawText(_timeCaption, _margX, _margY, 60, "left");
                    
                    if (_dateFormat == 4) { // Only time
                        time_string = $dataMap ? $dataMap.displayName : "";
                    } else if (_dateFormat == 3) { // Weekday + time
                        time_string = _this.getWeekdayStringLong();
                    }

                    this.resetTextColor();
                    this.drawText(_this.getTimeString(), _margX + 60, _margY, width, 'left');
                    this.drawText(time_string, _margX, _margY, width, 'center');
                    this.drawText(OcRam.Weather_System.getWeatherName(), ((bm) ? -(bm.width + _margX) : -_margX), _margY, width, 'right');

                    if (bm) {
                        this.contents.blt(bm, 0, 0, bm.width, bm.height, this.contents.width - bm.width - _margX, _margY);
                    } else {
                        this.contents.blt(bm, 0, 0, bm.width, bm.height, this.contents.width - bm.width - _margX, _margY);
                    }

                } else { // NO weather + Alt/Visu/Menu

                    let phase = Number($gameVariables.value(_dayPhaseVarId)) - 1;
                    if (!phase) phase = 0; if (phase < 0) phase = 0; if (phase > 3) phase = 3; let bm = _phaseBitmaps[phase];
                    time_string = (_this.getDayMonth() + ' ' + $gameVariables.value(_yearVarId));
                    if (_dateFormat > 2) {
                        time_string = _this.getTimeString();
                        this.changeTextColor(ColorManager.systemColor());
                        this.drawText(_timeCaption, _margX, _margY, width, 'left');
                        const tw = _timeCaption.width();
                        this.resetTextColor();
                        this.drawText(time_string, tw + _margX * 3, _margY, width, 'left');
                        if (_dateFormat == 3) { // Weekday + time
                            this.drawText(($dataMap ? $dataMap.displayName : ""), _margX, _margY, width, 'center');
                            this.drawText(_this.getWeekdayStringLong(), ((bm) ? -(bm.width + _margX) : -_margX), _margY, width, 'right');
                        } else { // Only time
                            this.drawText(($dataMap ? $dataMap.displayName : ""), ((bm) ? -(bm.width + _margX) : -_margX), _margY, width, 'right');
                        } if (bm) this.contents.blt(bm, 0, 0, bm.width, bm.height, this.contents.width - bm.width - _margX, _margY);
                    } else {
                        this.drawText(time_string, _margX * 2, _margY, width, 'left');
                        this.drawText(((_timeFormat == 0) ? _this.getWeekdayStringLong() : _this.getWeekdayString()), _margX, _margY, width, 'center');
                        this.drawText(_this.getTimeString(), ((bm) ? -(bm.width + _margX) : _margX), _margY, width, 'right');
                        if (bm) this.contents.blt(bm, 0, 0, bm.width, bm.height, this.contents.width - bm.width - _margX, _margY);
                    }

                }
            } else { // RTP MZ + MV Style
                if (!OcRam.isMZ()) {
                    width = width + this.itemPadding();
                }
                if (_dateFormat > 2) { // Only time is in use
                    this.changeTextColor(ColorManager.systemColor());
                    if (_dateFormat == 3) {
                        this.drawText(_this.getWeekdayStringLong(), 0, 0, width, 'center');
                    } else {
                        this.drawText(_timeCaption, 0, 0, width, 'center');
                    } this.resetTextColor();
                    const ofs = this.contents.fontSize;
                    this.contents.fontSize += 12;
                    this.drawText(_this.getTimeString(), 0, ofs + 4, width, 'center');
                    this.contents.fontSize -= 12;
                } else {
                    this.drawText(_this.getDayMonth(), _margX, 0, width - _margX, 'left');
                    this.drawText($gameVariables.value(_yearVarId), _margX, 0, width - _margX, 'right');
                    this.drawText((_timeFormat == 0) ? _this.getWeekdayStringLong() : _this.getWeekdayString(), _margX, _showWeatherInMenu ? this.contents.height * 0.28 : this.contents.height * 0.5, width - _margX, 'left');
                    this.drawText(_this.getTimeString(), _margX, _showWeatherInMenu ? this.contents.height * 0.28 : this.contents.height * 0.5, width - _margX, 'right');
                }
                if (_showWeatherInMenu) {
                    this.drawText(OcRam.Weather_System.getWeatherName(), _margX, this.contents.height * 0.666, width - _margY, 'left');
                    let bm = (OcRam.Weather_System.getCurrentWeather())._icon;
                    if (bm) {
                        this.contents.blt(bm, 0, 0, bm.width, bm.height, this.contents.width - bm.width - _margX, this.contents.height * 0.666);
                    } else {
                        let phase = Number($gameVariables.value(_dayPhaseVarId)) - 1; if (!phase) phase = 0; if (phase < 0) phase = 0; if (phase > 3) phase = 3; bm = _phaseBitmaps[phase];
                        this.contents.blt(bm, 0, 0, bm.width, bm.height, this.contents.width - bm.width - _margX, this.contents.height * 0.666);
                    }
                }
            }

        }

        open() {
            this.refresh();
            super.open(this);
        }

    }

    /** Clock in map */
    class Window_MapClock extends Window_Base {

        constructor() {

            let width = 120; let height = 120; let y = 0; let x = 0; let margin = 20;

            if (_clockType != 0) {
                width = _clockBitmap.width; height = _clockBitmap.height;
                width += margin + _mapClockPadding * 2; height += margin + _mapClockPadding * 2;
            }

            switch (_mapClockAlign) {
                case 1: // Bottom-Left
                    x = -margin + _mapClockPadding; y = Graphics.height - height + margin - _mapClockPadding; break;
                case 2: // Bottom-Center
                    x = Graphics.width * 0.5 - width * 0.5; y = Graphics.height - height + margin - _mapClockPadding; break;
                case 3: // Bottom-Right
                    x = Graphics.width - width + margin - _mapClockPadding; y = Graphics.height - height + margin - _mapClockPadding; break;
                case 7: // Top-Left
                    x = -margin + _mapClockPadding; y = -margin + _mapClockPadding; break;
                case 8: // Top-Center
                    x = Graphics.width * 0.5 - width * 0.5; y = -margin + _mapClockPadding; break;
                case 9: // Top-Right
                    x = Graphics.width - width + margin - _mapClockPadding; y = -margin + _mapClockPadding; break;
                default: break;
            }

            const rect = new Rectangle(x, y, width, height); super(rect);
            this._x = x; this._y = y; this._width = width; this._height = height;
            _prevMin = -1; _prevHour = -1; this.opacity = 0; this.refresh();

        }

        update() {
            super.update(); this.refresh();
        }

        open() {
            this.refresh();
        }

        refresh() {

            if (_prevMin != $gameVariables.value(_minuteVarId) || _prevHour != $gameVariables.value(_hourVarId)) {

                this.contents.clear();
                const width = this.contentsWidth();

                if (_clockType == 0) {
                    this.contents.fontSize = _timeFormat == 0 ? 24 : 20;
                    this.drawBackground(0, 0, width, this.lineHeight());
                    this.drawText(_this.getTimeString(), 0, 0, width, 'center');
                } else {
                    if (_clockType == 1) {
                        this.drawAnalogClock();
                    } else {
                        this.drawDigitalClock();
                    }
                } _prevMin = $gameVariables.value(_minuteVarId);
                _prevHour = $gameVariables.value(_hourVarId);
            }

        }

        drawMinuteHand(ctx) {

            ctx.lineWidth = 1; ctx.lineCap = "round"; ctx.lineJoin = "round";

            const pos = $gameVariables.value(_minuteVarId);
            let hand_length = _minuteHandLength;
            let angle = (pos * 6) - 90;

            let radians = angle * Math.PI / 180;
            let x = Math.cos(radians) * hand_length + _epiCenter[0];
            let y = Math.sin(radians) * hand_length + _epiCenter[1];

            ctx.line(_epiCenter[0], _epiCenter[1], x, y);

            // "TAIL"
            ctx.lineWidth += 1; hand_length = hand_length * 0.2;

            angle = ((pos + 30) * 6) - 90;
            radians = (angle) * Math.PI / 180;
            x = Math.cos(radians) * hand_length + _epiCenter[0];
            y = Math.sin(radians) * hand_length + _epiCenter[1];

            ctx.line(_epiCenter[0], _epiCenter[1], x, y);

        }

        drawHourHand(ctx) {

            ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.lineJoin = "round";

            let pos = $gameVariables.value(_hourVarId) % _noonHour;
            pos = pos * _minutesPerHour + $gameVariables.value(_minuteVarId);

            let hand_length = _hourHandLength;
            let angle = (pos * 0.5) - 90;

            let radians = angle * Math.PI / 180;
            let x = Math.cos(radians) * hand_length + _epiCenter[0];
            let y = Math.sin(radians) * hand_length + _epiCenter[1];

            ctx.line(_epiCenter[0], _epiCenter[1], x, y);

            // "TAIL"
            hand_length = hand_length * 0.1;

            angle = ((pos + 360) * 0.5) - 90;
            radians = (angle) * Math.PI / 180;
            x = Math.cos(radians) * hand_length + _epiCenter[0];
            y = Math.sin(radians) * hand_length + _epiCenter[1];

            ctx.line(_epiCenter[0], _epiCenter[1], x, y);

        }

        drawClockTextLayout() {

            let text_to_draw = "";

            _clockElements.forEach(elem => {
                text_to_draw = "";
                switch (elem.Type) {
                    case 0: // d. month yyyy
                        text_to_draw = _this.getDateStringLong(); break;
                    case 1: // d. mon yyyy
                        text_to_draw = _this.getDateString(); break;
                    case 2: // d. month
                        text_to_draw = _this.getDayMonthLong(); break;
                    case 3: // d. mon
                        text_to_draw = _this.getDayMonth(); break;
                    case 4: // d.
                        text_to_draw = $gameVariables.value(_dayVarId) + "."; break;
                    case 5: // month
                        text_to_draw = _this.getMonthStringLong(); break;
                    case 6: // mon
                        text_to_draw = _this.getMonthString(); break;
                    case 7: // weekday
                        text_to_draw = _this.getWeekdayStringLong(); break;
                    case 8: // wd
                        text_to_draw = _this.getWeekdayString(); break;
                    case 9: // season
                        text_to_draw = _this.getSeasonString(); break;
                    case 10: // year
                        text_to_draw = $gameVariables.value(_yearVarId); break;
                    case 11: // time
                        text_to_draw = _this.getTimeString(); break;
                    case 12: // weather
                        if (_weatherInUse) {
                            text_to_draw = OcRam.Weather_System.getWeatherName();
                        } else {
                            text_to_draw = "";
                        } break;
                    case 16: // day phase icon
                        let phase = Number($gameVariables.value(_dayPhaseVarId)) - 1; if (!phase) phase = 0; if (phase < 0) phase = 0; if (phase > 3) phase = 3;
                        this.contents.blt(_phaseBitmaps[phase], 0, 0, _phaseBitmaps[phase].width, _phaseBitmaps[phase].height, elem.X, elem.Y);
                        break;
                    case 17: // weather icon
                        if (_weatherInUse) {
                            if (this._weatherId != $gameVariables.value(_weatherVariableId)) {
                                this._weatherId = $gameVariables.value(_weatherVariableId);
                                const wo = OcRam.Weather_System.getJsonWeatherById(Number($gameVariables.value(_weatherVariableId)));
                                if (wo) {
                                    this._weatherIcon = OcRam.Weather_System.getJsonWeatherById(Number($gameVariables.value(_weatherVariableId)))._icon
                                } else {
                                    this._weatherIcon = null;
                                }
                            } if (this._weatherIcon) {
                                const bm = this._weatherIcon;
                                this.contents.blt(bm, 0, 0, bm.width, bm.height, elem.X, elem.Y);
                            }
                        } break;
                } if (elem.Type < 16) {
                    this.contents.fontSize = elem.FontSize || 18; this.contents.fontFace = elem.FontFace || 'rmmz-mainfont';
                    this.drawText(text_to_draw, elem.X, elem.Y, elem.Width, elem.Align == 0 ? 'left' : elem.Align == 1 ? 'right' : 'center');
                }
            });

        }

        drawAnalogClock() {
            this.contents.blt(_clockBitmap, 0, 0, _clockBitmap.width, _clockBitmap.height, 0, 0);
            this.drawMinuteHand(this.contents._context); this.drawHourHand(this.contents._context);
            this.drawClockTextLayout();
        }

        drawDigitalClock() {

            this.contents.blt(_clockBitmap, 0, 0, _clockBitmap.width, _clockBitmap.height, 0, 0);
            const w = _digitalClockWidth; this.contents.fontSize = _digitalFontSize; this.contents.fontFace = _digitalFontFace;

            if ($gameVariables.value(_minuteVarId) % 2 && _digitalBlink) {
                this.drawText(_this.getTimeString().replace(":", " "), _epiCenter[0] - w * 0.5, _epiCenter[1] - this.contents.fontSize * 0.75, w, 'center');
            } else {
                this.drawText(_this.getTimeString(), _epiCenter[0] - w * 0.5, _epiCenter[1] - this.contents.fontSize * 0.75, w, 'center');
            } this.drawClockTextLayout();

        }

        drawBackground(x, y, width, height) {
            const color1 = '#00000088'; const color2 = '#00000022';
            this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
            this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
        }

    }

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    // Get weather variable id
    this.extend(Scene_Boot, "create", function () {
        if (Imported.OcRam_Weather_System && OcRam.Weather_System && !(parseFloat(OcRam.Weather_System.version) < 1.00)) {
            _weatherVariableId = Number(OcRam.Weather_System.parameters['Weather Variable']); _weatherInUse = true;
            _showWeatherInMenu = OcRam.getBoolean(OcRam.Weather_System.parameters['Show weather in menu']);
            OcRam.Weather_System.getWeathers().forEach(w => {
                if (w) {
                    if (w.Id < -3) {
                        w._icon = ImageManager.loadOcRamBitmap("weather0");
                    } else {
                        w._icon = ImageManager.loadOcRamBitmap("weather" + w.Id);
                    }
                }
            });
        } _this["Scene_Boot_create"].apply(this, arguments);
    });

    // LOAD RESOURCES WHEN BOOT IS READY
    this.extend(Scene_Boot, "isReady", function () {
        let ret = _this["Scene_Boot_isReady"].apply(this, arguments);
        if (ret) { // Boot is ready and database is loaded...
            if (_clockType != 0) { // Pre-load images only when needed...
                if (_clockType == 1) _clockBitmap = ImageManager.loadOcRamBitmap('analog');
                if (_clockType == 2) _clockBitmap = ImageManager.loadOcRamBitmap('digital');
            } _phaseBitmaps = [
                ImageManager.loadOcRamBitmap('night'),
                ImageManager.loadOcRamBitmap('dawn'),
                ImageManager.loadOcRamBitmap('day'),
                ImageManager.loadOcRamBitmap('dusk')
            ]; _this.debug("Resources ready", _clockBitmap);
        } return ret;
    });
    
    // Setup time variables on NEW game and _isNewOrLoaded flag to true
    this.extend(DataManager, "setupNewGame", function () {
        _this["DataManager_setupNewGame"].apply(this, arguments);
        //if (SceneManager._scene.isTitle())
        initTimeVars(); _isNewOrLoaded = true;
    });

    this.extend(Scene_Load, "onLoadSuccess", function () {
        _this["Scene_Load_onLoadSuccess"].apply(this, arguments);
        _prevTSEnabledState = $gameSwitches.value(_timeEnabledSwitchId);
        _isNewOrLoaded = true; _gameJustLoaded = true;
    });

    // Check if menu / save scene was called >> Do not try to reload any tilesets
    this.extend(Scene_Map, "callMenu", function () {
        if (OcRam._menuCalled) return; // Already called menu let's get outta here!!
        _prevTSEnabledState = $gameSwitches.value(_timeEnabledSwitchId);
        $gameSwitches.setValue(_timeEnabledSwitchId, false);
        _this["Scene_Map_callMenu"].apply(this, arguments);
    });

    // If save scene is started from menu don't RESET _prevTSEnabledState!
    this.extend(Scene_Save, "initialize", function () {
        _this["Scene_Save_initialize"].apply(this, arguments);
        if (!OcRam._menuCalled) _prevTSEnabledState = $gameSwitches.value(_timeEnabledSwitchId);
        $gameSwitches.setValue(_timeEnabledSwitchId, false);
    });

    // Make sure that time enabled switch is also saved
    this.extend(Scene_Save, "onSavefileOk", function () {
        $gameSwitches.setValue(_timeEnabledSwitchId, _prevTSEnabledState);
        _this["Scene_Save_onSavefileOk"].apply(this, arguments);
    });

    // Re-init timer if in-game speed has been changed
    this.extend(Game_Variables, "onChange", function () {
        if (_prevInterVal != $gameVariables.value(_timeIntervalVarId)) {
            _this.debug("Time interval changed", this);
            _prevInterVal = $gameVariables.value(_timeIntervalVarId); initTimer();
        } _this["Game_Variables_onChange"].apply(this, arguments);
    });

    // Set _justLoaded flag to true (for manual instant tint etc..)
    this.extend(Scene_Base, "initialize", function () {
        _this["Scene_Base_initialize"].apply(this, arguments); _justLoaded = true;
    });

    // Set _justLoaded flag to true on player transfer
    this.extend(Game_Player, "performTransfer", function () {
        _isInteracting = false;
        _this["Game_Player_performTransfer"].apply(this, arguments);
        _justLoaded = true; $gameMap.changeSeason();
    });

    // Get seasonal tileset id
    this.extend(Game_Map, "setup", function (mapId) {
        _this["Game_Map_setup"].apply(this, arguments); this.changeSeason();
    });

    // Wait for all events to finish before setting _justLoaded -flag to false
    this.extend(Game_Map, "setupStartingEvent", function () {
        const ret = _this["Game_Map_setupStartingEvent"].apply(this, arguments);
        if (_justLoaded) {
            // Do heavy processing ONLY if needed (flag is on)
            if (!ret && !this.isAnyEventStarting() && !this.isEventRunning() && !this._interpreter.isRunning() && this._interpreter.eventId() < 1 && !$gameTemp.isCommonEventReserved()) {
                _this.debug("SET _justLoaded -flag to:", "false");
                _justLoaded = false;
            }
        } return ret;
    });

    // Stop time during interacts?
    if (_stopTimeOnInteract) {

        _this.debug("Time will be stopped on interact!", _stopTimeOnInteract);

        this.extend(Game_Event, "start", function () {
            if (this.list().length > 1) {
                _isInteracting = true;
            } _this["Game_Event_start"].apply(this, arguments);
        });

        this.extend(Game_Event, "unlock", function () {
            _this["Game_Event_unlock"].apply(this, arguments); _isInteracting = false;
        });

    }

    // Init timers
    this.extend(Scene_Map, "onMapLoaded", function () {

        if (_useRealTime) _rtcFunc();

        checkPhases();

        // Make it pitch black to not show sprites before tileset on season change
        if (_isNewOrLoaded) $gameScreen._brightness = 0;

        _this["Scene_Map_onMapLoaded"].apply(this, arguments);

        if (OcRam._menuCalled) {
            _this.debug("Menu / Save scene was called.", "No need for checks. Just restore previous enabled state.");
            $gameSwitches.setValue(_timeEnabledSwitchId, _prevTSEnabledState);
        } else {
            $gameMap.changeSeason(); $gameMap.autoPlayBGS(); $gameMap.autoPlayBGM();
        } initTimer(); // Init timer

        if (_isNewOrLoaded) { // Show graphics again
            window.setTimeout(function () {
                $gameScreen._brightness = 255;
                if (_useRealTime) window.processInterval_OC();
            }, 250); _isNewOrLoaded = false;
        } _gameJustLoaded = false;

    });

    this.extend(Scene_Battle, "start", function () {
        _this["Scene_Battle_start"].apply(this, arguments);
        if (!_stopTimeInBattles) initTimer();
    });

    // Clear timer
    this.extend(Scene_Battle, "terminate", function () {
        if (!_stopTimeInBattles) {
            _this.debug("clearInterval (Scene_Battle.terminate):", window._OC_Timer);
            window.clearInterval(window._OC_Timer); window._OC_Timer = undefined;
        } _this["Scene_Battle_terminate"].apply(this, arguments);
    });

    this.extend(Game_Map, "changeTileset", function (tilesetId) {
        _this["Game_Map_changeTileset"].apply(this, arguments);
        this.autoPlayBGS(); this.autoPlayBGM(); _oldSeason = $gameVariables.value(_seasonVarId);
    });

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Game_Map.prototype.changeSeason = function () {

        _seasonMetaFound = false;

        if ($gameParty.inBattle()) return; // Do not change tileset if in battle

        OcRam.readMapNotetags();
        checkPhases();

        _this._currentTilesetId = $gameMap._tilesetId;

        if (OcRam.isIndoors()) return; // Do not change tileset if indoors

        checkSeason(); const season = $gameVariables.value(_seasonVarId);

        if (!($gameMap._tilesetId > 0)) { _this.debug("$gameMap has no tileset?", $gameMap); return; }
        let tileset_meta = $dataMap.meta; if (tileset_meta["seasons"] == "disabled") return;
        let targetTilesetId = tileset_meta[getSeasonText(season).toLowerCase()];

        if (targetTilesetId !== undefined) {
            _seasonMetaFound = true;
            targetTilesetId = parseInt(targetTilesetId);
        } else {
            _this.debug("No map season meta was found >> look for a tileset meta.", $gameMap);
            tileset_meta = $dataTilesets[$dataMap.tilesetId].meta;
            if (tileset_meta["seasons"] == "disabled") return;
            targetTilesetId = tileset_meta[getSeasonText(season).toLowerCase()];
            try { // Make targetTilesetId as a number
                _seasonMetaFound = true;
                targetTilesetId = parseInt(targetTilesetId);
            } catch (ex) {
                targetTilesetId = 0; _this.debug("Tileset meta not found.", tileset_meta);
            }
        } if (isNaN(targetTilesetId)) targetTilesetId = 0;

        if (targetTilesetId != 0 && (targetTilesetId != $gameMap._tilesetId)) {
            _this.debug("Tileset CHANGED to: ", targetTilesetId);
            _this._prevTilesetId = $gameMap._tilesetId;
            _this._currentTilesetId = targetTilesetId;
            $gameMap.changeTileset(targetTilesetId, true);
        }
         
    };

    Game_System.prototype.justLoaded = function () {
        return _justLoaded;
    };

    Game_Map.prototype.autoPlayBGS = function () {

        if ($gameParty.inBattle()) return;
        if (_gameJustLoaded || DataManager.isEventTest()) return; // this.isBattleTest() || DataManager.isEventTest();

        const season_txt = getSeasonText($gameVariables.value(_seasonVarId)).toLowerCase();
        const day_phase = $gameVariables.value(_dayPhaseVarId) - 1;
        let bgs_name = ""; let bgs_meta = ""; let arr_phases;

        if ($dataMap) { // MAP META
            bgs_meta = $dataMap.meta["bgs-" + season_txt];
            if (bgs_meta !== undefined) {
                _this.debug("MAP bgs-season tag found:", bgs_meta); arr_phases = (bgs_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgs_name = arr_phases[day_phase]; playBGS(bgs_name, 100, 100, 0, 0); return; } // Season + phase found on map meta
                bgs_name = arr_phases[arr_phases.length - 4]; playBGS(bgs_name, 100, 100, 0, 0); return; // Season found on map meta
            }

            bgs_meta = $dataMap.meta["bgs"];
            if (bgs_meta !== undefined) {
                _this.debug("MAP bgs tag found:", bgs_meta); arr_phases = (bgs_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgs_name = arr_phases[day_phase]; playBGS(bgs_name, 100, 100, 0, 0); return; } // Default phase found on map meta
                bgs_name = arr_phases[arr_phases.length - 4]; playBGS(bgs_name, 100, 100, 0, 0); return; // Default found on map meta
            }
        } else {
            _this.debug("autoPlayBGS, $dataMap was:", "NULL ?!?");
        }

        if ($dataTilesets[this._tilesetId]) { // TILESET META
            bgs_meta = $dataTilesets[$gameMap._tilesetId].meta["bgs-" + season_txt];
            if (bgs_meta !== undefined) {
                _this.debug("TILESET bgs-season tag found:", bgs_meta); arr_phases = (bgs_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgs_name = arr_phases[day_phase]; playBGS(bgs_name, 100, 100, 0, 0); return; } // Season + phase found on map meta
                bgs_name = arr_phases[arr_phases.length - 4]; playBGS(bgs_name, 100, 100, 0, 0); return;
            }
            bgs_meta = $dataTilesets[$gameMap._tilesetId].meta["bgs"];
            if (bgs_meta !== undefined) {
                _this.debug("TILESET bgs tag found:", bgs_meta); arr_phases = (bgs_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgs_name = arr_phases[day_phase]; playBGS(bgs_name, 100, 100, 0, 0); return; } // Default phase found on map meta
                bgs_name = arr_phases[arr_phases.length - 4]; playBGS(bgs_name, 100, 100, 0, 0); return;
            }
        }

    };

    Game_Map.prototype.autoPlayBGM = function () {

        if (_gameJustLoaded || DataManager.isEventTest()) return;

        const season_txt = getSeasonText($gameVariables.value(_seasonVarId)).toLowerCase();
        const day_phase = $gameVariables.value(_dayPhaseVarId) - 1;
        let bgm_name = ""; let bgm_meta = ""; let arr_phases;

        if ($dataMap) { // MAP META
            bgm_meta = $dataMap.meta["bgm-" + season_txt];
            if (bgm_meta !== undefined) {
                _this.debug("MAP bgm-season tag found:", bgm_meta); arr_phases = (bgm_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgm_name = arr_phases[day_phase]; playBGM(bgm_name, 100, 100, 0, 0); return; } // Season + phase found on map meta
                bgm_name = arr_phases[arr_phases.length - 4]; playBGM(bgm_name, 100, 100, 0, 0); return; // Season found on map meta
            }

            bgm_meta = $dataMap.meta["bgm"];
            if (bgm_meta !== undefined) {
                _this.debug("MAP bgm tag found:", bgm_meta); arr_phases = (bgm_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgm_name = arr_phases[day_phase]; playBGM(bgm_name, 100, 100, 0, 0); return; } // Default phase found on map meta
                bgm_name = arr_phases[arr_phases.length - 4]; playBGM(bgm_name, 100, 100, 0, 0); return; // Default found on map meta
            }
        } else {
            _this.debug("autoPlayBGM, $dataMap was:", "NULL ?!?");
        }

        if ($dataTilesets[$gameMap._tilesetId]) { // TILESET META
            bgm_meta = $dataTilesets[$gameMap._tilesetId].meta["bgm-" + season_txt];
            if (bgm_meta !== undefined) {
                _this.debug("TILESET bgm-season tag found:", bgm_meta); arr_phases = (bgm_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgm_name = arr_phases[day_phase]; playBGM(bgm_name, 100, 100, 0, 0); return; } // Season + phase found on map meta
                bgm_name = arr_phases[arr_phases.length - 4]; playBGM(bgm_name, 100, 100, 0, 0); return;
            }
            bgm_meta = $dataTilesets[$gameMap._tilesetId].meta["bgm"];
            if (bgm_meta !== undefined) {
                _this.debug("TILESET bgm tag found:", bgm_meta); arr_phases = (bgm_meta + ",,,").split(",");
                if (arr_phases[day_phase] != "") { bgm_name = arr_phases[day_phase]; playBGM(bgm_name, 100, 100, 0, 0); return; } // Default phase found on map meta
                bgm_name = arr_phases[arr_phases.length - 4]; playBGM(bgm_name, 100, 100, 0, 0); return;
            }
        }

    };

    // Other plugins may hook-up on this if something needs to be done every 'second'
    if (_useRealTime) {
        window.processInterval_OC = function () {
            _rtcFunc(); if (_changeTilesetImmediatly) _this.updateSeasonalTileset();
        };
    } else {
        window.processInterval_OC = function () {
            if ($dataMap == null && !$gameParty.inBattle()) return;
            if ($gameSwitches.value(_timeEnabledSwitchId) && (!_isInteracting || $gameParty.inBattle())) {
                addMinutes(_timeReversed ? -1 : 1); if (_changeTilesetImmediatly) _this.updateSeasonalTileset();
            }
        };
    }


    // ------------------------------------------------------------------------------
    // Game_System - Hide and show map clock
    // ==============================================================================

    Game_System.prototype.isClockShown = () => {
        return _showClockInMap;
    };

    Game_System.prototype.hideMapClock = function () {
        _showClockInMap = false;
        if (SceneManager._scene._mapClock) {
            SceneManager._scene._mapClock.close();
            SceneManager._scene.removeChild(SceneManager._scene._mapClock);
        }
    };

    Game_System.prototype.showMapClock = function () {
        _showClockInMap = true;
        if (SceneManager._scene._mapNameWindow) {
            if (!_mapClockAlign) _mapClockAlign = 9;
            SceneManager._scene.createMapClock();
        }
    };
    
    // ------------------------------------------------------------------------------
    // OcRam - Clock window to MENU (based on 'gold' window)
    // ==============================================================================

    if (_showClockInMenu) {

        if (_useCustomMenuTimeWindow) { // Use custom position

            Scene_Menu.prototype.timeWindowRect = function () {
                const wx = eval(_customMenuTimeWindowX);
                const wy = eval(_customMenuTimeWindowY);
                const ww = eval(_customMenuTimeWindowW);
                const wh = eval(_customMenuTimeWindowH);
                return new Rectangle(wx, wy, ww, wh);
            };

        } else { // Use OcRam defined window pos (default)

            if (_altMenu) {

                if (OcRam.isMZ()) {

                    // HORIZONTAL MENU (ALT_MENU / VisuMZ Menu)
                    Scene_Menu.prototype.timeWindowRect = function () {
                        const ww = Graphics.boxWidth - this.goldWindowRect().width;
                        const wh = this.goldWindowRect().height;
                        const wx = 0;
                        const wy = this.mainAreaBottom() - wh;
                        return new Rectangle(wx, wy, ww, wh);
                    };

                    if (Imported.VisuMZ_1_MainMenuCore) { // VisuMZ Menu fix
                        Scene_Menu.prototype.needsDummyWindow = () => { return false; };
                        Scene_Menu.prototype.canCreatePlaytimeWindow = () => { return false; };
                    }

                } else { // VERTICAL (MV RTP)

                    Scene_Menu.prototype.timeWindowRect = function () {
                        const wx = 0;
                        const wy = this._commandWindow._height;
                        const ww = this.goldWindowRect().width;
                        const wh = Imported.OcRam_Weather_System && _showWeatherInMenu ? this.goldWindowRect().height * 2 : this.goldWindowRect().height * 1.5;
                        return new Rectangle(wx, wy, ww, wh);
                    };

                }

            } else {

                if (OcRam.isMZ()) { // VERTICAL (MZ RTP)

                    Scene_Menu.prototype.commandWindowRect = function () {
                        const ww = this.mainCommandWidth();
                        const wh = this.mainAreaHeight() - this.goldWindowRect().height - this.timeWindowRect().height;
                        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
                        const wy = this.mainAreaTop();
                        return new Rectangle(wx, wy, ww, wh);
                    };

                    Scene_Menu.prototype.timeWindowRect = function () {
                        const ww = this.mainCommandWidth(); let wh = 0;
                        if (_weatherInUse && _showWeatherInMenu) {
                            wh = this.calcWindowHeight(3, false);
                        } else {
                            wh = this.calcWindowHeight(2, false);
                        } const wx = Graphics.boxWidth - ww;
                        if (_weatherInUse && _showWeatherInMenu) wh = wh - 12;
                        const wy = this.mainAreaBottom() - this.calcWindowHeight(1, true) - wh;
                        return new Rectangle(wx, wy, ww, wh);
                    };

                }

            }

        }

        // If menu clock is used do these always...
        this.extend(Scene_Menu, "create", function () {
            _this["Scene_Menu_create"].apply(this, arguments);
            this.createClockWindow();
        });

        Scene_Menu.prototype.createClockWindow = function () {
            this._clockWindow = new Window_Clock(this.timeWindowRect());
            this.addWindow(this._clockWindow);
        };

    }

    this.extend(Scene_Map, "createDisplayObjects", function () {
        _this["Scene_Map_createDisplayObjects"].apply(this, arguments);
        if ($gameVariables.value(_monthVarId)) this.createMapClock();
    });

    Scene_Map.prototype.createMapClock = function () {
        if (_showClockInMap) {
            this._mapClock = new Window_MapClock();
            this.addChildAt(this._mapClock, 1); this._mapClock.update();
        }
    };

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = function () { };

    this.loadPluginData = gs => {
        _showClockInMap = gs._showClockInMap;
        _timeReversed = gs._timeReversed;
        _oldSeason = $gameVariables.value(_seasonVarId);
    };

    this.savePluginData = gs => {
        gs._showClockInMap = _showClockInMap;
        gs._timeReversed = _timeReversed;
    };

    this.onMapStart = sm => { };

    this.onMapTerminate = sm => { // Clear timer
        this.debug("clearInterval (onMapTerminate):", window._OC_Timer);
        window.clearInterval(window._OC_Timer); window._OC_Timer = undefined;
    };

    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { /* Use private */ };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "startTime", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: startTime", args); $gameSwitches.setValue(_timeEnabledSwitchId, true);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "stopTime", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: stopTime", args); $gameSwitches.setValue(_timeEnabledSwitchId, false);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "showTime", function (args) {
        _this.debug("Plugin command: showTime", args); $gameSystem.showMapClock();
    });

    PluginManager.registerCommand("OcRam_" + this.name, "hideTime", function (args) {
        _this.debug("Plugin command: hideTime", args); $gameSystem.hideMapClock();
    });

    PluginManager.registerCommand("OcRam_" + this.name, "reverseTime", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: reverseTime", args);
        _timeReversed = OcRam.getBoolean(args.reversed);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "timeInterval", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: timeInterval", args); $gameVariables.setValue(_timeIntervalVarId, Number(args.interval));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "addTime", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: addTime", args);
        switch ((args.unit + "").toLowerCase()) {
            case "minutes": addMinutes(Number(args.amount)); break;
            case "hours": addHours(Number(args.amount)); break;
            case "days": addDays(Number(args.amount)); break;
            case "months": addMonths(Number(args.amount)); break;
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setTime", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: setTime", args);
        $gameVariables.setValue(_hourVarId, Number(args.hour));
        $gameVariables.setValue(_minuteVarId, Number(args.minute));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setDate", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: setTime", args);
        $gameVariables.setValue(_yearVarId, Number(args.year));
        $gameVariables.setValue(_monthVarId, Number(args.month));
        $gameVariables.setValue(_dayVarId, Number(args.day));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setDateTime", function (args) {
        if (_useRealTime) {
            _this.debug("Plugin command: setTime - REAL TIME IS IN USE!", args); return;
        } _this.debug("Plugin command: setTime", args);
        $gameVariables.setValue(_yearVarId, Number(args.year));
        $gameVariables.setValue(_monthVarId, Number(args.month));
        $gameVariables.setValue(_dayVarId, Number(args.day));
        $gameVariables.setValue(_hourVarId, Number(args.hour));
        $gameVariables.setValue(_minuteVarId, Number(args.minute));
    });

}.bind(OcRam.Time_System)());
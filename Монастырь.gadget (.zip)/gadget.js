var bgsound = null;
var bgsoundSrc = null;

System.Gadget.onSettingsClosed = settingsClosed;

// Show a message
function Message(prompt)
{
	var WshShell = new ActiveXObject("WScript.Shell");
	var BtnCode = WshShell.Popup(prompt, 7, "Message", 64);
}

// Make a debug Log
function Debug(s){
	System.Debug.outputString(s);
}


// Setting dialog has been closed
function settingsClosed(event)
{
    if (event.closeAction == event.Action.commit)
	{
		if (!IsSoundActivated())
			StopBGSound();
		else
			StartBGSound();
	}
}

// Resize content
function Resize(width,height)
{
	document.body.style.width = width;
	document.body.style.height = height;
}

// Show a flyout window
function ShowFlyout(file)
{
	System.Gadget.Flyout.file = file;
	System.Gadget.Flyout.show = true;
}

function ShowOrHideFlyout(file)
{
	//Message(file);
	//if (System.Gadget.Flyout.file!=null && System.Gadget.Flyout.file == file)
	//	HideFlyout();
	//else
		ShowFlyout(file);
}


// Is Sound activated
function IsSoundActivated() {
	
	Debug('Sound:'+System.Gadget.Settings.read("sound"));
	if (System.Gadget.Settings.read("sound")==1)
	{
		Debug('sound is on');
		return true;
	}
	else 
	{
		Debug('sound is off');
		return false;
	}
}

// Setup the gadget
function SetupGadget(width,height,background) {
	
	LoadSettings();
    Resize(width,height);
	System.Gadget.background = background;
	
	if (!IsSoundActivated())
		StopBGSound();
	
}

var currentPlayerUrl = null;

function PlaySound(url) {
	if (Player.controls.currentPosition>0 && currentPlayerUrl==url)
	{
		Player.controls.stop();
		Player.URL = '';
		return;
	}
	currentPlayerUrl = url;
	
	Player.uiMode = "invisible";
	Player.URL = url;
	Player.controls.play();
}

// Stop sound
function StopBGSound() {
	Debug('Stop Background Sound');
	bgsound = document.getElementById('sound');
	if (bgsound!=null)
	{
		bgsoundSrc = bgsound.src;
		bgsound.src = '';
	}
}

// Start Sound
function StartBGSound() {
	Debug('Start Background Sound');
	if (bgsound!=null && bgsoundSrc!=null)
		bgsound.src = bgsoundSrc;
}

// Activate Settings
function ActivateSettings(settings)
{
	System.Gadget.settingsUI = settings;
}

// Load settings for the Gadget
function LoadSettings()
{
}

// Hide the opened flyout window
function HideFlyout()
{
   System.Gadget.Flyout.show = false;
}



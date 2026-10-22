/**
 * Screenshots in the Guides section (guides/), used by <Shot id="..." /> in the pages.
 * `frame` is how a page shows it: 'phone' (the phone app, 540x960 emulator), 'desk'
 * (the web dashboard, 1280 wide at 1x, at the column's width) or 'panel' (a dashboard
 * dialog or step panel, at its own size). `capture` is what to shoot, shown on the
 * placeholder until static/media/<id>.<ext> exists.
 *
 * The phone and dashboard shots are the debug app and the local server with demo
 * devices (a test account): no real player, friend or purchase shows.
 */
const guideShots = [
  // Connect GAP to GAP Companion
  { id: 'shot-guide-gap-link', frame: 'phone', alt: 'GAP Settings on the device: the GAP Companion card with a QR code and a short link code', capture: 'GAP app, Settings tab scrolled to GAP Companion, after Link to GAP Companion: the code, the QR and the "expires in" hint. 540x636 crop.' },
  { id: 'shot-guide-link-code', frame: 'phone', alt: 'Link a device in the phone app: Scan QR code, and the link code 5HN8-6XX2 typed in, ready to Link', capture: 'Companion phone app, Devices, + (Link a device) dialog with a code typed. 540x960.' },
  { id: 'shot-guide-linked', frame: 'phone', alt: 'The Devices list with the new device, Tsum Tab S9, linked and idle', capture: 'Companion phone app, Devices list scrolled to the newly linked device, idle. 540x960.' },
  { id: 'shot-guide-start', frame: 'phone', alt: 'Start a script on Tsum Tab S9: Tsum Tsum 5.4 picked, with Cancel and Start', capture: 'Companion phone app, a device page, Start a script dialog with Tsum Tsum picked. 540x960.' },
  { id: 'shot-guide-running', frame: 'phone', alt: 'Tsum Tab S9 running: run time, speed, My Tsum, and the run bar with Pause, Stop after this round and Stop', capture: 'Companion phone app, a device page a few seconds after Start. 540x960.' },
  { id: 'shot-guide-notifications', frame: 'phone', alt: 'Account, Notifications: switches for Devices, Runs, Chores, Alerts and Other, and Send a test notification', capture: 'Companion phone app, Account scrolled to Notifications. 540x760 crop.' },

  // Workflows
  { id: 'shot-guide-wf-list', frame: 'desk', alt: 'The Workflows page on the web: five workflows with their steps, how they loop and how many devices have each', capture: 'Companion web dashboard, Workflows, five workflows. 1090x350 crop.' },
  { id: 'shot-guide-wf-new', frame: 'phone', alt: 'A new workflow named Hearts and coins, no steps yet, and the step palette: General, Hearts, Tsum and Play', capture: 'Companion phone app, New workflow with a name and no steps. 540x960.' },
  { id: 'shot-guide-wf-receive', frame: 'phone', alt: 'The Receive hearts step: Mode set to Claim all, Skip ruby and Skip medals off', capture: 'Companion phone app, workflow editor, Receive hearts step sheet. 540x960.' },
  { id: 'shot-guide-wf-send', frame: 'phone', alt: 'The Send hearts step: Send to 0 score off, Max run time 20 min, and Use the run\'s setting', capture: 'Companion phone app, workflow editor, Send hearts step sheet. 540x960.' },
  { id: 'shot-guide-wf-hearts', frame: 'desk', alt: 'The Hearts and coins workflow on the web: Receive hearts, Play rounds 20, Send hearts for at most 20 minutes, Loop forever', capture: 'Companion web dashboard, workflow editor, Hearts and coins saved. 1090x435 crop.' },
  { id: 'shot-guide-wf-warnings', frame: 'desk', alt: 'Three warnings on Tsum swap: a Skill step never reached after Loop forever, its Use not set, and no Tsum chosen for Tsum Tab S9', capture: 'Companion web dashboard, workflow editor with the warnings unfolded. 1090x545 crop.' },
  { id: 'shot-guide-wf-skill', frame: 'panel', alt: 'The Skill step: preset Coin run on loop 1 and Fever push on loop 2, with the preview of the loops', capture: 'Companion web dashboard, Skill step panel with two loops. 430x375 crop.' },
  { id: 'shot-guide-wf-select-devices', frame: 'desk', alt: 'The Select Tsum step\'s Choose device list: three devices with Cinderella then Piglet, Tsum Tab S9 with No Tsum set', capture: 'Companion web dashboard, Select Tsum panel with the device list open. 1090x415 crop.' },
  { id: 'shot-guide-wf-select-loops', frame: 'panel', alt: 'Select Tsum for Tsum Phone: Cinderella on loop 1, Piglet on loop 2, Add loop and Copy to other devices', capture: 'Companion web dashboard, Select Tsum panel with a device chosen. 430x480 crop.' },
  { id: 'shot-guide-wf-copy', frame: 'panel', alt: 'Copy Tsum Phone\'s loops to MuMu 1, Tsum Tab S9 and Tsum Tablet', capture: 'Companion web dashboard, Copy to other devices dialog. 490x360 crop.' },
  { id: 'shot-guide-wf-assign', frame: 'panel', alt: 'Assign to devices: four devices ticked, three idle and synced, one running, and Start now on idle devices ticked', capture: 'Companion web dashboard, Assign to devices dialog. 570x450 crop.' },
  { id: 'shot-guide-wf-start', frame: 'phone', alt: 'Start a script on a device with a workflow: Run workflow "Tsum swap" picked, Its last settings below', capture: 'Companion phone app, Start a script dialog on a device with an assigned workflow. 540x960.' },
  { id: 'shot-guide-wf-progress', frame: 'phone', alt: 'A device running Tsum swap: Loop 2, Step 3 of 4, Play rounds, 6 of 10 rounds', capture: 'Companion phone app, a device page with the workflow card running. 540x612 crop.' },
  { id: 'shot-guide-wf-slow', frame: 'panel', alt: 'The Restart if slow step: Measured over This loop, Frame rate drop and Capture slower by not set', capture: 'Companion web dashboard, Restart if slow step panel. 430x485 crop.' },
  { id: 'shot-guide-wf-loop', frame: 'desk', alt: 'Short session: Play rounds, Loop 3 times, Send hearts, Stop, with the Loop step set to 3 times', capture: 'Companion web dashboard, Short session with the Loop panel open. 1090x425 crop.' },
];

module.exports = {guideShots};

---
title: Connect GAP to GAP Companion
sidebar_label: Connect GAP to Companion
description: Link a device running GAP and the Tsum Tsum script to GAP Companion, start the script from your phone, and turn on alerts.
---

# Connect GAP to GAP Companion

Linking a device to GAP Companion takes about two minutes: GAP shows a code, you type or scan it in Companion, and the
device joins your list. From then on you can watch it, start and stop it, and change its settings from your phone or
browser.

## What you need

- **A device already running the script.** A phone, tablet or emulator with GAP and the Tsum Tsum script set up the
  usual way, with the [starter tool](/starter). Companion connects to GAP; it doesn't play on its own.
- **A GAP Companion account.** GAP Companion is coming soon. Once it opens, you sign in with Google, Discord or your
  email; pricing will be announced at launch.
- **The app or the browser.** Use the Android app or the web dashboard: they show the same devices, so you can switch
  between them at any time. The iOS app is on the way; until then, use the dashboard in Safari.

## 1. Show the link code on the device

On the device running the script, open **GAP**, go to **Settings** and scroll to **GAP Companion**. Tap
**Link to GAP Companion**.

GAP shows a **QR code** and a short **link code** like `K7Q3-9MZD`. The code works for 10 minutes. If it runs out, tap
Link to GAP Companion again for a new one.

<Shot id="shot-guide-gap-link" />

:::tip No GAP Companion section in Settings?
Your GAP is older than GAP Companion. Update GAP (Settings › App › Check for updates) and look again.
:::

## 2. Enter the code in GAP Companion

In the phone app, open **Devices** and tap **+** at the top. On the web dashboard, the same **+** is on the Devices
page.

<ShotRow>
<Shot id="shot-guide-link-code" />
</ShotRow>

Then either:

- **Scan the QR code**: tap **Scan QR code** and point your phone at GAP's screen. You can also scan it with the phone's
  own camera: it opens GAP Companion if it's installed, or the dashboard in your browser, with the code filled in.
- **Type the code**: enter it under **Link code**, with or without the dash, and tap **Link**.

On the web you can also paste the link GAP's QR code holds. **Scan QR code** shows up only in browsers that can read QR
codes, such as Chrome on Android.

## 3. Check that it linked

The device appears in your **Devices** list straight away, and GAP's GAP Companion card now says **Linked as** the
device's name, with **Connected.** under it.

<ShotRow>
<Shot id="shot-guide-linked" />
</ShotRow>

Each card shows the device's state (**Running**, **Idle** or **Offline**), the script it runs and its latest event. The
chips at the top filter by state, and **All apps** narrows the list to one script when you run more than one.

## 4. Start the script from your phone

Tap the device to open it, then tap **Start a script** at the bottom. Pick **Tsum Tsum** and tap **Start**.

<ShotRow>
<Shot id="shot-guide-start" />
<Shot id="shot-guide-running" />
</ShotRow>

The script starts with the settings it last ran with on that device. To change them first, open the **Settings** tab
and tap **Load settings**, then Start. Once it runs, the bar at the bottom has **Pause**, **Stop after this round** (the
run ends on a finished score screen) and **Stop**.

You can still start the script on the device as you always have. Companion shows the run either way.

The device page has three tabs:

- **Stats**: run time, speed, My Tsum with **Change My Tsum**, totals, a coins chart and the last rounds.
- **Settings**: the script's own settings, grouped as on the device. Changes reach the device straight away, and round
  settings apply from the next round.
- **Events**: what the script has been doing: rounds, chores, warnings.

## 5. Turn on notifications

Companion can tell you when a device goes offline, a run stops, a chore finishes or a workflow ends. Open **Account**
(the person icon at the top right) and scroll to **Notifications**.

<ShotRow>
<Shot id="shot-guide-notifications" />
</ShotRow>

| Switch | You hear about |
|:--|:--|
| Devices | A device goes offline, or comes back. |
| Runs | A workflow finishes, or a run stops after its round. |
| Chores | A chore you started with Now is done. |
| Alerts | A workflow failed, or a script needs you. |
| Other | Anything else a script tells you. |

Tap **Send a test notification** to check they arrive. On Android, the app asks for permission after you link your
first device. If you said no, the group shows **Allow**, which opens the app's notification settings.

On the web dashboard, notifications are per browser: tap **Turn on** in the same place and allow them when the browser
asks. On an iPhone or iPad, add the dashboard to your Home Screen first.

## Link more devices

Repeat steps 1 to 3 on each device. Every device you link shows up in the same list. You can select several (long-press
a card, or the select button on the web) and start, pause, stop or apply a preset to all of them at once.

## Unlink a device

In Companion, open the device, tap **⋮** at the top right and choose **Remove from my account**. GAP on the device
forgets the link by itself, at once if it's online or the next time it connects.

You can also tap **Forget link on this device** in GAP's **Settings › GAP Companion**, but that only unlinks the
device's side: it stays in your Companion list as Offline until you remove it there too.

Signing out of Companion doesn't unlink anything: your devices keep running GAP as before.

## If something goes wrong

| What you see | What to do |
|:--|:--|
| The code doesn't work | It may have run out (10 minutes). Tap Link to GAP Companion again on the device and use the new code. |
| No GAP Companion section in GAP's Settings | Update GAP, then look again. |
| The device stays **Offline** | Check GAP is running on the device and the device is online. GAP reconnects by itself once it can reach the server. |
| "Update GAP on this device to …" | That part of Companion needs a newer GAP. Update GAP on the device. |
| No Change My Tsum, or no Select Tsum step | These come as an add-on with Companion, sent to linked devices automatically. Open the device, tap **⋮** › **Check for scripts and add-ons**, or do the same from GAP's GAP Companion card. |
| "Subscription inactive" | Your plan has ended. Check **Account** › Plan. The script keeps working on its own without Companion. |

## Next

- [Workflows, step by step](workflows.md): have each device follow a plan of its own.
- [Presets](/companion): on the Companion page, settings you save once and apply to every device.

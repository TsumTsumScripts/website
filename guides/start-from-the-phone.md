---
title: Start the service from the phone, no computer
sidebar_label: Start it from the phone (no computer)
description: Start GAP's service on an Android phone that isn't rooted, using Wireless debugging and Termux instead of the starter tool.
---

# Start the service from the phone, no computer

GAP needs its helper **service** running to control the game. Normally the [starter tool](/starter) on a computer starts
it. This guide starts it from the phone itself, on any phone that isn't rooted. *(A rooted phone starts the service by
itself, so it needs none of this.)*

The first time takes about 10 minutes. After every phone restart, it takes one command.

Menu names differ a little between phone brands. If a step doesn't match exactly, search for the name in bold with the
search bar at the top of **Settings**.

## What you need

- **Android 11 or newer.** Older versions have no Wireless debugging, so they need the [starter tool](/starter).
- **Wi-Fi.** Wireless debugging only works on Wi-Fi.
- **The GAP app.** If you don't have it yet, download
  [the GAP app](https://github.com/general-automation-platform/general-automation-catalogue/releases/latest/download/gap-arm64-v8a.apk)
  on the phone and open the file to install it.

## 1. Turn on Developer options

Open **Settings › About phone** and find **Build number**. On some phones it's inside **Software information** or
**Version**. Tap it 7 times and enter your PIN if asked. You'll see "You are now a developer" or a similar message.

## 2. Install Termux

Install **Termux** from [F-Droid](https://f-droid.org/packages/com.termux/) or from its
[GitHub page](https://github.com/termux/termux-app/releases). Don't use the Play Store version: it's out of date and
won't work.

## 3. Set up Termux

Open Termux, paste this line, and press Enter:

```sh
pkg upgrade -y && pkg install -y android-tools && curl -fsSL https://tsumtsum.gapscripts.app/gap-start.sh -o $PREFIX/bin/gap-start && chmod +x $PREFIX/bin/gap-start
```

It takes a few minutes the first time. If it asks about replacing a file, press Enter. This installs Google's `adb` and
`gap-start`, the command that starts the service.

## 4. Pair Termux with your phone

In this step you read a code in Settings and type it into Termux. On most phones the code disappears when you leave
Settings, so you need to see both apps at once.

1. Open **Settings › Developer options** (sometimes under **System**). Scroll to **Wireless debugging** and tap the
   **words**, not the switch, to open its page. Turn the switch at the top **on**, and allow it on your Wi-Fi if asked.
2. Show Settings and Termux side by side. On most phones: open the **recent apps** screen, tap the **Settings icon** at
   the top of its card, and choose **Split screen**, then pick Termux for the other half. Some phones call it
   **Split-screen view**, **Multi-window** or **Pop-up view**.
3. On the Wireless debugging page, tap **Pair device with pairing code**. You'll see a 6-digit code and an address like
   `192.168.1.5:37123`. The number after the colon is the **pairing port**.
4. In Termux, type this, with **your** pairing port in place of `37123`:

   ```sh
   adb pair localhost:37123
   ```

5. Enter the 6-digit code when Termux asks. You should see **Successfully paired**.

:::tip No split screen on your phone?
Write down the code and the pairing port, switch to Termux quickly, and type them. This works on some phones. If Termux
says it can't pair, tap **Pair device with pairing code** again for a new code and try once more.
:::

You only ever pair once.

## 5. Start the service

1. Make sure **Wireless debugging** is on (step 4.1).
2. In Termux, type:

   ```sh
   gap-start
   ```

3. It connects, starts the service, and prints **The GAP service is running. Open GAP.** In GAP, Play and Stop are no
   longer faded, and the Quick Bar button is back.

If it can't find Wireless debugging by itself, it asks for the port. Type the number after the colon under
**IP address & Port** on the Wireless debugging page. That port is not the pairing port, and it changes every time.

Once the service is running, you can turn Wireless debugging off again. The service keeps running.

## Every time after

The service stops whenever the phone restarts. Turn **Wireless debugging** on, open Termux, and type `gap-start`.

## If something goes wrong

| What you see | What to do |
|:--|:--|
| No **Wireless debugging** in Developer options | The phone runs Android 10 or older. Use the [starter tool](/starter) on a computer. |
| No **Pair device with pairing code** | The phone isn't on Wi-Fi. Connect to Wi-Fi, then turn Wireless debugging off and on again. |
| `CANNOT LINK EXECUTABLE "adb": cannot locate symbol …` | Termux is only partly up to date. Run `pkg upgrade -y`, then `pkg reinstall -y android-tools`. If it keeps happening, check that Termux came from F-Droid or GitHub, not the Play Store. |
| `cannot connect to daemon at tcp:5037` | If the next line says *daemon started successfully*, ignore it. Otherwise run `adb kill-server`, then `adb start-server`, and try again. Pairing may need a new code. |
| Errors while updating Termux (downloads failing) | Run `termux-change-repo`, pick a different mirror, and try again. |
| `gap-start: not found` | Step 3 didn't finish. Paste its line again. |
| **Not connected** from `gap-start` | Check that Wireless debugging is on. If you never paired, or reinstalled Termux, pair again (step 4). |
| **The service did not start** | Send the lines it prints after that message to us on Discord. |

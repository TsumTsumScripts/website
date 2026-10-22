---
title: Workflows, step by step
sidebar_label: Workflows, step by step
description: "Build GAP Companion workflows for the Tsum Tsum script: every step, loops, per-loop and per-device values, assigning and starting, with four complete examples."
toc_max_heading_level: 3
---

# Workflows, step by step

A **workflow** is a plan a device follows on its own: collect hearts, play 20 rounds, send hearts, switch Tsum, restart
the game, and go round again. You build it once in GAP Companion, assign it to your devices, and start it. Each device
keeps its own copy and runs it inside the script, so it keeps going while your phone is off or out of signal.

This guide covers everything in the workflow editor, then builds four workflows you can copy.

<Shot id="shot-guide-wf-list" />

## Before you start

- **Link your devices.** Follow [Connect GAP to GAP Companion](connect.md) first.
- **Start the script once on each device.** A device tells Companion which steps it can run when the script loads.
  Until one has, the Workflows tab says so and has no **New workflow** button.
- **For Select Tsum: export the Tsum List.** The Select Tsum step goes straight to a Tsum's card in your collection, so
  it needs that device's list of Tsums. On each device, run **Export Tsum list** once from the script's Chores tab (see
  [Tsum List export](/features/tsumlist)), and again after you get new Tsums. Select Tsum comes with Companion as an
  add-on; if it's missing, see [If something goes wrong](#if-something-goes-wrong).
- **For the Skill step: make presets (optional).** A Skill step can switch to one of your
  [Companion presets](/companion), not just a skill. Make the presets first, under the **Presets** tab.

### What a workflow changes about a run

While a workflow runs, **the device does what the steps say, in their order, and nothing else on a timer.** The script's
own timed chores (sending hearts every so many minutes, collecting the mailbox, and so on) wait: put a Send hearts or
Receive hearts step where you want it instead. Two things still work as usual: a chore you start with its **Now**
button, and **Stop after this round**.

A workflow run also turns on **Auto launch** (the game is reopened if it closes) and turns off **Stop after games** (the
steps decide how many rounds). A step's own settings, such as Send hearts' Max run time, apply to that step only; the
run's settings come back after it.

## Build a workflow

### Create it and name it

Open the **Workflows** tab and tap **+** (on the web, **New workflow**). Give it a name you'll recognise on a device
card, up to 80 characters.

<ShotRow>
<Shot id="shot-guide-wf-new" />
</ShotRow>

### Add steps

The **Add a step** panel lists every step your devices can run, in groups:

- **General**: Restart app, Restart device, Restart if slow, Loop, Stop.
- **Hearts**: Receive hearts, Send hearts.
- **Tsum**: Skill, Select Tsum.
- **Play**: Play rounds.

**Tap a step to add it at the end**, or long-press it and drag it to where it should go. On the web, click it, or drag
it into place. A step that some of your devices can't run says how many lack it.

To **move** a step, drag it by its grip (the six dots on the left). On the web you can also focus a grip and press
↑ or ↓. A workflow holds up to 100 steps.

### Set each step

Tap a step to open its settings. A setting marked **\*** is required: the workflow shows a warning until it's set.
Optional settings start empty, which means "use the run's setting"; once you set one, **Use the run's setting** clears
it again.

<ShotRow>
<Shot id="shot-guide-wf-receive" />
<Shot id="shot-guide-wf-send" />
</ShotRow>

At the bottom of each step's settings, **Duplicate** adds a copy of the step and **Delete** removes it.

### Save

Tap **Save** at the top. Leaving with unsaved changes asks whether to discard them. On the web, Ctrl+S (⌘S on a Mac)
saves too.

## Every step

| Step | What it does | Settings |
|:--|:--|:--|
| **Restart app** | Closes the game, opens it again, waits for it and goes through the start-up screens to your friend list. A fresh start for a game that has been open for hours. | None |
| **Receive hearts** | Collects your heart mail once. | **Mode \***: **Claim all** (one tap, fast) or **One by one** (opens each message so every sender gets a heart back; slower). **Skip ruby** leaves ruby mail unopened. **Skip medals** leaves Mission Clear medals in the mailbox. |
| **Send hearts** | Works down your friend list sending hearts, once. | **Send to 0 score** also sends to players with no score. **Max run time** (0 to 80 minutes) caps the pass; empty uses the run's setting. |
| **Skill** | From the next round, plays with a preset or a skill. | **Use \***: one of your presets (it applies the preset's round settings) or a skill. Can change each loop. |
| **Select Tsum** | Sets My Tsum before the next round. | **Tsum \***: picked from each device's own Tsum List. Can change each loop and differ per device. |
| **Play rounds** | Plays rounds, then goes to the next step. | **Rounds \*** (1 to 999, default 10). Can change each loop. |
| **Restart device** | Restarts the whole device. The workflow carries on at the next step after it. | **Minimum uptime**: skip the restart when the device has been up for less. Empty uses the device's setting. |
| **Restart if slow** | Restarts the device only when the script ran slower than after the last restart; otherwise moves on. | **Measured over**: This loop, This run or Last 30 minutes. **Frame rate drop** and **Capture slower by** (%): how much slower counts as slow. Empty uses the device's settings. |
| **Loop** | Goes back to step 1. | **Times**: 0 is forever (shown as **Loop forever**); 3 runs everything above it 3 times, then moves on (shown as **Loop 3 times**). |
| **Stop** | Ends the workflow, and the run with it. | None |

Running past the last step ends the workflow too, as if it ended with Stop.

## Loops

A **Loop** step sends the device back to step 1. Each time round is one **loop**, counted from 1.

- **Loop forever** (Times 0) goes back every time. The workflow runs until you stop it.
- **Loop 3 times** goes back until loop 3 has finished, then carries on with the step after it. Use it for "do this a
  few times, then something else".
- If a workflow has more than one Loop step, they share the one count.
- Steps after a **Loop forever** or a **Stop** never run. The editor marks them **Never reached**.

### A different value each loop

**Play rounds**, **Skill** and **Select Tsum** can change from one loop to the next. Their settings show a list of
rows:

- **One row, marked ∞**: the same value every loop.
- **Add loop** adds a row. With two or more rows they're numbered 1, 2, 3, and loop 1 uses row 1, loop 2 row 2, and so
  on. After the last row it starts again from row 1. A line under the rows shows the pattern, such as
  "Loops 1: Coin run · 2: Fever push · 3: Coin run · 4: Fever push …".
- The red **✕** removes a row. A row left empty shows a warning and is left out when you save.

<Shot id="shot-guide-wf-skill" />

Steps with lists of different lengths each cycle on their own. For example, Select Tsum with 2 rows (Cinderella,
Piglet) and Play rounds with 3 rows (10, 20, 5):

| Loop | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:--|:--|:--|:--|:--|:--|:--|:--|
| Tsum | Cinderella | Piglet | Cinderella | Piglet | Cinderella | Piglet | Cinderella |
| Rounds | 10 | 20 | 5 | 10 | 20 | 5 | 10 |

The whole pattern repeats every 6 loops. If that's not what you meant, give both steps the same number of rows. Each
list holds up to 20 rows.

### A different Tsum on each device

Each device has its own collection, so **Select Tsum** is set **per device**. Its settings start with a
**Choose device** list showing what each device has now, for example "2 loops · Cinderella, Piglet" or **No Tsum set**.

<Shot id="shot-guide-wf-select-devices" />

1. Choose a device. Its loop rows appear, picked from that device's own Tsum List, favourites first.
2. Set its rows with **Add loop**, as above.
3. To give other devices the same picks, tap **Copy to other devices…**, tick them and tap **Copy to N devices**. A
   device missing one of the Tsums can't be ticked.

<ShotRow>
<Shot id="shot-guide-wf-select-loops" />
</ShotRow>

<Shot id="shot-guide-wf-copy" />

A device with nothing chosen gets the warning **No value for this device** and can't start this workflow until you
pick its Tsums.

## Warnings

The editor checks the workflow as you build it. A yellow bar at the top counts the warnings; tap it (on the web,
**Show**) to see them all. A step with a problem is outlined and says why.

<Shot id="shot-guide-wf-warnings" />

| Warning | Means |
|:--|:--|
| **Never reached: it comes after a Loop that never ends** | Move the step above the Loop forever, or delete it. Also shown after a Stop. |
| **Skill: set Use** (or another "set …") | A required setting is empty. |
| **No value for this device** | A Select Tsum step has no Tsum for that device. Choose the device in the step and pick its Tsums. |
| **Needs Tsum List: Run Export Tsum List on the device** | That device hasn't exported its Tsum List yet. Run Export Tsum list on it. |
| **N devices lack it** (on a step in the panel) | Those devices can't run that step, usually because their script or GAP is older. Update them. |
| **… can't start GAP again after a restart** | The workflow has a restart step, and that device can't bring GAP back by itself after a reboot. See [Restarts](#restarts). |

You can save a workflow with warnings, but a device with a problem can't start it.

## Assign and start

### Assign

Tap **Assign** (the devices icon at the top of the editor). The list shows every device that runs the Tsum script, with
its state and whether it has the latest copy: **Synced**, or **Pending** until the device has received it.

<Shot id="shot-guide-wf-assign" />

Tick the devices and tap **Assign**. Each device has one workflow at a time; assigning another replaces it.

**Assigning doesn't start anything.** To start straight away, tick **Start now on idle devices**: it starts the
workflow on the ticked devices that are online with nothing running. A device that's already running carries on with
what it's doing and starts the workflow the next time you start it from Companion.

### Start

When you start the script on a device that has a workflow, **from Companion**, the Start dialog offers it and picks it
for you: **Run workflow "…"**. Pick **Its last settings** for an ordinary run instead. Starting several selected devices
from the Devices list works the same way.

<ShotRow>
<Shot id="shot-guide-wf-start" />
</ShotRow>

A workflow only starts from Companion. Starting the script on the device itself, as before, runs it the ordinary way.

## While it runs

The device's page shows the workflow card: its name, **Synced**, and where it is, for example
"Loop 2 · Step 3 of 4 · Play rounds · 6/10 rounds".

<ShotRow>
<Shot id="shot-guide-wf-progress" />
</ShotRow>

On the device itself, a banner names each step as it starts, and the Quick Bar shows the loop and step in place of its
Rounds row (for example L2 3/4).

- **Change settings** from the Settings tab as usual; round settings apply from the next round. A Skill step changes
  them again when it comes round. **Stop after games** is the one you can't change: the workflow decides that ("A
  running workflow controls that setting").
- **Pause** and **Resume** hold the workflow where it is.
- **Stop after this round** ends the run, and the workflow, on a finished score screen. **Stop** ends both at once.
- **Next start begins at step 1.** A stopped workflow doesn't pick up where it left off (the one exception is a
  restart, below).
- **Editing a running workflow** doesn't change the running copy. The device gets the new version for its next start.
- **If a step fails** (the game showed something unexpected, say), it's tried again, and after 3 tries it's skipped
  and the workflow carries on with the next step.

With notifications on (see [Connect](connect.md#5-turn-on-notifications)), **Runs** tells you when a workflow finishes
and **Alerts** when one fails or ends early, with the reason.

## Restarts

**Restart device** and **Restart if slow** reboot the whole device, then the workflow carries on with the step after
the restart step. That works only when GAP can start again by itself after the reboot. Open the device in Companion
and tap **⋮** › **Restart device** to see which way your device comes back:

- **GAP starts again by itself after the restart.**
- **The PC's watch mode starts GAP again.** Keep the starter page running on that PC.
- **It stays offline until you start GAP from a PC.** Restart steps aren't for this device: the editor warns
  "… can't start GAP again after a restart".

The device also keeps its own limits: a cooldown between restarts, a most-per-day and a minimum uptime. A restart step
that would break one is skipped with a banner on the device, and the workflow moves on. Set them, and what counts as
slow, under the device's **⋮** › **Restart when slow…**.

After a restart, the device picks the workflow up within the hour, as long as you haven't edited the workflow
meanwhile. If it can't, the next start begins at step 1.

**Restart if slow** compares the speed over the window you pick (**This loop**, **This run** or **Last 30 minutes**)
with the speed just after the last restart. When it's fine, the device shows "Speed is fine; no restart" and moves on.

<Shot id="shot-guide-wf-slow" />

## Four workflows to copy

Each of these was built in GAP Companion for this guide, and the screenshots above and below are of them. Build one,
check the warnings bar is clear, assign it, start it.

### 1. Hearts and coins

The everyday plan: collect hearts, play, send hearts, repeat.

| # | Step | Settings |
|:--|:--|:--|
| 1 | Receive hearts | Mode: Claim all |
| 2 | Play rounds | Rounds: 20 |
| 3 | Send hearts | Max run time: 20 min |
| 4 | Loop | Times: 0 (forever) |

<Shot id="shot-guide-wf-hearts" />

How it goes: one mailbox sweep, 20 rounds, at most 20 minutes of sending, back to the mailbox. Change the rounds to
set how often your friends get hearts, and the Max run time to keep a long friend list from eating into play.

Want every sender to get a heart back? Use **One by one** in step 1. It's slower, so give step 2 fewer rounds.

### 2. Tsum swap

Two Tsums taking turns, each with its own preset: say a coin Tsum on loop 1 and a Tsum you're levelling on loop 2.

Before you build it: two presets on the Presets tab (here "Coin run" and "Fever push"), and every device's Tsum List
exported.

| # | Step | Settings |
|:--|:--|:--|
| 1 | Select Tsum | Every device: loop 1 Cinderella, loop 2 Piglet |
| 2 | Skill | Loop 1 Coin run, loop 2 Fever push |
| 3 | Play rounds | Rounds: 10 |
| 4 | Loop | Times: 0 (forever) |

1. Add the four steps. Open **Select Tsum**, choose your first device, and add two loops: Cinderella and Piglet.
2. Tap **Copy to other devices…**, tick the rest and copy. If a device doesn't have one of the Tsums, choose it on its
   own and pick from its list.
3. Open **Skill** and add two loops: Coin run and Fever push.
4. Save, then **Assign** to all devices, with **Start now on idle devices** ticked.

Every loop swaps Tsum and preset together, because both lists have two rows. For uneven time, give Play rounds two rows
as well, such as 30 and 10.

### 3. Overnight farm

Long unattended runs, with a fresh game every loop and a device restart only when it has slowed down.

| # | Step | Settings |
|:--|:--|:--|
| 1 | Restart app | |
| 2 | Play rounds | Rounds: 30 |
| 3 | Restart if slow | Measured over: This loop |
| 4 | Loop | Times: 0 (forever) |

Restart app at the top of each loop gives the game a fresh start every 30 rounds. Restart if slow checks each loop
against the speed after the last restart, and reboots only when it has dropped. Check first that the
device can come back by itself (see [Restarts](#restarts)).

Want hearts too? Add Receive hearts and Send hearts after step 1.

### 4. Short session

A set amount of play that ends on its own: three blocks of 10 rounds, then one round of sending hearts, then stop.

| # | Step | Settings |
|:--|:--|:--|
| 1 | Play rounds | Rounds: 10 |
| 2 | Loop | Times: 3 |
| 3 | Send hearts | |
| 4 | Stop | |

<Shot id="shot-guide-wf-loop" />

Steps 1 and 2 run three times (30 rounds), then the loop lets the workflow through to Send hearts, and Stop ends the
run. With **Runs** notifications on, your phone tells you when it's finished.

## If something goes wrong

The message appears when you start, on the device's workflow card, or in an alert.

| Message | What to do |
|:--|:--|
| "Run Export Tsum List on the device first." | The device has no Tsum List. Run Export Tsum list from its Chores tab, then start again. |
| "A chosen Tsum isn't in this device's Tsum List. Run Export Tsum List again." | You picked a Tsum the device's list doesn't have, or it's out of date. Export again, or choose another Tsum for that device. |
| "The device's Tsum List is out of date. Run Export Tsum List again." | The collection changed since the export (new Tsums can move the cards). Export again. |
| "The device hasn't got the latest version of this workflow yet. Try again once it shows Synced." | Wait for **Synced** in the Assign list or on the device's workflow card. The device has to be online to get it. |
| "That preset hasn't reached the device yet." | A Skill step uses a preset the device doesn't have yet. Wait a moment for it to sync, then start again. |
| "This device's script can't run some steps (…). Update it." | Update the script on the device, or remove those steps. For Select Tsum, open the device, tap **⋮** › **Check for scripts and add-ons**. |
| "A step's settings don't fit this device's script." | The device's script is older or newer than the others. Update it, then open the step and check its settings. |
| "A running workflow controls that setting." | You tried to change Stop after games during a workflow. The steps decide how much is played. |
| Nothing happens after Assign | Assigning doesn't start. Start from the device page, or assign again with **Start now on idle devices**. |
| The workflow starts from step 1 after a stop | That's how it works: only a restart step picks up where it was. |

Still stuck? Ask in the Discord, with the message and a screenshot of the workflow.

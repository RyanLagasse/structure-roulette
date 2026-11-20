# Structure Roulette

A Minecraft **Bedrock** behavior pack: every block you break spawns a random vanilla structure (villages, strongholds, End Cities, trial chambers, shipwrecks and more) right next to you, with proper vanilla loot in the chests.

## Credit

Based on [Breaking Block Spawn Random Structures](https://www.curseforge.com/minecraft-bedrock/addons/breaking-block-spawn-random-structures-addon) by **mclucky** on CurseForge. The structure files (`behavior_pack/structures`) and functions (`behavior_pack/functions`) are from the original addon.

## Changes from the original

- Rewrote `scripts/main.js`:
  - Chests and barrels in spawned structures are filled with each structure's matching vanilla loot table (the original structures were saved with empty chests).
  - Messages are in English.

## Install

1. Download `structure-roulette.mcpack` from [Releases](../../releases) and open it, or copy the `behavior_pack` folder into
   `%APPDATA%\Minecraft Bedrock\Users\Shared\games\com.mojang\behavior_packs`.
2. In your world settings, activate **Structure Roulette** under Behavior Packs.
3. Turn on the Experiments toggles under **Game → Experiments**.

Change `SPAWN_CHANCE` at the top of `scripts/main.js` to make structures spawn less often (1 = every block).

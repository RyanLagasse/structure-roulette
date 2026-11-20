import { world, system } from "@minecraft/server";

// Chance (0 to 1) that breaking a block spawns a structure. 1 = every block.
const SPAWN_CHANCE = 1;

// key: [function file, English name, chest loot tables, barrel loot tables]
const STRUCTURES = {
    village_desert: ["villagedesert", "Desert Village", ["chests/village/village_desert_house", "chests/village/village_desert_house", "chests/village/village_weaponsmith", "chests/village/village_toolsmith"]],
    village_plains: ["villageplains", "Plains Village", ["chests/village/village_plains_house", "chests/village/village_plains_house", "chests/village/village_weaponsmith", "chests/village/village_armorer"]],
    village_savanna: ["villagesavanna", "Savanna Village", ["chests/village/village_savanna_house", "chests/village/village_savanna_house", "chests/village/village_weaponsmith", "chests/village/village_toolsmith"]],
    village_snowy: ["villagesnowy", "Snowy Village", ["chests/village/village_snowy_house", "chests/village/village_snowy_house", "chests/village/village_weaponsmith", "chests/village/village_armorer"]],
    village_taiga: ["villagetaiga", "Taiga Village", ["chests/village/village_taiga_house", "chests/village/village_taiga_house", "chests/village/village_weaponsmith", "chests/village/village_toolsmith"]],

    stronghold: ["stronghold", "Stronghold", ["chests/stronghold_corridor", "chests/stronghold_corridor", "chests/stronghold_crossing", "chests/stronghold_library"]],
    fortress: ["fortress", "Nether Fortress", ["chests/nether_bridge"]],
    mineshaft: ["mineshaft", "Mineshaft", ["chests/abandoned_mineshaft"]],
    mineshaft_mesa: ["mimeshaftmesa", "Badlands Mineshaft", ["chests/abandoned_mineshaft"]],

    desert_pyramid: ["desertpyramid", "Desert Pyramid", ["chests/desert_pyramid"]],
    end_city: ["endcity", "End City", ["chests/end_city_treasure"]],
    monument: ["moniment", "Ocean Monument", ["chests/simple_dungeon"]],

    ocean_ruin_cold: ["oceanruincold", "Cold Ocean Ruins", ["chests/underwater_ruin_small", "chests/underwater_ruin_big"]],
    ocean_ruin_warm: ["ocanruinwarm", "Warm Ocean Ruins", ["chests/underwater_ruin_small", "chests/underwater_ruin_big"]],

    pillager_outpost: ["pillageroutpost", "Pillager Outpost", ["chests/pillager_outpost"]],

    ruined_portal: ["ruinedportal", "Ruined Portal", ["chests/ruined_portal"]],
    ruined_portal_desert: ["ruinedportaldesert", "Desert Ruined Portal", ["chests/ruined_portal"]],
    ruined_portal_jungle: ["ruinedportaljungle", "Jungle Ruined Portal", ["chests/ruined_portal"]],
    ruined_portal_mountain: ["ruinedportalmountain", "Mountain Ruined Portal", ["chests/ruined_portal"]],
    ruined_portal_nether: ["ruinedportalNether", "Nether Ruined Portal", ["chests/ruined_portal"]],
    ruined_portal_ocean: ["ruinedportalocean", "Ocean Ruined Portal", ["chests/ruined_portal"]],
    ruined_portal_swamp: ["ruinedportalspawn", "Swamp Ruined Portal", ["chests/ruined_portal"]],

    shipwreck: ["shipwreck", "Shipwreck", ["chests/shipwrecksupply", "chests/shipwreck", "chests/shipwrecktreasure"]],
    swamp_hut: ["swamphut", "Witch Hut", ["chests/simple_dungeon"]],
    trail_ruins: ["trailruins", "Trail Ruins", ["chests/simple_dungeon"]],
    trial_chambers: ["trialchambers", "Trial Chambers", ["chests/trial_chambers/supply", "chests/trial_chambers/entrance", "chests/trial_chambers/corridor"],
        ["chests/trial_chambers/corridor", "chests/trial_chambers/intersection_barrel"]]
};

// Chest/barrel positions inside each structure, relative to where it is placed.
// Generated from the pack's .mcstructure files (c = chest, t = trapped chest, b = barrel).
const CHESTS = {"desertpyramid":[[8,3,10,"c"],[10,3,8,"c"],[10,3,12,"c"],[12,3,10,"c"]],"endcity":[[3,81,28,"c"],[23,81,30,"c"],[25,81,32,"c"],[29,81,60,"c"]],"ocanruinwarm":[[1,1,3,"c"],[5,0,33,"c"],[7,0,15,"c"],[24,0,16,"c"],[31,0,27,"c"],[33,0,1,"c"],[35,0,11,"c"]],"oceanruincold":[[2,0,20,"c"],[9,0,5,"c"],[26,1,29,"c"]],"pillageroutpost":[[19,13,24,"c"]],"ruinedportal":[[2,2,5,"c"]],"ruinedportaldesert":[[7,0,1,"c"]],"ruinedportaljungle":[[3,2,5,"c"]],"ruinedportalmountain":[[1,0,0,"c"]],"ruinedportalNether":[[4,11,2,"c"]],"ruinedportalocean":[[0,0,4,"c"]],"ruinedportalspawn":[[4,0,3,"c"]],"shipwreck":[[4,2,8,"c"],[5,2,18,"c"],[6,4,24,"c"]],"stronghold":[[41,17,24,"c"],[45,15,42,"c"],[48,9,5,"c"],[48,21,55,"c"],[52,16,46,"c"],[70,21,17,"c"],[73,11,52,"c"],[74,16,8,"c"],[90,11,57,"c"],[110,15,34,"c"]],"trialchambers":[[55,10,63,"c"],[12,15,100,"b"],[27,22,74,"b"],[41,18,72,"c"],[48,20,68,"b"],[52,19,94,"b"],[52,24,94,"b"],[62,24,83,"b"],[64,2,47,"c"],[72,36,50,"b"],[73,20,42,"b"],[75,25,14,"c"],[82,10,50,"c"],[82,18,51,"b"],[85,25,14,"c"],[85,30,14,"c"],[87,25,57,"b"],[89,37,42,"c"],[106,24,59,"b"],[91,29,70,"b"]],"villagedesert":[[31,13,28,"c"],[41,1,25,"c"],[58,13,31,"c"],[86,2,34,"c"]],"villageplains":[[61,5,59,"c"],[43,5,71,"c"],[77,5,61,"c"],[105,5,82,"c"]],"villagesavanna":[[3,4,43,"c"],[42,1,62,"c"],[11,1,94,"c"],[21,1,99,"c"],[30,1,77,"c"]],"villagesnowy":[[26,2,58,"c"],[34,2,36,"c"],[17,1,74,"c"],[18,1,84,"c"],[24,2,97,"c"],[85,2,44,"c"],[75,1,66,"c"],[87,2,65,"b"],[87,2,66,"b"],[87,3,66,"b"]],"villagetaiga":[[46,2,17,"c"],[65,2,43,"c"],[73,2,17,"c"],[80,1,49,"c"],[80,2,63,"c"],[64,2,77,"c"],[75,2,114,"c"],[77,2,71,"c"],[138,2,62,"c"]]};

const FALLBACK_LOOT = "chests/simple_dungeon";
const PENDING_KEY = "rs:pending";
const MAX_PENDING = 400;
const GIVE_UP_MS = 10 * 60 * 1000; // stop trying to fill a chest after 10 minutes

function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function loadPending() {
    try {
        const raw = world.getDynamicProperty(PENDING_KEY);
        return typeof raw === "string" ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function savePending(list) {
    world.setDynamicProperty(PENDING_KEY, JSON.stringify(list.slice(-MAX_PENDING)));
}

let pending = null;

function queueChests(structureKey, dimensionId, x, y, z) {
    const [fn, , chestLoot, barrelLoot] = STRUCTURES[structureKey];
    const spots = CHESTS[fn];
    if (!spots) return;
    if (!pending) pending = loadPending();
    const now = Date.now();
    for (const [dx, dy, dz, kind] of spots) {
        const loot = pick(kind === "b" && barrelLoot ? barrelLoot : chestLoot);
        pending.push([dimensionId, x + dx, y + dy, z + dz, loot, now]);
    }
    savePending(pending);
}

const CONTAINER_TYPES = ["minecraft:chest", "minecraft:trapped_chest", "minecraft:barrel"];

// Returns true when this entry is finished (filled or abandoned).
function tryFill(entry) {
    const [dimId, x, y, z, loot, queuedAt] = entry;
    const age = Date.now() - queuedAt;
    let block;
    try {
        block = world.getDimension(dimId).getBlock({ x, y, z });
    } catch {
        return age > GIVE_UP_MS;
    }
    if (!block) return age > GIVE_UP_MS; // chunk not loaded yet - try again later

    if (!CONTAINER_TYPES.includes(block.typeId)) {
        // Structure may still be placing; give it a little time, then give up.
        return age > 15000;
    }

    const container = block.getComponent("minecraft:inventory")?.container;
    if (!container || container.emptySlotsCount !== container.size) return true; // already has items

    const dim = world.getDimension(dimId);
    try {
        dim.runCommand(`loot insert ${x} ${y} ${z} loot "${loot}"`);
    } catch {
        try {
            dim.runCommand(`loot insert ${x} ${y} ${z} loot "${FALLBACK_LOOT}"`);
        } catch {
            return age > GIVE_UP_MS;
        }
    }
    return true;
}

// Every second, fill any queued chests that are loaded and placed.
system.runInterval(() => {
    if (!pending) pending = loadPending();
    if (pending.length === 0) return;
    const before = pending.length;
    pending = pending.filter((entry) => !tryFill(entry));
    if (pending.length !== before) savePending(pending);
}, 20);

world.afterEvents.playerBreakBlock.subscribe((event) => {
    if (Math.random() >= SPAWN_CHANCE) return;

    const player = event.player;
    const dimension = player.dimension;
    const keys = Object.keys(STRUCTURES);
    const key = pick(keys);
    const [functionName, displayName] = STRUCTURES[key];

    const view = player.getViewDirection();
    const x = Math.floor(player.location.x + view.x * 2);
    const y = Math.floor(player.location.y);
    const z = Math.floor(player.location.z + view.z * 2);

    system.runTimeout(() => {
        try {
            dimension.runCommand(`execute positioned ${x} ${y} ${z} run function ${functionName}`);
            queueChests(key, dimension.id, x, y, z);
            world.sendMessage(`§6A random structure appeared: §f${displayName}`);
        } catch (e) {
            player.sendMessage(`§cCouldn't spawn ${displayName}: ${e}`);
        }
    }, 20);
});

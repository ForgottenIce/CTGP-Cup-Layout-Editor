const TRACKS = new Map([
    [0xAA, "Abandoned Boardwalk"],
    [0xC9, "Abyssal Ruins"],
    [0x3B, "Alpine Peak"],
    [0xC8, "Aquadrom Stage"],
    [0xA9, "Aquania"],
    [0x4D, "ASDF_Course"],
    [0xB7, "Athletic Raceway"],
    [0xA7, "Aura Metropolis"],
    [0x92, "Autumn Leavesway"],
    [0x3F, "Banished Keep"],
    [0x24, "Big Express City"],
    [0xF4, "Big Nature City"],
    [0xDB, "Boshi Skatepark"],
    [0xE4, "Bowser's Fiery Fortress"],
    [0xB6, "Camp Kartigan"],
    [0x79, "Candy Coaster"],
    [0x7D, "Canyon Run"],
    [0x9B, "Castle of Darkness"],
    [0xFA, "Castle of Time"],
    [0x2C, "Celestial Ruins"],
    [0xCC, "Cherry Blossom Garden"],
    [0xC5, "Christmas Court"],
    [0xA2, "Coin Heaven"],
    [0x27, "Colour Circuit"],
    [0x32, "Colour Wonderland"],
    [0xEF, "Comet Starway"],
    [0x23, "Concord Town"],
    [0xCE, "Crystal Dungeon"],
    [0xC6, "Crystal Plains"],
    [0xA8, "CTR Blizzard Bluff"],
    [0x8D, "CTR Cortex Castle"],
    [0xD8, "CTR N. Gin Labs"],
    [0x3C, "Daisy Hillside"],
    [0x2A, "Daisy's Palace"],
    [0xD3, "Dark Matter Fortress"],
    [0x85, "Dark Matter Shrine"],
    [0x6F, "Dawn Township"],
    [0x6E, "Delfino Island"],
    [0x9C, "Desert Castle Raceway"],
    [0x4E, "Desert Fort"],
    [0xAC, "Desert Mushroom Ruins"],
    [0xA5, "Desktop Dash"],
    [0xBD, "DK Ruins"],
    [0xBE, "Dragon Burial Grounds"],
    [0xF7, "Dragonite's Island"],
    [0xBF, "Dreamworld Cloudway"],
    [0x5B, "DS Airship Fortress"],
    [0x28, "DS Bowser Castle"],
    [0x77, "DS Cheep Cheep Beach"],
    [0xC2, "DS DK Pass"],
    [0x73, "DS Figure-8 Circuit"],
    [0x93, "DS Luigi's Mansion"],
    [0x99, "DS Mario Circuit"],
    [0x29, "DS Shroom Ridge"],
    [0x87, "DS Tick-Tock Clock"],
    [0x66, "DS Waluigi Pinball"],
    [0x75, "DS Wario Stadium"],
    [0x8A, "Envenom Snowstorm"],
    [0xF3, "Festival Town"],
    [0x7B, "Final Grounds"],
    [0x57, "Fishdom Island"],
    [0x33, "Flowery Greenhouse"],
    [0x4A, "Flying Kingdom"],
    [0xCA, "Forest Creek"],
    [0xE7, "Fungal Jungle"],
    [0x86, "Garden of Dreams"],
    [0xF2, "GBA Boo Lake"],
    [0xA6, "GBA Bowser Castle 1"],
    [0xE9, "GBA Bowser Castle 2"],
    [0x65, "GBA Bowser Castle 4"],
    [0x69, "GBA Broken Pier"],
    [0x70, "GBA Cheep Cheep Island"],
    [0x91, "GBA Cheese Land"],
    [0xB9, "GBA Lakeside Park"],
    [0xB8, "GBA Luigi Circuit"],
    [0xBB, "GBA Mario Circuit"],
    [0x2B, "GBA Peach Circuit"],
    [0x30, "GBA Rainbow Road"],
    [0x98, "GBA Ribbon Road"],
    [0x21, "GBA Riverside Park"],
    [0x95, "GBA Sky Garden"],
    [0xD4, "GBA Snow Land"],
    [0x2E, "GBA Sunset Wilds"],
    [0xA4, "GCN Baby Park"],
    [0x64, "GCN Bowser's Castle"],
    [0x74, "GCN Daisy Cruiser"],
    [0xA0, "GCN Dino Dino Jungle"],
    [0x20, "GCN Dry Dry Desert"],
    [0x81, "GCN Luigi Circuit"],
    [0xD5, "GCN Mushroom Bridge"],
    [0xAD, "GCN Mushroom City"],
    [0x58, "GCN Rainbow Road"],
    [0x8B, "GCN Sherbet Land"],
    [0x84, "GCN Wario Colosseum"],
    [0x6A, "GCN Yoshi Circuit"],
    [0x8F, "Glimmer Express Trains"],
    [0xB5, "Gothic Castle"],
    [0xE0, "GP Mario Beach"],
    [0x31, "Halogen Highway"],
    [0x54, "Haunted Gardens"],
    [0xB1, "Hellado Mountain"],
    [0x45, "Honeybee Hideout"],
    [0xE3, "Icepeak Mountain"],
    [0x51, "Incendia Castle"],
    [0x90, "Infernal Pipeyard"],
    [0x34, "Item Fireland"],
    [0xF8, "Jiyuu Village"],
    [0x5F, "Jungle Cliff"],
    [0xE8, "Jungle Glade"],
    [0xDC, "Jungle Jamble"],
    [0x8C, "Jungle Ruins"],
    [0x55, "Kamek's Library"],
    [0x56, "Kartwood Creek"],
    [0xA3, "Kinoko Cave"],
    [0xFE, "Koopa Shell Pipeland"],
    [0xAF, "Lava Lake"],
    [0xDA, "Lava Road"],
    [0x25, "Lost Fortress"],
    [0xDE, "Luigi's Island"],
    [0x5D, "Lunar Lights"],
    [0xDD, "Lunar Spaceway"],
    [0x6C, "Luncheon Tour"],
    [0xF0, "Magmatic Sanctuary"],
    [0xEA, "Mansion of Madness"],
    [0xFC, "Marble Towers"],
    [0x49, "Mario Castle Raceway"],
    [0xD9, "Medieval Castlegrounds"],
    [0x94, "Melody Sanctum"],
    [0x7A, "Melting Magma Melee"],
    [0xBA, "Mushroom Island"],
    [0x40, "Mushroom Peaks"],
    [0x26, "Mushroom Valley"],
    [0x9A, "Musical Cliff"],
    [0x97, "Musical Motorway"],
    [0xEE, "Mystic Tangle"],
    [0xD0, "N64 Banshee Boardwalk"],
    [0x68, "N64 Choco Mountain"],
    [0x67, "N64 Frappe Snowland"],
    [0xC0, "N64 Kalimari Desert"],
    [0xA1, "N64 Koopa Troopa Beach"],
    [0xB3, "N64 Luigi Raceway"],
    [0x39, "N64 Rainbow Road"],
    [0x2F, "N64 Royal Raceway"],
    [0x59, "N64 Toad's Turnpike"],
    [0xE2, "N64 Wario Stadium"],
    [0xE1, "Neo Koopa City"],
    [0x88, "New Moon Manor"],
    [0x7E, "Nightlife Party"],
    [0x60, "N.I.S.W.O.E. Desert"],
    [0x96, "Nivurbia"],
    [0x3D, "Pianta Shore"],
    [0x7C, "Pipe Underworld"],
    [0xAE, "Piranha Plant Pipeline"],
    [0x6D, "Quaking Mad Cliffs"],
    [0xF9, "Rainbow Road: Solar Edition"],
    [0xAB, "Rezway"],
    [0x35, "Rock Rock Ridge"],
    [0x48, "Rosalina's Snow World"],
    [0x9D, "Royal Rainbow"],
    [0x4F, "Rush City Run"],
    [0xE6, "SADX Twinkle Circuit"],
    [0xED, "Sahara Hideout"],
    [0x4C, "Sakura Sanctuary"],
    [0xFD, "Sandstone Cliffs"],
    [0x50, "Sarasa Kingdom"],
    [0x9F, "Sea Stadium"],
    [0x2D, "Shy Guy's Market"],
    [0x22, "Siberian Chateau"],
    [0x5C, "Six King Labyrinth"],
    [0xCD, "Sky Grove"],
    [0xD7, "Sky High Island"],
    [0x4B, "Sky Shrine"],
    [0x63, "Skyline Avenue"],
    [0xD2, "Slot Circuit"],
    [0xEC, "SNES Bowser Castle 1"],
    [0x44, "SNES Bowser Castle 2"],
    [0xDF, "SNES Bowser Castle 3"],
    [0x71, "SNES Choco Island 2"],
    [0x5E, "SNES Donut Plains 2"],
    [0x83, "SNES Donut Plains 3"],
    [0xF5, "SNES Koopa Beach 2"],
    [0x47, "SNES Mario Circuit 1"],
    [0x78, "SNES Mario Circuit 2"],
    [0x89, "SNES Rainbow Road"],
    [0x5A, "Spectral Station"],
    [0x80, "Spike Desert"],
    [0x36, "Star Slope"],
    [0x9E, "Stargaze Summit"],
    [0x6B, "Summer Starville"],
    [0x52, "Sunset Forest"],
    [0xB2, "Sunset Ridge"],
    [0xEB, "Super Marine World"],
    [0x76, "Superstar Dystopia"],
    [0xC1, "Suzuka Circuit"],
    [0x53, "The Rabbit Hole"],
    [0xC7, "Thump Bump Forest"],
    [0xFB, "Thwomp Swamp"],
    [0x7F, "Toad Raceway"],
    [0xCF, "Tropical Factory"],
    [0x72, "Twin Peaks"],
    [0xC4, "Underground Sky"],
    [0x61, "Undiscovered Offlimit"],
    [0xB4, "Unfinished Mario Circuit"],
    [0x82, "Unnamed Valley"],
    [0xD6, "Vile Isle"],
    [0xC3, "Volcanic Valley"],
    [0x41, "Volcano Canyon"],
    [0x46, "Waluigi's Motocross"],
    [0xBC, "Warp Pipe Island"],
    [0xD1, "Wetland Woods"],
    [0xF6, "White Garden"],
    [0xCB, "Windmill Village"],
    [0xE5, "Windy Whirl"],
    [0x8E, "Wolf Castlegrounds"],
    [0x3E, "Wuhu Island"],
    [0xB0, "Wuhu Mountain"],
    [0x62, "Yoshi Lagoon"],
    [0xF1, "Yoshi's Woolly Raceway"],
    [0xFF, "No Track Selected"],
]);
    
function getTrackNamesSorted() {
    const trackNames = Array.from(TRACKS.values());
    trackNames.pop(); //Remove 0xFF from the array
    return trackNames.sort();
}

const CTGP_TRACK_SLOT_COUNT = 216; //Amount of track slots in CTGP

//Alphabetical cuplayout without the secret tracks
const TEST_CUP_LAYOUT = [
    0xAA, 0xC9, 0x3B, 0xC8, 0xA9, 0x4D, 0xB7, 0xA7,
    0x92, 0x3F, 0x24, 0xF4, 0xDB, 0xE4, 0xB6, 0x79,
    0x7D, 0x9B, 0xFA, 0x2C, 0xCC, 0xC5, 0xA2, 0x27,
    0x32, 0xEF, 0x23, 0xCE, 0xC6, 0xA8, 0x8D, 0xD8,
    0x3C, 0x2A, 0xD3, 0x85, 0x6F, 0x6E, 0x9C, 0x4E,
    0xAC, 0xA5, 0xBD, 0xBE, 0xF7, 0xBF, 0x5B, 0x28,
    0x77, 0xC2, 0x73, 0x93, 0x99, 0x29, 0x87, 0x66,
    0x75, 0x8A, 0xF3, 0x7B, 0x57, 0x33, 0x4A, 0xCA,
    0xE7, 0x86, 0xF2, 0xA6, 0xE9, 0x65, 0x69, 0x70,
    0x91, 0xB9, 0xB8, 0xBB, 0x2B, 0x30, 0x98, 0x21,
    0x95, 0xD4, 0x2E, 0xA4, 0x64, 0x74, 0xA0, 0x20,
    0x81, 0xD5, 0xAD, 0x58, 0x8B, 0x84, 0x6A, 0x8F,
    0xB5, 0xE0, 0x31, 0x54, 0xB1, 0x45, 0xE3, 0x51,
    0x90, 0x34, 0xF8, 0x5F, 0xE8, 0xDC, 0x8C, 0x55,
    0x56, 0xA3, 0xFE, 0xAF, 0xDA, 0x25, 0xDE, 0x5D,
    0xDD, 0x6C, 0xF0, 0xEA, 0xFC, 0x49, 0xD9, 0x94,
    0x7A, 0xBA, 0x40, 0x26, 0x9A, 0x97, 0xEE, 0xD0,
    0x68, 0x67, 0xC0, 0xA1, 0xB3, 0x2F, 0x59, 0xE2,
    0xE1, 0x88, 0x7E, 0x60, 0x96, 0x3D, 0x7C, 0xAE,
    0x6D, 0xF9, 0xAB, 0x35, 0x48, 0x9D, 0x4F, 0xE6,
    0xED, 0x4C, 0xFD, 0x50, 0x9F, 0x2D, 0x22, 0x5C,
    0xCD, 0xD7, 0x4B, 0x63, 0xD2, 0xEC, 0x44, 0xDF,
    0x71, 0x5E, 0x83, 0xF5, 0x47, 0x78, 0x89, 0x5A,
    0x80, 0x9E, 0x6B, 0x52, 0xB2, 0xEB, 0x76, 0xC1,
    0x53, 0xC7, 0xFB, 0x7F, 0xCF, 0x72, 0xC4, 0x61,
    0xB4, 0x82, 0xD6, 0xC3, 0x41, 0x46, 0xBC, 0xD1,
    0xF6, 0xCB, 0xE5, 0x8E, 0x3E, 0xB0, 0x62, 0xF1
];
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await nukeAllRows();
    await populateRaces();
    await populateAges();
    await populateGenders();
    await populateCharacters();
}

async function nukeAllRows() {
    await prisma.character.deleteMany({});
    await prisma.race.deleteMany({});
}

async function populateRaces() {
    type raceDataType = { name: string, description: string, prompt: string, imagePath: string };
    const data: raceDataType[] = [
        {
            name: "Elf",
            description: "Graceful and ancient beings of the forest, elves possess pointed ears and ethereal beauty, with a deep connection to nature and wisdom.",
            prompt: "elf, elven, pointed ears, elaborate jewelry, blonde or silver hair, sharp eyes, green eyes, green and brown attire, moonlight, forest, ",
            imagePath: "~/public/images/elf.png"
        },
        {
            name: "Celestial",
            description: "Luminous and divine, celestials are radiant beings of light, often depicted with wings and an aura of purity and spiritual power.",
            prompt: "celestial being, stars sun cosmos, glowing hands, angel wings, celestial symbols, divine, halo, mature, serene, calm, ",
            imagePath: "~/public/images/celestial.png"
        },
        {
            name: "Djinn",
            description: "Born from the winds, djinn are elemental spirits of air, characterized by their ever-changing forms and an enigmatic presence that carries whispers of freedom.",
            prompt: "djinn, demon, dark eyes, arabian attire, dark hair, sand, desert, sandstorm, night sky, smoke and fire, ",
            imagePath: "~/public/images/djinn.png"
        },
        {
            name: "Genasi",
            description: "Embodiments of elemental forces, genasi are humanoids intertwined with elements like fire, water, air, or earth, bestowing them with unique features and abilities.",
            prompt: "genasi, elemental, earth powers, stone, rocks, amber eyes, linen shirt, strong, ",
            imagePath: "~/public/images/genasi.png"
        },
        {
            name: "Shapeshifter",
            description: "Fluid and versatile, shapeshifters possess the gift of transformation, seamlessly morphing into different appearances and creatures with uncanny adaptability.",
            prompt: "serious, cloak, shapeshifter, reptilian eyes, long black hair, noble, pale skin, mysterious, ",
            imagePath: "~/public/images/shapeshifter.png"
        },
        {
            name: "Naiad",
            description: "Emerging from waters' embrace, naiads are water nymphs of beauty and serenity, embodying the essence of lakes, rivers, and streams in their form.",
            prompt: "naiad, blue eyes pearls, seashell and lotus attire, luminescent scales, water-swept hair, webbed ears, waterfall scenery, ripples, blue skin, ",
            imagePath: "~/public/images/naiad.png"
        },
        {
            name: "Dragonborn",
            description: "Bearing the lineage of dragons, dragonborn are majestic and fierce beings, often with scaled features, embodying the power of fire and the spirit of the draconic.",
            prompt: "scaly skin, majestic, regal, serious expression, gold and red attire, dragon wings, strong, gold armor, fiery scenery, ",
            imagePath: "~/public/images/dragonborn.png"
        }
    ];

    await prisma.race.createMany({
        data: data,
    });
}

async function populateAges() {
    type ageDataType = { name: string, description: string, prompt: string };
    const data: ageDataType[] = [
        {
            name: "Ephemeral Youth",
            description: "In the bloom of fleeting youth, radiating boundless energy and untamed spirit. Their journeys are as vibrant as the colors of the dawn.",
            prompt: "Youthful, Vigorous, Curious, Vibrant, Spirited"
        },
        {
            name: "Enigma of Ages",
            description: "Bearing the enigmatic weight of years, like ancient tomes filled with tales of bravery and heartache. Their faces hold echoes of the past and visions of the future.",
            prompt: "Mature, Experienced, Wise, Depth, Visionary"
        },
        {
            name: "Echoes of Eternity",
            description: "Having danced with time, their existence is a tapestry woven with threads of ancient magic and timeless wisdom. Their presence is a whisper from the pages of history.",
            prompt: "Elderly, Ancient, Mystical, Wisdom, Timeless"
        }
    ];

    await prisma.age.createMany({
        data: data,
    });
}

async function populateGenders() {
    type genderDataType = { name: string, description: string, prompt: string };
    const data: genderDataType[] = [
        {
            name: "Feminine",
            description: "Radiant and graceful, embodying the essence of femininity. They possess an ethereal charm that captivates with every movement and gesture.",
            prompt: "Woman, Female"
        },
        {
            name: "Masculine",
            description: "Mighty and protective, representing the epitome of masculinity. They are the shield bearers and stalwart defenders of honor and strength.",
            prompt: "Man, Male"
        },
        {
            name: "Essenceless",
            description: "Balancing the spectrum, they harmonize diverse energies. Their presence is a union of contrasts, celebrating the beauty of both sides.",
            prompt: "Androgynous, Non-binary"
        }
    ];

    await prisma.gender.createMany({
        data: data,
    });
}

async function populateCharacters() {

    const data = [
        {characterName: "Elara", raceName: "Elf", genderName: "Essenceless", ageName: "Echoes of Eternity"},
        {characterName: "Orion", raceName: "Celestial", genderName: "Masculine", ageName: "Enigma of Ages"},
        {characterName: "Zara", raceName: "Djinn", genderName: "Feminine", ageName: "Ephemeral Youth"},
        {characterName: "Sylva", raceName: "Genasi", genderName: "Masculine", ageName: "Echoes of Eternity"},
        {characterName: "Vireo", raceName: "Shapeshifter", genderName: "Essenceless", ageName: "Ephemeral Youth"},
        {characterName: "Anahita", raceName: "Naiad", genderName: "Feminine", ageName: "Enigma of Ages"},
        {characterName: "Helios", raceName: "Dragonborn", genderName: "Masculine", ageName: "Ephemeral Youth"},
    ];

    await prisma.character.createMany({
        data: data,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

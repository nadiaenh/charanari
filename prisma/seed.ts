import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await nukeAllRows();
    await populateRaces();
    await populateCharacters();
}

async function nukeAllRows() {
    await prisma.character.deleteMany({});
    await prisma.race.deleteMany({});
}

async function populateRaces() {
    const races = [
        "Elf",
        "Mermaid",
        "Succubus",
        "Human",
        "Centaur",
        "Sorcerer",
        "Elemental",
        "Ghoul",
        "Half-Dragon",
        "Fairy",
    ];

    const data: { raceName: string }[] = [];
    for (const race of races) {
        data.push({raceName: race});
    }

    await prisma.race.createMany({
        data: data,
    });
}

async function populateCharacters() {

    const data: { characterName: string, raceName: string }[] = [];
    data.push({characterName: "Alden", raceName: "Elf"});
    data.push({characterName: "Aldis", raceName: "Mermaid"});
    data.push({characterName: "Aldrich", raceName: "Succubus"});
    
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

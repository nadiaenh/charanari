import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await nukeAllRows();
  await populateRaces();
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
    "Dragon",
    "Fairy",
  ];

  const data: { name: string }[] = [];
  for (const race of races) {
    data.push({ name: race });
  }

  await prisma.race.createMany({
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

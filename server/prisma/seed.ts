import prisma from "../src/config/prisma";
import { hashSync } from "bcryptjs";

(async () => {
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@mail.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@mail.com",
      role: "Admin",
      password: hashSync("password"),
    },
  });

  const pizza = await prisma.category.upsert({
    where: {
      name: "Pizza",
    },
    update: {},
    create: {
      name: "Pizza",
    },
  });

  const pasta = await prisma.category.upsert({
    where: {
      name: "Pasta",
    },
    update: {},
    create: {
      name: "Pasta",
    },
  });

  const drink = await prisma.category.upsert({
    where: {
      name: "Drink",
    },
    update: {},
    create: {
      name: "Drink",
    },
  });

  console.log({ admin, pizza, pasta, drink });
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

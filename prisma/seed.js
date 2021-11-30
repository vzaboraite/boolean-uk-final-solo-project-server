const bcrypt = require("bcrypt");
const prisma = require("../src/utils/db");

async function seed() {
  const hashedPassword1 = await bcrypt.hash("password", 8);
  const hashedPassword2 = await bcrypt.hash("password", 8);

  const jane = await prisma.user.create({
    data: {
      username: "janedoe",
      password: hashedPassword1,
    },
  });

  const john = await prisma.user.create({
    data: {
      username: "johndoe",
      password: hashedPassword2,
    },
  });
}

seed();

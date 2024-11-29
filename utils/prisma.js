import pkg from "@prisma/client";

const { PrismaClient } = pkg

const prismaClientSingleton = () => {
  return new PrismaClient({ log: ["info"] });
};

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prismaClientSingleton();
}

export default globalForPrisma.prisma;


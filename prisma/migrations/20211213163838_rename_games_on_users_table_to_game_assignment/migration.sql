/*
  Warnings:

  - You are about to drop the `UsersOnGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnGames" DROP CONSTRAINT "UsersOnGames_gameId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnGames" DROP CONSTRAINT "UsersOnGames_userId_fkey";

-- DropTable
DROP TABLE "UsersOnGames";

-- CreateTable
CREATE TABLE "GameAssignment" (
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "color" "Color" NOT NULL,

    CONSTRAINT "GameAssignment_pkey" PRIMARY KEY ("userId","gameId")
);

-- AddForeignKey
ALTER TABLE "GameAssignment" ADD CONSTRAINT "GameAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAssignment" ADD CONSTRAINT "GameAssignment_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

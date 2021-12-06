/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UsersOnGames` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UsersOnGames" DROP CONSTRAINT "UsersOnGames_gameId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnGames" DROP CONSTRAINT "UsersOnGames_userId_fkey";

-- DropIndex
DROP INDEX "Game_id_gameStatus_key";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Game_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UsersOnGames" DROP CONSTRAINT "UsersOnGames_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "gameId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UsersOnGames_pkey" PRIMARY KEY ("userId", "gameId");

-- AddForeignKey
ALTER TABLE "UsersOnGames" ADD CONSTRAINT "UsersOnGames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGames" ADD CONSTRAINT "UsersOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

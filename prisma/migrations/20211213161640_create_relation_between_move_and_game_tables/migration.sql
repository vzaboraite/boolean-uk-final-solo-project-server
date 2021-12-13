/*
  Warnings:

  - Added the required column `gameId` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

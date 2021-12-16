/*
  Warnings:

  - You are about to drop the `Move` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `moves` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_captureMoveId_fkey";

-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "moves" TEXT NOT NULL;

-- DropTable
DROP TABLE "Move";

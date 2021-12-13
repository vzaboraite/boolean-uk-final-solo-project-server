/*
  Warnings:

  - Added the required column `color` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `UsersOnGames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "color" "Color" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UsersOnGames" ADD COLUMN     "color" "Color" NOT NULL;

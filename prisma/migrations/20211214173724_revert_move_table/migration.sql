/*
  Warnings:

  - You are about to drop the column `fromColIndex` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `fromRowIndex` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `toColIndex` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `toRowIndex` on the `Move` table. All the data in the column will be lost.
  - Added the required column `colIndex` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rowIndex` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" DROP COLUMN "fromColIndex",
DROP COLUMN "fromRowIndex",
DROP COLUMN "toColIndex",
DROP COLUMN "toRowIndex",
ADD COLUMN     "colIndex" INTEGER NOT NULL,
ADD COLUMN     "rowIndex" INTEGER NOT NULL;

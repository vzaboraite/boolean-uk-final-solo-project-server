/*
  Warnings:

  - You are about to drop the column `colIndex` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `rowIndex` on the `Move` table. All the data in the column will be lost.
  - Added the required column `fromColIndex` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromRowIndex` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toColIndex` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toRowIndex` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" DROP COLUMN "colIndex",
DROP COLUMN "rowIndex",
ADD COLUMN     "fromColIndex" INTEGER NOT NULL,
ADD COLUMN     "fromRowIndex" INTEGER NOT NULL,
ADD COLUMN     "toColIndex" INTEGER NOT NULL,
ADD COLUMN     "toRowIndex" INTEGER NOT NULL;

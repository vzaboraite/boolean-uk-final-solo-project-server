-- CreateTable
CREATE TABLE "Move" (
    "id" TEXT NOT NULL,
    "rowIndex" INTEGER NOT NULL,
    "colIndex" INTEGER NOT NULL,
    "captureMoveId" TEXT,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Move_captureMoveId_key" ON "Move"("captureMoveId");

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_captureMoveId_fkey" FOREIGN KEY ("captureMoveId") REFERENCES "Move"("id") ON DELETE SET NULL ON UPDATE CASCADE;

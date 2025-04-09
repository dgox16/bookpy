/*
  Warnings:

  - You are about to drop the column `nationality` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "nationality",
ADD COLUMN     "nationalityCode" TEXT;

-- CreateTable
CREATE TABLE "Nationality" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Nationality_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_nationalityCode_fkey" FOREIGN KEY ("nationalityCode") REFERENCES "Nationality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

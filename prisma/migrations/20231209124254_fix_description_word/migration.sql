/*
  Warnings:

  - You are about to drop the column `descriptin` on the `specialization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "specialization" DROP COLUMN "descriptin",
ADD COLUMN     "description" TEXT;

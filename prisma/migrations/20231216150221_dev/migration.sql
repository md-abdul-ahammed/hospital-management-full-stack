-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "payment_date" DROP NOT NULL,
ALTER COLUMN "payment_date" DROP DEFAULT;

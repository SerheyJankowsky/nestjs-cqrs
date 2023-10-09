-- AlterTable
ALTER TABLE "Thing" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

/*
  Warnings:

  - You are about to drop the column `Work_orders` on the `contractors` table. All the data in the column will be lost.
  - You are about to drop the column `resident_id` on the `workorders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contractors` DROP COLUMN `Work_orders`;

-- AlterTable
ALTER TABLE `workorders` DROP COLUMN `resident_id`;

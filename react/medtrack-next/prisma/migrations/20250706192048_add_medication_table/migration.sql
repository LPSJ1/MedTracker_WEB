-- CreateTable
CREATE TABLE `Medication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Medication` ADD CONSTRAINT `Medication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

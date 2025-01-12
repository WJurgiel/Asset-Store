-- CreateTable
CREATE TABLE `assets` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `id-author` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL DEFAULT '',
    `type` ENUM('2D', '3D', 'SFX') NOT NULL,
    `price` INTEGER NULL DEFAULT 0,
    `upload-date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `id-user` INTEGER NOT NULL,
    `id-asset` INTEGER NOT NULL,

    INDEX `pk_assets_fav`(`id-asset`),
    INDEX `pk_users_fav`(`id-user`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rates` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `id-user` INTEGER NOT NULL,
    `id-asset` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,

    INDEX `pk_assets_rates`(`id-asset`),
    INDEX `pk_users_rates`(`id-user`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `id-user` INTEGER NOT NULL,
    `id-asset` INTEGER NOT NULL,
    `type` ENUM('bought', 'uploaded') NOT NULL,

    INDEX `pk_assets_transac`(`id-asset`),
    INDEX `pk_users_transac`(`id-user`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(25) NOT NULL,
    `creation-date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `unique-email`(`email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `pk_assets_fav` FOREIGN KEY (`id-asset`) REFERENCES `assets`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `pk_users_fav` FOREIGN KEY (`id-user`) REFERENCES `users`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rates` ADD CONSTRAINT `pk_assets_rates` FOREIGN KEY (`id-asset`) REFERENCES `assets`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rates` ADD CONSTRAINT `pk_users_rates` FOREIGN KEY (`id-user`) REFERENCES `assets`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `pk_assets_transac` FOREIGN KEY (`id-asset`) REFERENCES `assets`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `pk_users_transac` FOREIGN KEY (`id-user`) REFERENCES `users`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

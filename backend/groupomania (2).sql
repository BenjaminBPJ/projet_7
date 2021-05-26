-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 26 mai 2021 à 22:33
-- Version du serveur :  8.0.22
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` smallint UNSIGNED NOT NULL,
  `userId` smallint UNSIGNED NOT NULL,
  `publiId` smallint UNSIGNED NOT NULL,
  `content` varchar(250) NOT NULL,
  `publiAt` datetime NOT NULL,
  `userFirstName` varchar(50) NOT NULL,
  `userLastName` varchar(50) NOT NULL,
  `userImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `userId`, `publiId`, `content`, `publiAt`, `userFirstName`, `userLastName`, `userImage`) VALUES
(14, 76, 37, 'encore une fois jadore', '2021-05-16 11:28:59', 'Antoine', 'Ascoli', NULL),
(15, 78, 37, 'geniale', '2021-05-17 15:35:08', 'Nathalie', 'Ratin', NULL),
(16, 78, 39, 'genialissime', '2021-05-17 17:47:30', 'Nathalie', 'Ratin', NULL),
(33, 78, 36, 'de meme, bienvenue', '2021-05-25 09:56:16', 'Nathalie', 'Ratin', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` smallint UNSIGNED NOT NULL,
  `userId` smallint UNSIGNED NOT NULL,
  `datePublication` date NOT NULL,
  `titre` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publication` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `imageUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `datePublication`, `titre`, `publication`, `imageUrl`) VALUES
(36, 76, '2021-05-14', 'Bienvenue', 'salut à tous je suis heureux de vous retrouver ici', 'http://localhost:3000/images/bcuize1620985379158.jpg'),
(37, 76, '2021-05-14', 'nouveau paysage', 'je vous envoie une photo du paysage vu des nouveaux locaux', 'http://localhost:3000/images/ryan-hoffman-V7GBs5HehG8-unsplash1620985465565.jpg'),
(39, 78, '2021-05-14', 'aide', 'salut, une collegue a besoin d\'aide pour le projet 4785D, cordialement', 'http://localhost:3000/images/kellen-riggin-SLZiNNkf9Kc-unsplash1620985880399.jpg'),
(44, 78, '2021-05-25', 'nouvelle publication', 'test', 'http://localhost:3000/images/ryan-hoffman-V7GBs5HehG8-unsplash1621941226151.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` smallint UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `imageUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `role` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'membre'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `lastName`, `firstName`, `password`, `description`, `imageUrl`, `role`) VALUES
(75, 'benjamin@groupomania.fr', 'Pierre-jean', 'Benjamin', '$2b$10$fQn6TGBjJBHqj32uh0Pj.ezjiD2MUlb.Sn0ai9gV6Xo1ZUfoZKcta', NULL, NULL, 'membre'),
(76, 'antoine@groupomania.fr', 'Ascoli', 'Antoine', '$2b$10$n/oAuav1fLO.b8hdPhiVee0GhV0BWFf.RO1TR1LVD9.uU6YbfBcCS', NULL, NULL, 'membre'),
(77, 'rodin@groupomania.fr', 'Rodin', 'jacques', '$2b$10$LoLgDDMaIrHryStDIB.mJe.HNUekCMxnXFEBAtw65qIcTGu4a5ZTy', NULL, NULL, 'membre'),
(78, 'ratich@groupomania.fr', 'Ratin', 'Nathalie', '$2b$10$lLHWI1gPVEalJfH0Tn31BOdswwgVNO2C3XQbqJZtVIawLs6h8kvSC', NULL, NULL, 'membre');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId_commentaires` (`userId`),
  ADD KEY `fk_publiId_commentaires` (`publiId`),
  ADD KEY `fk_userFirstName_commentaires` (`userFirstName`) USING BTREE,
  ADD KEY `fk_userImage_commentaires` (`userImage`),
  ADD KEY `fk_userLastName_commentaires` (`userLastName`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_users` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_publiId_commentaires` FOREIGN KEY (`publiId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_userId_commentaires` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_id_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

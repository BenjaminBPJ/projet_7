-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 09 juin 2021 à 22:31
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
  `publiAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `userId`, `publiId`, `content`, `publiAt`) VALUES
(14, 76, 37, 'encore une fois jadore', '2021-05-16 11:28:59'),
(15, 78, 37, 'oui vraiment vraiment genial', '2021-05-17 15:35:08'),
(39, 78, 47, 'dernier com', '2021-06-05 17:31:35');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` smallint UNSIGNED NOT NULL,
  `userId` smallint UNSIGNED NOT NULL,
  `datePublication` datetime NOT NULL,
  `titre` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publication` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `imageUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `datePublication`, `titre`, `publication`, `imageUrl`) VALUES
(36, 76, '2021-06-03 16:08:30', 'Bienvenue', 'salut à tous je suis heureux de vous retrouver ici', 'http://localhost:3000/images/kellen-riggin-SLZiNNkf9Kc-unsplash1622729310474.jpg'),
(37, 76, '2021-05-14 00:00:00', 'nouveau paysage', 'je vous envoie une photo du paysage vu des nouveaux locaux', 'http://localhost:3000/images/ryan-hoffman-V7GBs5HehG8-unsplash1620985465565.jpg'),
(47, 76, '2021-05-28 00:00:00', 'salutation', 'hello le reseau', 'http://localhost:3000/images/kellen-riggin-SLZiNNkf9Kc-unsplash1622213495041.jpg'),
(48, 77, '2021-05-29 00:00:00', 'sdc', 'sdcvsd', NULL),
(54, 76, '2021-06-03 14:14:52', 'new', 'taratata', NULL);

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
(76, 'antoine@groupomania.fr', 'Ascoli', 'Antoine', '$2b$10$n/oAuav1fLO.b8hdPhiVee0GhV0BWFf.RO1TR1LVD9.uU6YbfBcCS', 'nouveau comptable', 'http://localhost:3000/images/ryan-hoffman-V7GBs5HehG8-unsplash1622715242219.jpg', 'membre'),
(77, 'rodin@groupomania.fr', 'Rodin', 'jacques', '$2b$10$LoLgDDMaIrHryStDIB.mJe.HNUekCMxnXFEBAtw65qIcTGu4a5ZTy', NULL, NULL, 'membre'),
(78, 'ratich@groupomania.fr', 'Ratin', 'Nathalie', '$2b$10$lLHWI1gPVEalJfH0Tn31BOdswwgVNO2C3XQbqJZtVIawLs6h8kvSC', 'Bienvenue sur ma bio', NULL, 'membre'),
(79, 'admin@groupomania.fr', 'Pierre-Jean', 'Benjamin', '$2b$10$tI/ZAjOvZ0YLDEtr9u1xK.9i8K13jjiKnsC7WraFU1LHU3evfgEz.', NULL, NULL, 'administrateur');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId_commentaires` (`userId`),
  ADD KEY `fk_publiId_commentaires` (`publiId`);

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
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

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

-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 14 avr. 2021 à 17:46
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

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` smallint UNSIGNED NOT NULL,
  `userId` smallint UNSIGNED NOT NULL,
  `datePublication` date NOT NULL,
  `titre` varchar(55) NOT NULL,
  `publication` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `datePublication`, `titre`, `publication`, `imageUrl`) VALUES
(5, 42, '2021-04-09', '', 'bpj@hot.fr', '0000'),
(6, 42, '2021-04-10', 'yubgvyuh.png', 'first publi', 'salut tout le monde'),
(7, 42, '2021-04-10', 'deuxieme publication', 'partage d\'un feu de joie', 'vionjviozenj.png'),
(8, 42, '2021-04-10', 'undefined', 'undefined', 'http://localhost:3000/images/vionjviozenj.png'),
(9, 42, '2021-04-10', 'undefined', 'undefined', 'http://localhost:3000/images/vionjviozenj.png'),
(10, 42, '2021-04-10', 'undefined', 'undefined', '1618057177924vionjviozenj.png'),
(11, 42, '2021-04-10', 'undefined', 'undefined', '1618057219168vionjviozenj.png'),
(13, 42, '2021-04-10', 'deuxieme publicationnn', 'partage dun feu de joieeee', '1618057671931vionjviozenj.png'),
(15, 42, '2021-04-10', 'deuxieme publicationnn', 'partage dun feu de joieeee', '1618057673158vionjviozenj.png');

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
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Aucune description pour le moment',
  `imageUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'avatar1.png',
  `role` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'membre'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `lastName`, `firstName`, `password`, `description`, `imageUrl`, `role`) VALUES
(5, 'pj@hot.fr', 'pj', 'ben', '$2b$10$nZdpYkCZNMnf66gqqvKeg.Ju83fnEN3UhvZRUJlhHDzaZZ7JXAGGW', 'Aucune description pour le moment', 'Photo', 'membre'),
(32, 'pierrejeanbenjamin@hotmail.fr', 'Benjamin', 'Pierre-Jean', '$2b$10$TlZmGsGJU8Mru1z0/sviB.1dltNoe4WRUubU1DlJJKN9BGWN9Er0O', '', 'toto1611671113933.jpg', 'membre'),
(34, 'svzsev', 'vsevfze', 'vzesz', '$2b$10$.UAobLMrOHgAbGzvTsu7j.wlGCrZZQ/7Wtc.IiVbunYkWf0OGIkWG', 'Aucune description pour le moment', 'toto1611671113933.jpg', 'membre'),
(35, 'arti@gmail.com', 'benben', 'benten', '$2b$10$YKImEsmquV9ES.ZQPvDKdu9cZ3LfWE0YZCENFx3p3nqKFOOkPFaG2', 'Aucune description pour le moment', 'toto1611671113933.jpg', 'membre'),
(36, 'lacune@gmail.com', 'czefcze', 'fzer', '$2b$10$7vGcePiC4bb6lLiCyXYiOO9/S4fF6KX4Eq7OmDquktdjE2RAS5GNS', 'Aucune description pour le moment', 'toto1611671113933.jpg', 'membre'),
(40, 'conichuvdsvsdaligato@gmail.com', 'v sdfvzer', 'qsdcvs', '$2b$10$cLWDTG/Il0VfPTyjPQl56OlFFyKBr7vak51JOqFnqhDg.iHf0R9dC', 'Aucune description pour le moment', 'toto1611671113933.jpg', 'membre'),
(42, 'taratata@free.fr', 'Michmich', 'Michel', '$2b$10$B62UXMO9fxU9.3tBVcFWuOSw5HsqVu0JtImf8QeXjFUq5lN3CorVW', 'nouveau CTO de Groupomania', '1618417745758avatar6.png', 'membre'),
(43, 'alololu@free.fr', 'ertyti', 'neph', '$2b$10$7ttZvaK5gxJFP5aj1ve1U.tZyCJdjZMWFdrqGXPsrQTUqBi4lrlSi', 'Aucune description pour le moment', 'toto1611671113933.jpg', 'membre'),
(44, 'alololu@groupomania.fr', 'undefined', 'undefined', '$2b$10$aRs9unkCz.GFEEZy7s2mmullFqYtFLEtvOPvCCVin1175z.5X7g1.', 'Aucune description pour le moment', 'toto1611671113933.jpg', 'membre'),
(46, 'aloRlolu@groupomania.fr', 'undefined', 'undefined', '$2b$10$B1bQV6PWaaZ2MtJ4MGc7w.b4K52iagT/LcEp37nmXBhcpoUsbRrba', 'Aucune description pour le moment', 'avatar1.png', 'membre'),
(48, 'tararatata@groupomania.fr', 'Benben', 'tarata', '$2b$10$4EkXHzQqQrRhHgVKq1UNAuKoV6VZoqWWSqHcEx0RpBFpLP7eUHtgC', 'Benben pour vous servir', '1618071982567avatar6.png', 'membre'),
(49, 'guadapj@groupomania.fr', 'Benjamin', 'Pierre-Jean', '$2b$10$eGws/UbmkKDqKdB8B8J/2epTIpCjHyArfPb31W8OysqKnEyw00LsW', 'Aucune description pour le moment', 'avatar1.png', 'membre');

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
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

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
  ADD CONSTRAINT `fk_id_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

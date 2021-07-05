-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 05 juil. 2021 à 18:28
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
(135, 77, 161, 'Bonjour Elodie !', '2021-07-05 19:12:59'),
(136, 78, 161, 'Bien joué pour l&#039;inauguration !', '2021-07-05 19:13:57'),
(137, 77, 162, 'Salut Nath, j&#039;ai pas du tout les compétences pour t&#039;aider, désolé et bon courage. ', '2021-07-05 19:17:35'),
(138, 76, 161, 'Bienvenue !', '2021-07-05 19:19:18'),
(139, 76, 162, 'Coucou ! Oui biensûr, tu peux passer dans mon bureau au troisième étage, je peu t&#039;aider avec plaisir', '2021-07-05 19:19:55'),
(140, 88, 162, 'Si jamais moi aussi, je peux aider.', '2021-07-05 19:25:05'),
(141, 88, 161, 'Salut, bienvenue ! ', '2021-07-05 19:25:18'),
(142, 77, 163, 'Que de bons souvenirs.', '2021-07-05 19:29:42');

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
(161, 87, '2021-07-05 19:11:25', 'Bonjour', 'Bonjour, j&#039;ai l&#039;honneur d&#039;inaugurer le réseau social de l&#039;entreprise avec son premier article ! ', 'http://localhost:3000/images/kellen-riggin-SLZiNNkf9Kc-unsplash1625505085338.jpg'),
(162, 78, '2021-07-05 19:16:26', 'Aide', 'Salut tout le monde, j&#039;aurais aimé savoir si il y avait quelqu&#039;un pour m&#039;aider sur le dossier 445885 par rapport aux fournisseurs des nouveaux produits.\n\nBonne journée tout le monde.', NULL),
(163, 76, '2021-07-05 19:21:46', 'Vacances', 'Voilà une petite photo des montagnes que j&#039;ai prise lors du séminaire dans les Alpes, la semaine dernère. ', 'http://localhost:3000/images/ryan-hoffman-V7GBs5HehG8-unsplash1625505706836.jpg'),
(164, 88, '2021-07-05 19:27:45', 'Arbre pour le nouveau sirop d&#039;érable', '', 'http://localhost:3000/images/bcuize1625506054413.jpg');

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
(76, 'antoine@groupomania.fr', 'Ascoli', 'Antoine', '$2b$10$n/oAuav1fLO.b8hdPhiVee0GhV0BWFf.RO1TR1LVD9.uU6YbfBcCS', 'Chef cuisinier', 'http://localhost:3000/images/pexels-joão-jesus-10802131625505527531.jpg', 'membre'),
(77, 'rodin@groupomania.fr', 'Rodin', 'jacques', '$2b$10$LoLgDDMaIrHryStDIB.mJe.HNUekCMxnXFEBAtw65qIcTGu4a5ZTy', 'DRH', 'http://localhost:3000/images/pexels-pixabay-2204531625505165403.jpg', 'membre'),
(78, 'ratich@groupomania.fr', 'Ratin', 'Nathalie', '$2b$10$lLHWI1gPVEalJfH0Tn31BOdswwgVNO2C3XQbqJZtVIawLs6h8kvSC', 'Bienvenue sur ma bio', NULL, 'membre'),
(79, 'admin@groupomania.fr', 'Pierre-Jean', 'Benjamin', '$2b$10$tI/ZAjOvZ0YLDEtr9u1xK.9i8K13jjiKnsC7WraFU1LHU3evfgEz.', 'Administrateur Groupomania', 'http://localhost:3000/images/raychan-iAlerP-CnBY-unsplash1625477686058.jpg', 'administrateur'),
(87, 'emorgan@groupomania.fr', 'Morgan', 'Elodie', '$2b$10$qdUPdP8XEvbtQMziTlX9Mu367Gd1fvgqx8/wt.vaIG0XItZLXj3r.', 'Comptable', 'http://localhost:3000/images/pexels-hüsamettin-akgün-37798531625504932251.jpg', 'membre'),
(88, 'aturpin@groupomania.fr', 'Turpin', 'Arthur', '$2b$10$MU3jXLDYfN/jYigPEBjv9u.QcU9hgoxMbh9RHJYM9SAxnLBwj8dVy', 'Commercial', 'http://localhost:3000/images/pexels-juan-n-gomez-25896531625506088414.jpg', 'membre');

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
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

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

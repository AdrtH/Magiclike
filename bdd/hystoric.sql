-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 01 juin 2022 à 18:19
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hystoric`
--

-- --------------------------------------------------------

--
-- Structure de la table `app_carte`
--

CREATE TABLE `app_carte` (
  `rel_id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `deck_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `app_carte`
--

INSERT INTO `app_carte` (`rel_id`, `card_id`, `deck_id`) VALUES
(0, 0, 0),
(1, 0, 0),
(2, 0, 0),
(3, 0, 0),
(4, 0, 0),
(5, 0, 0),
(6, 0, 0),
(7, 0, 0),
(8, 1, 0),
(9, 1, 0),
(10, 1, 0),
(11, 1, 0),
(12, 1, 0),
(13, 2, 0),
(14, 2, 0),
(15, 2, 0),
(16, 2, 0),
(17, 2, 0),
(18, 2, 0),
(19, 2, 0),
(20, 3, 0),
(21, 3, 0),
(22, 3, 0),
(23, 3, 0),
(24, 3, 0),
(25, 4, 0),
(26, 4, 0),
(27, 4, 0),
(28, 5, 0),
(29, 5, 0),
(30, 5, 0),
(31, 5, 0),
(32, 6, 0),
(33, 6, 0),
(34, 6, 0),
(35, 6, 0),
(36, 7, 0),
(37, 7, 0),
(38, 7, 0),
(39, 7, 0);

-- --------------------------------------------------------

--
-- Structure de la table `carte`
--

CREATE TABLE `carte` (
  `card_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `description` text NOT NULL,
  `onPlay` varchar(255) DEFAULT NULL,
  `onTap` varchar(255) DEFAULT NULL,
  `eachTurn` varchar(255) DEFAULT NULL,
  `onDeath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `carte`
--

INSERT INTO `carte` (`card_id`, `name`, `type`, `cost`, `description`, `onPlay`, `onTap`, `eachTurn`, `onDeath`) VALUES
(0, 'Mairie', -3, 0, 'Rajoute 1 DP', NULL, NULL, NULL, NULL),
(1, 'Usine', -2, 0, 'Rajoute 1 PP', NULL, NULL, NULL, NULL),
(2, 'Ferme', -1, 0, 'Rajoute 1 FP', NULL, NULL, NULL, NULL),
(3, 'Armurier', 0, 1, NULL, 'Tour +1', NULL, 'Luck Revolte +1%', NULL),
(4, 'Gatling', 0, 2, NULL, 'Tour +5', NULL, 'Event Malheureux +7%', NULL),
(5, 'Citoyen Honoré', 0, 2, NULL, NULL, NULL, 'Event Malheureux -5%', NULL),
(6, 'Banquier', 0, 2, NULL, 'Tour +1', 'Piochez une carte', NULL, NULL),
(7, 'Etudiant', 0, 3, NULL, 'Tour +2', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `deck`
--

CREATE TABLE `deck` (
  `deck_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `dirig_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `deck`
--

INSERT INTO `deck` (`deck_id`, `name`, `dirig_id`) VALUES
(0, 'Deck de Demo', 0);

-- --------------------------------------------------------

--
-- Structure de la table `dirigeant`
--

CREATE TABLE `dirigeant` (
  `dirig_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `dirigeant`
--

INSERT INTO `dirigeant` (`dirig_id`, `name`, `description`) VALUES
(0, 'Demon de Stration', 'Payez 42€ pour le jeu complet');

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `type_id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`type_id`, `name`) VALUES
(-3, 'Btm_Admin'),
(-2, 'Btm_Production'),
(-1, 'Btm_Nourriture'),
(0, 'Député');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

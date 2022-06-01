-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 01 juin 2022 à 12:46
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
(2, 0, 0);

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
  `onPlay` int(11) DEFAULT NULL,
  `onTap` int(11) DEFAULT NULL,
  `eachTurn` int(11) DEFAULT NULL,
  `onDeath` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `carte`
--

INSERT INTO `carte` (`card_id`, `name`, `type`, `cost`, `description`, `onPlay`, `onTap`, `eachTurn`, `onDeath`) VALUES
(0, 'Mairie', -3, 0, 'Rajoute 1 DP', NULL, NULL, NULL, NULL),
(1, 'Usine', -2, 0, 'Rajoute 1 PP', NULL, NULL, NULL, NULL),
(2, 'Ferme', -1, 0, 'Rajoute 1 FP', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `deck`
--

CREATE TABLE `deck` (
  `deck_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `dirig_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `dirigeant`
--

CREATE TABLE `dirigeant` (
  `dirig_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

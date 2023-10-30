-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : devbdd.iutmetz.univ-lorraine.fr
-- Généré le : lun. 30 oct. 2023 à 06:29
-- Version du serveur : 10.3.39-MariaDB
-- Version de PHP : 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `maloron1u_infractions`
--

-- --------------------------------------------------------

--
-- Structure de la table `comprend`
--

CREATE TABLE `comprend` (
  `id_inf` varchar(5) NOT NULL,
  `id_delit` int(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `comprend`
--

INSERT INTO `comprend` (`id_inf`, `id_delit`) VALUES
('1', 1),
('11', 3),
('11', 5),
('12', 3),
('13', 2),
('2', 1),
('2', 2),
('3', 3),
('4', 4),
('4', 5),
('5', 2),
('5', 4),
('6', 1),
('6', 2),
('6', 4),
('6', 6),
('7', 1),
('7', 2),
('7', 5),
('8', 1),
('8', 2),
('8', 6),
('85', 1),
('85', 5),
('9', 3),
('9', 6);

-- --------------------------------------------------------

--
-- Structure de la table `conducteur`
--

CREATE TABLE `conducteur` (
  `no_permis` varchar(4) NOT NULL,
  `date_permis` date NOT NULL,
  `nom` varchar(25) NOT NULL,
  `prenom` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `conducteur`
--

INSERT INTO `conducteur` (`no_permis`, `date_permis`, `nom`, `prenom`) VALUES
('AZ67', '2011-02-01', 'AIRPACH', 'Fabrice'),
('AZ69', '2011-02-01', 'CAVALLI', 'Frédéric'),
('AZ71', '2017-02-02', 'MANGONI', 'Joseph'),
('AZ81', '1997-04-09', 'GAUDE', 'David'),
('AZ90', '2000-05-04', 'KIEFFER', 'Claudine'),
('AZ92', '2001-04-06', 'THEOBALD', 'Pascal'),
('AZ99', '2003-09-06', 'CAMARA', 'Souleymane');

-- --------------------------------------------------------

--
-- Structure de la table `delit`
--

CREATE TABLE `delit` (
  `id_delit` int(11) NOT NULL,
  `nature` varchar(40) NOT NULL,
  `tarif` decimal(6,2) NOT NULL DEFAULT 0.00
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `delit`
--

INSERT INTO `delit` (`id_delit`, `nature`, `tarif`) VALUES
(1, 'Excès de vitesse', 220.00),
(2, 'Outrage à agent', 450.00),
(3, 'Feu rouge grillé', 270.00),
(4, 'Conduite en état d\'ivresse', 380.00),
(5, 'Delit de fuite', 400.00),
(6, 'refus de priorité', 280.00);

-- --------------------------------------------------------

--
-- Structure de la table `infraction`
--

CREATE TABLE `infraction` (
  `id_inf` int(11) NOT NULL,
  `date_inf` date NOT NULL,
  `no_immat` varchar(8) NOT NULL,
  `no_permis` varchar(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `infraction`
--

INSERT INTO `infraction` (`id_inf`, `date_inf`, `no_immat`, `no_permis`) VALUES
(1, '2021-09-02', 'CA409BG', 'AZ67'),
(11, '2020-05-14', 'AA643BB', ''),
(12, '2021-12-02', 'AA643BB', 'AZ99'),
(13, '2021-08-11', 'AA643BB', 'AZ67'),
(2, '2021-09-04', 'BE456AD', 'AZ69'),
(3, '2021-09-04', 'AA643BB', 'AZ71'),
(4, '2021-09-06', 'BF823NG', 'AZ81'),
(5, '2021-09-08', '5432YZ88', 'AZ90'),
(6, '2021-09-11', 'AB308FG', 'AZ92'),
(7, '2021-09-08', 'AB308FG', ''),
(8, '2020-06-05', 'AA643BB', 'AZ67'),
(85, '2021-03-18', 'AA643BB', ''),
(9, '2020-10-01', 'AA643BB', '');

-- --------------------------------------------------------

--
-- Structure de la table `vehicule`
--

CREATE TABLE `vehicule` (
  `no_immat` varchar(8) NOT NULL,
  `date_immat` date NOT NULL,
  `modele` varchar(20) NOT NULL,
  `marque` varchar(20) NOT NULL,
  `no_permis` varchar(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `vehicule`
--

INSERT INTO `vehicule` (`no_immat`, `date_immat`, `modele`, `marque`, `no_permis`) VALUES
('5432YZ88', '2011-08-15', 'C3', 'Citroën', 'AZ90'),
('AA643BB', '2016-01-07', 'Golf', 'Volkswagen', 'AZ71'),
('AB308FG', '2017-03-27', '309', 'Peugeot', 'AZ92'),
('BE456AD', '2018-07-10', 'Kangoo', 'Renault', 'AZ69'),
('BF823NG', '2018-09-10', 'C3', 'Citroën', 'AZ81'),
('CA409BG', '2019-03-21', 'T-Roc', 'Volkswagen', 'AZ67');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comprend`
--
ALTER TABLE `comprend`
  ADD PRIMARY KEY (`id_inf`,`id_delit`);

--
-- Index pour la table `conducteur`
--
ALTER TABLE `conducteur`
  ADD PRIMARY KEY (`no_permis`);

--
-- Index pour la table `delit`
--
ALTER TABLE `delit`
  ADD PRIMARY KEY (`id_delit`);

--
-- Index pour la table `infraction`
--
ALTER TABLE `infraction`
  ADD PRIMARY KEY (`id_inf`);

--
-- Index pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`no_immat`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `delit`
--
ALTER TABLE `delit`
  MODIFY `id_delit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

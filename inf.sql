-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 04 nov. 2023 à 11:03
-- Version du serveur : 5.7.24
-- Version de PHP : 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `inf`
--

DROP TABLE IF EXISTS comprend;
DROP TABLE IF EXISTS infraction;
DROP TABLE IF EXISTS conducteur;
DROP TABLE IF EXISTS vehicule;
DROP TABLE IF EXISTS delit;

-- --------------------------------------------------------

--
-- Structure de la table `comprend`
--

CREATE TABLE `comprend` (
  `id_inf` varchar(5) NOT NULL,
  `id_delit` int(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comprend`
--

INSERT INTO `comprend` (`id_inf`, `id_delit`) VALUES
('1', 1),
('1', 8),
('10', 1),
('10', 5),
('11', 3),
('11', 5),
('11', 8),
('11', 9),
('11', 10),
('12', 3),
('13', 2),
('13', 7),
('2', 1),
('2', 2),
('3', 3),
('4', 4),
('4', 5),
('4', 7),
('4', 9),
('5', 2),
('5', 4),
('5', 8),
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
('8', 10),
('9', 3),
('9', 6),
('9', 9);

-- --------------------------------------------------------

--
-- Structure de la table `conducteur`
--

CREATE TABLE `conducteur` (
  `num_permis` varchar(4) NOT NULL,
  `date_permis` date NOT NULL,
  `nom` varchar(25) NOT NULL,
  `prenom` varchar(25) NOT NULL,
  `mot_de_passe` varchar(78) NOT NULL,
  `is_admin` boolean DEFAULT False
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `conducteur`
--

INSERT INTO `conducteur` (`num_permis`, `date_permis`, `nom`, `prenom`, `mot_de_passe`, `is_admin`) VALUES
('AZ67', '2011-02-01', 'AIRPACH', 'Fabrice', 'Fab-AIR67_', True),
('AZ69', '2011-02-01', 'CAVALLI', 'Frédéric', '!CaVfred6', False),
('AZ71', '2017-02-02', 'MANGONI', 'Joseph', 'Jojo71A', False),
('AZ81', '1997-04-09', 'GAUDE', 'David', '01David.m3', False),
('AZ90', '2000-05-04', 'KIEFFER', 'Claudine', 'ClaudKI9A', False),
('AZ92', '2001-04-06', 'THEOBALD', 'Pascal', 'PasCal1boss', False),
('AZ99', '2003-09-06', 'CAMARA', 'Souleymane', 'SouleeeeeyCAM999?', False);

-- --------------------------------------------------------

--
-- Structure de la table `delit`
--

CREATE TABLE `delit` (
  `id_delit` int(11) NOT NULL,
  `nature` varchar(40) NOT NULL,
  `tarif` decimal(6,2) NOT NULL DEFAULT '0.00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `delit`
--

INSERT INTO `delit` (`id_delit`, `nature`, `tarif`) VALUES
(1, 'Excès de vitesse', '220.00'),
(2, 'Feu rouge grillé', '270.00'),
(3, "Conduite en état d\'ivresse", '380.00'),
(4, 'Delit de fuite', '400.00'),
(5, "Refus d\'obtempérer", '450.00'),
(6, 'Conduite après le retrait du permis', '500.00'),
(7, "Téléphone au volant ou utilisation d\'app", '10.00'),
(8, 'Défaut du contrôle technique', '100.00'),
(9, 'Surnombre de passagers', '250.00'),
(10, 'refus de priorité', '280.00');

-- --------------------------------------------------------

--
-- Structure de la table `infraction`
--

CREATE TABLE `infraction` (
  `id_inf` int(11) NOT NULL,
  `date_inf` date NOT NULL,
  `num_immat` varchar(8) NOT NULL,
  `num_permis` varchar(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `infraction`
--

INSERT INTO `infraction` (`id_inf`, `date_inf`, `num_immat`, `num_permis`) VALUES
(1,'2021-09-02', 'CA409BG', 'AZ67'),
(2,'2020-05-14', 'AA643BB', ''),
(3,'2021-12-02', 'AA643BB', 'AZ99'),
(4,'2021-08-11', 'AA643BB', 'AZ67'),
(5,'2021-09-04', 'BE456AD', 'AZ69'),
(6,'2021-09-04', 'AA643BB', 'AZ71'),
(7,'2021-09-06', 'BF823NG', 'AZ81'),
(8,'2021-09-08', '5432YZ88', 'AZ90'),
(9,'2021-09-11', 'AB308FG', 'AZ92'),
(10,'2021-09-08', 'AB308FG', ''),
(11,'2020-06-05', 'AA643BB', 'AZ67'),
(12,'2021-03-18', 'AA643BB', ''),
(13,'2020-10-01', 'AA643BB', '');

-- --------------------------------------------------------

--
-- Structure de la table `vehicule`
--

CREATE TABLE `vehicule` (
  `num_immat` varchar(8) NOT NULL,
  `date_immat` date NOT NULL,
  `modele` varchar(20) NOT NULL,
  `marque` varchar(20) NOT NULL,
  `num_permis` varchar(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `vehicule`
--

INSERT INTO `vehicule` (`num_immat`, `date_immat`, `modele`, `marque`, `num_permis`) VALUES
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
  ADD PRIMARY KEY (`num_permis`);

--
-- Index pour la table `delit`
--
ALTER TABLE `delit`
  ADD PRIMARY KEY (`id_delit`);

--
-- Index pour la table `infraction`
--
ALTER TABLE `infraction`
  ADD PRIMARY KEY (`id_inf`),
  ADD FOREIGN KEY (`num_permis`) REFERENCES conducteur(`num_permis`),
  ADD FOREIGN KEY (`num_immat`) REFERENCES vehicule(`num_immat`);

--
-- Index pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`num_immat`),
  ADD FOREIGN KEY (`num_permis`) REFERENCES conducteur(`num_permis`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `delit`
--
ALTER TABLE `delit`
  MODIFY `id_delit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `infraction`
--
ALTER TABLE `infraction`
  MODIFY `id_inf` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2020 at 01:51 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chain-reaction`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `follow_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`follow_id`, `sender_id`, `receiver_id`) VALUES
(1, 1, 2),
(2, 4, 2),
(3, 4, 1),
(4, 4, 1),
(5, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `id` int(11) NOT NULL DEFAULT 0,
  `username` varchar(50) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`id`, `username`, `score`) VALUES
(1, 'Ketaki', 2),
(2, 'newuser', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `score`) VALUES
(1, 'Ketaki', '$2y$10$qR8abHUmPWJFm036wsN9X.vCIQoA7YaAaTeBeXPqglRWSonbNgLeO', '2020-10-31 17:11:38', 0),
(2, 'newuser', '$2y$10$0CLwR82PbrLzC5D.xX1Q9ec6i42NZxnm/JiqYuRXTJyqHU4h4Zqrq', '2020-10-31 17:32:04', 0),
(3, 'Shivani', '$2y$10$t2Hq2mTmKpkcuvdh9VTTKO2ptomtgeMWkLN2FiILKqGBi3LklyoE6', '2020-11-11 22:33:29', 0),
(4, 'Mounil', '$2y$10$JQQz3XkItfb9jnCnjCI99..6QRoEL5rnKxr1Z/ZxvxIrEIk9UinRa', '2020-11-11 22:37:33', 0),
(5, 'ket', '$2y$10$uD.1O0VDUYmZPtP9wghlve1zbqRT3OuRQxBH.7OuEcMgY03XPurnu', '2020-11-13 14:02:42', 0),
(6, 'xyz', '$2y$10$Tnw9jgzmH.7IrAK0IVlPoez070raAySCjeb4JdZ49MtcxZu7r9amW', '2020-11-14 20:55:37', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`follow_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2020 at 07:56 AM
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
-- Table structure for table `feed`
--

CREATE TABLE `feed` (
  `id` int(11) NOT NULL,
  `user_id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `opponent` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feed`
--

INSERT INTO `feed` (`id`, `user_id`, `username`, `image`, `opponent`, `status`) VALUES
(1, 1, 'new user', 'two.jpg', 'shivani', 'won'),
(2, 2, 'Ketaki', 'three.jpg', 'mounil', 'lost');

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
(4, 6, 1),
(5, 6, 2),
(8, 7, 2),
(10, 6, 1),
(11, 6, 1),
(12, 6, 1),
(13, 6, 1),
(14, 6, 1),
(15, 6, 1),
(16, 6, 2),
(17, 6, 2),
(18, 6, 2),
(19, 6, 2),
(20, 6, 2),
(21, 6, 2),
(22, 6, 2),
(23, 6, 2),
(24, 6, 2),
(25, 6, 2),
(26, 6, 2),
(27, 6, 2),
(28, 6, 2),
(29, 6, 2),
(30, 6, 2),
(31, 6, 2),
(32, 6, 2);

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
  `score` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `score`, `image`) VALUES
(1, 'Ketaki', '$2y$10$qR8abHUmPWJFm036wsN9X.vCIQoA7YaAaTeBeXPqglRWSonbNgLeO', '2020-10-31 17:11:38', 0, ''),
(2, 'newuser', '$2y$10$0CLwR82PbrLzC5D.xX1Q9ec6i42NZxnm/JiqYuRXTJyqHU4h4Zqrq', '2020-10-31 17:32:04', 0, ''),
(3, 'Shivani', '$2y$10$t2Hq2mTmKpkcuvdh9VTTKO2ptomtgeMWkLN2FiILKqGBi3LklyoE6', '2020-11-11 22:33:29', 0, ''),
(4, 'Mounil', '$2y$10$JQQz3XkItfb9jnCnjCI99..6QRoEL5rnKxr1Z/ZxvxIrEIk9UinRa', '2020-11-11 22:37:33', 0, ''),
(5, 'ket', '$2y$10$uD.1O0VDUYmZPtP9wghlve1zbqRT3OuRQxBH.7OuEcMgY03XPurnu', '2020-11-13 14:02:42', 0, ''),
(6, 'xyz', '$2y$10$Tnw9jgzmH.7IrAK0IVlPoez070raAySCjeb4JdZ49MtcxZu7r9amW', '2020-11-14 20:55:37', 0, 'two.jpg'),
(7, 'dummy', '$2y$10$lwMkDy3GE9xKzy3HdXbyGeFC4HOytPhUqftCAvTyPUI2zh4.JTud2', '2020-11-17 18:50:40', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

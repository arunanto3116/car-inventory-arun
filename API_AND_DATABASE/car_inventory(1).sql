-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2019 at 02:27 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_car_manufacturer`
--

CREATE TABLE `tbl_car_manufacturer` (
  `manufacturer_id` bigint(20) NOT NULL,
  `manufacturer` varchar(30) NOT NULL,
  `added_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_car_manufacturer`
--

INSERT INTO `tbl_car_manufacturer` (`manufacturer_id`, `manufacturer`, `added_date`) VALUES
(1, 'Ford', '2019-01-19 00:38:28'),
(2, 'Toyota', '2019-01-19 01:54:58'),
(3, 'Hyundai', '2019-01-19 04:57:07'),
(4, 'Mahindra', '2019-01-19 04:59:27'),
(5, 'Honda', '2019-01-19 05:00:26'),
(6, 'Tata', '2019-01-19 08:36:44'),
(7, 'Maruti', '2019-01-20 10:08:50'),
(8, 'Audi', '2019-01-20 10:12:10'),
(9, 'Subaru', '2019-01-20 10:15:28'),
(10, 'Lexus', '2019-01-20 10:20:44'),
(11, 'Datsun', '2019-01-20 11:00:57'),
(16, 'Isuzu', '2019-01-20 11:20:28'),
(17, 'Lexa', '2019-01-20 12:11:27'),
(18, 'Nexa', '2019-01-20 12:21:00'),
(19, 'Suzuki', '2019-01-20 12:21:33');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_car_model`
--

CREATE TABLE `tbl_car_model` (
  `model_id` bigint(20) NOT NULL,
  `manufacturer_id` bigint(20) NOT NULL,
  `model` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `manufacturing_year` year(4) NOT NULL,
  `registration_number` varchar(20) NOT NULL,
  `note` varchar(100) NOT NULL,
  `file_name_1` varchar(20) NOT NULL,
  `file_name_2` varchar(20) NOT NULL,
  `sold` tinyint(4) NOT NULL DEFAULT '0',
  `added_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_car_model`
--

INSERT INTO `tbl_car_model` (`model_id`, `manufacturer_id`, `model`, `color`, `manufacturing_year`, `registration_number`, `note`, `file_name_1`, `file_name_2`, `sold`, `added_date`) VALUES
(1, 1, 'Mustang', 'Red', 2010, ' KA 01 AF 8192', 'Sample note', '', '', 1, '2019-01-19 00:39:13'),
(3, 2, 'Fortuner', 'White', 2018, 'VIN 12 33', '', '', '', 1, '2019-01-19 09:54:59'),
(4, 3, 'i10', 'Black', 2018, 'adsad323', '', '', '', 1, '2019-01-19 15:13:43'),
(5, 3, 'i20', 'Cherry Red', 2018, 'adsad323', '', '', '', 1, '2019-01-19 15:18:24'),
(6, 4, 'Scorpio', 'Black', 2018, 'adsad323', '', '', '', 1, '2019-01-19 15:18:52'),
(7, 3, 'i20', 'Blue', 1992, 'VIN BN 1234', '', '', '', 1, '2019-01-19 22:04:20'),
(8, 1, 'GT', 'Red', 2019, 'KL SD 123', '', '', '', 1, '2019-01-20 14:56:15'),
(9, 1, 'GT', 'Red', 2019, 'KA 01 AF 8192', '', '', '', 1, '2019-01-20 15:12:18'),
(10, 11, 'Gokart', 'white', 1992, 'KA 01 AF 323', '', '', '', 1, '2019-01-20 15:27:30'),
(11, 6, 'Nexon', 'green', 1992, 'KA 01 AF 32322', '', '', '', 1, '2019-01-20 15:34:35'),
(12, 1, 'GT', 'white', 1992, 'KA 01 AF 3234', '', '', '', 1, '2019-01-20 15:48:04'),
(13, 3, 'i20', 'green', 1992, 'KA 01 AF 323224', '', '', '', 1, '2019-01-20 15:50:16'),
(14, 3, 'i20', 'green', 1992, 'KA 01 AF 3231', '', '', '', 1, '2019-01-20 15:51:07'),
(15, 3, 'i20', 'white', 1992, 'KA 01 AF 3232211', '', '', '', 1, '2019-01-20 15:52:54'),
(16, 3, 'i20', 'white', 1992, 'KA 01 AF 3230', '', '', '', 1, '2019-01-20 15:54:08'),
(17, 1, 'GT', 'white', 1992, 'KA 01 AF 323722', '', '', '', 1, '2019-01-20 15:56:37'),
(18, 3, 'i20', 'red', 1992, 'KA 01 AF 323032', '', '', '', 1, '2019-01-20 15:56:57'),
(19, 3, 'i20', 'green', 1992, 'KA 01 AF 3232288', '', '', '', 1, '2019-01-20 18:42:11'),
(20, 3, 'i20', 'green', 1992, 'KA 01 AF 32322009', '', '5c44c82713467.png', '', 1, '2019-01-21 00:42:38'),
(21, 3, 'i20', 'red', 1992, 'VN 3434', '', '5c44d828746c3.png', '', 1, '2019-01-21 01:50:56'),
(22, 3, 'i20', 'red', 1992, 'VN 34349', '', '5c44dba8532c4.png', '', 1, '2019-01-21 02:05:52'),
(23, 3, 'i20', 'red', 1992, 'VN 343443', '', '5c44dd6da0ac8.jpeg', '5c44dd6dbc81e.jpeg', 1, '2019-01-21 02:13:25'),
(24, 3, 'i20', 'red', 1992, 'VN 343454', '', '5c44e125bee4f.png', '', 1, '2019-01-21 02:29:17'),
(25, 1, 'GT', 'red', 1992, 'VN 343488', '', '5c44e1f7bec6e.png', '5c44e1f7d6f2c.jpeg', 1, '2019-01-21 02:32:47'),
(26, 2, 'i20', 'red', 1992, 'VN 3434911', '', '', '', 1, '2019-01-21 02:50:10'),
(27, 2, 'i20', 'red', 1992, 'VN 343491100', '', '5c44e6b5b2b3c.jpeg', '5c44e6b602314.png', 1, '2019-01-21 02:53:01'),
(28, 3, 'i20', 'red', 2012, 'VN 3434988', '', '5c44ebb93538b.png', '5c44ebb94ab50.png', 0, '2019-01-21 03:14:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_car_manufacturer`
--
ALTER TABLE `tbl_car_manufacturer`
  ADD PRIMARY KEY (`manufacturer_id`);

--
-- Indexes for table `tbl_car_model`
--
ALTER TABLE `tbl_car_model`
  ADD PRIMARY KEY (`model_id`),
  ADD KEY `manufacturer_id` (`manufacturer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_car_manufacturer`
--
ALTER TABLE `tbl_car_manufacturer`
  MODIFY `manufacturer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `tbl_car_model`
--
ALTER TABLE `tbl_car_model`
  MODIFY `model_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_car_model`
--
ALTER TABLE `tbl_car_model`
  ADD CONSTRAINT `tbl_car_model_ibfk_1` FOREIGN KEY (`manufacturer_id`) REFERENCES `tbl_car_manufacturer` (`manufacturer_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

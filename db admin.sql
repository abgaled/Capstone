-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2018 at 09:48 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_capstone1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_targetbeneficiary`
--

CREATE TABLE `tbl_targetbeneficiary` (
  `int_beneficiaryID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(50) NOT NULL,
  `text_beneficiaryDescription` text NOT NULL,
  `enum_targetState` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_targetbeneficiary`
--

INSERT INTO `tbl_targetbeneficiary` (`int_beneficiaryID`, `varchar_beneficiaryName`, `text_beneficiaryDescription`, `enum_targetState`) VALUES
(1, 'Senior Citizen', 'A person over the age of 65.', 'Active'),
(2, '18 years old and above', 'A person of legal age.', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_targetbeneficiary`
--
ALTER TABLE `tbl_targetbeneficiary`
  ADD PRIMARY KEY (`int_beneficiaryID`),
  ADD UNIQUE KEY `varchar_beneficiaryName` (`varchar_beneficiaryName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_targetbeneficiary`
--
ALTER TABLE `tbl_targetbeneficiary`
  MODIFY `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

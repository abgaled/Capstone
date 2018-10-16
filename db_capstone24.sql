-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2018 at 12:58 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_capstone24`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_annualbudget`
--

CREATE TABLE `tbl_annualbudget` (
  `int_budgetID` int(11) NOT NULL,
  `int_cityID` int(11) NOT NULL,
  `date_budgetYear` year(4) NOT NULL,
  `decimal_annualBudget` decimal(20,2) NOT NULL,
  `decimal_annualRemaining` decimal(20,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_annualbudget`
--

INSERT INTO `tbl_annualbudget` (`int_budgetID`, `int_cityID`, `date_budgetYear`, `decimal_annualBudget`, `decimal_annualRemaining`) VALUES
(1, 1, 2018, '15000000.00', '13770000.00'),
(2, 1, 2017, '13500000.00', '12270000.00'),
(3, 1, 2019, '4300000.00', '4300000.00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicantbenefit`
--

CREATE TABLE `tbl_applicantbenefit` (
  `int_appbeneID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_benefitName` text NOT NULL,
  `int_benefitQuantity` int(11) NOT NULL,
  `char_itemUnit` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_applicantbenefit`
--

INSERT INTO `tbl_applicantbenefit` (`int_appbeneID`, `int_projectID`, `text_benefitName`, `int_benefitQuantity`, `char_itemUnit`) VALUES
(1, 11, 'Milk', 1, 'box'),
(2, 12, 'GAMOT', 5, 'pc'),
(3, 12, 'gatas', 1, 'undefined'),
(4, 13, 'Paracetamol', 20, 'pc'),
(5, 13, 'Lagundi Capsule', 8, 'undefined'),
(6, 13, 'Biogesic', 15, 'undefined'),
(7, 15, 'Medical Kit', 2, 'pc'),
(8, 15, 'Medicines', 20, 'undefined'),
(9, 18, 'Product #1', 3, 'pc'),
(10, 22, 'Food no2', 12, 'undefined'),
(11, 22, 'Food no1', 10, 'pc');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_application`
--

CREATE TABLE `tbl_application` (
  `int_applicationID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `enum_applicationType` enum('Resident','Barangay','Household') NOT NULL,
  `enum_applicationStatus` enum('Pending','Approved','Rejected','Received','In Progress') NOT NULL DEFAULT 'Pending',
  `datetime_receivedDate` datetime DEFAULT NULL,
  `datetime_submittedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_application`
--

INSERT INTO `tbl_application` (`int_applicationID`, `int_barangayID`, `int_projectID`, `enum_applicationType`, `enum_applicationStatus`, `datetime_receivedDate`, `datetime_submittedDate`) VALUES
(9, 5, 6, 'Household', 'Approved', NULL, '0000-00-00 00:00:00'),
(10, 5, 6, 'Household', 'Pending', NULL, '0000-00-00 00:00:00'),
(11, 5, 6, 'Household', 'Approved', NULL, '2018-10-05 13:56:42'),
(17, 5, 5, 'Barangay', 'Approved', NULL, '2018-10-05 16:01:34'),
(18, 4, 7, 'Barangay', 'Approved', NULL, '2018-10-05 19:02:21'),
(19, 2, 5, 'Barangay', 'Approved', NULL, '2018-10-05 21:47:07'),
(20, 5, 7, 'Barangay', 'Approved', NULL, '2018-10-06 03:04:41'),
(21, 5, 3, 'Barangay', 'Approved', NULL, '2018-10-06 03:27:44'),
(22, 2, 3, 'Barangay', 'Approved', NULL, '2018-10-06 03:29:35'),
(23, 9, 11, 'Resident', 'Received', '2018-10-06 14:30:57', '2018-10-06 14:15:07'),
(24, 5, 11, 'Resident', 'Rejected', NULL, '2018-10-06 14:18:03'),
(25, 5, 12, 'Resident', 'Received', '2018-10-06 15:46:15', '2018-10-06 16:00:39'),
(206, 4, 13, 'Resident', 'Pending', NULL, '2018-10-12 12:38:55'),
(207, 4, 13, 'Resident', 'Pending', NULL, '2018-10-12 12:40:55'),
(208, 4, 13, 'Resident', 'Pending', NULL, '2018-10-12 12:44:41'),
(209, 4, 13, 'Resident', 'Pending', NULL, '2018-10-12 12:48:44'),
(210, 4, 13, 'Resident', 'Pending', NULL, '2018-10-12 12:52:20'),
(211, 4, 14, 'Resident', 'Pending', NULL, '2018-10-12 23:19:46'),
(212, 10, 15, 'Resident', 'Received', '2018-10-13 01:55:18', '2018-10-13 02:34:02'),
(213, 4, 18, 'Resident', 'Received', '2018-10-13 08:30:31', '2018-10-13 09:01:38'),
(214, 4, 18, 'Resident', 'Received', '2018-10-13 08:30:31', '2018-10-13 09:02:50'),
(215, 4, 18, 'Resident', 'Received', '2018-10-13 08:30:31', '2018-10-13 09:04:11'),
(216, 4, 21, 'Barangay', 'Approved', NULL, '2018-10-13 10:29:25'),
(217, 4, 20, 'Household', 'Received', '2018-10-13 10:20:41', '2018-10-13 10:40:27'),
(218, 2, 22, 'Barangay', 'Pending', NULL, '2018-10-16 17:32:59'),
(219, 2, 22, 'Household', 'Pending', NULL, '2018-10-16 17:47:29'),
(220, 2, 22, 'Household', 'Pending', NULL, '2018-10-16 18:16:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationrequirement`
--

CREATE TABLE `tbl_applicationrequirement` (
  `int_appreqID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `varchar_fileLocation` varchar(100) DEFAULT NULL,
  `enum_appreqStatus` enum('Passed','Incomplete') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_applicationrequirement`
--

INSERT INTO `tbl_applicationrequirement` (`int_appreqID`, `int_applicationID`, `int_requirementID`, `varchar_fileLocation`, `enum_appreqStatus`) VALUES
(732, 208, 1, 'Cabinet 1 row 1', 'Passed'),
(733, 208, 14, 'Cabinet 1 row 2', 'Passed'),
(734, 208, 4, 'Cabinet 1 row 3', 'Passed'),
(735, 209, 1, 'Cabinet 1 row A', 'Passed'),
(736, 209, 14, '', 'Incomplete'),
(737, 209, 4, 'Cabinet 1 row B', 'Passed'),
(738, 210, 1, 'Cab1 row 3', 'Passed'),
(739, 210, 14, 'Cab1 row 1', 'Passed'),
(740, 210, 4, 'Cab1 row2', 'Passed'),
(741, 211, 1, 'Cabinet 1 row 1', 'Passed'),
(742, 211, 2, '', 'Incomplete'),
(743, 211, 3, 'Cabinet 1 row 2', 'Passed'),
(744, 211, 4, '', 'Incomplete'),
(745, 211, 8, 'Cabinet 1 row 3', 'Passed'),
(746, 212, 12, 'Cabinet 1 Row E', 'Passed'),
(747, 212, 14, 'Cabinet 1 Row D', 'Passed'),
(748, 213, 1, 'Cabinet 1 Row A', 'Passed'),
(749, 213, 14, 'Cabinet 1 Row A', 'Passed'),
(750, 214, 1, 'Cabinet 1 Row 1', 'Passed'),
(751, 214, 14, 'Cabinet 1 Row 2', 'Passed'),
(752, 215, 1, 'Cabinet 1 Row 1', 'Passed'),
(753, 215, 14, 'Cabinet 1 Row 1', 'Passed'),
(754, 220, 1, 'Boyz1r1', 'Passed'),
(755, 220, 14, 'Boyz1r2', 'Passed');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangay`
--

CREATE TABLE `tbl_barangay` (
  `int_barangayID` int(11) NOT NULL,
  `int_cityID` int(11) NOT NULL,
  `varchar_barangayName` varchar(100) NOT NULL,
  `varchar_barangayContact` varchar(100) NOT NULL,
  `text_barangayAddress` text NOT NULL,
  `enum_barangayStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangay`
--

INSERT INTO `tbl_barangay` (`int_barangayID`, `int_cityID`, `varchar_barangayName`, `varchar_barangayContact`, `text_barangayAddress`, `enum_barangayStatus`) VALUES
(1, 1, 'Addition Hills', '226-6666', 'Blk. 12 Welfareville Compound', 'Active'),
(2, 1, 'Bagong Silang', '514-8312/9953354', 'cor. J. Luna Street', 'Active'),
(3, 1, 'Barangka Drive', '531-6544', '775 Barangka Drive cor. Sgt. Bumatay', 'Active'),
(4, 1, 'Hulo', '534-5056/535-2505', 'Coronado Street', 'Active'),
(5, 1, 'Malamig', '533-1319', '555 Cresta Circle Makiling Street', 'Active'),
(6, 1, 'Plainview', '534-1874', '40 Malaya Street', 'Active'),
(7, 1, 'Buli', '092-7198', '768 Manda', 'Active'),
(8, 1, 'Cupang', '522-6896', '62 Manda', 'Active'),
(9, 1, 'Ilaya', '2534521', '253 Ilaya', 'Active'),
(10, 1, 'Malayo', '5221234', '232 Mandaluyong', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangayapplication`
--

CREATE TABLE `tbl_barangayapplication` (
  `int_applicationID` int(11) NOT NULL,
  `int_slot` int(11) NOT NULL,
  `text_applicationReason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangayapplication`
--

INSERT INTO `tbl_barangayapplication` (`int_applicationID`, `int_slot`, `text_applicationReason`) VALUES
(17, 1900, 'gutoman'),
(18, 100, 'sjnxjskxn lets go'),
(19, 200, 'Taga bagong silang kami'),
(20, 900, 'We need it'),
(21, 500, 'Kailangan ng mga taga malamig'),
(22, 500, 'Kase kamiy taga bagong silang'),
(216, 1500, 'We deserve better');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangaybeneficiary`
--

CREATE TABLE `tbl_barangaybeneficiary` (
  `int_brgybeneID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_FName` varchar(100) NOT NULL,
  `varchar_MName` varchar(100) DEFAULT NULL,
  `varchar_LName` varchar(100) NOT NULL,
  `text_signaturePath` text NOT NULL,
  `datetime_received` datetime DEFAULT NULL,
  `text_remarks` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangaybeneficiary`
--

INSERT INTO `tbl_barangaybeneficiary` (`int_brgybeneID`, `int_applicationID`, `varchar_FName`, `varchar_MName`, `varchar_LName`, `text_signaturePath`, `datetime_received`, `text_remarks`) VALUES
(1, 21, 'maricar', 'Dionisio', 'Oriel', '', '2018-10-06 16:32:27', 'Received'),
(2, 21, 'John Carlo', 'Dionisio', 'Oriel', '', '2018-10-06 16:32:27', 'sdlaknfkjasd'),
(3, 216, 'Abigale', 'Punzalan', 'Del Rosario', '', '2018-10-13 10:20:41', 'None');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangayreleasing`
--

CREATE TABLE `tbl_barangayreleasing` (
  `int_brgyreleaseID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `date_startRelease` date DEFAULT NULL,
  `date_endRelease` date DEFAULT NULL,
  `enum_barangayReleaseStatus` enum('Releasing','Closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangayreleasing`
--

INSERT INTO `tbl_barangayreleasing` (`int_brgyreleaseID`, `int_projectID`, `int_barangayID`, `date_startRelease`, `date_endRelease`, `enum_barangayReleaseStatus`) VALUES
(1, 5, 5, NULL, '2018-10-06', 'Closed'),
(2, 5, 2, NULL, '2018-10-06', 'Closed'),
(3, 3, 5, NULL, NULL, 'Releasing'),
(4, 3, 2, NULL, NULL, 'Releasing'),
(5, 11, 9, NULL, '2018-10-06', 'Closed'),
(6, 11, 5, NULL, '2018-10-06', 'Closed'),
(7, 12, 5, NULL, '2018-10-06', 'Closed'),
(8, 15, 10, NULL, '2018-10-13', 'Closed'),
(9, 18, 4, NULL, '2018-10-13', 'Closed'),
(10, 21, 4, NULL, NULL, 'Releasing'),
(11, 20, 4, NULL, NULL, 'Releasing');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_beneficiary`
--

CREATE TABLE `tbl_beneficiary` (
  `int_beneficiaryID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(100) NOT NULL,
  `enum_beneficiaryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_beneficiary`
--

INSERT INTO `tbl_beneficiary` (`int_beneficiaryID`, `varchar_beneficiaryName`, `enum_beneficiaryStatus`) VALUES
(1, 'Senior Citizen', 'Active'),
(2, 'Person with Disability (PWD)', 'Active'),
(3, 'College Student', 'Active'),
(4, 'Women and girls', 'Active'),
(5, 'Men', 'Active'),
(6, 'Elementary Students', 'Active'),
(7, 'Mother', 'Active'),
(8, 'Pregnant Women', 'Active'),
(9, 'Households', 'Active'),
(10, 'Retired worker', 'Active'),
(11, 'Youths', 'Active'),
(12, 'Disaster Victims', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `int_categoryID` int(11) NOT NULL,
  `varchar_categoryName` varchar(100) NOT NULL,
  `enum_categoryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`int_categoryID`, `varchar_categoryName`, `enum_categoryStatus`) VALUES
(1, 'Health', 'Active'),
(2, 'Monetary', 'Active'),
(3, 'Disaster Management', 'Active'),
(4, 'Education', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categorybudget`
--

CREATE TABLE `tbl_categorybudget` (
  `int_categbudID` int(11) NOT NULL,
  `int_budgetID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL,
  `decimal_categBudget` decimal(20,2) NOT NULL,
  `decimal_categRemaining` decimal(20,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_categorybudget`
--

INSERT INTO `tbl_categorybudget` (`int_categbudID`, `int_budgetID`, `int_categoryID`, `decimal_categBudget`, `decimal_categRemaining`) VALUES
(1, 3, 1, '500000.00', '500000.00'),
(2, 3, 2, '300000.00', '300000.00'),
(3, 3, 3, '1500000.00', '1500000.00'),
(4, 3, 4, '2000000.00', '2000000.00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_city`
--

CREATE TABLE `tbl_city` (
  `int_cityID` int(11) NOT NULL,
  `varchar_officeName` varchar(100) NOT NULL,
  `varchar_cityName` varchar(100) NOT NULL,
  `text_cityAddress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`int_cityID`, `varchar_officeName`, `varchar_cityName`, `text_cityAddress`) VALUES
(1, '	\r\nOffice of the Congresswomen Alexandria Gonzales', 'Mandaluyong City', '315 Maysilo Cir, Mandaluyong, 1550 Metro Manila');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_expense`
--

CREATE TABLE `tbl_expense` (
  `int_expenseID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_expenseDescription` text NOT NULL,
  `int_estimatedQuantity` int(11) DEFAULT NULL,
  `decimal_unitPrice` decimal(10,2) NOT NULL,
  `decimal_estimatedAmount` decimal(20,2) DEFAULT NULL,
  `decimal_actualAmount` decimal(20,2) DEFAULT NULL,
  `int_actualQuantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_expense`
--

INSERT INTO `tbl_expense` (`int_expenseID`, `int_projectID`, `text_expenseDescription`, `int_estimatedQuantity`, `decimal_unitPrice`, `decimal_estimatedAmount`, `decimal_actualAmount`, `int_actualQuantity`) VALUES
(1, 9, 'Benefit Expense', 100, '259.00', '25900.00', NULL, NULL),
(2, 9, 'Banner', 10, '1000.00', '10000.00', NULL, NULL),
(3, 10, 'Flyers', 500, '1.50', '750.00', NULL, NULL),
(4, 10, 'Benefit Expense', 500, '3300.00', '1650000.00', NULL, NULL),
(5, 10, 'Tarpaulin', 50, '1500.00', '75000.00', NULL, NULL),
(6, 11, 'Benefit Expense', 150, '165.00', '24750.00', '24750.00', 150),
(7, 11, 'Tarpaulin', 2, '1500.00', '3000.00', '4500.00', 3),
(8, 11, 'Flyers', NULL, '2.00', NULL, '1000.00', 500),
(9, 11, 'Food Expense', NULL, '150.00', NULL, '15000.00', 100),
(10, 11, 'Other Expense', NULL, '40.00', NULL, '2400.00', 60),
(11, 12, 'Benefit Expense', 123, '86.00', '10578.00', '10578.00', 123),
(12, 12, 'Foods', 100, '50.00', '5000.00', '6150.00', 123),
(13, 12, 'Flyers', NULL, '123.00', NULL, '15129.00', 123),
(14, 12, 'jdfsiaj', NULL, '123.00', NULL, '15129.00', 123),
(15, 12, 'akfskd', NULL, '123.00', NULL, '15129.00', 123),
(16, 13, 'Benefit Expense', 250, '355.00', '88750.00', NULL, NULL),
(17, 13, 'Tarpaulin', 50, '1200.00', '60000.00', NULL, NULL),
(18, 13, 'Flyers', 500, '3.00', '1500.00', NULL, NULL),
(19, 14, 'Benefit Expense', 150, '1800.00', '270000.00', NULL, NULL),
(20, 14, 'tarpaulin', 20, '1200.00', '24000.00', NULL, NULL),
(21, 15, 'Tarpaulin', 20, '1200.00', '24000.00', NULL, NULL),
(22, 15, 'Benefit Expense', 500, '730.00', '365000.00', NULL, NULL),
(23, 18, 'Benefit Expense', 350, '350.00', '122500.00', '1050.00', 3),
(24, 18, 'Tarpaulin', 25, '1200.00', '30000.00', '33600.00', 28),
(25, 18, 'Food Expense', NULL, '120.00', NULL, '6000.00', 50),
(26, 20, 'Benefit Expense', 250, '1050.00', '262500.00', NULL, NULL),
(27, 20, 'Tarpaulin', 12, '1200.00', '14400.00', NULL, NULL),
(28, 21, 'Benefit Expense', 1500, '150.00', '0.00', NULL, NULL),
(29, 22, 'Benefit Expense', 120, '354.00', '42480.00', NULL, NULL),
(30, 22, 'tarpaulin', 3, '1200.00', '3600.00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_familybackground`
--

CREATE TABLE `tbl_familybackground` (
  `int_familybgID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_memberFName` varchar(100) NOT NULL,
  `varchar_memberMName` varchar(100) DEFAULT NULL,
  `varchar_memberLName` varchar(100) NOT NULL,
  `enum_civilStatus` enum('Single','Married','Widowed','Divorced/Separated') NOT NULL,
  `text_educationalAttainment` text NOT NULL,
  `varchar_occupation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_familybackground`
--

INSERT INTO `tbl_familybackground` (`int_familybgID`, `int_applicationID`, `varchar_memberFName`, `varchar_memberMName`, `varchar_memberLName`, `enum_civilStatus`, `text_educationalAttainment`, `varchar_occupation`) VALUES
(8, 9, 'Kenj', 'Del', 'Manabat', 'Single', 'Elementary', 'None'),
(9, 9, 'Dash', 'Del ', 'Manabat', 'Single', 'Highschool', 'None'),
(10, 10, 'Mich', 'Del', 'Ilagan', 'Single', 'College', 'Doctor'),
(11, 10, 'Hans', 'Del', 'Ilagan', 'Single', 'College', 'None'),
(12, 10, 'Vince', '', 'Ilagan', 'Single', 'Highschool', 'None'),
(13, 11, 'Charlie', 'Eyy', 'Timoteo', 'Single', 'Highschool', 'None'),
(14, 11, 'Rhaizen', 'Eyy', 'Timoteo', 'Single', 'Elementary', 'None'),
(15, 217, 'Michy', 'Dela Rosa', 'Ilagan', 'Single', 'College', 'None'),
(16, 217, 'Vince ', 'Dela Rosa', 'Ilagan', 'Single', 'Highschool', 'None'),
(17, 220, 'Hwall', 'Eyy', 'Boyz', 'Single', 'HIghschool', 'None'),
(18, 220, 'Q', 'Eyy', 'Boyz', 'Single', 'College', 'Dancer');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_financialcontribution`
--

CREATE TABLE `tbl_financialcontribution` (
  `int_financialconID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `text_finconPurpose` text NOT NULL,
  `varchar_relationship` varchar(100) NOT NULL,
  `enum_frequency` enum('Monthly','Quarterly','Semi Annual','Annual','Irregular') NOT NULL,
  `decimal_annualContribution` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_financialcontribution`
--

INSERT INTO `tbl_financialcontribution` (`int_financialconID`, `int_applicationID`, `text_finconPurpose`, `varchar_relationship`, `enum_frequency`, `decimal_annualContribution`) VALUES
(37, 9, 'Household Expense', 'Father', 'Monthly', '300000.00'),
(38, 9, 'Educational', 'Relative', 'Irregular', '20000.00'),
(39, 10, 'Household Expensee', 'Father', 'Monthly', '400000.00'),
(40, 10, 'Ibang Expense', 'Mother', 'Monthly', '100000.00'),
(41, 11, 'Household Expense', 'Mother', 'Monthly', '120000.00'),
(42, 11, 'Ibang Expensee', 'Father', 'Monthly', '140000.00'),
(43, 217, 'Household expense', 'Father', 'Monthly', '120000.00'),
(44, 220, 'Household expense', 'Father', 'Monthly', '150000.00'),
(45, 220, 'educ', 'Mother', 'Irregular', '60000.00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_householdapplication`
--

CREATE TABLE `tbl_householdapplication` (
  `int_applicationID` int(11) NOT NULL,
  `varchar_familyName` varchar(100) NOT NULL,
  `text_homeAddress` text NOT NULL,
  `decimal_totalAnnualIncome` decimal(10,2) NOT NULL,
  `enum_houseStatus` enum('Owned','Rent','Rent to own','Squatter area') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_householdapplication`
--

INSERT INTO `tbl_householdapplication` (`int_applicationID`, `varchar_familyName`, `text_homeAddress`, `decimal_totalAnnualIncome`, `enum_houseStatus`) VALUES
(9, 'Manabat', '135 Malamig', '0.00', 'Owned'),
(10, 'Ilagan', '688 Malamigg', '0.00', 'Owned'),
(11, 'Timoteo', '121 Malamigg', '0.00', 'Rent'),
(217, 'Ilagan', '233 Hulo', '120000.00', 'Owned'),
(219, 'Seventeen', '233 Bagong Silang', '99999999.99', 'Owned'),
(220, 'Boyz', '255 Bagong Silang', '99999999.99', 'Owned');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_intentstatement`
--

CREATE TABLE `tbl_intentstatement` (
  `int_statementID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_categoryID` int(11) DEFAULT NULL,
  `int_projectID` int(11) DEFAULT NULL,
  `varchar_statementTitle` varchar(100) NOT NULL,
  `text_statementContent` text NOT NULL,
  `date_createdDate` date NOT NULL,
  `varchar_residentName` varchar(100) NOT NULL,
  `text_residentAddress` text NOT NULL,
  `enum_problemStatus` enum('Submitted','Acknowledged','Solved','Rejected') NOT NULL DEFAULT 'Submitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_intentstatement`
--

INSERT INTO `tbl_intentstatement` (`int_statementID`, `int_barangayID`, `int_categoryID`, `int_projectID`, `varchar_statementTitle`, `text_statementContent`, `date_createdDate`, `varchar_residentName`, `text_residentAddress`, `enum_problemStatus`) VALUES
(1, 3, 1, 9, 'Full body check up and medicine kit giving', 'Due to recent outbreak of fever', '2018-09-01', 'Francheska Jordan', 'JP Rizal St., Brgy. Barangka Drive, Mandaluyong City', 'Solved'),
(4, 4, 3, 6, 'Distribution of goods', 'Due to recent fire incident, supplies are given but it is insufficient.', '2018-09-01', 'Fatima Candeza', 'Mangahan St., Sta Ana Drive, Brgy. Addition Hills, Mandaluyong City', 'Rejected'),
(16, 5, 1, NULL, 'From malamig', 'sjdnjskxnskxnksxsxnks', '2018-10-06', 'Abby', '56 jsnckjscscnskc', 'Rejected'),
(17, 2, 3, 14, 'From Bagong Silang', 'sjnsknxksxnksxksxnsk', '2018-10-06', 'Abs', '782 ksklsmcks', 'Solved'),
(18, 9, 1, 10, 'Eyeglasses Giving', 'Kase karamihan sa barangay namin ay senior citizen.', '2018-10-06', 'Kristine Mae Gamayo', '256 Ilaya', 'Solved'),
(19, 9, 2, 11, 'Free Grocery', 'Libreng grocery para sa bayan', '2018-10-06', 'Teresa Inocencio', 'Addition Hills', 'Solved'),
(20, 5, 1, 12, 'Pregnancy Check up and freebies', 'para matulungan ang mga buntis', '2018-10-06', 'jenhel Keeanu Santos', 'eaekhekjfa', 'Solved'),
(21, 2, 3, 13, 'Application No.1 (Resident)', 'For testing of application.', '2018-10-07', 'Abigale Del Rosario', '233 Bagong Silang', 'Solved'),
(22, 2, 1, 22, 'Application No.2 (Household)', 'Testing for application.', '2018-10-07', 'Abs Dela Rosa', '523 Bagong Silang', 'Solved'),
(23, 2, 2, NULL, 'Application No.3 (Barangay)', 'Testing for application.', '2018-10-07', 'Abbygale Dela Cruz', '578 Bagong Silang', 'Acknowledged'),
(24, 10, 1, 15, 'Petition for Medical Kits', 'Distribution of medical kits.', '2018-10-13', 'Vince Manabat', '253 Malayo', 'Solved'),
(25, 4, 1, 18, 'Giving of organic products', 'To give organic products to residents', '2018-10-13', 'Ram Cruz', '232 Hulo', 'Solved'),
(26, 4, 3, 20, 'Food Supplies Giving for Households', 'To help the residents', '2018-10-13', 'Ermie Santa Cruz', '2333 Hulo', 'Solved'),
(27, 4, 1, 21, 'Barangay Check plus freebies', 'To help the residents', '2018-10-13', 'Zyannah Del Pe', '200 Hulo', 'Solved'),
(28, 9, 1, NULL, 'Here\'s to some data', 'Heyheyheyhey', '2018-10-16', 'Galeema', '255 heyheyhey', 'Submitted');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `int_notifID` int(11) NOT NULL,
  `int_notifReceiverID` int(11) NOT NULL,
  `int_notifSenderID` int(11) NOT NULL,
  `int_linkID` int(11) NOT NULL,
  `varchar_notifTitle` varchar(100) NOT NULL,
  `text_notifContent` text NOT NULL,
  `enum_notifStatus` enum('New','Read') NOT NULL DEFAULT 'New',
  `enum_notifInfo` enum('Project Application','Problem Statement','Project Proposal','Project Releasing','Proposal Revision') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_officialsaccount`
--

CREATE TABLE `tbl_officialsaccount` (
  `int_officialsuserID` int(11) NOT NULL,
  `int_officialsID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_officialsaccount`
--

INSERT INTO `tbl_officialsaccount` (`int_officialsuserID`, `int_officialsID`, `int_userID`) VALUES
(3, 1, 1),
(4, 2, 3),
(5, 3, 5),
(6, 7, 9),
(7, 4, 6),
(8, 5, 7),
(9, 8, 10),
(10, 6, 11),
(11, 9, 12),
(12, 5, 14),
(13, 10, 15),
(14, 2, 16);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_personalinformation`
--

CREATE TABLE `tbl_personalinformation` (
  `int_applicationID` int(11) NOT NULL,
  `varchar_firstName` varchar(100) NOT NULL,
  `varchar_middleName` varchar(100) DEFAULT NULL,
  `varchar_lastName` varchar(100) NOT NULL,
  `date_birthDate` date NOT NULL,
  `enum_gender` enum('Male','Female') NOT NULL,
  `year_applicantResidency` year(4) NOT NULL,
  `enum_civilStatus` enum('Single','Married','Widow/Widower','Separated') NOT NULL,
  `varchar_contactNumber` varchar(100) NOT NULL,
  `varchar_emailAddress` varchar(100) NOT NULL,
  `text_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_personalinformation`
--

INSERT INTO `tbl_personalinformation` (`int_applicationID`, `varchar_firstName`, `varchar_middleName`, `varchar_lastName`, `date_birthDate`, `enum_gender`, `year_applicantResidency`, `enum_civilStatus`, `varchar_contactNumber`, `varchar_emailAddress`, `text_address`) VALUES
(23, 'Jilmar', 'Gainsan', 'Inocencio', '1998-04-15', 'Male', 1998, 'Single', '(+63) 915-632-6567', 'jilmar@gmail.com', '53 blk 3 mandaluyong city'),
(24, 'Jillvic', 'Gainsan', 'Inocencio', '1995-12-01', 'Female', 1995, 'Single', '(+63) 909-335-6290', 'jillvic@gmail.com', '32 blk 2 mandaluyong city'),
(25, 'Jenhel', '', 'Santos', '1998-10-07', 'Male', 1999, 'Single', '(+63) 916-777-3825', 'jn@gmail.com', 'akjfhkja fa'),
(206, 'Lander', 'jsnjxs', 'Manabat', '2005-06-13', 'Male', 2005, 'Single', '(+63) 545-644-6464', 'lander@gmail.com', '122 Hulo'),
(207, 'Lander', 'jsnjxs', 'Manabat', '2005-06-13', 'Male', 2005, 'Single', '(+63) 545-644-6464', 'lander@gmail.com', '122 Hulo'),
(208, 'Kenji', '', 'Manabat', '2003-06-12', 'Male', 2005, 'Married', '(+63) 879-777-9797', 'kenj@gmail.com', '78 hulo'),
(209, 'Maricar', 'Del Rosario', 'Manabat', '1968-02-14', 'Female', 2010, 'Married', '(+63) 828-328-3232', 'mar@gmail.com', '133 Hulo'),
(210, 'Orlan', 'Del', 'Manabat', '2006-09-18', 'Male', 2006, 'Single', '(+63) 879-797-9789', 'orland@gmail.com', '87 Hulo'),
(211, 'Michelle', 'Del Rosario', 'Ilagan', '2005-06-13', 'Female', 2005, 'Married', '(+63) 545-646-5456', 'michyyy@gmail.com', '13 Hulo'),
(212, 'Angie', 'Mendoza', 'Dela Cruz', '2003-06-18', 'Female', 2005, 'Single', '(+63) 912-333-5231', 'angie@gmail.com', '852 Ginhawa Street Malayo'),
(213, 'Angel', 'Santos', 'Lupa', '2005-02-13', 'Female', 2008, 'Single', '(+63) 912-332-6262', 'angellupa@gmail.com', '133 Hulo '),
(214, 'Hanie', '', 'Butter', '2006-02-15', 'Female', 2008, 'Single', '(+63) 955-511-5152', 'butterhanie@gmail.com', '655 Hulo'),
(215, 'Brylle', 'Galit', 'Lando', '2006-05-13', 'Male', 2008, 'Single', '(+63) 515-151-5151', 'bryllelando@gmail.com', '378 Hulo');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectapplicationtype`
--

CREATE TABLE `tbl_projectapplicationtype` (
  `int_proapptypeID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `enum_applicationType` enum('Household','Resident','Barangay') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectapplicationtype`
--

INSERT INTO `tbl_projectapplicationtype` (`int_proapptypeID`, `int_projectID`, `enum_applicationType`) VALUES
(1, 6, 'Household'),
(3, 7, 'Barangay'),
(4, 5, 'Barangay'),
(5, 3, 'Barangay'),
(6, 9, 'Resident'),
(7, 10, 'Resident'),
(8, 11, 'Resident'),
(9, 12, 'Resident'),
(10, 13, 'Resident'),
(11, 14, 'Resident'),
(12, 15, 'Resident'),
(13, 18, 'Resident'),
(14, 20, 'Household'),
(15, 21, 'Barangay'),
(16, 22, 'Household');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectbeneficiary`
--

CREATE TABLE `tbl_projectbeneficiary` (
  `int_projbeneID` int(11) NOT NULL,
  `int_linkID` int(11) NOT NULL,
  `int_beneficiaryID` int(11) NOT NULL,
  `enum_beneficiaryLink` enum('Intent Statement','Project') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectbeneficiary`
--

INSERT INTO `tbl_projectbeneficiary` (`int_projbeneID`, `int_linkID`, `int_beneficiaryID`, `enum_beneficiaryLink`) VALUES
(1, 1, 1, 'Project'),
(2, 1, 2, 'Project'),
(3, 1, 8, 'Project'),
(4, 2, 1, 'Project'),
(5, 2, 2, 'Project'),
(6, 2, 8, 'Project'),
(7, 3, 6, 'Project'),
(8, 4, 3, 'Project'),
(9, 4, 11, 'Project'),
(10, 5, 11, 'Project'),
(11, 6, 11, 'Project'),
(12, 7, 1, 'Project'),
(13, 7, 2, 'Project'),
(14, 7, 8, 'Project'),
(15, 8, 1, 'Project'),
(16, 8, 2, 'Project'),
(32, 1, 1, 'Intent Statement'),
(33, 1, 2, 'Intent Statement'),
(34, 1, 8, 'Intent Statement'),
(35, 2, 12, 'Intent Statement'),
(36, 3, 3, 'Intent Statement'),
(37, 3, 6, 'Intent Statement'),
(38, 4, 11, 'Intent Statement'),
(39, 4, 12, 'Intent Statement'),
(40, 5, 11, 'Intent Statement'),
(41, 6, 12, 'Intent Statement'),
(42, 7, 1, 'Intent Statement'),
(43, 7, 2, 'Intent Statement'),
(44, 7, 8, 'Intent Statement'),
(45, 8, 8, 'Intent Statement'),
(46, 9, 3, 'Intent Statement'),
(47, 12, 3, 'Intent Statement'),
(48, 12, 4, 'Intent Statement'),
(49, 12, 5, 'Intent Statement'),
(50, 13, 2, 'Intent Statement'),
(51, 14, 1, 'Intent Statement'),
(52, 15, 8, 'Intent Statement'),
(53, 16, 1, 'Intent Statement'),
(54, 17, 3, 'Intent Statement'),
(55, 9, 3, 'Project'),
(56, 9, 5, 'Project'),
(57, 9, 4, 'Project'),
(58, 9, 6, 'Project'),
(59, 18, 1, 'Intent Statement'),
(60, 10, 1, 'Project'),
(61, 19, 1, 'Intent Statement'),
(62, 19, 7, 'Intent Statement'),
(63, 19, 8, 'Intent Statement'),
(64, 11, 1, 'Project'),
(65, 11, 2, 'Project'),
(66, 11, 7, 'Project'),
(67, 20, 8, 'Intent Statement'),
(68, 12, 8, 'Project'),
(69, 21, 11, 'Intent Statement'),
(70, 22, 1, 'Intent Statement'),
(71, 23, 3, 'Intent Statement'),
(72, 13, 1, 'Project'),
(73, 14, 3, 'Project'),
(74, 24, 11, 'Intent Statement'),
(75, 15, 11, 'Project'),
(76, 25, 11, 'Intent Statement'),
(77, 26, 9, 'Intent Statement'),
(78, 27, 11, 'Intent Statement'),
(79, 28, 3, 'Intent Statement');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectcategory`
--

CREATE TABLE `tbl_projectcategory` (
  `int_projcategID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL,
  `decimal_allotedBudget` decimal(20,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectcategory`
--

INSERT INTO `tbl_projectcategory` (`int_projcategID`, `int_projectID`, `int_categoryID`, `decimal_allotedBudget`) VALUES
(3, 3, 4, '0.00'),
(4, 4, 4, '0.00'),
(5, 5, 1, '0.00'),
(6, 6, 1, '0.00'),
(7, 7, 1, '0.00'),
(8, 8, 1, '0.00'),
(9, 9, 1, '0.00'),
(10, 10, 1, '0.00'),
(11, 11, 2, '0.00'),
(12, 12, 1, '0.00'),
(13, 13, 3, '0.00'),
(14, 13, 3, '140000.00'),
(15, 3, 2, '1230000.00'),
(16, 14, 2, '0.00'),
(17, 15, 1, '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectdetail`
--

CREATE TABLE `tbl_projectdetail` (
  `int_projectID` int(11) NOT NULL,
  `int_cityID` int(11) NOT NULL,
  `varchar_projectName` varchar(100) NOT NULL,
  `text_projectRationale` text NOT NULL,
  `text_projectDescription` text NOT NULL,
  `text_projectObjective` text NOT NULL,
  `int_allotedSlot` int(11) NOT NULL,
  `date_targetStartApp` date NOT NULL,
  `date_targetEndApp` date NOT NULL,
  `date_targetStartRelease` date NOT NULL,
  `date_targetEndRelease` date NOT NULL,
  `date_targetClosing` date NOT NULL,
  `date_actualStartApp` date DEFAULT NULL,
  `date_actualEndApp` date DEFAULT NULL,
  `date_actualClosing` date DEFAULT NULL,
  `date_createdDate` date NOT NULL,
  `decimal_estimatedBudget` decimal(20,2) NOT NULL,
  `decimal_appropriatedBudget` decimal(20,2) NOT NULL,
  `decimal_actualBudget` decimal(20,2) DEFAULT NULL,
  `enum_projectStatus` enum('Created','Ongoing','Closed Application','Releasing','Closed Releasing','Finished','Terminated') NOT NULL DEFAULT 'Created'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectdetail`
--

INSERT INTO `tbl_projectdetail` (`int_projectID`, `int_cityID`, `varchar_projectName`, `text_projectRationale`, `text_projectDescription`, `text_projectObjective`, `int_allotedSlot`, `date_targetStartApp`, `date_targetEndApp`, `date_targetStartRelease`, `date_targetEndRelease`, `date_targetClosing`, `date_actualStartApp`, `date_actualEndApp`, `date_actualClosing`, `date_createdDate`, `decimal_estimatedBudget`, `decimal_appropriatedBudget`, `decimal_actualBudget`, `enum_projectStatus`) VALUES
(3, 1, 'Distribution of School Supplies', 'Determined by the last survey it is true that children in our city can\'t barely have a new school supplies', 'School supplies will be given equally and fairly to the beneficiaries of this project.', 'To help the children/youth.', 1000, '2018-11-30', '2019-01-15', '2019-01-24', '2019-01-21', '2019-01-08', NULL, NULL, NULL, '2018-10-17', '1000000.00', '0.00', NULL, 'Releasing'),
(4, 1, 'Seminar about family planning and freebies giving', 'Due to the last survey, it seems that residents are not aware about family planning.', 'Each beneficiary will be given an equal service for this.', 'To help the residents know about family planning.', 1000, '2019-01-09', '2019-03-10', '2019-03-20', '2019-03-25', '2019-04-25', NULL, NULL, NULL, '2018-09-25', '10000000.00', '0.00', NULL, 'Ongoing'),
(5, 1, 'Feeding Program', 'We observed that the children from orphanages are facing a financial crisis.', 'This project intends to help the poor children on orphanages that are currently facing a financial problems and this is one of the solution that we think to solve the problem.', 'The goal of this project is to provide a temporary food supplies to the orphanage in our barnagay', 2100, '2019-04-27', '2019-06-01', '2019-06-10', '2019-06-15', '2019-06-25', NULL, NULL, NULL, '2018-10-01', '15000000.00', '0.00', NULL, 'Closed Releasing'),
(6, 1, 'Food Supplies Giving', 'The orphanage of our barangay are currently facing financial problems', 'This project intends to help the children on orphanage', 'Aims to give temporary supplies for the orphanage', 1000, '2019-02-08', '2019-03-15', '2019-03-30', '2019-04-04', '2019-04-10', NULL, NULL, NULL, '2018-09-09', '1500000.00', '0.00', NULL, 'Releasing'),
(7, 1, 'Medical check up', 'Due to our observation in the our community about health.', 'Check up for the residents', 'To help the residents ', 1000, '2019-01-10', '2019-02-28', '2019-03-10', '2019-03-20', '2019-03-30', NULL, NULL, NULL, '2018-09-01', '1200000.00', '0.00', NULL, 'Releasing'),
(8, 1, ' Monthly check up   ', 'We propose to have a monthly check up', 'Monthly check up', 'To help the residents', 1000, '2019-02-01', '2019-04-03', '2019-04-19', '2019-04-25', '2019-05-05', NULL, NULL, NULL, '2018-08-25', '1200000.00', '0.00', NULL, 'Releasing'),
(9, 1, ' Full body check up and medicine kit giving   ', 'Due to recent outbreak of fever', 'outbreak solution', 'solve outbreak', 100, '2018-10-06', '2018-10-08', '2018-10-18', '2018-10-21', '2018-10-26', NULL, NULL, NULL, '2018-10-06', '35900.00', '0.00', NULL, 'Created'),
(10, 1, ' Eyeglasses Giving   ', 'Kase karamihan sa barangay namin ay senior citizen.', 'Eye Glasses giving', 'Para magkaron ng salamin ang ibang residente.', 500, '2018-10-07', '2018-10-24', '2018-10-31', '2018-10-31', '2018-11-03', NULL, NULL, NULL, '2018-10-06', '1725750.00', '0.00', NULL, 'Created'),
(11, 1, ' Free Grocery   ', 'Libreng grocery para sa bayan', 'Giving of grocery', 'To give free grocery to those in need', 150, '2018-10-12', '2018-10-18', '2018-10-31', '2018-11-01', '2018-12-01', NULL, NULL, NULL, '2018-10-06', '27750.00', '0.00', NULL, 'Finished'),
(12, 1, ' Pregnancy Check up and freebies   ', 'para matulungan ang mga buntis', 'adfasdfaf', 'para', 123, '2018-10-06', '2018-10-10', '2018-10-11', '2018-10-12', '2018-10-19', NULL, NULL, NULL, '2018-10-06', '15578.00', '0.00', NULL, 'Finished'),
(13, 1, ' Application No.1 (Resident)   ', 'For testing of application.', 'Kase', 'Kase', 250, '2018-10-09', '2018-10-20', '2018-10-28', '2018-10-28', '2018-10-31', '2018-10-08', NULL, NULL, '2018-10-07', '150250.00', '0.00', NULL, 'Ongoing'),
(14, 1, ' From Bagong Silang   ', 'sjnsknxksxnksxksxnsk', 'dsds', 'dsds', 150, '2018-10-11', '2018-10-19', '2018-10-25', '2018-10-25', '2018-10-30', '2018-10-11', NULL, NULL, '2018-10-11', '294000.00', '0.00', NULL, 'Ongoing'),
(15, 1, ' Petition for Medical Kits   ', 'Distribution of medical kits.', 'To give medical kits.', 'To help the residents.', 500, '2018-10-15', '2018-10-25', '2018-10-30', '2018-10-30', '2018-10-31', '2018-10-13', '2018-10-13', NULL, '2018-10-13', '389000.00', '0.00', NULL, 'Closed Releasing'),
(16, 1, ' Application No.2 (Household)   ', 'Testing for application.', 'To give medical services and freebies', 'To help the residents.', 300, '2018-10-18', '2018-10-28', '2018-11-05', '2018-11-05', '2018-11-10', '2018-10-13', NULL, NULL, '2018-10-13', '390000.00', '0.00', NULL, 'Ongoing'),
(17, 1, ' Application No.2 (Household)   ', 'Testing for application.', 'Give organic products', 'To help the residents', 250, '2018-10-20', '2018-10-30', '2018-11-10', '2018-11-10', '2018-11-05', '2018-10-13', NULL, NULL, '2018-10-13', '195250.00', '0.00', NULL, 'Ongoing'),
(18, 1, ' Giving of organic products   ', 'To give organic products to residents', 'To distirbute limited organic products.', 'To distirbute limited organic products.', 350, '2018-10-25', '2015-11-15', '2018-11-20', '2018-11-20', '2018-11-25', '2018-10-13', '2018-10-13', NULL, '2018-10-13', '152500.00', '500000.00', NULL, 'Closed Releasing'),
(19, 1, 'Food supplies giving', 'Testing for application.', 'To help the residents', 'To help the residents', 260, '2018-10-25', '2018-11-10', '2018-11-15', '2018-11-15', '2018-11-20', NULL, NULL, NULL, '2018-10-13', '430400.00', '800000.00', NULL, 'Created'),
(20, 1, ' Food Supplies Giving for Households   ', 'To help the residents', 'To help the households', 'To help the households', 250, '2018-10-28', '2018-11-20', '2018-11-25', '2018-11-25', '2018-11-30', '2018-10-13', '2018-10-13', NULL, '2018-10-13', '276900.00', '800000.00', NULL, 'Releasing'),
(21, 1, ' Barangay Check plus freebies   ', 'To help the residents', 'To help the community', 'To help the community', 1500, '2018-10-28', '2018-11-20', '0201-11-25', '2018-11-25', '2018-11-30', '2018-10-13', '2018-10-13', NULL, '2018-10-13', '0.00', '500000.00', NULL, 'Releasing'),
(22, 1, ' Application No.2 (Household)   ', 'Testing for application.', 'To help the residents', 'To help the residents', 120, '2018-10-17', '2018-10-27', '2018-10-31', '2018-10-31', '2018-11-03', '2018-10-16', NULL, NULL, '2018-10-16', '46080.00', '50000.00', NULL, 'Ongoing');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectreason`
--

CREATE TABLE `tbl_projectreason` (
  `int_projectReasonID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_projectReason` text NOT NULL,
  `enum_projectPhase` enum('Start Application','Close Application','Start Releasing','Close Releasing','Close Project') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectreason`
--

INSERT INTO `tbl_projectreason` (`int_projectReasonID`, `int_projectID`, `text_projectReason`, `enum_projectPhase`) VALUES
(4, 8, 'Kase napaaga mumsh', 'Start Releasing'),
(5, 8, 'Kase napaaaggagaga na ', 'Start Releasing'),
(6, 4, 'Kaseee napaaaga\r\n', 'Start Application'),
(7, 7, 'Kase maaga', 'Start Releasing'),
(8, 6, 'kaseeeeeeeeeeeee', 'Start Releasing'),
(9, 6, 'kase food supplies', 'Start Releasing'),
(10, 5, 'kase feeding\r\n', 'Start Releasing'),
(11, 3, 'kase distribution napaaga', 'Start Application'),
(12, 3, 'kase napaaaga releasing ng school supplies', 'Start Releasing'),
(13, 11, 'Nagmamadali', 'Start Application'),
(14, 11, 'For Trial', 'Start Releasing'),
(15, 11, 'Trial', 'Close Releasing'),
(16, 11, 'trial', 'Close Releasing'),
(17, 12, 'asdjhaj af', 'Start Application'),
(18, 12, 'asda', 'Start Releasing'),
(19, 12, 'qwrqw', 'Close Releasing'),
(20, 5, 'hkhkjhkh', 'Close Releasing'),
(21, 5, 'jasdfk.jsdank', 'Close Releasing'),
(22, 13, 'Advanceee', 'Start Application'),
(23, 13, 'kaseee', 'Start Application'),
(24, 13, 'kasee\r\n\r\n', 'Start Application'),
(25, 13, 'bhb\r\n', 'Start Application'),
(26, 13, 'bhjb', 'Start Application'),
(27, 13, 'jscnkscn\r\n', 'Start Application'),
(28, 14, 'sdsdsdsds', 'Start Application'),
(29, 15, 'Due to some details that has been polished.', 'Start Application'),
(30, 15, 'Due to early opening of application.', 'Close Application'),
(31, 15, 'Due to advanced dates.', 'Start Releasing'),
(32, 15, 'Due to advanced dates', 'Close Releasing'),
(33, 18, 'Due to early dates', 'Start Application'),
(34, 18, 'Due to early dates', 'Close Application'),
(35, 18, 'Due to early dates\r\n', 'Start Releasing'),
(36, 18, 'Due to early dates', 'Close Releasing'),
(37, 16, 'jksxj\r\n', 'Start Application'),
(38, 17, 'kmc', 'Start Application'),
(39, 21, 'sklxs', 'Start Application'),
(40, 21, 'jnj', 'Close Application'),
(41, 21, 'jhjk', 'Start Releasing'),
(42, 20, 'jjk', 'Start Application'),
(43, 20, 'jhjkh', 'Close Application'),
(44, 20, 'bjkjjkh', 'Start Releasing'),
(45, 22, 'Napaaga kase', 'Start Application');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectrequirement`
--

CREATE TABLE `tbl_projectrequirement` (
  `int_projreqID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectrequirement`
--

INSERT INTO `tbl_projectrequirement` (`int_projreqID`, `int_requirementID`, `int_projectID`) VALUES
(5, 1, 3),
(6, 14, 3),
(7, 14, 4),
(8, 1, 5),
(9, 12, 5),
(10, 1, 6),
(11, 12, 6),
(12, 14, 6),
(13, 1, 7),
(14, 14, 7),
(15, 14, 8),
(16, 1, 9),
(17, 14, 9),
(18, 12, 10),
(19, 14, 10),
(20, 1, 11),
(21, 14, 11),
(22, 14, 12),
(23, 1, 13),
(24, 14, 13),
(25, 4, 13),
(26, 1, 14),
(27, 2, 14),
(28, 3, 14),
(29, 4, 14),
(30, 8, 14),
(31, 12, 15),
(32, 14, 15),
(33, 1, 18),
(34, 14, 18),
(35, 1, 20),
(36, 14, 20),
(37, 14, 21),
(38, 1, 22),
(39, 14, 22);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirement`
--

CREATE TABLE `tbl_requirement` (
  `int_requirementID` int(11) NOT NULL,
  `varchar_requirementName` varchar(100) NOT NULL,
  `enum_requirementStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_requirement`
--

INSERT INTO `tbl_requirement` (`int_requirementID`, `varchar_requirementName`, `enum_requirementStatus`) VALUES
(1, 'Birth Certificate', 'Active'),
(2, 'Transcript of Records/ Diploma', 'Active'),
(3, 'NBI Clearance', 'Active'),
(4, 'SSS', 'Active'),
(5, 'Pag-IBIG', 'Active'),
(6, 'Philhealth', 'Active'),
(7, 'BIR forms', 'Active'),
(8, 'Valid Driver’s License', 'Active'),
(9, 'Valid Passport', 'Active'),
(10, 'Baptismal Certificate', 'Active'),
(11, 'Marriage Certificate', 'Active'),
(12, 'Barangay Certificate of Residency', 'Active'),
(13, 'Utility Bill/s', 'Active'),
(14, 'Valid ID', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_unitmeasure`
--

CREATE TABLE `tbl_unitmeasure` (
  `int_unitMeasureID` int(11) NOT NULL,
  `varchar_unitName` varchar(100) NOT NULL,
  `char_unitSymbol` char(10) NOT NULL,
  `enum_unitStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_unitmeasure`
--

INSERT INTO `tbl_unitmeasure` (`int_unitMeasureID`, `varchar_unitName`, `char_unitSymbol`, `enum_unitStatus`) VALUES
(1, 'Piece', 'pc', 'Active'),
(2, 'Box', 'box', 'Active'),
(3, 'Kilogram', 'kg', 'Active'),
(4, 'Pound', 'lbs', 'Active'),
(5, 'Liter', 'L', 'Active'),
(6, 'Sack', 'sack', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL,
  `varchar_userEmailAddress` varchar(100) NOT NULL,
  `varchar_userPassword` varchar(100) NOT NULL,
  `enum_userType` enum('Barangay Staff','Office Staff','Budget Office Staff') NOT NULL DEFAULT 'Barangay Staff',
  `text_userName` text NOT NULL,
  `text_userAddress` text NOT NULL,
  `varchar_userContact` text NOT NULL,
  `varchar_userPosition` varchar(100) NOT NULL,
  `enum_accountStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `varchar_userEmailAddress`, `varchar_userPassword`, `enum_userType`, `text_userName`, `text_userAddress`, `varchar_userContact`, `varchar_userPosition`, `enum_accountStatus`) VALUES
(1, 'office@gmail.com', 'office', 'Office Staff', 'Alexandra Del Rosario', '321 Rizal St. Plainview, Mandaluyong City', '+63 901 387 9876', 'PRO', 'Active'),
(3, 'bagongsilang@gmail.com', 'bagongsilang', 'Barangay Staff', 'Richard Cabria', '53 Ibarra St., Bagong Silang, Mandaluyong City', '+63 908 123 1846', 'PIO\r\n', 'Active'),
(4, 'budget@gmail.com', 'budget', 'Budget Office Staff', 'Jayce Calucin', '19 Maganda St., Buli, Mandaluyong City', '+63 978 765 1827', 'PIO', 'Active'),
(5, 'barangkadrive@gmail.com', 'barangkadrive', 'Barangay Staff', 'Dynnah Nasayao', '14 Mithi St., Barangka Drive, Mandaluyong City', '+63 909 192 8765', 'PIO', 'Active'),
(6, 'hulo@gmail.com', 'hulo', 'Barangay Staff', 'Phillix Marlboro', '2530 Maria Clara St. Hulo, Mandaluyong City', '+63 987 678 5422', 'PIO', 'Active'),
(7, 'malamig@gmail.com', 'malamig', 'Barangay Staff', 'Russel Dizon', '2210 Sinid Ave., Malamig, Mandaluyong City', '+63 912 122 0987', 'PIO', 'Active'),
(8, 'delrosarioabigale@gmail.com', 'BOikg9ah', 'Barangay Staff', 'Abigale Del Rosario', '13 Riverpark, Elizabeth Ave., Addition Hills, Mandaluyong City', '+63 915 666 2933', 'Head', 'Active'),
(9, 'buli@gmail.com', 'buli', 'Barangay Staff', 'Andrea Cruz', '6654 Daniella Ave., Buli, Mandaluyong City', '+63 987 097 1123', 'PIO', 'Active'),
(10, 'cupang@gmail.com', 'cupang', 'Barangay Staff', 'Jullian Encina', '4312 Magsaysay St., Cupang, Mandaluyong City', '+63 911 176 1154', 'PIO', 'Active'),
(11, 'plainview@gmail.com', 'plainview', 'Barangay Staff', 'Kimberly Pagador', 'Sapang Maligaya, Brgy. Plainview, Mandaluyong City', '+63 911 878 8892', 'PIO', 'Active'),
(12, 'ilaya@gmail.com', 'ilaya', 'Barangay Staff', 'Lyka', '233 Ilaya', '09124578962', 'PIO', 'Active'),
(13, 'office1@gmail.com', 'G2DqZgCW', 'Office Staff', 'Aurea', '233 Mandaluyong', '09184251287', 'PIO', 'Active'),
(14, 'malayo@gmail.com', '8S5aNorw', 'Barangay Staff', 'Hannah', '233 Malayo', '09152224865', 'PIO', 'Active'),
(15, 'delrosariochewwy@gmail.com', 'yJozDp4T', 'Barangay Staff', 'Chewwy', '523 Malayo', '2224852', 'PIO', 'Active'),
(16, 'bagongsilang2@gmail.com', 'bagongsilang2', 'Barangay Staff', 'Bago Lang', '233 Bagong silang', '09152324563', 'PIO', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_annualbudget`
--
ALTER TABLE `tbl_annualbudget`
  ADD PRIMARY KEY (`int_budgetID`),
  ADD KEY `cityBudget_idx` (`int_cityID`);

--
-- Indexes for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  ADD PRIMARY KEY (`int_appbeneID`),
  ADD KEY `appbene_idx` (`int_projectID`);

--
-- Indexes for table `tbl_application`
--
ALTER TABLE `tbl_application`
  ADD PRIMARY KEY (`int_applicationID`),
  ADD KEY `appbrgy_idx` (`int_barangayID`),
  ADD KEY `appproj_idx` (`int_projectID`);

--
-- Indexes for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  ADD PRIMARY KEY (`int_appreqID`),
  ADD KEY `appreqapp_idx` (`int_applicationID`),
  ADD KEY `appreqreq_idx` (`int_requirementID`);

--
-- Indexes for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  ADD PRIMARY KEY (`int_barangayID`),
  ADD KEY `brgycity_idx` (`int_cityID`);

--
-- Indexes for table `tbl_barangayapplication`
--
ALTER TABLE `tbl_barangayapplication`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_barangaybeneficiary`
--
ALTER TABLE `tbl_barangaybeneficiary`
  ADD PRIMARY KEY (`int_brgybeneID`),
  ADD KEY `brgybeneapp_idx` (`int_applicationID`);

--
-- Indexes for table `tbl_barangayreleasing`
--
ALTER TABLE `tbl_barangayreleasing`
  ADD PRIMARY KEY (`int_brgyreleaseID`);

--
-- Indexes for table `tbl_beneficiary`
--
ALTER TABLE `tbl_beneficiary`
  ADD PRIMARY KEY (`int_beneficiaryID`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`int_categoryID`);

--
-- Indexes for table `tbl_categorybudget`
--
ALTER TABLE `tbl_categorybudget`
  ADD PRIMARY KEY (`int_categbudID`);

--
-- Indexes for table `tbl_city`
--
ALTER TABLE `tbl_city`
  ADD PRIMARY KEY (`int_cityID`);

--
-- Indexes for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  ADD PRIMARY KEY (`int_expenseID`),
  ADD KEY `expproj_idx` (`int_projectID`);

--
-- Indexes for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  ADD PRIMARY KEY (`int_familybgID`),
  ADD KEY `fambghouse_idx` (`int_applicationID`);

--
-- Indexes for table `tbl_financialcontribution`
--
ALTER TABLE `tbl_financialcontribution`
  ADD PRIMARY KEY (`int_financialconID`),
  ADD KEY `finconapp_idx` (`int_applicationID`);

--
-- Indexes for table `tbl_householdapplication`
--
ALTER TABLE `tbl_householdapplication`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_intentstatement`
--
ALTER TABLE `tbl_intentstatement`
  ADD PRIMARY KEY (`int_statementID`),
  ADD KEY `intstatebrgy_idx` (`int_barangayID`),
  ADD KEY `intstatecateg_idx` (`int_categoryID`),
  ADD KEY `instateprooj_idx` (`int_projectID`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`int_notifID`),
  ADD KEY `userreceive_idx` (`int_notifReceiverID`),
  ADD KEY `usersend_idx` (`int_notifSenderID`);

--
-- Indexes for table `tbl_officialsaccount`
--
ALTER TABLE `tbl_officialsaccount`
  ADD PRIMARY KEY (`int_officialsuserID`),
  ADD KEY `brgyid_idx` (`int_officialsID`),
  ADD KEY `userid_idx` (`int_userID`);

--
-- Indexes for table `tbl_personalinformation`
--
ALTER TABLE `tbl_personalinformation`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  ADD PRIMARY KEY (`int_proapptypeID`),
  ADD KEY `projapptype_idx` (`int_projectID`);

--
-- Indexes for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  ADD PRIMARY KEY (`int_projbeneID`),
  ADD KEY `beneid_idx` (`int_beneficiaryID`);

--
-- Indexes for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  ADD PRIMARY KEY (`int_projcategID`),
  ADD KEY `projcateg_idx` (`int_projectID`),
  ADD KEY `categid_idx` (`int_categoryID`);

--
-- Indexes for table `tbl_projectdetail`
--
ALTER TABLE `tbl_projectdetail`
  ADD PRIMARY KEY (`int_projectID`),
  ADD KEY `cityid_idx` (`int_cityID`);

--
-- Indexes for table `tbl_projectreason`
--
ALTER TABLE `tbl_projectreason`
  ADD PRIMARY KEY (`int_projectReasonID`),
  ADD KEY `projid_idx` (`int_projectID`);

--
-- Indexes for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  ADD PRIMARY KEY (`int_projreqID`),
  ADD KEY `proreqid_idx` (`int_projectID`),
  ADD KEY `projreqreq_idx` (`int_requirementID`);

--
-- Indexes for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  ADD PRIMARY KEY (`int_requirementID`);

--
-- Indexes for table `tbl_unitmeasure`
--
ALTER TABLE `tbl_unitmeasure`
  ADD PRIMARY KEY (`int_unitMeasureID`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`int_userID`),
  ADD UNIQUE KEY `varchar_userEmailAddress` (`varchar_userEmailAddress`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_annualbudget`
--
ALTER TABLE `tbl_annualbudget`
  MODIFY `int_budgetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  MODIFY `int_appbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=756;

--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_barangaybeneficiary`
--
ALTER TABLE `tbl_barangaybeneficiary`
  MODIFY `int_brgybeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_barangayreleasing`
--
ALTER TABLE `tbl_barangayreleasing`
  MODIFY `int_brgyreleaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_beneficiary`
--
ALTER TABLE `tbl_beneficiary`
  MODIFY `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `int_categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_categorybudget`
--
ALTER TABLE `tbl_categorybudget`
  MODIFY `int_categbudID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_city`
--
ALTER TABLE `tbl_city`
  MODIFY `int_cityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  MODIFY `int_expenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  MODIFY `int_familybgID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_financialcontribution`
--
ALTER TABLE `tbl_financialcontribution`
  MODIFY `int_financialconID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `tbl_intentstatement`
--
ALTER TABLE `tbl_intentstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_officialsaccount`
--
ALTER TABLE `tbl_officialsaccount`
  MODIFY `int_officialsuserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  MODIFY `int_proapptypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projcategID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_projectdetail`
--
ALTER TABLE `tbl_projectdetail`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_projectreason`
--
ALTER TABLE `tbl_projectreason`
  MODIFY `int_projectReasonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_unitmeasure`
--
ALTER TABLE `tbl_unitmeasure`
  MODIFY `int_unitMeasureID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_annualbudget`
--
ALTER TABLE `tbl_annualbudget`
  ADD CONSTRAINT `cityBudget` FOREIGN KEY (`int_cityID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  ADD CONSTRAINT `appbene` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_application`
--
ALTER TABLE `tbl_application`
  ADD CONSTRAINT `appbrgy` FOREIGN KEY (`int_barangayID`) REFERENCES `tbl_barangay` (`int_barangayID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appproj` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  ADD CONSTRAINT `appreqapp` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appreqreq` FOREIGN KEY (`int_requirementID`) REFERENCES `tbl_requirement` (`int_requirementID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  ADD CONSTRAINT `brgycity` FOREIGN KEY (`int_cityID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_barangayapplication`
--
ALTER TABLE `tbl_barangayapplication`
  ADD CONSTRAINT `brgyappapp` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_barangaybeneficiary`
--
ALTER TABLE `tbl_barangaybeneficiary`
  ADD CONSTRAINT `brgybeneapp` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_barangayapplication` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  ADD CONSTRAINT `expproj` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  ADD CONSTRAINT `fambghouse` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_householdapplication` (`int_applicationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_financialcontribution`
--
ALTER TABLE `tbl_financialcontribution`
  ADD CONSTRAINT `finconapp` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_householdapplication` (`int_applicationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_householdapplication`
--
ALTER TABLE `tbl_householdapplication`
  ADD CONSTRAINT `houseapp` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_intentstatement`
--
ALTER TABLE `tbl_intentstatement`
  ADD CONSTRAINT `instateprooj` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `intstatebrgy` FOREIGN KEY (`int_barangayID`) REFERENCES `tbl_barangay` (`int_barangayID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `intstatecateg` FOREIGN KEY (`int_categoryID`) REFERENCES `tbl_category` (`int_categoryID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD CONSTRAINT `userreceive` FOREIGN KEY (`int_notifReceiverID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usersend` FOREIGN KEY (`int_notifSenderID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_officialsaccount`
--
ALTER TABLE `tbl_officialsaccount`
  ADD CONSTRAINT `brgyid` FOREIGN KEY (`int_officialsID`) REFERENCES `tbl_barangay` (`int_barangayID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userid` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_personalinformation`
--
ALTER TABLE `tbl_personalinformation`
  ADD CONSTRAINT `persoapp` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  ADD CONSTRAINT `projapptype` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  ADD CONSTRAINT `beneid` FOREIGN KEY (`int_beneficiaryID`) REFERENCES `tbl_beneficiary` (`int_beneficiaryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  ADD CONSTRAINT `categid` FOREIGN KEY (`int_categoryID`) REFERENCES `tbl_category` (`int_categoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projcateg` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectdetail`
--
ALTER TABLE `tbl_projectdetail`
  ADD CONSTRAINT `city` FOREIGN KEY (`int_cityID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectreason`
--
ALTER TABLE `tbl_projectreason`
  ADD CONSTRAINT `projid` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  ADD CONSTRAINT `projreqreq` FOREIGN KEY (`int_requirementID`) REFERENCES `tbl_requirement` (`int_requirementID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proreqid` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

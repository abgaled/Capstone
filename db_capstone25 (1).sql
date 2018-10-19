-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2018 at 05:04 AM
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
-- Database: `db_capstone25`
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
(5, 1, 2017, '1200000.00', '-474491143.00'),
(6, 1, 2018, '5000000.00', '4178850.00'),
(8, 1, 2019, '2710000.00', '2210000.00');

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
(12, 23, 'Eye glasses', 1, 'pc'),
(13, 25, 'Thing #1', 2, 'pc'),
(14, 26, 'Benefit1', 2, 'pc');

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
(221, 6, 23, 'Resident', 'Received', '2018-10-17 02:28:33', '2018-10-17 01:25:24'),
(223, 6, 23, 'Resident', 'Received', '2018-10-17 02:28:33', '2018-10-17 02:05:48'),
(224, 6, 23, 'Resident', 'Received', '2018-10-17 02:28:33', '2018-10-17 02:08:27'),
(225, 4, 38, 'Resident', 'Received', '2018-10-17 10:17:35', '2018-10-17 10:37:57'),
(226, 4, 39, 'Barangay', 'Approved', NULL, '2018-10-17 11:04:25'),
(227, 9, 39, 'Barangay', 'Approved', NULL, '2018-10-17 11:06:16'),
(228, 3, 39, 'Barangay', 'Approved', NULL, '2018-10-17 11:08:05');

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
(756, 221, 12, 'Cabinet 1 Row 1', 'Passed'),
(757, 221, 14, 'Cabinet 1 Row 2', 'Passed'),
(758, 223, 12, 'Cabinet 1 Row 1', 'Passed'),
(759, 223, 14, 'Cabinet 1 Row 3', 'Passed'),
(760, 224, 12, 'Cabinet 1 Row 1', 'Passed'),
(761, 224, 14, 'Cabinet 1 Row 4', 'Passed'),
(762, 225, 14, 'C', '');

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
(6, 1, 'Plainview', '534-1874', '40 Malaya Street', 'Active'),
(9, 1, 'Ilaya', '2534521', '253 Ilaya', 'Active'),
(11, 1, 'Malapit', '5236549', '2532 Mandaluyong City', 'Active');

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
(226, 50, 'because we need it'),
(227, 25, 'we also need it'),
(228, 25, 'because we need it also');

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
(1, 228, 'Maricar', 'Lalo', 'Oriel', '', '2018-10-17 10:17:35', 'None'),
(2, 228, 'Jenhel', 'Sangos', 'Mendoza', '', '2018-10-17 10:17:35', 'None'),
(3, 226, 'Aby', 'Del', 'NJ', '', '2018-10-17 10:17:35', 'none');

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
(12, 23, 6, NULL, '2018-10-17', 'Closed'),
(13, 38, 4, NULL, '2018-10-17', 'Closed'),
(14, 39, 3, NULL, '2018-10-17', 'Closed'),
(15, 39, 9, NULL, '2018-10-17', 'Closed'),
(16, 39, 4, NULL, '2018-10-17', 'Closed');

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
(9, 8, 1, '1500000.00', '1500000.00'),
(10, 8, 2, '400000.00', '400000.00'),
(11, 8, 3, '680000.00', '680000.00'),
(12, 8, 4, '130000.00', '130000.00'),
(13, 6, 1, '1500000.00', '15000001.00'),
(14, 6, 2, '1000000.00', '1000000.00'),
(15, 6, 3, '1000000.00', '1000000.00'),
(16, 6, 4, '1500000.00', '1500000.00');

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
(1, 'Office of the Congresswomen Alexandria Gonzales', 'Mandaluyong City', '315 Maysilo Cir, Mandaluyong, 1550 Metro Manila');

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
(31, 23, 'Benefit Expense', 250, '990.00', '247500.00', '2970.00', 3),
(32, 23, 'Tarpaulin', 9, '1200.00', '10800.00', '10800.00', 9),
(33, 25, 'Benefit Expense', 120, '320.00', '38400.00', NULL, NULL),
(34, 25, 'Flyers', 100, '2.00', '200.00', NULL, NULL),
(35, 23, 'Food Expense', NULL, '120.00', NULL, '4800.00', 40),
(36, 26, 'Benefit Expense', 100, '170.00', '17000.00', NULL, NULL),
(37, 26, 'Tarpaulin', 3, '800.00', '2400.00', NULL, NULL),
(40, 30, 'Benefit Expense', 50, '500.00', '0.00', NULL, NULL),
(43, 34, 'Benefit Expense', 123, '15129.00', '0.00', NULL, NULL),
(44, 35, 'Benefit Expense', 123, '15129.00', '0.00', NULL, NULL),
(45, 36, 'Benefit Expense', 100, '900.00', '0.00', NULL, NULL),
(47, 38, 'Benefit Expense', 200, '250.00', '50000.00', '250.00', 1),
(48, 38, 'Tarpaulin', 12, '1200.00', '14400.00', '14400.00', 12),
(49, 38, 'Food Expense', NULL, '130.00', NULL, '6500.00', 50),
(50, 39, 'Benefit Expense', 100, '2500.00', '250000.00', NULL, NULL),
(51, 39, 'Flyers', 150, '3.00', '450.00', NULL, NULL);

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
(29, 6, 2, NULL, 'Monetary Request from Plainview', 'Request for monetary help for retired workers.', '2018-10-12', 'Adrian Vasquez', '296 Plainview', 'Solved'),
(30, 6, 2, NULL, 'Giving of money', 'To help the college students expenses', '2018-10-12', 'Lalaine Joaquin', '78 Plainview Mandaluyong City', 'Rejected'),
(31, 4, 1, 26, 'Medical Kit for the youths', 'To make the youths always ready', '2018-10-13', 'Lovely Gamora', '365 Hulo Mandaluyong City', 'Solved'),
(32, 4, 1, NULL, 'Medical Kit for the ', 'To help the senior citizens be always ready', '2018-10-13', 'Karl Malin', '874 Hulo Mandaluyong City', 'Rejected'),
(33, 1, 1, 23, 'Eye glasses giving for senior citizens', 'To help the senior citizens', '2018-10-13', 'Zyannah Ombre', '63 Addition Hills Mandaluyong City', 'Solved'),
(34, 1, 1, 25, 'Things for the babies', 'To help the pregnant women for their babies', '2018-10-12', 'Marivic Campos', '65 Addition Hills Mandaluyong City', 'Solved'),
(37, 3, 2, 35, 'Monetary Assistance for retired', 'to help the residents', '2018-10-13', 'Jomari Galema', '875 Barangka Drive', 'Solved'),
(38, 4, 1, 36, 'Med ', 'Meds', '2018-10-17', 'Jenhel', 'lugar ko', 'Solved'),
(39, 4, 1, 38, 'Dengue Vaccine', 'Injection for youths', '2018-10-17', 'Abbygale Punzalan', '123 Hulo Mandaluyong City', 'Solved');

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
(15, 1, 18),
(16, 1, 20),
(17, 2, 21),
(18, 2, 22),
(19, 3, 23),
(20, 3, 24),
(21, 4, 25),
(22, 4, 26),
(23, 9, 27),
(24, 9, 28),
(25, 6, 29),
(26, 6, 30),
(27, 1, 17),
(28, 1, 32),
(29, 1, 4),
(30, 1, 31),
(33, 1, 36),
(34, 1, 37),
(35, 1, 38);

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
(221, 'Fidel', 'Hidalgo', 'Madla', '1967-09-15', 'Male', 1967, 'Single', '(+63) 912-892-8192', 'madlafidel@gmail.com', '123 Plainview Mandaluyong City'),
(223, 'Michael', '', 'Ladrimosa', '1968-02-15', 'Male', 2008, 'Single', '(+63) 916-262-2323', 'michaladri@gmail.com', '133 Plainview Mandaluyong City'),
(224, 'Marcos', '', 'Ramos', '1945-02-15', 'Male', 1955, 'Married', '(+63) 952-565-1566', 'marcosram@gmail.com', '563 Plainview Mandaluyong City'),
(225, 'Jillmane', 'Gamora', 'Mendoza', '2005-06-19', 'Female', 2008, 'Single', '(+63) 915-231-5695', 'jillll@gmail.com', '133 Hulo Mandaluyong City');

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
(17, 23, 'Resident'),
(18, 25, 'Household'),
(19, 26, 'Household'),
(22, 30, 'Barangay'),
(25, 34, 'Resident'),
(26, 35, 'Resident'),
(27, 36, 'Resident'),
(29, 38, 'Resident'),
(30, 39, 'Barangay');

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
(80, 29, 10, 'Intent Statement'),
(81, 30, 3, 'Intent Statement'),
(82, 31, 11, 'Intent Statement'),
(83, 32, 1, 'Intent Statement'),
(84, 33, 1, 'Intent Statement'),
(85, 34, 8, 'Intent Statement'),
(86, 35, 11, 'Intent Statement'),
(87, 36, 11, 'Intent Statement'),
(88, 37, 10, 'Intent Statement'),
(89, 32, 2, 'Project'),
(90, 38, 1, 'Intent Statement'),
(91, 37, 1, 'Project'),
(92, 39, 11, 'Intent Statement'),
(93, 39, 1, 'Project');

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
(3, 35, 2, '12312312.00'),
(4, 36, 1, '600000.00'),
(6, 38, 1, '200000.00'),
(7, 39, 2, '300000.00');

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
(23, 1, ' Eye glasses giving for senior citizens   ', 'To help the senior citizens', 'To help the senior citizens', 'To help the senior citizens', 250, '2018-10-19', '2018-10-31', '2018-11-03', '2018-11-03', '2018-11-11', '2018-10-17', '2018-10-17', NULL, '2018-10-17', '258300.00', '300000.00', NULL, 'Closed Releasing'),
(25, 1, ' Things for the babies   ', 'To help the pregnant women for their babies', 'To help the residents', 'To help the residents', 120, '2018-10-20', '2018-10-30', '2018-11-06', '2018-11-06', '2018-11-10', NULL, NULL, NULL, '2018-10-17', '38600.00', '40000.00', NULL, 'Created'),
(26, 1, ' Medical Kit for the youths one per household only', 'To make the youths always ready', 'To help the residents', 'To help the residents', 100, '2018-10-20', '2018-10-31', '2018-11-03', '2018-11-03', '2018-11-07', NULL, NULL, NULL, '2018-10-17', '19400.00', '25000.00', NULL, 'Created'),
(30, 1, ' Monetary Assistance for retired   ', 'to help the residents', 'to help the residents', 'to help the residents', 50, '2018-10-19', '2018-10-31', '2018-11-09', '2018-11-09', '2018-11-13', NULL, NULL, NULL, '2018-10-17', '0.00', '27000.00', NULL, 'Created'),
(34, 1, ' Monetary Assistance for retired   ', 'to help the residents', 'hfaskljfhkjlas', 'sdfkjashfdkjlash', 123, '2018-10-18', '2018-10-19', '2018-10-25', '2018-10-30', '2018-10-31', NULL, NULL, NULL, '2018-10-17', '0.00', '123123123.00', NULL, 'Created'),
(35, 1, ' Monetary Assistance for retired   ', 'to help the residents', 'hfaskljdhfkjals', 'aflkjadhskjlfh', 123, '2018-10-18', '2018-10-19', '2018-10-20', '2018-10-22', '2018-10-25', NULL, NULL, NULL, '2018-10-17', '0.00', '12312312.00', NULL, 'Created'),
(36, 1, ' Med    ', 'Meds', 'Med', 'Med', 100, '2018-10-17', '2018-10-19', '2018-10-22', '2018-10-23', '2018-10-26', NULL, NULL, NULL, '2018-10-17', '0.00', '600000.00', NULL, 'Created'),
(38, 1, ' Dengue Vaccine   ', 'Injection for youths', 'To help the reisdents', 'To help the reisdents', 200, '2018-10-19', '2018-10-31', '2018-11-02', '2018-11-02', '2018-11-09', '2018-10-17', '2018-10-17', '2018-10-17', '2018-10-17', '64400.00', '200000.00', '21150.00', 'Finished'),
(39, 1, 'Senior Citizen Benefits', 'To help the senior citizens', 'To help the senior citizens', 'To help the senior citizens', 100, '2018-10-19', '2018-10-31', '2018-11-03', '2018-11-03', '2018-11-10', '2018-10-17', '2018-10-17', NULL, '2018-10-17', '250450.00', '300000.00', NULL, 'Closed Releasing');

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
(46, 23, 'Due to advanced dates', 'Start Application'),
(48, 23, 'due to early dates', 'Close Application'),
(49, 23, 'due to early dates', 'Start Releasing'),
(50, 23, 'due to early dates', 'Close Releasing'),
(51, 38, 'Due to advanced dates', 'Start Application'),
(52, 38, 'Due to advanced dates', 'Close Application'),
(53, 38, 'Due to advanced dates', 'Start Releasing'),
(54, 38, 'Due to advance dates', 'Close Releasing'),
(55, 39, 'advanced date', 'Start Application'),
(56, 39, 'due to advanced dates', 'Close Application'),
(57, 39, 'advance dates', 'Start Releasing'),
(58, 39, 'due to advance dates', 'Close Releasing'),
(59, 39, 'due to early dtaes', 'Close Releasing'),
(60, 39, 'dhfu', 'Close Releasing');

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
(40, 12, 23),
(41, 14, 23),
(42, 1, 25),
(43, 12, 25),
(44, 14, 26),
(47, 14, 30),
(50, 2, 34),
(51, 2, 35),
(52, 3, 36),
(54, 14, 38),
(55, 14, 39);

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
(4, 'budget@gmail.com', 'budget', 'Budget Office Staff', 'Jayce Calucin', '19 Maganda St., Buli, Mandaluyong City', '+63 978 765 1827', 'PIO', 'Active'),
(17, 'cityprojmsoffice@gmail.com', 'cityprojmsoffice', 'Office Staff', 'Bruno Dela Rosa', '235 Boni Mandaluyong City', '09125242121', 'PIO', 'Active'),
(18, 'additionhills@gmail.com', 'additionhills', 'Barangay Staff', 'Aurea Napiza', '233 Addition Hills Mandaluyong City', '09124211295', 'PIO', 'Active'),
(20, 'additionhills2@gmail.com', 'additionhills2', 'Barangay Staff', 'Fernando Go', '255 Additional Hills Mandaluyong City', '09152227569', 'PIO', 'Active'),
(21, 'bagongsilang@gmail.com', 'bagongsilang', 'Barangay Staff', 'Althea De Jesu', '12 Bagong Silang Mandaluyong City', '09175986321', 'PIO', 'Active'),
(22, 'bagongsilang2@gmail.com', 'bagongsilang2', 'Barangay Staff', 'Bea Cruz', '2577 Bagong Silang Mandaluyong City', '09452231956', 'PIO', 'Active'),
(23, 'barangkadrive@gmail.com', 'barangkadrive', 'Barangay Staff', 'Mars Mendoza', '278 Barangka Drive Mandaluyong City', '09452218754', 'PIO', 'Active'),
(24, 'barangkadrive2@gmail.com', 'barangkadrive2', 'Barangay Staff', 'Gil Madami', '275 Barangka Drive Mandaluyong City', '09452133395', 'PIO', 'Active'),
(25, 'hulo@gmail.com', 'hulo', 'Barangay Staff', 'Girly Diaz', '885 Hulo Mandaluyong City', '09412325695', 'PIO', 'Active'),
(26, 'hulo2@gmail.com', 'hulo2', 'Barangay Staff', 'Marilou Chavez', '774 Hulo Mandaluyong City', '09235689564', 'PIO', 'Active'),
(27, 'ilaya@gmail.com', 'ilaya', 'Barangay Staff', 'Hail Cruzadas', '253 Ilaya Mandaluyong City', '09263596212', 'PIO', 'Active'),
(28, 'ilaya2@gmail.com', 'ilaya2', 'Barangay Staff', 'Hannah Dela Sal', '596 Ilaya Mandaluyong City', '09152364895', 'PIO', 'Active'),
(29, 'plainview@gmail.com', 'plainview', 'Barangay Staff', 'Claridel Fidel', '232 Plainview Mandaluyong City', '09185562312', 'PIO', 'Active'),
(30, 'plainview2@gmail.com', 'plainview2', 'Barangay Staff', 'Jose Paul Damian', '785 Plainview Mandaluyong City', '09123556985', 'PIO', 'Active'),
(31, 'budget1@gmail.com', 'budget1', 'Budget Office Staff', 'Ram Santosa', '537 Ilaya Mandaluyong City', '09253156231', 'Staff', 'Active'),
(32, 'office1@gmail.com', 'office1', 'Office Staff', 'Von Dutch', '693 Plainview Mandaluyong', '09123697589', 'Staff', 'Active'),
(36, 'ericc@gmail.com', 'fef5jBGM', 'Budget Office Staff', 'Eric Name', '589 Plainview Mandaluyong City', '09124875632', 'Staff', 'Active'),
(37, 'rexxx@gmail.com', 'bfZInt6r', 'Office Staff', 'Rex Timoteo', '563 Hulo Mnadaluyong City', '09156321452', 'Staff', 'Active'),
(38, 'office@gmail.com', 'office', 'Office Staff', 'Vin Flors', '563 Addition Hills Mandaluyong City', '09123452895', 'PIO', 'Active');

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
  MODIFY `int_budgetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  MODIFY `int_appbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=763;

--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_barangaybeneficiary`
--
ALTER TABLE `tbl_barangaybeneficiary`
  MODIFY `int_brgybeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_barangayreleasing`
--
ALTER TABLE `tbl_barangayreleasing`
  MODIFY `int_brgyreleaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
  MODIFY `int_categbudID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_city`
--
ALTER TABLE `tbl_city`
  MODIFY `int_cityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  MODIFY `int_expenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  MODIFY `int_familybgID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_financialcontribution`
--
ALTER TABLE `tbl_financialcontribution`
  MODIFY `int_financialconID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_intentstatement`
--
ALTER TABLE `tbl_intentstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_officialsaccount`
--
ALTER TABLE `tbl_officialsaccount`
  MODIFY `int_officialsuserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  MODIFY `int_proapptypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projcategID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_projectdetail`
--
ALTER TABLE `tbl_projectdetail`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_projectreason`
--
ALTER TABLE `tbl_projectreason`
  MODIFY `int_projectReasonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

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
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

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

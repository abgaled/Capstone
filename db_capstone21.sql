-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2018 at 09:55 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_capstone21`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_annualbudget`
--

CREATE TABLE `tbl_annualbudget` (
  `int_budgetID` int(11) NOT NULL,
  `int_cityID` int(11) NOT NULL,
  `decimal_annualBudget` decimal(20,2) NOT NULL,
  `date_budgetYear` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicantbenefit`
--

CREATE TABLE `tbl_applicantbenefit` (
  `int_appbeneID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_benefitName` text NOT NULL,
  `int_itemQuantity` int(11) NOT NULL,
  `char_itemUnit` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(22, 2, 3, 'Barangay', 'Approved', NULL, '2018-10-06 03:29:35');

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
(8, 1, 'Cupang', '522-6896', '62 Manda', 'Active');

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
(22, 500, 'Kase kamiy taga bagong silang');

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
(1, 5, 5, NULL, NULL, 'Releasing'),
(2, 5, 2, NULL, NULL, 'Releasing'),
(3, 3, 5, NULL, NULL, 'Releasing'),
(4, 3, 2, NULL, NULL, 'Releasing');

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
(14, 11, 'Rhaizen', 'Eyy', 'Timoteo', 'Single', 'Elementary', 'None');

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
(42, 11, 'Ibang Expensee', 'Father', 'Monthly', '140000.00');

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
(11, 'Timoteo', '121 Malamigg', '0.00', 'Rent');

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
  `enum_problemStatus` enum('Submitted','Acknowledged','Proposed','Solved','Rejected') NOT NULL DEFAULT 'Submitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_intentstatement`
--

INSERT INTO `tbl_intentstatement` (`int_statementID`, `int_barangayID`, `int_categoryID`, `int_projectID`, `varchar_statementTitle`, `text_statementContent`, `date_createdDate`, `varchar_residentName`, `text_residentAddress`, `enum_problemStatus`) VALUES
(1, 3, 1, 2, 'Full body check up and medicine kit giving', 'Due to recent outbreak of fever', '2018-09-01', 'Francheska Jordan', 'JP Rizal St., Brgy. Barangka Drive, Mandaluyong City', 'Acknowledged'),
(4, 4, 3, 6, 'Distribution of goods', 'Due to recent fire incident, supplies are given but it is insufficient.', '2018-09-01', 'Fatima Candeza', 'Mangahan St., Sta Ana Drive, Brgy. Addition Hills, Mandaluyong City', 'Rejected'),
(16, 5, 1, NULL, 'From malamig', 'sjdnjskxnskxnksxsxnks', '2018-10-06', 'Abby', '56 jsnckjscscnskc', 'Rejected'),
(17, 2, 3, NULL, 'From Bagong Silang', 'sjnsknxksxnksxksxnsk', '2018-10-06', 'Abs', '782 ksklsmcks', 'Submitted');

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
(10, 6, 11);

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
(2, 1, 'Resident'),
(3, 7, 'Barangay'),
(4, 5, 'Barangay'),
(5, 3, 'Barangay');

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
(54, 17, 3, 'Intent Statement');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectcategory`
--

CREATE TABLE `tbl_projectcategory` (
  `int_projcategID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectcategory`
--

INSERT INTO `tbl_projectcategory` (`int_projcategID`, `int_projectID`, `int_categoryID`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 4),
(4, 4, 4),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1);

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
  `decimal_estimatedBudget` decimal(20,2) NOT NULL,
  `date_targetStartApp` date NOT NULL,
  `date_targetEndApp` date NOT NULL,
  `date_targetStartRelease` date NOT NULL,
  `date_targetEndRelease` date NOT NULL,
  `date_targetClosing` date NOT NULL,
  `date_createdDate` date NOT NULL,
  `date_actualStartApp` date DEFAULT NULL,
  `date_actualEndApp` date DEFAULT NULL,
  `date_actualClosing` date DEFAULT NULL,
  `enum_projectStatus` enum('Created','Ongoing','Closed Application','Releasing','Closed Releasing','Finished','Terminated') NOT NULL DEFAULT 'Created',
  `decimal_actualBudget` decimal(20,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectdetail`
--

INSERT INTO `tbl_projectdetail` (`int_projectID`, `int_cityID`, `varchar_projectName`, `text_projectRationale`, `text_projectDescription`, `text_projectObjective`, `int_allotedSlot`, `decimal_estimatedBudget`, `date_targetStartApp`, `date_targetEndApp`, `date_targetStartRelease`, `date_targetEndRelease`, `date_targetClosing`, `date_createdDate`, `date_actualStartApp`, `date_actualEndApp`, `date_actualClosing`, `enum_projectStatus`, `decimal_actualBudget`) VALUES
(1, 1, 'Medicine Giving', 'Residents who really need these medicines will acquire it.', 'To help the residents who have a major or minor health issues.', 'Distribution of medicines for the residents. Limited supplies only.', 1000, '1000000.00', '2018-09-19', '2018-10-31', '2018-11-04', '2018-11-09', '2018-11-14', '2018-09-01', NULL, NULL, NULL, 'Ongoing', NULL),
(2, 1, 'Full body check up and medicine kit giving', 'Nowadays residents have different kind of minor disease.', 'Full body check up for the beneficiaries of this project and medicine kit for them', 'To help the residents, and for them to be ready.', 600, '100000.00', '2018-10-24', '2018-12-01', '2018-12-06', '2018-12-12', '2018-12-25', '2018-10-01', NULL, NULL, NULL, 'Created', NULL),
(3, 1, 'Distribution of School Supplies', 'Determined by the last survey it is true that children in our city can\'t barely have a new school supplies', 'School supplies will be given equally and fairly to the beneficiaries of this project.', 'To help the children/youth.', 1000, '1000000.00', '2018-11-30', '2019-01-15', '2019-01-24', '2019-01-21', '2019-01-08', '2018-10-17', NULL, NULL, NULL, 'Releasing', NULL),
(4, 1, 'Seminar about family planning and freebies giving', 'Due to the last survey, it seems that residents are not aware about family planning.', 'Each beneficiary will be given an equal service for this.', 'To help the residents know about family planning.', 1000, '10000000.00', '2019-01-09', '2019-03-10', '2019-03-20', '2019-03-25', '2019-04-25', '2018-09-25', NULL, NULL, NULL, 'Ongoing', NULL),
(5, 1, 'Feeding Program', 'We observed that the children from orphanages are facing a financial crisis.', 'This project intends to help the poor children on orphanages that are currently facing a financial problems and this is one of the solution that we think to solve the problem.', 'The goal of this project is to provide a temporary food supplies to the orphanage in our barnagay', 2100, '15000000.00', '2019-04-27', '2019-06-01', '2019-06-10', '2019-06-15', '2019-06-25', '2018-10-01', NULL, NULL, NULL, 'Releasing', NULL),
(6, 1, 'Food Supplies Giving', 'The orphanage of our barangay are currently facing financial problems', 'This project intends to help the children on orphanage', 'Aims to give temporary supplies for the orphanage', 1000, '1500000.00', '2019-02-08', '2019-03-15', '2019-03-30', '2019-04-04', '2019-04-10', '2018-09-09', NULL, NULL, NULL, 'Releasing', NULL),
(7, 1, 'Medical check up', 'Due to our observation in the our community about health.', 'Check up for the residents', 'To help the residents ', 1000, '1200000.00', '2019-01-10', '2019-02-28', '2019-03-10', '2019-03-20', '2019-03-30', '2018-09-01', NULL, NULL, NULL, 'Releasing', NULL),
(8, 1, ' Monthly check up   ', 'We propose to have a monthly check up', 'Monthly check up', 'To help the residents', 1000, '1200000.00', '2019-02-01', '2019-04-03', '2019-04-19', '2019-04-25', '2019-05-05', '2018-08-25', NULL, NULL, NULL, 'Releasing', NULL);

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
(12, 3, 'kase napaaaga releasing ng school supplies', 'Start Releasing');

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
(1, 14, 1),
(2, 1, 1),
(3, 14, 2),
(4, 1, 2),
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
(15, 14, 8);

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
  `tbl_unitMeasureID` int(11) NOT NULL,
  `varchar_unitName` varchar(100) NOT NULL,
  `char_unitSymbol` char(10) NOT NULL,
  `enum_unitStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_unitmeasure`
--

INSERT INTO `tbl_unitmeasure` (`tbl_unitMeasureID`, `varchar_unitName`, `char_unitSymbol`, `enum_unitStatus`) VALUES
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
(2, 'barangay@gmail.com', 'barangay', 'Barangay Staff', 'Desiree  Adena', '461 Maligaya St. Addition Hills, Mandaluyong City', '+63 915 765 8765', 'PIO', 'Active'),
(3, 'bagongsilang@gmail.com', 'bagongsilang', 'Barangay Staff', 'Richard Cabria', '53 Ibarra St., Bagong Silang, Mandaluyong City', '+63 908 123 1846', 'PIO\r\n', 'Active'),
(4, 'budget@gmail.com', 'budget', 'Budget Office Staff', 'Jayce Calucin', '19 Maganda St., Buli, Mandaluyong City', '+63 978 765 1827', 'PIO', 'Active'),
(5, 'barangkadrive@gmail.com', 'barangkadrive', 'Barangay Staff', 'Dynnah Nasayao', '14 Mithi St., Barangka Drive, Mandaluyong City', '+63 909 192 8765', 'PIO', 'Active'),
(6, 'hulo@gmail.com', 'hulo', 'Barangay Staff', 'Phillix Marlboro', '2530 Maria Clara St. Hulo, Mandaluyong City', '+63 987 678 5422', 'PIO', 'Active'),
(7, 'malamig@gmail.com', 'malamig', 'Barangay Staff', 'Russel Dizon', '2210 Sinid Ave., Malamig, Mandaluyong City', '+63 912 122 0987', 'PIO', 'Active'),
(8, 'delrosarioabigale@gmail.com', 'BOikg9ah', 'Barangay Staff', 'Abigale Del Rosario', '13 Riverpark, Elizabeth Ave., Addition Hills, Mandaluyong City', '+63 915 666 2933', 'Head', 'Active'),
(9, 'buli@gmail.com', 'buli', 'Barangay Staff', 'Andrea Cruz', '6654 Daniella Ave., Buli, Mandaluyong City', '+63 987 097 1123', 'PIO', 'Active'),
(10, 'cupang@gmail.com', 'cupang', 'Barangay Staff', 'Jullian Encina', '4312 Magsaysay St., Cupang, Mandaluyong City', '+63 911 176 1154', 'PIO', 'Active'),
(11, 'plainview@gmail.com', 'plainview', 'Barangay Staff', 'Kimberly Pagador', 'Sapang Maligaya, Brgy. Plainview, Mandaluyong City', '+63 911 878 8892', 'PIO', 'Active');

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
  ADD PRIMARY KEY (`tbl_unitMeasureID`);

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
  MODIFY `int_budgetID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  MODIFY `int_appbeneID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_barangaybeneficiary`
--
ALTER TABLE `tbl_barangaybeneficiary`
  MODIFY `int_brgybeneID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_barangayreleasing`
--
ALTER TABLE `tbl_barangayreleasing`
  MODIFY `int_brgyreleaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
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
-- AUTO_INCREMENT for table `tbl_city`
--
ALTER TABLE `tbl_city`
  MODIFY `int_cityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  MODIFY `int_expenseID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  MODIFY `int_familybgID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `tbl_financialcontribution`
--
ALTER TABLE `tbl_financialcontribution`
  MODIFY `int_financialconID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `tbl_intentstatement`
--
ALTER TABLE `tbl_intentstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_officialsaccount`
--
ALTER TABLE `tbl_officialsaccount`
  MODIFY `int_officialsuserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  MODIFY `int_proapptypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projcategID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_projectdetail`
--
ALTER TABLE `tbl_projectdetail`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_projectreason`
--
ALTER TABLE `tbl_projectreason`
  MODIFY `int_projectReasonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `tbl_unitmeasure`
--
ALTER TABLE `tbl_unitmeasure`
  MODIFY `tbl_unitMeasureID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
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

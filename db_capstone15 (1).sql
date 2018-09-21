-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2018 at 01:38 PM
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
-- Database: `db_capstone15`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_agency`
--

CREATE TABLE `tbl_agency` (
  `int_agencyID` int(11) NOT NULL,
  `varchar_agencyName` varchar(100) NOT NULL,
  `enum_agencyStatus` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

CREATE TABLE `tbl_announcement` (
  `int_announcementID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `varchar_announcementTitle` varchar(100) NOT NULL,
  `text_announcementContent` text NOT NULL,
  `date_createdDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicantbenefit`
--

CREATE TABLE `tbl_applicantbenefit` (
  `int_appbeneID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_benefitName` text NOT NULL,
  `int_benefitQuantity` int(11) NOT NULL
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
  `datetime_receivedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_application`
--

INSERT INTO `tbl_application` (`int_applicationID`, `int_barangayID`, `int_projectID`, `enum_applicationType`, `enum_applicationStatus`, `datetime_receivedDate`) VALUES
(32, 14, 31, 'Resident', 'Received', '2018-09-01 00:00:00'),
(33, 14, 31, 'Resident', 'Pending', NULL),
(34, 14, 31, 'Resident', 'Received', '2018-09-01 00:00:00'),
(35, 10, 31, 'Resident', 'Pending', NULL),
(36, 9, 33, 'Resident', 'Pending', NULL),
(40, 9, 33, 'Resident', 'Pending', NULL),
(41, 9, 33, 'Resident', 'Pending', NULL),
(43, 9, 36, 'Barangay', 'Pending', NULL),
(44, 9, 33, 'Resident', 'Pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationrequirement`
--

CREATE TABLE `tbl_applicationrequirement` (
  `int_appreqID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `text_requirementPath` text NOT NULL,
  `enum_appreqStatus` enum('Passed','Not Passed') NOT NULL DEFAULT 'Passed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_applicationrequirement`
--

INSERT INTO `tbl_applicationrequirement` (`int_appreqID`, `int_applicationID`, `int_requirementID`, `text_requirementPath`, `enum_appreqStatus`) VALUES
(24, 32, 28, '', 'Passed'),
(25, 33, 28, '', 'Passed'),
(26, 34, 28, '', 'Passed'),
(27, 35, 28, '', 'Passed'),
(28, 36, 28, '', 'Passed'),
(33, 40, 28, '', 'Passed'),
(34, 41, 28, '', 'Passed'),
(35, 44, 28, '', 'Passed');

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
(9, 2, 'Addition Hills', '226-6666', 'Blk. 12 Welfareville Compound', 'Active'),
(10, 2, 'Bagong Silang', '514-8312/9953354', 'cor. J. Luna Street', 'Active'),
(11, 2, 'Barangka Drive', '531-6544', '775 Barangka Drive cor. Sgt. Bumatay', 'Active'),
(13, 2, 'Hulo', '534-5056/535-2505', 'Coronado Street', 'Active'),
(14, 2, 'Malamig', '533-1319', '555 Cresta Circle Makiling Street', 'Active'),
(42, 2, 'Plainview', '534-1874', '40 Malaya Street', 'Active'),
(43, 2, 'Buli', '092-7198', '768 Manda', 'Active');

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
(43, 20, 'Because');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangayuser`
--

CREATE TABLE `tbl_barangayuser` (
  `int_brgyuserID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangayuser`
--

INSERT INTO `tbl_barangayuser` (`int_brgyuserID`, `int_barangayID`, `int_userID`) VALUES
(1, 9, 16),
(2, 9, 22),
(3, 14, 21);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_beneficiary`
--

CREATE TABLE `tbl_beneficiary` (
  `int_beneficiaryID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(100) NOT NULL,
  `enum_fieldConrstraint` enum('Age','Gender') DEFAULT NULL,
  `varchar_constraintEquation` varchar(100) DEFAULT NULL,
  `enum_beneficiaryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_beneficiary`
--

INSERT INTO `tbl_beneficiary` (`int_beneficiaryID`, `varchar_beneficiaryName`, `enum_fieldConrstraint`, `varchar_constraintEquation`, `enum_beneficiaryStatus`) VALUES
(13, 'Senior Citizen', 'Age', '60 >=', 'Active'),
(14, 'Person with Disability (PWD)', NULL, NULL, 'Active'),
(15, 'College Student', NULL, NULL, 'Active'),
(16, 'Women and girls', 'Gender', 'Female', 'Active'),
(17, 'Men', 'Gender', 'Male', 'Active'),
(18, 'Elementary Students', NULL, NULL, 'Active'),
(19, 'Mother', 'Gender', 'Female', 'Active'),
(20, 'Pregnant Women', 'Gender', 'Female', 'Active'),
(21, 'Households', NULL, NULL, 'Active'),
(22, 'Retired worker', NULL, NULL, 'Active'),
(23, 'Youths', NULL, NULL, 'Active'),
(24, 'Disaster Victims', NULL, NULL, 'Active');

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
(6, 'Health', 'Active'),
(7, 'Monetary', 'Active'),
(8, 'Disaster Management', 'Active'),
(10, 'Education', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_checkapproval`
--

CREATE TABLE `tbl_checkapproval` (
  `int_projectID` int(11) NOT NULL,
  `varchar_fraction` varchar(100) NOT NULL,
  `varchar_bankInfo` varchar(100) NOT NULL,
  `int_routingNumber` int(9) NOT NULL,
  `int_accountNumber` int(11) NOT NULL,
  `int_checkNumber` int(11) NOT NULL,
  `varchar_senderName` varchar(100) NOT NULL,
  `varchar_receiverName` varchar(100) NOT NULL,
  `decimal_amount` decimal(15,2) DEFAULT NULL,
  `date_checkDate` date NOT NULL,
  `enum_checkAppStatus` enum('Pending','Claimed') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_checkapproval`
--

INSERT INTO `tbl_checkapproval` (`int_projectID`, `varchar_fraction`, `varchar_bankInfo`, `int_routingNumber`, `int_accountNumber`, `int_checkNumber`, `varchar_senderName`, `varchar_receiverName`, `decimal_amount`, `date_checkDate`, `enum_checkAppStatus`) VALUES
(34, '12345612312', 'landbank', 123456789, 222333, 123654, 'Abigale', '', '1500000.00', '2018-09-12', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_city`
--

CREATE TABLE `tbl_city` (
  `int_cityID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `varchar_officeName` varchar(100) NOT NULL,
  `varchar_cityName` varchar(100) NOT NULL,
  `text_cityAddress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`int_cityID`, `int_userID`, `varchar_officeName`, `varchar_cityName`, `text_cityAddress`) VALUES
(2, 15, 'Office of the Congresswomen Alexandria Gonzales', 'Mandaluyong City', '315 Maysilo Cir, Mandaluyong, 1550 Metro Manila');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_expense`
--

CREATE TABLE `tbl_expense` (
  `int_expenseID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_expenseDescription` text NOT NULL,
  `int_quantity` int(11) NOT NULL,
  `decimal_unitPrice` decimal(15,2) NOT NULL,
  `decimal_estimatedAmount` decimal(15,2) NOT NULL,
  `decimal_actualAmount` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_familybackground`
--

CREATE TABLE `tbl_familybackground` (
  `int_familybgID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_familyName` varchar(100) NOT NULL,
  `varchar_familyRelationship` varchar(100) NOT NULL,
  `enum_civilStatus` enum('Single','Married','Widowed','Divorced/Separated','Unknown') NOT NULL,
  `text_educationalAttainment` text NOT NULL,
  `varchar_occupation` varchar(100) NOT NULL,
  `enum_classWorker` enum('Works for private household','Works for private establishment','Works for government agency/corporation','Self-employed without any employee','Employer in own family-operated farm/business','Works with pay on own family-operated farm/business','Works withoyt pay on own family-operated farm/business','Unemployed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_financialcontribution`
--

CREATE TABLE `tbl_financialcontribution` (
  `int_financialconID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `text_finconPurpose` text NOT NULL,
  `varchar_relationship` varchar(11) NOT NULL,
  `enum_frequency` enum('Monthly','Quarterly','Semi Annual','Annual','Irregular') NOT NULL,
  `decimal_annualContribution` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_householdapplication`
--

CREATE TABLE `tbl_householdapplication` (
  `int_applicationID` int(11) NOT NULL,
  `decimal_totalAnnualIncome` decimal(15,2) NOT NULL,
  `enum_houseStatus` enum('Owned','Rent','Rent to own','Squater') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `enum_notifInfo` enum('Project Application','Problem Statement','Project Proposal','Project Releasing','Announcement','Proposal Revision') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `int_applicantResidency` int(11) NOT NULL,
  `enum_civilStatus` enum('Single','Married','Widow','Widower','Separated') NOT NULL,
  `varchar_contactNumber` varchar(50) DEFAULT NULL,
  `varchar_emailAddress` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_personalinformation`
--

INSERT INTO `tbl_personalinformation` (`int_applicationID`, `varchar_firstName`, `varchar_middleName`, `varchar_lastName`, `date_birthDate`, `enum_gender`, `int_applicantResidency`, `enum_civilStatus`, `varchar_contactNumber`, `varchar_emailAddress`) VALUES
(32, 'Lander Dashiell', 'Del Rosario', 'Manabat', '2007-10-10', 'Male', 2007, 'Single', '(+63) 122-262-6226', 'dash@gmail.com'),
(33, 'Kenji', 'Del Rosario', 'Ilagan', '2006-08-25', 'Male', 2006, 'Single', '(+63) 915-662-8888', 'kenji@gmail.com'),
(34, 'Maricar', '', 'Manabat', '2007-06-22', 'Female', 2007, 'Single', '(+63) 915-624-8222', 'maricar@gmail.com'),
(35, 'Amy', 'Tiya', 'Cruz', '2008-07-28', 'Female', 2008, 'Single', '(+63) 916-562-2523', 'tiya@gmail.com'),
(36, 'Allen', '', 'Toquer', '2008-08-10', 'Male', 2008, 'Single', '(+63) 915-326-2485', 'allen@gmail.com'),
(40, 'Allen', '', 'Tuq', '1995-02-10', 'Male', 1995, 'Single', '(+63) 965-516-1566', 'tuq@gmail.com'),
(41, 'Alfred', 'Wow', 'Men', '1995-02-10', 'Male', 1995, 'Single', '(+63) 595-612-5615', 'al@gmail.com'),
(44, 'Marlon', 'Napiza', 'Del Rosario', '1969-05-16', 'Male', 1969, 'Single', '(+63) 916-548-4949', 'mar@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_problemstatement`
--

CREATE TABLE `tbl_problemstatement` (
  `int_statementID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL,
  `int_projectID` int(11) DEFAULT NULL,
  `varchar_statementTitle` varchar(100) NOT NULL,
  `text_statementContent` text NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_problemStatus` enum('Submitted','Acknowledged','Rejected','Solved','Proposed') NOT NULL DEFAULT 'Submitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_problemstatement`
--

INSERT INTO `tbl_problemstatement` (`int_statementID`, `int_barangayID`, `int_categoryID`, `int_projectID`, `varchar_statementTitle`, `text_statementContent`, `date_createdDate`, `enum_problemStatus`) VALUES
(42, 9, 6, 31, 'Full body check up and medicine kit giving', 'Due to recent outbreak of fever', '2018-09-01', 'Proposed'),
(43, 14, 7, NULL, 'Request for money', 'Due to recent crisis', '2018-09-01', 'Rejected'),
(44, 10, 10, 32, 'Request for school supplies', 'Children\'s must need in school', '2018-09-01', 'Proposed'),
(45, 13, 8, NULL, 'Distribution of goods', 'Due to recent fire incident, supplies are given but it is insufficient.', '2018-09-01', 'Submitted'),
(46, 9, 10, 33, 'Orientation to Family Planning', 'Due to the last survey, it seems that residents are not aware about family planning.', '2018-09-01', 'Proposed'),
(47, 9, 6, 35, 'Food Supply', 'Many residents don\'t eat', '2018-09-01', 'Proposed'),
(48, 9, 6, 36, 'Medical Check Up', 'Due to recent events in the barangay we observe that most of our residents are getting sick', '2018-09-01', 'Proposed'),
(49, 9, 10, NULL, 'eyyyyyyyyyyyyyyyyyyy', 'eyyyyyyyyyy', '2018-09-12', 'Acknowledged'),
(50, 14, 8, NULL, 'eyyyyyyyyy', 'xxwxwxwxwxw', '2018-09-12', 'Submitted'),
(51, 9, 6, NULL, 'hak hakhak', 'hakhakhakhak', '2018-09-17', 'Submitted');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `int_projectID` int(11) NOT NULL,
  `date_startApplication` date DEFAULT NULL,
  `date_endApplication` date DEFAULT NULL,
  `date_startReleaseDate` date DEFAULT NULL,
  `date_endReleaseDate` date DEFAULT NULL,
  `date_projectClose` date DEFAULT NULL,
  `enum_projectStatus` enum('Approved','Ongoing','Closed','Releasing','Finished','Terminated','ClosedRel') NOT NULL DEFAULT 'Approved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`int_projectID`, `date_startApplication`, `date_endApplication`, `date_startReleaseDate`, `date_endReleaseDate`, `date_projectClose`, `enum_projectStatus`) VALUES
(31, '2018-09-01', '2018-09-21', '2018-10-05', NULL, NULL, 'ClosedRel'),
(33, '2018-09-01', '2018-09-21', '2018-10-05', NULL, NULL, 'Ongoing'),
(35, '2018-09-01', '2018-10-21', '2018-10-31', NULL, NULL, 'Ongoing'),
(36, '2018-09-01', '2018-09-21', '2018-10-05', NULL, NULL, 'Ongoing');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectagency`
--

CREATE TABLE `tbl_projectagency` (
  `int_projagenID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_agencyID` int(11) NOT NULL
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
(1, 35, 'Household'),
(2, 36, 'Barangay'),
(4, 33, 'Resident'),
(5, 33, 'Household');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectbeneficiary`
--

CREATE TABLE `tbl_projectbeneficiary` (
  `int_projbeneID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_beneficiaryID` int(11) NOT NULL,
  `enum_beneficiaryLink` enum('Problem Statement','Project Proposal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectbeneficiary`
--

INSERT INTO `tbl_projectbeneficiary` (`int_projbeneID`, `int_projectID`, `int_beneficiaryID`, `enum_beneficiaryLink`) VALUES
(21, 31, 23, 'Project Proposal'),
(22, 32, 23, 'Project Proposal'),
(23, 33, 23, 'Project Proposal'),
(24, 35, 23, 'Project Proposal'),
(25, 36, 23, 'Project Proposal');

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
(25, 31, 6),
(26, 32, 10),
(27, 33, 10),
(28, 35, 6),
(29, 36, 6);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectlocation`
--

CREATE TABLE `tbl_projectlocation` (
  `int_proglocID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `enum_locationTarget` enum('City','Barangay') NOT NULL,
  `int_locationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectproposal`
--

CREATE TABLE `tbl_projectproposal` (
  `int_projectID` int(11) NOT NULL,
  `int_cityID` int(11) NOT NULL,
  `varchar_projectName` varchar(100) NOT NULL,
  `varchar_projectRationale` varchar(100) NOT NULL,
  `text_projectDescription` text NOT NULL,
  `text_projectObjective` text NOT NULL,
  `int_allotedSlot` int(11) NOT NULL,
  `decimal_estimatedBudget` decimal(10,0) NOT NULL,
  `date_targetStartApp` date NOT NULL,
  `date_targetEndApp` date NOT NULL,
  `date_targetStartRelease` date NOT NULL,
  `date_targetEndRelease` date NOT NULL,
  `date_targetClosing` date NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_proposalStatus` enum('Pending','Approved','Rejected','Revision') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectproposal`
--

INSERT INTO `tbl_projectproposal` (`int_projectID`, `int_cityID`, `varchar_projectName`, `varchar_projectRationale`, `text_projectDescription`, `text_projectObjective`, `int_allotedSlot`, `decimal_estimatedBudget`, `date_targetStartApp`, `date_targetEndApp`, `date_targetStartRelease`, `date_targetEndRelease`, `date_targetClosing`, `date_createdDate`, `enum_proposalStatus`) VALUES
(13, 2, 'Medicine Giving', 'Residents who really need these medicines will acquire it.', 'To help the residents who have a major or minor health issues.', 'Distribution of medicines for the residents. Limited supplies only.', 0, '1000000', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '2018-08-28', 'Pending'),
(31, 2, 'Full body check up and medicine kit giving', 'Nowadays residents have different kind of minor disease.', 'Full body check up for the beneficiaries of this project and medicine kit for them', 'To help the residents, and for them to be ready.', 0, '100000', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '2018-09-01', 'Approved'),
(32, 2, 'Distribution of School Supplies', 'Determined by the last survey it is true that children in our city can\'t barely have a new school su', 'School supplies will be given equally and fairly to the beneficiaries of this project.', 'To help the children/youth.', 0, '1000000', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '2018-09-01', 'Pending'),
(33, 2, 'Seminar about family planning and freebies giving', 'Due to the last survey, it seems that residents are not aware about family planning.', 'Each beneficiary will be given an equal service for this.', 'To help the residents know about family planning.', 0, '1000000', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '2018-09-01', 'Approved'),
(34, 2, 'Feeding Program', 'We observed that the children from orphanages are facing a financial crisis.', 'This project intends to help the poor children on orphanages that are currently facing a financial problems and this is one of the solution that we think to solve the problem.', 'The goal of this project is to provide a temporary food supplies to the orphanage in our barnagay', 0, '150000', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '2018-09-01', 'Approved'),
(35, 2, 'Food Supplies Gicing', 'The orphanage of our barangay are currently facing financial problems', 'This project intends to help the children on orphanage', 'Aims to give temporary supplies for the orphanage', 0, '150000', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '2018-09-01', 'Approved'),
(36, 2, 'Medical check up', 'Due to our observation in the our community about health.', 'Check up for the residents', 'To help the residents ', 0, '1000000', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '2018-09-01', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectreason`
--

CREATE TABLE `tbl_projectreason` (
  `int_projectReasonID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_projectReason` text NOT NULL,
  `date_projectDateStarted` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(23, 28, 31),
(24, 28, 32),
(25, 28, 33),
(26, 17, 35),
(27, 28, 36),
(28, 30, 36);

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
(17, 'Birth Certificate', 'Active'),
(18, 'Transcript of Records/ Diploma', 'Active'),
(19, 'NBI Clearance', 'Active'),
(20, 'SSS', 'Active'),
(21, 'Pag-IBIG', 'Active'),
(22, 'Philhealth', 'Active'),
(23, 'BIR forms', 'Active'),
(24, 'Valid Driver’s License', 'Active'),
(25, 'Valid Passport', 'Active'),
(26, 'Baptismal Certificate', 'Active'),
(27, 'Marriage Certificate', 'Active'),
(28, 'Barangay Certificate of Residency', 'Active'),
(29, 'Utility Bill/s', 'Active'),
(30, 'Valid ID', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_revisioncomment`
--

CREATE TABLE `tbl_revisioncomment` (
  `int_revisionID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `text_commentContent` text NOT NULL,
  `enum_revisionStatus` enum('Pending','Revised') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL,
  `varchar_userEmailAddress` varchar(100) NOT NULL,
  `varchar_userPassword` varchar(100) NOT NULL,
  `enum_userType` enum('Admin','Barangay Staff','Office Staff','Budget Office Staff') NOT NULL DEFAULT 'Barangay Staff',
  `text_userName` text NOT NULL,
  `text_userAddress` text NOT NULL,
  `varchar_userContact` varchar(100) NOT NULL,
  `varchar_userPosition` varchar(100) NOT NULL,
  `enum_accountStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `varchar_userEmailAddress`, `varchar_userPassword`, `enum_userType`, `text_userName`, `text_userAddress`, `varchar_userContact`, `varchar_userPosition`, `enum_accountStatus`) VALUES
(14, 'admin@gmail.com', 'admin', 'Admin', '', '', '', '', 'Active'),
(15, 'office@gmail.com', 'office', 'Office Staff', '', '', '', '', 'Active'),
(16, 'barangay@gmail.com', 'barangay', 'Barangay Staff', '', '', '', '', 'Active'),
(17, 'budget@gmail.com', 'budget', 'Budget Office Staff', '', '', '', '', 'Active'),
(18, 'bagongsilang@gmail.com', 'bagongsilang', 'Barangay Staff', '', '', '', '', 'Active'),
(19, 'barangkadrive@gmail.com', 'barangkadrive', 'Barangay Staff', '', '', '', '', 'Active'),
(20, 'hulo@gmail.com', 'hulo', 'Barangay Staff', '', '', '', '', 'Active'),
(21, 'malamig@gmail.com', 'malamig', 'Barangay Staff', '', '', '', '', 'Active'),
(22, 'delrosarioabigale@gmail.com', 'BOikg9ah', 'Barangay Staff', 'Abigale Del Rosario', '13 Addition Hills', '09156662933', 'Head', 'Active'),
(23, 'undefined', 'undefined', 'Barangay Staff', 'undefined', 'undefined', 'undefined', 'undefined', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_agency`
--
ALTER TABLE `tbl_agency`
  ADD PRIMARY KEY (`int_agencyID`);

--
-- Indexes for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD PRIMARY KEY (`int_announcementID`),
  ADD KEY `user_idx` (`int_userID`);

--
-- Indexes for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  ADD PRIMARY KEY (`int_appbeneID`),
  ADD KEY `appbene_projID` (`int_projectID`);

--
-- Indexes for table `tbl_application`
--
ALTER TABLE `tbl_application`
  ADD PRIMARY KEY (`int_applicationID`),
  ADD KEY `appbrgyID_idx` (`int_barangayID`),
  ADD KEY `appprojID_idx` (`int_projectID`);

--
-- Indexes for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  ADD PRIMARY KEY (`int_appreqID`),
  ADD KEY `appID_idx` (`int_applicationID`),
  ADD KEY `appreqID_idx` (`int_requirementID`);

--
-- Indexes for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  ADD PRIMARY KEY (`int_barangayID`),
  ADD KEY `cityID_idx` (`int_cityID`);

--
-- Indexes for table `tbl_barangayapplication`
--
ALTER TABLE `tbl_barangayapplication`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_barangayuser`
--
ALTER TABLE `tbl_barangayuser`
  ADD PRIMARY KEY (`int_brgyuserID`),
  ADD KEY `brgyuser_brgyID` (`int_barangayID`),
  ADD KEY `brgyuser_userID` (`int_userID`);

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
-- Indexes for table `tbl_checkapproval`
--
ALTER TABLE `tbl_checkapproval`
  ADD PRIMARY KEY (`int_projectID`),
  ADD KEY `projcheck_idx` (`int_projectID`);

--
-- Indexes for table `tbl_city`
--
ALTER TABLE `tbl_city`
  ADD PRIMARY KEY (`int_cityID`),
  ADD KEY `cityuserID_idx` (`int_userID`);

--
-- Indexes for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  ADD PRIMARY KEY (`int_expenseID`),
  ADD KEY `expactprojID_idx` (`int_projectID`);

--
-- Indexes for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  ADD PRIMARY KEY (`int_familybgID`),
  ADD KEY `appfambg_idx` (`int_applicationID`);

--
-- Indexes for table `tbl_financialcontribution`
--
ALTER TABLE `tbl_financialcontribution`
  ADD PRIMARY KEY (`int_financialconID`),
  ADD KEY `houseapp_idx` (`int_applicationID`);

--
-- Indexes for table `tbl_householdapplication`
--
ALTER TABLE `tbl_householdapplication`
  ADD PRIMARY KEY (`int_applicationID`),
  ADD KEY `houseapp_idx` (`int_applicationID`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`int_notifID`),
  ADD KEY `receiveuserID_idx` (`int_notifReceiverID`),
  ADD KEY `senduserID_idx` (`int_notifSenderID`),
  ADD KEY `statprojappID_idx` (`int_linkID`);

--
-- Indexes for table `tbl_personalinformation`
--
ALTER TABLE `tbl_personalinformation`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  ADD PRIMARY KEY (`int_statementID`),
  ADD KEY `probbrgyID_idx` (`int_barangayID`),
  ADD KEY `probcategID_idx` (`int_categoryID`),
  ADD KEY `probprojID_idx` (`int_projectID`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`int_projectID`);

--
-- Indexes for table `tbl_projectagency`
--
ALTER TABLE `tbl_projectagency`
  ADD PRIMARY KEY (`int_projagenID`);

--
-- Indexes for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  ADD PRIMARY KEY (`int_proapptypeID`);

--
-- Indexes for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  ADD PRIMARY KEY (`int_projbeneID`),
  ADD KEY `pbprojID_idx` (`int_projectID`),
  ADD KEY `pbbeneID_idx` (`int_beneficiaryID`);

--
-- Indexes for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  ADD PRIMARY KEY (`int_projcategID`),
  ADD KEY `pcprojID_idx` (`int_projectID`),
  ADD KEY `pccategID_idx` (`int_categoryID`);

--
-- Indexes for table `tbl_projectlocation`
--
ALTER TABLE `tbl_projectlocation`
  ADD PRIMARY KEY (`int_proglocID`),
  ADD KEY `plprojID_idx` (`int_projectID`),
  ADD KEY `pllocID_idx` (`int_locationID`);

--
-- Indexes for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  ADD PRIMARY KEY (`int_projectID`),
  ADD KEY `propcity|ID_idx` (`int_cityID`);

--
-- Indexes for table `tbl_projectreason`
--
ALTER TABLE `tbl_projectreason`
  ADD PRIMARY KEY (`int_projectReasonID`);

--
-- Indexes for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  ADD PRIMARY KEY (`int_projreqID`),
  ADD KEY `propreqID_idx` (`int_projectID`),
  ADD KEY `reqpropID_idx` (`int_requirementID`);

--
-- Indexes for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  ADD PRIMARY KEY (`int_requirementID`);

--
-- Indexes for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  ADD PRIMARY KEY (`int_revisionID`),
  ADD KEY `revpropID_idx` (`int_projectID`);

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
-- AUTO_INCREMENT for table `tbl_agency`
--
ALTER TABLE `tbl_agency`
  MODIFY `int_agencyID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  MODIFY `int_announcementID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  MODIFY `int_appbeneID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `tbl_barangayuser`
--
ALTER TABLE `tbl_barangayuser`
  MODIFY `int_brgyuserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_beneficiary`
--
ALTER TABLE `tbl_beneficiary`
  MODIFY `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `int_categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `tbl_city`
--
ALTER TABLE `tbl_city`
  MODIFY `int_cityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  MODIFY `int_expenseID` int(11) NOT NULL AUTO_INCREMENT;
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
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `tbl_projectagency`
--
ALTER TABLE `tbl_projectagency`
  MODIFY `int_projagenID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  MODIFY `int_proapptypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projcategID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `tbl_projectlocation`
--
ALTER TABLE `tbl_projectlocation`
  MODIFY `int_proglocID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  MODIFY `int_revisionID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD CONSTRAINT `user` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_applicantbenefit`
--
ALTER TABLE `tbl_applicantbenefit`
  ADD CONSTRAINT `tbl_applicantbenefit_ibfk_1` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_application`
--
ALTER TABLE `tbl_application`
  ADD CONSTRAINT `appbrgyID` FOREIGN KEY (`int_barangayID`) REFERENCES `tbl_barangay` (`int_barangayID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `appprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_project` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  ADD CONSTRAINT `appID` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `appreqID` FOREIGN KEY (`int_requirementID`) REFERENCES `tbl_requirement` (`int_requirementID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  ADD CONSTRAINT `brgycityID` FOREIGN KEY (`int_cityID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_barangayapplication`
--
ALTER TABLE `tbl_barangayapplication`
  ADD CONSTRAINT `tbl_barangayapplication_ibfk_1` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_barangayuser`
--
ALTER TABLE `tbl_barangayuser`
  ADD CONSTRAINT `tbl_barangayuser_ibfk_1` FOREIGN KEY (`int_barangayID`) REFERENCES `tbl_barangay` (`int_barangayID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_barangayuser_ibfk_2` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_checkapproval`
--
ALTER TABLE `tbl_checkapproval`
  ADD CONSTRAINT `projcheck` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_city`
--
ALTER TABLE `tbl_city`
  ADD CONSTRAINT `cityuserID` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  ADD CONSTRAINT `expactprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `expestprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  ADD CONSTRAINT `tbl_familybackground_ibfk_1` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_householdapplication` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_householdapplication`
--
ALTER TABLE `tbl_householdapplication`
  ADD CONSTRAINT `houseapp` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD CONSTRAINT `receiveuserID` FOREIGN KEY (`int_notifReceiverID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `senduserID` FOREIGN KEY (`int_notifSenderID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `statannounceID` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_announcement` (`int_announcementID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `statnewprojID` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_project` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `statprobID` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_problemstatement` (`int_statementID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `statprojappID` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `statprojpropID` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `statrevID` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_revisioncomment` (`int_revisionID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_personalinformation`
--
ALTER TABLE `tbl_personalinformation`
  ADD CONSTRAINT `appinfoID` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_personalinformation_ibfk_1` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  ADD CONSTRAINT `probbrgyID` FOREIGN KEY (`int_barangayID`) REFERENCES `tbl_barangay` (`int_barangayID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `probcategID` FOREIGN KEY (`int_categoryID`) REFERENCES `tbl_category` (`int_categoryID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `probprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD CONSTRAINT `projpropID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  ADD CONSTRAINT `pbbeneID` FOREIGN KEY (`int_beneficiaryID`) REFERENCES `tbl_beneficiary` (`int_beneficiaryID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `pbprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  ADD CONSTRAINT `pccategID` FOREIGN KEY (`int_categoryID`) REFERENCES `tbl_category` (`int_categoryID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `pcprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectlocation`
--
ALTER TABLE `tbl_projectlocation`
  ADD CONSTRAINT `plbrgylocID` FOREIGN KEY (`int_locationID`) REFERENCES `tbl_barangay` (`int_barangayID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `plcitylocID` FOREIGN KEY (`int_locationID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `plprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  ADD CONSTRAINT `propcity|ID` FOREIGN KEY (`int_cityID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  ADD CONSTRAINT `prprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `prreqID` FOREIGN KEY (`int_requirementID`) REFERENCES `tbl_requirement` (`int_requirementID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  ADD CONSTRAINT `revpropID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

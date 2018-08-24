-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2018 at 04:00 AM
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
-- Database: `db_capstone8`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accountdetail`
--

CREATE TABLE `tbl_accountdetail` (
  `int_applicationID` int(11) NOT NULL,
  `varchar_gsisNumber` varchar(20) DEFAULT NULL,
  `varchar_sssNumber` varchar(20) DEFAULT NULL,
  `varchar_tinNumber` varchar(20) DEFAULT NULL,
  `varchar_crnNumber` varchar(20) DEFAULT NULL,
  `varchar_philHealthNumber` varchar(20) DEFAULT NULL,
  `varchar_hdmfNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_address`
--

CREATE TABLE `tbl_address` (
  `int_addressID` int(11) NOT NULL,
  `varchar_numberBlockLot` varchar(100) DEFAULT NULL,
  `varchar_streetAvenueRoad` varchar(100) DEFAULT NULL,
  `varchar_villageSubdivision` varchar(100) DEFAULT NULL,
  `varchar_purokSitioZone` varchar(100) DEFAULT NULL,
  `enum_addressType` enum('Permanent','Temporary') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_address`
--

INSERT INTO `tbl_address` (`int_addressID`, `varchar_numberBlockLot`, `varchar_streetAvenueRoad`, `varchar_villageSubdivision`, `varchar_purokSitioZone`, `enum_addressType`) VALUES
(1, '315', 'Maysilo', 'Cir', NULL, 'Permanent'),
(2, 'Blk 12', NULL, 'Welfareville Compound\r\n', NULL, 'Permanent'),
(3, 'cor. J. ', 'Luna Street', '', '', 'Permanent'),
(4, '775 ', 'Barangka Drive', 'cor. Sgt.', ' Bumatay', 'Permanent');

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
-- Table structure for table `tbl_application`
--

CREATE TABLE `tbl_application` (
  `int_applicationID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `enum_applicationStatus` enum('Pending','Approved','Rejected','Received','') NOT NULL DEFAULT 'Pending',
  `datetime_receivedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_application`
--

INSERT INTO `tbl_application` (`int_applicationID`, `int_barangayID`, `int_projectID`, `enum_applicationStatus`, `datetime_receivedDate`) VALUES
(1, 3, 3, 'Pending', '0000-00-00 00:00:00'),
(2, 3, 3, 'Approved', '0000-00-00 00:00:00'),
(6, 3, 3, 'Pending', '0000-00-00 00:00:00'),
(7, 3, 1, 'Approved', '2018-08-23 06:34:13'),
(8, 3, 3, 'Pending', '0000-00-00 00:00:00'),
(24, 3, 1, 'Approved', '2018-08-23 06:34:13');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationcode`
--

CREATE TABLE `tbl_applicationcode` (
  `int_applicationID` int(11) NOT NULL,
  `char_applicationCode` char(10) NOT NULL,
  `enum_releasingStatus` enum('Received','Pending','Not Received') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_applicationcode`
--

INSERT INTO `tbl_applicationcode` (`int_applicationID`, `char_applicationCode`, `enum_releasingStatus`) VALUES
(1, 'hello25', 'Pending'),
(2, 'HI123', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationrequirement`
--

CREATE TABLE `tbl_applicationrequirement` (
  `int_appreqID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_requirement` int(11) NOT NULL,
  `enum_appreqStatus` enum('Passed','Not Passed') NOT NULL DEFAULT 'Passed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_applicationrequirement`
--

INSERT INTO `tbl_applicationrequirement` (`int_appreqID`, `int_applicationID`, `int_requirement`, `enum_appreqStatus`) VALUES
(7, 20, 14, 'Passed'),
(8, 20, 16, 'Passed'),
(14, 24, 16, 'Passed'),
(15, 25, 16, 'Passed');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_award`
--

CREATE TABLE `tbl_award` (
  `int_awardID` int(11) NOT NULL,
  `varchar_awardName` varchar(100) NOT NULL,
  `enum_awardStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_award`
--

INSERT INTO `tbl_award` (`int_awardID`, `varchar_awardName`, `enum_awardStatus`) VALUES
(1, 'Good Financial Housekeeping', 'Active'),
(2, 'Good Local Governance\r\n', 'Active'),
(3, 'Outstanding Barangay Legislative Services', 'Active'),
(4, 'Most Functional Barangay-Based Institutions', 'Active'),
(5, 'Barangay’s with the Best Practices and Innovations', 'Active'),
(6, 'Huwarang Pamamahala', 'Active'),
(7, 'Dangal ng Lungsod', 'Active'),
(8, 'Gawad Kalasag', 'Active'),
(9, 'Best Implementor on Environmental Management', 'Active'),
(10, 'Seal of Child-Friendly Local Governance', 'Active'),
(11, 'Best Local Disaster Risk Reduction Management Council', 'Active'),
(12, 'Best Practices on Environmental Management\r\n', 'Active'),
(13, 'Certificate of Recognition for Peace and Order', 'Active'),
(14, 'Cleanest and Greenest Baramgay', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangay`
--

CREATE TABLE `tbl_barangay` (
  `int_barangayID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `int_cityID` int(11) NOT NULL,
  `varchar_barangayName` varchar(100) NOT NULL,
  `varchar_barangayContact` varchar(100) NOT NULL,
  `enum_barangayStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangay`
--

INSERT INTO `tbl_barangay` (`int_barangayID`, `int_userID`, `int_cityID`, `varchar_barangayName`, `varchar_barangayContact`, `enum_barangayStatus`) VALUES
(1, 3, 1, 'Addition Hills', '226-6666', 'Active'),
(2, 5, 1, 'Bagong Silang', '514-8312/9953354', 'Inactive'),
(3, 6, 1, 'Barangka Drive', '531-6544', 'Active'),
(4, 7, 1, 'Hulo', '534-5056/535-2505', 'Active'),
(5, 8, 1, 'Malamig', '533-1319', 'Active'),
(8, 13, 1, 'Buli', '09156662933', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangayaward`
--

CREATE TABLE `tbl_barangayaward` (
  `int_bgryAwardID` int(11) NOT NULL,
  `int_awardID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `year_yearAwarded` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangayaward`
--

INSERT INTO `tbl_barangayaward` (`int_bgryAwardID`, `int_awardID`, `int_barangayID`, `year_yearAwarded`) VALUES
(1, 1, 1, 2014),
(2, 3, 1, 2014),
(3, 1, 2, 2016),
(4, 13, 1, 2015),
(5, 4, 3, 2015),
(6, 6, 5, 2017);

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
(3, 'College Student', 'Inactive'),
(4, 'Women and girls', 'Active'),
(5, 'Men', 'Active'),
(6, 'Elementary Students', 'Active'),
(7, 'Mother', 'Active'),
(8, 'Pregnant Women\r\n', 'Active'),
(9, 'Households', 'Active'),
(10, 'Retired worker', 'Active'),
(11, 'Youths', 'Active'),
(12, 'Disaster Victims\r\n', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `int_categoryID` int(11) NOT NULL,
  `varchar_categoryName` varchar(100) NOT NULL,
  `text_categoryDescription` text NOT NULL,
  `enum_categoryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`int_categoryID`, `varchar_categoryName`, `text_categoryDescription`, `enum_categoryStatus`) VALUES
(1, 'Health', 'It is a set of actions developed by a Government with the aim of improving the health conditions of the population. So the authorities promote prevention campaigns and to ensure democratic and mass access to medical centers. ', 'Active'),
(2, 'Monetary', 'A value in currency that a person, business, or the market places on a resource, product, or service. In fact, most goods and services in our modern economy are priced based on monetary value. ', 'Active'),
(3, 'Disaster Management ', 'Disaster Management can be defined as the organization and management of resources and responsibilities for dealing with all humanitarian aspects of emergencies, in particular preparedness, response and recovery in order to lessen the impact of disasters.', 'Active'),
(5, 'Education', 'A project in education is a collaborative process, frequently involving different teacher and educational staff, that is carefully planned to achieve a particular aim of learning.', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_city`
--

CREATE TABLE `tbl_city` (
  `int_cityID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `varchar_officeName` varchar(100) NOT NULL,
  `varchar_cityName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`int_cityID`, `int_userID`, `varchar_officeName`, `varchar_cityName`) VALUES
(1, 2, 'Office of the Congresswomen Alexandria Gonzales', 'Mandaluyong City');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_educationalbg`
--

CREATE TABLE `tbl_educationalbg` (
  `int_educbgID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_schoolAddressID` int(11) NOT NULL,
  `varchar_schoolName` varchar(100) NOT NULL,
  `varchar_schoolYear` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_familybg`
--

CREATE TABLE `tbl_familybg` (
  `int_familybgID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_familyFName` varchar(100) NOT NULL,
  `varchar_familyMName` varchar(100) DEFAULT NULL,
  `varchar_familyLName` varchar(100) NOT NULL,
  `varchar_educationalAttainment` varchar(100) NOT NULL,
  `date_familyBdate` date NOT NULL,
  `varchar_relationship` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_formtype`
--

CREATE TABLE `tbl_formtype` (
  `int_formTypeID` int(11) NOT NULL,
  `varchar_formName` varchar(100) NOT NULL,
  `text_formDescription` text NOT NULL,
  `enum_formStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_formtype`
--

INSERT INTO `tbl_formtype` (`int_formTypeID`, `varchar_formName`, `text_formDescription`, `enum_formStatus`) VALUES
(1, 'Medical History', 'In clinical medicine, the patient\'s past and present which may contain relevant information bearing on their health past, present, and future. The medical history, being an account of all medical events and problems a person has experienced is an important tool in the management of the patient.', 'Active'),
(2, 'Income Details', 'Income is money that an individual or business receives in exchange for providing a good or service or through investing capital. Income is used to fund day-to-day expenditures. ... In businesses, income can refer to a company\'s remaining revenues after paying all expenses and taxes.', 'Active'),
(3, 'Family Background', 'Family background topic. [countable] the details of a person\'s family, education, experience, etc. a person\'s family/social/cultural/educational/class background The job would suit someone with a business background. In spite of their very different backgrounds, they immediately became friends.', 'Active'),
(4, 'Educational Background', 'Educational qualifications refers to the official confirmation, usually in the form of a certificate, diploma or degree, certifying the successful completion of an education program or a stage of a program.', 'Active'),
(5, 'Account Details', 'Financial records of an organization that register all financial transactions, and must be kept at its principal office or place of business. ... The annual accounts of a registered or incorporated firm are required by law to disclose a certain amount of information.', 'Active'),
(6, 'Professional Background', '\"Tell me about your professional background\" could mean anything from what types of jobs you\'ve had to the training or education you completed to get to this stage in your career.', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_incomedetail`
--

CREATE TABLE `tbl_incomedetail` (
  `int_incomeDetailID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_incomeSource` varchar(100) NOT NULL,
  `decimal_incomeAmount` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicalhistory`
--

CREATE TABLE `tbl_medicalhistory` (
  `int_medhistID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_medication` varchar(100) NOT NULL,
  `text_medDescription` text NOT NULL
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
  `enum_notifInfo` enum('Project Application','Problem Statement','Project Proposal','Project Releasing','Barangay Award') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_notification`
--

INSERT INTO `tbl_notification` (`int_notifID`, `int_notifReceiverID`, `int_notifSenderID`, `int_linkID`, `varchar_notifTitle`, `text_notifContent`, `enum_notifStatus`, `enum_notifInfo`) VALUES
(2, 3, 2, 5, 'There are changes in Problem Statement!', 'cjaaaaaaaaaaaaaaaaaaacnasicnsiuanisuannnnnnnnnnnnnnnnnnnnnncisajsiajcisajjjjjjjjjjjjjjjjjjjjjjjjicjisja', 'New', 'Problem Statement'),
(3, 3, 2, 1, 'Changes in Project Application!', 'kXNJKKKKKKKKKKKKKKKKKKKKKKKKKKKKNJAJBHJBAbBXA', 'New', 'Project Releasing');

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
(1, 'Abigale', 'Punzalan', 'Del Rosario', '1999-06-13', 'Female', 1999, 'Single', '09156662933', 'delrosarioabigale@gmail.com'),
(2, 'Gale', 'Napiza', 'Del Rosario', '2000-06-13', 'Female', 2000, 'Single', '09152222933', 'delrosariocheww@gmail.com'),
(6, 'Marlon', '', 'Napiza', '1969-05-16', 'Male', 1989, 'Married', '(+63) 126-663-2123', 'marlon@gmail.com'),
(7, 'Jillmarie', 'Gainsan', 'Inocencio', '1999-06-22', 'Female', 2000, 'Single', '(+63) 192-632-5626', 'jillmarie@gmail.com'),
(24, 'Lander Dashiell', 'Del Rosario', 'Manabat', '2002-08-10', 'Male', 2002, 'Single', '(+63) 155-156-1561', 'dash@gmail.com'),
(25, 'Charlie', 'Del Rosario', 'Timoteo', '2001-02-12', 'Female', 2001, 'Single', '(+63) 156-262-6262', 'dummycharlie@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_problemproposal`
--

CREATE TABLE `tbl_problemproposal` (
  `int_probproID` int(11) NOT NULL,
  `int_statementID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_problemstatement`
--

CREATE TABLE `tbl_problemstatement` (
  `int_statementID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL,
  `varchar_statementTitle` varchar(100) NOT NULL,
  `text_statementContent` text NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_problemStatus` enum('Submitted','Acknowledged','Rejected','Solved','Proposed') NOT NULL DEFAULT 'Submitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_problemstatement`
--

INSERT INTO `tbl_problemstatement` (`int_statementID`, `int_barangayID`, `int_categoryID`, `varchar_statementTitle`, `text_statementContent`, `date_createdDate`, `enum_problemStatus`) VALUES
(1, 3, 1, 'Check up for pregnant women.', 'Check up for pregnant women plus freebies for their babies.', '2018-08-08', 'Submitted'),
(5, 3, 1, 'Petition For Full Body Check Up And Medicine Giving.', 'Full body check up and medicine giving.', '2018-08-08', 'Proposed'),
(13, 3, 5, 'Scholarship grant for top 20 most outstanding students of the City.', 'Grant a scholarship for the students who are most outstanding.', '2018-08-08', 'Rejected'),
(14, 3, 2, 'Financial Assistance', 'Financial Assistance for families involved in the recent demolishing of specific building that affects their houses.', '2018-08-18', 'Acknowledged'),
(15, 3, 1, 'Dengue', 'Dengue Check up', '2018-08-20', 'Acknowledged'),
(16, 3, 1, 'Diarrhea', 'Check up for Diarrhea', '2018-08-21', 'Submitted'),
(17, 3, 1, 'Distribution of Medical Kit', 'Survival kit for calamities.', '2018-08-23', 'Proposed');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_professionalbg`
--

CREATE TABLE `tbl_professionalbg` (
  `int_professionID` int(11) NOT NULL,
  `varchar_position` varchar(50) NOT NULL,
  `varchar_companyName` varchar(100) NOT NULL,
  `int_companyAddressID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `int_projectID` int(11) NOT NULL,
  `date_projectStart` date NOT NULL,
  `date_projectEnd` date NOT NULL,
  `datetime_releasingStart` datetime NOT NULL,
  `datetime_releasingEnd` datetime NOT NULL,
  `decimal_actualBudget` decimal(10,2) NOT NULL,
  `enum_projectStatus` enum('New','Ongoing','Closed','Releasing','Finished') NOT NULL DEFAULT 'New'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`int_projectID`, `date_projectStart`, `date_projectEnd`, `datetime_releasingStart`, `datetime_releasingEnd`, `decimal_actualBudget`, `enum_projectStatus`) VALUES
(1, '2018-08-08', '2018-09-30', '2018-08-20 00:00:00', '2018-09-13 00:00:00', '1000000.00', 'Ongoing'),
(2, '2018-08-19', '2018-09-19', '2018-09-11 00:00:00', '2018-09-11 00:00:00', '1000000.00', 'New'),
(3, '2018-08-18', '2018-09-30', '2018-09-10 00:00:00', '2018-09-10 00:00:00', '1000000.00', 'Ongoing'),
(4, '2018-08-23', '2018-09-30', '2018-09-25 00:00:00', '2018-09-25 00:00:00', '1000000.00', 'New');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectbeneficiary`
--

CREATE TABLE `tbl_projectbeneficiary` (
  `int_projbeneID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_beneficiaryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectbeneficiary`
--

INSERT INTO `tbl_projectbeneficiary` (`int_projbeneID`, `int_projectID`, `int_beneficiaryID`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 8),
(4, 4, 12),
(5, 3, 12);

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
(2, 2, 2),
(4, 3, 3),
(5, 2, 5),
(6, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectform`
--

CREATE TABLE `tbl_projectform` (
  `int_projformID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_formtypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectform`
--

INSERT INTO `tbl_projectform` (`int_projformID`, `int_projectID`, `int_formtypeID`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 2, 2),
(4, 2, 4),
(5, 2, 3),
(6, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectlocation`
--

CREATE TABLE `tbl_projectlocation` (
  `int_proglocID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_locationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectlocation`
--

INSERT INTO `tbl_projectlocation` (`int_proglocID`, `int_projectID`, `int_locationID`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 1);

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
  `int_dayDuration` int(11) NOT NULL,
  `decimal_estimatedBudget` decimal(10,0) NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_proposalStatus` enum('Pending','Approved','Rejected','Revision') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectproposal`
--

INSERT INTO `tbl_projectproposal` (`int_projectID`, `int_cityID`, `varchar_projectName`, `varchar_projectRationale`, `text_projectDescription`, `text_projectObjective`, `int_allotedSlot`, `int_dayDuration`, `decimal_estimatedBudget`, `date_createdDate`, `enum_proposalStatus`) VALUES
(1, 1, 'Medicine Giving', 'Residents who really need these medicines will acquire it.', 'To help the residents who have a major or minor health issues.', 'Distribution of medicines for the residents. Limited supplies only.', 1000, 150, '1000000', '2017-12-11', 'Approved'),
(2, 2, 'Financial Assistance for Grade 4 students of Mababang Paaralan ng Sucat', 'It will help them to restore their school supplies that they recently used.', 'To help the students of Grade 4 students of Mababang Paaralan ng Sucat due to fire accident inside their building.', 'It will be given by the staffs of the municipal only. Each students will be given the same amount.', 1500, 100, '10000000', '2018-02-13', 'Approved'),
(3, 1, 'Distribution of Supplies for Fire Victims', 'Residents will received their supplies.', 'Give the residents who were affected by the fire. Given that they pass the required requirements.', 'Giving of supplies to residents. First come first served service (first to complete the requirements will automatically gain a slot).', 1000, 120, '3509995234', '2018-03-15', 'Approved'),
(4, 1, 'Distribution of Medical Kit', 'Due to recent typhoon incidents.', 'A project to help the residents but due to limited resources, slots are limited also.', 'To help the residents in case of emergency.', 200, 20, '1000000', '2018-08-23', 'Approved');

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
(1, 1, 1),
(2, 14, 3),
(3, 16, 3),
(4, 2, 16),
(5, 3, 14),
(6, 3, 16),
(7, 16, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_proposalapproval`
--

CREATE TABLE `tbl_proposalapproval` (
  `int_projectID` int(11) NOT NULL,
  `varchar_checkNumber` varchar(20) DEFAULT NULL,
  `enum_propappStatus` enum('Received','Pending','Sent') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_proposalapproval`
--

INSERT INTO `tbl_proposalapproval` (`int_projectID`, `varchar_checkNumber`, `enum_propappStatus`) VALUES
(2, '234568', 'Sent'),
(4, '123566', 'Sent');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_releaselocation`
--

CREATE TABLE `tbl_releaselocation` (
  `int_locationID` int(11) NOT NULL,
  `int_locationAddressID` int(11) NOT NULL,
  `varchar_locationName` varchar(100) NOT NULL,
  `enum_locationStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_releaselocation`
--

INSERT INTO `tbl_releaselocation` (`int_locationID`, `int_locationAddressID`, `varchar_locationName`, `enum_locationStatus`) VALUES
(1, 1, 'Mandaluyong City Hall', 'Active'),
(2, 2, 'Addition Hills Barangay Hall', 'Active'),
(3, 3, 'Bagong Silang Barangay Hall', 'Active'),
(4, 4, 'Barangka Drive Barangay Hall', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirement`
--

CREATE TABLE `tbl_requirement` (
  `int_requirementID` int(11) NOT NULL,
  `varchar_requirementName` varchar(100) NOT NULL,
  `text_requirementDescription` text NOT NULL,
  `enum_requirementStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_requirement`
--

INSERT INTO `tbl_requirement` (`int_requirementID`, `varchar_requirementName`, `text_requirementDescription`, `enum_requirementStatus`) VALUES
(1, 'Birth Certificate', 'Companies often ask for a photocopy of receipt of application for your NSO Birth Certificate.', 'Active'),
(2, 'Transcript of Records/ Diploma', 'This is proof that you have finished the course is written in your CV. There is no need to submit the original, as some companies accept a photocopy with the school stamp.', 'Active'),
(5, 'NBI Clearance', 'This document from the National Bureua of Investigation (NBI) certifies that you don’t have a criminal record. Line up to get an application form and follow the procedures, which now has been made easier with online registaration. If you have a common name, then prepare to go back as you’ll get a hit.', 'Active'),
(6, 'SSS', 'The Social Security System or SSS is a monthly contribution for your future, say your pension or sick leave benefits. You can also loan from your SSS account provided you have made the necessary contributions. Have a ready photocopy of E1/E4/E6 form for your employer.', 'Active'),
(7, 'Pag-IBIG', 'Housing loans are backed by Pagtutulungan sa Kinabukasan: Ikaw, Bangko, Industria at Gobyerno or Pag-IBIG. Employees have a mandatory membership.', 'Active'),
(8, 'Philhealth', 'Discounts on hospital fees are provided by Philhealth. This health financing agency provides for universal health coverage.', 'Active'),
(9, 'BIR forms', 'The Bureau of Internal Revenue (BIR) is our tax collection agency. There are many forms from the BIR that you will need: your TIN registration form, TIN card, ITR/2316 from previous employer, and Form 1905/Transfer of RDO are some of them. Worry not, as most companies often apply for first time employees.', 'Active'),
(10, 'Valid Driver’s License', 'A driver\'s license is an official document permitting a specific individual to operate one or more types of motorized vehicles, such as a motorcycle, car, truck, or bus on a public road.', 'Active'),
(11, 'Valid Passport', 'A passport is a travel document, usually issued by a country\'s government, that certifies the identity and nationality of its holder primarily for the purpose of international travel.[1] Standard passports may contain information such as the holder\'s name, place and date of birth, photograph, signature, and other identifying information. ', 'Active'),
(12, 'Baptismal Certificate', 'A formal document normally kept by a church of baptisms that occurred in their congregation. It typically contains the names of the individuals baptized, the date of baptism, where it took place, the clergyman\'s name, and possibly the names of sponsors and place of residence.', 'Inactive'),
(13, 'Marriage Certificate', 'A marriage certificate (sometimes: marriage lines) is an official statement that two people are married. In most jurisdictions, a marriage certificate is issued by a government official only after the civil registration of the marriage.', 'Active'),
(14, 'Barangay Certificate of Residency', 'Barangay Clearance or Certificate of Residency is one the Philippine government issued identification documents needed for many important business, job, or personal transactions. You might need it for the following reasons: ... certify that you are living or residing in a certain barangay. It issued within three (3 months) prior to PID application\r\n', 'Active'),
(15, 'Utility Bill/s', 'The amount a household or office is expected to pay for electricity, water and/or gas each month. Utility bills vary according to one\'s usage. However, many local and national governments regulate the profits of utility companies, limiting the amount they can charge customers.', 'Active'),
(16, 'Valid ID', 'It is any document which may be used to prove a person\'s identity. If issued in a small, standard credit card size form, it is usually called an identity card', 'Active');

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

--
-- Dumping data for table `tbl_revisioncomment`
--

INSERT INTO `tbl_revisioncomment` (`int_revisionID`, `int_projectID`, `text_commentContent`, `enum_revisionStatus`) VALUES
(1, 2, 'Please review the target beneficiaries.', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL,
  `varchar_userEmailAddress` varchar(100) NOT NULL,
  `varchar_userPassword` varchar(100) NOT NULL,
  `enum_userType` enum('Admin','Barangay Staff','Office Staff','Budget Office Staff') NOT NULL DEFAULT 'Barangay Staff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `varchar_userEmailAddress`, `varchar_userPassword`, `enum_userType`) VALUES
(1, 'admin@gmail.com', 'admin', 'Admin'),
(2, 'office@gmail.com', 'office', 'Office Staff'),
(3, 'barangay@gmail.com', 'barangay', 'Barangay Staff'),
(4, 'budget@gmail.com', 'budget', 'Budget Office Staff'),
(5, 'bagongsilang@gmail.com', 'bagongsilang', 'Barangay Staff'),
(6, 'barangkadrive@gmail.com', 'barangkadrive', 'Barangay Staff'),
(7, 'hulo@gmail.com', 'hulo', 'Barangay Staff'),
(8, 'malamig@gmail.com', 'malamig', 'Barangay Staff'),
(13, 'delrosariochewwy@gmail.com', 'L9NoJfYS', 'Barangay Staff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accountdetail`
--
ALTER TABLE `tbl_accountdetail`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_address`
--
ALTER TABLE `tbl_address`
  ADD PRIMARY KEY (`int_addressID`);

--
-- Indexes for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD PRIMARY KEY (`int_announcementID`);

--
-- Indexes for table `tbl_application`
--
ALTER TABLE `tbl_application`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_applicationcode`
--
ALTER TABLE `tbl_applicationcode`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  ADD PRIMARY KEY (`int_appreqID`);

--
-- Indexes for table `tbl_award`
--
ALTER TABLE `tbl_award`
  ADD PRIMARY KEY (`int_awardID`);

--
-- Indexes for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  ADD PRIMARY KEY (`int_barangayID`);

--
-- Indexes for table `tbl_barangayaward`
--
ALTER TABLE `tbl_barangayaward`
  ADD PRIMARY KEY (`int_bgryAwardID`);

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
-- Indexes for table `tbl_educationalbg`
--
ALTER TABLE `tbl_educationalbg`
  ADD PRIMARY KEY (`int_educbgID`);

--
-- Indexes for table `tbl_familybg`
--
ALTER TABLE `tbl_familybg`
  ADD PRIMARY KEY (`int_familybgID`);

--
-- Indexes for table `tbl_formtype`
--
ALTER TABLE `tbl_formtype`
  ADD PRIMARY KEY (`int_formTypeID`);

--
-- Indexes for table `tbl_incomedetail`
--
ALTER TABLE `tbl_incomedetail`
  ADD PRIMARY KEY (`int_incomeDetailID`);

--
-- Indexes for table `tbl_medicalhistory`
--
ALTER TABLE `tbl_medicalhistory`
  ADD PRIMARY KEY (`int_medhistID`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`int_notifID`);

--
-- Indexes for table `tbl_personalinformation`
--
ALTER TABLE `tbl_personalinformation`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_problemproposal`
--
ALTER TABLE `tbl_problemproposal`
  ADD PRIMARY KEY (`int_probproID`);

--
-- Indexes for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  ADD PRIMARY KEY (`int_statementID`);

--
-- Indexes for table `tbl_professionalbg`
--
ALTER TABLE `tbl_professionalbg`
  ADD PRIMARY KEY (`int_professionID`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`int_projectID`);

--
-- Indexes for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  ADD PRIMARY KEY (`int_projbeneID`);

--
-- Indexes for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  ADD PRIMARY KEY (`int_projcategID`);

--
-- Indexes for table `tbl_projectform`
--
ALTER TABLE `tbl_projectform`
  ADD PRIMARY KEY (`int_projformID`);

--
-- Indexes for table `tbl_projectlocation`
--
ALTER TABLE `tbl_projectlocation`
  ADD PRIMARY KEY (`int_proglocID`);

--
-- Indexes for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  ADD PRIMARY KEY (`int_projectID`);

--
-- Indexes for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  ADD PRIMARY KEY (`int_projreqID`);

--
-- Indexes for table `tbl_proposalapproval`
--
ALTER TABLE `tbl_proposalapproval`
  ADD PRIMARY KEY (`int_projectID`);

--
-- Indexes for table `tbl_releaselocation`
--
ALTER TABLE `tbl_releaselocation`
  ADD PRIMARY KEY (`int_locationID`);

--
-- Indexes for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  ADD PRIMARY KEY (`int_requirementID`);

--
-- Indexes for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  ADD PRIMARY KEY (`int_revisionID`);

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
-- AUTO_INCREMENT for table `tbl_address`
--
ALTER TABLE `tbl_address`
  MODIFY `int_addressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  MODIFY `int_announcementID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tbl_award`
--
ALTER TABLE `tbl_award`
  MODIFY `int_awardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_barangayaward`
--
ALTER TABLE `tbl_barangayaward`
  MODIFY `int_bgryAwardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_beneficiary`
--
ALTER TABLE `tbl_beneficiary`
  MODIFY `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `int_categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_city`
--
ALTER TABLE `tbl_city`
  MODIFY `int_cityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_educationalbg`
--
ALTER TABLE `tbl_educationalbg`
  MODIFY `int_educbgID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_familybg`
--
ALTER TABLE `tbl_familybg`
  MODIFY `int_familybgID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_formtype`
--
ALTER TABLE `tbl_formtype`
  MODIFY `int_formTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_incomedetail`
--
ALTER TABLE `tbl_incomedetail`
  MODIFY `int_incomeDetailID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_medicalhistory`
--
ALTER TABLE `tbl_medicalhistory`
  MODIFY `int_medhistID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_problemproposal`
--
ALTER TABLE `tbl_problemproposal`
  MODIFY `int_probproID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `tbl_professionalbg`
--
ALTER TABLE `tbl_professionalbg`
  MODIFY `int_professionID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projcategID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_projectform`
--
ALTER TABLE `tbl_projectform`
  MODIFY `int_projformID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_projectlocation`
--
ALTER TABLE `tbl_projectlocation`
  MODIFY `int_proglocID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_proposalapproval`
--
ALTER TABLE `tbl_proposalapproval`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_releaselocation`
--
ALTER TABLE `tbl_releaselocation`
  MODIFY `int_locationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  MODIFY `int_revisionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

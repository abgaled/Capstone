-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2018 at 01:18 PM
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
-- Database: `db_capstone9`
--

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
(24, 3, 1, 'Approved', '2018-08-23 06:34:13'),
(25, 3, 3, 'Pending', '0000-00-00 00:00:00'),
(26, 3, 3, 'Pending', '0000-00-00 00:00:00'),
(27, 3, 1, 'Pending', '0000-00-00 00:00:00');

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
(15, 25, 16, 'Passed'),
(16, 25, 14, 'Passed'),
(17, 25, 16, 'Passed'),
(18, 26, 14, 'Passed'),
(19, 26, 16, 'Passed'),
(20, 27, 1, 'Passed');

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
  `text_barangayAddress` text NOT NULL,
  `enum_barangayStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangay`
--

INSERT INTO `tbl_barangay` (`int_barangayID`, `int_userID`, `int_cityID`, `varchar_barangayName`, `varchar_barangayContact`, `text_barangayAddress`, `enum_barangayStatus`) VALUES
(1, 3, 1, 'Addition Hills', '226-6666', '', 'Active'),
(2, 5, 1, 'Bagong Silang', '514-8312/9953354', '', 'Inactive'),
(3, 6, 1, 'Barangka Drive', '531-6544', '', 'Active'),
(4, 7, 1, 'Hulo', '534-5056/535-2505', '', 'Active'),
(5, 8, 1, 'Malamig', '533-1319', '', 'Active'),
(8, 13, 1, 'Buli', '09156662933', '', 'Active');

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
(1, 'Senior Citizen', 'Age', '', 'Active'),
(2, 'Person with Disability (PWD)', 'Age', '', 'Active'),
(3, 'College Student', 'Age', '', 'Inactive'),
(4, 'Women and girls', 'Age', '', 'Active'),
(5, 'Men', 'Age', '', 'Active'),
(6, 'Elementary Students', 'Age', '', 'Active'),
(7, 'Mother', 'Age', '', 'Active'),
(8, 'Pregnant Women\r\n', 'Age', '', 'Active'),
(9, 'Households', 'Age', '', 'Active'),
(10, 'Retired worker', 'Age', '', 'Active'),
(11, 'Youths', 'Age', '', 'Active'),
(12, 'Disaster Victims\r\n', 'Age', '', 'Active');

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
  `varchar_cityName` varchar(100) NOT NULL,
  `text_cityAddress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`int_cityID`, `int_userID`, `varchar_officeName`, `varchar_cityName`, `text_cityAddress`) VALUES
(1, 2, 'Office of the Congresswomen Alexandria Gonzales', 'Mandaluyong City', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_expense`
--

CREATE TABLE `tbl_expense` (
  `int_expenseID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `varchar_expenseName` varchar(100) NOT NULL,
  `decimal_estimatedAmount` decimal(15,2) NOT NULL,
  `decimal_actualAmount` decimal(15,2) DEFAULT NULL
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
(25, 'Charlie', 'Del Rosario', 'Timoteo', '2001-02-12', 'Female', 2001, 'Single', '(+63) 156-262-6262', 'dummycharlie@gmail.com'),
(26, 'Hans', 'Del Rosario', 'Ilagan', '1997-10-18', 'Male', 1997, 'Single', '(+63) 156-266-6354', 'hans@gmail.com'),
(27, 'Bennie', '', 'Pun', '1930-02-25', 'Female', 1930, 'Married', '(+63) 156-269-5559', 'bennie@gmail.com');

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
(1, 3, 1, 0, 'Check up for pregnant women.', 'Check up for pregnant women plus freebies for their babies.', '2018-08-08', 'Acknowledged'),
(5, 3, 1, 0, 'Petition For Full Body Check Up And Medicine Giving.', 'Full body check up and medicine giving.', '2018-08-08', 'Proposed'),
(13, 3, 5, 0, 'Scholarship grant for top 20 most outstanding students of the City.', 'Grant a scholarship for the students who are most outstanding.', '2018-08-08', 'Rejected'),
(14, 3, 2, 0, 'Financial Assistance', 'Financial Assistance for families involved in the recent demolishing of specific building that affects their houses.', '2018-08-18', 'Acknowledged'),
(15, 3, 1, 0, 'Dengue', 'Dengue Check up', '2018-08-20', 'Acknowledged'),
(16, 3, 1, 0, 'Diarrhea', 'Check up for Diarrhea', '2018-08-21', 'Acknowledged'),
(17, 3, 1, 0, 'Distribution of Medical Kit', 'Survival kit for calamities.', '2018-08-23', 'Proposed'),
(18, 3, 1, NULL, 'Fever Check up', 'Dummy 1', '2018-08-26', 'Acknowledged');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `int_projectID` int(11) NOT NULL,
  `date_projectStart` date DEFAULT NULL,
  `date_projectEnd` date DEFAULT NULL,
  `date_releaseDate` date DEFAULT NULL,
  `date_closeDate` date DEFAULT NULL,
  `decimal_actualBudget` decimal(15,2) NOT NULL,
  `enum_projectStatus` enum('New','Ongoing','Closed','Releasing','Finished') NOT NULL DEFAULT 'New'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`int_projectID`, `date_projectStart`, `date_projectEnd`, `date_releaseDate`, `date_closeDate`, `decimal_actualBudget`, `enum_projectStatus`) VALUES
(1, '2018-08-08', '2018-09-30', '2018-08-20', '2018-09-13', '1000000.00', 'Ongoing'),
(2, '2018-08-19', '2018-09-19', '2018-09-11', '2018-09-11', '1000000.00', 'New'),
(3, '2018-08-18', '2018-09-30', '2018-09-10', '2018-09-10', '1000000.00', 'Ongoing'),
(4, '2018-08-23', '2018-09-30', '2018-09-25', '2018-09-25', '1000000.00', 'New');

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
  `int_applicationDuration` int(11) NOT NULL,
  `int_releasingDuration` int(11) NOT NULL,
  `int_beforeReleasingDuration` int(11) NOT NULL,
  `decimal_estimatedBudget` decimal(10,0) NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_proposalStatus` enum('Pending','Approved','Rejected','Revision') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectproposal`
--

INSERT INTO `tbl_projectproposal` (`int_projectID`, `int_cityID`, `varchar_projectName`, `varchar_projectRationale`, `text_projectDescription`, `text_projectObjective`, `int_allotedSlot`, `int_applicationDuration`, `int_releasingDuration`, `int_beforeReleasingDuration`, `decimal_estimatedBudget`, `date_createdDate`, `enum_proposalStatus`) VALUES
(1, 1, 'Medicine Giving', 'Residents who really need these medicines will acquire it.', 'To help the residents who have a major or minor health issues.', 'Distribution of medicines for the residents. Limited supplies only.', 1000, 150, 0, 0, '1000000', '2017-12-11', 'Approved'),
(2, 2, 'Financial Assistance for Grade 4 students of Mababang Paaralan ng Sucat', 'It will help them to restore their school supplies that they recently used.', 'To help the students of Grade 4 students of Mababang Paaralan ng Sucat due to fire accident inside their building.', 'It will be given by the staffs of the municipal only. Each students will be given the same amount.', 1500, 100, 0, 0, '10000000', '2018-02-13', 'Approved'),
(3, 1, 'Distribution of Supplies for Fire Victims', 'Residents will received their supplies.', 'Give the residents who were affected by the fire. Given that they pass the required requirements.', 'Giving of supplies to residents. First come first served service (first to complete the requirements will automatically gain a slot).', 1000, 120, 0, 0, '3509995234', '2018-03-15', 'Approved'),
(4, 1, 'Distribution of Medical Kit', 'Due to recent typhoon incidents.', 'A project to help the residents but due to limited resources, slots are limited also.', 'To help the residents in case of emergency.', 200, 20, 0, 0, '1000000', '2018-08-23', 'Approved'),
(5, 0, 'Fever Check Up', 'Dummy 1', 'Dummy 3', 'Dummy 2', 150, 20, 1, 1, '1500000', '2018-08-26', 'Pending');

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
  `enum_propappStatus` enum('Received','Sent') NOT NULL DEFAULT 'Sent'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_proposalapproval`
--

INSERT INTO `tbl_proposalapproval` (`int_projectID`, `varchar_checkNumber`, `enum_propappStatus`) VALUES
(2, '234568', 'Sent'),
(4, '123566', 'Sent');

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
(5, 'NBI Clearance', 'Active'),
(6, 'SSS', 'Active'),
(7, 'Pag-IBIG', 'Active'),
(8, 'Philhealth', 'Active'),
(9, 'BIR forms', 'Active'),
(10, 'Valid Driver’s License', 'Active'),
(11, 'Valid Passport', 'Active'),
(12, 'Baptismal Certificate', 'Inactive'),
(13, 'Marriage Certificate', 'Active'),
(14, 'Barangay Certificate of Residency', 'Active'),
(15, 'Utility Bill/s', 'Active'),
(16, 'Valid ID', 'Active');

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
-- Indexes for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  ADD PRIMARY KEY (`int_appreqID`);

--
-- Indexes for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  ADD PRIMARY KEY (`int_barangayID`);

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
  ADD PRIMARY KEY (`int_expenseID`);

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
-- Indexes for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  ADD PRIMARY KEY (`int_statementID`);

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
-- AUTO_INCREMENT for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  MODIFY `int_announcementID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
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
-- AUTO_INCREMENT for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  MODIFY `int_expenseID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
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
-- AUTO_INCREMENT for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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

-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2018 at 07:51 PM
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
-- Database: `db_capstone1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accountdetail`
--

CREATE TABLE `tbl_accountdetail` (
  `int_applicationID` int(11) NOT NULL,
  `int_gsisNumber` int(11) DEFAULT NULL,
  `int_sssNumber` int(11) DEFAULT NULL,
  `int_tinNumber` int(11) DEFAULT NULL,
  `int_crnNumber` int(11) DEFAULT NULL,
  `int_philHealthNumber` int(11) DEFAULT NULL,
  `int_hdmfNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_addressformat`
--

CREATE TABLE `tbl_addressformat` (
  `int_addressID` int(11) NOT NULL,
  `varchar_addressLine1` varchar(100) NOT NULL,
  `varchar_addressLine2` varchar(100) DEFAULT NULL,
  `varchar_addressLine3` varchar(100) DEFAULT NULL,
  `varchar_addrsesCity` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

CREATE TABLE `tbl_announcement` (
  `int_announcementID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `varchar_announcementTitle` varchar(100) NOT NULL,
  `text_announcementDescription` text NOT NULL,
  `date_postedDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_application`
--

CREATE TABLE `tbl_application` (
  `int_applicationID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `enum_applicationStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationinfo`
--

CREATE TABLE `tbl_applicationinfo` (
  `int_applicationID` int(11) NOT NULL,
  `int_applicantAddressID` int(11) DEFAULT NULL,
  `int_applicantBirthPlace` int(11) DEFAULT NULL,
  `varchar_applicantFName` varchar(100) NOT NULL,
  `varchar_applicantMName` varchar(100) DEFAULT NULL,
  `varchar_applicantLName` varchar(100) NOT NULL,
  `varchar_applicantSuffix` varchar(10) NOT NULL,
  `date_applicantBirthDate` date NOT NULL,
  `enum_applicantGender` enum('Male','Female') DEFAULT NULL,
  `enum_applicantCivilStat` enum('Single','Married','Widowed') DEFAULT NULL,
  `int_applicantResidency` int(11) DEFAULT NULL,
  `varchar_applicantMobileNumber` varchar(50) DEFAULT NULL,
  `varchar_applicantTelephone` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationrequirement`
--

CREATE TABLE `tbl_applicationrequirement` (
  `int_apprequireID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `blob_requiredFile` blob,
  `enum_apprequireStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationwaver`
--

CREATE TABLE `tbl_applicationwaver` (
  `int_waverID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `blob_applicantSignature` blob,
  `date_receivedDate` date DEFAULT NULL,
  `enum_releaseStatus` enum('Done','Pending') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_award`
--

CREATE TABLE `tbl_award` (
  `int_awardID` int(11) NOT NULL,
  `varchar_awardName` varchar(50) NOT NULL,
  `text_awardDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangay`
--

CREATE TABLE `tbl_barangay` (
  `int_barangayID` int(11) NOT NULL,
  `int_barangayUserID` int(11) DEFAULT NULL,
  `varchar_barangayName` varchar(100) NOT NULL,
  `varchar_barangayChairman` varchar(100) NOT NULL,
  `int_barangayDistrict` int(11) NOT NULL,
  `varchar_barangayContact` varchar(50) DEFAULT NULL,
  `enum_barangayStatus` enum('Active','Inactive') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangay`
--

INSERT INTO `tbl_barangay` (`int_barangayID`, `int_barangayUserID`, `varchar_barangayName`, `varchar_barangayChairman`, `int_barangayDistrict`, `varchar_barangayContact`, `enum_barangayStatus`) VALUES
(28, NULL, 'Addition Hills', 'Kent Gajo Faminial', 1, '534-0503', 'Active'),
(29, NULL, 'Bagong Silang', 'Marc Anthony I. Dominguez', 1, '514-8312/9953354', 'Active'),
(30, NULL, 'Barangka Drive', 'Darwin A. Fernandez', 2, '531-6544', 'Active'),
(31, NULL, 'Barangka Ibaba', 'Faustino O. Cruz Jr', 2, '747-1497', 'Active'),
(32, NULL, 'Barangka Ilaya', 'Joselito C. Pangilinan', 2, '531-0647', 'Active'),
(33, NULL, 'Barangka Itaas', 'Dannie DJ. Ocampo', 2, '532-7564/533-7141', 'Active'),
(34, NULL, 'Buayang Bato', 'Reynaldo De Josep Nobela', 2, '631-5903/470-3686', 'Active'),
(35, NULL, 'Burol', 'Ernesto F. Santos Jr.', 1, '625-3352/535-2641', 'Active'),
(36, NULL, 'Daang Bakal', 'Richard B. Bassig', 1, '535-3992/4639631', 'Active'),
(37, NULL, 'Hagdang Bato Itaas', 'Edmon B. Espiritu', 1, '534-0345', 'Active'),
(38, NULL, 'Hagdang Bato Libis', 'Richmond Jae SD. Jamila', 1, '535-4720', 'Active'),
(39, NULL, 'Harapin Ang Bukas', 'Federico Ogbac', 1, '533-6611/748-7039', 'Active'),
(40, NULL, 'Highway Hills', 'Rolando A. Rugay', 1, '533-6298/531-9432', 'Active'),
(41, NULL, 'Hulo', 'Bernardino C. Maglaque', 2, '534-5056/535-2505', 'Active'),
(42, NULL, 'Mabini-J.Rizal', 'Angelina O. Tablan', 2, '531-0643', 'Active'),
(43, NULL, 'Malamig', 'Marlon R. Manalo', 2, '533-1319', 'Active'),
(44, NULL, 'Mauway', 'Denny Jayne S. Calimlim', 1, '531-2753/531-0306', 'Active'),
(45, NULL, 'Namayan', 'Leonardo C. Santiago', 2, '719-1736/794-0905', 'Active'),
(46, NULL, 'New Zaniga', 'Edwin E. Cruz', 1, '533-5138/532-0725', 'Active'),
(47, NULL, 'Old Zaniga', 'Victorio M. Carolino', 2, '719-2474/945-9328', 'Active'),
(48, NULL, 'Pag-asa', 'Tracy Rhoy R. Domingo', 1, '533-9980/400-7158', 'Active'),
(49, NULL, 'Plainview', 'Michael C. Garcia', 2, '534-1874', 'Active'),
(50, NULL, 'Pleasant Hills', 'Tagani M. Evangelista', 1, '535-5431/533-4794', 'Active'),
(51, NULL, 'Poblacion', 'Godofredo A. Tolentino', 1, '576-1161/535-0917', 'Active'),
(52, NULL, 'San Jose', 'Roniel Tuazon', 2, '655-9918', 'Active'),
(53, NULL, 'Vergara', 'Ernesto C. Mendiola', 2, '531-9900/719-0144', 'Active'),
(54, NULL, 'Wack-wack', 'Manuel P. Syquia', 1, '722-4258/438-0321 to 22', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangayaward`
--

CREATE TABLE `tbl_barangayaward` (
  `int_barangayAwardID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_awardID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_educationalbackground`
--

CREATE TABLE `tbl_educationalbackground` (
  `int_educationalbgID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_schoolAddressID` int(11) DEFAULT NULL,
  `enum_educationalLevel` enum('Primary','Secondary','College','Diplomatic') DEFAULT NULL,
  `varchar_schoolName` varchar(100) NOT NULL,
  `year_startYear` date DEFAULT NULL,
  `year_endYear` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_familybackground`
--

CREATE TABLE `tbl_familybackground` (
  `int_familybgID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_familyFName` varchar(100) NOT NULL,
  `varchar_familyMName` varchar(100) DEFAULT NULL,
  `varchar_familyLName` varchar(100) NOT NULL,
  `varchar_educationalAttainment` varchar(100) DEFAULT NULL,
  `date_familyBirthday` date DEFAULT NULL,
  `enum_applicantRelationship` enum('Mother','Father','Sister','Brother','Aunt','Uncle','Cousin','Son','Daugther','Spouse','Nephew','Niece','Grandchild','Grandparent') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_incomedetail`
--

CREATE TABLE `tbl_incomedetail` (
  `int_incomeDetailID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_incomeSource` varchar(100) NOT NULL,
  `varchar_incomeMaker` varchar(100) NOT NULL,
  `varchar_incomeSpouse` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_liabilities`
--

CREATE TABLE `tbl_liabilities` (
  `int_liabilityID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `varchar_expenseName` varchar(100) NOT NULL,
  `decimal_expenseCost` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_message`
--

CREATE TABLE `tbl_message` (
  `int_messageID` int(11) NOT NULL,
  `int_senderID` int(11) NOT NULL,
  `int_receiverID` int(11) NOT NULL,
  `varchar_messageTitle` varchar(100) NOT NULL,
  `text_messageContent` text NOT NULL,
  `date_createdDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_problemcategory`
--

CREATE TABLE `tbl_problemcategory` (
  `int_problemCategID` int(11) NOT NULL,
  `varchar_problemCategName` varchar(50) NOT NULL,
  `text_problemCategDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_problemstatement`
--

CREATE TABLE `tbl_problemstatement` (
  `int_problemID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `int_problemCategID` int(11) NOT NULL,
  `varchar_statementTitle` varchar(100) NOT NULL,
  `varchar_statementDescription` text NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_problemStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `int_projectID` int(11) NOT NULL,
  `date_startDate` date DEFAULT NULL,
  `date_endDate` date DEFAULT NULL,
  `date_approvedDate` date DEFAULT NULL,
  `date_releaseDate` date DEFAULT NULL,
  `decimal_actualBudget` decimal(10,2) DEFAULT NULL,
  `enum_projectStatus` enum('Open','Closed','Releasing','Terminated') DEFAULT 'Open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`int_projectID`, `date_startDate`, `date_endDate`, `date_approvedDate`, `date_releaseDate`, `decimal_actualBudget`, `enum_projectStatus`) VALUES
(1, '2018-05-01', '2018-05-31', '2018-05-16', '2018-06-05', '1000000.00', 'Open'),
(2, '2018-05-31', '2018-06-15', '2018-06-02', '2018-06-12', '1000000.00', 'Open');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectbidder`
--

CREATE TABLE `tbl_projectbidder` (
  `int_bidderID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectcategory`
--

CREATE TABLE `tbl_projectcategory` (
  `int_projectCategID` int(11) NOT NULL,
  `varchar_projectCategName` varchar(50) NOT NULL,
  `text_projectCategDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectcategory`
--

INSERT INTO `tbl_projectcategory` (`int_projectCategID`, `varchar_projectCategName`, `text_projectCategDescription`) VALUES
(1, 'Medical', 'About the health of the residents.'),
(2, 'Monetary', 'Giving money for good purposes.');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectproposal`
--

CREATE TABLE `tbl_projectproposal` (
  `int_projectID` int(11) NOT NULL,
  `int_projectCategID` int(11) NOT NULL,
  `varchar_projectName` varchar(100) NOT NULL,
  `varchar_releaseLocation` varchar(100) NOT NULL,
  `varchar_projectRationale` varchar(100) NOT NULL,
  `varchar_projectObjective` varchar(100) NOT NULL,
  `text_projectDescription` text NOT NULL,
  `text_expectedOutput` text NOT NULL,
  `int_allotedSlot` int(11) NOT NULL,
  `decimal_estimatedBudget` decimal(10,2) NOT NULL,
  `decimal_individualBudget` decimal(10,2) NOT NULL,
  `enum_proposalStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectproposal`
--

INSERT INTO `tbl_projectproposal` (`int_projectID`, `int_projectCategID`, `varchar_projectName`, `varchar_releaseLocation`, `varchar_projectRationale`, `varchar_projectObjective`, `text_projectDescription`, `text_expectedOutput`, `int_allotedSlot`, `decimal_estimatedBudget`, `decimal_individualBudget`, `enum_proposalStatus`) VALUES
(1, 1, 'Medicine Giving', 'City Hall', 'Ano this??? Update later.', 'To help the residents who have a major or minor health issues.', 'Distribution of medicines for the residents. Limited supplies only.', 'Residents who really need these medicines will acquire it.', 100, '1000000.00', '10000.00', 'Accepted'),
(2, 2, 'Financial Assistance for Grade 4 students.', 'City Hall', 'Parang Objective?', 'Help grade 4 students of elementary school to avail books specific for them.', 'It will be given by the staffs of the municipal only. Each students will be given the same amount.', 'They can avail textbooks for their studies.', 500, '1000000.00', '2000.00', 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectrequirement`
--

CREATE TABLE `tbl_projectrequirement` (
  `int_projrequireID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projecttarget`
--

CREATE TABLE `tbl_projecttarget` (
  `int_projecttargetID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_beneficiaryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirement`
--

CREATE TABLE `tbl_requirement` (
  `int_requirementID` int(11) NOT NULL,
  `varchar_requirementName` varchar(50) NOT NULL,
  `text_requirementDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementschedule`
--

CREATE TABLE `tbl_requirementschedule` (
  `int_requireschedID` int(11) NOT NULL,
  `int_apprequireID` int(11) NOT NULL,
  `date_scheduledDate` date DEFAULT NULL,
  `enum_requireschedStatus` enum('Finished','Pending','Canceled') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_staffdetail`
--

CREATE TABLE `tbl_staffdetail` (
  `int_staffID` int(11) NOT NULL,
  `int_staffUserID` int(11) DEFAULT NULL,
  `int_staffAddressID` int(11) DEFAULT NULL,
  `varchar_staffFName` varchar(100) NOT NULL,
  `varchar_staffMName` varchar(100) DEFAULT NULL,
  `varchar_staffLName` varchar(100) NOT NULL,
  `varchar_staffPosition` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_targetbeneficiary`
--

CREATE TABLE `tbl_targetbeneficiary` (
  `int_beneficiaryID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(50) NOT NULL,
  `text_beneficiaryDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL,
  `varchar_userEmailAddress` varchar(100) NOT NULL,
  `varchar_userPassword` varchar(100) NOT NULL,
  `enum_userType` enum('Admin','Office Staff','Budget Office Staff','Barangay Staff') NOT NULL DEFAULT 'Barangay Staff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `varchar_userEmailAddress`, `varchar_userPassword`, `enum_userType`) VALUES
(1, 'admin@gmail.com', 'admin', 'Admin'),
(2, 'office@gmail.com', 'office', 'Office Staff'),
(3, 'barangay@gmail.com', 'barangay', 'Barangay Staff'),
(4, 'budget@gmail.com', 'budget', 'Budget Office Staff');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_workdetail`
--

CREATE TABLE `tbl_workdetail` (
  `int_applicationID` int(11) NOT NULL,
  `int_companyAddressID` int(11) NOT NULL,
  `varchar_companyName` varchar(100) NOT NULL,
  `enum_employmentStatus` enum('A','B') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accountdetail`
--
ALTER TABLE `tbl_accountdetail`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_addressformat`
--
ALTER TABLE `tbl_addressformat`
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
-- Indexes for table `tbl_applicationinfo`
--
ALTER TABLE `tbl_applicationinfo`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- Indexes for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  ADD PRIMARY KEY (`int_apprequireID`);

--
-- Indexes for table `tbl_applicationwaver`
--
ALTER TABLE `tbl_applicationwaver`
  ADD PRIMARY KEY (`int_waverID`);

--
-- Indexes for table `tbl_award`
--
ALTER TABLE `tbl_award`
  ADD PRIMARY KEY (`int_awardID`),
  ADD UNIQUE KEY `varchar_awardName` (`varchar_awardName`);

--
-- Indexes for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  ADD PRIMARY KEY (`int_barangayID`),
  ADD UNIQUE KEY `varchar_barangayName` (`varchar_barangayName`),
  ADD UNIQUE KEY `int_barangayUserID` (`int_barangayUserID`);

--
-- Indexes for table `tbl_barangayaward`
--
ALTER TABLE `tbl_barangayaward`
  ADD PRIMARY KEY (`int_barangayAwardID`);

--
-- Indexes for table `tbl_educationalbackground`
--
ALTER TABLE `tbl_educationalbackground`
  ADD PRIMARY KEY (`int_educationalbgID`);

--
-- Indexes for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  ADD PRIMARY KEY (`int_familybgID`);

--
-- Indexes for table `tbl_incomedetail`
--
ALTER TABLE `tbl_incomedetail`
  ADD PRIMARY KEY (`int_incomeDetailID`);

--
-- Indexes for table `tbl_liabilities`
--
ALTER TABLE `tbl_liabilities`
  ADD PRIMARY KEY (`int_liabilityID`);

--
-- Indexes for table `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD PRIMARY KEY (`int_messageID`);

--
-- Indexes for table `tbl_problemcategory`
--
ALTER TABLE `tbl_problemcategory`
  ADD PRIMARY KEY (`int_problemCategID`),
  ADD UNIQUE KEY `varchar_problemCategName` (`varchar_problemCategName`);

--
-- Indexes for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  ADD PRIMARY KEY (`int_problemID`);

--
-- Indexes for table `tbl_projectbidder`
--
ALTER TABLE `tbl_projectbidder`
  ADD PRIMARY KEY (`int_bidderID`);

--
-- Indexes for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  ADD PRIMARY KEY (`int_projectCategID`),
  ADD UNIQUE KEY `varchar_projectCategName` (`varchar_projectCategName`);

--
-- Indexes for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  ADD PRIMARY KEY (`int_projectID`);

--
-- Indexes for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  ADD PRIMARY KEY (`int_projrequireID`);

--
-- Indexes for table `tbl_projecttarget`
--
ALTER TABLE `tbl_projecttarget`
  ADD PRIMARY KEY (`int_projecttargetID`);

--
-- Indexes for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  ADD PRIMARY KEY (`int_requirementID`),
  ADD UNIQUE KEY `varchar_requirementName` (`varchar_requirementName`);

--
-- Indexes for table `tbl_requirementschedule`
--
ALTER TABLE `tbl_requirementschedule`
  ADD PRIMARY KEY (`int_requireschedID`);

--
-- Indexes for table `tbl_staffdetail`
--
ALTER TABLE `tbl_staffdetail`
  ADD PRIMARY KEY (`int_staffID`),
  ADD UNIQUE KEY `int_staffUserID` (`int_staffUserID`),
  ADD UNIQUE KEY `int_staffAddressID` (`int_staffAddressID`);

--
-- Indexes for table `tbl_targetbeneficiary`
--
ALTER TABLE `tbl_targetbeneficiary`
  ADD PRIMARY KEY (`int_beneficiaryID`),
  ADD UNIQUE KEY `varchar_beneficiaryName` (`varchar_beneficiaryName`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`int_userID`),
  ADD UNIQUE KEY `varchar_userEmailAddress` (`varchar_userEmailAddress`);

--
-- Indexes for table `tbl_workdetail`
--
ALTER TABLE `tbl_workdetail`
  ADD PRIMARY KEY (`int_applicationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_accountdetail`
--
ALTER TABLE `tbl_accountdetail`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_addressformat`
--
ALTER TABLE `tbl_addressformat`
  MODIFY `int_addressID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  MODIFY `int_announcementID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_applicationinfo`
--
ALTER TABLE `tbl_applicationinfo`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_apprequireID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_applicationwaver`
--
ALTER TABLE `tbl_applicationwaver`
  MODIFY `int_waverID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_award`
--
ALTER TABLE `tbl_award`
  MODIFY `int_awardID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `tbl_barangayaward`
--
ALTER TABLE `tbl_barangayaward`
  MODIFY `int_barangayAwardID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_educationalbackground`
--
ALTER TABLE `tbl_educationalbackground`
  MODIFY `int_educationalbgID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_familybackground`
--
ALTER TABLE `tbl_familybackground`
  MODIFY `int_familybgID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_incomedetail`
--
ALTER TABLE `tbl_incomedetail`
  MODIFY `int_incomeDetailID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_liabilities`
--
ALTER TABLE `tbl_liabilities`
  MODIFY `int_liabilityID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_message`
--
ALTER TABLE `tbl_message`
  MODIFY `int_messageID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_problemcategory`
--
ALTER TABLE `tbl_problemcategory`
  MODIFY `int_problemCategID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  MODIFY `int_problemID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_projectbidder`
--
ALTER TABLE `tbl_projectbidder`
  MODIFY `int_bidderID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projectCategID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projrequireID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_projecttarget`
--
ALTER TABLE `tbl_projecttarget`
  MODIFY `int_projecttargetID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_requirementschedule`
--
ALTER TABLE `tbl_requirementschedule`
  MODIFY `int_requireschedID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_staffdetail`
--
ALTER TABLE `tbl_staffdetail`
  MODIFY `int_staffID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_targetbeneficiary`
--
ALTER TABLE `tbl_targetbeneficiary`
  MODIFY `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_workdetail`
--
ALTER TABLE `tbl_workdetail`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

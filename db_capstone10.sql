-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2018 at 10:56 PM
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
-- Database: `db_capstone10`
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
(26, 9, 13, 'Received', '2018-08-02 00:00:00'),
(27, 9, 13, 'Pending', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationrequirement`
--

CREATE TABLE `tbl_applicationrequirement` (
  `int_appreqID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `enum_appreqStatus` enum('Passed','Not Passed') NOT NULL DEFAULT 'Passed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_applicationrequirement`
--

INSERT INTO `tbl_applicationrequirement` (`int_appreqID`, `int_applicationID`, `int_requirementID`, `enum_appreqStatus`) VALUES
(16, 27, 28, 'Passed'),
(17, 27, 17, 'Passed');

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
(9, 16, 2, 'Addition Hills', '226-6666', 'Blk. 12 Welfareville Compound', 'Active'),
(10, 18, 2, 'Bagong Silang', '514-8312/9953354', 'cor. J. Luna Street', 'Active'),
(11, 19, 2, 'Barangka Drive', '531-6544', '775 Barangka Drive cor. Sgt. Bumatay', 'Active'),
(12, 22, 2, 'Burol', '625-3352/535-2641', '1 Pag-Asa Street', 'Active'),
(13, 20, 2, 'Hulo', '534-5056/535-2505', 'Coronado Street', 'Active'),
(14, 21, 2, 'Malamig', '533-1319', '555 Cresta Circle Makiling Street', 'Active');

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
(8, 'Disaster Management ', 'Active'),
(10, 'Education', 'Active');

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
(26, 'Aurea', 'Napiza', 'Del Rosario', '1930-09-22', 'Female', 1930, 'Married', '(+63) 932-561-5161', 'aurea@gmail.com'),
(27, 'Fernando', '', 'Del Rosario', '1925-05-10', 'Male', 1925, 'Married', '(+63) 165-684-8656', 'fernando@gmail.com');

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
(19, 9, 6, NULL, 'Full Body Check Up and Medicine Kit Giving', 'Due to recent cough outbreak.', '2018-08-27', 'Acknowledged'),
(20, 9, 10, NULL, 'Check sweet alert', 'sjanjcsna', '2018-08-27', 'Rejected');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `int_projectID` int(11) NOT NULL,
  `date_startApplication` date DEFAULT NULL,
  `date_endApplication` date DEFAULT NULL,
  `date_releaseDate` date DEFAULT NULL,
  `date_projectClose` date DEFAULT NULL,
  `decimal_actualBudget` decimal(15,2) NOT NULL,
  `enum_projectStatus` enum('Approved','Ongoing','Closed','Releasing','Finished','Terminated') NOT NULL DEFAULT 'Approved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`int_projectID`, `date_startApplication`, `date_endApplication`, `date_releaseDate`, `date_projectClose`, `decimal_actualBudget`, `enum_projectStatus`) VALUES
(13, '2018-08-31', '2018-09-12', '2018-09-18', '2018-09-30', '1000000.00', 'Ongoing'),
(14, '2018-08-29', '2018-09-19', '2018-09-27', '2018-09-30', '1000000.00', 'Releasing');

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
(9, 15, 24),
(10, 14, 18),
(11, 13, 13),
(12, 13, 20),
(13, 13, 14);

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
(10, 13, 6),
(11, 15, 8),
(12, 14, 10),
(13, 14, 7);

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
(13, 2, 'Medicine Giving', 'Residents who really need these medicines will acquire it.', 'To help the residents who have a major or minor health issues.', 'Distribution of medicines for the residents. Limited supplies only.', 1000, 150, 3, 14, '1000000', '2018-08-28', 'Approved'),
(14, 2, 'Financial Assistance for Grade 4 students of Mababang Paaralan ng Sucat', 'It will help them to restore their school supplies that they recently used.', 'To help the students of Grade 4 students of Mababang Paaralan ng Sucat due to fire accident inside their building.', 'It will be given by the staffs of the municipal only. Each students will be given the same amount.', 1500, 150, 5, 10, '10000000', '2018-02-13', 'Approved'),
(15, 2, 'Distribution of Supplies for Fire Victims', 'Residents will received their supplies.', 'Give the residents who were affected by the fire. Given that they pass the required requirements.', 'Giving of supplies to residents. First come first served service (first to complete the requirements will automatically gain a slot).', 1000, 200, 5, 10, '3509995234', '2018-03-15', 'Pending');

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
(11, 28, 13),
(12, 17, 13),
(13, 30, 14),
(14, 28, 14),
(15, 28, 15),
(16, 30, 15);

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
(13, '123566', 'Received'),
(14, '132652', 'Received');

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
  `enum_userType` enum('Admin','Barangay Staff','Office Staff','Budget Office Staff') NOT NULL DEFAULT 'Barangay Staff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `varchar_userEmailAddress`, `varchar_userPassword`, `enum_userType`) VALUES
(14, 'admin@gmail.com', 'admin', 'Admin'),
(15, 'office@gmail.com', 'office', 'Office Staff'),
(16, 'barangay@gmail.com', 'barangay', 'Barangay Staff'),
(17, 'budget@gmail.com', 'budget', 'Budget Office Staff'),
(18, 'bagongsilang@gmail.com', 'bagongsilang', 'Barangay Staff'),
(19, 'barangkadrive@gmail.com', 'barangkadrive', 'Barangay Staff'),
(20, 'hulo@gmail.com', 'hulo', 'Barangay Staff'),
(21, 'malamig@gmail.com', 'malamig', 'Barangay Staff'),
(22, 'delrosariochewwy@gmail.com', 'L9NoJfYS', 'Barangay Staff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD PRIMARY KEY (`int_announcementID`),
  ADD KEY `user_idx` (`int_userID`);

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
  ADD KEY `cityID_idx` (`int_cityID`),
  ADD KEY `brgyuserID_idx` (`int_userID`);

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
  ADD PRIMARY KEY (`int_cityID`),
  ADD KEY `cityuserID_idx` (`int_userID`);

--
-- Indexes for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  ADD PRIMARY KEY (`int_expenseID`),
  ADD KEY `expactprojID_idx` (`int_projectID`);

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
-- Indexes for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  ADD PRIMARY KEY (`int_projreqID`),
  ADD KEY `propreqID_idx` (`int_projectID`),
  ADD KEY `reqpropID_idx` (`int_requirementID`);

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
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
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
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projcategID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `tbl_projectlocation`
--
ALTER TABLE `tbl_projectlocation`
  MODIFY `int_proglocID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `tbl_proposalapproval`
--
ALTER TABLE `tbl_proposalapproval`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  MODIFY `int_revisionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD CONSTRAINT `user` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
  ADD CONSTRAINT `brgycityID` FOREIGN KEY (`int_cityID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `brgyuserID` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
  ADD CONSTRAINT `appinfoID` FOREIGN KEY (`int_applicationID`) REFERENCES `tbl_application` (`int_applicationID`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
-- Constraints for table `tbl_proposalapproval`
--
ALTER TABLE `tbl_proposalapproval`
  ADD CONSTRAINT `paprojID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_project` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `papropID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  ADD CONSTRAINT `revpropID` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectproposal` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2018 at 02:50 AM
-- Server version: 5.7.14-log
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb_7`
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
  `datetime_receivedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangayapplication`
--

CREATE TABLE `tbl_barangayapplication` (
  `int_applicationID` int(11) NOT NULL,
  `int_slot` int(11) NOT NULL,
  `text_applicationReason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Table structure for table `tbl_beneficiary`
--

CREATE TABLE `tbl_beneficiary` (
  `int_beneficiaryID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(100) NOT NULL,
  `enum_beneficiaryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `int_categoryID` int(11) NOT NULL,
  `varchar_categoryName` varchar(100) NOT NULL,
  `enum_categoryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `enum_problemStatus` enum('Submitted','Acknowledged','Proposed','Solved','Rejected') NOT NULL DEFAULT 'Submitted'
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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectcategory`
--

CREATE TABLE `tbl_projectcategory` (
  `int_projcategID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `date_actualStartRelease` date DEFAULT NULL,
  `date_actualEndRelease` date DEFAULT NULL,
  `date_actualClosing` date DEFAULT NULL,
  `enum_projectStatus` enum('Created','Ongoing','Closed Application','Releasing','Closed Releasing','Finished','Terminated') NOT NULL DEFAULT 'Created',
  `decimal_actualBudget` decimal(20,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectrequirement`
--

CREATE TABLE `tbl_projectrequirement` (
  `int_projreqID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirement`
--

CREATE TABLE `tbl_requirement` (
  `int_requirementID` int(11) NOT NULL,
  `varchar_requirementName` varchar(100) NOT NULL,
  `enum_requirementStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  ADD KEY `projbene_idx` (`int_linkID`),
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
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_barangaybeneficiary`
--
ALTER TABLE `tbl_barangaybeneficiary`
  MODIFY `int_brgybeneID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_beneficiary`
--
ALTER TABLE `tbl_beneficiary`
  MODIFY `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `int_categoryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_city`
--
ALTER TABLE `tbl_city`
  MODIFY `int_cityID` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `tbl_intentstatement`
--
ALTER TABLE `tbl_intentstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_projectapplicationtype`
--
ALTER TABLE `tbl_projectapplicationtype`
  MODIFY `int_proapptypeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_projcategID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_projectdetail`
--
ALTER TABLE `tbl_projectdetail`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_projectreason`
--
ALTER TABLE `tbl_projectreason`
  MODIFY `int_projectReasonID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_unitmeasure`
--
ALTER TABLE `tbl_unitmeasure`
  MODIFY `tbl_unitMeasureID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `cityid` FOREIGN KEY (`int_officialsID`) REFERENCES `tbl_city` (`int_cityID`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `beneid` FOREIGN KEY (`int_beneficiaryID`) REFERENCES `tbl_beneficiary` (`int_beneficiaryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `intbene` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_intentstatement` (`int_statementID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projbene` FOREIGN KEY (`int_linkID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  ADD CONSTRAINT `categid` FOREIGN KEY (`int_categoryID`) REFERENCES `tbl_category` (`int_categoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projcateg` FOREIGN KEY (`int_projectID`) REFERENCES `tbl_projectdetail` (`int_projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

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

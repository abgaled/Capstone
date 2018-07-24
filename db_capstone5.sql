-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2018 at 02:02 PM
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
-- Database: `db_capstone5`
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
-- Table structure for table `tbl_address`
--

CREATE TABLE `tbl_address` (
  `int_addressID` int(11) NOT NULL,
  `varchar_addressLine1` varchar(120) NOT NULL,
  `varchar_addressLine2` varchar(120) DEFAULT NULL,
  `varchar_addressLine3` varchar(100) DEFAULT NULL,
  `varchar_cityName` varchar(100) NOT NULL,
  `enum_addressType` enum('Permanent','Temporary') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_address`
--

INSERT INTO `tbl_address` (`int_addressID`, `varchar_addressLine1`, `varchar_addressLine2`, `varchar_addressLine3`, `varchar_cityName`, `enum_addressType`) VALUES
(12, '13', 'Buli', 'Batangas', 'Mandaluyong City', 'Permanent');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

CREATE TABLE `tbl_announcement` (
  `int_announcementID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `varchar_announcementTitle` varchar(100) NOT NULL,
  `text_annoucementContent` text NOT NULL,
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
  `enum_applicationStatus` enum('New','Pending','Rejected','Accepted') NOT NULL DEFAULT 'New'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_application`
--

INSERT INTO `tbl_application` (`int_applicationID`, `int_barangayID`, `int_projectID`, `enum_applicationStatus`) VALUES
(16, 3, 1, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationcode`
--

CREATE TABLE `tbl_applicationcode` (
  `int_appcodeID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `char_applicationCode` char(10) NOT NULL,
  `enum_releasingStatus` enum('Pending','Received') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicationrequirement`
--

CREATE TABLE `tbl_applicationrequirement` (
  `int_appreqID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `varchar_requirementFile` varchar(100) DEFAULT NULL,
  `enum_appreqStatus` enum('Incomplete','Complete') NOT NULL DEFAULT 'Incomplete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_award`
--

CREATE TABLE `tbl_award` (
  `int_awardID` int(11) NOT NULL,
  `varchar_awardName` varchar(100) NOT NULL,
  `text_awardDescription` text NOT NULL,
  `enum_awardStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_award`
--

INSERT INTO `tbl_award` (`int_awardID`, `varchar_awardName`, `text_awardDescription`, `enum_awardStatus`) VALUES
(1, 'Most Active Barangay', 'Baranggay with most number of applications, requests and etc.', 'Active'),
(2, 'Barangay Solver of the Year (2018)', 'Baranggay with most number of statements.', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangay`
--

CREATE TABLE `tbl_barangay` (
  `int_barangayID` int(11) NOT NULL,
  `int_userID` int(11) DEFAULT NULL,
  `int_officeID` int(11) DEFAULT NULL,
  `varchar_barangayName` varchar(100) NOT NULL,
  `varchar_barangayChairman` varchar(100) NOT NULL,
  `text_barangayDescription` text,
  `varchar_barangayContact` varchar(100) NOT NULL,
  `enum_barangayStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_barangay`
--

INSERT INTO `tbl_barangay` (`int_barangayID`, `int_userID`, `int_officeID`, `varchar_barangayName`, `varchar_barangayChairman`, `text_barangayDescription`, `varchar_barangayContact`, `enum_barangayStatus`) VALUES
(28, 3, 1, 'Addition Hills', 'Kent Gajo Faminial', NULL, '534-0503', 'Active'),
(29, NULL, NULL, 'Bagong Silang', 'Marc Anthony I. Dominguez', NULL, '514-8312/9953354', 'Active'),
(30, NULL, NULL, 'Barangka Drive', 'Darwin A. Fernandez', NULL, '531-6544', 'Active'),
(31, NULL, NULL, 'Barangka Ibaba', 'Faustino O. Cruz Jr', NULL, '747-1497', 'Active'),
(32, NULL, NULL, 'Barangka Ilaya', 'Joselito C. Pangilinan', NULL, '531-0647', 'Active'),
(33, NULL, NULL, 'Barangka Itaas', 'Dannie DJ. Ocampo', NULL, '532-7564/533-7141', 'Active'),
(34, NULL, NULL, 'Buayang Bato', 'Reynaldo De Josep Nobela', NULL, '631-5903/470-3686', 'Active'),
(35, NULL, NULL, 'Burol', 'Ernesto F. Santos Jr.', NULL, '625-3352/535-2641', 'Active'),
(36, NULL, NULL, 'Daang Bakal', 'Richard B. Bassig', NULL, '535-3992/4639631', 'Active'),
(37, NULL, NULL, 'Hagdang Bato Itaas', 'Edmon B. Espiritu', NULL, '534-0345', 'Active'),
(38, NULL, NULL, 'Hagdang Bato Libis', 'Richmond Jae SD. Jamila', NULL, '535-4720', 'Active'),
(39, NULL, NULL, 'Harapin Ang Bukas', 'Federico Ogbac', NULL, '533-6611/748-7039', 'Active'),
(40, NULL, NULL, 'Highway Hills', 'Rolando A. Rugay', NULL, '533-6298/531-9432', 'Active'),
(41, NULL, NULL, 'Hulo', 'Bernardino C. Maglaque', NULL, '534-5056/535-2505', 'Active'),
(42, NULL, NULL, 'Mabini-J.Rizal', 'Angelina O. Tablan', NULL, '531-0643', 'Active'),
(43, NULL, NULL, 'Malamig', 'Marlon R. Manalo', NULL, '533-1319', 'Active'),
(44, NULL, NULL, 'Mauway', 'Denny Jayne S. Calimlim', NULL, '531-2753/531-0306', 'Active'),
(45, NULL, NULL, 'Namayan', 'Leonardo C. Santiago', NULL, '719-1736/794-0905', 'Active'),
(46, NULL, NULL, 'New Zaniga', 'Edwin E. Cruz', NULL, '533-5138/532-0725', 'Active'),
(47, NULL, NULL, 'Old Zaniga', 'Victorio M. Carolino', NULL, '719-2474/945-9328', 'Active'),
(48, NULL, NULL, 'Pag-asa', 'Tracy Rhoy R. Domingo', NULL, '533-9980/400-7158', 'Active'),
(49, NULL, NULL, 'Plainview', 'Michael C. Garcia', NULL, '534-1874', 'Active'),
(50, NULL, NULL, 'Pleasant Hills', 'Tagani M. Evangelista', NULL, '535-5431/533-4794', 'Active'),
(51, NULL, NULL, 'Poblacion', 'Godofredo A. Tolentino', NULL, '576-1161/535-0917', 'Active'),
(52, NULL, NULL, 'San Jose', 'Roniel Tuazon', NULL, '655-9918', 'Active'),
(53, NULL, NULL, 'Vergara', 'Ernesto C. Mendiola', NULL, '531-9900/719-0144', 'Active'),
(54, NULL, NULL, 'Wack-wack', 'Manuel P. Syquia', NULL, '722-4258/438-0321 to 22', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangayaward`
--

CREATE TABLE `tbl_barangayaward` (
  `int_brgyAwardID` int(11) NOT NULL,
  `int_awardID` int(11) NOT NULL,
  `int_barangayID` int(11) NOT NULL,
  `year_yearAwarded` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_beneficiary`
--

CREATE TABLE `tbl_beneficiary` (
  `int_beneficiaryID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(100) NOT NULL,
  `text_beneficiaryDescription` text NOT NULL,
  `enum_beneficiaryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_beneficiary`
--

INSERT INTO `tbl_beneficiary` (`int_beneficiaryID`, `varchar_beneficiaryName`, `text_beneficiaryDescription`, `enum_beneficiaryStatus`) VALUES
(1, 'Senior Citizen', 'A person over the age of 65.', 'Active'),
(2, '18 years old and above', 'A person of legal age.', 'Active'),
(3, 'Elementary Students', 'Students ranging from Grade 1 to Grade 6.', 'Active'),
(4, 'PWD', 'Person with Disability', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categoryform`
--

CREATE TABLE `tbl_categoryform` (
  `int_categformID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL,
  `int_formtypeID` int(11) NOT NULL,
  `enum_categformStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_categoryform`
--

INSERT INTO `tbl_categoryform` (`int_categformID`, `int_categoryID`, `int_formtypeID`, `enum_categformStatus`) VALUES
(1, 1, 1, 'Active'),
(2, 1, 3, 'Active'),
(3, 3, 2, 'Active'),
(4, 3, 5, 'Active'),
(5, 3, 6, 'Active'),
(6, 4, 1, 'Active'),
(7, 4, 3, 'Active'),
(8, 6, 3, 'Active'),
(9, 6, 4, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_educationalbg`
--

CREATE TABLE `tbl_educationalbg` (
  `int_educbgID` int(11) NOT NULL,
  `int_applicationID` int(11) NOT NULL,
  `int_schoolAddressID` int(11) NOT NULL,
  `varchar_schoolName` varchar(100) NOT NULL,
  `varchar_SY` char(9) NOT NULL COMMENT 'example: 2011-2015'
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
  `varchar_educationalAttainment` varchar(100) DEFAULT NULL,
  `date_familyBirthday` date DEFAULT NULL,
  `enum_applicantRelationship` enum('Mother','Father','Sister','Brother','Aunt','Uncle','Cousin','Son','Daugther','Spouse','Nephew','Niece','Grandchild','Grandparent') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_formtype`
--

CREATE TABLE `tbl_formtype` (
  `int_formTypeID` int(11) NOT NULL,
  `varchar_formName` varchar(100) NOT NULL,
  `text_formDescription` text NOT NULL,
  `enum_formStatus` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_formtype`
--

INSERT INTO `tbl_formtype` (`int_formTypeID`, `varchar_formName`, `text_formDescription`, `enum_formStatus`) VALUES
(1, 'Medical Form', 'In clinical medicine, the patient\'s past and present which may contain relevant information bearing on their health past, present, and future. The medical history, being an account of all medical events and problems a person has experienced is an important tool in the management of the patient.', 'Active'),
(2, 'Account Details', 'Financial records of an organization that register all financial transactions, and must be kept at its principal office or place of business. ... The annual accounts of a registered or incorporated firm are required by law to disclose a certain amount of information.', 'Active'),
(3, 'Family Background', 'Family background topic. [countable] the details of a person\'s family, education, experience, etc. a person\'s family/social/cultural/educational/class background The job would suit someone with a business background. In spite of their very different backgrounds, they immediately became friends.', 'Active'),
(4, 'Educational Background', 'Educational qualifications refers to the official confirmation, usually in the form of a certificate, diploma or degree, certifying the successful completion of an education program or a stage of a program.', 'Active'),
(5, 'Income Details', 'Income is money that an individual or business receives in exchange for providing a good or service or through investing capital. Income is used to fund day-to-day expenditures. ... In businesses, income can refer to a company\'s remaining revenues after paying all expenses and taxes.', 'Active'),
(6, 'Professional Background', '\"Tell me about your professional background\" could mean anything from what types of jobs you\'ve had to the training or education you completed to get to this stage in your career.', 'Active');

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
-- Table structure for table `tbl_medicalhistory`
--

CREATE TABLE `tbl_medicalhistory` (
  `int_medhistID` int(11) NOT NULL,
  `int_applicationID` int(11) DEFAULT NULL,
  `varchar_medication` varchar(100) NOT NULL,
  `text_medDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_office`
--

CREATE TABLE `tbl_office` (
  `int_officeID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `varchar_officeName` varchar(100) NOT NULL,
  `varchar_officeMayor` varchar(100) NOT NULL,
  `text_officeDescription` text NOT NULL,
  `enum_officeStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_office`
--

INSERT INTO `tbl_office` (`int_officeID`, `int_userID`, `varchar_officeName`, `varchar_officeMayor`, `text_officeDescription`, `enum_officeStatus`) VALUES
(1, 2, 'Mandaluyong City', 'Carmelita “Menchie” Aguilar Abalos', 'An empowered community, competent government sector human resource, and benevolent private sector working in an atmosphere of mutual assistance shaping Mandaluyong into a sustainable and globally competitive city and an effective partner in nation-building.', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_personalinformation`
--

CREATE TABLE `tbl_personalinformation` (
  `int_personalInfoID` int(11) NOT NULL,
  `int_addressID` int(11) NOT NULL,
  `int_infoOwnerID` int(11) NOT NULL,
  `varchar_firstName` varchar(100) NOT NULL,
  `varchar_middleName` varchar(100) NOT NULL,
  `varchar_lastName` varchar(100) NOT NULL,
  `date_birthday` date NOT NULL,
  `enum_gender` enum('Male','Female') NOT NULL,
  `int_applicantResidency` int(11) NOT NULL,
  `enum_civilStatus` enum('Single','Married','Live-in','Widowed') NOT NULL,
  `varchar_contactNumber` varchar(50) NOT NULL,
  `varchar_emailAddress` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_personalinformation`
--

INSERT INTO `tbl_personalinformation` (`int_personalInfoID`, `int_addressID`, `int_infoOwnerID`, `varchar_firstName`, `varchar_middleName`, `varchar_lastName`, `date_birthday`, `enum_gender`, `int_applicantResidency`, `enum_civilStatus`, `varchar_contactNumber`, `varchar_emailAddress`) VALUES
(2, 12, 3, 'Abigale', 'Punzalan', 'Del Rosario', '1999-06-13', 'Female', 2000, 'Single', '09156662933', 'delrosarioabigale@gmail.com');

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
  `enum_problemStatus` enum('Submitted','') NOT NULL DEFAULT 'Submitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_problemstatement`
--

INSERT INTO `tbl_problemstatement` (`int_statementID`, `int_barangayID`, `int_categoryID`, `varchar_statementTitle`, `text_statementContent`, `date_createdDate`, `enum_problemStatus`) VALUES
(1, 3, 1, 'Petition for full body check up and medicine giving for the residents of barangay Buli', 'Due to recent demolished nuclear plant leakage some residents said that it affects the growth of their plants that they eat that might affect their health.', '2018-07-08', 'Submitted'),
(2, 3, 1, 'Petition for full body check up and medicine giving for the residents of barangay Cupang', 'Check up', '2018-07-13', 'Submitted');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `int_projectID` int(11) NOT NULL,
  `date_projectStart` date NOT NULL,
  `date_projectEnd` date NOT NULL,
  `date_projectReleasing` date NOT NULL,
  `decimal_actualBudget` decimal(10,0) NOT NULL,
  `enum_projectStatus` enum('Open','Closed','Releasing','Terminated') NOT NULL DEFAULT 'Open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`int_projectID`, `date_projectStart`, `date_projectEnd`, `date_projectReleasing`, `decimal_actualBudget`, `enum_projectStatus`) VALUES
(1, '2018-07-24', '2018-08-31', '2018-08-20', '1000000', 'Open'),
(2, '2018-08-01', '2018-09-30', '2018-09-16', '1000000', 'Open');

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
(1, 1, 4),
(2, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectcategory`
--

CREATE TABLE `tbl_projectcategory` (
  `int_categoryID` int(11) NOT NULL,
  `varchar_categoryName` varchar(100) NOT NULL,
  `text_categoryDescription` text NOT NULL,
  `enum_categoryStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectcategory`
--

INSERT INTO `tbl_projectcategory` (`int_categoryID`, `varchar_categoryName`, `text_categoryDescription`, `enum_categoryStatus`) VALUES
(1, 'Medical', 'About the health of the residents.', 'Active'),
(2, 'Non-Residents', 'Residents are not to apply.', 'Active'),
(3, 'Monetary', 'Giving money for good purposes.', 'Active'),
(4, 'Health', 'Projects that gives medicinal support.', 'Active'),
(6, 'Education', 'Project that focuses on the educational purposes', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectproposal`
--

CREATE TABLE `tbl_projectproposal` (
  `int_projectID` int(11) NOT NULL,
  `int_categoryID` int(11) NOT NULL,
  `int_releaseLocationID` int(11) NOT NULL,
  `varchar_projectName` varchar(100) NOT NULL,
  `varchar_projectRationale` varchar(100) NOT NULL,
  `text_projectObjective` text NOT NULL,
  `text_projectDescription` text NOT NULL,
  `int_dayDuration` int(11) NOT NULL,
  `int_allotedSlot` int(11) NOT NULL,
  `decimal_estimatedBudget` decimal(10,0) NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_proposalStatus` enum('New','Reviewed','Under Revision','Rejected','Approved','Ready to Open') NOT NULL DEFAULT 'New' COMMENT 'New - Bagong send palang sa Budget  |  Reviewed - Nakita palang ni Budget kung ano yung laman nung project proposal  |  Under Revision - Nagcomment si Budget tungkol sa proposal at ibinalik ito sa office, kapag nasend na ulit ni office ung proposal, magiging ''Reviewed'' na ulit siya  |  Approved - naaprubahan na siya ng budget at dumaan na sa iba''t ibang higher offices, pero hindi pa siya pwedeng maopen or malagay sa tbl_project hanggang hindi pa naveverify ni office ung check number para sa fund nung project'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectproposal`
--

INSERT INTO `tbl_projectproposal` (`int_projectID`, `int_categoryID`, `int_releaseLocationID`, `varchar_projectName`, `varchar_projectRationale`, `text_projectObjective`, `text_projectDescription`, `int_dayDuration`, `int_allotedSlot`, `decimal_estimatedBudget`, `date_createdDate`, `enum_proposalStatus`) VALUES
(1, 1, 1, 'Medicine Giving', 'Residents who really need these medicines will acquire it.', 'To help the residents who have a major or minor health issues.', 'Distribution of medicines for the residents. Limited supplies only.', 100, 100, '1000000', '2018-05-15', 'Reviewed'),
(2, 2, 1, 'Financial Assistance for Grade 4 students of Mababang Paaralan ng Sucat', 'It will help them to restore their school supplies that they recently used.', 'To help the students of Grade 4 students of Mababang Paaralan ng Sucat due to fire accident inside their building.', 'It will be given by the staffs of the municipal only. Each students will be given the same amount.', 100, 500, '1000000', '2018-05-23', 'Ready to Open'),
(7, 0, 1, 'Distribution of Supplies for Fire Victims', 'Residents will received their supplies.', 'Give the residents who were affected by the fire. Given that they pass the required requirementsl.', 'Giving of supplies to residents. First come first served service (first to complete the requirements will automatically gain a slot).', 100, 100, '350000', '2018-06-06', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_projectrequirement`
--

CREATE TABLE `tbl_projectrequirement` (
  `int_projreqID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_projectrequirement`
--

INSERT INTO `tbl_projectrequirement` (`int_projreqID`, `int_projectID`, `int_requirementID`) VALUES
(1, 1, 4),
(2, 1, 10),
(3, 1, 11),
(4, 2, 3),
(5, 2, 4),
(6, 2, 10),
(7, 3, 9),
(8, 2, 11),
(9, 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_proposalapproval`
--

CREATE TABLE `tbl_proposalapproval` (
  `int_projectID` int(11) NOT NULL,
  `varchar_approvalLetter` varchar(100) NOT NULL COMMENT 'Naka filepath yung paglagay ng files sa db',
  `varchar_checkNumber` varchar(100) NOT NULL,
  `enum_propapprovalStatus` enum('Waiting','Received') NOT NULL DEFAULT 'Waiting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_releaselocation`
--

CREATE TABLE `tbl_releaselocation` (
  `int_locationID` int(11) NOT NULL,
  `varchar_locationName` varchar(100) NOT NULL,
  `int_locationAddressID` int(11) NOT NULL,
  `enum_locationStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active' COMMENT 'Pang active at disable para sa maintenance'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 'NBI Clearance', 'Document proof of no crime record.', 'Active'),
(2, 'Police Clearance', 'dummy data3', 'Inactive'),
(3, 'Student ID', 'Identification of students.', 'Active'),
(4, 'Birth Certificate', 'Companies often ask for a photocopy of receipt of application for your NSO Birth Certificate.', 'Active'),
(5, 'Transcript of Records/ Diploma', 'This is proof that you have finished the course is written in your CV. There is no need to submit the original, as some companies accept a photocopy with the school stamp.', 'Active'),
(6, 'SSS', 'The Social Security System or SSS is a monthly contribution for your future, say your pension or sick leave benefits. You can also loan from your SSS account provided you have made the necessary contributions. Have a ready photocopy of E1/E4/E6 form for your employer.', 'Active'),
(7, 'Pag-IBIG', 'Housing loans are backed by Pagtutulungan sa Kinabukasan: Ikaw, Bangko, Industria at Gobyerno or Pag-IBIG. Employees have a mandatory membership.', 'Active'),
(8, 'Philhealth', 'Discounts on hospital fees are provided by Philhealth. This health financing agency provides for universal health coverage.', 'Active'),
(9, 'BIR forms', 'The Bureau of Internal Revenue (BIR) is our tax collection agency. There are many forms from the BIR that you will need: your TIN registration form, TIN card, ITR/2316 from previous employer, and Form 1905/Transfer of RDO are some of them. Worry not, as most companies often apply for first time employees.', 'Active'),
(10, 'Barangay certificate of indigency', 'Issued by the medical social service of the hospital;', 'Active'),
(11, 'Valid ID', 'Any valid ID of the client', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_revisioncomment`
--

CREATE TABLE `tbl_revisioncomment` (
  `int_revisionID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `enum_proposalPart` enum('Name','Rationale','Description','Objective','Location','Category','Beneficiary','Requirement') NOT NULL,
  `text_commentContent` text NOT NULL,
  `enum_revisionStatus` enum('New','Revised') NOT NULL DEFAULT 'New' COMMENT 'New - Kakadating lng na comment  |  Revised - Nasend back na sa budget office ung revision'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL,
  `varchar_userEmailAddress` varchar(100) NOT NULL,
  `varchar_userPassword` varchar(100) NOT NULL,
  `enum_userType` enum('Admin','Budget Office Staff','Office Staff','Barangay Staff') NOT NULL
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
  ADD PRIMARY KEY (`int_appcodeID`);

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
  ADD PRIMARY KEY (`int_brgyAwardID`);

--
-- Indexes for table `tbl_beneficiary`
--
ALTER TABLE `tbl_beneficiary`
  ADD PRIMARY KEY (`int_beneficiaryID`);

--
-- Indexes for table `tbl_categoryform`
--
ALTER TABLE `tbl_categoryform`
  ADD PRIMARY KEY (`int_categformID`);

--
-- Indexes for table `tbl_educationalbg`
--
ALTER TABLE `tbl_educationalbg`
  ADD PRIMARY KEY (`int_educbgID`);

--
-- Indexes for table `tbl_formtype`
--
ALTER TABLE `tbl_formtype`
  ADD PRIMARY KEY (`int_formTypeID`);

--
-- Indexes for table `tbl_medicalhistory`
--
ALTER TABLE `tbl_medicalhistory`
  ADD PRIMARY KEY (`int_medhistID`);

--
-- Indexes for table `tbl_office`
--
ALTER TABLE `tbl_office`
  ADD PRIMARY KEY (`int_officeID`),
  ADD UNIQUE KEY `varchar_officeName` (`varchar_officeName`);

--
-- Indexes for table `tbl_personalinformation`
--
ALTER TABLE `tbl_personalinformation`
  ADD PRIMARY KEY (`int_personalInfoID`);

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
  ADD PRIMARY KEY (`int_categoryID`),
  ADD UNIQUE KEY `varchar_categoryName` (`varchar_categoryName`);

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
  MODIFY `int_addressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  MODIFY `int_announcementID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_application`
--
ALTER TABLE `tbl_application`
  MODIFY `int_applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `tbl_applicationcode`
--
ALTER TABLE `tbl_applicationcode`
  MODIFY `int_appcodeID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_applicationrequirement`
--
ALTER TABLE `tbl_applicationrequirement`
  MODIFY `int_appreqID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_award`
--
ALTER TABLE `tbl_award`
  MODIFY `int_awardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_barangay`
--
ALTER TABLE `tbl_barangay`
  MODIFY `int_barangayID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `tbl_barangayaward`
--
ALTER TABLE `tbl_barangayaward`
  MODIFY `int_brgyAwardID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_beneficiary`
--
ALTER TABLE `tbl_beneficiary`
  MODIFY `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_categoryform`
--
ALTER TABLE `tbl_categoryform`
  MODIFY `int_categformID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tbl_educationalbg`
--
ALTER TABLE `tbl_educationalbg`
  MODIFY `int_educbgID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_formtype`
--
ALTER TABLE `tbl_formtype`
  MODIFY `int_formTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_medicalhistory`
--
ALTER TABLE `tbl_medicalhistory`
  MODIFY `int_medhistID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_office`
--
ALTER TABLE `tbl_office`
  MODIFY `int_officeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_personalinformation`
--
ALTER TABLE `tbl_personalinformation`
  MODIFY `int_personalInfoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_problemstatement`
--
ALTER TABLE `tbl_problemstatement`
  MODIFY `int_statementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_project`
--
ALTER TABLE `tbl_project`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_projectbeneficiary`
--
ALTER TABLE `tbl_projectbeneficiary`
  MODIFY `int_projbeneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_projectcategory`
--
ALTER TABLE `tbl_projectcategory`
  MODIFY `int_categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_projectproposal`
--
ALTER TABLE `tbl_projectproposal`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_projectrequirement`
--
ALTER TABLE `tbl_projectrequirement`
  MODIFY `int_projreqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tbl_proposalapproval`
--
ALTER TABLE `tbl_proposalapproval`
  MODIFY `int_projectID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_releaselocation`
--
ALTER TABLE `tbl_releaselocation`
  MODIFY `int_locationID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_requirement`
--
ALTER TABLE `tbl_requirement`
  MODIFY `int_requirementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tbl_revisioncomment`
--
ALTER TABLE `tbl_revisioncomment`
  MODIFY `int_revisionID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

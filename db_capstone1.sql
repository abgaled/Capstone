-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_capstone1
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_accountdetail`
--

DROP TABLE IF EXISTS `tbl_accountdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_accountdetail` (
  `int_applicationID` int(11) NOT NULL AUTO_INCREMENT,
  `int_gsisNumber` int(11) DEFAULT NULL,
  `int_sssNumber` int(11) DEFAULT NULL,
  `int_tinNumber` int(11) DEFAULT NULL,
  `int_crnNumber` int(11) DEFAULT NULL,
  `int_philHealthNumber` int(11) DEFAULT NULL,
  `int_hdmfNumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`int_applicationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_accountdetail`
--

LOCK TABLES `tbl_accountdetail` WRITE;
/*!40000 ALTER TABLE `tbl_accountdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_accountdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_addressformat`
--

DROP TABLE IF EXISTS `tbl_addressformat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_addressformat` (
  `int_addressID` int(11) NOT NULL AUTO_INCREMENT,
  `varchar_addressLine1` varchar(100) NOT NULL,
  `varchar_addressLine2` varchar(100) DEFAULT NULL,
  `varchar_addressLine3` varchar(100) DEFAULT NULL,
  `varchar_addrsesCity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`int_addressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_addressformat`
--

LOCK TABLES `tbl_addressformat` WRITE;
/*!40000 ALTER TABLE `tbl_addressformat` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_addressformat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_announcement`
--

DROP TABLE IF EXISTS `tbl_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_announcement` (
  `int_announcementID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `varchar_announcementTitle` varchar(100) NOT NULL,
  `text_announcementDescription` text NOT NULL,
  `date_postedDate` date NOT NULL,
  PRIMARY KEY (`int_announcementID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_announcement`
--

LOCK TABLES `tbl_announcement` WRITE;
/*!40000 ALTER TABLE `tbl_announcement` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_application`
--

DROP TABLE IF EXISTS `tbl_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_application` (
  `int_applicationID` int(11) NOT NULL AUTO_INCREMENT,
  `int_barangayID` int(11) NOT NULL,
  `int_projectID` int(11) NOT NULL,
  `enum_applicationStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending',
  PRIMARY KEY (`int_applicationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_application`
--

LOCK TABLES `tbl_application` WRITE;
/*!40000 ALTER TABLE `tbl_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_applicationinfo`
--

DROP TABLE IF EXISTS `tbl_applicationinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_applicationinfo` (
  `int_applicationID` int(11) NOT NULL AUTO_INCREMENT,
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
  `varchar_applicantTelephone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`int_applicationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_applicationinfo`
--

LOCK TABLES `tbl_applicationinfo` WRITE;
/*!40000 ALTER TABLE `tbl_applicationinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_applicationinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_applicationrequirement`
--

DROP TABLE IF EXISTS `tbl_applicationrequirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_applicationrequirement` (
  `int_apprequireID` int(11) NOT NULL AUTO_INCREMENT,
  `int_applicationID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `blob_requiredFile` blob,
  `enum_apprequireStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending',
  PRIMARY KEY (`int_apprequireID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_applicationrequirement`
--

LOCK TABLES `tbl_applicationrequirement` WRITE;
/*!40000 ALTER TABLE `tbl_applicationrequirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_applicationrequirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_applicationwaver`
--

DROP TABLE IF EXISTS `tbl_applicationwaver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_applicationwaver` (
  `int_waverID` int(11) NOT NULL AUTO_INCREMENT,
  `int_applicationID` int(11) NOT NULL,
  `blob_applicantSignature` blob,
  `date_receivedDate` date DEFAULT NULL,
  `enum_releaseStatus` enum('Done','Pending') DEFAULT 'Pending',
  PRIMARY KEY (`int_waverID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_applicationwaver`
--

LOCK TABLES `tbl_applicationwaver` WRITE;
/*!40000 ALTER TABLE `tbl_applicationwaver` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_applicationwaver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_award`
--

DROP TABLE IF EXISTS `tbl_award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_award` (
  `int_awardID` int(11) NOT NULL AUTO_INCREMENT,
  `varchar_awardName` varchar(50) NOT NULL,
  `text_awardDescription` text NOT NULL,
  PRIMARY KEY (`int_awardID`),
  UNIQUE KEY `varchar_awardName` (`varchar_awardName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_award`
--

LOCK TABLES `tbl_award` WRITE;
/*!40000 ALTER TABLE `tbl_award` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_award` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_barangay`
--

DROP TABLE IF EXISTS `tbl_barangay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_barangay` (
  `int_barangayID` int(11) NOT NULL AUTO_INCREMENT,
  `int_barangayUserID` int(11) DEFAULT NULL,
  `varchar_barangayName` varchar(100) NOT NULL,
  `varchar_barangayChairman` varchar(100) NOT NULL,
  `int_barangayDistrict` int(11) NOT NULL,
  `varchar_barangayContact` varchar(50) DEFAULT NULL,
  `enum_barangayStatus` enum('Active','Inactive') DEFAULT 'Active',
  PRIMARY KEY (`int_barangayID`),
  UNIQUE KEY `varchar_barangayName` (`varchar_barangayName`),
  UNIQUE KEY `int_barangayUserID` (`int_barangayUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_barangay`
--

LOCK TABLES `tbl_barangay` WRITE;
/*!40000 ALTER TABLE `tbl_barangay` DISABLE KEYS */;
INSERT INTO `tbl_barangay` VALUES (28,NULL,'Addition Hills','Kent Gajo Faminial',1,'534-0503','Active'),(29,NULL,'Bagong Silang','Marc Anthony I. Dominguez',1,'514-8312/9953354','Active'),(30,NULL,'Barangka Drive','Darwin A. Fernandez',2,'531-6544','Active'),(31,NULL,'Barangka Ibaba','Faustino O. Cruz Jr',2,'747-1497','Active'),(32,NULL,'Barangka Ilaya','Joselito C. Pangilinan',2,'531-0647','Active'),(33,NULL,'Barangka Itaas','Dannie DJ. Ocampo',2,'532-7564/533-7141','Active'),(34,NULL,'Buayang Bato','Reynaldo De Josep Nobela',2,'631-5903/470-3686','Active'),(35,NULL,'Burol','Ernesto F. Santos Jr.',1,'625-3352/535-2641','Active'),(36,NULL,'Daang Bakal','Richard B. Bassig',1,'535-3992/4639631','Active'),(37,NULL,'Hagdang Bato Itaas','Edmon B. Espiritu',1,'534-0345','Active'),(38,NULL,'Hagdang Bato Libis','Richmond Jae SD. Jamila',1,'535-4720','Active'),(39,NULL,'Harapin Ang Bukas','Federico Ogbac',1,'533-6611/748-7039','Active'),(40,NULL,'Highway Hills','Rolando A. Rugay',1,'533-6298/531-9432','Active'),(41,NULL,'Hulo','Bernardino C. Maglaque',2,'534-5056/535-2505','Active'),(42,NULL,'Mabini-J.Rizal','Angelina O. Tablan',2,'531-0643','Active'),(43,NULL,'Malamig','Marlon R. Manalo',2,'533-1319','Active'),(44,NULL,'Mauway','Denny Jayne S. Calimlim',1,'531-2753/531-0306','Active'),(45,NULL,'Namayan','Leonardo C. Santiago',2,'719-1736/794-0905','Active'),(46,NULL,'New Zaniga','Edwin E. Cruz',1,'533-5138/532-0725','Active'),(47,NULL,'Old Zaniga','Victorio M. Carolino',2,'719-2474/945-9328','Active'),(48,NULL,'Pag-asa','Tracy Rhoy R. Domingo',1,'533-9980/400-7158','Active'),(49,NULL,'Plainview','Michael C. Garcia',2,'534-1874','Active'),(50,NULL,'Pleasant Hills','Tagani M. Evangelista',1,'535-5431/533-4794','Active'),(51,NULL,'Poblacion','Godofredo A. Tolentino',1,'576-1161/535-0917','Active'),(52,NULL,'San Jose','Roniel Tuazon',2,'655-9918','Active'),(53,NULL,'Vergara','Ernesto C. Mendiola',2,'531-9900/719-0144','Active'),(54,NULL,'Wack-wack','Manuel P. Syquia',1,'722-4258/438-0321 to 22','Active');
/*!40000 ALTER TABLE `tbl_barangay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_barangayaward`
--

DROP TABLE IF EXISTS `tbl_barangayaward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_barangayaward` (
  `int_barangayAwardID` int(11) NOT NULL AUTO_INCREMENT,
  `int_barangayID` int(11) NOT NULL,
  `int_awardID` int(11) NOT NULL,
  PRIMARY KEY (`int_barangayAwardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_barangayaward`
--

LOCK TABLES `tbl_barangayaward` WRITE;
/*!40000 ALTER TABLE `tbl_barangayaward` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_barangayaward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_educationalbackground`
--

DROP TABLE IF EXISTS `tbl_educationalbackground`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_educationalbackground` (
  `int_educationalbgID` int(11) NOT NULL AUTO_INCREMENT,
  `int_applicationID` int(11) NOT NULL,
  `int_schoolAddressID` int(11) DEFAULT NULL,
  `enum_educationalLevel` enum('Primary','Secondary','College','Diplomatic') DEFAULT NULL,
  `varchar_schoolName` varchar(100) NOT NULL,
  `year_startYear` date DEFAULT NULL,
  `year_endYear` date DEFAULT NULL,
  PRIMARY KEY (`int_educationalbgID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_educationalbackground`
--

LOCK TABLES `tbl_educationalbackground` WRITE;
/*!40000 ALTER TABLE `tbl_educationalbackground` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_educationalbackground` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_familybackground`
--

DROP TABLE IF EXISTS `tbl_familybackground`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_familybackground` (
  `int_familybgID` int(11) NOT NULL AUTO_INCREMENT,
  `int_applicationID` int(11) NOT NULL,
  `varchar_familyFName` varchar(100) NOT NULL,
  `varchar_familyMName` varchar(100) DEFAULT NULL,
  `varchar_familyLName` varchar(100) NOT NULL,
  `varchar_educationalAttainment` varchar(100) DEFAULT NULL,
  `date_familyBirthday` date DEFAULT NULL,
  `enum_applicantRelationship` enum('Mother','Father','Sister','Brother','Aunt','Uncle','Cousin','Son','Daugther','Spouse','Nephew','Niece','Grandchild','Grandparent') DEFAULT NULL,
  PRIMARY KEY (`int_familybgID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_familybackground`
--

LOCK TABLES `tbl_familybackground` WRITE;
/*!40000 ALTER TABLE `tbl_familybackground` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_familybackground` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_incomedetail`
--

DROP TABLE IF EXISTS `tbl_incomedetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_incomedetail` (
  `int_incomeDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `int_applicationID` int(11) NOT NULL,
  `varchar_incomeSource` varchar(100) NOT NULL,
  `varchar_incomeMaker` varchar(100) NOT NULL,
  `varchar_incomeSpouse` varchar(100) NOT NULL,
  PRIMARY KEY (`int_incomeDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_incomedetail`
--

LOCK TABLES `tbl_incomedetail` WRITE;
/*!40000 ALTER TABLE `tbl_incomedetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_incomedetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_liabilities`
--

DROP TABLE IF EXISTS `tbl_liabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_liabilities` (
  `int_liabilityID` int(11) NOT NULL AUTO_INCREMENT,
  `int_applicationID` int(11) NOT NULL,
  `varchar_expenseName` varchar(100) NOT NULL,
  `decimal_expenseCost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`int_liabilityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_liabilities`
--

LOCK TABLES `tbl_liabilities` WRITE;
/*!40000 ALTER TABLE `tbl_liabilities` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_liabilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_message`
--

DROP TABLE IF EXISTS `tbl_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_message` (
  `int_messageID` int(11) NOT NULL AUTO_INCREMENT,
  `int_senderID` int(11) NOT NULL,
  `int_receiverID` int(11) NOT NULL,
  `varchar_messageTitle` varchar(100) NOT NULL,
  `text_messageContent` text NOT NULL,
  `date_createdDate` date NOT NULL,
  PRIMARY KEY (`int_messageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_message`
--

LOCK TABLES `tbl_message` WRITE;
/*!40000 ALTER TABLE `tbl_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_problemcategory`
--

DROP TABLE IF EXISTS `tbl_problemcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_problemcategory` (
  `int_problemCategID` int(11) NOT NULL AUTO_INCREMENT,
  `varchar_problemCategName` varchar(50) NOT NULL,
  `text_problemCategDescription` text NOT NULL,
  PRIMARY KEY (`int_problemCategID`),
  UNIQUE KEY `varchar_problemCategName` (`varchar_problemCategName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_problemcategory`
--

LOCK TABLES `tbl_problemcategory` WRITE;
/*!40000 ALTER TABLE `tbl_problemcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_problemcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_problemstatement`
--

DROP TABLE IF EXISTS `tbl_problemstatement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_problemstatement` (
  `int_problemID` int(11) NOT NULL AUTO_INCREMENT,
  `int_barangayID` int(11) NOT NULL,
  `int_problemCategID` int(11) NOT NULL,
  `varchar_statementTitle` varchar(100) NOT NULL,
  `varchar_statementDescription` text NOT NULL,
  `date_createdDate` date NOT NULL,
  `enum_problemStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending',
  PRIMARY KEY (`int_problemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_problemstatement`
--

LOCK TABLES `tbl_problemstatement` WRITE;
/*!40000 ALTER TABLE `tbl_problemstatement` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_problemstatement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_project`
--

DROP TABLE IF EXISTS `tbl_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_project` (
  `int_projectID` int(11) NOT NULL,
  `date_startDate` date DEFAULT NULL,
  `date_endDate` date DEFAULT NULL,
  `date_approvedDate` date DEFAULT NULL,
  `date_releaseDate` date DEFAULT NULL,
  `decimal_actualBudget` decimal(10,2) DEFAULT NULL,
  `enum_projectStatus` enum('Open','Closed','Releasing','Terminated') DEFAULT 'Open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_project`
--

LOCK TABLES `tbl_project` WRITE;
/*!40000 ALTER TABLE `tbl_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_projectbidder`
--

DROP TABLE IF EXISTS `tbl_projectbidder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_projectbidder` (
  `int_bidderID` int(11) NOT NULL AUTO_INCREMENT,
  `int_projectID` int(11) NOT NULL,
  `varchar_beneficiaryName` varchar(50) NOT NULL,
  PRIMARY KEY (`int_bidderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_projectbidder`
--

LOCK TABLES `tbl_projectbidder` WRITE;
/*!40000 ALTER TABLE `tbl_projectbidder` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_projectbidder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_projectcategory`
--

DROP TABLE IF EXISTS `tbl_projectcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_projectcategory` (
  `int_projectCategID` int(11) NOT NULL AUTO_INCREMENT,
  `varchar_projectCategName` varchar(50) NOT NULL,
  `text_projectCategDescription` text NOT NULL,
  PRIMARY KEY (`int_projectCategID`),
  UNIQUE KEY `varchar_projectCategName` (`varchar_projectCategName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_projectcategory`
--

LOCK TABLES `tbl_projectcategory` WRITE;
/*!40000 ALTER TABLE `tbl_projectcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_projectcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_projectproposal`
--

DROP TABLE IF EXISTS `tbl_projectproposal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_projectproposal` (
  `int_projectID` int(11) NOT NULL AUTO_INCREMENT,
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
  `enum_proposalStatus` enum('Accepted','Pending','Rejected') DEFAULT 'Pending',
  PRIMARY KEY (`int_projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_projectproposal`
--

LOCK TABLES `tbl_projectproposal` WRITE;
/*!40000 ALTER TABLE `tbl_projectproposal` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_projectproposal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_projectrequirement`
--

DROP TABLE IF EXISTS `tbl_projectrequirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_projectrequirement` (
  `int_projrequireID` int(11) NOT NULL AUTO_INCREMENT,
  `int_projectID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  PRIMARY KEY (`int_projrequireID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_projectrequirement`
--

LOCK TABLES `tbl_projectrequirement` WRITE;
/*!40000 ALTER TABLE `tbl_projectrequirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_projectrequirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_projecttarget`
--

DROP TABLE IF EXISTS `tbl_projecttarget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_projecttarget` (
  `int_projecttargetID` int(11) NOT NULL AUTO_INCREMENT,
  `int_projectID` int(11) NOT NULL,
  `int_beneficiaryID` int(11) NOT NULL,
  PRIMARY KEY (`int_projecttargetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_projecttarget`
--

LOCK TABLES `tbl_projecttarget` WRITE;
/*!40000 ALTER TABLE `tbl_projecttarget` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_projecttarget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirement`
--

DROP TABLE IF EXISTS `tbl_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirement` (
  `int_requirementID` int(11) NOT NULL AUTO_INCREMENT,
  `varchar_requirementName` varchar(50) NOT NULL,
  `text_requirementDescription` text NOT NULL,
  PRIMARY KEY (`int_requirementID`),
  UNIQUE KEY `varchar_requirementName` (`varchar_requirementName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirement`
--

LOCK TABLES `tbl_requirement` WRITE;
/*!40000 ALTER TABLE `tbl_requirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementschedule`
--

DROP TABLE IF EXISTS `tbl_requirementschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementschedule` (
  `int_requireschedID` int(11) NOT NULL AUTO_INCREMENT,
  `int_apprequireID` int(11) NOT NULL,
  `date_scheduledDate` date DEFAULT NULL,
  `enum_requireschedStatus` enum('Finished','Pending','Canceled') DEFAULT 'Pending',
  PRIMARY KEY (`int_requireschedID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementschedule`
--

LOCK TABLES `tbl_requirementschedule` WRITE;
/*!40000 ALTER TABLE `tbl_requirementschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_requirementschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_staffdetail`
--

DROP TABLE IF EXISTS `tbl_staffdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_staffdetail` (
  `int_staffID` int(11) NOT NULL AUTO_INCREMENT,
  `int_staffUserID` int(11) DEFAULT NULL,
  `int_staffAddressID` int(11) DEFAULT NULL,
  `varchar_staffFName` varchar(100) NOT NULL,
  `varchar_staffMName` varchar(100) DEFAULT NULL,
  `varchar_staffLName` varchar(100) NOT NULL,
  `varchar_staffPosition` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`int_staffID`),
  UNIQUE KEY `int_staffUserID` (`int_staffUserID`),
  UNIQUE KEY `int_staffAddressID` (`int_staffAddressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_staffdetail`
--

LOCK TABLES `tbl_staffdetail` WRITE;
/*!40000 ALTER TABLE `tbl_staffdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_staffdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_targetbeneficiary`
--

DROP TABLE IF EXISTS `tbl_targetbeneficiary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_targetbeneficiary` (
  `int_beneficiaryID` int(11) NOT NULL AUTO_INCREMENT,
  `varchar_beneficiaryName` varchar(50) NOT NULL,
  `text_beneficiaryDescription` text NOT NULL,
  PRIMARY KEY (`int_beneficiaryID`),
  UNIQUE KEY `varchar_beneficiaryName` (`varchar_beneficiaryName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_targetbeneficiary`
--

LOCK TABLES `tbl_targetbeneficiary` WRITE;
/*!40000 ALTER TABLE `tbl_targetbeneficiary` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_targetbeneficiary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL AUTO_INCREMENT,
  `varchar_userEmailAddress` varchar(100) NOT NULL,
  `varchar_userPassword` varchar(100) NOT NULL,
  `enum_userType` enum('Admin','Office Staff','Budget Office Staff','Barangay Staff') NOT NULL DEFAULT 'Barangay Staff',
  PRIMARY KEY (`int_userID`),
  UNIQUE KEY `varchar_userEmailAddress` (`varchar_userEmailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'admin@gmail.com','admin','Admin'),(2,'office@gmail.com','office','Office Staff'),(3,'barangay@gmail.com','barangay','Barangay Staff'),(4,'budget@gmail.com','budget','Budget Office Staff');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_workdetail`
--

DROP TABLE IF EXISTS `tbl_workdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_workdetail` (
  `int_applicationID` int(11) NOT NULL AUTO_INCREMENT,
  `int_companyAddressID` int(11) NOT NULL,
  `varchar_companyName` varchar(100) NOT NULL,
  `enum_employmentStatus` enum('A','B') DEFAULT NULL,
  PRIMARY KEY (`int_applicationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_workdetail`
--

LOCK TABLES `tbl_workdetail` WRITE;
/*!40000 ALTER TABLE `tbl_workdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_workdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_capstone1'
--

--
-- Dumping routines for database 'db_capstone1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-20 23:44:14

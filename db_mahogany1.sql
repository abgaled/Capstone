-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2018 at 02:48 PM
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
-- Database: `db_mahogany1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

CREATE TABLE `tbl_announcement` (
  `int_announceID` int(11) NOT NULL,
  `varchar_announceTitle` varchar(100) NOT NULL,
  `varchar_announceContent` varchar(500) NOT NULL,
  `date_announceDate` date NOT NULL,
  `int_userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_announcement`
--

INSERT INTO `tbl_announcement` (`int_announceID`, `varchar_announceTitle`, `varchar_announceContent`, `date_announceDate`, `int_userID`) VALUES
(1, 'Announcement #1', 'Delayed distribution of books due to bad weather. - Thank You!', '2018-04-04', 7),
(2, 'No classes for tomorrow!!!', 'All the staffs will attend a meeting at Muntinlupa City Hall. Please be guided accordingly. Thank You.', '2018-04-04', 7),
(3, 'Presentation Day!', 'Web Dev', '2018-04-06', 7),
(4, 'Announcement #1', 'Presentation in web dev.', '2018-04-06', 7);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_calendar`
--

CREATE TABLE `tbl_calendar` (
  `int_calendarID` int(11) NOT NULL,
  `varchar_calendarSubject` varchar(100) NOT NULL,
  `varchar_calendarContent` varchar(200) NOT NULL,
  `date_calendarDate` date NOT NULL,
  `int_userID` int(11) NOT NULL,
  `int_calendarMonth` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_forum`
--

CREATE TABLE `tbl_forum` (
  `int_forumID` int(11) NOT NULL,
  `varchar_forumSubject` varchar(100) NOT NULL,
  `varchar_forumContent` varchar(200) NOT NULL,
  `date_forumDate` date NOT NULL,
  `int_userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_grade`
--

CREATE TABLE `tbl_grade` (
  `int_gradeID` int(11) NOT NULL,
  `char_gradeHalf` char(4) NOT NULL,
  `char_gradeGrade` char(50) NOT NULL,
  `varchar_gradeComment` varchar(100) NOT NULL,
  `int_gradeTeacher` int(11) NOT NULL,
  `int_gradeStudent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_interview`
--

CREATE TABLE `tbl_interview` (
  `int_interviewID` int(11) NOT NULL,
  `date_interviewDate` date NOT NULL,
  `varchar_interviewTime` varchar(20) NOT NULL,
  `char_interviewRoom` char(20) NOT NULL,
  `int_interviewTeacher` int(11) NOT NULL,
  `int_interviewParent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_message`
--

CREATE TABLE `tbl_message` (
  `int_messageID` int(11) NOT NULL,
  `varchar_messageSubject` varchar(50) NOT NULL,
  `varchar_messageContent` varchar(200) NOT NULL,
  `date_messageDate` date NOT NULL,
  `int_messageSender` int(11) NOT NULL,
  `int_messageReceiver` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_report`
--

CREATE TABLE `tbl_report` (
  `int_reportID` int(11) NOT NULL,
  `varchar_reportTitle` varchar(100) NOT NULL,
  `varchar_reportContent` varchar(100) NOT NULL,
  `date_reportDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schedule`
--

CREATE TABLE `tbl_schedule` (
  `int_scheduleID` int(11) NOT NULL,
  `varchar_scheduleClass` varchar(50) NOT NULL,
  `varchar_scheduleDay` varchar(50) NOT NULL,
  `varchar_scheduleTime` varchar(20) NOT NULL,
  `char_scheduleRoom` char(50) NOT NULL,
  `int_userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE `tbl_student` (
  `int_studentID` int(11) NOT NULL,
  `varchar_studentFName` varchar(50) NOT NULL,
  `varchar_studentMName` varchar(50) NOT NULL,
  `varchar_studentLName` varchar(50) NOT NULL,
  `char_studentGender` varchar(20) NOT NULL,
  `date_studentBirthday` date NOT NULL,
  `varchar_studentClass` varchar(20) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `char_studentStatus` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`int_studentID`, `varchar_studentFName`, `varchar_studentMName`, `varchar_studentLName`, `char_studentGender`, `date_studentBirthday`, `varchar_studentClass`, `int_userID`, `char_studentStatus`) VALUES
(1, 'Abigale', 'Punzalan', 'Del Rosario', 'Female', '1999-06-13', 'Nursery', 6, 'Enrollee'),
(2, 'Angelika ', 'Punzalan', 'Del Rosario', 'Female', '1997-12-18', 'Pre-kinder', 8, 'Enrollee'),
(3, 'Abby', 'Aww', 'Del Rosario', 'Female', '1999-06-13', 'Kinder', 10, 'Enrollee'),
(4, 'Kenji', 'Del Rosario', 'Manabat', 'Male', '2010-06-13', 'Kinder1A', 0, 'Enrolled'),
(5, 'Abigale', '', 'Del Rosario', 'Female', '2001-06-13', 'Nursery', 11, 'Enrollee');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL,
  `varchar_userFName` varchar(50) NOT NULL,
  `varchar_userMName` varchar(50) NOT NULL,
  `varchar_userLName` varchar(100) NOT NULL,
  `varchar_userAddress` varchar(100) NOT NULL,
  `varchar_userEmail` varchar(50) NOT NULL,
  `varchar_userContact` varchar(20) NOT NULL,
  `varchar_userPassword` varchar(50) NOT NULL,
  `varchar_userType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `varchar_userFName`, `varchar_userMName`, `varchar_userLName`, `varchar_userAddress`, `varchar_userEmail`, `varchar_userContact`, `varchar_userPassword`, `varchar_userType`) VALUES
(6, 'Marlon', 'Napiza', 'Del Rosario', '13D Buli Muntinlupa City', 'barangay@gmail.com', '09156662933', 'barangay', 'Barangay Staff'),
(7, 'Mel', 'Punzalan', 'Del Rosario', '456 Lemery Batangas', 'office@gmail.com', '09387713312', 'office', 'Office Staff'),
(8, 'Emeliana ', 'Punzalan', 'Del Rosario', '13D Buli Muntinlupa City', 'delrosarioabigale@gmail.com', '09156662933', 'miyaka13', 'Parent'),
(9, 'Abby', 'Punzalan', 'Del Rosario', '13D Buli', 'admin@gmail.com', '09156662933', 'admin', 'Admin'),
(10, 'Aurea', 'Aww', 'Del Rosario', '13D Buli Muntinlupa', 'budget@gmail.com', '09156662933', 'budget', 'Budget Staff'),
(11, 'Matthew', '', 'Victore', '13 Sta Mesa', 'matthew@gmail.com', '09156662933', 'miyaka13', 'Parent');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD PRIMARY KEY (`int_announceID`);

--
-- Indexes for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  ADD PRIMARY KEY (`int_calendarID`);

--
-- Indexes for table `tbl_forum`
--
ALTER TABLE `tbl_forum`
  ADD PRIMARY KEY (`int_forumID`);

--
-- Indexes for table `tbl_grade`
--
ALTER TABLE `tbl_grade`
  ADD PRIMARY KEY (`int_gradeID`);

--
-- Indexes for table `tbl_interview`
--
ALTER TABLE `tbl_interview`
  ADD PRIMARY KEY (`int_interviewID`);

--
-- Indexes for table `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD PRIMARY KEY (`int_messageID`);

--
-- Indexes for table `tbl_report`
--
ALTER TABLE `tbl_report`
  ADD PRIMARY KEY (`int_reportID`);

--
-- Indexes for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  ADD PRIMARY KEY (`int_scheduleID`);

--
-- Indexes for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD PRIMARY KEY (`int_studentID`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`int_userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  MODIFY `int_announceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  MODIFY `int_calendarID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_forum`
--
ALTER TABLE `tbl_forum`
  MODIFY `int_forumID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_grade`
--
ALTER TABLE `tbl_grade`
  MODIFY `int_gradeID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_interview`
--
ALTER TABLE `tbl_interview`
  MODIFY `int_interviewID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_message`
--
ALTER TABLE `tbl_message`
  MODIFY `int_messageID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_report`
--
ALTER TABLE `tbl_report`
  MODIFY `int_reportID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  MODIFY `int_scheduleID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_student`
--
ALTER TABLE `tbl_student`
  MODIFY `int_studentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2018 at 07:52 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinemabooking`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(100) NOT NULL,
  `uname` varchar(100) NOT NULL,
  `uusername` varchar(100) NOT NULL,
  `upassword` varchar(100) NOT NULL,
  `uhash` varchar(100) NOT NULL,
  `uemail` varchar(100) NOT NULL,
  `umobile` int(10) NOT NULL,
  `uaddress` text NOT NULL,
  `cardnumber` int NOT NULL,
  `expirymonth` int(2) NOT NULL,
  `expiryyear` int(4) NOT NULL,
  `uactive` int(100) NOT NULL DEFAULT '0'

) ENGINE=InnoDB DEFAULT CHARSET=latin1; 

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `uname`, `uusername`, `upassword`, `uhash`, `uemail`, `umobile`, `uaddress`, `cardnumber`,`expirymonth`,`expiryyear`,`uactive`) VALUES
(1, 'Naveen Kurra', 'freedom', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'nk121@gmail.com', '7064617558', 'abcde',1234567812345678, 06,2028, 0),
(2, 'Shanwaz K', 'shan', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'sk198@gmail.com', '7064617558', 'abcde',1234567812345678, 06,2028,0),
(3, 'Raymond Jackie F', 'RJF', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'rjf121@gmail.com', '7064617552', 'abcde', 1234567812345678, 06,2028,0),
(4, 'Punith K', 'venkata', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'vk134@gmail.com', '7064617551', 'abcde', 1234567812345678, 06,2028,0);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(255) NOT NULL,
  `aname` varchar(255) NOT NULL,
  `ausername` varchar(255) NOT NULL,
  `apassword` varchar(255) NOT NULL,
  `ahash` varchar(255) NOT NULL,
  `aemail` varchar(255) NOT NULL,
  `amobile` varchar(255) NOT NULL,
  `aaddress` text NOT NULL,
  `aactive` int(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `aname`, `ausername`, `apassword`, `ahash`, `aemail`, `amobile`, `aaddress`, `aactive`) VALUES
(1, 'Naveen Kurra', 'freedom', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'nk121@gmail.com', '7064617551', 'abcde', 0),
(2, 'Raymond Jakie F', 'Befree', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'rjf198@gmail.com', '7064617551', 'abcde', 0),
(3, 'Punith', 'freesoul', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'vk122@gmail.com', '7064617551', 'abcde', 0),
(4, 'Shanwaz', 'spreadsmiles', '$2y$10$22ezmzHRa9c5ycHmVm5RpOnlT4LwFaDZar1XhmLRJQKGrcVRhPgti', '61b4a64be663682e8cb037d9719ad8cd', 'sk198@gmail.com', '7064617551', 'abcde', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Movies`
--

CREATE TABLE `movies` (
  `aid` int(255) NOT NULL,
  `mid` int(255) NOT NULL,
  `moviename` varchar(255) NOT NULL,
  `movielanguage` varchar(255) NOT NULL,
  `minfo` varchar(255) NOT NULL,
  `moviebookingstartdate` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `mimage` varchar(255) NOT NULL DEFAULT 'blank.png',
  `picStatus` int(10) NOT NULL DEFAULT '0',
  `trailerlink` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Dumping data for table `Movies`
--

INSERT INTO `movies` (`aid`, `mid`, `moviename`, `movielanguage`,`minfo`,`moviebookingstartdate`, `price`, `mimage`, `picStatus`,`trailerlink`) VALUES
(1, 1, 'Avatar','English','best collected movie\r\n','09-24-2022', 23, 'Avatar.jpeg', 1,'https://www.youtube.com/watch?v=3Soht3ISW-E'),
(1, 2, 'EndGame','English','sad to hear that ironman was dead\r\n','09-24-2022', 23, 'endgame.jpeg', 1,'https://www.youtube.com/watch?v=3Soht3ISW-E'),
(1, 3, 'HarryPorter','English','The revolutionary movie\r\n','09-24-2022', 23, 'Harryporter.jpeg', 1,'https://www.youtube.com/watch?v=3Soht3ISW-E'),
(1, 4, 'FantasticBeasts','English','The beasts are fantastic here\r\n','09-24-2022', 23, 'Fb.jpeg', 1,'https://www.youtube.com/watch?v=3Soht3ISW-E');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `mid` int(255) NOT NULL,
  `daterange` varchar(255) NOT NULL,
  `showsavailiable` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`mid`, `daterange`, `showsavailiable`) VALUES
(1, '09-24-2022 to 10-10-2022', 5),
(2, '09-24-2022 to 10-10-2022', 5),
(3, '09-24-2022 to 10-10-2022', 5),
(4, '09-24-2022 to 10-10-2022', 5);

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE `shows` (
  `sid` int(255) NOT NULL,
  `mid` int(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `seatsavailiable` int NOT NULL,
  `seatingpositionsavailable` int NOT NULL,
  `isshowavailiable` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shows`
--

INSERT INTO `shows` (`sid`, `mid`,`date`, `seatsavailiable`, `seatingpositionsavailable`,`isshowavailiable`) VALUES
(1, 1 ,'09-24-2022', 250, 211,0),
(2, 1 ,'09-24-2022', 250, 211,0),
(3, 2 ,'09-24-2022', 250, 211,0),
(4, 3 ,'09-24-2022', 250, 211,0);

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `uid` int(255) NOT NULL,
  `mid` int(255) NOT NULL,
  `numberoftickets` int NOT NULL,
  `billingaddress` varchar(255) NOT NULL,
  `zipcode` int(6) NOT NULL,
  `cardnumber` int NOT NULL,
  `expirymonth` int(2) NOT NULL,
  `expiryyear` int(4) NOT NULL,
  `ticketcost` float NOT NULL,
  `taxes` float NOT NULL,
  `totalamount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Checkout`
--

INSERT INTO `checkout` (`uid`, `mid`,`numberoftickets`, `billingaddress`,`zipcode`, `cardnumber`, `expirymonth`, `expiryyear`, `ticketcost`,`taxes`,`totalamount`) VALUES
(1, 1,1,'APT 211 1000 Lakeside dr. Athens GA', 30605, 1234567812345678, 06,28,22.2,1.23,23.43),
(2, 1,2,'APT 211 1000 Lakeside dr. Athens GA', 30605, 1234567812345678, 06,28,22.2,1.23,23.43),
(3, 1,1,'Downtown Athens GA', 30605, 1234567812345678, 06,28,22.2,1.23,23.43),
(4, 1,1,'APT 211 1000 Lakeside dr. Athens GA', 30605, 1234567812345678, 06,28,22.2,1.23,23.43);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
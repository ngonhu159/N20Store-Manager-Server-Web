-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2021 at 07:37 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `n20_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `name` text NOT NULL,
  `type` text NOT NULL,
  `code` text NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `warranty` int(11) NOT NULL,
  `storage` text NOT NULL,
  `photo` longtext NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`name`, `type`, `code`, `price`, `quantity`, `warranty`, `storage`, `photo`, `description`) VALUES
('Đèn trợ sáng', 'Đèn trợ sáng', 'TS001', 150000, 0, 12, 'R01C12', 'https://vn-test-11.slatic.net/p/1f8044fc5da26bd3413c3c7f8dd01fd4.jpg_360x360q90.jpg_.webp', 'Đèn trợ sáng cho xe exciter.  tiếp tại shop.'),
('DE', 'DTS', 'TS101', 200000, 15, 3, 'R01C25', 'https://vcdn.tikicdn.com/ts/tmp/e6/66/41/63371f003d3bf91481fc64592b4dc7a4.jpg', 'Đèn trợ sáng cho xe exciter. Hỗ trợ lắp đặt khi mua hàng trực tiếp tại N20 Store.'),
('Đèn xi nhan', 'DXN', 'XN', 100000, 16, 2, 'R01C25', 'https://bizweb.dktcdn.net/100/248/668/products/img-0907-9-18-07-am-jpg.jpg?v=1552117241397', 'Đèn xì nhan xe máy.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`code`(5));
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

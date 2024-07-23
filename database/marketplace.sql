-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2024 at 05:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketplace`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `plu` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `productCategoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedUser` varchar(255) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `plu`, `name`, `productCategoryId`, `active`, `createdUser`, `createdDate`, `updatedUser`, `updatedDate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('1eda080d-ee9d-46d7-ad52-3dbdb2c8192e', 'PDCT00002', 'Supermie', '26bfadda-b7d6-41f4-9834-3c21fb93b046', 1, NULL, '2024-07-23 14:50:15', NULL, NULL, '2024-07-23 14:50:15', '2024-07-23 14:50:15', NULL),
('92442d84-5d14-402f-9888-e6a41b64fea0', 'PDCT00001', 'Supermie', '26bfadda-b7d6-41f4-9834-3c21fb93b046', 1, NULL, '2024-07-23 14:44:25', NULL, NULL, '2024-07-23 14:44:25', '2024-07-23 14:44:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedUser` varchar(255) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`, `createdUser`, `createdDate`, `updatedUser`, `updatedDate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('0225bc39-3b60-4137-9b47-55dcc663939a', 'shampoo', NULL, '2024-07-23 10:05:54', NULL, NULL, '2024-07-23 10:05:54', '2024-07-23 10:05:54', NULL),
('26bfadda-b7d6-41f4-9834-3c21fb93b046', 'mie instan', NULL, '2024-07-23 10:05:54', NULL, NULL, '2024-07-23 10:05:54', '2024-07-23 10:05:54', NULL),
('66042939-48a9-4655-b71b-703484b2ae8f', 'sabun mandi', NULL, '2024-07-23 10:05:54', NULL, NULL, '2024-07-23 10:05:54', '2024-07-23 10:05:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_varians`
--

CREATE TABLE `product_varians` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `imageLocation` varchar(255) DEFAULT NULL,
  `qty` double DEFAULT 0,
  `price` double DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedUser` varchar(255) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_varians`
--

INSERT INTO `product_varians` (`id`, `productId`, `code`, `imageLocation`, `qty`, `price`, `active`, `createdUser`, `createdDate`, `updatedUser`, `updatedDate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('494df3de-7edb-4938-a2dd-bcebf28200e1', '1eda080d-ee9d-46d7-ad52-3dbdb2c8192e', 'PD000002', 'http://localhost:3000/assets/products/1721746215520-supermie-ayambawang.jpg', 121, 2500, 1, NULL, '2024-07-23 14:50:15', NULL, NULL, '2024-07-23 14:50:15', '2024-07-23 14:50:15', NULL),
('f5fe3ef8-9d20-4f54-bd08-2ff2dbad6922', '92442d84-5d14-402f-9888-e6a41b64fea0', 'PD000001', 'http://localhost:3000/assets/products/1721745696630-supermie-ayambawang.jpg', 1212, 2500, 1, NULL, '2024-07-23 14:44:25', NULL, NULL, '2024-07-23 14:44:25', '2024-07-23 14:44:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `permissions` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `isActive`, `permissions`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('e9c0735e-9227-4b4a-8a0e-31824a04df6a', 'administrator', NULL, 1, '[{\"name\":\"Dashboard\",\"description\":\"\",\"selected\":true},{\"name\":\"Product\",\"description\":\"\",\"selected\":true},{\"name\":\"Category\",\"description\":\"\",\"selected\":true},{\"name\":\"Transaction\",\"description\":\"\",\"selected\":true}]', '2024-07-23 10:05:54', '2024-07-23 10:05:54', NULL),
('f21148e8-9ae0-49cb-825f-175782895943', 'customer', NULL, 1, '[{\"name\":\"Transaction\",\"description\":\"\",\"selected\":true}]', '2024-07-23 10:05:54', '2024-07-23 10:05:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shopping-cart`
--

CREATE TABLE `shopping-cart` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `qty` double DEFAULT 0,
  `price` double DEFAULT 0,
  `subtotal` double DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedUser` varchar(255) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `shoppingCartId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productVarianId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `transactionNo` varchar(255) DEFAULT NULL,
  `totalAmount` double DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedUser` varchar(255) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE `transaction_details` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `qty` double DEFAULT 0,
  `price` double DEFAULT 0,
  `subtotal` double DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedUser` varchar(255) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `transactionId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productVarianId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `roleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedUser` varchar(255) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `refresh_token`, `firstName`, `lastName`, `roleId`, `createdUser`, `createdDate`, `updatedUser`, `updatedDate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('96a71481-b859-4006-bc94-3eff1f03204d', 'customer@example.com', '$2b$10$c4jIGrVcUq2g7cZP/9P66unNVBUEvrrmCl4Bt1YEFPNb.eZPkthUC', '', 'Customer', '', 'f21148e8-9ae0-49cb-825f-175782895943', NULL, '2024-07-23 10:05:54', NULL, NULL, '2024-07-23 10:05:54', '2024-07-23 10:05:54', NULL),
('b8101267-f0cd-445e-b556-66a70fdd39ad', 'admin@example.com', '$2b$10$c4jIGrVcUq2g7cZP/9P66unNVBUEvrrmCl4Bt1YEFPNb.eZPkthUC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiODEwMTI2Ny1mMGNkLTQ0NWUtYjU1Ni02NmE3MGZkZDM5YWQiLCJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIxNzQ3NTMxLCJleHAiOjE3MjE5MjAzMzF9.pM_cE9S-Svxth7vk4yS08UOOz3grpyc2wunW1weZ8Js', 'Admin', '', 'e9c0735e-9227-4b4a-8a0e-31824a04df6a', NULL, '2024-07-23 10:05:54', NULL, NULL, '2024-07-23 10:05:54', '2024-07-23 15:12:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_varians`
--
ALTER TABLE `product_varians`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping-cart`
--
ALTER TABLE `shopping-cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

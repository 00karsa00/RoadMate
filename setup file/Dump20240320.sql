-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: interview_task
-- ------------------------------------------------------
-- Server version	5.5.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `billdetails`
--

DROP TABLE IF EXISTS `billdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `billNumber` varchar(255) NOT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `ewayBillNumber` varchar(255) DEFAULT NULL,
  `billDate` datetime DEFAULT NULL,
  `deliveryDate` datetime DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `deliveryAddress` varchar(255) DEFAULT NULL,
  `transactionMode` varchar(255) DEFAULT NULL,
  `vehicleNumber` varchar(255) DEFAULT NULL,
  `deliveryCharge` double DEFAULT NULL,
  `totalTxableAmt` double DEFAULT NULL,
  `outStanding` varchar(255) DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `gstAmount` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `roundOff` varchar(255) DEFAULT NULL,
  `grandTotal` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `paymentMode` varchar(255) DEFAULT NULL,
  `isIgst` tinyint(1) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `billNumber` (`billNumber`),
  UNIQUE KEY `ewayBillNumber` (`ewayBillNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billdetails`
--

LOCK TABLES `billdetails` WRITE;
/*!40000 ALTER TABLE `billdetails` DISABLE KEYS */;
INSERT INTO `billdetails` VALUES (1,'TR1','Karthick','kdnsjlnjsf','2024-03-19 00:00:00','2024-03-19 00:00:00','6380126094','test','test test','kldm;fmd;fmd','her809',NULL,24444,'lkwme;we',5,1411.56,25277.56,'0',25277.56,'done','BOTH',0,'.,mda.wm;.',NULL,NULL),(2,'TR2',NULL,NULL,'2024-03-20 07:08:42',NULL,NULL,NULL,NULL,NULL,NULL,NULL,102,NULL,0,6.12,118.12,'0',118.12,NULL,NULL,NULL,NULL,NULL,NULL),(3,'TR3',NULL,NULL,'2024-03-20 07:11:44',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,0,0,'0',0,NULL,NULL,NULL,NULL,NULL,NULL),(4,'TR4',NULL,NULL,'2024-03-20 10:34:23',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'TR5',NULL,NULL,'2024-03-20 10:38:04',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Pending',NULL,NULL,NULL,NULL,NULL),(6,'TR6',NULL,NULL,'2024-03-20 12:00:32',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Pending',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `billdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billingitemdetails`
--

DROP TABLE IF EXISTS `billingitemdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billingitemdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `itemName` varchar(255) NOT NULL,
  `batchCode` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `unitPrice` double NOT NULL,
  `mrp` double NOT NULL,
  `taxValue` double NOT NULL,
  `gstInPrecent` double NOT NULL,
  `gstInAmount` double NOT NULL,
  `total` double NOT NULL,
  `staff` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `billNo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billingitemdetails`
--

LOCK TABLES `billingitemdetails` WRITE;
/*!40000 ALTER TABLE `billingitemdetails` DISABLE KEYS */;
INSERT INTO `billingitemdetails` VALUES (1,'test','testtest','test',9,42,9,9,9,9,9,'9','2024-01-26 17:37:45','2024-01-26 17:37:45',''),(4,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(5,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(6,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(7,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(8,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(9,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(10,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(11,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(12,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(13,'1534','product 2','BC1344',1,1002,1002,105,6,60.12,1167.12,NULL,NULL,NULL,'TR1'),(14,'1534','product 2','BC1344',1,1002,1002,105,6,60.12,1167.12,NULL,NULL,NULL,'TR1'),(15,'1234','product 1','BC1234',10,102,102,10,6,6.12,118.12,'ka',NULL,NULL,'TR1'),(16,'13335','product 4','BC1934',1,10200,10200,10,6,612,10822,NULL,NULL,NULL,'TR1'),(17,'13335','product 4','BC1934',1,10200,10200,10,6,612,10822,NULL,NULL,NULL,'TR1'),(18,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR1'),(28,'1234','product 1','BC1234',1,102,102,10,6,6.12,118.12,NULL,NULL,NULL,'TR2');
/*!40000 ALTER TABLE `billingitemdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemdetails`
--

DROP TABLE IF EXISTS `itemdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `batchCode` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `taxValue` double NOT NULL,
  `gstPercent` double NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `batchCode` (`batchCode`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemdetails`
--

LOCK TABLES `itemdetails` WRITE;
/*!40000 ALTER TABLE `itemdetails` DISABLE KEYS */;
INSERT INTO `itemdetails` VALUES (1,'product 1','BC1234','1234',102,10,6,'2024-01-25 18:00:05','2024-01-25 18:00:05'),(2,'product 2','BC1344','1534',1002,105,6,'2024-01-25 18:00:05','2024-01-25 18:00:05'),(3,'product 3','BC1204','1535',10002,10,6,'2024-01-25 18:00:05','2024-01-25 18:00:05'),(4,'product 4','BC1934','13335',10200,10,6,'2024-01-25 18:00:05','2024-01-25 18:00:05'),(5,'','','',0,0,0,NULL,NULL),(6,'teat','t2','te1',10,10,10,NULL,NULL),(7,'kar','tw1','tt',10,6,7,NULL,NULL);
/*!40000 ALTER TABLE `itemdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'karthi111','karthic111k@gmail.com','$2b$10$XhqzoHikmUCR/yKhii0mZ.lWW1IDFwlKhwawoMqJHw.jVQolcSOeK','2024-01-26 08:40:18','2024-01-26 08:40:18'),(2,'wertyuio','karthick@gmail.com','$2b$10$irYNrIn4YdV8HIBHOHegxugvywgF1TX3wy6WVJkJnRwk6IuRC3j.m','2024-01-26 08:57:17','2024-01-26 08:57:17'),(9,'wertyuio1','karthick1@gmail.com','$2b$10$JGTDg9Pel9wW5N6NICHoAet8WI3cWSWkSNhKBpNtEcgcvSI4yvWhW','2024-01-26 08:57:31','2024-01-26 08:57:31'),(20,'wertyuio11','karthick11@gmail.com','$2b$10$wxHiYuS5mUe3lUin/JbvwOMyrxopljZlTwWuDtH9n.xL1eolylZVa','2024-01-26 08:58:19','2024-01-26 08:58:19'),(27,'w11111111','karthick11111@gmail.com','$2b$10$kKBaT./ROmDZUEvw8logJeKhI0sPaJVmg.6ojl1o8OCWnderwIJ0a','2024-01-26 08:58:51','2024-01-26 08:58:51'),(57,'karrqqq11','karthiskam11@gmail.com','$2b$10$E96Te8CtMDr6zD9k5/lbL.xjfQMiMjxZgzPSDQDnFJCVLtbNB3wc.','2024-01-26 09:05:17','2024-01-26 09:05:17'),(58,'kjlre','karthicksaravanan08@gmail.com','$2b$10$nwD2tDSRQArnYP3QgoWDOuLLKoFDbKWOjxEz/U1iBWFSU/WSsO.Eq','2024-01-26 09:06:42','2024-01-26 09:06:42'),(59,'cvdfv','vdsfv@gmail.com','$2b$10$/MiigDR8HagrMnfuJd055u3FhqmzrcWDWNN3F48hXAUBirU5PF5tW','2024-01-26 09:09:53','2024-01-26 09:09:53'),(62,'cvdfv1','vdsfv1@gmail.com','$2b$10$lhhzhPi764A60BytLyKJKekLrmxTofN7ViTy5EcTHJ.M8YGQEczKy','2024-01-26 09:10:05','2024-01-26 09:10:05'),(63,'fdasfd','fa@gmail.com','$2b$10$hCNtIAWenzEAFYSQR28a4eG8IJ3gW6MAMTmmG9WBm4Zrk3ymHEDQy','2024-01-26 09:10:48','2024-01-26 09:10:48'),(64,'admin','admin@gmail.com','$2b$10$GbYl4c1RjH4XUYd7FzYpPuhHsDckaBMZiOWUJ76Vf7qg5Xh2GnrPS','2024-01-26 09:12:36','2024-01-26 09:12:36'),(66,'admin1','admin@admin.com','$2b$10$UMbY1CSuCTqlrCnFVyt1FOznTl5hXOZUFSPX2zlW2m1b4Ph9Op67W','2024-03-05 18:32:36','2024-03-05 18:32:36'),(71,'karthick111','karthi1@gmail11.com','$2b$10$0z8flM0TN8rSKJeip8pqEeRB4dQPBcrUsHl6PMSfC9SuavvnniW4e','2024-03-09 11:52:01','2024-03-09 11:52:01'),(72,'karthick','Admin1@gmail.com','$2b$10$mV2C2PeJ0hncrNT7L5/BnOWf6U9Xon88HBwX0vgk01OfwZVpxpqy6',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-20 12:02:39

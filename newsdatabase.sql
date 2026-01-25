CREATE DATABASE  IF NOT EXISTS `news` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `news`;
-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (x86_64)
--
-- Host: 127.0.0.1    Database: news
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `body` text NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Breaking: New AI Model Reaches Human-Level Performance','Researchers at a leading tech company announced today that their latest artificial intelligence model has achieved human-level performance on a wide range of benchmarks. The model, which took three years to develop, shows promising applications in natural language processing, image recognition, and complex problem-solving tasks.',1,'2026-01-18 16:11:24','technology'),(2,'Museum Opens New Contemporary Art Exhibition','The city\'s main art museum unveiled its latest exhibition featuring works from emerging contemporary artists. The collection includes paintings, sculptures, and interactive installations that explore themes of identity and modern society. The exhibition will run through the end of the year.',1,'2026-01-18 16:15:41','culture'),(3,'Local Theater Premieres New Original Stage Production','The city\'s central theater debuted a new original production this week, blending dramatic storytelling with live music and innovative stage design. The show features a cast of local performers and explores themes of community, ambition, and change through a contemporary lens. The production will run through the end of the season, with additional weekend matinees scheduled.',1,'2026-01-18 19:49:19','culture'),(4,'City Council Approves New Housing Development Plan','The city council has approved a new housing development plan aimed at increasing the availability of affordable homes over the next five years. The proposal includes a mix of rental units and owner-occupied housing, with an emphasis on sustainable building practices and improved public transport access. Construction is expected to begin early next year following final environmental reviews.',2,'2026-01-25 10:06:58','news'),(5,'Home Team Secures Dramatic Victory in Season Opener','Fans were treated to a thrilling season opener as the home team secured a last-minute victory in front of a sold-out crowd. After trailing for most of the match, the team rallied in the final minutes with a decisive goal that sealed the win. Coaches praised the squad’s resilience and teamwork, calling it a strong start to the season.',2,'2026-01-25 10:07:14','sports'),(6,'Local Museum Opens Exhibition on Modern Nordic Art','A new exhibition focusing on modern Nordic art opened at the local museum this weekend. The collection showcases works from contemporary artists across Scandinavia, highlighting themes of identity, nature, and social change. Curators hope the exhibition will spark dialogue and attract a broader audience throughout its three-month run.',2,'2026-01-25 10:07:25','culture'),(7,'Startup Launches AI Tool to Simplify Everyday Productivity','A local tech startup has launched a new AI-powered productivity tool designed to help users organise tasks, manage schedules, and reduce digital clutter. The platform uses machine learning to adapt to user habits over time, offering personalised suggestions and reminders. Early testers report improved focus and time management since adopting the tool.',2,'2026-01-25 10:07:34','technology');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jason@newsagency.com','$2b$10$O7VGDWADDE7VgYVJZ6uNmO9KcXhlAysbYdE4Zp7LvxRH9eWXPqnNC','2026-01-18 16:19:09'),(2,'johannes@newsagency.com','$2b$10$cFZ42M64xIT.inQq2qAboO.y9qttgVFK34TR4eysEuwL4jMy1p8nW','2026-01-25 10:02:23');
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

-- Dump completed on 2026-01-25 11:12:10

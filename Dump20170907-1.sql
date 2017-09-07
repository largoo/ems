CREATE DATABASE  IF NOT EXISTS `ems` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ems`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: ems
-- ------------------------------------------------------
-- Server version	5.7.18-log

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
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(45) NOT NULL COMMENT '邮箱账号',
  `password` varchar(45) DEFAULT NULL COMMENT '邮箱密码',
  `type` varchar(45) NOT NULL COMMENT '0 发送者\n1 接收者',
  `smtp` varchar(45) DEFAULT NULL COMMENT 'smtp服务器',
  `del` int(11) NOT NULL DEFAULT '0' COMMENT '删除标识符\n0正常\n1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email`
--

LOCK TABLES `email` WRITE;
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
INSERT INTO `email` VALUES (1,'eqdzs@sina.com','eqdzs1','0','smtp@sina.com',0),(2,'xiang.xu@dzssolar.com',NULL,'1',NULL,0),(3,'jason168@126.com',NULL,'1',NULL,0),(4,'kasim76@126.com',NULL,'1',NULL,1);
/*!40000 ALTER TABLE `email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equip`
--

DROP TABLE IF EXISTS `equip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equip` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(100) NOT NULL COMMENT 'ID',
  `idver` int(11) NOT NULL DEFAULT '0',
  `manu` varchar(100) DEFAULT NULL COMMENT '制造商名称',
  `model` varchar(100) DEFAULT NULL COMMENT '型号',
  `assetno` varchar(100) DEFAULT NULL COMMENT '固定资产编号',
  `opendate` varchar(100) DEFAULT NULL COMMENT '开箱日期',
  `openfilename` varchar(100) DEFAULT NULL COMMENT '开箱文档',
  `openfilesavename` varchar(100) DEFAULT NULL COMMENT '开箱文档真实文件名',
  `openfilepath` varchar(100) DEFAULT NULL COMMENT '开箱文档路径',
  `moveindate` varchar(100) DEFAULT NULL COMMENT '进厂日期',
  `locatedate` varchar(100) DEFAULT NULL COMMENT '设备定位日期',
  `hookupdate` varchar(100) DEFAULT NULL COMMENT '设备二次配完成日期',
  `hookupfilename` varchar(100) DEFAULT NULL COMMENT '设备二次配附表',
  `hookupfilesavename` varchar(100) DEFAULT NULL COMMENT '设备二次配附表真实文件名',
  `hookupfilepath` varchar(100) DEFAULT NULL COMMENT '设备二次配附表路径',
  `powerondate` varchar(100) DEFAULT NULL COMMENT '上电日期',
  `togy` varchar(100) DEFAULT NULL COMMENT '交付工艺日期',
  `togyfilename` varchar(100) DEFAULT NULL COMMENT '交付工艺附档文件名',
  `togyfilesavename` varchar(100) DEFAULT NULL COMMENT '交付工艺附档文件真实名',
  `togyfilepath` varchar(100) DEFAULT NULL COMMENT '交付工艺附档文件路径',
  `toproductdate` varchar(100) DEFAULT NULL COMMENT '交付生产',
  `fatdate` varchar(100) DEFAULT NULL COMMENT 'FAT日期',
  `fatfilename` varchar(100) DEFAULT NULL COMMENT 'FAT文档名',
  `fatfilesavename` varchar(100) DEFAULT NULL COMMENT 'FAT文档真实文件名',
  `fatfilepath` varchar(100) DEFAULT NULL COMMENT 'FAT文件路径',
  `warrantydatestart` varchar(100) DEFAULT NULL COMMENT '保固日期开始',
  `warrantydateend` varchar(100) DEFAULT NULL COMMENT '保固日期结束',
  `linetype` int(11) DEFAULT NULL COMMENT '设备归线类别',
  `ver` int(11) NOT NULL DEFAULT '0' COMMENT '版本号',
  `del` int(11) NOT NULL DEFAULT '0' COMMENT '删除标识符',
  `createuserid` int(11) NOT NULL COMMENT '创建者id',
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `islock` int(11) DEFAULT '0' COMMENT '以否已归档\n0：未结档\n1：已结档',
  `lockuserid` int(11) DEFAULT NULL COMMENT '结档操作的用户id',
  `lockdate` varchar(100) DEFAULT NULL COMMENT '结档日期',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '设备状态标识符\n0：正常\n1：保养\n2：异常',
  `sver` int(11) NOT NULL DEFAULT '0' COMMENT '状态乐观锁',
  `equipcol1` varchar(45) DEFAULT NULL,
  `equipcol2` varchar(45) DEFAULT NULL,
  `equipcol3` varchar(45) DEFAULT NULL,
  `equipcol4` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`eid`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `eid_UNIQUE` (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equip`
--

LOCK TABLES `equip` WRITE;
/*!40000 ALTER TABLE `equip` DISABLE KEYS */;
INSERT INTO `equip` VALUES (1,'TEST_DEL2017-07-17 16:12:02',0,'','','','','','','','','','','新建文本文档.txt','hookup1500278949104新建文本文档.txt','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\TEST\\','','','firefox.exe','togy1500279046427firefox.exe','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\TEST\\','','','api-ms-win-core-datetime-l1-1-0.dll','fat1500279059961api-ms-win-core-datetime-l1-1-0.dll','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\TEST\\','','',NULL,3,1,10,'2017-07-17 16:08:01',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(2,'ZG-YX-108-串焊机#1-ASYS(LOADER,SCRIBE,PRINTER)',1,'','','','','','','','','','','','','','','','','','','','','','','','','',NULL,6,0,9,'2017-07-12 14:14:48',0,NULL,NULL,0,4,NULL,NULL,NULL,NULL),(3,'ZG-YX-108-串焊机#1-BTU(CUREA,CUREB)',1,'BTU','BTU CURE 3.1','ABCD','2017-07-10','7.2.10 Gen3.1.1 Stringer Spare Parts List.xlsx','open14998405909397.2.10 Gen3.1.1 Stringer Spare Parts List.xlsx','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-串焊机#1-BTU(CUREA,CUREB)\\','2017-06-27','2017-07-14','2017-07-17','Gen 3.1.1 Stringer Installation Guide.docx','hookup1499840537460Gen 3.1.1 Stringer Installation Guide.docx','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-串焊机#1-BTU(CUREA,CUREB)\\','2017-07-15','2017-07-18','7.2.10 Gen3.1.1 Stringer Spare Parts List.xlsx','togy14998406004307.2.10 Gen3.1.1 Stringer Spare Parts List.xlsx','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-串焊机#1-BTU(CUREA,CUREB)\\','2017-07-19','2017-07-26','7.2.10 Gen3.1.1 Stringer Spare Parts List.xlsx','fat14998406366357.2.10 Gen3.1.1 Stringer Spare Parts List.xlsx','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-串焊机#1-BTU(CUREA,CUREB)\\','2017-07-19','2018-07-26',NULL,7,0,9,'2017-07-12 14:16:29',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(4,'ZG-YX-108-串焊机#1-GENER8(CLEAVE,SHINGLEA,SHINGLEB,LINECONTROL)',1,'Gener-8','Gen3.1','','2017-07-13','','','','2017-07-13','2017-07-13','2017-07-14','','','','','','','','','','','','','','','',NULL,5,0,9,'2017-07-12 14:15:43',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(5,'ZG-YX-108-层压机#1',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-06-11','层压机1号开箱检查记录.pdf','open1500105358281层压机1号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#1\\','2017-06-11','2017-06-12','2017-06-19','','','','2017-06-20','2017-06-27','','','','','','','','','','',NULL,7,0,5,'2017-07-13 18:44:11',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(6,'ZG-YX-108-层压机#10',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-07-11','','','','2017-07-11','2017-07-12','','','','','','','','','','','','','','','','',NULL,3,0,6,'2017-07-15 14:19:04',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(7,'ZG-YX-108-层压机#11',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-07-12','','','','2017-07-12','2017-07-13','','','','','','','','','','','','','','','','',NULL,4,0,6,'2017-07-15 14:20:41',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(8,'ZG-YX-108-层压机#12',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-07-12','','','','2017-07-12','2017-07-13','','','','','','','','','','','','','','','','',NULL,4,0,6,'2017-07-15 14:21:14',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(9,'ZG-YX-108-层压机#2',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-06-11','层压机2号开箱检查记录.pdf','open1500105381977层压机2号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#2\\','2017-06-11','2017-06-12','2017-06-19','','','','2017-06-20','2017-06-27','','','','','','','','','','',NULL,8,0,5,'2017-07-14 14:13:42',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(10,'ZG-YX-108-层压机#3',1,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-06-11','层压机3号开箱检查记录.pdf','open1500105399106层压机3号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#3\\','2017-06-11','2017-06-13','2017-06-19','','','','2017-06-21','2017-06-27','','','','','','','','','','',NULL,4,0,6,'2017-07-15 13:55:23',0,NULL,NULL,0,2,NULL,NULL,NULL,NULL),(11,'ZG-YX-108-层压机#4',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-06-11','层压机4号开箱检查记录.pdf','open1500105413848层压机4号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#4\\','2017-06-11','2017-06-13','2017-06-19','','','','2017-06-21','2017-06-27','','','','','','','','','','',NULL,4,0,6,'2017-07-15 13:56:55',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(12,'ZG-YX-108-层压机#5',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-06-26','层压机5号开箱检查记录.pdf','open1500105425907层压机5号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#5\\','2017-06-27','2017-06-27','2017-07-03','','','','2017-07-11','','','','','','','','','','','',NULL,4,0,6,'2017-07-15 14:17:34',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(13,'ZG-YX-108-层压机#6',0,'秦皇岛博硕光电股份有限公司','BSL24550AC-H','','2017-06-26','层压机6号开箱检查记录.pdf','open1500105438761层压机6号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#6\\','2017-06-26','2017-06-27','2017-07-04','','','','2017-07-11','','','','','','','','','','','',NULL,6,0,6,'2017-07-15 14:18:04',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(14,'ZG-YX-108-层压机#7',0,'秦皇岛博硕光电股份有限公司','BSL24550AC-H','','2017-06-27','层压机7号开箱检查记录.pdf','open1500105454205层压机7号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#7\\','2017-06-27','2017-06-28','2017-07-04','','','','2017-07-11','','','','','','','','','','','',NULL,5,0,6,'2017-07-15 14:18:19',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(15,'ZG-YX-108-层压机#8',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-06-27','层压机8号开箱检查记录.pdf','open1500105468058层压机8号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-层压机#8\\','2017-06-28','2017-07-04','2017-07-07','','','','2017-07-11','','','','','','','','','','','',NULL,6,0,6,'2017-07-15 14:18:35',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(16,'ZG-YX-108-层压机#9',0,'秦皇岛博硕光电设备股份有限公司','BSL24550AC-H','','2017-07-11','','','','2017-07-11','2017-07-12','','','','','','','','','','','','','','','','',NULL,3,0,6,'2017-07-15 14:18:51',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(17,'ZG-YX-108-测试仪#1',0,'梅耶博格光电设备（上海）有限公司','Highlight Prod','','2017-06-11','IV测试仪1号开箱检查记录.pdf','open1500107759745IV测试仪1号开箱检查记录.pdf','E:\\Code\\apache-tomcat-server\\webapps\\ems\\upload\\ZG-YX-108-测试仪#1\\','2017-06-11','2017-06-12','2017-07-02','','','','2017-07-04','2017-07-04','','','','','','','','','','',NULL,2,0,6,'2017-07-15 15:05:47',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(18,'ZG-YX-108-测试仪#2',0,'梅耶博格光电设备（上海）有限公司','Highlight Prod','','2017-06-27','','','','2017-06-27','2017-06-28','2017-07-02','','','','2017-07-04','2017-07-04','','','','','','','','','','',NULL,7,0,6,'2017-07-15 15:06:29',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(19,'ZG-YX-108-测试仪#3',0,'梅耶博格光电设备（上海）有限公司','Highlight Prod','','2017-07-11','','','','2017-07-11','2017-07-12','2017-07-02','','','','2017-07-04','','','','','','','','','','','',NULL,2,0,6,'2017-07-15 15:06:45',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(20,'ZG-YX-108-自动线#1-POE裁切机',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,3,'2017-07-14 13:05:08',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(21,'ZG-YX-108-自动线#1-上模板机',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,3,'2017-07-14 13:05:40',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(22,'ZG-YX-108-自动线#1-固化线、上、下料机',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:34:58',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(23,'ZG-YX-108-自动线#1-层压前EL',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,3,'2017-07-14 13:06:24',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(24,'ZG-YX-108-自动线#1-层压后EL',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:47:35',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(25,'ZG-YX-108-自动线#1-搓角机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:45:41',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(26,'ZG-YX-108-自动线#1-玻璃上料机',1,'','','','','','','','','','','','','','','','','','','','','','','','','',NULL,1,0,3,'2017-07-14 13:04:13',0,3,'2017-07-14 13:06:39',0,0,NULL,NULL,NULL,NULL),(27,'ZG-YX-108-自动线#1-绝缘耐压测试仪',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:46:21',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(28,'ZG-YX-108-自动线#1-自动削边机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:07:56',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(29,'ZG-YX-108-自动线#1-自动打胶上料一体机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:32:53',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(30,'ZG-YX-108-自动线#1-裁切POE、背板机',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:02:51',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(31,'ZG-YX-108-自动线#2-POE裁切机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:49:43',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(32,'ZG-YX-108-自动线#2-上模板机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:50:07',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(33,'ZG-YX-108-自动线#2-固化线、上、下料机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:54:16',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(34,'ZG-YX-108-自动线#2-层压前EL',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:53:48',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(35,'ZG-YX-108-自动线#2-层压后EL',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:54:33',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(36,'ZG-YX-108-自动线#2-搓角机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:54:56',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(37,'ZG-YX-108-自动线#2-玻璃上料机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:55:18',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(38,'ZG-YX-108-自动线#2-绝缘耐压测试仪',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:55:35',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(39,'ZG-YX-108-自动线#2-自动削边机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:55:53',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(40,'ZG-YX-108-自动线#2-自动打胶上料一体机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:56:50',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(41,'ZG-YX-108-自动线#2-裁切POE、背板机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 14:57:10',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(42,'ZG-YX-108-自动线#3-POE裁切机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:01:20',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(43,'ZG-YX-108-自动线#3-上模板机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:01:36',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(44,'ZG-YX-108-自动线#3-固化线、上、下料机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:01:56',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(45,'ZG-YX-108-自动线#3-层压前EL',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:02:11',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(46,'ZG-YX-108-自动线#3-层压后EL',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:02:24',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(47,'ZG-YX-108-自动线#3-搓角机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:02:37',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(48,'ZG-YX-108-自动线#3-玻璃上料机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:02:50',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(49,'ZG-YX-108-自动线#3-绝缘耐压测试仪',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:03:09',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(50,'ZG-YX-108-自动线#3-自动削边机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:03:24',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(51,'ZG-YX-108-自动线#3-自动打胶上料一体机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:03:53',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(52,'ZG-YX-108-自动线#3-裁切POE、背板机',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,4,'2017-07-15 15:04:07',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(53,'TEST_DEL2017-08-29 16:58:53',0,'','','','','','','','','','','login.html','hookup1503931862177login.html','D:\\Code\\apache-tomcat\\webapps\\ems\\upload\\TEST\\','','','','','','','','','','','','',NULL,1,1,10,'2017-08-28 22:50:51',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(54,'3_DEL2017-09-07 17:19:17',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,1,'2017-09-07 17:15:47',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(55,'1_DEL2017-09-07 17:20:50',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,10,'2017-09-07 17:20:46',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(56,'1_DEL2017-09-07 17:22:56',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,10,'2017-09-07 17:22:52',0,NULL,NULL,0,0,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `equip` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ems`.`equip_AFTER_UPDATE` AFTER UPDATE ON `equip` FOR EACH ROW
BEGIN
	update tree set text = new.id,del = new.del where eid = old.eid;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipid` varchar(45) NOT NULL,
  `starttime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '异常发生时间',
  `type` int(11) NOT NULL COMMENT '工单类型\n1：保养\n2：异常',
  `illustrate` varchar(1000) DEFAULT NULL COMMENT '异常情况说明',
  `solution` varchar(1000) DEFAULT NULL COMMENT '处理措施记录',
  `endtime` datetime DEFAULT NULL COMMENT '处理完工时间',
  `replaces` varchar(1000) DEFAULT NULL COMMENT '更换备件名称及型号记录',
  `remark` varchar(1000) DEFAULT NULL COMMENT '备注',
  `createuserid` int(11) DEFAULT NULL COMMENT '创建用户',
  `updateuserid` int(11) DEFAULT NULL COMMENT '更新用户',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '状态标识符\n0:处理中\n1:已完成',
  `ver` int(11) NOT NULL DEFAULT '0' COMMENT '版本号',
  `del` int(11) NOT NULL DEFAULT '0' COMMENT '删除标识符',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'ZG-YX-108-层压机#3','2017-07-15 16:55:32',2,'层压机加热站电机轴承磨损异响，更换电机轴承。','更换电机轴承','2017-07-15 16:56:59','轴承','',6,6,1,1,0),(2,'ZG-YX-108-串焊机#1-ASYS(LOADER,SCRIBE,PRINTER)','2017-07-24 09:35:13',2,'111','','2017-08-17 14:53:34','','',8,1,1,1,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree`
--

DROP TABLE IF EXISTS `tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL COMMENT '父节点',
  `eid` int(11) DEFAULT NULL COMMENT '设备id',
  `text` varchar(1000) NOT NULL,
  `del` int(11) NOT NULL DEFAULT '0',
  `ver` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,NULL,NULL,'108车间',0,0),(10,13,NULL,'串焊机',0,0),(11,13,NULL,'层压机',0,0),(12,13,NULL,'自动线',0,0),(13,1,NULL,'1号线',0,0),(14,1,NULL,'2号线',0,0),(15,1,NULL,'3号线',0,0),(16,14,NULL,'串焊机',0,0),(17,14,NULL,'层压机',0,0),(18,14,NULL,'自动线',0,0),(19,15,NULL,'串焊机',0,0),(20,15,NULL,'层压机',0,0),(21,15,NULL,'自动线',0,0),(22,10,2,'ZG-YX-108-串焊机#1-ASYS(LOADER,SCRIBE,PRINTER)',0,0),(23,10,3,'ZG-YX-108-串焊机#1-BTU(CUREA,CUREB)',0,0),(24,10,4,'ZG-YX-108-串焊机#1-GENER8(CLEAVE,SHINGLEA,SHINGLEB,LINECONTROL)',0,0),(25,11,5,'ZG-YX-108-层压机#1',0,0),(26,11,9,'ZG-YX-108-层压机#2',0,0),(27,11,10,'ZG-YX-108-层压机#3',0,0),(28,11,11,'ZG-YX-108-层压机#4',0,0),(29,17,12,'ZG-YX-108-层压机#5',0,0),(30,17,13,'ZG-YX-108-层压机#6',0,0),(31,17,14,'ZG-YX-108-层压机#7',0,0),(32,17,15,'ZG-YX-108-层压机#8',0,0),(33,20,16,'ZG-YX-108-层压机#9',0,0),(34,20,6,'ZG-YX-108-层压机#10',0,0),(35,20,7,'ZG-YX-108-层压机#11',0,0),(36,20,8,'ZG-YX-108-层压机#12',0,0),(37,12,20,'ZG-YX-108-自动线#1-POE裁切机',0,0),(38,12,21,'ZG-YX-108-自动线#1-上模板机',0,0),(39,12,22,'ZG-YX-108-自动线#1-固化线、上、下料机',0,0),(40,12,23,'ZG-YX-108-自动线#1-层压前EL',0,0),(41,12,24,'ZG-YX-108-自动线#1-层压后EL',0,0),(42,12,25,'ZG-YX-108-自动线#1-搓角机',0,0),(43,12,26,'ZG-YX-108-自动线#1-玻璃上料机',0,0),(44,12,27,'ZG-YX-108-自动线#1-绝缘耐压测试仪',0,0),(45,12,28,'ZG-YX-108-自动线#1-自动削边机',0,0),(46,12,29,'ZG-YX-108-自动线#1-自动打胶上料一体机',0,0),(47,12,30,'ZG-YX-108-自动线#1-裁切POE、背板机',0,0),(56,18,31,'ZG-YX-108-自动线#2-POE裁切机',0,0),(57,18,32,'ZG-YX-108-自动线#2-上模板机',0,0),(58,18,33,'ZG-YX-108-自动线#2-固化线、上、下料机',0,0),(59,18,34,'ZG-YX-108-自动线#2-层压前EL',0,0),(60,18,35,'ZG-YX-108-自动线#2-层压后EL',0,0),(61,18,36,'ZG-YX-108-自动线#2-搓角机',0,0),(62,18,37,'ZG-YX-108-自动线#2-玻璃上料机',0,0),(63,18,38,'ZG-YX-108-自动线#2-绝缘耐压测试仪',0,0),(64,18,39,'ZG-YX-108-自动线#2-自动削边机',0,0),(65,18,40,'ZG-YX-108-自动线#2-自动打胶上料一体机',0,0),(66,18,41,'ZG-YX-108-自动线#2-裁切POE、背板机',0,0),(67,21,42,'ZG-YX-108-自动线#3-POE裁切机',0,0),(68,21,43,'ZG-YX-108-自动线#3-上模板机',0,0),(69,21,44,'ZG-YX-108-自动线#3-固化线、上、下料机',0,0),(70,21,45,'ZG-YX-108-自动线#3-层压前EL',0,0),(71,21,46,'ZG-YX-108-自动线#3-层压后EL',0,0),(72,21,47,'ZG-YX-108-自动线#3-搓角机',0,0),(73,21,48,'ZG-YX-108-自动线#3-玻璃上料机',0,0),(74,21,49,'ZG-YX-108-自动线#3-绝缘耐压测试仪',0,0),(75,21,50,'ZG-YX-108-自动线#3-自动削边机',0,0),(76,21,51,'ZG-YX-108-自动线#3-自动打胶上料一体机',0,0),(77,21,52,'ZG-YX-108-自动线#3-裁切POE、背板机',0,0),(80,10,56,'1_DEL2017-09-07 17:22:56',1,0);
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL COMMENT '姓名',
  `username` varchar(45) NOT NULL COMMENT '用户名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `roleid` int(11) NOT NULL DEFAULT '0' COMMENT '角色id\n0：现场操作员\n1：工程师\n2：部长\n3：管理员',
  `del` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'徐翔','xiang.xu','123',1,0),(2,'现场','site','123',0,0),(3,'潘杰','jie.pan','123',1,0),(4,'李博','bo.li','123',1,0),(5,'沈斌','bin.shen','123',1,0),(6,'陈建','jian.chen','123',1,0),(7,'耿志飞','zhifei.geng','123',1,0),(8,'丁文学','wenxue.ding','123',1,0),(9,'卫志敏','zhimin.wei','123',2,0),(10,'管理员','admin','123',3,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ems'
--

--
-- Dumping routines for database 'ems'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-07 17:25:23

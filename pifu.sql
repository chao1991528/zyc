/*
Navicat MySQL Data Transfer

Source Server         : self
Source Server Version : 100113
Source Host           : localhost:3306
Source Database       : pifu

Target Server Type    : MYSQL
Target Server Version : 100113
File Encoding         : 65001

Date: 2017-10-27 17:43:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for z_admin
-- ----------------------------
DROP TABLE IF EXISTS `z_admin`;
CREATE TABLE `z_admin` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(40) NOT NULL,
  `realname` varchar(8) NOT NULL COMMENT '真实姓名',
  `email` varchar(256) NOT NULL COMMENT '邮箱',
  `rank` tinyint(3) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态，0禁用，1正常',
  `last_login_ip` varchar(16) DEFAULT NULL,
  `last_login_time` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='后台管理员表';

-- ----------------------------
-- Records of z_admin
-- ----------------------------
INSERT INTO `z_admin` VALUES ('1', 'root', 'e10adc3949ba59abbe56e057f20f883e', 'zyc', '392318709', '0', '1', '127.0.0.1', '1509011841');

-- ----------------------------
-- Table structure for z_record
-- ----------------------------
DROP TABLE IF EXISTS `z_record`;
CREATE TABLE `z_record` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `face_img` varchar(255) NOT NULL DEFAULT '' COMMENT '用户上传的面部图片',
  `skin_type` varchar(255) NOT NULL DEFAULT '' COMMENT '皮肤类型',
  `skin_color` varchar(255) NOT NULL DEFAULT '' COMMENT '肤色',
  `is_guomin` varchar(255) NOT NULL DEFAULT '' COMMENT '是否过敏',
  `skin_problem` varchar(255) NOT NULL DEFAULT '' COMMENT '皮肤问题',
  `want_solve_problem` varchar(255) NOT NULL DEFAULT '' COMMENT '最想解决的皮肤问题',
  `is_huli` varchar(255) NOT NULL DEFAULT '' COMMENT '是否护理过皮肤',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COMMENT='肌肤测试记录表';

-- ----------------------------
-- Records of z_record
-- ----------------------------
INSERT INTO `z_record` VALUES ('1', '/uploads/20171019/0a658a8b85c6a4845df41a799cefa0ba.jpg', '1f', 'red', 'is', 'p', 'fd', 'dif', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('2', '/uploads/20171019/35123238e03da300b049a07cbc1c9119.png', '1f', 'red', 'is', 'p', 'fd', 'dif', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('4', '/uploads/20171019/4db041cfee27d17072dc5e521f5075a9.jpg', '1f', 'red', 'is', 'p', 'fd', 'dif', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('5', '/uploads/20171019/cab76b158c4f32a2768f4a5a4c458897.jpg', '1f', 'red', 'is', 'p', 'fd', 'dif', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('8', '/uploads/20171019/9c92aee1f35c6649738400dc9337c926.png', '1f', 'red', 'is', 'p', 'fd', 'dif', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('21', '\\uploads\\faceImage\\20171027\\386aa6dcc07bc2ad47eb684715bd6fdc.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `z_record` VALUES ('22', '\\uploads\\faceImage\\20171027\\383efe16cb68cfc789d478c56d149bb6.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔,出油', '严重眼袋/眼纹', '从无，现在想要护理', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `z_record` VALUES ('23', '\\uploads\\faceImage\\20171027\\f0583da1ddf07740fd80ba3e17c73c32.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '2017-10-27 15:38:40', '2017-10-27 15:38:40');
INSERT INTO `z_record` VALUES ('24', '\\uploads\\faceImage\\20171027\\66cee539783fd60754608db7961f413b.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '2017-10-27 15:40:20', '2017-10-27 15:40:20');
INSERT INTO `z_record` VALUES ('25', '\\uploads\\faceImage\\20171027\\7f943e1a5b48360e8e7c1403b60775b7.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔,出油', '敏感/脆弱', '从无，现在想要护理', '2017-10-27 15:58:36', '2017-10-27 15:58:36');
INSERT INTO `z_record` VALUES ('26', '\\uploads\\faceImage\\20171027\\c517d24491576976c99335373cd4d466.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔,出油', '敏感/脆弱', '从无，现在想要护理', '2017-10-27 15:59:19', '2017-10-27 15:59:19');
INSERT INTO `z_record` VALUES ('27', '\\uploads\\faceImage\\20171027\\e944df37703a89c272dc0f7e5e092137.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '严重眼袋/眼纹', '有，皮肤逐渐改善', '2017-10-27 16:00:49', '2017-10-27 16:00:49');
INSERT INTO `z_record` VALUES ('28', '\\uploads\\faceImage\\20171027\\39acedc16b3d323dc497e121788e54b6.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '2017-10-27 16:01:11', '2017-10-27 16:01:11');
INSERT INTO `z_record` VALUES ('29', '\\uploads\\faceImage\\20171027\\a4249b31dcb8d6506d23d073fbb348a2.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '严重眼袋/眼纹', '有，效果不佳', '2017-10-27 16:02:34', '2017-10-27 16:02:34');
INSERT INTO `z_record` VALUES ('30', '\\uploads\\faceImage\\20171027\\4d8d33b2e5f206ff89abcb426f84e275.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '2017-10-27 16:07:38', '2017-10-27 16:07:38');
INSERT INTO `z_record` VALUES ('31', '\\uploads\\faceImage\\20171027\\32b3b4117e9c7edc5d34461f0313630c.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '有，效果不佳', '2017-10-27 16:09:10', '2017-10-27 16:09:10');
INSERT INTO `z_record` VALUES ('32', '\\uploads\\faceImage\\20171027\\c5eb8e671084263db12dfc11350ccc89.jpg', 'T区油，U区干', '暗黄', '从不', '黑头/毛孔,黑眼圈/眼袋/脂肪粒/皱纹,痘痘/痘印,出油', '黑眼圈/轻度眼袋/脂肪粒', '从无，现在想要护理', '2017-10-27 16:12:14', '2017-10-27 16:12:14');
INSERT INTO `z_record` VALUES ('33', '\\uploads\\faceImage\\20171027\\db03cb78288c6debc85ea06cf721201a.jpg', '全脸泛油，易长痘', '白皙', '易过敏', '黑头/毛孔,皱纹', '黑眼圈/轻度眼袋/脂肪粒', '有，效果不佳', '2017-10-27 16:16:37', '2017-10-27 16:16:37');
SET FOREIGN_KEY_CHECKS=1;

/*
Navicat MySQL Data Transfer

Source Server         : self
Source Server Version : 100113
Source Host           : localhost:3306
Source Database       : zyc

Target Server Type    : MYSQL
Target Server Version : 100113
File Encoding         : 65001

Date: 2017-11-13 18:02:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for z_admin
-- ----------------------------
DROP TABLE IF EXISTS `z_admin`;
CREATE TABLE `z_admin` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(40) NOT NULL,
  `realname` varchar(20) NOT NULL COMMENT '真实姓名',
  `email` varchar(256) NOT NULL COMMENT '邮箱',
  `rank` tinyint(3) unsigned NOT NULL,
  `pid` int(4) unsigned NOT NULL DEFAULT '0' COMMENT '父亲id',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态，0禁用，1正常',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '最后登录ip',
  `last_login_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后登录时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='后台管理员表';

-- ----------------------------
-- Records of z_admin
-- ----------------------------
INSERT INTO `z_admin` VALUES ('1', 'root', 'e10adc3949ba59abbe56e057f20f883e', '超级管理员', '392318709', '0', '0', '1', '127.0.0.1', '2017-11-13 10:42:33');
INSERT INTO `z_admin` VALUES ('5', 'zjl1', 'e10adc3949ba59abbe56e057f20f883e', '张顺', '', '0', '1', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('6', 'zhangchao', 'e10adc3949ba59abbe56e057f20f883e', '张超', '', '0', '5', '1', '127.0.0.1', '2017-11-13 10:43:55');
INSERT INTO `z_admin` VALUES ('7', 'yangjiayue', 'e10adc3949ba59abbe56e057f20f883e', '杨家岳', '', '0', '6', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('9', 'yuangong2', 'e10adc3949ba59abbe56e057f20f883e', '张英', '', '0', '6', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('10', 'zjl2', 'e10adc3949ba59abbe56e057f20f883e', '尹迪', '', '0', '1', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('11', 'wangkun', 'e10adc3949ba59abbe56e057f20f883e', '王坤', '', '0', '10', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('12', 'wuyifan', 'e10adc3949ba59abbe56e057f20f883e', '吴亦凡', '', '0', '6', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('13', 'wangjinling', 'e10adc3949ba59abbe56e057f20f883e', '王金玲', '', '0', '11', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('14', 'wangyulu', 'e10adc3949ba59abbe56e057f20f883e', '王雨露', '', '0', '11', '1', '', '0000-00-00 00:00:00');
INSERT INTO `z_admin` VALUES ('15', 'lixueqin', 'e10adc3949ba59abbe56e057f20f883e', '李雪琴', '', '0', '11', '1', '', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for z_auth_group
-- ----------------------------
DROP TABLE IF EXISTS `z_auth_group`;
CREATE TABLE `z_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(20) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` char(80) NOT NULL DEFAULT '',
  `pid` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '父id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_auth_group
-- ----------------------------
INSERT INTO `z_auth_group` VALUES ('1', '超级管理员', '1', '18,44,42,41,19,43,1,2,6,5,4,46,36,45,38,39,40,37,47,48,50', '0');
INSERT INTO `z_auth_group` VALUES ('2', '总经理', '1', '', '1');
INSERT INTO `z_auth_group` VALUES ('3', '经理', '1', '18,44,42,19,43,47,48,50', '2');
INSERT INTO `z_auth_group` VALUES ('4', '员工', '1', '18,41,19', '3');
INSERT INTO `z_auth_group` VALUES ('11', '外协', '1', '19,6', '4');

-- ----------------------------
-- Table structure for z_auth_group_access
-- ----------------------------
DROP TABLE IF EXISTS `z_auth_group_access`;
CREATE TABLE `z_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_auth_group_access
-- ----------------------------
INSERT INTO `z_auth_group_access` VALUES ('1', '1');
INSERT INTO `z_auth_group_access` VALUES ('5', '2');
INSERT INTO `z_auth_group_access` VALUES ('6', '3');
INSERT INTO `z_auth_group_access` VALUES ('7', '4');
INSERT INTO `z_auth_group_access` VALUES ('8', '11');
INSERT INTO `z_auth_group_access` VALUES ('9', '4');
INSERT INTO `z_auth_group_access` VALUES ('10', '2');
INSERT INTO `z_auth_group_access` VALUES ('11', '3');
INSERT INTO `z_auth_group_access` VALUES ('12', '4');
INSERT INTO `z_auth_group_access` VALUES ('13', '4');
INSERT INTO `z_auth_group_access` VALUES ('14', '4');
INSERT INTO `z_auth_group_access` VALUES ('15', '4');

-- ----------------------------
-- Table structure for z_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `z_auth_rule`;
CREATE TABLE `z_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL DEFAULT '' COMMENT '规则url',
  `title` varchar(20) NOT NULL DEFAULT '' COMMENT '规则名称',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '如果type为1， condition字段就可以定义规则表达式',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：为1正常，为0禁用',
  `condition` char(100) NOT NULL DEFAULT '' COMMENT '规则表达式，为空表示存在就验证，不为空表示按照条件验证， 如定义{score}>5  and {score}<100，表示用户的分数在5-100之间时这条规则才会通过。',
  `pid` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '父id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_auth_rule
-- ----------------------------
INSERT INTO `z_auth_rule` VALUES ('2', 'Admin/AuthRule/ruleList', '规则列表', '0', '1', '', '1');
INSERT INTO `z_auth_rule` VALUES ('1', 'Admin/AuthRule/ruleList', '规则管理', '0', '1', '', '0');
INSERT INTO `z_auth_rule` VALUES ('4', 'Admin/AuthRule/doAddRule', '添加规则', '0', '1', '', '1');
INSERT INTO `z_auth_rule` VALUES ('5', 'Admin/AuthRule/doEditRule', '编辑规则', '0', '1', '', '1');
INSERT INTO `z_auth_rule` VALUES ('6', 'Admin/AuthRule/doDelRule', '删除规则', '0', '1', '', '1');
INSERT INTO `z_auth_rule` VALUES ('18', 'Admin/Admin/alist', '管理员管理', '0', '1', '', '0');
INSERT INTO `z_auth_rule` VALUES ('19', 'Admin/Admin/alist', '管理员列表', '0', '1', '', '18');
INSERT INTO `z_auth_rule` VALUES ('41', 'Admin/Admin/doEditAdmin', '管理员编辑', '0', '1', '', '18');
INSERT INTO `z_auth_rule` VALUES ('37', 'Admin/AdminGroup/glist', '组列表', '0', '1', '', '36');
INSERT INTO `z_auth_rule` VALUES ('36', 'Admin/AdminGroup/glist', '管理员组管理', '0', '1', '', '0');
INSERT INTO `z_auth_rule` VALUES ('40', 'Admin/AdminGroup/doEditAdminGroup', '组编辑', '0', '1', '', '36');
INSERT INTO `z_auth_rule` VALUES ('42', 'Admin/Admin/doAddAdmin', '管理员添加', '0', '1', '', '18');
INSERT INTO `z_auth_rule` VALUES ('39', 'Admin/AdminGroup/doDelAdminGroup', '组删除', '0', '1', '', '36');
INSERT INTO `z_auth_rule` VALUES ('38', 'Admin/AdminGroup/doAddAdminGroup', '组添加', '0', '1', '', '36');
INSERT INTO `z_auth_rule` VALUES ('43', 'Admin/Admin/doAdminDel', '管理员删除', '0', '1', '', '18');
INSERT INTO `z_auth_rule` VALUES ('44', 'Admin/Admin/viewAdmin', '管理员查看', '0', '1', '', '18');
INSERT INTO `z_auth_rule` VALUES ('45', 'Admin/AdminGroup/viewAdminGroup', '组查看', '0', '1', '', '36');
INSERT INTO `z_auth_rule` VALUES ('46', 'Admin/AuthRule/viewRule', '查看规则', '0', '1', '', '1');
INSERT INTO `z_auth_rule` VALUES ('47', 'Admin/Record/rlist', '肌肤测试管理', '0', '1', '', '0');
INSERT INTO `z_auth_rule` VALUES ('48', 'Admin/Record/rlist', '记录列表', '0', '1', '', '47');
INSERT INTO `z_auth_rule` VALUES ('50', 'Admin/Record/doDelRecord', '记录删除', '0', '1', '', '47');

-- ----------------------------
-- Table structure for z_log
-- ----------------------------
DROP TABLE IF EXISTS `z_log`;
CREATE TABLE `z_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `module` varchar(50) NOT NULL DEFAULT '' COMMENT '模块名',
  `action` varchar(255) NOT NULL DEFAULT '' COMMENT '操作方法',
  `operation` text NOT NULL COMMENT '管理员具体操作',
  `param` text COMMENT '被操作的记录id,用，隔开',
  `admin_id` int(11) NOT NULL DEFAULT '0' COMMENT '管理员id',
  `create_time` datetime NOT NULL COMMENT '发生时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员操作日志';

-- ----------------------------
-- Records of z_log
-- ----------------------------

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
  `result_skin_type` varchar(255) NOT NULL DEFAULT '' COMMENT '测试结果之一肌肤属性',
  `result_skin_feature` varchar(255) NOT NULL DEFAULT '' COMMENT '测试结果之一表现特征',
  `result_protect_point` text NOT NULL COMMENT '测试结果之一保养重点',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='肌肤测试记录表';

-- ----------------------------
-- Records of z_record
-- ----------------------------
INSERT INTO `z_record` VALUES ('1', '/uploads/20171019/0a658a8b85c6a4845df41a799cefa0ba.jpg', '1f', 'red', 'is', 'p', 'fd', 'dif', '', '', '', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('2', '/uploads/20171019/35123238e03da300b049a07cbc1c9119.png', '1f', 'red', 'is', 'p', 'fd', 'dif', '', '', '', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('4', '/uploads/20171019/4db041cfee27d17072dc5e521f5075a9.jpg', '1f', 'red', 'is', 'p', 'fd', 'dif', '', '', '', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('5', '/uploads/20171019/cab76b158c4f32a2768f4a5a4c458897.jpg', '1f', 'red', 'is', 'p', 'fd', 'dif', '', '', '', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('8', '/uploads/20171019/9c92aee1f35c6649738400dc9337c926.png', '1f', 'red', 'is', 'p', 'fd', 'dif', '', '', '', '2017-10-26 16:21:35', '2017-10-26 16:21:38');
INSERT INTO `z_record` VALUES ('21', '\\uploads\\faceImage\\20171027\\386aa6dcc07bc2ad47eb684715bd6fdc.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `z_record` VALUES ('22', '\\uploads\\faceImage\\20171027\\383efe16cb68cfc789d478c56d149bb6.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔,出油', '严重眼袋/眼纹', '从无，现在想要护理', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `z_record` VALUES ('23', '\\uploads\\faceImage\\20171027\\f0583da1ddf07740fd80ba3e17c73c32.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '', '', '', '2017-10-27 15:38:40', '2017-10-27 15:38:40');
INSERT INTO `z_record` VALUES ('24', '\\uploads\\faceImage\\20171027\\66cee539783fd60754608db7961f413b.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '', '', '', '2017-10-27 15:40:20', '2017-10-27 15:40:20');
INSERT INTO `z_record` VALUES ('25', '\\uploads\\faceImage\\20171027\\7f943e1a5b48360e8e7c1403b60775b7.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔,出油', '敏感/脆弱', '从无，现在想要护理', '', '', '', '2017-10-27 15:58:36', '2017-10-27 15:58:36');
INSERT INTO `z_record` VALUES ('26', '\\uploads\\faceImage\\20171027\\c517d24491576976c99335373cd4d466.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔,出油', '敏感/脆弱', '从无，现在想要护理', '', '', '', '2017-10-27 15:59:19', '2017-10-27 15:59:19');
INSERT INTO `z_record` VALUES ('27', '\\uploads\\faceImage\\20171027\\e944df37703a89c272dc0f7e5e092137.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '严重眼袋/眼纹', '有，皮肤逐渐改善', '', '', '', '2017-10-27 16:00:49', '2017-10-27 16:00:49');
INSERT INTO `z_record` VALUES ('28', '\\uploads\\faceImage\\20171027\\39acedc16b3d323dc497e121788e54b6.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '', '', '', '2017-10-27 16:01:11', '2017-10-27 16:01:11');
INSERT INTO `z_record` VALUES ('29', '\\uploads\\faceImage\\20171027\\a4249b31dcb8d6506d23d073fbb348a2.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '严重眼袋/眼纹', '有，效果不佳', '', '', '', '2017-10-27 16:02:34', '2017-10-27 16:02:34');
INSERT INTO `z_record` VALUES ('30', '\\uploads\\faceImage\\20171027\\4d8d33b2e5f206ff89abcb426f84e275.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '', '', '', '2017-10-27 16:07:38', '2017-10-27 16:07:38');
INSERT INTO `z_record` VALUES ('31', '\\uploads\\faceImage\\20171027\\32b3b4117e9c7edc5d34461f0313630c.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '有，效果不佳', '', '', '', '2017-10-27 16:09:10', '2017-10-27 16:09:10');
INSERT INTO `z_record` VALUES ('32', '\\uploads\\faceImage\\20171027\\c5eb8e671084263db12dfc11350ccc89.jpg', 'T区油，U区干', '暗黄', '从不', '黑头/毛孔,黑眼圈/眼袋/脂肪粒/皱纹,痘痘/痘印,出油', '黑眼圈/轻度眼袋/脂肪粒', '从无，现在想要护理', '', '', '', '2017-10-27 16:12:14', '2017-10-27 16:12:14');
INSERT INTO `z_record` VALUES ('33', '\\uploads\\faceImage\\20171027\\db03cb78288c6debc85ea06cf721201a.jpg', '全脸泛油，易长痘', '白皙', '易过敏', '黑头/毛孔,皱纹', '黑眼圈/轻度眼袋/脂肪粒', '有，效果不佳', '', '', '', '2017-10-27 16:16:37', '2017-10-27 16:16:37');
INSERT INTO `z_record` VALUES ('34', '\\uploads\\faceImage\\20171030\\8e02b9a8eae51e12ab1c5b7425a3272a.jpg', '不干也不油', '白皙', '易过敏', '黑头/毛孔,出油', '敏感/脆弱', '有，皮肤逐渐改善', '', '', '', '2017-10-30 09:22:19', '2017-10-30 09:22:19');
INSERT INTO `z_record` VALUES ('35', '\\uploads\\faceImage\\20171030\\8213710a849fb59c03c9ee4690660e90.jpg', '不干也不油', '白皙', '易过敏', '黑头/毛孔,出油', '敏感/脆弱', '有，皮肤逐渐改善', '', '', '', '2017-10-30 09:22:20', '2017-10-30 09:22:20');
INSERT INTO `z_record` VALUES ('36', '\\uploads\\faceImage\\20171030\\dc14aeb5ca31be707a235b64d57c82ea.jpg', '不干也不油', '白皙', '易过敏', '黑头/毛孔,皱纹', '黑眼圈/轻度眼袋/脂肪粒', '有，皮肤逐渐改善', '', '', '', '2017-10-30 10:36:38', '2017-10-30 10:36:38');
INSERT INTO `z_record` VALUES ('37', '\\uploads\\faceImage\\20171030\\0d27d0845ab6a9cdc3a43a22f71c5014.jpg', '全脸泛油，易长痘', '大麦色', '偶尔', '黑头/毛孔,暗黄/斑点', '暗黄/色斑', '有，效果不佳', '混合性皮肤', '同时具有油性和干性皮肤的特征。多见为面孔T区部位易出油，其余部分则干燥，并时有粉刺发生，80%的女性都是混合性皮肤。混合性皮肤多发生于20岁～39岁之间。', '按偏油性、偏干性、偏中性皮肤分别侧重处理，在使用护肤品时，先滋润较干的部位，再在其它部位用剩余量擦拭。注意适时补水、补营养成份、调节皮肤的平衡。护肤品选择：夏天参考第三项油性皮肤的选择，冬天参考第一项干性皮肤的选择。', '2017-10-30 10:48:24', '2017-10-30 10:48:24');
INSERT INTO `z_record` VALUES ('38', '\\uploads\\faceImage\\20171030\\ad474621e2590c3b4c6c379eb05d5b26.jpg', '全脸泛油，易长痘', '大麦色', '从不', '黑头/毛孔', '严重眼袋/眼纹', '有，皮肤逐渐改善', '混合性皮肤', '同时具有油性和干性皮肤的特征。多见为面孔T区部位易出油，其余部分则干燥，并时有粉刺发生，80%的女性都是混合性皮肤。混合性皮肤多发生于20岁～39岁之间。', '按偏油性、偏干性、偏中性皮肤分别侧重处理，在使用护肤品时，先滋润较干的部位，再在其它部位用剩余量擦拭。注意适时补水、补营养成份、调节皮肤的平衡。护肤品选择：夏天参考第三项油性皮肤的选择，冬天参考第一项干性皮肤的选择。', '2017-10-30 13:44:05', '2017-10-30 13:44:05');
INSERT INTO `z_record` VALUES ('39', '\\uploads\\faceImage\\20171030\\cee3e5be477f38cfca12a797c381c789.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '细纹/皮肤松弛', '有，效果不佳', '中性皮肤', '水份、油份适中，皮肤酸碱度适中，皮肤光滑细嫩柔软，富于弹性，红润而有光泽，毛孔细小，纹路排列整齐，皮沟纵横走向，这种皮肤一般炎夏易偏油，冬季易偏干。', '注意清洁、爽肤、润肤以及按摩的周护理。注意日补水、调节水油平衡的护理。护肤品选择：依皮肤年龄、季节选择，夏天亲水性，冬天选滋润性，选择范围较广。', '2017-10-30 13:47:04', '2017-10-30 13:47:04');
INSERT INTO `z_record` VALUES ('40', '\\uploads\\faceImage\\20171031\\ce1cfd0efb622fa853dc9ea3b7d13f14.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '中性皮肤', '水份、油份适中，皮肤酸碱度适中，皮肤光滑细嫩柔软，富于弹性，红润而有光泽，毛孔细小，纹路排列整齐，皮沟纵横走向，这种皮肤一般炎夏易偏油，冬季易偏干。', '注意清洁、爽肤、润肤以及按摩的周护理。注意日补水、调节水油平衡的护理。护肤品选择：依皮肤年龄、季节选择，夏天亲水性，冬天选滋润性，选择范围较广。', '2017-10-31 11:58:14', '2017-10-31 11:58:14');
INSERT INTO `z_record` VALUES ('41', '\\uploads\\faceImage\\20171031\\5ab6727243301bf6bc67632fd5e3c0e6.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '中性皮肤', '水份、油份适中，皮肤酸碱度适中，皮肤光滑细嫩柔软，富于弹性，红润而有光泽，毛孔细小，纹路排列整齐，皮沟纵横走向，这种皮肤一般炎夏易偏油，冬季易偏干。', '注意清洁、爽肤、润肤以及按摩的周护理。注意日补水、调节水油平衡的护理。护肤品选择：依皮肤年龄、季节选择，夏天亲水性，冬天选滋润性，选择范围较广。', '2017-10-31 14:24:43', '2017-10-31 14:24:43');
INSERT INTO `z_record` VALUES ('42', '\\uploads\\faceImage\\20171031\\489c8849c2ea429d6502291fc0f75c15.jpg', '不干也不油', '白皙', '从不', '黑头/毛孔', '敏感/脆弱', '从无，现在想要护理', '中性皮肤', '水份、油份适中，皮肤酸碱度适中，皮肤光滑细嫩柔软，富于弹性，红润而有光泽，毛孔细小，纹路排列整齐，皮沟纵横走向，这种皮肤一般炎夏易偏油，冬季易偏干。', '注意清洁、爽肤、润肤以及按摩的周护理。注意日补水、调节水油平衡的护理。护肤品选择：依皮肤年龄、季节选择，夏天亲水性，冬天选滋润性，选择范围较广。', '2017-10-31 14:35:53', '2017-10-31 14:35:53');
SET FOREIGN_KEY_CHECKS=1;

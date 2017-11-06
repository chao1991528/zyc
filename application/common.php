<?php

// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------
// 应用公共文件
/**
 * 获取子类id
 * @staticvar array $ids
* @param string $table 表名 
 * @param type $id  要获取子类的分类id
 * @param type $include_self 是否包含自己 
 * @return array
 */
function getSubIds($table, $id = 0, $include_self = false) {
    static $ids = [];   
    $data = db($table)->field('id,pid')->select();
    foreach ($data as $v) {
        if ($v['pid'] == $id) {
            $ids[] = $v['id'];
            getSubIds($table, $v['id']);
        }
    }
    if ($include_self) {
        $ids[] = $id;
    }
    return $ids;
}

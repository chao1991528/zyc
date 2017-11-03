<?php

return [
    //返回状态码
    'return_code' => [
        '200' => '成功',
        '201' => '成功但数据为空',
        '202' => '验证不通过',
        '203' => '通过data自定义消息',
        '300' => '参数错误或为空',
        '301' => '未登录',
        '400' => '操作失败',
        '401' => '非法请求',
        '402' => '验证码错误',
        '403' => '账号或密码错误'
    ],
    //auth权限验证
    'auth' => [
        'auth_on'           => true, // 权限开关
        'auth_type'         => 2, // 认证方式，1为实时认证；2为登录认证。
        'auth_group'        => 'auth_group', // 用户组数据表名
        'auth_group_access' => 'auth_group_access', // 用户-用户组关系表
        'auth_rule'         => 'auth_rule', // 权限规则表
        'auth_user'         => 'admin', // 管理员表
    ]
];

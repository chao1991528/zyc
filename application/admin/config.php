<?php

return [
    //not in use
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
    // +----------------------------------------------------------------------
    // | oss设置K
    // +----------------------------------------------------------------------
    'oss' => [
        'accessKeyId' => 'LTAIUglRn21q4Lxa', //您从OSS获得的AccessKeyId
        'accessKeySecret' => 'KxgqkouHZjj5CK75fpNcLxlm42jt5z', //您从OSS获得的AccessKeySecret
        'endpoint' => 'http://vpc100-oss-cn-shanghai.aliyuncs.com', //您选定的OSS数据中心访问域名(不包含bucket)
        'bucket' => 'bang-app', //空间名称
    ],
    'md5_key' => '!mfaif@$fsdf'
];

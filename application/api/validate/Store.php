<?php

namespace app\api\validate;

use think\Validate;

/**
 * 门店验证器
 */
class Store extends Validate {

    protected $rule = [
        'name' => 'require|min:2|max:255|unique:store',
        'sort' => 'number',
    ];
    protected $message = [
        'name.require' => '门店名称必须',
        'name.min' => '门店名称至少2个字符',
        'name.max' => '门店名称最多不能超过255个字符',
        'name.unique' => '门店名称已经存在',
        'sort.number' => '排序必须是数字'
    ];
    protected $scene = [
        'edit' => [
            'name' => 'require|min:2|max:50',
            'condition'
        ]
    ];

}

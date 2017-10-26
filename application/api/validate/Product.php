<?php

namespace app\api\validate;

use think\Validate;

/**
 * 产品验证器
 */
class Product extends Validate {

    protected $rule = [
        'name' => 'require|min:2|max:100|unique:product',
        'logo' => 'require|max:255',
        'type' => 'require|number',
        'xilie' => 'require',
        'guocheng' => 'max:255',
        'huli_time' => 'max:20',
        'price_once' => 'require|number',
        'price_all' => 'number',
        'all_need_ci' => 'number',
        'sort' => 'number',
        'is_recommend' => 'in:0,1'
    ];
    protected $message = [
        'name.require' => '产品名称必须',
        'name.min' => '产品名称至少2个字符',
        'name.max' => '产品名称最多不能超过100个字符',
        'name.unique' => '产品名称已经存在',
        'logo.require' => '产品图片必须上传',
        'logo.max' => '产品图片最多不能超过255个字符',
        'type.require' => '产品类型必须',
        'type.number' => '产品类型必须为数字',
        'xilie.require' => '产品系列必须',
        'guocheng.max' => '治疗过程最多不能超过255个字符',
        'huli_time.max' => '护理时间最多不能超过20个字符',
        'price_once.require' => '单次价格必须',
        'price_once.number' => '单次价格必须为数字',
        'price_all.number' => '疗程价格必须为数字',
        'all_need_ci.number' => '疗程价格中的次数必须为数字',
        'sort.number' => '排序必须为数字',
        'is_recommend.in' => '是否推荐有误'
    ];
    protected $scene = [
        'edit' => [
            'name' => 'require|min:2|max:50',
            'logo',
            'type',
            'xilie',
            'guocheng',
            'huli_time',
            'price_once',
            'price_all',
            'all_need_ci',
            'sort',
            'is_recommend'
        ]
    ];

}

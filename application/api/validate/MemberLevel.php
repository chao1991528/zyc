<?php

namespace app\api\validate;

use think\Validate;

/**
 * 会员等级验证器
 */
class MemberLevel extends Validate {

    protected $rule = [
        'name' => 'require|min:2|max:50|unique:member_level',
        'condition' => 'requier|max:50',
        'product_discount' => 'max:50',
        'meijia_discount' => 'max:50',
        'meijie_discount' => 'max:50',
        'customized_service' => 'max:200',
        'birthday_treat' => 'max:200',
        'experience' => 'max:200',
        'meal' => 'max:200',
        'social_circle' => 'max:200',
        'appoint_service' => 'max:200',
        'brand_discount' => 'max:200',
        'activity_privilege' => 'max:200',
        'zunxiang_service' => 'max:255',
        'special_service' => 'max:255'
    ];
    protected $message = [
        'name.require' => '会员等级名称必须',
        'name.min' => '会员等级名称至少2个字符',
        'name.max' => '会员等级名称最多不能超过50个字符',
        'name.unique' => '会员等级名称已经存在',
        'condition.require' => '入会条件必须填写',
        'condition.max' => '入会条件最多不能超过50个字符',
        'product_discount.max' => '产品优惠最多不能超过50个字符',
        'meijia_discount.max' => '美甲优惠最多不能超过50个字符',
        'meijie_discount.max' => '美睫优惠最多不能超过50个字符',
        'customized_service.max' => '定制服务最多不能超过200个字符',
        'birthday_treat.max' => '生日尊享最多不能超过200个字符',
        'experience.max' => '超值体验最多不能超过200个字符',
        'meal.max' => '营养餐最多不能超过200个字符',
        'social_circle.max' => '社交圈最多不能超过200个字符',
        'appoint_service.max' => '预约服务最多不能超过200个字符',
        'brand_discount.max' => '品牌优惠最多不能超过200个字符',
        'activity_privilege.max' => '参与活动最多不能超过200个字符',
        'zunxiang_service.max' => '尊享服务最多不能超过200个字符',
        'special_service.max' => '专属服务最多不能超过200个字符'
    ];
    protected $scene = [
        'edit' => [
            'name' => 'require|min:2|max:50',
            'condition',
            'product_discount',
            'meijia_discount',
            'meijie_discount',
            'customized_service',
            'birthday_treat',
            'experience',
            'meal',
            'social_circle',
            'appoint_service',
            'brand_discount',
            'activity_privilege',
            'zunxiang_service',
            'special_service'
        ]
    ];

}

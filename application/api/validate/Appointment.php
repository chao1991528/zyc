<?php

namespace app\api\validate;

use think\Validate;

/**
 * 预约验证器
 */
class Appointment extends Validate {

    protected $rule = [
        'name' => 'require|max:50',
        'phone' => ['require', 'regex' => '/^(13[0-9]|15[0-9]|17[03678]|18[0-9]|14[57])[0-9]{8}$/','checkPhone'],
        'person_num' => 'require|between:1,100',
        'product_id' => 'require|number',
        'store_id' => 'require|number',
        'appoint_date' => 'require|date',
        'appoint_time' => 'require|dateFormat:H:m',
        'remark' => 'max:255',
        'member_code' => 'max:50|requireIf:is_member,1',
        'is_member' => 'require|number'
    ];
    protected $message = [
        'name.require' => '姓名必须',
        'name.max' => '姓名最多不能超过50个字符',
        'phone.require' => '联系电话必填',
        'phone.regex' => '联系电话格式不正确',
        'person_num.require' => '来店人数必填',
        'person_num.between' => '来店人数必须在1到100人之间',
        'product_id.require' => '服务项目必选',
        'store_id.require' => '预约门店必选',
        'appoint_date.require' => '预约日期必填',
        'appoint_time.require' => '到店时间必填',
        'remark.max' => '备注最多不能超过200个字符',
        'member_code.requireIf' => '会员必须填写会员编号',
        'member_code.max' => '会员标号最多不能超过50个字符',
        'is_member.require' => '是否是会员必选'
    ];

    // 自定义验证规则，当天同一个手机号只能预约1次
    protected function checkPhone($value, $rule, $data) {
        $map = ['phone'=> $value, 'create_time' => ['>', date('Y-m-d')]];
        $rs = db('appointment')->where($map)->find();
        return $rs ? '该手机号当天已经预约过了': true;
    }

}

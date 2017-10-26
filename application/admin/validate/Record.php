<?php

namespace app\api\validate;

use think\Validate;

/**
 * 肌肤问题记录验证器
 */
class Record extends Validate {

    protected $rule = [
        'face_img' => 'require|max:255',
        'skin_type' => 'require|max:255',
        'skin_color' => 'require|max:255',
        'is_guomin' => 'require|max:255',
        'skin_problem' => 'require|max:255',
        'want_solve_problem' => 'require|max:255',
        'is_huli' => 'require|max:255'
    ];
    protected $message = [
        'face_img.require' => '必须上传图片',
        'face_img.max' => '图片路径最多不能超过255个字符',
        'skin_type.require' => '皮肤特征必填',
        'skin_type.regex' => '皮肤特征最多不能超过255个字符',
        'skin_color.require' => '肤色必填',
        'skin_color.regex' => '肤色最多不能超过255个字符',
        'is_guomin.require' => '是否过敏必填',
        'is_guomin.regex' => '是否过敏最多不能超过255个字符',
        'skin_problem.require' => '皮肤问题必填',
        'skin_problem.regex' => '皮肤问题最多不能超过255个字符',
        'want_solve_problem.require' => '想解决的皮肤问题必填',
        'want_solve_problem.regex' => '想解决的皮肤问题最多不能超过255个字符',
        'is_huli.require' => '是否对皮肤护理必填',
        'is_huli.regex' => '是否对皮肤护理最多不能超过255个字符'
    ];

}

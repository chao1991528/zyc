<?php
namespace app\admin\validate;

use think\Validate;

class AuthRule extends Validate
{
    protected $rule = [
        'name'  =>  'require|max:80|min:2',
        'title'  =>  'require|max:20|min:2',
    ];
    protected $message  =   [
        'name.require' => '规则必须',
        'name.max'     => '规则最多不能超过80个字符',
        'name.min'     => '规则至少2个字',
        'title.max'     => '规则标题长度最多不能超过20个字符',
        'title.min'     => '规则标题长度至少为2位',
        'title.require' => '规则标题必须'   
    ];
}

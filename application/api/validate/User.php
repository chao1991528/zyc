<?php
namespace app\api\validate;

use think\Validate;

class User extends Validate
{
    protected $rule = [
        'username'  =>  'require|max:10|min:2|unique:user',
        'password'  =>  'require|max:20|min:6',
    ];
    protected $message  =   [
        'username.require' => '用户名必须',
        'username.max'     => '用户名最多不能超过10个字符',
        'username.min'     => '用户名至少2个字',
        'username.unique'  => '用户名已经存在',
        'password.max'     => '密码长度最多不能超过20个字符',
        'password.min'     => '密码长度至少为6位',
        'password.require' => '密码必须'   
    ];
    protected $scene = [
        'edit' => [ 'username' => 'require|max:50|min:2', 'password' => 'max:20|min:6']
    ];

}

<?php
namespace app\admin\validate;

use think\Validate;

class Admin extends Validate
{
    protected $rule = [
        'username'  =>  'require|max:20|min:2|unique:admin',
        'password'  =>  'require|max:20|min:6',
        'realname'  =>  'require|max:20|min:2',
        'group_id'  =>  'require|number',
        'status'    =>  'in:0,1'
    ];
    protected $message  =   [
        'username.require' => '用户名必须',
        'username.max'     => '用户名最多不能超过20个字符',
        'username.min'     => '用户名至少2个字',
        'username.unique'  => '用户名已经存在',
        'password.max'     => '密码长度最多不能超过20个字符',
        'password.min'     => '密码长度至少为6位',
        'password.require' => '密码必须',
        'realname.require' => '真实姓名必须',
        'realname.max'     => '真实姓名最多不能超过20个字符',
        'realname.min'     => '真实姓名至少2个字',
        'group_id.require' => '所属组必选',
        'group_id.number'  => '所属组必须为数字',
        'status.in'        => '状态必须在0和1之间'        
    ];
    protected $scene = [
        'edit' => [ 'username' => 'require|max:20|min:2', 'password' => 'max:20|min:6', 'realname', 'group_id', 'status']
    ];

}

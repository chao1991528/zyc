<?php
namespace app\admin\validate;

use think\Validate;

class AdminGroup extends Validate
{
    protected $rule = [
        'title'  =>  'require|max:20|min:2|unique:auth_group',
        'rules'  =>  'require',
    ];
    protected $message  =   [
        'title.require' => '管理员组名必须',
        'title.max'     => '管理员组名最多不能超过20个字符',
        'title.min'     => '管理员组名至少2个字',
        'title.unique'  => '管理员组名已经存在',
        'rules.require' => '权限不能为空'
    ];
    protected $scene = [
        'edit' => [ 'name' => 'require|max:20|min:2', 'rules']
    ];

}

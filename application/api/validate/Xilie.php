<?php
namespace app\api\validate;

use think\Validate;

class Xilie extends Validate
{
    protected $rule = [
        'name'  =>  'require|max:50',
        'logo' =>  'max:200',
        'sort' => 'number'
    ];
    protected $message  =   [
        'name.require' => '分类名称必须',
        'name.max'     => '分类名称最多不能超过50个字符',
        'name.unique' => '该分类名称已经存在',
        'logo.max'     => 'logo图片地址最多不能超过200个字符',
        'sort.number'   => '排序必须是数字'   
    ];
    protected $scene = [
        'add'  =>  [ 'name' => 'require|max:50|unique:product_type','logo'=>'require|max:200', 'sort']
    ];
}

<?php
namespace app\api\validate;

use think\Validate;
/**
 * 首页设置验证器
 */
class IndexSet extends Validate
{
    protected $rule = [
        'comment_url'  =>  'require|max:255|url',
        'bg_img' =>  'require|max:255',
        'concept' => 'require'
    ];
    protected $message  =   [
        'comment_url.require' => '点评链接必须',
        'comment_url.max'   => '点评链接最多不能超过255个字符',
        'comment_url.url'   => '点评链接格式有误',
        'bg_img.require' => '首页背景图片必须',
        'bg_img.max'     => '首页背景图片最多不能超过255个字符',
        'concept.require'     => '品牌理念不能为空'
    ];
}

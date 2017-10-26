<?php

namespace app\api\validate;

use think\Validate;

/**
 * 产品系列验证器
 */
class ProductXilie extends Validate {

    protected $rule = [
        'product_id'  => 'require|number',
        'xilie_id' => 'require|number'
    ];
    protected $message = [
        'product_id.require' => '产品id必须',
        'product_id.number' => '产品id必须为数字',
        'xilie_id.require' => '产品系列id必须',
        'xilie_id.number' => '产品系列id必须为数字'       
    ];

}

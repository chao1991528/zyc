<?php

namespace app\api\model;

use think\Model;

/**
 * 产品模型
 */
class Product extends Model {

    protected $autoWriteTimestamp = 'datetime';

    public function productXilie() {
//        return $this->hasMany('ProductXilie', 'product_id');
        return $this->belongsToMany('Xilie', 'product_xilie', 'xilie_id', 'product_id');
    }

    public function productType() {
        return $this->belongsTo('ProductType', 'type');
    }
    
    public function getIsRecommendAttr($value) {
        $rs = [ 0 => '否', 1 => '是'];
        return $rs[$value];
    }
    
    //添加产品
    public function saveData($data) {
        if (isset($data['id']) && !empty($data['id'])) {
            $rs = $this->save($data, ['id' => $data['id']]);
            if ($rs !== false) {
                return true;
            }
        } else {
            $rs = $this->data($data)->save();
            if ($rs) {
                return $rs;
            }
        }
        return false;
    }

}

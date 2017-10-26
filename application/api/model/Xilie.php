<?php

namespace app\api\model;

use think\Model;
/**
 * 产品类型模型
 */
class Xilie extends Model
{
    protected $autoWriteTimestamp = 'datetime';
    
    public function Product() {
        return $this->belongsToMany('Product',  'product_xilie');
    }
    
    //添加产品类型
    public function saveData($data){
        if(isset($data['id']) && !empty($data['id'])){
            $rs = $this->save($data, ['id' => $data['id']]);
            if($rs !== false){
                return true;
            }
        }else{
            $rs = $this->data($data)->save();
            if($rs){
                return true;
            }
        }        
        return false;
    }    
}

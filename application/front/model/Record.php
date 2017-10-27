<?php

namespace app\front\model;

use think\Model;

/**
 * 肌肤测试记录模型
 * @author zyc
 */
class Record extends Model {
    protected $autoWriteTimestamp = 'datetime';
    
    //保存肌肤测试记录信息
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

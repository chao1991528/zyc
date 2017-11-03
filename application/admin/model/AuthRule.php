<?php

namespace app\admin\model;

use think\Model;
use think\Request;
/**
 * 规则模型
 * @author zyc
 */
class AuthRule extends Model {
    
    //保存规则信息
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

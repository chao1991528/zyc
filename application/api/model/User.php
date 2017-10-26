<?php

namespace app\api\model;

use think\Model;
/**
 * 管理员类型模型
 */
class User extends Model
{
//    protected $autoWriteTimestamp = 'datetime';
    
    //保存管理员信息
    public function saveData($data){
        if(empty($data['password'])){
            unset($data['password']);
        }  else {
            $data['password'] = md5($data['password']);
        }
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

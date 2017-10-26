<?php

namespace app\admin\model;

use think\Model;
use think\Request;
/**
 * 管理员类型模型
 * @author zyc
 */
class Admin extends Model {

    public function login($username, $pwd) {
        
        $admin = db('admin')->where('username', $username)->find();
        if (!$admin || $admin['password'] != md5($pwd)) {
            return 403;
        }
        $request = Request::instance();
        $ip = $request->ip();
        $res = db('admin')->where('username', $username)->update(['last_login_ip' => $ip, 'last_login_time' => time()]);
        if($res){
            session('admin.name', $admin['username']);
            session('admin.id', $admin['id']);
            session('admin.real', $admin['realname']);
            define('UID', $admin['id']);
            return 200;
        } 
        return 400;
    }
    
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

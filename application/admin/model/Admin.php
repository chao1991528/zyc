<?php

namespace app\admin\model;

use think\Model;
use think\Request;
/**
 * 管理员类型模型
 * @author zyc
 */
class Admin extends Model {
    
    public function getStatusAttr($value)
    {
        $status = [0=>'禁用',1=>'正常'];
        return $status[$value];
    }

    public function login($username, $pwd) {        
        $admin = db('admin')->alias('a')
                            ->field('a.id,a.realname,a.username,a.status,a.password,a.pid,c.title,c.id as gid')
                            ->join('__AUTH_GROUP_ACCESS__ b', 'a.id=b.uid', 'left')
                            ->join('__AUTH_GROUP__ c', 'b.group_id=c.id','left')
                            ->where('username', $username)
                            ->find();
        if(!$admin['status']){
            return 405;
        }
        if (!$admin || $admin['password'] != md5($pwd)) {
            return 403;
        }
        $request = Request::instance();
        $ip = $request->ip();
        $res = db('admin')->where('username', $username)->update(['last_login_ip' => $ip, 'last_login_time' => date("Y-m-d H:i:s")]);
        if($res){
            session('name', $admin['username']);
            session('id', $admin['id']);
            session('pid', $admin['pid']);
            session('real', $admin['realname']);
            session('gid', $admin['gid']);
            session('groupname', $admin['title']);
            return 200;
        } 
        return 400;
    }
    
    //保存管理员信息
    public function saveData($data){
        $groupId = $data['group_id'];
        unset( $data['group_id']);
        if(empty($data['password'])){
            unset($data['password']);
        }  else {
            $data['password'] = md5($data['password']);
        }
        if(isset($data['id']) && !empty($data['id'])){
            $rs = $this->save($data, ['id' => $data['id']]);
            $rs2 = db('AuthGroupAccess')->where(['uid' => $data['id']])->delete();
            $rs3 = db('AuthGroupAccess')->insert(['uid' => $data['id'], 'group_id' => $groupId]);
            if(($rs !== false) && $rs2 && $rs3){
                return true;
            }
        }else{
            $rs = $this->data($data)->save();
            $id = $this->getAttr('id');
            $rs2 = db('AuthGroupAccess')->insert(['uid' => $id, 'group_id'=> $groupId]);
            if($rs && $rs2){
                return true;
            }
        }        
        return false;
    }
    
    //删除管理员
    public function del($where = []){
        $rs1 = $this->where($where)->delete();
        $rs2 = db('AuthGroupAccess')->where('uid', $where['id'])->delete();
        if($rs1 && $rs2){
            return true;
        } else {
            return false;
        }
    }

}

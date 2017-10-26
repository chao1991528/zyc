<?php

namespace app\api\service;

use think\Model;
use think\Request;
use think\Db;
/**
 * 跟用户相关的服务
 * @author zyc
 */
class User extends Model {

    public function login($username, $pwd) {
        
        $user = Db::name('user')->where('username', $username)->find();
        if (!$user || $user['password'] != md5($pwd)) {
            return 403;
        }
        $request = Request::instance();
        $ip = $request->ip();
        $res = Db::name('user')->where('username', $username)->update(['last_login_ip' => $ip, 'last_login_time' => time()]);
        if($res){
            session('user.name', $user['username']);
            session('user.id', $user['id']);
            session('user.real', $user['realname']);
            define('UID', $user['id']);
            return 200;
        } else {
            define('UID', 0);
        }
        return 400;
    }

}

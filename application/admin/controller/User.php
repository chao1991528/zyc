<?php

namespace app\admin\controller;

use app\admin\common\AdminController;
use think\Db;

class User extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];

    //用户修改页面
    public function index() {
        $setView = [
            'css' => ['style'],
            'js' => ['uindex']
        ];
        $this->set_view($setView);
        $user = db('user')->where('id', 1)->find();
        return view('index', ['user' => $user]);
    }

    //用户列表页
//    public function ulist() {
//        $users = Db::name('user')->select();
//        return view('list', [
//            'users'  => $users
//        ]);
//    }

}

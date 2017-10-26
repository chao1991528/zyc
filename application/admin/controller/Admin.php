<?php

namespace app\admin\controller;

use app\admin\common\AdminController;
use think\Db;

class Admin extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];

    //管理员修改页面
    public function index() {
        $setView = [
            'css' => ['style'],
            'js' => ['uindex']
        ];
        $this->set_view($setView);
        $user = db('admin')->where('id', 1)->find();
        return view('index', ['user' => $user]);
    }

    //修改管理员信息
    public function doSaveAdmin() {
        $data = input('post.');
        $data['id'] = 1;
        $result = $this->validate($data, 'Admin.edit');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('admin')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }

}

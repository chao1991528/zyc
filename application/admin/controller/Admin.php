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
    
    //管理员列表
    public function alist(){
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min','dataTables.bootstrap','alist']
        ];
        $this->set_view($setView);
        
        //获取组信息
        $ids = [];
        $groups = db('AuthGroup')->where('id', 'in', $ids)->column('id, title');
        
        return view('alist', ['groups' => $groups]);
    }
    
    public function doAdminList(){
        $data = \app\admin\model\Admin::all();
        return $this->resData($data);
    }
    
    //查看管理员信息
    public function viewAdmin(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
//        $data = $
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

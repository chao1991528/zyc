<?php

namespace app\admin\controller;

use app\admin\common\AdminController;
use think\Db;

class Admin extends AdminController {

    protected $beforeActionList = [
        'loginNeed',
        'checkAuth' =>  ['except'=>'doAdminList']
    ];
    
    //管理员列表
    public function alist(){
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min', 'dataTables.bootstrap', 'select-ui.min', 'alist']
        ];
        $this->set_view($setView);
        
        //获取组信息
        $ids = getSubIds('AuthGroup', session('gid'));
        $groups = db('AuthGroup')->where('id', 'in', $ids)->column('id, title');
        //获取上级信息
        $pids = getSubIds('Admin', session('id'), true);
        $parents = db('Admin')->where('id', 'in', $pids)->column('id, realname');
        
        return view('alist', ['groups' => $groups, 'parents'=>$parents ]);
    }
    
    public function doAdminList(){
        $ids = getSubIds('Admin', session('id'), true);
        $origin_data = \app\admin\model\Admin::all($ids);
        $data = \auth\Tree::tree($origin_data, 'realname', 'id', 'pid', session('pid'));
        return $this->resData($data);
    }
    
    //查看管理员信息
    public function viewAdmin(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $data = db('Admin')->alias('a')->join('__AUTH_GROUP_ACCESS__ b', 'a.id = b.uid')->field('username,realname,status,group_id,pid')->where('id', $id)->find();
        return $this->resData($data);
    }
    
    //添加管理员信息
    public function doAddAdmin() {
        $data = input('post.');
        $result = $this->validate($data, 'Admin');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('admin')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }

    //修改管理员信息
    public function doEditAdmin() {
        $data = input('post.');
        $result = $this->validate($data, 'Admin.edit');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('admin')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }
    
    //删除管理员
    public function doDelAdmin(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        //如果当前管理员下有子管理员则不能删除
        $count = db('Admin')->where('pid', $id)->count();
        if($count){
            return $this->resMes('444', '该管理员下面还有子管理员，不能删除！');
        }
        $res = model('Admin')->del(['id' => $id]);
        
        return $res ? $this->resMes(200) : $this->resMes(400);
    }

}

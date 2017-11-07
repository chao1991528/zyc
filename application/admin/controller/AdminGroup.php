<?php

namespace app\admin\controller;

use app\admin\common\AdminController;
use think\Db;

class AdminGroup extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];
    
    //管理员组列表
    public function glist(){
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min','dataTables.bootstrap', 'select-ui.min','glist']
        ];
        $this->set_view($setView);
        //获取管理员组
        $groups = db('AuthGroup')->column('id, title');
             
        return view('glist', [ 'groups' => $groups ]);
    }

        //管理员添加
    public function doAddAdminGroup(){
        $data = input('post.');
        $result = $this->validate($data, 'AdminGroup');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('AuthGroup')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }


    public function doAdminGroupList(){
        $origin_data = db('AuthGroup')->field('id,pid,title')->select();
        $data = \auth\Tree::tree($origin_data, 'title', 'id', 'pid');
        return $this->resData($data);
    }
    
    //查看管理员组信息
    public function viewAdminGroup(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $data = db('AuthGroup')->where('id', $id)->find();
        return $this->resData($data);
    }

    //修改管理员组信息
    public function doEditAdminGroup() {
        $data = input('post.');
        $result = $this->validate($data, 'AdminGroup.edit');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('AuthGroup')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }
    
    //删除管理员组信息
    public function doDelAdminGroup(){
        $id = input('post.id');
        if (!$id) {
            return $this->resMes(300);
        }
        $count1 = db('AuthGroupAccess')->where('group_id', $id)->count();
        if($count1){
            return $this->resMes(444, '该组下还有用户，不能删除');
        }
        $count2 = db('AuthGroup')->where('pid', $id)->count();
        if($count2){
            return $this->resMes(444, '该组下还有子分组，不能删除');
        }
        $res = db('AuthGroup')->where('id',  $id)->delete();
        return $res ? $this->resMes(200) : $this->resMes(400);
    }
    
    protected function getSubIds($id = 0, $include_self = false) {
        static $ids = [];
        $rules = db('authRule')->field('id,pid')->select();
        foreach ($rules as $v) {
            if ($v['pid'] == $id) {
                $ids[] = $v['id'];
                $this->getSubIds($v['id']);
            }
        }
        if($include_self){
            $ids[] = $id; 
        }
        return $ids;
    }
    
    protected function getSubIds2($id = 0, $include_self = false) {
        static $ids = [];
        $rules = db('authRule')->field('id,pid')->select();
        foreach ($rules as $v) {
            if ($v['pid'] == $id) {
                $ids[] = $v['id'];
                $this->getSubIds($v['id']);
            }
        }
        if($include_self){
            $ids[] = $id; 
        }
        return $ids;
    }

}

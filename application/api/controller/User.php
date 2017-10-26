<?php

namespace app\api\controller;

use app\api\common\ApiController;

class User extends ApiController {
    protected $beforeActionList = [
        'loginNeed'
    ];

    //获取管理员列表
    public function doUlist() {
        $data = db('User')->order('sort desc')->select();
        return $this->resData($data);
    }
    
    //删除管理员
    public function doDelUser(){
//        $ids = input('post.ids');
//        if(!$ids){
//            return $this->resMes(300); 
//        }
//        //如果该系列下还有产品，则不能删除
//        $productNum = db('Product')->where('type','in',$ids)->count();
//        if($productNum>0){
//            return $this->resMes(444, '系列下面还有产品，请先删除属于这些系列产品');
//        }        
//        $res = db('User')->where('id','in',$ids)->delete();
//        //还有日志操作undo
//        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //添加管理员
    public function doAddUser(){
        //获取参数并验证
//        $data = input('post.');
//        $result = $this->validate($data,'User.add');
//        if(true !== $result){
//            return $this->resMes('444', $result);
//        }
//        $productType = model('User');
//        $res = $productType->saveData($data);
//        //还有日志操作undo
//        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //编辑管理员
    public function doEditUser(){
        //获取参数并验证
//        $data = input('post.');
//        $result = $this->validate($data,'User');
//        if(true !== $result){
//            return $this->resMes('444', $result);
//        }
//        if(empty($data['logo'])){
//            unset($data['logo']);
//        }
//        $productType = model('User');
//        $res = $productType->saveData($data);
//        return $res?$this->resMes(200):$this->resMes(400);
    }

    //根据id查看管理员信息
    public function viewUser(){
//        $id = input('post.id');
//        if(!$id){
//            return $this->resMes(300);
//        }
//        $productType = db('xilie')->where('id', $id)->find();
//        return $this->resData($productType);
    }
    
    //修改管理员信息
    public function doSaveUser() {
        $data = input('post.');
        $data['id'] = 1;
        $result = $this->validate($data, 'User.edit');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('user')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }
}

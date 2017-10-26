<?php

namespace app\api\controller;

use app\api\common\ApiController;

class Store extends ApiController {
    protected $beforeActionList = [
        'loginNeed'
    ];

    //获取门店列表
    public function doSlist() {
        $data = db('Store')->select();
        return $this->resData($data);
    }
    
    //删除门店
    public function doDelStore(){
        $ids = input('post.ids');
        if(!$ids){
            return $this->resMes(300); 
        }      
        $res = db('Store')->where('id','in',$ids)->delete();
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //添加门店
    public function doAddStore(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'Store');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        $res = model('Store')->saveData($data);
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //编辑门店
    public function doEditStore(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'Store.edit');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        $res = model('Store')->saveData($data);
        return $res?$this->resMes(200):$this->resMes(400);
    }

    //根据id查看门店信息
    public function viewStore(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $store = db('store')->where('id', $id)->find();
        return $this->resData($store);
    }
}

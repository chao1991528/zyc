<?php

namespace app\api\controller;

use app\api\common\ApiController;

class Type extends ApiController {
    protected $beforeActionList = [
        'loginNeed' => ['except' => 'doTlist']
    ];

    //获取产品类型列表
    public function doTlist() {
        $p = input('post.page');
        $pagesize = input('post.size');
        if($p && $pagesize){
            $data = db('ProductType')->limit( $p*$pagesize, $pagesize )->order('sort desc')->select();
            foreach ($data as &$v){
                $v['url'] = url('front/product/plist', 'tid='.$v['id']);
            }
        }else{
            $data = db('ProductType')->order('sort desc')->select();
        }        
        return $this->resData($data);
    }
    
    //删除产品类型
    public function doDelProType(){
        $ids = input('post.ids');
        if(!$ids){
            return $this->resMes(300); 
        }
        //如果该类型下还有产品，则不能删除
        $productNum = db('Product')->where('type','in',$ids)->count();
        if($productNum>0){
            return $this->resMes(444, '类型下面还有产品，请先删除属于这些类型产品');
        }        
        $res = db('ProductType')->where('id','in',$ids)->delete();
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //添加产品类型
    public function doAddProType(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'ProductType.add');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        $productType = model('ProductType');
        $res = $productType->saveData($data);
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //编辑产品类型
    public function doEditProType(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'ProductType');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        if(empty($data['logo'])){
            unset($data['logo']);
        }
        $productType = model('ProductType');
        $res = $productType->saveData($data);
        return $res?$this->resMes(200):$this->resMes(400);
    }

    //根据id查看产品类型信息
    public function viewProType(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $productType = db('productType')->where('id', $id)->find();
        return $this->resData($productType);
    }
}

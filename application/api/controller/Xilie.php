<?php

namespace app\api\controller;

use app\api\common\ApiController;

class Xilie extends ApiController {
    protected $beforeActionList = [
        'loginNeed' => ['except' => 'doXlist']
    ];

    //获取产品系列列表
    public function doXlist() {
        $p = input('post.page');
        $pagesize = input('post.pagesize');
        if($p && $pagesize){
            $data = db('Xilie')->limit($p*$pagesize, $pagesize)->order('sort desc')->select();
            foreach ($data as &$v){
                $v['url'] = url('front/product/plist', 'xid='.$v['id']);
            }
        }else{
            $data = db('Xilie')->order('sort desc')->select();
        }
        return $this->resData($data);
    }
    
    //删除产品系列
    public function doDelXilie(){
        $ids = input('post.ids');
        if(!$ids){
            return $this->resMes(300); 
        }
        //如果该系列下还有产品，则不能删除
        $productNum = db('Product')->where('type','in',$ids)->count();
        if($productNum>0){
            return $this->resMes(444, '系列下面还有产品，请先删除属于这些系列产品');
        }        
        $res = db('Xilie')->where('id','in',$ids)->delete();
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //添加产品系列
    public function doAddXilie(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'Xilie.add');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        $productType = model('Xilie');
        $res = $productType->saveData($data);
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //编辑产品系列
    public function doEditXilie(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'Xilie');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        if(empty($data['logo'])){
            unset($data['logo']);
        }
        $productType = model('Xilie');
        $res = $productType->saveData($data);
        return $res?$this->resMes(200):$this->resMes(400);
    }

    //根据id查看产品系列信息
    public function viewXilie(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $productType = db('xilie')->where('id', $id)->find();
        return $this->resData($productType);
    }
}

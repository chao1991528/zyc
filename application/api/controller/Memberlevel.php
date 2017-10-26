<?php

namespace app\api\controller;

use app\api\common\ApiController;

class Memberlevel extends ApiController {
    protected $beforeActionList = [
        'loginNeed'
    ];

    //获取会员等级列表
    public function doMlist() {
        $data = db('MemberLevel')->select();
        return $this->resData($data);
    }
    
    //删除会员等级
    public function doDelMemberLevel(){
        $ids = input('post.ids');
        if(!$ids){
            return $this->resMes(300); 
        }      
        $res = db('MemberLevel')->where('id','in',$ids)->delete();
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //添加会员等级
    public function doAddMemberLevel(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'MemberLevel');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        $res = model('MemberLevel')->saveData($data);
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //编辑会员等级
    public function doEditMemberLevel(){
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data,'MemberLevel.edit');
        if(true !== $result){
            return $this->resMes('444', $result);
        }
        $res = model('MemberLevel')->saveData($data);
        return $res?$this->resMes(200):$this->resMes(400);
    }

    //根据id查看会员等级信息
    public function viewMemberLevel(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $memberLevel = db('memberLevel')->where('id', $id)->find();
        return $this->resData($memberLevel);
    }
}

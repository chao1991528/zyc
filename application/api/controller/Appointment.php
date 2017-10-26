<?php

namespace app\api\controller;

use app\api\common\ApiController;

class Appointment extends ApiController {
    protected $beforeActionList = [
        'loginNeed' => ['except' => 'doAddAppointment']
    ];

    //获取预约列表
    public function doAlist() {
//        $data = db('appointment')->order('sort desc')->select();
        $data = \app\api\model\Appointment::all();
        foreach ($data as &$v){
            $v['store_name'] = $v->store->name;
            $v['appoint_full_time'] = $v['appoint_date'] . ' ' . $v['appoint_time'];
            unset($v['appoint_date']);
            unset($v['appoint_time']);
            $v['product_name'] = $v['product_id'];
            unset($v['product_id']);
        }
        return $this->resData($data);
    }
    
    //删除预约
    public function doDelAppointment(){
        $ids = input('post.ids');
        if(!$ids){
            return $this->resMes(300);
        }      
        $res = db('appointment')->where('id','in',$ids)->delete();
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }
    
    //添加预约
    public function doAddAppointment() {
        //获取参数并验证
        $data = input('post.');
        $result = $this->validate($data, 'Appointment');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        
        $res = model('appointment')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }

    //编辑预约
    public function doEditAppointment() {
        $data = input('post.');
        if (!in_array($data['status'], [0, 1, 2])) {
            return $this->resMes(300);
        }
        $res = model('appointment')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }

    //根据id查看预约信息
    public function viewAppointment(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $productType = db('appointment')->where('id', $id)->find();
        return $this->resData($productType);
    }
}

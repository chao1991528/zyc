<?php

namespace app\front\controller;

use app\front\common\FrontController;

/**
 * 会员等级类
 */
class Memberlevel extends FrontController {

//    protected $beforeActionList = [
//        'loginNeed'
//    ];

    //会员等级列表页
    public function mlist() {
        $setView = [
            'title' => 'VIP',
            'css' => ['vipList']
        ];
        $this->set_view($setView);
        
        $memberLevels = db('memberLevel')->field('id,name')->select();
        return view('mlist', ['levels' => $memberLevels]);        
    }
    
    //会员等级详情页
    public function mdetail() {
        $setView = [
            'title' => 'VIP',
            'css' => ['vip']
        ];
        $this->set_view($setView);
        
        $id = input('param.id');
        if(!$id){
            echo '参数有误！';die;
        }
        $level = db('memberLevel')->where('id', $id)->find();
        return view('mdetail', ['level' => $level]);
    }

}

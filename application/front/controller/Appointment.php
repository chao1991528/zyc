<?php

namespace app\front\controller;

use app\front\common\FrontController;

/**
 * 预约类
 */
class Appointment extends FrontController {

//    protected $beforeActionList = [
//        'loginNeed'
//    ];
    //预约添加
    public function appointAdd() {
        $setView = [
            'title' => '在线预约',
            'css' => ['appointment'],
            'js' => ['datePicker', 'appointment']
        ];
        $this->set_view($setView);

        $projects = db('product')->where('status', 1)->field('id,name')->select();
        $stores = db('store')->order('sort desc')->column('id,name');

        return view('appointAdd', ['projects' => $projects, 'stores' => $stores]);
    }

}

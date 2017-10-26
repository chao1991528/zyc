<?php

namespace app\admin\controller;

use app\admin\common\AdminController;

/**
 * 预约类
 */
class Appointment extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];

    //预约列表页
    public function alist() {
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min','dataTables.bootstrap','alist']
        ];
        $this->set_view($setView);
        return view('alist');        
    }

}

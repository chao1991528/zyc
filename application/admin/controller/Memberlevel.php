<?php

namespace app\admin\controller;

use app\admin\common\AdminController;

/**
 * 会员等级类
 */
class Memberlevel extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];

    //会员等级列表页
    public function mlist() {
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min','dataTables.bootstrap','mlist']
        ];
        $this->set_view($setView);
        return view('mlist');        
    }

}

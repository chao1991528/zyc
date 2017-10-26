<?php

namespace app\admin\controller;

use app\admin\common\AdminController;

/**
 * 门店类
 */
class Store extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];

    //门店列表页
    public function slist() {
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min','dataTables.bootstrap','slist']
        ];
        $this->set_view($setView);
        return view('slist');        
    }

}

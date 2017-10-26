<?php

namespace app\admin\controller;

use app\admin\common\AdminController;
use think\Db;

class Product extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];

    //项目列表页
    public function plist() {
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js' => ['jquery.dataTables.min', 'dataTables.bootstrap', 'select-ui.min', 'plist']
        ];
        $types = db('productType')->column('id,name');
        $xilies = db('xilie')->column('id,name');
        $this->set_view($setView);
        return view('plist', ['types' => $types, 'xilies'=>$xilies]);
    }

}

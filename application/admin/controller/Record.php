<?php

namespace app\admin\controller;

use app\admin\common\AdminController;

/**
 * 肌肤测试记录类
 */
class Record extends AdminController {

    protected $beforeActionList = [
        'loginNeed'
    ];

    //肌肤测试记录列表页面
    public function rlist() {
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min','dataTables.bootstrap','rlist']
        ];
        $this->set_view($setView);
        return view('rlist');        
    }
    
    //肌肤测试记录数据
    public function doRlist(){
        $data = db('record')->select();
        return $this->resData($data);
    }
    
    //肌肤测试记录删除
    public function doDelRecord() {
        $ids = input('post.ids');
        if(!$ids){
            return $this->resMes(300);
        }      
        $res = db('record')->where('id','in',$ids)->delete();
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }

}

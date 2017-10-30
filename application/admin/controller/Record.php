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
    
    public function doExport(){
        $name = '肌肤测试结果';
        $records = db('record')->field('skin_type,skin_color,is_guomin,skin_problem,want_solve_problem,is_huli,result_skin_type,result_skin_feature,result_protect_point,create_time')
                              ->order('id desc') 
                              ->select();
        $header = ['皮肤类型', '皮肤颜色', '是否过敏', '皮肤问题', '最想解决的问题', '是否护理过皮肤', '测试结果肌肤属性', '测试结果表现特征', '测试结果保养重点', '创建时间'];
        excelExport($name, $header, $records);
    }

}

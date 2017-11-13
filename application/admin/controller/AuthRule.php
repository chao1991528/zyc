<?php

namespace app\admin\controller;

use app\admin\common\AdminController;

/**
 * 规则控制器类
 */
class AuthRule extends AdminController {

    protected $beforeActionList = [
        'loginNeed',
        'checkAuth' => ['except' => 'doRuleList,localisation'],
        'leftMenuData' =>  ['only'=>'ruleList']
    ];

    //规则列表页面
    public function ruleList() {
        $setView = [
            'css' => ['style', 'bootstrap.min', 'dataTables.bootstrap'],
            'js'  => ['jquery.dataTables.min','dataTables.bootstrap','ruleList']
        ];
        $this->set_view($setView);
        return view('ruleList');        
    }
    
    //规则数据
    public function doRuleList(){
        $origin_data = db('authRule')->field('id,name,title,pid')->order('name')->select();
        $data = \auth\Tree::tree($origin_data, 'title', 'id', 'pid');
        return $this->resData($data);
    }
    
    //编辑规则
    public function doEditRule(){
        $data = input('post.');
        $result = $this->validate($data, 'AuthRule');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('AuthRule')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }
    
    //查看规则
    public function viewRule(){
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        }
        $data = db('authRule')->where('id', $id)->find();
        return $this->resData($data);
    }


    //添加规则
    public function doAddRule(){
        $data = input('post.');
        $result = $this->validate($data, 'AuthRule');
        if (true !== $result) {
            return $this->resMes('444', $result);
        }
        $res = model('AuthRule')->saveData($data);
        return $res ? $this->resMes(200) : $this->resMes(400);
    }

    //规则删除
    public function doDelRule() {
        $id = input('post.id');
        if(!$id){
            return $this->resMes(300);
        } 
        $ids = getSubIds('AuthRule',$id, true);
        $res = db('authRule')->where('id','in',$ids)->delete();
        //还有日志操作undo
        return $res?$this->resMes(200):$this->resMes(400);
    }   

}

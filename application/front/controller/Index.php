<?php
namespace app\front\controller;
use app\front\common\FrontController;
use think\captcha\Captcha;
class Index extends FrontController
{
//    protected $beforeActionList = [
//        'loginNeed' => ['except' => 'index,verify'],
//    ];
    
    //前台首页
    public function index() {
        $setView = [
            'title' => '日置日美沙龙',
            'css' => ['index']
        ];
        $this->set_view($setView);
        
        $setting = db('indexSetting')->where('id', 1)->field('bg_img,comment_url')->find();        
        return view('index', $setting);
    }
    
    /**
     * 品牌理念
     */
    public function concept() {
        $setView = [
            'title' => '品牌理念',
            'css' => ['brandConcept']
        ];
        $this->set_view($setView);
        $concept = db('indexSetting')->where('id', 1)->value('concept');
        return view('concept', ['concept' => $concept]);
    }
    
}

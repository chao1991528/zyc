<?php
namespace app\admin\controller;
use app\admin\common\AdminController;
use think\captcha\Captcha;
class Index extends AdminController
{
    protected $beforeActionList = [
        'loginNeed' => ['except' => 'index,verify'],
    ];
    
    //登录页面
    public function index()
    {
        if(is_logined()){
            $this->redirect('admin/Product/plist');
        }
        return view('login');
    }
    
    /**
     * 根据$page的不同生成要求的验证码
     * @param string $page 页面
     * @return img
     */
    public function verify($page='index'){
        switch ($page) {
            case 'index':
                $config = [
                    // 验证码字体大小
                    'fontSize'    =>    30,    
                    // 验证码位数
                    'length'      =>    4,   
                    // 关闭验证码杂点
                    'useNoise'    =>    false,
                    //是否画混淆曲线
                    'useCurve'    => false,
                    //验证码字符集合
                    'codeSet'    => '0123456789',
                    //验证码字体
                    'fontttf'  => '5.ttf',
                    //背景色
                    'bg' => [104, 183, 26]
                ];
                break;
            default:
                break;
        }            
        $captcha = new Captcha($config);
        return $captcha->entry();
    }
    
    /**
     * 前台首页设置
     */
    public function indexSet() {
        $setView = [
            'css' => ['style'],
            'js' => ['indexSet']
        ];
        $this->set_view($setView);
        $setting = db('indexSetting')->where('id', 1)->find();
        return view('indexSet', ['concept' => $setting['concept'], 'bg_img' => $setting['bg_img'], 'comment_url' => $setting['comment_url']]);
    }
    
}

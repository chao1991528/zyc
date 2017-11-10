<?php
namespace app\admin\controller;
use app\admin\common\AdminController;
use think\captcha\Captcha;
class Index extends AdminController
{
    protected $beforeActionList = [
        'loginNeed' => ['only' => 'doLogout'],
    ];
    
    //登录页面
    public function index() {
        if (is_logined()) {
            $this->redirect('admin/record/rlist');
        } else {
            return view('login');            
        }
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
     * 登录操作处理
     */
    public function doLogin() {
        if (request()->isPost()) {
            $username = input('post.username');
            $pwd = input('post.pwd');
            $yzm = input('post.yzm');
            if (!$username || !$pwd || !$yzm) {
                return $this->resMes(300);
            }
            //验证码验证
            $captcha = new Captcha();
            $check = $captcha->check($yzm);
            if (!$check) {
                return $this->resMes(402);
            }
            //账号密码验证
            $code = model('Admin')->login($username, $pwd);
            return $this->resMes($code);
        } else {
            return $this->resMes(401);
        }
    }
    
    //退出登录
    public function doLogout(){
        session(null);
        return $this->resMes(200);
    }

}

<?php

namespace app\front\common;

use think\Controller;

class FrontController extends Controller {

    protected function _initialize() {
        parent::_initialize();
    }

    protected function loginNeed() {
        if (!is_logined()) {
//            $this->redirect('/index.html');
            echo '尚未登录';
            die;
        }
    }

    /**
     * 设置页面的title,js和css
     * @param array $data
     */
    public function set_view($data) {
        $css_str = '<link rel="stylesheet" href="/static/front/css/style.css">';
        if (isset($data['css']) && is_array($data['css'])) {
            foreach ($data['css'] as $css) {
                $css_str .= '<link href="/static/front/css/' . $css . '.css" rel="stylesheet" type="text/css" />' . PHP_EOL;
            }
        }
        $js_str = '<script src="/static/front/js/jquery-1.8.3.min.js"></script>' . PHP_EOL;
        if (isset($data['js']) && is_array($data['js'])) {
            foreach ($data['js'] as $js) {
                $js_str .= '<script src="/static/front/js/' . $js . '.js"></script>' . PHP_EOL;
            }
        }
        $this->assign([
            'title' => $data['title'],
            'css' => $css_str,
            'js' => $js_str
        ]);
    }

}

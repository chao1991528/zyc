<?php

namespace app\admin\common;

use think\Controller;

class AdminController extends Controller {

    protected function _initialize() {
        parent::_initialize();
    }

    protected function loginNeed() {
        if (!is_logined()) {
            $this->redirect('admin/index/index');
        }
    }

    /**
     * 设置页面的js和css
     * @param array $data
     */
    public function set_view($data) {
        $css_str = '<link rel="stylesheet" href="/static/layui/css/layui.css">';
        if (isset($data['css']) && is_array($data['css'])) {
            foreach ($data['css'] as $css) {
                $css_str .= '<link href="/static/css/' . $css . '.css" rel="stylesheet" type="text/css" />' . PHP_EOL;
            }
        }
        $js_str = '<script src="/static/js/jquery.min.js"></script>'.PHP_EOL;
        $js_str .= '<script src="/static/layui/layui.all.js"></script>'.PHP_EOL;
        $js_str .= '<script src="/static/js/common.js"></script>'.PHP_EOL;
        if (isset($data['js']) && is_array($data['js'])) {
            foreach ($data['js'] as $js) {
                $js_str .= '<script src="/static/js/' . $js . '.js"></script>' . PHP_EOL;
            }
        }
        $this->assign([
            'css' => $css_str,
            'js' => $js_str
        ]);
    }
    
    /**
     * 
     * @param int $code 状态码
     * @param array $message  提示信息
     * @return json
     */
    protected function resMes($code, $message = []) {
        if (empty($message)) {
            $message = config('return_code.' . $code);
        }
        return json(['code' => $code, 'message' => $message]);
    }

    /**
     * 返回数据
     * @param array $data 返回的数据
     * @param string $message 数据返回的提示信息
     * @return json
     */
    protected function resData($data, $message = '') {
        if (empty($data)) {
            return $this->resMes(201);
        }
        if (empty($message)) {
            $message = config('return_code.200');
        }
        return json(['code' => 200, 'data' => $data, 'message' => $message]);
    }

}

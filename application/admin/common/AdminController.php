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
    
    //jquery datatable语言汉化
    public function localisation() {
        $data = [
            'sProcessing' => '处理中...',
            'sLengthMenu' => '每页显示 _MENU_ 项结果',
            'sZeroRecords' => '没有匹配结果',
            'sInfo' => '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
            'sInfoEmpty' => '显示第 0 至 0 项结果，共 0 项',
            'sInfoFiltered' => '(由 _MAX_ 项结果过滤)',
            'sInfoPostFix' => '',
            'sSearch' => '搜索 : ',
            'sUrl' => '',
            'sEmptyTable' => '表中数据为空',
            'sLoadingRecords' => '载入中...',
            'sInfoThousands' => ',',
            'oPaginate' => ['sFirst' => '首页', 'sPrevious' => '上页', 'sNext' => '下页', 'sLast' => '末页'],
            'oAria' => ['sSortAscending' => '以升序排列此列', 'sSortDescending' => '以降序排列此列']
        ];
        return json($data);
    }
    
    //权限检查
    protected function checkAuth(){
        $request = request();
        $auth = new \auth\Auth();
        $module = $request->module();
        $controller = $request->controller();
        $action = $request->action();
        $rs = $auth->check($module .'/'.$controller.'/'.$action, session('id'));
        if(!$rs){
            if ($request->isPost() || $request->isAjax()){
                json(['code'=>406, 'message'=> '没有权限'])->send();die;
            }
            echo '你没有权限！';die;
        }
    }
    
    //左侧菜单数据
    protected function leftMenuData(){
        $rule_ids = session('_auth_rule_ids');
        if($rule_ids){
            $leftMenu = [];
            $leftMenuData = db('AuthRule')->where('id', 'in', $rule_ids)->where('pid',0)->field('title,name')->select();
            foreach ($leftMenuData as $k => $v){
                $leftMenu[$k]['title'] = $v['title'];
                $arr = explode('/', $v['name']);
                $leftMenu[$k]['controller'] = $arr[1];
                $leftMenu[$k]['url'] = $v['name'];
            }
            $this->assign('leftMenu',$leftMenu);
        }
    }
    
}

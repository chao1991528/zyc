<?php

namespace app\api\common;
use think\Config;
use think\Controller;

class ApiController extends Controller {

    protected function _initialize() {
        parent::_initialize();
    }

    protected function loginNeed() {
        if (!is_logined()) {
            echo Config::get('return_code.301');
            exit();
        }
    }

    /**
     * 
     * @param int $code 状态码
     * @param array $message  提示信息
     * @return json
     */
    protected function resMes($code, $message = []) {
        if (empty($message)) {
            $message = Config::get('return_code.' . $code);
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
            $message = Config::get('return_code.200');
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

}

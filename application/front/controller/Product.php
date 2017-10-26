<?php

namespace app\front\controller;

use app\front\common\FrontController;

class Product extends FrontController {

//    protected $beforeActionList = [
//        'loginNeed'
//    ];

    //产品系列 列表页
    public function xilies() {
        $setView = [
            'title' => '产品系列列表',
            'js' => ['iscroll','xilies'],
            'css' => ['scrollbar','xilies']
        ];
        $this->set_view($setView);
        
        $xilies = db('xilie')->order('sort desc')->limit(8)->column('id,name,logo');
        return view('xilies', [ 'xilies'=>$xilies]);
    }
    
    //产品类型 列表页
    public function types() {
        $setView = [
            'title' => '产品类型列表',
            'js' => ['iscroll', 'types'],
            'css' => ['scrollbar', 'xilies']
        ];
        $this->set_view($setView);

        $xilies = db('productType')->order('sort desc')->limit(8)->column('id,name,logo');
        return view('xilies', ['xilies' => $xilies]);
    }
    
    //产品列表页
    public function plist(){
        $setView = [
            'title' => '产品列表',
            'js' => ['iscroll', 'plist'],
            'css' => ['scrollbar', 'xilies']
        ];
        $this->set_view($setView);
        
        //某个系列下的产品列表
        $map = [];
        $xid = input('param.xid');
        if($xid){
            $map['b.xilie_id'] = $xid;
            $map['status'] = 1;
            $products = \app\api\model\Product::all(function($query) use ($xid){
                $query->alias('a')->join('__PRODUCT_XILIE__ b','a.id = b.product_id')->field('a.id,name,logo,type')->where(['status'=>1, 'xilie_id'=> $xid])->limit(8)->order('sort', 'desc');
            });
        }
        //某个类型下的产品列表
        $tid = input('param.tid');
        if($tid){
            $products = \app\api\model\Product::all(function($query) use ($tid){
                $query->field('id,name,logo,type')->where(['status'=>1, 'type'=>$tid])->limit(8)->order('sort', 'desc');
            });
        }
        return view('plist', ['products' => $products]);
    }

    //项目详情页
    public function pdetail() {
        $setView = [
            'title' => '产品明细',
            'css' => ['product']
        ];
        $this->set_view($setView);

        $id = input('param.id');
        if (!$id) {
            echo '参数有误！';
            die;
        }    
        $product = \app\api\model\Product::get(['id' => $id]);
        return view('pdetail', ['product' => $product]);
    }

}

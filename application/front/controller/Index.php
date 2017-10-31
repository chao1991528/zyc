<?php
namespace app\front\controller;
use app\front\common\FrontController;
class Index extends FrontController
{
    
    //前台首页
    public function index() {
        $setView = [
            'title' => '在线肌肤测试',
            'keywords' => '化妆品、护肤、测试、肌肤测试、长痘、祛斑、美白',
            'description' => '盘龙云海护肤研究院，在线肌肤测试，提供针对性的护肤方案，包括祛痘、祛斑、美白等一系列肌肤问题。',
            'css' => ['reset', 'index'],
            'js'  => ['iscroll-zoom','hammer','lrz.all.bundle', 'jquery.photoClip.min', 'ui-choose', 'index']
        ];
        $this->set_view($setView);
        
        //微信二维码图片随机
        $img_arr = config('code_img');
        $index = array_rand($img_arr);
        $code_img = $img_arr[$index];
        return view('index', ['code_img' => $code_img]);
    }
    
    /**
     * 登录操作处理
     */
    public function doAdd() {
        if (request()->isPost()) {
            $data = input('post.');
            //图片上传
            $rs = $this->doUpload('faceImage', 'image');
            if($rs['code'] != 200){
                return $this->resMes(444, $rs['message']);
            } else {
                $data['face_img'] = $rs['message'];
            }
            //数据验证
            $result = $this->validate($data, 'Record');
            if (true !== $result) {
                return $this->resMes('444', $result);
            }
            $testResult = $this->testResult($data);
            $data = array_merge($data,$testResult);
            $res = model('Record')->saveData($data);            
            return $res ? $this->resData($testResult) : $this->resMes(400);
        } else {
            return $this->resMes(401);
        }
    }
    
    //单个文件上传处理
    protected function doUpload($type, $inputName) {
        if (!$type) {
            return $this->resMes(444, '上传目录必须设置');
        }
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file($inputName);
        // 移动到框架应用根目录/public/uploads/ 目录下 ,上传文件不能超过6M
        $info = $file->validate(['size' => 6 * 1024 * 1024, 'ext' => 'jpg,png,gif,bmp,jpeg'])->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . $type);
        if ($info) {
            //返回图片存储路径
            $uploadInfo = DS . 'uploads' . DS . $type . DS . $info->getSaveName();
            return ['code'=> 200, 'message' => $uploadInfo];
        } else {
            // 上传失败获取错误信息
            return ['code'=> 444, 'message' => $file->getError()];
        }
    }
    
        //测试结果
    protected function testResult($data){
        if($data['is_guomin'] == '易过敏'){
            return [
                'skin_type' => '敏感性皮肤',
                'feature'=> '皮肤较敏感，皮脂膜薄，皮肤自身保护能力较弱，皮肤易出现红、肿、刺、痒、痛和脱皮、脱水现象。',
                'protect_point' => '经常对皮肤进行保养；洗脸时水不可以过热过冷，要使用温和的洗面奶洗脸。早晨，可选用防晒霜，以避免日光伤害皮肤；晚上，可用营养型化妆水增加皮肤的水份。在饮食方面要少吃易引起过敏的食物。皮肤出现过敏后，要立即停止使用任何化妆品，对皮肤进行观察和保养护理。护肤品选择：应先进行适应性试验，在无反应的情况下方可使用。切忌使用劣质化妆品或同时使用多重化妆品，并注意不要频繁更换化妆品。'];
        } else {
            $skin_type = '';
            $feature = '';
            $protect_point = '';
            switch ($data['skin_type']) {
                case '不干也不油':
                    $skin_type = '中性皮肤';
                    $feature = '水份、油份适中，皮肤酸碱度适中，皮肤光滑细嫩柔软，富于弹性，红润而有光泽，毛孔细小，纹路排列整齐，皮沟纵横走向，这种皮肤一般炎夏易偏油，冬季易偏干。';
                    $protect_point = '注意清洁、爽肤、润肤以及按摩的周护理。注意日补水、调节水油平衡的护理。护肤品选择：依皮肤年龄、季节选择，夏天亲水性，冬天选滋润性，选择范围较广。';
                    break;
                case '干燥，毛孔细':
                    $skin_type = '干性皮肤';
                    $feature = '皮肤水份油份不正常，干燥、粗糙，缺乏弹性，皮肤的PH值不正常，毛孔细小，脸部皮肤较薄，易敏感。面部肌肤暗沉、没有光泽，易破裂、起皮屑、长斑，不易上妆。';
                    $protect_point = '多做按摩护理，促进血液循环，注意使用滋润、美白、活性的修护霜和营养霜。注意补充肌肤的水份与营养成份、调节水油平衡的护理。护肤品选择：多喝水、多吃水果、蔬菜，不要过于频繁的沐浴及过度使用洁面乳，注意周护理及使用保持营养型的产品，选择非泡沫型、碱性度较低的清洁产品、带保湿的化妆水。';
                    break;
                case 'T区油，U区干':
                    $skin_type = '油性皮肤';
                    $feature = '油脂分泌旺盛、T部位油光明显、毛孔粗大、常有黑头、外观暗黄，弹性较佳，对外界刺激不敏感。皮肤易吸收紫外线容易变黑、易脱妆、易产生粉刺、暗疮。';
                    $protect_point = '随时保持皮肤洁净清爽， 少吃糖、咖啡、刺激性食物， 多吃维生素B2/B6以增加肌肤抵抗力，注意补水及皮肤的深层清洁，控制油份的过度分泌。护肤品选择：使用油份较少、清爽性、抑制皮脂分泌、收敛作用较强的护肤品。白天用温水洗面，选用适合油性皮肤的洗面奶，保持毛孔的畅通和皮肤清洁。暗疮处不可以化妆，不可使用油性护肤品，化妆用具应该经常清洗或更换。更要注意适度的保湿。';
                    break;
                case '全脸泛油，易长痘':
                    $skin_type = '混合性皮肤';
                    $feature = '同时具有油性和干性皮肤的特征。多见为面孔T区部位易出油，其余部分则干燥，并时有粉刺发生，80%的女性都是混合性皮肤。混合性皮肤多发生于20岁～39岁之间。';
                    $protect_point = '按偏油性、偏干性、偏中性皮肤分别侧重处理，在使用护肤品时，先滋润较干的部位，再在其它部位用剩余量擦拭。注意适时补水、补营养成份、调节皮肤的平衡。护肤品选择：夏天参考第三项油性皮肤的选择，冬天参考第一项干性皮肤的选择。';
                    break;
                default:
                    break;
            }            
        }
        return ['result_skin_type' => $skin_type, 'result_skin_feature' => $feature, 'result_protect_point' => $protect_point];
    }

}

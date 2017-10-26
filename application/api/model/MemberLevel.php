<?php

namespace app\api\model;

use think\Model;

/**
 * 会员等级模型
 */
class MemberLevel extends Model {

//    protected $autoWriteTimestamp = 'datetime';
    //保存管理员信息
    public function saveData($data) {
        if (isset($data['id']) && !empty($data['id'])) {
            $rs = $this->save($data, ['id' => $data['id']]);
            if ($rs !== false) {
                return true;
            }
        } else {
            $rs = $this->data($data)->save();
            if ($rs) {
                return true;
            }
        }
        return false;
    }

}

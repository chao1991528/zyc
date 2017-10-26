<?php

namespace app\api\model;

use think\Model;

/**
 * 预约模型
 */
class Appointment extends Model {
    protected $autoWriteTimestamp = 'datetime';

    public function getStatusAttr($value) {
        $status = [ 0 => '预约中', 1 => '已使用', 2 => '已过期'];
        return $status[$value];
    }
    
    public function store() {
        return $this->belongsTo('Store', 'store_id');
    }

    //添加预约
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

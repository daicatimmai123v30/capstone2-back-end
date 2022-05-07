const express =require('express');
const router= express.Router();

const DeviceModel = require('../app/models/DeviceModel');
// const OwnerModel = require('../app/models/OwnerModel');
const auth = require('../app/middleware/auth')


router.post('/', auth,async(request, response) => {
    const {IMEI,name} = request.body;
    try {
        const findOwner = await DeviceModel.find({
            idOwner:request.userId,
            IMEI
        });
        if(findOwner.length > 0){
            return response.json({
                success:false,
                messages:'Bạn đã có thiết bị này rồi ',
            })
        }else{
            const newDevice = await DeviceModel({
                idOwner: request.userId,
                IMEI,
                name,
            }).save();
            return response.json({
                success:true,
                messages:'Thêm thành công',
                device: newDevice
            })
        }
    } catch (error) {
        console.log(error)
        return response.json({
            success:false,
            messages:'Lỗi server'
        })
    }
})

router.get('/', auth,async(request, response) => {
    try {
        const findDevice = await DeviceModel.find({
            idOwner:request.userId
        });
        return response.json({
            success:true,
            devices : findDevice
        })
    } catch (error) {
        console.log(error)
        return response.json({
            success:false,
            messages:'Lỗi server'
        })
    }
})

router.get('/:id',auth,async(request, response) => {
    try {
        const findDevice = await DeviceModel.findById(request.params.id);
        return response.json({
            success:true,
            device: findDevice
        })
    } catch (error) {
        console.log(error)
        return response.json({
            success:false,
            messages:'Lỗi server'
        })
    }
})



module.exports=router;
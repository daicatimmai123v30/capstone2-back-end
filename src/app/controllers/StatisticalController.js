const AppointmentModel = require('../models/AppointmentModel')
class StatisticalController{
    showAll =async(request,response)=> {
    try {
        const {startDate,endDate} = request.body;
        // const appointments = await AppointmentModel.find({createdAt:{
        //     $gte:new Date(startDate),
        //     $lte:new Date(new Date(endDate).getTime() + 1000*60*60*24)
        // }}).select('createdAt')

        const appointments = await AppointmentModel.find().select('startDate')
        const obj = await appointments.map(value=>{
            console.log(value.startDate, typeof value.startDate)
            return{
                createdAt:value.startDate.split(' ')[0]
            }
        }).filter(value=>{
            console.log(value)
            if(new Date(startDate) <= new Date(value.createdAt) && new Date(new Date(endDate).getTime() + 1000*60*60*24)>= new Date(value.createdAt))
                return true
            else
                return false
        })
        .reduce((p, c) => {
            var createdAt = c.createdAt;
            if (!p.hasOwnProperty(createdAt)) {
              p[createdAt] = 0;
            }
            p[createdAt]++;
            return p;
          }, {});
          const newAppointments = Object.keys(obj).map(value=>{
              return {
                year:value,
                population:obj[value]
              }
          })
        return response.json({
            success:true,
            appointments:newAppointments
        })
    } catch (error) {
        console.log(error)
        return response.json({
            success:false,
            messages:"Lỗi server"
        })
    }
   }
}

module.exports = new StatisticalController;
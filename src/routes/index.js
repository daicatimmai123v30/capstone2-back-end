const newsRouter = require('./new');
const accountsRoute = require('./AccountRoute');
const doctorsRoute = require('./DoctorRoute');
const appointmentRoute = require('./AppointmentRoute');
const authenticatrionRoute = require('./AuthenticationRoute');
const catalogIllnessRoute = require('./CatalogIllnessRoute');
const illnessRoute = require('./IllnessRoute');
const messengerRoute = require('./MessengerRoutes');
const OwnerRoute = require('./OwnerRoute');
const PetRoute = require('./PetRoute');
const ScheduleRoute = require('./ScheduleRoute')
const ClinicRoute = require('./ClinicRoute');
const LiquidationRoute = require('./LiquidationRoute');
const StatisticalRoute = require('./StatisticalRoute');
const LocationRoute = require('./LocationRoute');
const DocumentRoute = require('./DocumentRoute')
const fs = require('fs');
const path = require('path');

const LiquidationModel = require('../app/models/LiquidationModel');
const DoctorModel = require ('../app/models/DoctorModel');
const OwnderModel = require ('../app/models/OwnerModel');

const auth = require('../app/middleware/auth');



function route(app) {

    app.use('/api/Account', accountsRoute);
    app.use('/api/Doctor', doctorsRoute);
    app.use('/news', newsRouter);
    app.use('/api/Appointment', appointmentRoute);
    app.use('/api/Authentication', authenticatrionRoute);
    app.use('/api/CatalogIllness', catalogIllnessRoute);
    // app.use('/api/Clinic',clinicRoute);
    app.use('/api/Illness', illnessRoute);
    app.use('/api/Messenger', messengerRoute);
    app.use('/api/Owner', OwnerRoute);
    app.use('/api/Pet', PetRoute);
    app.use('/api/Schedule', ScheduleRoute);
    app.use('/api/Clinic', ClinicRoute);
    app.use('/api/Liquidation', LiquidationRoute)
    app.use('/api/Statistical', StatisticalRoute)
    app.use('/api/location', LocationRoute)
    app.use('/api/Document',DocumentRoute)
    app.get('/api/test',(request,response)=>{
        try {

            console.log(request.body);
            const {username,password} = request.body
            .findOne({username:username,password:password})
            return response.json({
                success:true,
                data:{}
            })
        } catch (error) {
            return response.json({
                success:false,
                messages:'Loi server'
            })
        }
    })
    app.get('/api/search', async (req, res) => {
        var search = req.query.query;
        try {
            var findProduct = await LiquidationModel.aggregate([
                {
                    $match:{
                        $or: [{
                            titleProduct: {
                                $regex: search
                            }
                        }]
                    }
                },{
                    $addFields:{
                        type:'product'
                    }
                }
            ]).exec();
            var findDoctor = await DoctorModel.aggregate([
                {
                    $addFields:{
                        type:'doctor'
                    }
                },{
                    $match:{
                        $or: [{
                                lastName: {
                                    $regex: search
                                }
                            },
                            {
                                firstName: {
                                    $regex: search
                                }
                            }
                        ]
                    }
                }
            ]).exec();
            var findOwner = await OwnderModel.aggregate([
                {
                    $addFields:{
                        type:'owner'
                    }
                },
                {
                    $match:{
                        $or:[{
                            lastName:{
                                $regex:search
                            },
                        },{
                            firstName:{
                                $regex:search
                            }
                        }]
                    }
                }
            ]).exec();
            const value = [...findProduct, ...findDoctor,...findOwner];
            return res.json({
                success:true,
                value
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                messages: "Loi"
            })
        }

    })
    //Reading and Writing file 
    app.get('/list/account', async (request, response) => {
        // let array =Array(0);
        // let string ='';

        // for (let i=1;i<=387;i++){
        //     if(String(i).length===1)
        //         string='00'+String(i);
        //     else if (String(i).length===2)
        //         string='0'+String(i);
        //     else
        //         string =String(i);
        //     try {
        //         let rawdata = fs.readFileSync(path.resolve(__dirname, `test/${string}.json`));
        //         let student = JSON.parse(rawdata);
        //         array.push(student);
        //     } catch (error) {
        //     }
        // }
        // const jsonContent = JSON.stringify(array);

        // fs.writeFile("./alphabet.json", jsonContent, 'utf8', function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }

        //     console.log("The file was saved!");
        // }); 
        response.json({
            success: true,
            message: 'Connected successfully'
        });
    })
    // app.get('/Home', (req, res) => {
    //     res.render('Home');
    // })

    // app.get('/News', (req, res) => {
    //     res.render('News');
    // })
    // app.get('/Search', (request, response) => {
    //     response.render('Search');
    // });

    // app.post('/Search', (request, response) => {
    //     response.render('Search');
    // });
}

module.exports = route;

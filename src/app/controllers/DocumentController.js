const DocumentModel = require('../models/DocumentModel')
class DocumentController{
    async createOne(request,response){
        try {
            const {title,description,content} = request.body;
            if(!title || !description || !content){
                response.json({
                    success:false,
                    messages : 'title description content không được để trống'
                })
            }else{
                const newDocument =await new DocumentModel({
                    title,
                    description,
                    content
                }).save();
                response.json({
                    success:true,
                    messages:'Thêm thành công',
                    document:newDocument
                })
            }

        } catch (error) {
            response.json({
                success:false,
                messages : 'Lỗi server'
            })
        }
    }
    async find(request,response){
        try {
            const documents = await DocumentModel.find({});

            return  response.json({
                success:true,
                messages : '',
                documents
            })
        } catch (error) {
            return response.json({
                success:false,
                messages : 'Lỗi server'
            })
        }
    }
    async findById(request,response){
        try {
            const document = await DocumentModel.findById(request.params.id);

            return  response.json({
                success:true,
                messages : '',
                document
            })
        } catch (error) {
            return response.json({
                success:false,
                messages : 'Lỗi server'
            })
        }
    }
}

module.exports= new DocumentController;
const mongoose = require("mongoose")
const fs = require("fs")
const path = require('path')
const aws = require('aws-sdk')
const s3 = new aws.S3()

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String, 
    url: String,
    date: {
        type: Date,
        default: Date.now() 
    }
})

PostSchema.pre("save", function() {
    if(!this.url){
        this.url = `${process.env.URL}/files/${this.key}`
    }
})

PostSchema.pre('remove', function() {
    if(process.env.STOREGE_TYPE == 'local'){
        fs.unlink(path.resolve(__dirname, '..', '..', 'temp', 'uploads',this.key), (err) => {
            if(err){
                console.log(err)
            }
        })
    }
    else{
        return s3.deleteObject({
            Bucket: "oploadimagens",
            Key: this.key
        }).promise()
    }
    
})
module.exports = mongoose.model("Posts",PostSchema)
const multer = require("multer")
const path = require('path')
const aws = require('aws-sdk')
const multerS3 = require("multer-s3")
const crypto = require("crypto")

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'temp','uploads'))
        },
        filename: (req, file, callback)=>{
            crypto.randomBytes(16, (error, hash) => {
                if(error){
                    callback(error)
                }
                file.key = hash.toString('hex') + '-' + file.originalname
                callback(null, file.key)
            })
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, callback)=>{
            crypto.randomBytes(16, (error, hash) => {
                if(error){
                    callback(error)
                }
                const fileName = hash.toString('hex') + '-' + file.originalname
                callback(null, fileName)
            })
        },
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp','uploads'),
    storage: storageTypes[process.env.STOREGE_TYPE],
    limits: {
        sizeFile: 2 * 1024 * 1024
    },  
    fileFilter: (req, file, cb) => {
        const allowedMimies = [
            "image/jpeg",
            "image/png",
            "image/pjpeg",
            "image/gif",
        ]

        if(allowedMimies.includes(file.mimetype)){
            cb(null, true)
        }
        else{
            cb(new Error("invaled type file"))

        }
    }
}
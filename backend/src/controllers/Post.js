const Posts = require("../models/Post")

module.exports = {
    async reload(req, res){
        const posts = await Posts.find()
        return res.status(200).json(posts)
    },
    async save(req, res){
        const { originalname: name, size, key, location: url = ""} = req.file
        const post = await Posts.create({
            name,
            key,
            size,
            url,
        })

        return res.status(201).json(post)
    },
    async delete(req, res){
        const post = await Posts.findById(req.params.id)
        
        post.remove()
        return res.status(201).json({'msg': "deletado com sucesso!"})
    },
}
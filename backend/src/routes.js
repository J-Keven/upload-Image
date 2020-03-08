const express = require("express")
const multer = require("multer")

const router = express.Router()

const multerConfig = require("./config/multer")
const postController = require("./controllers/Post")

router.get('/posts', postController.reload)
router.post("/posts", multer(multerConfig).single('file'), postController.save)
router.delete('/posts/:id', postController.delete)

module.exports = router;
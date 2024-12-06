const express = require('express')
const { addProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct, getProductByCategoryId} = require('../controller/productController')
const upload = require('../middleware/fileUpload')

const router = express.Router()

router.post('/addProduct', upload.single('product_image'), addProduct)
router.get('/getAllProducts', getAllProducts)
router.get('/getProductDetails/:id', getProductDetails)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/getProductByCategoryId/:id', getProductByCategoryId)


module.exports = router
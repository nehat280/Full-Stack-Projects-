import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {useParams,useNavigate} from 'react-router-dom'

import {fetchProductDetails} from '../store/actions/product-detail-actions';
import {updateProduct} from '../store/actions/product-actions'
import {productUpdateActions} from '../store/reducers/productReducers';
import Loader from '../components/Loader';
import Message from '../components/Message'; 
import FormContainer from '../components/FormContainer';

const EditProductScreen =()=>{
    const params = useParams();
    const productId = params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [rating, setRating]  = useState(0);

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.product_detail)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate
    

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('product_id',productId)

        for (let obj of formData) {
            console.log(obj);
          }
          
        setUploading(true)
        try{
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            }
            const response = await  axios.post('http://localhost:8000/api/products/upload/',formData,config)
        
            setImage(response.data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }

    useEffect(()=>{
            if (successUpdate){
                dispatch(productUpdateActions.PRODUCT_UPDATE_RESET());
                Navigate('/admin/productlist/')
            }else{
                if(!product.name || product._id !== Number(productId)){
                    dispatch(fetchProductDetails(productId))    
                }else{
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                    setRating(product.rating)
                    
                }
            }            
        },[productId,successUpdate, product,dispatch,Navigate])
    
    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
            rating
        }))
    }
    
    return (
        <div>
            <Link to="/admin/productlist">
                Go Back
            </Link>
            <FormContainer>
             <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader/>: error? <Message variant="danger">{error}</Message>:(
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId = "name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control                           
                                    type = "name"
                                    placeholder = "Enter Name"
                                    value = {name}
                                    onChange = {(e)=> setName(e.target.value)}
                                    >
                                    </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control                           
                                    type = "number"
                                    placeholder = "Enter Price"
                                    value = {price}
                                    onChange = {(e)=> setPrice(e.target.value)}
                                    >
                                    </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control                           
                                    type = "text"
                                    placeholder = "Upload Image"
                                    value = {image}
                                    onChange = {(e)=> setImage(e.target.value)}
                                    >
                                    </Form.Control>
                                    <Form.Control 
                                        type="file"
                                        // id="image-file"
                                        label="Choose File"
                                        // custom
                                        onChange = {uploadFileHandler}>

                                    </Form.Control>
                                    {uploading && <Loader/>}
                        </Form.Group>
                        <Form.Group controlId = "brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control                           
                                    type = "text"
                                    placeholder = "Enter Brand"
                                    value = {brand}
                                    onChange = {(e)=> setBrand(e.target.value)}
                                    >
                                    </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "countinstock">
                                <Form.Label>Count in Stock</Form.Label>
                                <Form.Control                           
                                    type = "number"
                                    placeholder = "Enter count in stock"
                                    value = {countInStock}
                                    onChange = {(e)=> setCountInStock(e.target.value)}
                                    >
                                    </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control                           
                                    type = "text"
                                    placeholder = "Enter Category"
                                    value = {category}
                                    onChange = {(e)=> setCategory(e.target.value)}
                                    >
                                    </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "description">
                                <Form.Label>description</Form.Label>
                                <Form.Control                           
                                    type = "text"
                                    placeholder = "Enter description"
                                    value = {description}
                                    onChange = {(e)=> setDescription(e.target.value)}
                                    >
                                    </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "rating">
                                <Form.Label>rating</Form.Label>
                                <Form.Control                           
                                    type = "number"
                                    placeholder = "Enter rating"
                                    value = {rating}
                                    onChange = {(e)=> setRating(e.target.value)}
                                    >
                                    </Form.Control>
                        </Form.Group>
                        

                    <Button type="submit" variant="primary">Update</Button>
                </Form>
    
                )}
                
        </FormContainer>
        </div>
        
    )
}

export default EditProductScreen;

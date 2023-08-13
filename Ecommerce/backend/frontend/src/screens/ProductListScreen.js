import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button,Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'

import Loader from '../components/Loader';
import Message from '../components/Message'; 
import Paginate from '../components/Paginate'; 
import {fetchProductData,deleteProduct,createProduct} from '../store/actions/product-actions';
import {productCreateActions} from '../store/reducers/productReducers';

const ProductListScreen =() =>{
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const location = useLocation();
    const listProducts = useSelector(state => state.products)
    const {loading, error, products, pages,page}= listProducts

    const deleteProducts = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete}= deleteProducts

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct}= productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin



    let keyword = location.search

    useEffect(()=>{
            dispatch(productCreateActions.PRODUCT_CREATE_RESET())
            if (!userInfo.isAdmin){
                Navigate('/login')
            }
            if(successCreate){
                Navigate(`/admin/productlist/`)
            }else{
                dispatch(fetchProductData(keyword));
            }

    },[dispatch,Navigate,userInfo,successDelete,successCreate,createdProduct,keyword])

    const deleteHandler=(id)=>{
        if (window.confirm('Are you sure you want to delete this product?')){
            // delete product
            dispatch(deleteProduct(id))
        }
        
    }

    const createProductHandler=()=>{
        //create product
        dispatch(createProduct());
    }

    return(
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete ? <Loader/>
                : errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate ? <Loader/>
                : errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading
                ?<Loader/>
                :error
                ?<Message variant="danger">{error}</Message>
            :(
                <div>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>

                                    </LinkContainer>
                                    
                                        <Button variant="danger" className="btn-sm" onClick={()=>{deleteHandler(product._id)}}>
                                            <i className="fas fa-trash"></i>
                                        </Button>

                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}/>
                </div>
            )}
        </div>
    )
}

export default ProductListScreen;
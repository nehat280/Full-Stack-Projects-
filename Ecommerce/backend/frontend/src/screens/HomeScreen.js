import React, {useEffect} from 'react'
import {Row,Col} from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {fetchProductData} from '../store/actions/product-actions';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productsList = useSelector(state => state.products);
  const {error, loading, products,page, pages} = productsList;
  
  let keyword = location.search
  useEffect(() =>{
   dispatch(fetchProductData(keyword));
  },[dispatch,keyword])

  return (
    <div>
      {!keyword && <ProductCarousel/> }
      
      <h1>Latest Products</h1>
      { loading?<h2><Loader/></h2>
            :error ? <Message variant='danger'>{error}</Message>
            : <Row>
              <div>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}></Product>
                    </Col>
                ))}
              
                <Paginate page={page} pages={pages} keyword={keyword}/>
              </div>
            </Row>}
      
    </div>
  )
}

export default HomeScreen

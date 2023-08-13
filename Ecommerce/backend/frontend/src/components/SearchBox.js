import React,{useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useNavigate,useLocation} from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const Navigate = useNavigate();
    const location = useLocation();
    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword){
            Navigate(`/?keyword=${keyword}&page=1`)
        }else{
            Navigate(location.pathname)
        }
    }

  return (
    <Form onSubmit={submitHandler}>
        <Form.Control
            type="text"
            name="q"
            onChange={(e)=>{setKeyword(e.target.value)}}
            className='mr-sm-2 ml-sm-5'
        >

        </Form.Control>

        <Button
            type = "submit"
            variant= "outline-success"
            className='p-2'
        >
            Submit
        </Button>
    </Form>
  )
}

export default SearchBox

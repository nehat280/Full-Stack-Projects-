import React from 'react'
import {Pagination,} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const Paginate = ({page, pages, keyword='',isAdmin=false}) => {
    const Navigate = useNavigate()

    if (keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    const onPageNumberClick=(pageClicked)=>{
        if (isAdmin){
            Navigate(`/admin/productlist/?keyword=${keyword}&page=${pageClicked}`)
        }else{
            Navigate(`/?keyword=${keyword}&page=${pageClicked}`)
        }
    }
    
  return (
    (pages > 1) && (
            <Pagination>
                {[...Array(pages).keys()].map((x)=>(
                    <Pagination.Item 
                        key={x+1} 
                        active={(x+1) === page}
                        onClick={()=>onPageNumberClick(x+1)}
                    >
                        {x+1}
                    </Pagination.Item>
                ))}
            </Pagination>
    )
  )
}

export default Paginate

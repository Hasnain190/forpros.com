import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './SearchBar.css'


function SearchBox() {
    const [keyword, setKeyword] = useState('')
    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            history.push(`/?keyword=${keyword}`)
        } else {
            history.push(history.push(history.location.pathname))
        }


    }
    return (
        <>

            {/* <Form className='mr-sm-2 ml-sm-5 rounded input-large' >
                <div class="container " onSubmit={submitHandler} >
                    <div class="row">
                        <div class="col-xs-8 col-xs-offset-2">
                            <div class="input-group rounded">

                                <input type="text" class="form-control rounded   " onChange={(e) => setKeyword(e.target.value)} name="keyword" id="search" placeholder="Search" />
                                <span class="input-group-btn">
                                    <Button
                                        type='submit'
                                        variant='outline-success'
                                        className='p-2 rounded '
                                    >
                                        <i class="fas fa-search"></i>
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </Form> */}


            <form class="d-flex search-form" onSubmit={submitHandler}>
                <input class="form-control me-2 rounded-pill"  onChange={(e) => setKeyword(e.target.value)} name="keyword" type="search" placeholder="Search"
                    aria-label="Search" />
               <span class="input-group-btn">
                                    <Button
                                        type='submit'
                                        variant='outline-success'
                                        className='p-2 rounded-pill '
                                    >
                                        <i class="fas fa-search"></i>
                                    </Button>
                                </span>
            </form>


        </>



    )
}

export default SearchBox

import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
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


            <form className="d-flex search-form" onSubmit={submitHandler}>
                <input className="form-control me-2 rounded-pill" onChange={(e) => setKeyword(e.target.value)} name="keyword" type="search" placeholder="Search"
                    aria-label="Search" />
                <span className="input-group-btn">
                    <Button
                        type='submit'
                        variant='outline-success'
                        className='p-2 rounded-pill '
                    >
                        <i className="fas fa-search"></i>
                    </Button>
                </span>
            </form>


        </>



    )
}

export default SearchBox

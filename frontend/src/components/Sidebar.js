import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { categoryProducts } from '../actions/categoryActions'

import { Link } from 'react-router-dom';


function Sidebar({ sidebar }) {



    const dispatch = useDispatch()

    const productCategory = useSelector(state => state.productCategory)
    const { error, loading, products } = productCategory


    let history = useHistory()



    useEffect(() => {
        dispatch(categoryProducts())


    }, [dispatch])


    return (
        <>


            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={() => !sidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            Categories
                        </Link>
                    </li>
                    {products?.map(product => {
                        return (
                            <li key={product.id} className='nav-text'>
                                <Link to={`/category/${product.id}`}>

                                    <span> {product.product_category}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

        </>
    )
}

export default Sidebar

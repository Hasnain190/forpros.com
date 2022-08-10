import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Container, } from 'react-bootstrap'

import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import './CategoryList.css'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap"
const useClickOutside = (handler) => {
    const domNode = useRef()

    useEffect(() => {
        const mayBeHandler = (e) => {
            if (domNode.current && !domNode.current.contains(e.target)) {
                handler()
            }
        }

        document.addEventListener('mousedown', mayBeHandler)

        return () => {
            document.removeEventListener('mousedown', mayBeHandler)

        }



    })
    return domNode
}

function Header() {
    const dispatch = useDispatch()


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    const [sidebar, setSidebar] = useState(0);

    const showSidebar = () => setSidebar(!sidebar);

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const noOfCartItems = cartItems.length


    // const fav = useSelector(state => state.whishlist)
    // const { whishlistItems } = fav
    // const noOfFavItems = whishlistItems.length


    // const domNode = useRef()

    const domNode = useClickOutside(() => {
        setSidebar(false)
    })
    // const domNodeH = useClickOutside(() => {
    //     setSidebar(false)
    // })

    return (
        <header>
            <div ref={domNode}>
                <Sidebar sidebar={sidebar} />
            </div>

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect id='navbar-container' >

                <Link to='/'>
                    <Navbar.Brand >
                        Usama Computers

                    </Navbar.Brand>
                </Link>
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <SearchBox />
                        <Nav className=" ms-auto">

                            <Link to='/cart' className="px-4"  >
                                <span className='sup '>{noOfCartItems}</span><i className="fas fa-shopping-cart"></i>
                            </Link>
                            <Link to='/wishlist' className="px-4"  >
                                <span className='sup '></span><i className="fas fa-heart"></i>
                            </Link>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item href='/#/profile'>
                                        Profile



                                    </NavDropdown.Item>


                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <NavDropdown.Item href='/#/login' className="px-4" >
                                    <i className="fas fa-user"></i>
                                </NavDropdown.Item>
                            )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue' className="px-4">

                                    <NavDropdown.Item href='/#/admin/userlist'>Users</NavDropdown.Item>


                                    <NavDropdown.Item href='/#/admin/productlist'>Products</NavDropdown.Item>



                                    <NavDropdown.Item href='/#/admin/orderlist'>Orders</NavDropdown.Item>



                                    <NavDropdown.Item href='/#/admin/categorylist'>Categories</NavDropdown.Item>


                                </NavDropdown>
                            )}
                            <Nav.Item  ><i className={sidebar ? "fas fa-times hamburger px-4" : "fas fa-bars hamburger px-4 display-hidden"} style={sidebar ? { display: 'none' } : { display: '' }} onClick={(e) => { showSidebar(e) }} /></Nav.Item>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header

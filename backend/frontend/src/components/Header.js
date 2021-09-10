import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Container, } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import './CategoryList.css'
import Sidebar from './Sidebar'

const useClickOutside = (handler) => {
    const domNode = useRef()

    useEffect(() => {
        const mayBeHandler = (e) => {
            if (domNode.current && !domNode.current.contains(e.target)) {
                handler()
            }
        }
// const div = domNode.current
        document.addEventListener('mousedown', mayBeHandler)

        return () => {
            document.removeEventListener('mousedown', mayBeHandler)
            console.log(domNode)
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
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const noOfItems = cartItems.length

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

                <LinkContainer to='/'>
                    <Navbar.Brand >
                        Usama
                        Computers

                    </Navbar.Brand>
                </LinkContainer>
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <SearchBox />
                        <Nav className= " ms-auto">

                            <LinkContainer to='/cart' className= "px-4"  >
                                <Nav.Link ><span className='sup '>{noOfItems}</span><i className="fas fa-shopping-cart"></i></Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/wishlist' className= "px-4"  >
                                <Nav.Link ><i className="fas fa-heart"></i></Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile' className= "px-4" >
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login' className= "px-4" >
                                    <Nav.Link><i className="fas fa-user"></i></Nav.Link>
                                </LinkContainer>
                            )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue' className= "px-4">
                                    <LinkContainer to='/admin/userlist'  >
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist' >
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist' >
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer >

                                    <LinkContainer to='/admin/categorylist'>
                                        <NavDropdown.Item>Categories</NavDropdown.Item>
                                    </LinkContainer >

                                </NavDropdown>
                            )}
                            <Nav.Item  ><i  className={sidebar ? "fas fa-times hamburger px-4" : "fas fa-bars hamburger px-4 display-hidden"} style = {sidebar ? {display :'none'}: {display:''}}onClick={showSidebar} /></Nav.Item>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

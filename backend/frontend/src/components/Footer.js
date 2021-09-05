import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <footer >
            <div className="container">
                <div className="sec about-us">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium ut iste laboriosam dolore deleniti sit, nobis assumenda aspernatur voluptates. Eum, veritatis? Exercitationem pariatur nisi quos aperiam a fugiat recusandae suscipit.</p>
                    <ul className='sci'>
                        <li><a href="https://www.facebook.com/itsUsamaAshfaq" target='_blank'><i class="fab fa-facebook-square" aria-hidden='true'></i></a></li>
                        <li><a href="https://www.instagram.com/usamaashfaq6364/" target='_blank' ><i class="fab fa-instagram" aria-hidden='true'></i></a></li>

                    </ul>

                </div>
                <div className="sec quick-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="/about-us">
                            
                                About
                            


                        </Link></li>
                        <li><Link to="faqs">
                            
                                FAQs
                            

                        </Link> </li>
                        <li><Link to="/privacy-policy">
                         

                                Privacy Policy
                         

                        </Link> </li>
                       
                        <li><Link to="/terms-and-conditions">
                            
                                Terms & Condition

                            
                        </Link> </li>
                        <li><Link to="/contact-us">
                            
                                Contact
                          
                        </Link> </li>
                    </ul>

                </div>
                <div className="sec contact">
                    <h2>Contact Info</h2>

                    <ul className="info">
                        <li>
                            <span><i class="fas fa-map-marker-alt"></i></span>
                            <span><a href="https://goo.gl/maps/9C5xdh5W1XVihmb48" target='_blank' rel="noreferrer"> D-XXX , Thermal Power Station <br />Muzzaffargarh 34200 <br />Pakistan</a></span>
                        </li>
                        <li>
                            <span><i class="fas fa-phone-alt"></i></span>
                            <p><a href="tel:923174373258">+92 317 4373258</a></p>
                        </li>
                        <li>
                            <span><i class="far fa-envelope"></i></span>
                            <p><a href="mailto:itsusamaashfaq@gmail.com">itsusamaashfaq@gmail.com</a></p>
                        </li>


                    </ul>

                </div>



            </div>










            <div className="copyright text-center py-3">
                copyright &copy; UsamaComputers All rights reserved

            </div>


        </footer>
    )
}

export default Footer

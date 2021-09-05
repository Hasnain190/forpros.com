import React from 'react'

function AboutUsScreen() {
    return (
        <div>

            {/* <!-- START THE INTRO SECTION  --> */}
            <section id="home" class="intro-section">
                <div class="container">
                    <div class="row align-items-center text-white">
                        {/* <!-- START THE CONTENT FOR THE INTRO  --> */}
                        <div class="col-md-6 intros text-start">
                            <h1 class="display-2">
                                <span class="display-2--intro">Hey!, I'm XXXX xxxxx</span>
                                <span class="display-2--description lh-base">the founder of (this website) . In which you can nuy Lorem ipsum dolor sit amet.</span>
                            </h1>

                            <button type="button" class="rounded-pill btn-rounded">
                                Get in Touch

                                <span><i class="fas fa-arrow-right"></i></span>
                            </button>
                        </div>
                        {/* <!-- START THE CONTENT FOR THE VIDEO      --> */}

                        <div class="col-md-6 intros text-end">
                            <div class="video-box">
                                <img src="./assets/New folder/Coding _Monochromatic.png" alt="Video illustration"
                                    class="img-fluid" />
                                <span class="shadow">
                                    <a href="#" class="glightbox">
                                        <i class="fas fa-play-circle"></i>
                                        <span class="border-animation border-animation--border-1"></span>

                                        <span class="border-animation border-animation--border-2"></span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffff" fill-opacity="1"
                        d="M0,192L40,176C80,160,160,128,240,96C320,64,400,32,480,26.7C560,21,640,43,720,90.7C800,139,880,213,960,208C1040,203,1120,117,1200,112C1280,107,1360,181,1400,218.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
                    </path>
                </svg>
            </section>
            {/* <!-- SERVICES SECTION --> */}
            <section id="services" class="services">
                <div class="container">
                    <div class="row">
                        <h1 class="display-3 fw-bold text-center">Our Services</h1>
                        <div class="heading-line mb-1"></div>
                    </div>

                    <div class="row pt-2 pb-2 mt-0 mb-3">
                        <div class="col-md-6 border-right">
                            <div class="bg-white p-3">
                                <h2 class="fw-bold text-center text-capitalize">Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Perferendis, aspernatur.</h2>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="bg-white p-4">
                                <p class="fw-light text-start">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis corporis nostrum dolorum,
                                    vero facilis, consectetur incidunt, officiis culpa consequuntur ab ipsam quod dignissimos
                                    vitae
                                    ipsum at dolor accusantium odio consequatur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    {/* <!-- SERVICE-1 --> */}
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xsm-12 services mt-4">
                            <div class="services__content">
                                <div class="icon d-block fas fa-paper-plane"></div>
                                <h3 class="display-3--title mt-1">Front-end Web-development</h3>
                                <p class="lh-lg">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, perspiciatis harum
                                    iste nemo architecto, libero aperiam, corporis eos similique laudantium placeat corrupti
                                    velit?
                                    Consequuntur, quae!
                                </p>
                                <button type="button" class="rounded-pill btn-rounded border-primary">
                                    Get in Touch

                                    <span><i class="fas fa-arrow-right"></i></span>
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xsm-12 services mt-4 text-end">
                            <div class="services__pic">
                                <img src="/images/services/Coding _Outline.png" alt="service-1" class="img-fluid" />
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        {/* <!-- SERVICE-2 --> */}
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xsm-12 services mt-4 text-end">

                            <div class="services__pic">
                                <img src="/images/services/HTML_Two Color.png" alt="service-2" class="img-fluid" />
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xsm-12 services mt-4">
                            <div class="services__content">
                                <div class="icon d-block fas fa-paper-plane"></div>
                                <h3 class="display-3--title mt-1">Full-Stack Web-development</h3>
                                <p class="lh-lg">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, perspiciatis harum
                                    iste nemo architecto, libero aperiam, corporis eos similique laudantium placeat corrupti
                                    velit?
                                    Consequuntur, quae!
                                </p>
                                <button type="button" class="rounded-pill btn-rounded border-primary">
                                    Get in Touch

                                    <span><i class="fas fa-arrow-right"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        {/* <!-- SERVICE-3 --> */}
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xsm-12 services mt-4">
                            <div class="services__content">
                                <div class="icon d-block fas fa-paper-plane"></div>
                                <h3 class="display-3--title mt-1">E-commerce web apps</h3>
                                <p class="lh-lg">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, perspiciatis harum
                                    iste nemo architecto, libero aperiam, corporis eos similique laudantium placeat corrupti
                                    velit?
                                    Consequuntur, quae!
                                </p>
                                <button type="button" class="rounded-pill btn-rounded border-primary">
                                    Get in Touch

                                    <span><i class="fas fa-arrow-right"></i></span>
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xsm-12 services mt-4 text-end">
                            <div class="services__pic">
                                <img src="/images/services/Web Developer_Isometric.png" alt="service-3" class="img-fluid" />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- START TESTIMONIAL SECTION --> */}
            <section id="testimonials" class="testimonials">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffff" fill-opacity="1"
                        d="M0,96L40,122.7C80,149,160,203,240,229.3C320,256,400,256,480,224C560,192,640,128,720,96C800,64,880,64,960,69.3C1040,75,1120,85,1200,85.3C1280,85,1360,75,1400,69.3L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
                    </path>
                </svg>
                <div class="container">
                    <div class="row text-center text-white">
                        <h3 class="display-3 fw-bold">Testimonials</h3>
                        <hr style={{'height': '3px', 'width':'100%'}} />
                        <div class="lead pt-3">
                            what our clients say?
                        </div>
                    </div>

                    {/* <!-- CAROUSEL CONTENT --> */}
                    <div class="row align-items-center">
                        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">

                            <div class="carousel-inner">

                                {/* <!-- CAROUSEL-1   --> */}
                                <div class="carousel-item active">
                                    {/* <!-- testimonials card --> */}
                                    <div class="testimonials__card">
                                        <div class="lh-lg">

                                            <i class="fas fa-quote-left"></i>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque nesciunt
                                            repudiandae velit
                                            dicta doloremque esse omnis dignissimos, nostrum fugit ullam magni!
                                            <i class="fas fa-quote-right"></i>
                                        </div>
                                    </div>
                                    {/* <!-- client name & role --> */}
                                    <div class="testimonials__name">
                                        <h3>Discoed</h3>

                                    </div>

                                </div>

                                {/* <!-- CAROUSEL-2   --> */}
                                <div class="carousel-item ">
                                    {/* <!-- testimonials card --> */}
                                    <div class="testimonials__card">
                                        <div class="lh-lg">

                                            <i class="fas fa-quote-left"></i>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque nesciunt
                                            repudiandae velit
                                            dicta doloremque esse omnis dignissimos, nostrum fugit ullam magni!
                                            <i class="fas fa-quote-right"></i>
                                        </div>
                                    </div>
                                    {/* <!-- client name & role --> */}
                                    <div class="testimonials__name">
                                        <h3>Newton</h3>

                                    </div>

                                </div>

                                {/* <!-- CAROUSEL-3  --> */}
                                <div class="carousel-item ">
                                    {/* <!-- testimonials card --> */}
                                    <div class="testimonials__card">
                                        <div class="lh-lg">

                                            <i class="fas fa-quote-left"></i>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque nesciunt
                                            repudiandae velit
                                            dicta doloremque esse omnis dignissimos, nostrum fugit ullam magni!
                                            <i class="fas fa-quote-right"></i>
                                        </div>
                                    </div>
                                    {/* <!-- client name & role --> */}
                                    <div class="testimonials__name">
                                        <h3>Einstien</h3>

                                    </div>

                                </div>

                            </div>
                            <div class="text-center">
                                <button class="btn btn-outline-light fas fa-long-arrow-alt-left" type="button"
                                    data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">

                                </button>
                                <button class="btn btn-outline-light fas fa-long-arrow-alt-right" type="button"
                                    data-bs-target="#carouselExampleCaptions" data-bs-slide="next">

                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffff" fill-opacity="1"
                        d="M0,96L40,122.7C80,149,160,203,240,229.3C320,256,400,256,480,224C560,192,640,128,720,96C800,64,880,64,960,69.3C1040,75,1120,85,1200,85.3C1280,85,1360,75,1400,69.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
                    </path>
                </svg>
            </section>


            {/* <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////
                START SECTION 8 - GET STARTED  
                /////////////////////////////////////////////////////////////////////////////////////////////////////////--> */}
            <section id="contact" class="get-started">
                <div class="container">
                    <div class="row text-center">
                        <h1 class="display-3 fw-bold text-capitalize">Get started</h1>
                        <div class="heading-line"></div>
                        <p class="lh-lg">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero illum architecto modi.
                        </p>
                    </div>

                    {/*  START THE CTA CONTENT */}
                    <div class="row text-white">
                        <div class="col-12 col-lg-6 gradient shadow p-3">
                            <div class="cta-info w-100">
                                <h4 class="display-4 fw-bold">100% Satisfaction Guaranteed</h4>
                                <p class="lh-lg">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam alias optio minima, tempore architecto
                                    sint ipsam dolore tempora facere laboriosam corrupti!
                                </p>
                                <h3 class="display-3--brief">What will be the next step?</h3>
                                <ul class="cta-info__list">
                                    <li>We'll prepare the proposal.</li>
                                    <li>we'll discuss it together.</li>
                                    <li>let's start the discussion.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 bg-white shadow p-3">
                            <div class="form w-100 pb-2">
                                <h4 class="display-3--title mb-5">start your project</h4>
                                <form action="#" class="row">
                                    <div class="col-lg-6 col-md mb-3">
                                        <input type="text" placeholder="First Name" id="inputFirstName"
                                            class="shadow form-control form-control-lg" />
                                    </div>
                                    <div class="col-lg-6 col-md mb-3">
                                        <input type="text" placeholder="Last Name" id="inputLastName"
                                            class="shadow form-control form-control-lg" />
                                    </div>
                                    <div class="col-lg-12 mb-3">
                                        <input type="email" placeholder="email address" id="inputEmail"
                                            class="shadow form-control form-control-lg" />
                                    </div>
                                    <div class="col-lg-12 mb-3">
                                        <textarea name="message" placeholder="message" id="message" rows="8"
                                            class="shadow form-control form-control-lg"></textarea>
                                    </div>
                                    <div class="text-center d-grid mt-1">
                                        <button type="button" class="btn btn-primary rounded-pill pt-3 pb-3">
                                            submit
                                            <i class="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
                  
                    )
}

export default AboutUsScreen

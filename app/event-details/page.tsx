import React from 'react';
import Link from 'next/link';
import InnerBanner from '../components/InnerBanner';

export default function EventDetails() {
    return (
        <>
            <InnerBanner title="EVENT" subtitle="SINGLE" bgImage="/assets/images/bg/bg-12.png" activePage="Event Single" />
            <section className="event-section event-section-two event-details-section ptb-120">
                <div className="container">
                    <div className="row justify-content-center mb-60">
                        <div className="col-xl-12">
                            <div className="event-item">
                                <div className="event-thumb">
                                    <img src="/assets/images/event/event-big.png" alt="event" />
                                </div>
                                <div className="event-content">
                                    <div className="event-widget-box-area">
                                        <div className="row mb-30-none">
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                                <div className="event-widget-box-item">
                                                    <div className="event-widget-box-icon">
                                                        <img src="/assets/images/icon/icon-53.png" alt="icon" />
                                                    </div>
                                                    <div className="event-widget-box-content">
                                                        <h4 className="title">Event Date</h4>
                                                        <span>21 february</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                                <div className="event-widget-box-item">
                                                    <div className="event-widget-box-icon">
                                                        <img src="/assets/images/icon/icon-54.png" alt="icon" />
                                                    </div>
                                                    <div className="event-widget-box-content">
                                                        <h4 className="title">Event Time</h4>
                                                        <span>10:00am</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                                <div className="event-widget-box-item">
                                                    <div className="event-widget-box-icon">
                                                        <img src="/assets/images/icon/icon-55.png" alt="icon" />
                                                    </div>
                                                    <div className="event-widget-box-content">
                                                        <h4 className="title">Event Location</h4>
                                                        <span>684 Ann St. FL 34608</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-30-none">
                        <div className="col-xl-8 col-lg-8 mb-30">
                            <div className="event-widget-area">
                                <div className="event-widget-content-area">
                                    <h3 className="widget-title">About this event</h3>
                                    <p>Learn to box for real with Fit Mindful Body Club trainer and 3x Golden Glove winner, Ian Mauleon! Proven to relieve stress, you'll sweat while learning real life Wushu techniques and challenging your body to new and moves. This live virtual group class will have you sweating with shadow Wushu and low impact body weight exercises. Sign up via Eventbrite link and we will send you the Zoom details.</p>
                                    <blockquote>
                                        <div className="quote-area d-flex flex-wrap">
                                            <div className="quote-icon">
                                                <i className="fas fa-quote-left"></i>
                                            </div>
                                            <div className="quote-icon--style">
                                                <i className="fas fa-quote-left"></i>
                                            </div>
                                            <div className="quote-content-area">
                                                <p className="quote-content">Producing Ideas Is The Main Way To Grow The Economy Life Insurance for Stay-at-Home Parents</p>
                                                <span>jhon smith</span>
                                            </div>
                                        </div>
                                    </blockquote>
                                    <p>By participating in this SITC Virtual Workout session, you and any other person(s) participating in this workout together with you, acknowledge that physical exercise can be strenuous and subject to the risk of serious injury. We urge you to obtain a physical examination from a doctor before using any exercise equipment or participating in any exercise activity. You agree that by participating in physical exercise or training activities, you are doing it at your own risk and agree that you are voluntarily participating in these activities</p>
                                </div>
                                <div className="event-map-area">
                                    <div className="map-area">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.1899657893728!2d90.42380431666383!3d23.779746865573756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7499f257eab%3A0xe6b4b9eacea70f4a!2sManama+Tower!5e0!3m2!1sen!2sbd!4v1561542597668!5m2!1sen!2sbd" style={{ border: 0 }} allowFullScreen></iframe>
                                    </div>
                                </div>
                                <div className="event-widget-content-area">
                                    <h3 className="widget-title">Event benefits</h3>
                                    <div className="about-item-area about-item-area-two">
                                        <div className="row justify-content-center mb-30-none">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-30">
                                                <div className="about-item">
                                                    <div className="about-icon">
                                                        <img src="/assets/images/icon/icon-48.png" alt="icon" />
                                                    </div>
                                                    <div className="about-content">
                                                        <h4 className="title">PHYSICAL ATTRACTIVENESS</h4>
                                                        <p>We teach martial arts because we want to Unlike other martial arts Federations.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-30">
                                                <div className="about-item">
                                                    <div className="about-icon">
                                                        <img src="/assets/images/icon/icon-49.png" alt="icon" />
                                                    </div>
                                                    <div className="about-content">
                                                        <h4 className="title">SPORTS PERFORMANCE</h4>
                                                        <p>We teach martial arts because we want to Unlike other martial arts Federations.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-30">
                                                <div className="about-item">
                                                    <div className="about-icon">
                                                        <img src="/assets/images/icon/icon-50.png" alt="icon" />
                                                    </div>
                                                    <div className="about-content">
                                                        <h4 className="title">GENERAL PHYSICAL HEALTH</h4>
                                                        <p>We teach martial arts because we want to Unlike other martial arts Federations.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-30">
                                                <div className="about-item">
                                                    <div className="about-icon">
                                                        <img src="/assets/images/icon/icon-51.png" alt="icon" />
                                                    </div>
                                                    <div className="about-content">
                                                        <h4 className="title">PLEASURE OF THE ACTIVITY</h4>
                                                        <p>We teach martial arts because we want to Unlike other martial arts Federations.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Learn to box for real with Fit Mindful Body Club trainer and 3x Golden Glove winner, Ian Mauleon! Proven to relieve stress, you'll sweat while learning real life Wushu techniques and challenging your body to new and moves. This live virtual group class will have you sweating with shadow Wushu and low impact body weight exercises. Sign up via Eventbrite link and we will send you the Zoom details.</p>
                                </div>
                                <div className="event-social-area">
                                    <ul className="event-social">
                                        <li><a href="#0"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#0"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#0"><i className="fab fa-google-plus-g"></i></a></li>
                                        <li><a href="#0"><i className="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                                <div className="blog-reply-area">
                                    <h3 className="title">3 Replies To “How Water Useful For Our Body & Life”</h3>
                                    <div className="blog-reply-item-area">
                                        <div className="blog-reply-item">
                                            <div className="blog-reply-thumb">
                                                <img src="/assets/images/blog/blog-comment.png" alt="blog" />
                                            </div>
                                            <div className="blog-reply-content">
                                                <div className="blog-reply-content-header">
                                                    <h4 className="title">James Hayden</h4>
                                                    <span className="date">January 30, 2024</span>
                                                </div>
                                                <div className="blog-reply-content-body">
                                                    <p>Droin ac quam et lectus vestibulum blandit. Nunc maximus nibh at placerat tincidunt. Nam sem lacus, ornare non ante sed, ultricies</p>
                                                    <div className="blog-reply-btn">
                                                        <a href="#0" className="reply-btn">Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-reply-item">
                                            <div className="blog-reply-thumb">
                                                <img src="/assets/images/blog/blog-comment.jpg" alt="blog" />
                                            </div>
                                            <div className="blog-reply-content">
                                                <div className="blog-reply-content-header">
                                                    <h4 className="title">Adam Jobs</h4>
                                                    <span className="date">January 30, 2024</span>
                                                </div>
                                                <div className="blog-reply-content-body">
                                                    <p>Droin ac quam et lectus vestibulum blandit. Nunc maximus nibh at placerat tincidunt. Nam sem lacus, ornare non ante sed, ultricies</p>
                                                    <div className="blog-reply-btn">
                                                        <a href="#0" className="reply-btn">Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-reply-item">
                                            <div className="blog-reply-thumb">
                                                <img src="/assets/images/blog/blog-comment-2.jpg" alt="blog" />
                                            </div>
                                            <div className="blog-reply-content">
                                                <div className="blog-reply-content-header">
                                                    <h4 className="title">Mathew Bell</h4>
                                                    <span className="date">January 30, 2024</span>
                                                </div>
                                                <div className="blog-reply-content-body">
                                                    <p>Droin ac quam et lectus vestibulum blandit. Nunc maximus nibh at placerat tincidunt. Nam sem lacus, ornare non ante sed, ultricies</p>
                                                    <div className="blog-reply-btn">
                                                        <a href="#0" className="reply-btn">Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-comment-area">
                                    <h3 className="title">LEAVE A COMMENTS</h3>
                                    <form className="comment-form">
                                        <div className="row justify-content-center mb-30-none">
                                            <div className="col-xl-6 col-lg-6 form-group">
                                                <input type="text" name="name" className="form--control" placeholder="Your name*" />
                                            </div>
                                            <div className="col-xl-6 col-lg-6 form-group">
                                                <input type="email" name="email" className="form--control" placeholder="Your email*" />
                                            </div>
                                            <div className="col-lg-12 form-group">
                                                <textarea className="form--control" placeholder="Write message*"></textarea>
                                            </div>
                                            <div className="col-lg-12 form-group">
                                                <button type="submit" className="btn--base mt-10">Submit Now <i className="fas fa-arrow-right ml-2"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 mb-30">
                            <div className="sidebar">
                                <div className="widget-box section--bg mb-30">
                                    <h4 className="widget-title text-white">Join the event</h4>
                                    <div className="event-form-area">
                                        <form className="event-form mb-20-none">
                                            <div className="form-group">
                                                <input type="text" className="form--control" name="name" placeholder="Your Name*" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form--control" name="email" placeholder="Your Email*" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form--control" name="phone" placeholder="Your Phone*" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form--control" name="phone" placeholder="Post Code*" required />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn--base">Send Now <i className="fas fa-arrow-right ml-2"></i></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="widget-box mb-30">
                                    <h4 className="widget-title">Event Trainer</h4>
                                    <div className="profile-item">
                                        <div className="profile-thumb">
                                            <img src="/assets/images/trainer/profile.png" alt="profile" />
                                        </div>
                                        <div className="profile-content">
                                            <h4 className="title">Randall Schwartz</h4>
                                            <p>Suspendisse vel nisl sed viverra tindunt. Vivamus et lobortis felis...</p>
                                            <div className="profile-btn">
                                                <Link href="/master-details" className="btn--base">View Profile <i className="fas fa-arrow-right ml-2"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-box">
                                    <h4 className="widget-title">Recent Events</h4>
                                    <div className="popular-widget-box">
                                        <div className="single-popular-item d-flex flex-wrap align-items-center">
                                            <div className="popular-item-thumb">
                                                <img src="/assets/images/blog/small-blog-1.png" alt="blog" />
                                            </div>
                                            <div className="popular-item-content">
                                                <span className="blog-date">Aug 23,2021</span>
                                                <h5 className="title"><Link href="/event-details">What Is Going On In South West London.</Link></h5>
                                            </div>
                                        </div>
                                        <div className="single-popular-item d-flex flex-wrap align-items-center">
                                            <div className="popular-item-thumb">
                                                <img src="/assets/images/blog/small-blog-2.png" alt="blog" />
                                            </div>
                                            <div className="popular-item-content">
                                                <span className="blog-date">Aug 23,2021</span>
                                                <h5 className="title"><Link href="/event-details">What Is Going On In South West London.</Link></h5>
                                            </div>
                                        </div>
                                        <div className="single-popular-item d-flex flex-wrap align-items-center">
                                            <div className="popular-item-thumb">
                                                <img src="/assets/images/blog/small-blog-3.png" alt="blog" />
                                            </div>
                                            <div className="popular-item-content">
                                                <span className="blog-date">Aug 23,2021</span>
                                                <h5 className="title"><Link href="/event-details">What Is Going On In South West London.</Link></h5>
                                            </div>
                                        </div>
                                        <div className="single-popular-item d-flex flex-wrap align-items-center">
                                            <div className="popular-item-thumb">
                                                <img src="/assets/images/blog/small-blog-4.png" alt="blog" />
                                            </div>
                                            <div className="popular-item-content">
                                                <span className="blog-date">Aug 23,2021</span>
                                                <h5 className="title"><Link href="/event-details">What Is Going On In South West London.</Link></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

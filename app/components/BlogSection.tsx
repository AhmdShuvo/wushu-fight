"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogSection() {
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(data => {
                if (data.news) {
                    setBlogs(data.news);
                }
            });
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section id="blog" className="blog-section ptb-120">
            <div className="blog-element-one" data-aos="fade-right" data-aos-duration="1200">
                <img src="/assets/images/element/element-4.png" alt="element" />
            </div>
            <div className="blog-element-two" data-aos="fade-left" data-aos-duration="1200">
                <img src="/assets/images/element/element-5.png" alt="element" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 text-center">
                        <div className="section-header" data-aos="fade-up" data-aos-duration="1200">
                            <h2 className="section-title">LATEST <span>NEWS</span> FROM Wushu</h2>
                            <p>Stay updated with the latest insights, training tips, and news from our dojo.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-30-none">
                    {blogs.map((blog, index) => (
                        // console.log(blog),
                        <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                            <div className="blog-item" data-aos="zoom-in" data-aos-duration="1200">
                                <div className="blog-thumb">
                                    <img src={`/assets/images/blog/${blog.img}`} alt="blog" />
                                    <div className="blog-date">
                                        <span>{blog.date}</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <div className="blog-post-meta">
                                        <span className="user">By : {blog.author}</span>
                                        <span className="category"><Link href="/blog">{blog.category}</Link></span>
                                    </div>
                                    <h3 className="title"> <Link href={`/blog-details/${blog.slug || blog._id}`}>{blog.title}</Link></h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

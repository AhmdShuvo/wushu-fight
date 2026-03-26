"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubMenus, setActiveSubMenus] = useState<Record<string, boolean>>({});
    const [isSticky, setIsSticky] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [ticker, setTicker] = useState({
        updatesText: 'Updates: Important Notices from BWUF, SAWUF, WFA & IWUF!',
        resourcesText: 'Explore our Resources section for the latest Training Documents and Videos'
    });
    const pathname = usePathname();


    const [dynamicPages, setDynamicPages] = useState<any[]>([]);
    
    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        
        fetch('/api/ticker')
            .then(res => res.json())
            .then(data => {
                if (data.ticker) {
                    setTicker({
                        updatesText: data.ticker.updatesText,
                        resourcesText: data.ticker.resourcesText
                    });
                }
            });

        // Fetch dynamic informational pages
        fetch('/api/pages')
            .then(res => res.json())
            .then(data => {
                if (data.pages) setDynamicPages(data.pages);
            });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const toggleSubMenu = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setActiveSubMenus((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isActive = (path: string) => pathname === path ? 'active' : '';

    const getHeaderClass = () => {
        let className = "header-section header-section-two";
        if (pathname === '/contact') {
            className += " header-section-three";
        }
        if (isSticky) {
            className += " animated fadeInDown header-fixed";
        }
        return className;
    };

    // Inline styles to match theme without writing external css 
    // Uses standard css for dropdowns mostly
    const navItemStyle = { position: 'relative' as 'relative' };
    const getDropdownClass = (id: string, isMulti: boolean = false) => {
        let baseClass = isMulti ? 'sub-menu dropdown-menu-multicol-responsive' : 'sub-menu dropdown-menu-responsive';
        if (activeSubMenus[id]) {
            baseClass += ' show';
        }
        return baseClass;
    };

    const dropItemStyle = {
        padding: '10px 25px',
        color: '#444',
        display: 'block',
        fontSize: '15px',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        borderLeft: '3px solid transparent'
    };



    return (
        <header className={getHeaderClass()} style={{ zIndex: 9999, width: '100%', ...(isSticky ? {} : { position: 'relative', backgroundColor: '#080808' }) }}>
            <div className="header">
                <div className="header-bottom-area">
                    <div className="container-fluid">
                        <div className="header-menu-content">
                            <nav className="navbar navbar-expand-xl p-0">
                                <Link className="site-logo site-title d-block d-xl-none" href="/">
                                    <img src="/assets/images/wushu_logo.png" alt="site-logo" height={40} width={50} />
                                </Link>
                                <button className="navbar-toggler ml-auto" type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="fas fa-bars"></span>
                                </button>
                                <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                                    <style>{`
                                         .main-menu.custom-nav > li > a { color: #fff !important; font-weight: 700 !important; font-size: 15px; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; }
                                         .header-fixed .main-menu.custom-nav > li > a { color: #fff !important; }
                                         
                                         /* Logo size in sticky */
                                         .header-fixed .site-title img { max-width: 80px !important; }

                                         /* Sticky Header Background - DARK */
                                         .header-fixed {
                                             background: rgba(8, 8, 8, 0.98) !important;
                                             box-shadow: 0 10px 40px rgba(0,0,0,0.5) !important;
                                             border-bottom: 2px solid #dc3545;
                                         }
                                         
                                         .header-fixed .navbar-toggler { color: #fff !important; border-color: rgba(255,255,255,0.2); }

                                         .sub-menu-item:hover {
                                             color: #dc3545 !important;
                                             background-color: rgba(220,53,69,0.1);
                                             border-left: 3px solid #dc3545 !important;
                                             padding-left: 30px !important;
                                         }

                                         /* Color fix for sub-menus in sticky */
                                         .header-fixed .sub-menu li a { color: #ccc !important; }
                                         .header-fixed .sub-menu li a:hover { color: #fff !important; background: rgba(255,255,255,0.05); }

                                         /* Mobile menu text is always white */
                                         @media (max-width: 1199px) {
                                             .navbar-collapse .main-menu.custom-nav > li > a { 
                                                 color: #fff !important; 
                                                 padding: 12px 10px;
                                                 display: block;
                                                 border-bottom: 1px solid rgba(255,255,255,0.05);
                                             }
                                             .header-fixed .navbar-collapse .main-menu.custom-nav > li > a { 
                                                 color: #fff !important; 
                                             }
                                         }

                                        @keyframes fadeInUp {
                                            from { opacity: 0; transform: translateY(15px); }
                                            to { opacity: 1; transform: translateY(0); }
                                        }

                                        /* Dark Responsive Dropdowns */
                                        .dropdown-menu-responsive, .dropdown-menu-multicol-responsive {
                                            display: none !important;
                                            background-color: #111;
                                            border-radius: 8px;
                                            padding: 10px 0;
                                            margin-top: 5px;
                                            width: 100%;
                                            box-shadow: 0 15px 50px rgba(0,0,0,0.8);
                                            border: 1px solid rgba(255,255,255,0.05);
                                        }

                                        .dropdown-menu-multicol-responsive {
                                            flex-direction: column;
                                            gap: 15px;
                                            padding: 15px;
                                        }
                                        .multicol-column {
                                            flex: 1;
                                            margin-bottom: 10px;
                                        }
                                        .dropdown-menu-responsive.show {
                                            display: block !important;
                                            animation: fadeInUp 0.3s ease forwards;
                                        }
                                        .dropdown-menu-multicol-responsive.show {
                                            display: flex !important;
                                            animation: fadeInUp 0.3s ease forwards;
                                        }

                                        /* Desktop and larger screens (navbar-expand-xl = 1200px) */
                                         @media (min-width: 1200px) {
                                             .static-on-desktop { position: static !important; }
                                             
                                             .dropdown-menu-multicol-responsive {

                                                position: absolute;
                                                top: 100%;
                                                left: 0;
                                                min-width: 250px;
                                                width: auto;
                                                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                                                backdrop-filter: blur(10px);
                                                border-radius: 12px;
                                                padding: 15px 0;
                                            }
                                            
                                             .dropdown-menu-multicol-responsive {
                                                 position: absolute;
                                                 top: 100%;
                                                 /* Centering handled via inline styles for better screen-relative calculation */
                                                 flex-direction: row;
                                                 /* width: 1000px; - handled inline now */
                                                 max-width: 95vw; /* Prevents edge-to-edge overflow */

                                                 white-space: nowrap;
                                                 box-shadow: 0 15px 40px rgba(0,0,0,0.2);
                                                 border-radius: 16px;
                                                 backdrop-filter: blur(10px);
                                                 padding: 20px;
                                                 gap: 20px;
                                                 justify-content: center;
                                                 overflow-x: auto; /* Just in case it's still too wide */
                                             }
                                             
                                             /* Fix for 14-inch and smaller screens to ensure it doesn't go off screen */
                                             @media (min-width: 1200px) and (max-width: 1400px) {
                                                 .dropdown-menu-multicol-responsive {
                                                     width: 900px;
                                                     gap: 10px;
                                                     padding: 15px;
                                                 }
                                             }

                                             .dropdown-menu-multicol-responsive.show {
                                                 display: flex !important;
                                                 animation: fadeInUp 0.3s ease forwards;
                                             }


                                            .multicol-column {
                                                margin-bottom: 0;
                                            }
                                        }

                                         /* Mobile menu adjustments */
                                         @media (max-width: 1199px) {
                                             .navbar-toggler {
                                                 color: #fff;
                                                 border-color: rgba(255,255,255,0.5);
                                                 padding: 8px;
                                             }
                                             .header-fixed .navbar-toggler {
                                                 color: #333;
                                                 border-color: rgba(51,51,51,0.5);
                                             }
                                             .collapse.show {
                                                 background-color: #0c0c0c; /* Deep black for premium feel */
                                                 padding: 20px;
                                                 border-radius: 12px;
                                                 margin-top: 15px;
                                                 box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                                                 border: 1px solid rgba(255,255,255,0.05);
                                             }
                                             .sub-menu-item { 
                                                 padding: 10px 20px !important; 
                                                 font-size: 14px !important;
                                             }
                                         }

                                    `}</style>
                                    <ul className="navbar-nav main-menu custom-nav ml-auto mr-auto align-items-center">

                                        <li className={isActive('/')}><Link href="/">HOME</Link></li>

                                        <li className="menu_has_children" style={navItemStyle}>
                                            <a href="#0" onClick={(e) => toggleSubMenu(e, 'about')}>ABOUT BWUF</a>
                                            <ul className={getDropdownClass('about')}>
                                                {dynamicPages.length > 0 ? (
                                                    dynamicPages.map(p => (
                                                        <li key={p.slug}><Link href={`/about/${p.slug}`} style={dropItemStyle} className="sub-menu-item">{p.title}</Link></li>
                                                    ))
                                                ) : (
                                                    <>
                                                        <li><Link href="/about/history-of-bwuf" style={dropItemStyle} className="sub-menu-item">History of BWUF</Link></li>
                                                        <li><Link href="/about/our-mission" style={dropItemStyle} className="sub-menu-item">Our Mission</Link></li>
                                                        <li><Link href="/about/our-vision" style={dropItemStyle} className="sub-menu-item">Our Vision</Link></li>
                                                    </>
                                                )}
                                                <li><Link href="/about/founding-members" style={dropItemStyle} className="sub-menu-item">Founding Members</Link></li>
                                                <li><Link href="/about/executive-committee" style={dropItemStyle} className="sub-menu-item">Current Executive Committee</Link></li>
                                            </ul>
                                        </li>

                                        <li className="menu_has_children" style={navItemStyle}>
                                            <a href="#0" onClick={(e) => toggleSubMenu(e, 'events')}>EVENTS</a>
                                            <ul className={getDropdownClass('events')}>
                                                <li><Link href="/events/yearly-calendar" style={dropItemStyle} className="sub-menu-item">Yearly Calendar</Link></li>
                                                <li><Link href="/events/national-sports" style={dropItemStyle} className="sub-menu-item">Upcoming National Sports Events</Link></li>
                                                <li><Link href="/events/international-sports" style={dropItemStyle} className="sub-menu-item">Upcoming International Sports Events</Link></li>
                                                <li><Link href="/events/other-activities" style={dropItemStyle} className="sub-menu-item">Other Important Activities</Link></li>
                                            </ul>
                                        </li>

                                        <li>
                                            <Link className="site-logo site-title d-none d-xl-flex align-items-center mx-4" href="/">
                                                <img src="/assets/images/wushu_logo.png" height={40} width={50} alt="site-logo" style={{ maxWidth: '100px' }} />
                                            </Link>
                                        </li>

                                         <li className="menu_has_children static-on-desktop" style={navItemStyle}>
                                             <a href="#0" onClick={(e) => toggleSubMenu(e, 'resources')}>RESOURCES</a>
                                             <div className={getDropdownClass('resources', true)} style={{ left: '0', right: '0', margin: '0 auto', maxWidth: '1000px', width: '95vw' }}>
                                                <div className="multicol-column">
                                                    <h6 style={{ padding: '0 20px', margin: '10px 0', borderBottom: '1px solid rgba(220,53,69,0.1)', fontWeight: 'bold' }}>Key Documents</h6>
                                                    <Link href="/resources/iwuf-constitution" style={dropItemStyle} className="sub-menu-item">IWUF Constitution</Link>
                                                    <Link href="/resources/iwuf-rules" style={dropItemStyle} className="sub-menu-item">IWUF Rules and Regulations</Link>
                                                    <Link href="/resources/bwuf-constitution" style={dropItemStyle} className="sub-menu-item">BWUF Constitution</Link>
                                                    <Link href="/resources/bwuf-rules" style={dropItemStyle} className="sub-menu-item">BWUF Rules and Regulations</Link>
                                                </div>
                                                <div className="multicol-column">
                                                    <h6 style={{ padding: '0 20px', margin: '10px 0', borderBottom: '1px solid rgba(220,53,69,0.1)', fontWeight: 'bold' }}>Training Materials</h6>
                                                    <Link href="/resources/training-documents" style={dropItemStyle} className="sub-menu-item">Training Documents</Link>
                                                    <Link href="/resources/training-videos" style={dropItemStyle} className="sub-menu-item">Training Videos</Link>
                                                    <Link href="/resources/other-documentaries" style={dropItemStyle} className="sub-menu-item">Other Documentaries</Link>
                                                    <Link href="/resources/reference-books" style={dropItemStyle} className="sub-menu-item">Reference Books</Link>
                                                </div>
                                                <div className="multicol-column">
                                                    <h6 style={{ padding: '0 20px', margin: '10px 0', borderBottom: '1px solid rgba(220,53,69,0.1)', fontWeight: 'bold' }}>Statistics</h6>
                                                    <Link href="/resources/national-competitions" style={dropItemStyle} className="sub-menu-item">National Competitions</Link>
                                                    <Link href="/resources/international-competitions" style={dropItemStyle} className="sub-menu-item">International Competitions</Link>
                                                    <Link href="/resources/regional-competitions" style={dropItemStyle} className="sub-menu-item">Regional Competitions</Link>
                                                </div>
                                            </div>
                                        </li>

                                        <li className={isActive('/gallery')}><Link href="/gallery">GALLERY</Link></li>
                                        <li className={isActive('/contact')}><Link href="/contact">CONTACT US</Link></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Important Notice Ticker Under Navigation / Bottom of Header */}
                <div style={{ backgroundColor: '#dc3545', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <style>{`
                        .ticker-wrap { width: 100%; overflow: hidden; padding: 10px 0; white-space: nowrap; box-sizing: border-box; }
                        .ticker { display: inline-block; white-space: nowrap; padding-left: 100%; animation: ticker 25s linear infinite; font-size: 14px; font-weight: 500; color: #fff; letter-spacing: 0.5px; }
                        .ticker:hover { animation-play-state: paused; cursor: pointer; }
                        @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
                    `}</style>
                    <div className="ticker-wrap mt-0">
                        <div className="ticker">
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <i className="fas fa-bell text-warning"></i>
                                <span>{ticker.updatesText}</span>
                                <span style={{ margin: '0 40px', color: 'rgba(255,255,255,0.4)' }}>|</span>
                                <i className="fas fa-trophy text-warning"></i>
                                <span>{ticker.resourcesText}</span>
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </header>
    );
}

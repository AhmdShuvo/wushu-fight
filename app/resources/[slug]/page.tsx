import React from 'react';
import InnerBanner from '@/app/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';

import dbConnect from '@/lib/db';
import Resource from '@/models/Resource';

export default async function ResourcesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    await dbConnect();
    const data = await Resource.findOne({ slug }).lean();

    if (!data) {
        return (
            <>
                <InnerBanner title="Not Found" subtitle="Error" bgImage="/assets/images/bg/bg-12.png" activePage="404" />
                <div className="ptb-120 text-center"><h1>Resource Not Found</h1></div>
            </>
        );
    }


    return (
        <>
            <InnerBanner title={data.title} subtitle={data.subtitle} bgImage="/assets/images/bg/bg-12.png" activePage={data.title} />

            <section className="resource-header ptb-80" style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <h2 className="text-white mb-3" style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.title}</h2>
                            <p className="text-white-50" style={{ fontSize: '18px' }}>{data.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Document List Layout */}
            {data.layout === 'document-list' && (
                <section className="document-list-section ptb-120" style={{ backgroundColor: '#f4f5f7' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="bg-white p-5 shadow-sm" style={{ borderRadius: '15px' }}>
                                    <h4 className="mb-4 text-dark font-weight-bold" style={{ borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
                                        <i className="fas fa-folder-open text-acc-green mr-2"></i> Available Files
                                    </h4>

                                    <div className="list-group list-group-flush">
                                        {data.documents.map((doc: any, i: number) => (
                                            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-4" key={i} style={{ borderBottom: '1px solid #eee' }} data-aos="fade-up" data-aos-duration="800" data-aos-delay={i * 100}>
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-wrapper d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(62, 232, 15, 0.1)', borderRadius: '10px', color: '#3ee80f', fontSize: '24px', marginRight: '20px' }}>
                                                        <i className={`fas ${doc.icon}`}></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-1 text-dark" style={{ fontWeight: 'bold' }}>{doc.name}</h5>
                                                        <span className="text-muted" style={{ fontSize: '13px' }}>
                                                            <strong className="text-acc-green mr-2">{doc.type}</strong> •
                                                            <i className="far fa-hdd mx-2"></i> {doc.size} •
                                                            <i className="far fa-calendar-alt mx-2"></i> {doc.date}
                                                        </span>
                                                    </div>
                                                </div>
                                                <a 
                                                    href={doc.url} 
                                                    download={doc.name} 
                                                    className="btn btn-outline-success d-flex align-items-center justify-content-center" 
                                                    style={{ borderRadius: '30px', padding: '8px 25px', fontWeight: 'bold', borderColor: '#3ee80f', color: '#3ee80f', textDecoration: 'none' }}
                                                >
                                                    Download <i className="fas fa-download ml-2"></i>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Video Grid Layout */}
            {data.layout === 'video-grid' && (
                <section className="video-grid-section ptb-120" style={{ backgroundColor: '#0a0a0a' }}>
                    <div className="container">
                        <div className="row">
                            {data.videos.map((video: any, i: number) => (
                                <div className="col-lg-4 col-md-6 mb-40" key={i} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={i * 100}>
                                    <div className="video-card position-relative group" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#111', cursor: 'pointer' }}>
                                        <div className="video-thumb position-relative" style={{ height: '220px' }}>
                                            <img src={video.thumbnail} alt={video.title} className="w-100 h-100" style={{ objectFit: 'cover', opacity: 0.7, transition: '0.3s' }} />
                                            <div className="play-button position-absolute d-flex justify-content-center align-items-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', backgroundColor: 'rgba(62, 232, 15, 0.9)', color: 'black', borderRadius: '50%', fontSize: '20px', zIndex: 2, transition: '0.3s', boxShadow: '0 0 20px rgba(62, 232, 15, 0.5)' }}>
                                                <i className="fas fa-play" style={{ marginLeft: '4px' }}></i>
                                            </div>
                                            <span className="position-absolute bg-dark text-white px-2 py-1" style={{ bottom: '10px', right: '10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{video.duration}</span>
                                        </div>
                                        <div className="video-info p-4 text-white">
                                            <h5 className="mb-2" style={{ fontWeight: 600, lineHeight: '1.4' }}>{video.title}</h5>
                                            <span className="text-white-50" style={{ fontSize: '13px' }}><i className="fas fa-user-circle mr-2 text-acc-green"></i>{video.author}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Data Stats Layout */}
            {data.layout === 'data-stats' && (
                <section className="data-stats-section ptb-120" style={{ backgroundColor: '#fff' }}>
                    <div className="container">
                        <div className="row mb-60">
                            {data.stats.map((stat: any, i: number) => (
                                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0" key={i} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={i * 100}>
                                    <div className="stat-card text-center p-5 shadow-sm h-100 border-0" style={{ borderRadius: '15px', backgroundColor: '#fdfdfd', borderBottom: '4px solid #3ee80f' }}>
                                        <i className={`fas ${stat.icon} fa-3x mb-4`} style={{ color: '#3ee80f' }}></i>
                                        <h2 className="text-dark font-weight-bold mb-2" style={{ fontSize: '42px' }}>{stat.value}</h2>
                                        <p className="text-muted mb-0 font-weight-bold" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px' }}>{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                    <div className="card-header bg-dark text-white p-4 border-0">
                                        <h4 className="mb-0"><i className="fas fa-history text-acc-green mr-2"></i> Hall of Fame / Recent Champions</h4>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0" style={{ backgroundColor: '#fff' }}>
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th className="py-3 px-4 border-0 text-muted">Year</th>
                                                        <th className="py-3 px-4 border-0 text-muted">Champion / Honoree</th>
                                                        <th className="py-3 px-4 border-0 text-muted text-right">Category / Medal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.recentWinners.map((winner: any, i: number) => (
                                                        <tr key={i}>
                                                            <td className="py-4 px-4 border-bottom-0 font-weight-bold text-dark">{winner.year}</td>
                                                            <td className="py-4 px-4 border-bottom-0">
                                                                <span className="text-acc-green font-weight-bold mr-2"><i className="fas fa-trophy"></i></span> {winner.championName}
                                                            </td>
                                                            <td className="py-4 px-4 border-bottom-0 text-right text-muted">{winner.category}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

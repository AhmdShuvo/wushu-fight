"use client";
import React, { useState, useEffect } from 'react';

export default function Schedule() {
    const [schedule, setSchedule] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/schedule')
            .then(res => res.json())
            .then(data => {
                if (data.schedule) {
                    setSchedule(data.schedule);
                }
            });
    }, []);

    const renderSlot = (slot: any) => {
        if (slot.isBlank) {
            return <td className="blank-data"><div className="dot"></div></td>;
        }
        return (
            <td className={slot.isActive ? "active" : ""}>
                {slot.text} <span>{slot.subText}</span>
            </td>
        );
    };

    if (schedule.length === 0) return null;

    return (
        <section id="schedule" className="schedule-section ptb-120">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 text-center">
                        <div className="section-header" data-aos="fade-up" data-aos-duration="1200">
                            <h2 className="section-title">WEEKLY <span>TRAINING</span> SCHEDULE</h2>
                            <p>Consistency is the key to mastery. Join our structured classes designed to build your skills progressively from foundation to advanced levels.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center" data-aos="fade-up" data-aos-duration="1200">
                    <div className="col-xl-12">
                        <div className="schedule-area table-responsive">
                            <table className="custom-table bg-overlay-black bg_img" style={{ backgroundImage: "url('/assets/images/bg/bg-11.png')" }}>
                                <thead>
                                    <tr>
                                        <th>Routine</th>
                                        <th>10 am</th>
                                        <th>12 pm</th>
                                        <th>02 pm</th>
                                        <th>05 pm</th>
                                        <th>07 pm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.day}</td>
                                            {renderSlot(item.col10am)}
                                            {renderSlot(item.col12pm)}
                                            {renderSlot(item.col02pm)}
                                            {renderSlot(item.col05pm)}
                                            {renderSlot(item.col07pm)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

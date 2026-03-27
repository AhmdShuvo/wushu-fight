'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface CustomDateTimePickerProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function CustomDateTimePicker({ value, onChange, placeholder }: CustomDateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
        if (!value) return null;
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
    });
    const [pickerStyles, setPickerStyles] = useState<React.CSSProperties>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

    useEffect(() => {
        setMounted(true);
        if (value) {
            const d = new Date(value);
            if (!isNaN(d.getTime())) {
                setSelectedDate(d);
                setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
            }
        }
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const dropdown = document.getElementById('picker-portal-dropdown');
            if (containerRef.current && !containerRef.current.contains(event.target as Node) && 
                dropdown && !dropdown.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const updatePosition = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            const pickerHeight = 450;
            const spaceBelow = window.innerHeight - rect.bottom;
            const openUp = spaceBelow < pickerHeight;
            
            setPickerStyles({
                position: 'fixed',
                top: openUp ? 'auto' : (rect.bottom + 10) + 'px',
                bottom: openUp ? (window.innerHeight - rect.top + 10) + 'px' : 'auto',
                left: Math.max(10, Math.min(rect.left, window.innerWidth - 330)) + 'px',
                zIndex: 999999,
                background: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                width: '320px',
                padding: '20px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                fontFamily: 'inherit',
                color: '#fff'
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }
        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        }
    }, [isOpen]);

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handleDateClick = (day: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        if (selectedDate) {
            newDate.setHours(selectedDate.getHours());
            newDate.setMinutes(selectedDate.getMinutes());
        } else {
            newDate.setHours(12, 0);
        }
        setSelectedDate(newDate);
        updateValue(newDate);
    };

    const handleTimeChange = (type: 'h' | 'm', val: string) => {
        const newDate = selectedDate ? new Date(selectedDate) : new Date();
        if (type === 'h') newDate.setHours(parseInt(val));
        else newDate.setMinutes(parseInt(val));
        setSelectedDate(newDate);
        updateValue(newDate);
    };

    const isValidDate = (d: any) => d instanceof Date && !isNaN(d.getTime());

    const updateValue = (date: Date) => {
        if (!isValidDate(date)) return;
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        if (isValidDate(localDate)) {
            onChange(localDate.toISOString().slice(0, 16));
        }
    };

    const renderDays = () => {
        const totalDays = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
        const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
        const prevMonthDays = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth() - 1);
        const cells = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            cells.push(
                <div key={`prev-${i}`} style={{
                    width: 'calc(14.28% - 5px)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '13px'
                }}>
                    {prevMonthDays - i}
                </div>
            );
        }

        for (let i = 1; i <= totalDays; i++) {
            const isSelected = selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === viewDate.getMonth() && selectedDate.getFullYear() === viewDate.getFullYear();
            const isToday = new Date().toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), i).toDateString();

            cells.push(
                <div 
                    key={i} 
                    onClick={() => handleDateClick(i)}
                    style={{
                        width: 'calc(14.28% - 5px)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        borderRadius: '8px', fontSize: '13px', color: isSelected ? '#000' : (isToday ? '#3ee80f' : '#fff'),
                        background: isSelected ? '#3ee80f' : '#151515', fontWeight: isSelected ? 'bold' : 'normal',
                        border: isToday && !isSelected ? '1px solid #3ee80f' : '1px solid transparent', transition: 'all 0.2s', marginBottom: '5px'
                    }}
                >
                    {i}
                </div>
            );
        }

        const remaining = 42 - cells.length;
        for (let i = 1; i <= remaining; i++) {
            cells.push(
                <div key={`next-${i}`} style={{
                    width: 'calc(14.28% - 5px)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '13px'
                }}>
                    {i}
                </div>
            );
        }

        return <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '4px' }}>{cells}</div>;
    };

    const formatDisplayDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="custom-picker-container" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            <div ref={inputRef} onClick={() => setIsOpen(!isOpen)} style={{ 
                position: 'relative', cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' 
            }}>
                <input 
                    type="text" 
                    readOnly 
                    className="form--control" 
                    value={formatDisplayDate(selectedDate)} 
                    placeholder={placeholder || 'Select Date & Time'}
                    style={{
                        background: '#111', border: '1px solid #333', color: '#fff', padding: '16px 20px', paddingRight: '60px',
                        cursor: 'pointer', width: '100%', fontFamily: 'inherit', fontSize: '16px', borderRadius: '12px', borderStyle: 'solid'
                    }}
                />
                <div style={{
                    position: 'absolute', right: 0, top: 0, bottom: 0, width: '50px', background: '#3ee80f',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '18px'
                }}>
                    <i className="fas fa-calendar-alt"></i>
                </div>
            </div>

            {isOpen && mounted && createPortal(
                <div id="picker-portal-dropdown" style={pickerStyles}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="picker-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '5px' }}>
                            <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))} style={{
                                background: '#1a1a1a', border: '1px solid #333', width: '35px', height: '35px', borderRadius: '8px', color: '#3ee80f', cursor: 'pointer'
                            }}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#fff' }}>
                                    {monthNames[viewDate.getMonth()]} <span style={{ color: '#3ee80f' }}>{viewDate.getFullYear()}</span>
                                </div>
                                <button type="button" onClick={() => {
                                    const now = new Date();
                                    setSelectedDate(now);
                                    setViewDate(now);
                                    updateValue(now);
                                }} style={{
                                    background: 'transparent', border: 'none', color: '#3ee80f', fontSize: '9px', fontWeight: 900, cursor: 'pointer', padding: '0', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px'
                                }}>
                                    [ JUMP TO TODAY ]
                                </button>
                            </div>
                            <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))} style={{
                                background: '#1a1a1a', border: '1px solid #333', width: '35px', height: '35px', borderRadius: '8px', color: '#3ee80f', cursor: 'pointer'
                            }}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        
                        <div style={{ display: 'flex', width: '100%', marginBottom: '10px' }}>
                            {days.map(d => (
                                <div key={d} style={{ flex: '1', textAlign: 'center', fontSize: '11px', fontWeight: 800, color: '#666' }}>{d}</div>
                            ))}
                        </div>
                        {renderDays()}
                        
                        <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #222' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontSize: '10px', color: '#666', fontWeight: 800, letterSpacing: '2px', marginBottom: '10px' }}>
                                    <i className="fas fa-clock"></i> DATE & TIME PICKER
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                                    <div style={{ flex: 1, background: '#000', border: '1px solid #222', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                        <select 
                                            value={selectedDate?.getHours() || 0} 
                                            onChange={(e) => handleTimeChange('h', e.target.value)}
                                            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', fontWeight: 700, outline: 'none', width: '100%', cursor: 'pointer', textAlignLast: 'center' }}
                                        >
                                            {Array.from({length: 24}, (_, i) => (
                                                <option key={i} value={i} style={{ background: '#000', color: '#fff' }}>{i.toString().padStart(2, '0')}</option>
                                            ))}
                                        </select>
                                        <div style={{ fontSize: '8px', color: '#3ee80f', fontWeight: 800 }}>HOURS</div>
                                    </div>
                                    <div style={{ color: '#3ee80f', fontWeight: 900, fontSize: '24px' }}>:</div>
                                    <div style={{ flex: 1, background: '#000', border: '1px solid #222', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                        <select 
                                            value={selectedDate?.getMinutes() || 0} 
                                            onChange={(e) => handleTimeChange('m', e.target.value)}
                                            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', fontWeight: 700, outline: 'none', width: '100%', cursor: 'pointer', textAlignLast: 'center' }}
                                        >
                                            {Array.from({length: 60}, (_, i) => (
                                                <option key={i} value={i} style={{ background: '#000', color: '#fff' }}>{i.toString().padStart(2, '0')}</option>
                                            ))}
                                        </select>
                                        <div style={{ fontSize: '8px', color: '#3ee80f', fontWeight: 800 }}>MINUTES</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={() => setIsOpen(false)} style={{ 
                                width: '100%', background: '#3ee80f', border: 'none', padding: '15px', borderRadius: '12px', 
                                color: '#000', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px'
                            }}>
                                CONFIRM SELECTION
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

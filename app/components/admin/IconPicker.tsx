'use client';

import React, { useState } from 'react';

const icons = [
    'fa-history', 'fa-bullseye', 'fa-eye', 'fa-users', 'fa-sitemap', 'fa-globe', 'fa-trophy', 
    'fa-medal', 'fa-star', 'fa-shield-alt', 'fa-hand-rock', 'fa-fist-raised', 'fa-user-ninja',
    'fa-book', 'fa-file-pdf', 'fa-video', 'fa-camera', 'fa-images', 'fa-calendar-alt',
    'fa-map-marker-alt', 'fa-phone-alt', 'fa-envelope', 'fa-link', 'fa-external-link-alt',
    'fa-newspaper', 'fa-info-circle', 'fa-question-circle', 'fa-check-circle', 'fa-times-circle',
    'fa-exclamation-triangle', 'fa-bolt', 'fa-fire', 'fa-leaf', 'fa-heart', 'fa-cog', 'fa-tools'
];

interface IconPickerProps {
    value: string;
    onChange: (icon: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIcons = icons.filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="icon-picker-container position-relative">
            <div 
                className="form--control d-flex align-items-center justify-content-between" 
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', background: '#222' }}
            >
                <div>
                    <i className={`fas ${value || 'fa-icons'} mr-3 text-danger`}></i>
                    <span className="text-white">{value || 'Select Icon'}</span>
                </div>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} small`}></i>
            </div>

            {isOpen && (
                <div 
                    className="icon-dropdown p-3 rounded shadow-lg" 
                    style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        width: '100%', 
                        zIndex: 1000, 
                        backgroundColor: '#111', 
                        border: '1px solid #333',
                        marginTop: '5px',
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}
                >
                    <input 
                        type="text" 
                        placeholder="Search icons..." 
                        className="form--control form-control-sm mb-3" 
                        style={{ height: '35px', fontSize: '13px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                    <div className="d-flex flex-wrap gap-2">
                        {filteredIcons.map(icon => (
                            <div 
                                key={icon} 
                                className={`icon-item p-2 rounded text-center ${value === icon ? 'bg-danger' : ''}`}
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    cursor: 'pointer', 
                                    transition: '0.3s',
                                    border: '1px solid #222'
                                }}
                                onClick={() => { onChange(icon); setIsOpen(false); }}
                                title={icon}
                            >
                                <i className={`fas ${icon} ${value === icon ? 'text-white' : 'text-white-50'}`}></i>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

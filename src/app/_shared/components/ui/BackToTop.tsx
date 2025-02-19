"use client"
import React, { useState, useEffect } from 'react'
import Icon from '@/app/_shared/utils/Icon'
export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="z-50">
            {isVisible && (
                <button 
                    onClick={scrollToTop}
                    className="hidden sm:block fixed w-14 h-14 bottom-5 left-5 bg-amber-600 text-white px-4 py-2 rounded-full  hover:bg-amber-700 transition-colors shadow-2xl"
                >
                    <Icon icon="ArrowUp" className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}

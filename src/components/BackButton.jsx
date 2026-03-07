import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BackButton({ fallback = '/', text = "Back", className = "" }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = (e) => {
        e.preventDefault();
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    };

    return (
        <a href={fallback} onClick={handleBack} className={`global-back-link ${className}`}>
            <ArrowLeft size={20} /> {text}
        </a>
    );
}

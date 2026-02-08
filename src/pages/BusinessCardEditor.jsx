import React, { useState, useEffect } from 'react';
import BusinessCardTemplate, { defaultCardData } from '../components/BusinessCard/BusinessCardTemplate';
import '../components/Booklet/Booklet.css'; // Reusing some base styles if needed, or just let local styles handle it
import '../components/BusinessCard/BusinessCard.css';

export default function BusinessCardEditor() {
    const [data, setData] = useState(defaultCardData);
    const [isLoaded, setIsLoaded] = useState(false);
    const [zoom, setZoom] = useState(2.0);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('rhythmia_business_card_data');
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved business card data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('rhythmia_business_card_data', JSON.stringify(data));
        }
    }, [data, isLoaded]);

    const updateField = (section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    const resetToDefault = () => {
        if (window.confirm("Are you sure? This will erase all your changes.")) {
            setData(defaultCardData);
        }
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3.0));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

    const [showSidebar, setShowSidebar] = useState(true);

    const handleFitWidth = () => {
        const availableWidth = window.innerWidth - (showSidebar ? 480 : 80);
        const fitScale = Math.min(Math.max(availableWidth / (85 * 3.77), 0.5), 2.0); // Approx px conversion
        setZoom(fitScale);
    };

    const handleExport = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `rhythmia-business-card-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData.front && importedData.back) {
                    if (window.confirm("This will overwrite your current changes. Continue?")) {
                        setData(importedData);
                    }
                } else {
                    alert("Invalid business card data file.");
                }
            } catch (error) {
                console.error("Import failed", error);
                alert("Failed to load file. Invalid JSON.");
            }
        };
        reader.readAsText(file);
    };

    if (!isLoaded) return null;

    return (
        <div className="editor-layout" style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#111', color: '#eee' }}>

            {/* EDITOR SIDEBAR */}
            <div className="editor-sidebar no-print" style={{
                width: showSidebar ? '400px' : '0px',
                padding: showSidebar ? '20px' : '0px',
                overflowY: 'auto',
                borderRight: showSidebar ? '1px solid #333' : 'none',
                background: '#0a0a0a',
                transition: 'all 0.3s ease',
                opacity: showSidebar ? 1 : 0,
                pointerEvents: showSidebar ? 'auto' : 'none'
            }}>
                <div style={{ minWidth: '360px' }}> {/* Container to prevent content squishing during transition */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <button
                            onClick={() => setShowSidebar(false)}
                            style={{ background: 'transparent', border: '1px solid #333', color: '#888', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px' }}
                            title="Hide Sidebar"
                        >
                            «
                        </button>
                        <h2 style={{ color: '#D50F0F', margin: 0 }}>Business Card</h2>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button onClick={handlePrint} style={{ flexGrow: 1, padding: '12px', backgroundColor: '#D50F0F', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                            PRINT / PDF
                        </button>
                        <button onClick={resetToDefault} style={{ padding: '12px', backgroundColor: '#333', color: '#888', border: '1px solid #555', borderRadius: '6px', cursor: 'pointer' }} title="Reset">
                            ↺
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                        <button onClick={handleExport} style={{ flex: 1, padding: '8px', backgroundColor: '#222', color: '#ccc', border: '1px solid #444', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            ↓ Export
                        </button>
                        <label style={{ flex: 1, padding: '8px', backgroundColor: '#222', color: '#ccc', border: '1px solid #444', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center' }}>
                            ↑ Import
                            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                        </label>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px', color: '#888' }}>Front Side</h3>
                        <Input label="Tagline" value={data.front.tagline} onChange={v => updateField('front', 'tagline', v)} />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px', color: '#888' }}>Back Side (Contact)</h3>
                        <Input label="Full Name" value={data.back.name} onChange={v => updateField('back', 'name', v)} />
                        <Input label="Job Title" value={data.back.title} onChange={v => updateField('back', 'title', v)} />
                        <Input label="Email" value={data.back.email} onChange={v => updateField('back', 'email', v)} />
                        <Input label="Phone" value={data.back.phone} onChange={v => updateField('back', 'phone', v)} />
                        <Input label="Website" value={data.back.website} onChange={v => updateField('back', 'website', v)} />
                        <Input label="Address" value={data.back.address} onChange={v => updateField('back', 'address', v)} />
                        <Input label="QR Label" value={data.back.qrLabel} onChange={v => updateField('back', 'qrLabel', v)} />
                    </div>
                </div>
            </div>

            {/* PREVIEW AREA */}
            <div className="editor-preview" style={{ flexGrow: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px', overflow: 'auto' }}>

                {/* SHOW SIDEBAR TRIGGER (Only visible when hidden) */}
                {!showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="no-print"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            zIndex: 100,
                            background: '#333',
                            color: 'white',
                            border: '1px solid #555',
                            borderRadius: '4px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        »
                    </button>
                )}

                {/* ZOOM CONTROLS */}
                <div className="zoom-controls no-print" style={{ position: 'fixed', top: '20px', right: '30px', zIndex: 100, display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.8)', padding: '8px', borderRadius: '8px' }}>
                    <button onClick={handleZoomOut} style={{ color: 'white', background: 'transparent', border: '1px solid #555', borderRadius: '4px', width: '30px', cursor: 'pointer' }}>-</button>
                    <span style={{ color: '#aaa', fontSize: '0.8rem', padding: '4px 8px' }}>{Math.round(zoom * 100)}%</span>
                    <button onClick={handleZoomIn} style={{ color: 'white', background: 'transparent', border: '1px solid #555', borderRadius: '4px', width: '30px', cursor: 'pointer' }}>+</button>
                    <button onClick={handleFitWidth} style={{ color: 'white', background: '#333', border: '1px solid #555', borderRadius: '4px', padding: '0 8px', cursor: 'pointer', fontSize: '0.8rem' }}>Fit</button>
                </div>

                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease', padding: '40px' }}>
                    <BusinessCardTemplate data={data} />
                </div>
            </div>

            {/* Print Styles managed in CSS for full control */}
        </div>
    );
}

function Input({ label, value, onChange }) {
    return (
        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#555'}
                onBlur={e => e.target.style.borderColor = '#333'}
            />
        </div>
    );
}

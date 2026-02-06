import React, { useState, useEffect } from 'react';
import BookletTemplate, { defaultBookletData } from '../components/Booklet/BookletTemplate';
import './BookletEditor.css';

export default function BookletEditor() {
    const [data, setData] = useState(defaultBookletData);
    const [isLoaded, setIsLoaded] = useState(false);
    const [zoom, setZoom] = useState(0.8);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('rhythmia_booklet_data');
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved booklet data", e);
            }
        }
        setIsLoaded(true);

        // Auto-fit zoom on mount 
        try {
            const availableWidth = window.innerWidth - 480; // 400px sidebar + 80px padding
            const fitScale = Math.min(Math.max(availableWidth / 1150, 0.4), 1.2);
            setZoom(fitScale);
        } catch (e) {
            console.error("Auto-zoom failed", e);
        }
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('rhythmia_booklet_data', JSON.stringify(data));
        }
    }, [data, isLoaded]);

    const updateField = (path, value) => {
        const keys = path.split('.');
        setData(prev => {
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const updateArrayItem = (path, index, value) => {
        // For simple arrays like references
        setData(prev => {
            const newData = { ...prev };
            // Assuming path is 'backCover.references' for now
            const keys = path.split('.');
            let current = newData;
            for (let i = 0; i < keys.length; i++) {
                current = current[keys[i]];
            }
            current[index] = value;
            return newData;
        });
    };

    const updateObjectArrayItem = (path, index, field, value) => {
        // For object arrays like ingredients/benefits
        const keys = path.split('.');
        setData(prev => {
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length; i++) {
                current = current[keys[i]];
            }
            current[index] = { ...current[index], [field]: value };
            return newData;
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2.0));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
    const handleFitWidth = () => {
        const availableWidth = window.innerWidth - 480;
        const fitScale = Math.min(Math.max(availableWidth / 1150, 0.4), 1.2);
        setZoom(fitScale);
    };

    const resetToDefault = () => {
        if (window.confirm("Are you sure? This will erase all your changes.")) {
            setData(defaultBookletData);
        }
    }

    if (!isLoaded) return null;

    return (
        <div className="editor-layout">

            {/* EDITOR SIDEBAR (Left) */}
            <div className="editor-sidebar no-print">
                <h2 style={{ marginBottom: '20px', color: '#D50F0F' }}>Booklet Editor</h2>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    <button onClick={handlePrint} style={{ flexGrow: 1, padding: '12px', backgroundColor: '#D50F0F', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        PRINT / SAVE PDF
                    </button>
                    <button onClick={resetToDefault} style={{ padding: '12px', backgroundColor: '#333', color: '#888', border: '1px solid #555', borderRadius: '6px', cursor: 'pointer' }}>
                        Reset
                    </button>
                </div>

                {/* Form Sections */}
                <Section title="Front Cover">
                    <Input label="Title (Use <br/> for new line)" value={data.frontCover.title} onChange={v => updateField('frontCover.title', v)} textarea />
                    <Input label="Subtitle" value={data.frontCover.subtitle} onChange={v => updateField('frontCover.subtitle', v)} textarea />
                    <Input label="Badge Text" value={data.frontCover.badge} onChange={v => updateField('frontCover.badge', v)} />
                </Section>

                <Section title="Inside Left (Page 2)">
                    <Input label="Title" value={data.insideLeft.title} onChange={v => updateField('insideLeft.title', v)} />
                    <Input label="Intro Text" value={data.insideLeft.intro} onChange={v => updateField('insideLeft.intro', v)} textarea />
                    <Input label="Science Header" value={data.insideLeft.scienceTitle} onChange={v => updateField('insideLeft.scienceTitle', v)} />
                    <Input label="Science Text" value={data.insideLeft.scienceText} onChange={v => updateField('insideLeft.scienceText', v)} textarea />
                    <Input label="Nature Image Overlay" value={data.insideLeft.natureImageText} onChange={v => updateField('insideLeft.natureImageText', v)} />
                </Section>

                <Section title="Inside Right (Page 3)">
                    <Input label="Benefits Title" value={data.insideRight.keyBenefitsTitle} onChange={v => updateField('insideRight.keyBenefitsTitle', v)} />
                    <h4 style={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>Benefits List</h4>
                    {data.insideRight.benefits.map((benefit, idx) => (
                        <div key={idx} style={{ marginBottom: '10px', padding: '10px', background: '#222', borderRadius: '4px' }}>
                            <Input label={`Item ${idx + 1} Title`} value={benefit.title} onChange={v => updateObjectArrayItem('insideRight.benefits', idx, 'title', v)} />
                            <Input label={`Item ${idx + 1} Text`} value={benefit.text} onChange={v => updateObjectArrayItem('insideRight.benefits', idx, 'text', v)} />
                        </div>
                    ))}
                </Section>

                <Section title="Back Cover - Copy">
                    <Input label="Developed By" value={data.backCover.developedBy} onChange={v => updateField('backCover.developedBy', v)} />
                    <Input label="Evidence Title" value={data.backCover.evidenceTitle} onChange={v => updateField('backCover.evidenceTitle', v)} />
                    <Input label="Evidence Intro" value={data.backCover.evidenceIntro} onChange={v => updateField('backCover.evidenceIntro', v)} textarea />
                </Section>

                <Section title="Back Cover - Ingredients">
                    {data.backCover.ingredients.map((ing, idx) => (
                        <div key={idx} style={{ marginBottom: '10px', padding: '10px', background: '#222', borderRadius: '4px' }}>
                            <Input label="Name" value={ing.name} onChange={v => updateObjectArrayItem('backCover.ingredients', idx, 'name', v)} />
                            <Input label="Role" value={ing.role} onChange={v => updateObjectArrayItem('backCover.ingredients', idx, 'role', v)} />
                            <Input label="Research" value={ing.research} onChange={v => updateObjectArrayItem('backCover.ingredients', idx, 'research', v)} textarea />
                        </div>
                    ))}
                </Section>

                <Section title="Back Cover - Contact & Legal">
                    <Input label="Disclaimer" value={data.backCover.disclaimer} onChange={v => updateField('backCover.disclaimer', v)} textarea />
                    <Input label="Email" value={data.backCover.contactEmail} onChange={v => updateField('backCover.contactEmail', v)} />
                    <Input label="Website" value={data.backCover.contactWeb} onChange={v => updateField('backCover.contactWeb', v)} />
                    <Input label="Social Handle" value={data.backCover.contactSocial} onChange={v => updateField('backCover.contactSocial', v)} />
                </Section>

                <Section title="References">
                    {data.backCover.references.map((ref, idx) => (
                        <div key={idx} style={{ marginBottom: '10px' }}>
                            <Input label={`Ref ${idx + 1} `} value={ref} onChange={v => updateArrayItem('backCover.references', idx, v)} />
                        </div>
                    ))}
                </Section>
            </div>

            {/* PREVIEW AREA (Right) */}
            <div className="editor-preview-wrapper" style={{ position: 'relative' }}>

                {/* ZOOM CONTROLS */}
                <div className="zoom-controls no-print" style={{ position: 'fixed', top: '20px', right: '30px', zIndex: 200, display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.8)', padding: '8px', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
                    <button onClick={handleZoomOut} style={{ color: 'white', background: 'transparent', border: '1px solid #555', borderRadius: '4px', width: '30px', cursor: 'pointer' }}>-</button>
                    <span style={{ color: '#aaa', fontSize: '0.8rem', padding: '4px' }}>{Math.round(zoom * 100)}%</span>
                    <button onClick={handleZoomIn} style={{ color: 'white', background: 'transparent', border: '1px solid #555', borderRadius: '4px', width: '30px', cursor: 'pointer' }}>+</button>
                    <button onClick={handleFitWidth} style={{ color: 'white', background: '#333', border: '1px solid #555', borderRadius: '4px', padding: '0 8px', cursor: 'pointer', fontSize: '0.8rem' }}>Fit</button>
                </div>

                <div className="editor-preview-scaler" style={{ transform: `scale(${zoom})` }}>
                    <BookletTemplate data={data} />
                </div>
            </div>
        </div>
    );
}

// Simple Subcomponents for the Editor UI
function Section({ title, children }) {
    return (
        <div style={{ marginBottom: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
            <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', color: '#ccc' }}>{title}</h3>
            {children}
        </div>
    );
}

function Input({ label, value, onChange, textarea }) {
    return (
        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>{label}</label>
            {textarea ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '80px', fontFamily: 'inherit' }}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                />
            )}
        </div>
    );
}

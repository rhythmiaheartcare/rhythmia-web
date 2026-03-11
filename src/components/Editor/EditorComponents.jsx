

/**
 * A standardized input component for the editor.
 */
export function EditorInput({ label, value, onChange, textarea, type = "text", ...props }) {
    return (
        <div className="rhythmia-editor-input-group">
            {label && <label className="rhythmia-editor-label">{label}</label>}
            {textarea ? (
                <textarea
                    className="rhythmia-editor-input rhythmia-editor-textarea"
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    className="rhythmia-editor-input"
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    {...props}
                />
            )}
        </div>
    );
}

/**
 * A collapsible section container.
 */
export function EditorSection({ title, children, className = '' }) {
    return (
        <div className={`rhythmia-editor-section ${className}`}>
            {title && <h3 className="rhythmia-editor-section-title">{title}</h3>}
            <div className="rhythmia-editor-section-content">
                {children}
            </div>
        </div>
    );
}

/**
 * Zoom controls overlay.
 */
export function ZoomControls({ zoom, onZoomIn, onZoomOut, onFit }) {
    return (
        <div className="rhythmia-editor-controls no-print">
            <button onClick={onZoomOut} className="rhythmia-control-btn" title="Zoom Out">-</button>
            <span style={{ color: '#aaa', fontSize: '0.9rem', width: '45px', textAlign: 'center' }}>
                {Math.round(zoom * 100)}%
            </span>
            <button onClick={onZoomIn} className="rhythmia-control-btn" title="Zoom In">+</button>
            <div style={{ width: '1px', height: '20px', background: '#444', margin: '0 4px' }}></div>
            <button onClick={onFit} className="rhythmia-control-btn fit-btn" title="Fit to Screen">Fit</button>
        </div>
    );
}

/**
 * Standard Action Buttons
 */
export function EditorActions({ onPrint, onReset, onExport, onImport }) {
    return (
        <>
            <div className="rhythmia-action-group">
                <button onClick={onPrint} className="rhythmia-btn rhythmia-btn-primary">
                    PRINT / SAVE PDF
                </button>
                <button onClick={onReset} className="rhythmia-btn rhythmia-btn-secondary" title="Reset to Defaults" style={{ flex: '0 0 auto' }}>
                    ↺
                </button>
            </div>

            <div className="rhythmia-action-group">
                <button onClick={onExport} className="rhythmia-btn rhythmia-btn-neutral">
                    ↓ Export JSON
                </button>
                <label className="rhythmia-btn rhythmia-btn-neutral" style={{ cursor: 'pointer' }}>
                    ↑ Import JSON
                    <input
                        type="file"
                        accept=".json"
                        onChange={onImport}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
        </>
    );
}

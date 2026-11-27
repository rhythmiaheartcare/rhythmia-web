import { useState, useRef, useEffect } from 'react';
import './Editor.css';
import { ZoomControls, EditorActions } from './EditorComponents';

/**
 * Main layout for all editors.
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the editor
 * @param {React.ReactNode} props.sidebarContent - Content for the sidebar (Inputs)
 * @param {React.ReactNode} props.previewContent - Content for the preview (Template)
 * @param {Function} props.onExport - Export handler
 * @param {Function} props.onImport - Import handler
 * @param {Function} props.onPrint - Print handler
 * @param {Function} props.onReset - Reset handler
 * @param {Object} props.zoomState - { zoom, setZoom, handleFit }
 */
export default function EditorLayout({
    title,
    sidebarContent,
    previewContent,
    onExport,
    onImport,
    onPrint,
    onReset,
    zoomState
}) {
    const [showSidebar, setShowSidebar] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 768 : true
    );
    const { zoom, setZoom, handleFit } = zoomState;
    const scalerRef = useRef(null);
    const hasFittedRef = useRef(false);
    const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

    /* Track the unscaled preview size so the outer zoom box matches the exact
       visual dimensions — keeping scaled previews dead-centred on phones and
       preventing horizontal clipping or empty scroll space below. */
    useEffect(() => {
        const el = scalerRef.current;
        if (!el) return;

        const measure = () => {
            const width = el.scrollWidth;
            const height = el.scrollHeight;
            setContentSize(prev =>
                prev.width === width && prev.height === height ? prev : { width, height }
            );
            if (!hasFittedRef.current && width > 0) {
                hasFittedRef.current = true;
                handleFit();
            }
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [handleFit]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3.0));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.15));

    return (
        <div className="rhythmia-editor-layout">

            {/* MOBILE BACKDROP (CSS hides on desktop >= 768px) */}
            {showSidebar && (
                <div
                    className="rhythmia-editor-backdrop no-print"
                    onClick={() => setShowSidebar(false)}
                    aria-hidden="true"
                />
            )}

            {/* SIDEBAR */}
            <div className={`rhythmia-editor-sidebar ${!showSidebar ? 'collapsed' : ''} no-print`}>
                <div className="rhythmia-editor-sidebar-content">

                    {/* Header */}
                    <div className="rhythmia-sidebar-header">
                        <button
                            className="rhythmia-control-btn"
                            onClick={() => setShowSidebar(false)}
                            title="Hide Sidebar"
                            style={{ height: '30px', width: '30px' }}
                        >
                            «
                        </button>
                        <h2 className="rhythmia-sidebar-title">{title}</h2>
                    </div>

                    {/* Actions */}
                    <EditorActions
                        onExport={onExport}
                        onImport={onImport}
                        onPrint={onPrint}
                        onReset={onReset}
                    />

                    {/* Content */}
                    <div style={{ marginTop: '20px' }}>
                        {sidebarContent}
                    </div>
                </div>
            </div>

            {/* PREVIEW */}
            <div className="rhythmia-editor-preview-wrapper" id="editor-preview-wrapper">

                {/* Show sidebar toggle */}
                {!showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="rhythmia-sidebar-open-btn no-print"
                        title="Open Editor"
                    >
                        <span aria-hidden="true">»</span>
                        <span>Edit</span>
                    </button>
                )}

                {/* Zoom Controls */}
                <ZoomControls
                    zoom={zoom}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onFit={handleFit}
                />

                {/* Content Scaler */}
                <div className="rhythmia-editor-preview-content">
                    <div
                        className="rhythmia-editor-zoom-box"
                        style={contentSize.width ? {
                            width: `${contentSize.width * zoom}px`,
                            height: `${contentSize.height * zoom}px`,
                        } : undefined}
                    >
                        <div
                            ref={scalerRef}
                            id="editor-preview-scaler"
                            className="rhythmia-editor-preview-scaler"
                            style={{ transform: `scale(${zoom})` }}
                        >
                            {previewContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


import React, { useState, useEffect } from 'react';
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
    const [showSidebar, setShowSidebar] = useState(true);
    const { zoom, setZoom, handleFit } = zoomState;

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3.0));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));

    return (
        <div className="rhythmia-editor-layout">

            {/* SIDEBAR */}
            <div className={`rhythmia-editor-sidebar ${!showSidebar ? 'collapsed' : ''} no-print`}>
                <div className="rhythmia-editor-sidebar-content" data-lenis-prevent>

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
            <div className="rhythmia-editor-preview-wrapper" id="editor-preview-wrapper" data-lenis-prevent>

                {/* Show sidebar toggle */}
                {!showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="rhythmia-control-btn no-print"
                        style={{
                            position: 'fixed',
                            top: '20px',
                            left: '20px',
                            zIndex: 200,
                            background: '#333'
                        }}
                        title="Show Sidebar"
                    >
                        »
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
                    <div className="rhythmia-editor-preview-scaler" style={{ transform: `scale(${zoom})` }}>
                        {previewContent}
                    </div>
                </div>
            </div>
        </div>
    );
}


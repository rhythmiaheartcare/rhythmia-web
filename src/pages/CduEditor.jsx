import React, { useEffect } from 'react';
import CduTemplate, { defaultCduData } from '../components/Cdu/CduTemplate';
import EditorLayout from '../components/Editor/EditorLayout';
import { EditorSection, EditorInput } from '../components/Editor/EditorComponents';
import { useEditorState } from '../hooks/useEditorState';

export default function CduEditor() {
    const {
        data,
        isLoaded,
        updateField,
        updateArrayItem,
        updateObjectArrayItem,
        zoomState,
        actions
    } = useEditorState('rhythmia_cdu_data_v5', defaultCduData, 0.4, 3200);

    useEffect(() => {
        document.title = "Rhythmia Heart Care Stand";
        return () => { document.title = "Rhythmia"; };
    }, []);

    const getExportFileName = () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        return `rhythmia-cdu-${date}_${h}-${m}-${s}.json`;
    };

    if (!isLoaded) return null;

    const sidebarContent = (
        <>
            <EditorSection title="Header (Back Board)">
                <EditorInput label="Title (Use <br/> for new line)" value={data.header.title} onChange={v => updateField('header.title', v)} textarea />
                <EditorInput label="Subtitle" value={data.header.subtitle} onChange={v => updateField('header.subtitle', v)} textarea />
                <EditorInput label="Badge Text" value={data.header.badge} onChange={v => updateField('header.badge', v)} />
                <EditorInput label="Website" value={data.base.website} onChange={v => updateField('base.website', v)} />
                <EditorInput label="Photo URL" value={data.header.photoUrl} onChange={v => updateField('header.photoUrl', v)} />
            </EditorSection>

            <EditorSection title="Left Side Panel (Benefits)">
                {data.sides.leftBenefits?.map((benefit, i) => (
                    <div key={i} style={{ marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#888' }}>Benefit {i + 1}</span>
                        </div>
                        <EditorInput
                            label="Title"
                            value={benefit.title}
                            onChange={(v) => updateObjectArrayItem('sides.leftBenefits', i, 'title', v)}
                        />
                        <EditorInput
                            label="Text"
                            value={benefit.text}
                            onChange={(v) => updateObjectArrayItem('sides.leftBenefits', i, 'text', v)}
                            textarea
                        />
                    </div>
                ))}
            </EditorSection>

            <EditorSection title="Right Side Panel (Action)">
                <EditorInput label="Title (Use <br/> for new line)" value={data.sides.rightTitle} onChange={v => updateField('sides.rightTitle', v)} textarea />
                <EditorInput label="Subtitle" value={data.sides.rightSubtitle} onChange={v => updateField('sides.rightSubtitle', v)} textarea />
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}>
                    <input
                        type="checkbox"
                        checked={data.sides.showQrCode}
                        onChange={(e) => updateField('sides.showQrCode', e.target.checked)}
                    />
                    Show QR Code
                </label>
            </EditorSection>

            <EditorSection title="Shelf Lips & Leaflet Holder">
                <EditorInput label="Top Shelf Text" value={data.shelves.topText} onChange={v => updateField('shelves.topText', v)} />
                <EditorInput label="Leaflet Holder Text" value={data.leaflet?.text || ''} onChange={v => updateField('leaflet.text', v)} />
            </EditorSection>
        </>
    );

    return (
        <EditorLayout
            title="Stand Editor"
            sidebarContent={sidebarContent}
            previewContent={<CduTemplate data={data} />}
            onExport={() => actions.handleExport(getExportFileName())}
            onImport={actions.handleImport}
            onPrint={actions.handlePrint}
            onReset={actions.handleReset}
            zoomState={zoomState}
        />
    );
}

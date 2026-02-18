import React, { useEffect } from 'react';
import LeafletTemplate, { defaultLeafletData } from '../components/Leaflet/LeafletTemplate';
import EditorLayout from '../components/Editor/EditorLayout';
import { EditorSection, EditorInput } from '../components/Editor/EditorComponents';
import { useEditorState } from '../hooks/useEditorState';

export default function LeafletEditor() {
    const {
        data,
        isLoaded,
        updateField,
        updateArrayItem,
        updateObjectArrayItem,
        zoomState,
        actions
    } = useEditorState('rhythmia_leaflet_data', defaultLeafletData, 0.8, 800);

    useEffect(() => {
        document.title = "Rhythmia Heart Care Leaflet";
        return () => { document.title = "Rhythmia"; };
    }, []);

    const getExportFileName = () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        return `rhythmia-leaflet-${date}_${h}-${m}-${s}.json`;
    };

    if (!isLoaded) return null;

    const sidebarContent = (
        <>
            <EditorSection title="Front Page">
                <EditorInput label="Title" value={data.front.title} onChange={v => updateField('front.title', v)} textarea />
                <EditorInput label="Subtitle" value={data.front.subtitle} onChange={v => updateField('front.subtitle', v)} textarea />
                <EditorInput label="Badge Text" value={data.front.badge} onChange={v => updateField('front.badge', v)} />
            </EditorSection>

            <EditorSection title="Back Page - Header & Image">
                <EditorInput label="Developed By" value={data.back.developedBy} onChange={v => updateField('back.developedBy', v)} />
                <EditorInput label="Nature Image Overlay" value={data.back.natureImageText} onChange={v => updateField('back.natureImageText', v)} />
            </EditorSection>

            <EditorSection title="Back Page - Introduction">
                <EditorInput label="Why Title" value={data.back.whyTitle} onChange={v => updateField('back.whyTitle', v)} />
                <EditorInput label="Why Text" value={data.back.whyText} onChange={v => updateField('back.whyText', v)} textarea />

                <EditorInput label="Science Title" value={data.back.scienceTitle} onChange={v => updateField('back.scienceTitle', v)} />
                <EditorInput label="Science Text" value={data.back.scienceText} onChange={v => updateField('back.scienceText', v)} textarea />
            </EditorSection>

            <EditorSection title="Back Page - Benefits">
                {data.back.benefits && data.back.benefits.map((b, idx) => (
                    <div key={idx} style={{ marginBottom: '10px', padding: '10px', background: '#222', borderRadius: '4px' }}>
                        <EditorInput label={`Benefit ${idx + 1} Title`} value={b.title} onChange={v => updateObjectArrayItem('back.benefits', idx, 'title', v)} />
                        <EditorInput label="Text" value={b.text} onChange={v => updateObjectArrayItem('back.benefits', idx, 'text', v)} />
                    </div>
                ))}
            </EditorSection>

            <EditorSection title="Back Page - Footer">
                <EditorInput label="Email" value={data.back.contactEmail} onChange={v => updateField('back.contactEmail', v)} />
                <EditorInput label="Website" value={data.back.contactWeb} onChange={v => updateField('back.contactWeb', v)} />
                <EditorInput label="Social" value={data.back.contactSocial} onChange={v => updateField('back.contactSocial', v)} />
            </EditorSection>
        </>
    );

    return (
        <EditorLayout
            title="Leaflet Editor"
            sidebarContent={sidebarContent}
            previewContent={<LeafletTemplate data={data} />}
            onExport={() => actions.handleExport(getExportFileName())}
            onImport={actions.handleImport}
            onPrint={actions.handlePrint}
            onReset={actions.handleReset}
            zoomState={zoomState}
        />
    );
}

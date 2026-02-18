import React, { useEffect } from 'react';
import BusinessCardTemplate, { defaultCardData } from '../components/BusinessCard/BusinessCardTemplate';
import EditorLayout from '../components/Editor/EditorLayout';
import { EditorSection, EditorInput } from '../components/Editor/EditorComponents';
import { useEditorState } from '../hooks/useEditorState';
import '../components/BusinessCard/BusinessCard.css'; // Keep template styles

export default function BusinessCardEditor() {
    const {
        data,
        isLoaded,
        updateField,
        zoomState,
        actions
    } = useEditorState('rhythmia_business_card_data', defaultCardData, 2.0, 320);

    useEffect(() => {
        document.title = "Rhythmia Heart Care Card";
        return () => { document.title = "Rhythmia"; };
    }, []);

    const getExportFileName = () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        return `rhythmia-business-card-${date}_${h}-${m}-${s}.json`;
    };

    if (!isLoaded) return null;

    // Helper for business card nested updates if needed, though useEditorState updateField handles dot notation
    // The original BusinessCardEditor used updateField(section, field, value)
    // My hook uses updateField(path, value). So I need to adapt the calls.
    // updateField('front.tagline', v)

    const sidebarContent = (
        <>
            <EditorSection title="Front Side">
                <EditorInput label="Tagline" value={data.front.tagline} onChange={v => updateField('front.tagline', v)} />
            </EditorSection>

            <EditorSection title="Back Side (Contact)">
                <EditorInput label="Full Name" value={data.back.name} onChange={v => updateField('back.name', v)} />
                <EditorInput label="Job Title" value={data.back.title} onChange={v => updateField('back.title', v)} />
                <EditorInput label="Email" value={data.back.email} onChange={v => updateField('back.email', v)} />
                <EditorInput label="Phone" value={data.back.phone} onChange={v => updateField('back.phone', v)} />
                <EditorInput label="Website" value={data.back.website} onChange={v => updateField('back.website', v)} />
                <EditorInput label="Address" value={data.back.address} onChange={v => updateField('back.address', v)} />
                <EditorInput label="QR Label" value={data.back.qrLabel} onChange={v => updateField('back.qrLabel', v)} />
            </EditorSection>
        </>
    );

    return (
        <EditorLayout
            title="Business Card Editor"
            sidebarContent={sidebarContent}
            previewContent={<BusinessCardTemplate data={data} />}
            onExport={() => actions.handleExport(getExportFileName())}
            onImport={actions.handleImport}
            onPrint={actions.handlePrint}
            onReset={actions.handleReset}
            zoomState={zoomState}
        />
    );
}

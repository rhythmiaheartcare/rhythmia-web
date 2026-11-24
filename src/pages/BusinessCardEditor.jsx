import { useEffect } from 'react';
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
    } = useEditorState('rhythmia_business_card_v7', defaultCardData, 2.0, 320);

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

    const sidebarContent = (
        <>
            <EditorSection title="Thank-you side">
                <EditorInput label="Heading" value={data.front.heading} onChange={v => updateField('front.heading', v)} />
                <EditorInput label="Message" textarea value={data.front.message} onChange={v => updateField('front.message', v)} />
            </EditorSection>

            <EditorSection title="Contact side (leave a field blank to hide it)">
                <EditorInput label="Heading" value={data.back.heading} onChange={v => updateField('back.heading', v)} />
                <EditorInput label="Email" value={data.back.email} onChange={v => updateField('back.email', v)} />
                <EditorInput label="Website" value={data.back.website} onChange={v => updateField('back.website', v)} />
                <EditorInput label="QR label" value={data.back.qrLabel} onChange={v => updateField('back.qrLabel', v)} />
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

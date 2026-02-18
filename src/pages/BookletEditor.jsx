import React, { useEffect } from 'react';
import BookletTemplate, { defaultBookletData } from '../components/Booklet/BookletTemplate';
import EditorLayout from '../components/Editor/EditorLayout';
import { EditorSection, EditorInput } from '../components/Editor/EditorComponents';
import { useEditorState } from '../hooks/useEditorState';

export default function BookletEditor() {
    const {
        data,
        isLoaded,
        updateField,
        updateArrayItem,
        updateObjectArrayItem,
        zoomState,
        actions
    } = useEditorState('rhythmia_booklet_data', defaultBookletData, 0.8, 1150);

    useEffect(() => {
        document.title = "Rhythmia Heart Care Booklet";
        return () => { document.title = "Rhythmia"; };
    }, []);

    const getExportFileName = () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        return `rhythmia-booklet-${date}_${h}-${m}-${s}.json`;
    };

    if (!isLoaded) return null;

    const sidebarContent = (
        <>
            <EditorSection title="Front Cover">
                <EditorInput label="Title (Use <br/> for new line)" value={data.frontCover.title} onChange={v => updateField('frontCover.title', v)} textarea />
                <EditorInput label="Subtitle" value={data.frontCover.subtitle} onChange={v => updateField('frontCover.subtitle', v)} textarea />
                <EditorInput label="Badge Text" value={data.frontCover.badge} onChange={v => updateField('frontCover.badge', v)} />
            </EditorSection>

            <EditorSection title="Inside Left (Page 2)">
                <EditorInput label="Title" value={data.insideLeft.title} onChange={v => updateField('insideLeft.title', v)} />
                <EditorInput label="Intro Text" value={data.insideLeft.intro} onChange={v => updateField('insideLeft.intro', v)} textarea />
                <EditorInput label="Science Header" value={data.insideLeft.scienceTitle} onChange={v => updateField('insideLeft.scienceTitle', v)} />
                <EditorInput label="Science Text" value={data.insideLeft.scienceText} onChange={v => updateField('insideLeft.scienceText', v)} textarea />
                <EditorInput label="Nature Image Overlay" value={data.insideLeft.natureImageText} onChange={v => updateField('insideLeft.natureImageText', v)} />
            </EditorSection>

            <EditorSection title="Inside Right (Page 3)">
                <EditorInput label="Benefits Title" value={data.insideRight.keyBenefitsTitle} onChange={v => updateField('insideRight.keyBenefitsTitle', v)} />
                <h4 style={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>Benefits List</h4>
                {data.insideRight.benefits.map((benefit, idx) => (
                    <div key={idx} style={{ marginBottom: '10px', padding: '10px', background: '#222', borderRadius: '4px' }}>
                        <EditorInput label={`Item ${idx + 1} Title`} value={benefit.title} onChange={v => updateObjectArrayItem('insideRight.benefits', idx, 'title', v)} />
                        <EditorInput label={`Item ${idx + 1} Text`} value={benefit.text} onChange={v => updateObjectArrayItem('insideRight.benefits', idx, 'text', v)} />
                    </div>
                ))}
            </EditorSection>

            <EditorSection title="Back Cover - Copy">
                <EditorInput label="Developed By" value={data.backCover.developedBy} onChange={v => updateField('backCover.developedBy', v)} />
                <EditorInput label="Evidence Title" value={data.backCover.evidenceTitle} onChange={v => updateField('backCover.evidenceTitle', v)} />
                <EditorInput label="Evidence Intro" value={data.backCover.evidenceIntro} onChange={v => updateField('backCover.evidenceIntro', v)} textarea />
            </EditorSection>

            <EditorSection title="Back Cover - Ingredients">
                {data.backCover.ingredients.map((ing, idx) => (
                    <div key={idx} style={{ marginBottom: '10px', padding: '10px', background: '#222', borderRadius: '4px' }}>
                        <EditorInput label="Name" value={ing.name} onChange={v => updateObjectArrayItem('backCover.ingredients', idx, 'name', v)} />
                        <EditorInput label="Role" value={ing.role} onChange={v => updateObjectArrayItem('backCover.ingredients', idx, 'role', v)} />
                        <EditorInput label="Research" value={ing.research} onChange={v => updateObjectArrayItem('backCover.ingredients', idx, 'research', v)} textarea />
                    </div>
                ))}
            </EditorSection>

            <EditorSection title="Back Cover - Contact & Legal">
                <EditorInput label="Disclaimer" value={data.backCover.disclaimer} onChange={v => updateField('backCover.disclaimer', v)} textarea />
                <EditorInput label="Email" value={data.backCover.contactEmail} onChange={v => updateField('backCover.contactEmail', v)} />
                <EditorInput label="Website" value={data.backCover.contactWeb} onChange={v => updateField('backCover.contactWeb', v)} />
                <EditorInput label="Social Handle" value={data.backCover.contactSocial} onChange={v => updateField('backCover.contactSocial', v)} />
            </EditorSection>

            <EditorSection title="References">
                {data.backCover.references.map((ref, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                        <EditorInput label={`Ref ${idx + 1} `} value={ref} onChange={v => updateArrayItem('backCover.references', idx, v)} />
                    </div>
                ))}
            </EditorSection>
        </>
    );

    return (
        <EditorLayout
            title="Booklet Editor"
            sidebarContent={sidebarContent}
            previewContent={<BookletTemplate data={data} />}
            onExport={() => actions.handleExport(getExportFileName())}
            onImport={actions.handleImport}
            onPrint={actions.handlePrint}
            onReset={actions.handleReset}
            zoomState={zoomState}
        />
    );
}

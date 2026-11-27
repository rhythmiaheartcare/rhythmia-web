import { useEffect } from 'react';
import ThankYouCardTemplate from '../components/ThankYouCard/ThankYouCardTemplate';
import { defaultThankYouCardData } from '../components/ThankYouCard/defaultThankYouCardData';
import EditorLayout from '../components/Editor/EditorLayout';
import { EditorSection, EditorInput } from '../components/Editor/EditorComponents';
import { useEditorState } from '../hooks/useEditorState';
import '../components/ThankYouCard/ThankYouCard.css';

export default function ThankYouCardEditor() {
    const {
        data,
        isLoaded,
        updateField,
        zoomState,
        actions,
    } = useEditorState('rhythmia_thank_you_card_v3', defaultThankYouCardData, 1.8, 360);

    const includeBleed = data.print?.includeBleed ?? true;
    const showGuides = data.print?.showGuides ?? true;
    const showEcg = data.front?.showEcg ?? true;

    useEffect(() => {
        document.title = 'Rhythmia Thank You Card';
        return () => { document.title = 'Rhythmia'; };
    }, []);

    /* Inject a route-scoped @page rule so switching between 3mm bleed (91×61mm)
       and exact trim (85×55mm) updates the browser PDF page box cleanly without
       colliding with other print editors in the app. */
    useEffect(() => {
        const pageW = includeBleed ? '91mm' : '85mm';
        const pageH = includeBleed ? '61mm' : '55mm';
        const styleEl = document.createElement('style');
        styleEl.id = 'tyc-dynamic-print-page';
        styleEl.textContent = `@media print { @page { size: ${pageW} ${pageH}; margin: 0; } }`;
        document.head.appendChild(styleEl);
        return () => {
            styleEl.remove();
        };
    }, [includeBleed]);

    const getExportFileName = () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        return `rhythmia-thank-you-card-${date}_${h}-${m}-${s}.json`;
    };

    if (!isLoaded) return null;

    const sidebarContent = (
        <>
            <EditorSection title="Print setup (UK 85 × 55 mm)">
                <label className="tyc-toggle-row">
                    <span className="tyc-toggle-text">
                        <span className="tyc-toggle-title">Include 3 mm print bleed</span>
                        <span className="tyc-toggle-desc">
                            {includeBleed ? 'PDF size: 91 × 61 mm (recommended for UK printers)' : 'PDF size: 85 × 55 mm (exact trim only)'}
                        </span>
                    </span>
                    <input
                        type="checkbox"
                        checked={includeBleed}
                        onChange={e => updateField('print.includeBleed', e.target.checked)}
                    />
                </label>

                <label className="tyc-toggle-row">
                    <span className="tyc-toggle-text">
                        <span className="tyc-toggle-title">Show trim &amp; safe guides</span>
                        <span className="tyc-toggle-desc">Preview only — hidden when saving PDF</span>
                    </span>
                    <input
                        type="checkbox"
                        checked={showGuides}
                        onChange={e => updateField('print.showGuides', e.target.checked)}
                    />
                </label>

                <div className="tyc-print-tip">
                    <strong>Print-ready PDF tip:</strong> Click <strong>PRINT / SAVE PDF</strong>, select{' '}
                    <strong>Save as PDF</strong>, set <strong>Margins → None</strong>, and enable{' '}
                    <strong>Background graphics</strong>.
                </div>
            </EditorSection>

            <EditorSection title="Front side">
                <EditorInput
                    label="Heading (use Enter for line break)"
                    textarea
                    rows={2}
                    value={data.front?.heading}
                    onChange={v => updateField('front.heading', v)}
                />
                <label className="tyc-toggle-row">
                    <span className="tyc-toggle-text">
                        <span className="tyc-toggle-title">Show ECG pulse line</span>
                        <span className="tyc-toggle-desc">Subtle Lead II trace along lower right</span>
                    </span>
                    <input
                        type="checkbox"
                        checked={showEcg}
                        onChange={e => updateField('front.showEcg', e.target.checked)}
                    />
                </label>
            </EditorSection>

            <EditorSection title="Back side (leave blank to hide)">
                <EditorInput
                    label="Offer headline"
                    value={data.back?.offerHeadline}
                    onChange={v => updateField('back.offerHeadline', v)}
                />
                <EditorInput
                    label="Offer subheading"
                    value={data.back?.offerSubheading}
                    onChange={v => updateField('back.offerSubheading', v)}
                />
                <EditorInput
                    label="Code label"
                    value={data.back?.codeLabel}
                    onChange={v => updateField('back.codeLabel', v)}
                />
                <EditorInput
                    label="Discount code (leave blank for write-in line)"
                    value={data.back?.codeValue}
                    onChange={v => updateField('back.codeValue', v)}
                />
                <EditorInput
                    label="Code note"
                    value={data.back?.codeNote}
                    onChange={v => updateField('back.codeNote', v)}
                />
                <EditorInput
                    label="Website under QR"
                    value={data.back?.website}
                    onChange={v => updateField('back.website', v)}
                />
            </EditorSection>
        </>
    );

    return (
        <EditorLayout
            title="Thank You Card"
            sidebarContent={sidebarContent}
            previewContent={<ThankYouCardTemplate data={data} />}
            onExport={() => actions.handleExport(getExportFileName())}
            onImport={actions.handleImport}
            onPrint={actions.handlePrint}
            onReset={actions.handleReset}
            zoomState={zoomState}
        />
    );
}

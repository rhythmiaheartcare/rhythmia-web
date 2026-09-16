/* =============================================================================
   Evidence — ingredient research
   -----------------------------------------------------------------------------
   Every finding below is a published, citable result for the individual
   ingredient, not a claim about Rhythmia itself. Keep the `source` and `url`
   fields populated: an uncited figure on this page is worse than no figure.
   ========================================================================== */

import { Zap, Battery, Shield, Activity, Cpu, Network } from 'lucide-react'

export const ingredients = [
    {
        name: "Magnesium Bisglycinate",
        role: "Electrical Signalling",
        icon: <Zap size={20} />,
        tagline: "Regulates your heart\u2019s electrical rhythm",
        color: "#e63946",
        why: "Magnesium is involved in over 300 enzymatic reactions and is essential for regulating blood pressure, cardiac contractility, and electrical excitability. Low magnesium is consistently linked to higher risks of atrial fibrillation, heart failure, and arrhythmias.",
        whyBisglycinate: "Magnesium bisglycinate is one of the most bioavailable and well-tolerated forms. Unlike cheaper magnesium oxide, it is efficiently absorbed and far less likely to cause gastrointestinal side effects \u2014 important for daily use.",
        keyFindings: [
            { finding: "45% reduction in post-surgical atrial fibrillation", source: "Cochrane systematic review of randomised trials", url: "https://pubmed.ncbi.nlm.nih.gov/23440790/", chip: "PubMed" },
            { finding: "22% lower heart failure risk per 100 mg/day increase", source: "Del Gobbo et al. \u2014 meta-analysis of prospective cohorts", url: "https://pubmed.ncbi.nlm.nih.gov/23719551/", chip: "PubMed" },
            { finding: "50% higher AF risk in those with the lowest magnesium levels", source: "Framingham Heart Study (Khan et al., 2013) \u2014 3,530 participants", url: "https://pubmed.ncbi.nlm.nih.gov/23172839/", chip: "PubMed" },
            { finding: "Improved endothelial function and exercise tolerance in CAD", source: "Shechter et al. (2000) \u2014 double-blind RCT, 50 patients", url: "https://pubmed.ncbi.nlm.nih.gov/11067788/", chip: "PubMed" },
            { finding: "Lower heart failure and major cardiac event risk with long-term use", source: "Wu et al. (2025) \u2014 94,239 veterans", url: "https://pubmed.ncbi.nlm.nih.gov/40135571/", chip: "PubMed" },
        ],
        evidenceLevel: "Meta-analyses, large RCTs, prospective cohorts"
    },
    {
        name: "Coenzyme Q10 (CoQ10)",
        role: "Cellular Energy Production",
        icon: <Battery size={20} />,
        tagline: "Powers your heart muscle at the cellular level",
        color: "#e76f51",
        why: "CoQ10 is essential for producing ATP \u2014 the energy currency your heart cells need to beat. It is also a powerful antioxidant. Heart failure patients have been shown to have significantly reduced CoQ10 levels, and supplementation consistently improves cardiac function.",
        keyFindings: [
            { finding: "43% reduction in major cardiac events and cardiovascular death", source: "Q-SYMBIO trial (Mortensen et al., 2014) \u2014 420 HF patients, 2 years", url: "https://pubmed.ncbi.nlm.nih.gov/25282031/", chip: "PubMed" },
            { finding: "54% reduction in cardiovascular mortality", source: "KiSel-10 trial (Alehagen et al., 2013) \u2014 440 subjects, 5 years", url: "https://pubmed.ncbi.nlm.nih.gov/22626835/", chip: "PubMed" },
            { finding: "Significant improvements in ejection fraction across 13 RCTs", source: "Fotino et al. (2013) \u2014 meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/23221577/", chip: "PubMed" },
            { finding: "Improved cardiac strain, NT-proBNP, blood pressure, and 6-min walk distance", source: "JCM 2025 \u2014 RCT of 120 HF patients", url: "https://pubmed.ncbi.nlm.nih.gov/40507436/", chip: "PubMed" },
            { finding: "Reduced heart failure hospitalisations (73 vs 118, p<0.001)", source: "Italian multicentre trial \u2014 641 patients", url: "https://pubmed.ncbi.nlm.nih.gov/7752841/", chip: "PubMed" },
        ],
        evidenceLevel: "Multicentre RCTs, meta-analyses of 13+ RCTs"
    },
    {
        name: "L-Taurine",
        role: "Cell Membrane Stability",
        icon: <Shield size={20} />,
        tagline: "Stabilises your heart\u2019s cell membranes",
        color: "#2a9d8f",
        why: "Taurine makes up about 50% of the heart\u2019s free amino acid pool. It is critical for calcium handling, membrane stabilisation, and antioxidant defence. In Japan, taurine is a standard part of heart failure treatment. Deficiency causes cardiomyopathy in animal models.",
        keyFindings: [
            { finding: "Significant reductions in blood pressure, improved LVEF & NYHA class", source: "Tzang et al. (2024) \u2014 meta-analysis of 20 RCTs", url: "https://pubmed.ncbi.nlm.nih.gov/39148075/", chip: "PubMed" },
            { finding: "85% of peripartum cardiomyopathy patients improved NYHA class (vs 10% placebo)", source: "Zaki et al. (2021) \u2014 double-blind RCT, 40 ICU patients", url: "https://doi.org/10.4103/joacc.JOACC_36_20", chip: "DOI" },
            { finding: "Increased exercise time, distance, and metabolic equivalents in HF", source: "Beyranvand et al. (2011) \u2014 placebo-controlled trial", url: "https://pubmed.ncbi.nlm.nih.gov/21334852/", chip: "PubMed" },
            { finding: "Improved myocardial oxygen consumption and electrical activity", source: "Ahmadian et al. (2017) \u2014 double-blind RCT", url: "https://pubmed.ncbi.nlm.nih.gov/28118062/", chip: "PubMed" },
            { finding: "Lowers blood pressure and improves vascular function in prehypertension", source: "Sun et al. (2016) \u2014 double-blind placebo-controlled trial", url: "https://pubmed.ncbi.nlm.nih.gov/26781281/", chip: "PubMed" },
        ],
        evidenceLevel: "Meta-analysis of 20 RCTs, multiple placebo-controlled trials"
    },
    {
        name: "Thiamine (Vitamin B1)",
        role: "Cardiac Energy Metabolism",
        icon: <Cpu size={20} />,
        tagline: "Fuels your heart\u2019s energy-producing pathways",
        color: "#e9c46a",
        why: "Thiamine is a cofactor for key enzymes in cardiac energy metabolism. Deficiency is remarkably common in heart failure patients (21\u201398%) and directly impairs the heart\u2019s ability to produce energy. Severe deficiency causes a form of heart failure known as cardiovascular beriberi.",
        keyFindings: [
            { finding: "3.28% net improvement in LVEF vs placebo (no heterogeneity, I\u00B2=0%)", source: "DiNicolantonio et al. (2013) \u2014 meta-analysis of double-blind RCTs", url: "https://pubmed.ncbi.nlm.nih.gov/23910704/", chip: "PubMed" },
            { finding: "22% improvement in LVEF in thiamine-depleted CHF patients on diuretics", source: "Shimon et al. (1995) \u2014 landmark RCT, 30 patients", url: "https://pubmed.ncbi.nlm.nih.gov/7733128/", chip: "PubMed" },
            { finding: "Significant LVEF improvement of 3.30% in stable HF on diuretics", source: "Schoenenberger et al. (2012) \u2014 crossover pilot RCT", url: "https://pubmed.ncbi.nlm.nih.gov/22057652/", chip: "PubMed" },
            { finding: "Improved endothelial function across healthy and diabetic groups", source: "Arora et al. \u2014 clinical trial, 30 participants", url: "https://pubmed.ncbi.nlm.nih.gov/16741654/", chip: "PubMed" },
            { finding: "Promising improvements in cardiac function, symptoms, and thiamine status", source: "Xu & Ji (2022) \u2014 systematic review of all HF RCTs", url: "https://pubmed.ncbi.nlm.nih.gov/35842069/", chip: "PubMed" },
        ],
        evidenceLevel: "Meta-analyses of double-blind RCTs, systematic reviews"
    },
    {
        name: "Zinc",
        role: "Ion Channel Function",
        icon: <Activity size={20} />,
        tagline: "Supports the channels that control your heartbeat",
        color: "#457b9d",
        why: "Zinc modulates the sodium, calcium, and potassium ion channels essential for every heartbeat. It also influences beta-adrenergic receptors and has powerful antioxidant and membrane-stabilising properties. Low zinc is linked to arrhythmias, heart failure, and worse outcomes after heart attacks.",
        keyFindings: [
            { finding: "Modulates Na\u207A, Ca\u00B2\u207A, K\u207A channels essential for cardiac rhythm", source: "Kokhabi et al. (2025) \u2014 comprehensive review", url: "https://pubmed.ncbi.nlm.nih.gov/39301907/", chip: "PubMed" },
            { finding: "LVEF recovery from 27% to 42% with zinc/selenium repletion", source: "Frustaci et al. \u2014 18 cardiomyopathy patients", url: "https://pubmed.ncbi.nlm.nih.gov/22186680/", chip: "PubMed" },
            { finding: "15.7\u00D7 higher heart failure risk post-MI with low zinc levels", source: "Suzuki et al. (2024) \u2014 243 MI patients", url: "https://pubmed.ncbi.nlm.nih.gov/38355442/", chip: "PubMed" },
            { finding: "Prevented ventricular fibrillation in 83\u201391% of treated hearts", source: "Karagulova et al. \u2014 isolated heart studies", url: "https://pubmed.ncbi.nlm.nih.gov/17322024/", chip: "PubMed" },
            { finding: "Higher zinc intake linked to better systolic/diastolic function in elderly", source: "Olechnowicz et al. (2023) \u2014 270 elderly individuals", url: "https://pubmed.ncbi.nlm.nih.gov/36829824/", chip: "PubMed" },
        ],
        evidenceLevel: "Mechanistic reviews, clinical studies, observational cohorts"
    },
    {
        name: "Vitamin B12",
        role: "Autonomic Nerve Function",
        icon: <Network size={20} />,
        tagline: "Supports the nerves that regulate your heart rhythm",
        color: "#8338ec",
        why: "Vitamin B12 is essential for the autonomic nerves that control your heart rate and rhythm. Deficiency causes measurable changes in heart rate variability \u2014 a key marker of cardiac health \u2014 and is associated with altered ECG patterns that can predispose to arrhythmias.",
        keyFindings: [
            { finding: "B12 replacement fully normalised heart rate variability in deficient patients", source: "Aytemir et al. (2000) \u2014 power spectral analysis study", url: "https://pubmed.ncbi.nlm.nih.gov/10879381/", chip: "PubMed" },
            { finding: "Improved cardiac sympathetic function in healthy elderly after 3 months", source: "Sucharita et al. (2012) \u2014 47 elderly subjects", url: "https://pubmed.ncbi.nlm.nih.gov/22226502/", chip: "PubMed" },
            { finding: "Dose-response: higher B12 = lower autonomic neuropathy risk in diabetes", source: "Hansen et al. \u2014 469 type 2 diabetes patients", url: "https://pubmed.ncbi.nlm.nih.gov/27638143/", chip: "PubMed" },
            { finding: "B12 deficiency linked to prolonged QTc and arrhythmogenic ECG markers", source: "Yilmaz et al. (2022) \u2014 214 healthy adults", url: "https://pubmed.ncbi.nlm.nih.gov/35485384/", chip: "PubMed" },
            { finding: "B-vitamins including B12 protected cardiac autonomic function from pollution", source: "Zhong et al. (2017) \u2014 crossover pilot trial", url: "https://pubmed.ncbi.nlm.nih.gov/28367952/", chip: "PubMed" },
        ],
        evidenceLevel: "Clinical trials, prospective studies, crossover trials"
    },
];

export const summaryData = [
    { ingredient: "Magnesium", role: "Electrical signalling", highlight: "45% reduction in post-surgical AF; 22% lower HF risk per 100mg/day", evidence: "Meta-analyses & large RCTs" },
    { ingredient: "CoQ10", role: "Cellular energy", highlight: "43% reduction in major cardiac events; 54% lower CV mortality (with selenium)", evidence: "Multicentre RCTs" },
    { ingredient: "L-Taurine", role: "Membrane stability", highlight: "Improved LVEF, BP, NYHA class across 20 RCTs; standard HF therapy in Japan", evidence: "Meta-analysis of 20 RCTs" },
    { ingredient: "Thiamine (B1)", role: "Energy metabolism", highlight: "Up to 22% LVEF improvement in depleted patients; improved endothelial function", evidence: "Meta-analyses of RCTs" },
    { ingredient: "Zinc", role: "Ion channel function", highlight: "Modulates Na\u207A/Ca\u00B2\u207A/K\u207A channels; LVEF recovery from 27% \u2192 42% with repletion", evidence: "Reviews & clinical studies" },
    { ingredient: "Vitamin B12", role: "Autonomic nerves", highlight: "Normalised heart rate variability; dose-dependent autonomic protection", evidence: "Clinical & crossover trials" },
];

/* Who the product is for. Shared by the Evidence and Product pages. */
export const audiences = [
    {
        title: 'Cardiac Patients',
        desc: 'Originally created for people living with heart disease, palpitations, arrhythmias, or heart failure. Provides targeted nutritional support alongside your medical treatment.',
    },
    {
        title: 'Those on Heart Medications',
        desc: 'Common cardiac medications such as diuretics can deplete key nutrients like thiamine and magnesium. Rhythmia helps replenish what your medications may remove.',
    },
    {
        title: 'Proactive Heart Health',
        desc: 'Even without a diagnosis, supporting your heart with evidence-based nutrients is a smart long-term strategy — particularly with a family history of heart disease.',
    },
]

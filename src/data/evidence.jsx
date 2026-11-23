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
            { finding: "45% lower odds of atrial fibrillation after heart surgery", source: "Arsenault et al. (2013) \u2014 Cochrane review of 118 randomised trials, 17,364 patients", url: "https://pubmed.ncbi.nlm.nih.gov/23440790/", chip: "PubMed" },
            { finding: "22% lower risk of ischaemic heart disease per 200 mg/day of dietary magnesium", source: "Del Gobbo et al. (2013) \u2014 meta-analysis of 16 cohort studies, 313,041 people", url: "https://pubmed.ncbi.nlm.nih.gov/23719551/", chip: "PubMed" },
            { finding: "50% higher risk of atrial fibrillation in people with the lowest magnesium levels", source: "Khan et al. (2013) \u2014 Framingham Heart Study, 3,530 people", url: "https://pubmed.ncbi.nlm.nih.gov/23172839/", chip: "PubMed" },
            { finding: "Better blood vessel function and exercise tolerance in coronary artery disease", source: "Shechter et al. (2000) \u2014 double-blind randomised trial, 50 patients", url: "https://pubmed.ncbi.nlm.nih.gov/11067788/", chip: "PubMed" },
            { finding: "Lower risk of heart failure and major cardiac events with long-term use", source: "Cheng et al. (2025) \u2014 cohort study, 94,239 veterans with diabetes", url: "https://pubmed.ncbi.nlm.nih.gov/40135571/", chip: "PubMed" },
        ],
        evidenceLevel: "Meta-analyses, randomised trials and cohort studies"
    },
    {
        name: "Coenzyme Q10 (CoQ10)",
        role: "Cellular Energy Production",
        icon: <Battery size={20} />,
        tagline: "Powers your heart muscle at the cellular level",
        color: "#e76f51",
        why: "CoQ10 is essential for producing ATP \u2014 the energy currency your heart cells need to beat. It is also a powerful antioxidant. Heart failure patients have been shown to have significantly reduced CoQ10 levels, and supplementation consistently improves cardiac function.",
        keyFindings: [
            { finding: "Major cardiac events halved over 2 years (15% vs 26%)", source: "Mortensen et al. (2014) \u2014 Q-SYMBIO double-blind randomised trial, 420 heart failure patients", url: "https://pubmed.ncbi.nlm.nih.gov/25282031/", chip: "PubMed" },
            { finding: "Cardiovascular deaths more than halved over 5 years when combined with selenium", source: "Alehagen et al. (2013) \u2014 KiSel-10 double-blind randomised trial, 443 older adults", url: "https://pubmed.ncbi.nlm.nih.gov/22626835/", chip: "PubMed" },
            { finding: "3.7% average improvement in ejection fraction", source: "Fotino et al. (2013) \u2014 meta-analysis of 13 randomised trials", url: "https://pubmed.ncbi.nlm.nih.gov/23221577/", chip: "PubMed" },
            { finding: "Better heart muscle function, NT-proBNP, blood pressure and walking distance", source: "Bodea et al. (2025) \u2014 randomised trial, 120 heart failure patients", url: "https://pubmed.ncbi.nlm.nih.gov/40507436/", chip: "PubMed" },
            { finding: "Fewer hospital admissions for heart failure (73 vs 118 patients)", source: "Morisco et al. (1993) \u2014 double-blind randomised trial, 641 heart failure patients", url: "https://pubmed.ncbi.nlm.nih.gov/8241697/", chip: "PubMed" },
        ],
        evidenceLevel: "Randomised trials and a meta-analysis"
    },
    {
        name: "L-Taurine",
        role: "Cell Membrane Stability",
        icon: <Shield size={20} />,
        tagline: "Stabilises your heart\u2019s cell membranes",
        color: "#2a9d8f",
        why: "Taurine makes up about 50% of the heart\u2019s free amino acid pool. It is critical for calcium handling, membrane stabilisation, and antioxidant defence. In Japan, taurine is a standard part of heart failure treatment. Deficiency causes cardiomyopathy in animal models.",
        keyFindings: [
            { finding: "Lower blood pressure and heart rate, with better ejection fraction and heart failure class", source: "Tzang et al. (2024) \u2014 meta-analysis of 20 randomised trials, 808 people", url: "https://pubmed.ncbi.nlm.nih.gov/39148075/", chip: "PubMed" },
            { finding: "85% of peripartum cardiomyopathy patients improved their heart failure class (vs 10% on placebo)", source: "Zaki et al. (2021) \u2014 double-blind randomised trial, 40 ICU patients", url: "https://doi.org/10.4103/joacc.JOACC_36_20", chip: "DOI" },
            { finding: "Longer exercise time and distance in heart failure", source: "Beyranvand et al. (2011) \u2014 single-blind randomised trial, 29 heart failure patients", url: "https://pubmed.ncbi.nlm.nih.gov/21334852/", chip: "PubMed" },
            { finding: "Lower blood pressure and better blood vessel function in prehypertension", source: "Sun et al. (2016) \u2014 double-blind randomised trial, 120 people", url: "https://pubmed.ncbi.nlm.nih.gov/26781281/", chip: "PubMed" },
        ],
        evidenceLevel: "A meta-analysis and randomised trials"
    },
    {
        name: "Thiamine (Vitamin B1)",
        role: "Cardiac Energy Metabolism",
        icon: <Cpu size={20} />,
        tagline: "Fuels your heart\u2019s energy-producing pathways",
        color: "#e9c46a",
        why: "Thiamine is a cofactor for key enzymes in cardiac energy metabolism. Deficiency is remarkably common in heart failure patients (21\u201398%) and directly impairs the heart\u2019s ability to produce energy. Severe deficiency causes a form of heart failure known as cardiovascular beriberi.",
        keyFindings: [
            { finding: "3.3% net improvement in ejection fraction compared with placebo", source: "DiNicolantonio et al. (2013) \u2014 meta-analysis of 2 double-blind randomised trials", url: "https://pubmed.ncbi.nlm.nih.gov/24357996/", chip: "PubMed" },
            { finding: "22% rise in ejection fraction in heart failure patients on long-term diuretics", source: "Shimon et al. (1995) \u2014 double-blind randomised trial, 30 heart failure patients", url: "https://pubmed.ncbi.nlm.nih.gov/7733128/", chip: "PubMed" },
            { finding: "Ejection fraction 3.9% higher than placebo after 28 days", source: "Schoenenberger et al. (2012) \u2014 double-blind crossover trial, 9 heart failure patients", url: "https://pubmed.ncbi.nlm.nih.gov/22057652/", chip: "PubMed" },
            { finding: "Better blood vessel function in healthy people and people with diabetes", source: "Arora et al. (2006) \u2014 clinical study, 30 people", url: "https://pubmed.ncbi.nlm.nih.gov/16741654/", chip: "PubMed" },
        ],
        evidenceLevel: "A meta-analysis and randomised trials"
    },
    {
        name: "Zinc",
        role: "Ion Channel Function",
        icon: <Activity size={20} />,
        tagline: "Supports the channels that control your heartbeat",
        color: "#457b9d",
        why: "Zinc modulates the sodium, calcium, and potassium ion channels essential for every heartbeat. It also influences beta-adrenergic receptors and has powerful antioxidant and membrane-stabilising properties. Low zinc is linked to arrhythmias, heart failure, and worse outcomes after heart attacks.",
        keyFindings: [
            { finding: "Zinc controls the sodium, calcium and potassium channels that set heart rhythm", source: "Kokhabi et al. (2025) \u2014 review of the research", url: "https://pubmed.ncbi.nlm.nih.gov/39301907/", chip: "PubMed" },
            { finding: "Heart size and function recovered after zinc and selenium were restored", source: "Frustaci et al. (2012) \u2014 clinical study, 18 cardiomyopathy patients", url: "https://pubmed.ncbi.nlm.nih.gov/22186680/", chip: "PubMed" },
            { finding: "15.7 times higher risk of heart failure admission after a heart attack with low zinc", source: "Tanita et al. (2024) \u2014 cohort study, 243 heart attack patients", url: "https://pubmed.ncbi.nlm.nih.gov/38355442/", chip: "PubMed" },
            { finding: "Arrhythmias more than halved and heart recovery improved after restricted blood flow", source: "Karagulova et al. (2007) \u2014 laboratory study in isolated hearts", url: "https://pubmed.ncbi.nlm.nih.gov/17322024/", chip: "PubMed" },
            { finding: "Higher zinc intake linked to better heart function in older adults", source: "Szadkowska et al. (2023) \u2014 cross-sectional study, 251 older adults", url: "https://pubmed.ncbi.nlm.nih.gov/36829824/", chip: "PubMed" },
        ],
        evidenceLevel: "Reviews, clinical studies and cohort studies"
    },
    {
        name: "Vitamin B12",
        role: "Autonomic Nerve Function",
        icon: <Network size={20} />,
        tagline: "Supports the nerves that regulate your heart rhythm",
        color: "#8338ec",
        why: "Vitamin B12 is essential for the autonomic nerves that control your heart rate and rhythm. Deficiency causes measurable changes in heart rate variability \u2014 a key marker of cardiac health \u2014 and is associated with altered ECG patterns that can predispose to arrhythmias.",
        keyFindings: [
            { finding: "B12 replacement restored normal heart rate variability in deficient patients", source: "Aytemir et al. (2000) \u2014 clinical study, 32 people", url: "https://pubmed.ncbi.nlm.nih.gov/10879381/", chip: "PubMed" },
            { finding: "Better heart rate variability in older adults after 3 months of B12", source: "Sucharita et al. (2012) \u2014 supplementation study, 47 older adults", url: "https://pubmed.ncbi.nlm.nih.gov/22226502/", chip: "PubMed" },
            { finding: "Higher B12 levels linked to lower risk of nerve damage affecting the heart in diabetes", source: "Hansen et al. (2017) \u2014 cross-sectional study, 469 type 2 diabetes patients", url: "https://pubmed.ncbi.nlm.nih.gov/27638143/", chip: "PubMed" },
            { finding: "Low B12 linked to ECG changes that can predispose to arrhythmias", source: "Y\u0131lmaz et al. (2022) \u2014 cross-sectional study, 214 healthy adults", url: "https://pubmed.ncbi.nlm.nih.gov/35485384/", chip: "PubMed" },
            { finding: "B vitamins including B12 protected heart rhythm control from air pollution", source: "Zhong et al. (2017) \u2014 single-blind crossover trial, 10 healthy adults", url: "https://pubmed.ncbi.nlm.nih.gov/28367952/", chip: "PubMed" },
        ],
        evidenceLevel: "Clinical studies and crossover trials"
    },
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

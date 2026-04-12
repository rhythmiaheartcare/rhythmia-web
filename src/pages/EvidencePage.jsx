import { useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Battery, Shield, Activity, Cpu, Network, ChevronDown, Award } from 'lucide-react';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const ClinicallyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const VeganIcon = () => (
    <svg viewBox="0 0 446 374" style={{ fill: 'currentColor', stroke: 'none' }}>
        <g transform="translate(0,374) scale(0.05,-0.05)">
            <path d="M8130 7112 c-1743 -767 -3083 -2094 -3537 -3505 -235 -730 -293 -1650 -150 -2385 l21 -108 254 498 c475 928 956 1671 1523 2346 188 225 419 465 419 437 0 -57 -328 -719 -834 -1685 -416 -791 -802 -1615 -1048 -2236 l-39 -96 96 55 c2319 1347 3333 2965 3555 5677 38 458 41 1110 5 1109 -14 0 -133 -48 -265 -107z" />
            <path d="M860 5307 c3 -1454 561 -2765 1520 -3576 405 -342 1433 -1025 1476 -981 31 30 -485 963 -956 1730 -379 618 -607 1019 -589 1038 16 16 508 -491 706 -728 329 -394 636 -821 899 -1252 37 -59 61 -85 53 -58 -30 115 -33 1047 -3 1270 l30 220 -52 130 c-302 762 -1070 1490 -2129 2017 -321 160 -736 333 -900 374 l-55 13 0 -197z" />
        </g>
    </svg>
);

const GMPIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UKMapIcon = () => (
    <svg viewBox="0 0 496 355" style={{ fill: 'currentColor', stroke: 'none' }}>
        <g transform="translate(0,355) scale(0.05,-0.05)">
            <path d="M1190 6404 c55 -31 280 -160 500 -287 220 -127 679 -391 1020 -587 341 -196 829 -476 1084 -623 256 -147 470 -267 475 -267 6 0 11 410 11 910 l0 910 -1595 0 -1595 -1 100 -55z" />
            <path d="M4800 5190 l0 -1270 -2050 0 -2050 0 0 -380 0 -380 2050 0 2050 0 5 -1275 5 -1275 370 0 370 0 5 1275 5 1275 2050 0 2050 0 0 380 0 380 -2050 0 -2050 0 0 1270 0 1270 -380 0 -380 0 0 -1270z" />
            <path d="M6080 5550 c0 -500 5 -910 11 -910 6 0 381 213 835 473 453 260 1148 659 1544 887 396 227 738 423 760 436 30 17 -346 23 -1555 23 l-1595 1 0 -910z" />
            <path d="M700 5262 l0 -822 1410 0 c776 0 1410 4 1410 9 0 13 -128 87 -1930 1120 -418 239 -789 453 -825 475 l-65 39 0 -821z" />
            <path d="M9390 5926 c-242 -141 -669 -387 -1990 -1145 -291 -167 -539 -312 -549 -322 -12 -12 526 -19 1395 -19 l1414 0 0 820 c0 451 -2 820 -5 819 -3 -1 -122 -69 -265 -153z" />
            <path d="M700 1820 c0 -451 4 -820 8 -820 5 0 241 134 525 297 763 439 1678 965 2002 1150 156 90 285 170 285 178 0 8 -634 15 -1410 15 l-1410 0 0 -820z" />
            <path d="M6840 2625 c1 -8 228 -145 505 -304 629 -359 1316 -754 1872 -1075 235 -135 430 -246 435 -246 4 0 8 369 8 820 l0 820 -1410 0 c-775 0 -1410 -7 -1410 -15z" />
            <path d="M6085 1526 l5 -916 1575 -5 c866 -3 1575 2 1575 10 0 8 -66 52 -145 98 -80 45 -442 253 -805 462 -532 305 -2133 1224 -2195 1259 -9 5 -13 -404 -10 -908z" />
            <path d="M3470 1979 c-418 -241 -1117 -643 -1554 -893 -437 -251 -787 -463 -779 -471 8 -8 717 -13 1574 -10 l1559 5 5 905 c4 718 0 905 -20 904 -14 -1 -367 -199 -785 -440z" />
        </g>
    </svg>
);

const BunnyIcon = () => (
    <svg viewBox="0 0 600 600" style={{ fill: 'currentColor', stroke: 'none' }}>
        <g transform="translate(0,600) scale(0.1,-0.1)">
            <path d="M2183 5829 c-70 -34 -105 -72 -134 -149 -35 -92 -19 -221 38 -298 28 -38 28 -38 -77 -46 -167 -13 -282 -71 -336 -168 -24 -44 -29 -64 -28 -118 2 -177 116 -318 340 -420 112 -51 127 -57 161 -64 18 -4 35 -12 38 -17 4 -5 15 -9 25 -9 11 0 34 -6 52 -14 18 -8 80 -29 138 -46 58 -18 114 -36 125 -40 11 -5 49 -18 85 -30 36 -12 74 -26 85 -31 11 -5 45 -18 75 -29 75 -28 69 -26 290 -134 107 -53 205 -104 218 -114 l24 -18 -25 -62 c-51 -125 -123 -195 -231 -227 -69 -19 -294 -23 -424 -6 -245 31 -572 18 -737 -30 -148 -43 -245 -86 -405 -183 -144 -87 -208 -135 -328 -250 -327 -313 -524 -762 -548 -1248 l-7 -137 -32 -15 c-18 -9 -43 -16 -55 -16 -11 0 -49 -14 -83 -31 -281 -139 -392 -431 -265 -694 36 -73 46 -87 95 -138 181 -187 411 -218 692 -95 26 12 47 16 52 11 10 -10 -7 -97 -36 -193 -25 -81 -30 -216 -11 -262 32 -75 103 -137 196 -170 116 -42 207 -50 492 -45 150 3 354 10 453 17 195 13 926 7 1245 -10 269 -15 598 -12 738 5 129 16 187 34 238 72 31 23 31 23 49 3 23 -25 88 -56 145 -69 55 -13 483 -14 681 -1 201 12 284 43 326 123 37 70 8 248 -56 349 -91 143 -199 196 -534 264 -89 18 -89 18 -107 58 -10 23 -25 66 -33 96 -40 144 -47 169 -62 230 -9 36 -22 88 -30 115 -7 28 -21 77 -30 110 -8 33 -20 74 -25 90 -17 56 -40 180 -40 217 0 77 32 164 99 268 20 30 41 64 47 75 112 201 141 308 131 475 l-6 99 32 5 c18 3 70 10 117 16 154 21 313 59 368 90 9 5 42 20 73 34 146 64 241 154 286 271 24 64 27 82 26 200 -1 140 -16 219 -69 352 -133 336 -415 686 -686 851 -155 95 -281 143 -448 173 -130 23 -243 24 -381 3 l-107 -16 -128 129 c-262 262 -584 491 -937 665 -78 38 -151 74 -161 80 -11 6 -31 14 -45 18 -14 5 -51 18 -81 30 -134 52 -271 80 -390 80 -85 0 -102 -4 -157 -31z m269 -214 c96 -24 169 -45 213 -62 199 -78 475 -226 649 -348 34 -23 95 -65 136 -93 41 -28 84 -59 95 -69 11 -10 49 -43 85 -73 117 -100 190 -173 190 -190 0 -11 -24 -32 -61 -54 -33 -20 -63 -36 -66 -36 -5 0 -25 14 -156 103 -37 26 -69 47 -72 47 -2 0 -24 13 -47 29 -204 138 -384 234 -568 306 -95 37 -333 160 -417 215 -86 56 -123 89 -156 140 -22 32 -21 42 4 74 25 31 73 34 171 11z m-147 -531 c238 -47 366 -91 589 -204 316 -159 340 -172 475 -260 100 -65 131 -90 131 -106 0 -12 -16 -46 -36 -75 -20 -30 -43 -69 -50 -86 -8 -18 -20 -33 -27 -33 -6 0 -37 14 -67 30 -133 72 -443 220 -460 220 -5 0 -24 6 -42 14 -18 8 -51 21 -73 29 -22 8 -58 22 -80 30 -22 8 -107 36 -190 62 -383 120 -516 185 -576 281 -31 51 -23 74 36 95 67 23 259 25 370 3z m2237 -450 c51 -8 97 -20 103 -25 5 -5 16 -9 25 -9 21 0 167 -63 183 -79 6 -6 15 -11 20 -11 29 0 227 -172 315 -274 216 -251 343 -527 346 -751 1 -98 -10 -129 -61 -177 -67 -64 -248 -129 -458 -165 -143 -24 -511 -24 -650 1 -111 20 -204 41 -250 58 -234 85 -415 240 -511 435 -47 97 -58 150 -58 283 -1 118 12 186 49 264 14 29 25 56 25 60 0 15 70 114 111 157 190 196 502 286 811 233z m-1188 -985 c11 -55 85 -196 147 -279 53 -71 184 -210 200 -210 3 0 30 -18 60 -41 64 -48 241 -137 319 -161 145 -44 263 -65 439 -76 l104 -7 13 -35 c19 -53 17 -187 -4 -246 -16 -47 -90 -181 -117 -214 -7 -8 -29 -47 -49 -87 -104 -204 -115 -375 -43 -648 19 -71 53 -201 75 -287 98 -375 111 -409 177 -465 49 -40 108 -66 176 -77 114 -17 269 -55 317 -78 61 -28 104 -90 100 -143 l-3 -40 -60 -6 c-33 -4 -182 -10 -330 -14 -312 -9 -331 -6 -371 56 -13 22 -27 53 -31 69 -3 17 -10 33 -14 36 -5 3 -9 12 -9 20 0 8 -9 36 -21 62 -74 170 -116 232 -268 397 -21 22 -52 63 -71 90 -19 28 -36 52 -39 55 -18 16 -237 371 -302 489 -11 20 -28 50 -39 66 -11 17 -23 37 -27 45 -4 8 -19 33 -33 55 -14 22 -35 60 -45 85 -10 25 -25 52 -32 61 -7 8 -13 20 -13 26 0 20 -144 160 -200 195 -89 55 -215 111 -290 128 -19 4 -55 12 -80 18 -84 21 -183 33 -299 38 -102 5 -120 3 -151 -14 -70 -39 -77 -148 -12 -197 22 -16 50 -21 157 -27 387 -20 613 -126 709 -333 21 -47 31 -150 22 -228 -10 -77 -89 -207 -184 -303 -41 -41 -78 -74 -82 -74 -5 0 -15 -6 -22 -12 -44 -40 -198 -112 -323 -151 -69 -21 -229 -58 -320 -73 -85 -14 -126 -75 -105 -153 6 -25 22 -48 40 -61 27 -19 46 -21 262 -25 244 -5 511 -20 663 -36 215 -23 262 -29 295 -39 19 -5 47 -10 61 -10 25 0 51 -7 189 -47 79 -24 170 -68 203 -99 21 -20 27 -33 25 -57 -3 -27 -8 -32 -43 -41 -58 -14 -639 -13 -1175 3 -381 11 -512 11 -725 1 -450 -22 -784 -24 -868 -5 -137 30 -148 43 -123 128 67 219 79 294 72 453 -6 141 -19 187 -55 199 -10 3 -30 16 -45 30 -46 42 -90 72 -166 113 -74 40 -75 41 -91 98 -46 158 -52 204 -52 419 0 213 4 253 49 435 35 141 134 371 200 465 15 22 43 63 62 90 117 174 337 356 561 466 47 23 94 46 105 51 21 11 101 33 196 55 94 21 323 27 475 13 72 -7 211 -15 310 -17 238 -7 339 15 467 101 29 20 58 36 64 36 6 0 14 -14 18 -31z m-2726 -1984 c7 -14 12 -36 12 -49 0 -25 21 -101 49 -175 19 -51 101 -137 157 -166 44 -22 74 -44 74 -56 0 -10 -110 -63 -175 -85 -27 -9 -77 -16 -112 -16 -149 1 -283 139 -283 291 0 122 70 219 195 268 49 19 71 16 83 -12z m3079 -250 c86 -141 186 -293 211 -321 46 -50 92 -112 92 -124 0 -13 -49 -8 -100 10 -24 8 -189 37 -335 59 -38 6 -126 15 -195 21 -69 6 -140 13 -158 16 -33 6 -54 25 -35 31 5 2 43 26 84 53 129 86 255 222 308 333 15 32 29 47 39 45 9 -2 49 -57 89 -123z" />
            <path d="M4688 3930 c-123 -66 -128 -229 -9 -305 86 -54 204 -19 248 74 71 149 -93 308 -239 231z" />
        </g>
    </svg>
);

const bottomBadgesList = [
    { label: "Clinically Formulated", sub: "Developed by experts", icon: <ClinicallyIcon /> },
    { label: "100% Vegan", sub: "Plant-based capsules", icon: <VeganIcon /> },
    { label: "GMP Certified", sub: "Independently verified", icon: <GMPIcon /> },
    { label: "Made in UK", sub: "Kent, England", icon: <UKMapIcon /> },
    { label: "No Animal Testing", sub: "Cruelty free", icon: <BunnyIcon /> },
];

const ingredients = [
    {
        name: "Magnesium Bisglycinate",
        role: "Electrical Signalling",
        icon: <Zap size={20} />,
        tagline: "Regulates your heart\u2019s electrical rhythm",
        color: "#e63946",
        why: "Magnesium is involved in over 300 enzymatic reactions and is essential for regulating blood pressure, cardiac contractility, and electrical excitability. Low magnesium is consistently linked to higher risks of atrial fibrillation, heart failure, and arrhythmias.",
        whyBisglycinate: "Magnesium bisglycinate is one of the most bioavailable and well-tolerated forms. Unlike cheaper magnesium oxide, it is efficiently absorbed and far less likely to cause gastrointestinal side effects \u2014 important for daily use.",
        keyFindings: [
            { finding: "45% reduction in post-surgical atrial fibrillation", source: "Cochrane systematic review of randomised trials" },
            { finding: "22% lower heart failure risk per 100 mg/day increase", source: "Del Gobbo et al. \u2014 meta-analysis of prospective cohorts" },
            { finding: "50% higher AF risk in those with the lowest magnesium levels", source: "Framingham Heart Study (Khan et al., 2013) \u2014 3,530 participants" },
            { finding: "Improved endothelial function and exercise tolerance in CAD", source: "Shechter et al. (2000) \u2014 double-blind RCT, 50 patients" },
            { finding: "Lower heart failure and major cardiac event risk with long-term use", source: "Wu et al. (2025) \u2014 94,239 veterans" },
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
            { finding: "43% reduction in major cardiac events and cardiovascular death", source: "Q-SYMBIO trial (Mortensen et al., 2014) \u2014 420 HF patients, 2 years" },
            { finding: "54% reduction in cardiovascular mortality", source: "KiSel-10 trial (Alehagen et al., 2013) \u2014 440 subjects, 5 years" },
            { finding: "Significant improvements in ejection fraction across 13 RCTs", source: "Fotino et al. (2013) \u2014 meta-analysis" },
            { finding: "Improved cardiac strain, NT-proBNP, blood pressure, and 6-min walk distance", source: "JCM 2025 \u2014 RCT of 120 HF patients" },
            { finding: "Reduced heart failure hospitalisations (73 vs 118, p<0.001)", source: "Italian multicentre trial \u2014 641 patients" },
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
            { finding: "Significant reductions in blood pressure, improved LVEF & NYHA class", source: "Tzang et al. (2024) \u2014 meta-analysis of 20 RCTs" },
            { finding: "85% of peripartum cardiomyopathy patients improved NYHA class (vs 10% placebo)", source: "Zaki et al. (2021) \u2014 double-blind RCT, 40 ICU patients" },
            { finding: "Increased exercise time, distance, and metabolic equivalents in HF", source: "Beyranvand et al. (2011) \u2014 placebo-controlled trial" },
            { finding: "Improved myocardial oxygen consumption and electrical activity", source: "Ahmadian et al. (2017) \u2014 double-blind RCT" },
            { finding: "Lowers blood pressure and improves vascular function in prehypertension", source: "Sun et al. (2016) \u2014 double-blind placebo-controlled trial" },
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
            { finding: "3.28% net improvement in LVEF vs placebo (no heterogeneity, I\u00B2=0%)", source: "DiNicolantonio et al. (2013) \u2014 meta-analysis of double-blind RCTs" },
            { finding: "22% improvement in LVEF in thiamine-depleted CHF patients on diuretics", source: "Shimon et al. (1995) \u2014 landmark RCT, 30 patients" },
            { finding: "Significant LVEF improvement of 3.30% in stable HF on diuretics", source: "Schoenenberger et al. (2012) \u2014 crossover pilot RCT" },
            { finding: "Improved endothelial function across healthy and diabetic groups", source: "Arora et al. \u2014 clinical trial, 30 participants" },
            { finding: "Promising improvements in cardiac function, symptoms, and thiamine status", source: "Xu & Ji (2022) \u2014 systematic review of all HF RCTs" },
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
            { finding: "Modulates Na\u207A, Ca\u00B2\u207A, K\u207A channels essential for cardiac rhythm", source: "Kokhabi et al. (2025) \u2014 comprehensive review" },
            { finding: "LVEF recovery from 27% to 42% with zinc/selenium repletion", source: "Frustaci et al. \u2014 18 cardiomyopathy patients" },
            { finding: "15.7\u00D7 higher heart failure risk post-MI with low zinc levels", source: "Suzuki et al. (2024) \u2014 243 MI patients" },
            { finding: "Prevented ventricular fibrillation in 83\u201391% of treated hearts", source: "Karagulova et al. \u2014 isolated heart studies" },
            { finding: "Higher zinc intake linked to better systolic/diastolic function in elderly", source: "Olechnowicz et al. (2023) \u2014 270 elderly individuals" },
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
            { finding: "B12 replacement fully normalised heart rate variability in deficient patients", source: "Aytemir et al. (2000) \u2014 power spectral analysis study" },
            { finding: "Improved cardiac sympathetic function in healthy elderly after 3 months", source: "Sucharita et al. (2012) \u2014 47 elderly subjects" },
            { finding: "Dose-response: higher B12 = lower autonomic neuropathy risk in diabetes", source: "Hansen et al. \u2014 469 type 2 diabetes patients" },
            { finding: "B12 deficiency linked to prolonged QTc and arrhythmogenic ECG markers", source: "Yilmaz et al. (2022) \u2014 214 healthy adults" },
            { finding: "B-vitamins including B12 protected cardiac autonomic function from pollution", source: "Zhong et al. (2017) \u2014 crossover pilot trial" },
        ],
        evidenceLevel: "Clinical trials, prospective studies, crossover trials"
    },
];

const summaryData = [
    { ingredient: "Magnesium", role: "Electrical signalling", highlight: "45% reduction in post-surgical AF; 22% lower HF risk per 100mg/day", evidence: "Meta-analyses & large RCTs" },
    { ingredient: "CoQ10", role: "Cellular energy", highlight: "43% reduction in major cardiac events; 54% lower CV mortality (with selenium)", evidence: "Multicentre RCTs" },
    { ingredient: "L-Taurine", role: "Membrane stability", highlight: "Improved LVEF, BP, NYHA class across 20 RCTs; standard HF therapy in Japan", evidence: "Meta-analysis of 20 RCTs" },
    { ingredient: "Thiamine (B1)", role: "Energy metabolism", highlight: "Up to 22% LVEF improvement in depleted patients; improved endothelial function", evidence: "Meta-analyses of RCTs" },
    { ingredient: "Zinc", role: "Ion channel function", highlight: "Modulates Na\u207A/Ca\u00B2\u207A/K\u207A channels; LVEF recovery from 27% \u2192 42% with repletion", evidence: "Reviews & clinical studies" },
    { ingredient: "Vitamin B12", role: "Autonomic nerves", highlight: "Normalised heart rate variability; dose-dependent autonomic protection", evidence: "Clinical & crossover trials" },
];

function IngredientCard({ item, index }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="evidence-ingredient-card"
        >
            <button
                onClick={() => setOpen(!open)}
                className="evidence-ingredient-btn"
            >
                <div className="evidence-ingredient-icon" style={{
                    background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
                    borderColor: `${item.color}55`,
                }}>
                    <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <div className="evidence-ingredient-info">
                    <div className="evidence-ingredient-role" style={{ color: item.color }}>
                        {item.role}
                    </div>
                    <div className="evidence-ingredient-name">
                        {item.name}
                    </div>
                    <div className="evidence-ingredient-tagline">
                        {item.tagline}
                    </div>
                </div>
                <div className={`evidence-chevron ${open ? 'open' : ''}`}>
                    <ChevronDown size={20} />
                </div>
            </button>

            <div className={`evidence-ingredient-details ${open ? 'open' : ''}`}>
                <div className="evidence-ingredient-details-inner">
                    <div className="evidence-details-divider" />

                    <div className="evidence-detail-section">
                        <h4 className="evidence-detail-heading" style={{ color: item.color }}>
                            Why it matters for your heart
                        </h4>
                        <p className="evidence-detail-text">
                            {item.why}
                        </p>
                    </div>

                    {item.whyBisglycinate && (
                        <div className="evidence-bisglycinate-box" style={{
                            background: `${item.color}11`,
                            borderColor: `${item.color}22`,
                        }}>
                            <h4 className="evidence-detail-heading" style={{ color: item.color }}>
                                Why Bisglycinate?
                            </h4>
                            <p className="evidence-bisglycinate-text">
                                {item.whyBisglycinate}
                            </p>
                        </div>
                    )}

                    <h4 className="evidence-detail-heading" style={{ color: item.color }}>
                        Key Research Findings
                    </h4>
                    <div className="evidence-findings-list">
                        {item.keyFindings.map((f, i) => (
                            <div key={i} className="evidence-finding-item">
                                <div className="evidence-finding-dot" style={{ background: item.color }} />
                                <div>
                                    <div className="evidence-finding-text">
                                        {f.finding}
                                    </div>
                                    <div className="evidence-finding-source">
                                        {f.source}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="evidence-level-badge">
                        <span className="evidence-level-label">Evidence Level: </span>
                        <span className="evidence-level-value">{item.evidenceLevel}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function EvidencePage() {
    const [showTable, setShowTable] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="evidence-page-root">
            {/* Background pattern */}
            <div className="evidence-bg-pattern" />

            <div className="evidence-content-wrapper">
                <BackButton className="back-link" />
            </div>

            {/* Hero */}
            <div className="evidence-hero">
                <div className="evidence-hero-glow" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="evidence-hero-content container"
                >
                    <img 
                        src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg" 
                        alt="Rhythmia Heart Care Logo" 
                        className="evidence-hero-logo"
                    />

                    <h1 className="evidence-hero-title">
                        Understanding Your<br /><span className="text-secondary">Heart Supplement</span>
                    </h1>

                    <p className="evidence-hero-subtitle">
                        The science behind every ingredient in Rhythmia Heart Care &mdash; developed by cardiologists at Imperial College NHS Trust to support your heart&apos;s electrical rhythm and muscle function.
                    </p>

                    <div className="evidence-stats-bar">
                        {[
                            ["6", "Active Ingredients"],
                            ["38+", "Published Studies"],
                            ["265k+", "Patients in Research"],
                        ].map(([num, label], i) => (
                            <div key={i} className="evidence-stat">
                                <div className="evidence-stat-num">{num}</div>
                                <div className="evidence-stat-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>


            {/* How Your Heart Works */}
            <div className="container evidence-section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="evidence-section-label">What Your Heart Needs</h2>
                    <h3 className="evidence-section-heading">
                        100,000 Beats a Day.<br />Every One Demands Precision.
                    </h3>
                    <p className="evidence-section-intro">
                        Your heart is the hardest-working muscle in your body. Each beat requires precise electrical signals to fire, cellular energy to contract, stable membranes to maintain structure, and healthy nerves to regulate rhythm. A deficiency in any of these areas can affect how your heart functions.
                    </p>

                    <div className="evidence-needs-grid">
                        {[
                            { label: "Electrical Signalling", desc: "Magnesium & Zinc", color: "#e63946" },
                            { label: "Cellular Energy", desc: "CoQ10 & Thiamine", color: "#e76f51" },
                            { label: "Membrane Stability", desc: "Taurine & Zinc", color: "#2a9d8f" },
                            { label: "Autonomic Nerve Support", desc: "Vitamins B1, B6, B12", color: "#8338ec" },
                            { label: "Antioxidant Defence", desc: "CoQ10, Zinc & Taurine", color: "#457b9d" },
                            { label: "Metabolic Support", desc: "Full B-vitamin complex", color: "#e9c46a" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="evidence-need-card"
                                style={{ borderLeftColor: item.color }}
                            >
                                <div className="evidence-need-label">{item.label}</div>
                                <div className="evidence-need-desc">{item.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Ingredients Deep Dive */}
            <div className="container evidence-section-container">
                <h2 className="evidence-section-label">The Ingredients</h2>
                <h3 className="evidence-section-heading">
                    Evidence Behind Every Ingredient
                </h3>
                <p className="evidence-section-intro" style={{ marginBottom: '2rem' }}>
                    Tap any ingredient to explore the peer-reviewed research supporting its inclusion.
                </p>

                {ingredients.map((item, i) => (
                    <IngredientCard key={i} item={item} index={i} />
                ))}
            </div>

            {/* Summary Table */}
            <div className="container evidence-section-container">
                <button
                    onClick={() => setShowTable(!showTable)}
                    className="evidence-table-toggle"
                >
                    <div>
                        <div className="evidence-table-toggle-title">At-a-Glance Summary Table</div>
                        <div className="evidence-table-toggle-sub">
                            All six ingredients, their roles, and top-line findings
                        </div>
                    </div>
                    <div className={`evidence-chevron ${showTable ? 'open' : ''}`}>
                        <ChevronDown size={20} />
                    </div>
                </button>

                <div className={`evidence-table-wrapper ${showTable ? 'open' : ''}`}>
                    <div className="evidence-table-inner">
                        <table className="evidence-summary-table">
                            <thead>
                                <tr>
                                    {["Ingredient", "Cardiac Role", "Key Headline Finding", "Evidence Level"].map((h, i) => (
                                        <th key={i}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {summaryData.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'even' : ''}>
                                        <td className="evidence-table-ingredient">{row.ingredient}</td>
                                        <td className="evidence-table-role">{row.role}</td>
                                        <td className="evidence-table-highlight">{row.highlight}</td>
                                        <td className="evidence-table-evidence">{row.evidence}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Who Is It For */}
            <div className="container evidence-section-container">
                <h2 className="evidence-section-label">Who Is Rhythmia For?</h2>
                <h3 className="evidence-section-heading">
                    Designed for Patients.<br />Suitable for Everyone.
                </h3>
                <div className="evidence-who-grid">
                    {[
                        {
                            title: "Cardiac Patients",
                            desc: "Originally created for people living with heart disease, palpitations, arrhythmias, or heart failure. Provides targeted nutritional support alongside your medical treatment.",
                        },
                        {
                            title: "Those on Heart Medications",
                            desc: "Common cardiac medications such as diuretics can deplete key nutrients like thiamine and magnesium. Rhythmia helps replenish what your medications may remove.",
                        },
                        {
                            title: "Proactive Heart Health",
                            desc: "Even without a diagnosis, supporting your heart with evidence-based nutrients is a smart long-term strategy \u2014 particularly with a family history of heart disease.",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="evidence-who-card"
                        >
                            <h4 className="evidence-who-title">{item.title}</h4>
                            <p className="evidence-who-desc">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="evidence-cta-section container"
            >
                <div className="cta-card">
                    <Award size={48} className="text-secondary mb-4" />
                    <h2>Confidence in Every Beat</h2>
                    <p>Built on peer-reviewed research. Formulated by cardiologists. Designed to support your heart at every level.</p>
                    <button onClick={() => navigate('/product')} className="buy-now-btn-large cta-btn">
                        View Product
                    </button>
                </div>
            </motion.div>

            {/* Bottom Badges */}
            <div className="container bottom-badges-container">
                <div className="bottom-badges-grid">
                    {bottomBadgesList.map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            key={i}
                            className="bottom-badge-card"
                        >
                            <div className="bottom-badge-icon-wrapper">
                                {item.icon}
                            </div>
                            <div className="bottom-badge-label">{item.label}</div>
                            <div className="bottom-badge-sub">{item.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Disclaimer */}
            <div className="container evidence-section-container evidence-disclaimer-container">
                <div className="evidence-disclaimer">
                    <p>
                        <strong>Important:</strong> Rhythmia Heart Care is a food supplement. It is not intended to diagnose, treat, cure, or prevent any disease. The research cited reflects published peer-reviewed evidence for individual ingredients and their associations with cardiac function. Always consult your doctor or cardiologist before starting any new supplement, particularly if you are on medication or have a heart condition.
                    </p>
                </div>
            </div>

            <Footer />

            <style>{`
                .evidence-page-root {
                    background-color: var(--color-quaternary);
                    min-height: 100vh;
                    position: relative;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    overflow-x: hidden;
                }

                .evidence-bg-pattern {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-image: url('/assets/pattern/Rhythmia_Care_Pattern_Red.svg');
                    background-repeat: repeat;
                    background-position: center center;
                    background-size: 1500px;
                    opacity: 0.1;
                    pointer-events: none;
                    z-index: 0;
                }

                .evidence-content-wrapper {
                    padding: 2rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 10;
                }



                /* Hero */
                .evidence-hero {
                    position: relative;
                    overflow: hidden;
                    padding: 10rem 2rem 5rem;
                    text-align: center;
                }

                .evidence-hero-glow {
                    position: absolute;
                    top: -200px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 700px;
                    height: 700px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(213, 15, 15, 0.12) 0%, transparent 70%);
                    pointer-events: none;
                }

                .evidence-hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 760px;
                    margin: 0 auto;
                }

                .evidence-hero-logo {
                    height: 40px;
                    margin-bottom: 2rem;
                    display: inline-block;
                }

                .evidence-hero-title {
                    font-size: clamp(2.2rem, 5vw, 3.5rem);
                    font-weight: 700;
                    line-height: 1.1;
                    margin: 0 0 1.5rem 0;
                    color: white;
                    letter-spacing: -0.02em;
                }

                .evidence-hero-subtitle {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.6);
                    max-width: 580px;
                    margin: 0 auto 2.5rem;
                }

                .evidence-stats-bar {
                    display: inline-flex;
                    gap: 2.5rem;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 1.25rem 2rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                }

                .evidence-stat {
                    text-align: center;
                    min-width: 100px;
                }

                .evidence-stat-num {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--color-secondary);
                }

                .evidence-stat-label {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 0.05em;
                    margin-top: 0.15rem;
                    text-transform: uppercase;
                }

                /* Shared section container */
                .evidence-section-container {
                    max-width: 800px;
                    width: 100%;
                    min-width: 0;
                    margin: 0 auto;
                    padding-bottom: 3.5rem;
                    box-sizing: border-box;
                }



                /* Section headings */
                .evidence-section-label {
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--color-secondary);
                    margin-bottom: 0.75rem;
                }

                .evidence-section-heading {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0 0 1.25rem 0;
                    line-height: 1.2;
                    color: white;
                    text-transform: none;
                    letter-spacing: -0.01em;
                }

                .evidence-section-intro {
                    font-size: 1.05rem;
                    line-height: 1.75;
                    color: rgba(255,255,255,0.6);
                    margin: 0 0 1.5rem 0;
                }

                /* Heart Needs grid */
                .evidence-needs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.75rem;
                }

                .evidence-need-card {
                    padding: 1.25rem 1.5rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 14px;
                    border-left: 3px solid;
                    transition: all 0.3s ease;
                }
                .evidence-need-card:hover {
                    background: rgba(255,255,255,0.04);
                    transform: translateY(-2px);
                }

                .evidence-need-label {
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 0.25rem;
                    color: white;
                }

                .evidence-need-desc {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.45);
                }

                /* Ingredient Cards */
                .evidence-ingredient-card {
                    background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    margin-bottom: 1rem;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                }
                .evidence-ingredient-card:hover {
                    border-color: rgba(255,255,255,0.12);
                }

                .evidence-ingredient-btn {
                    width: 100%;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 1.5rem 1.75rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: #fff;
                    text-align: left;
                    font-family: var(--font-main);
                }

                .evidence-ingredient-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .evidence-ingredient-info {
                    flex: 1;
                }

                .evidence-ingredient-role {
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    margin-bottom: 0.25rem;
                }

                .evidence-ingredient-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    line-height: 1.2;
                }

                .evidence-ingredient-tagline {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.5);
                    margin-top: 0.25rem;
                }

                .evidence-chevron {
                    color: rgba(255,255,255,0.4);
                    flex-shrink: 0;
                    transition: transform 0.3s ease;
                }
                .evidence-chevron.open {
                    transform: rotate(180deg);
                }

                /* Expandable details */
                .evidence-ingredient-details {
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    transition: max-height 0.5s ease, opacity 0.3s ease;
                }
                .evidence-ingredient-details.open {
                    max-height: 2000px;
                    opacity: 1;
                }

                .evidence-ingredient-details-inner {
                    padding: 0 1.75rem 1.75rem;
                }

                .evidence-details-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.06);
                    margin-bottom: 1.5rem;
                }

                .evidence-detail-section {
                    margin-bottom: 1.5rem;
                }

                .evidence-detail-heading {
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    margin-bottom: 0.6rem;
                }

                .evidence-detail-text {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.75);
                    margin: 0;
                }

                .evidence-bisglycinate-box {
                    border: 1px solid;
                    border-radius: 14px;
                    padding: 1.25rem 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .evidence-bisglycinate-text {
                    font-size: 0.95rem;
                    line-height: 1.65;
                    color: rgba(255,255,255,0.7);
                    margin: 0;
                }

                .evidence-findings-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    margin-bottom: 1.25rem;
                }

                .evidence-finding-item {
                    display: flex;
                    gap: 0.75rem;
                    align-items: flex-start;
                    background: rgba(255,255,255,0.02);
                    border-radius: 12px;
                    padding: 0.9rem 1rem;
                    border: 1px solid rgba(255,255,255,0.04);
                    transition: all 0.2s ease;
                }
                .evidence-finding-item:hover {
                    background: rgba(255,255,255,0.04);
                }

                .evidence-finding-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    margin-top: 0.5rem;
                    flex-shrink: 0;
                }

                .evidence-finding-text {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.9);
                    line-height: 1.5;
                }

                .evidence-finding-source {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.4);
                    margin-top: 0.25rem;
                    font-style: italic;
                }

                .evidence-level-badge {
                    padding: 0.6rem 1rem;
                    background: rgba(255,255,255,0.03);
                    border-radius: 10px;
                    display: inline-block;
                }

                .evidence-level-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    color: rgba(255,255,255,0.4);
                    text-transform: uppercase;
                }

                .evidence-level-value {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.6);
                }

                /* Summary Table Toggle */
                .evidence-table-toggle {
                    width: 100%;
                    padding: 1.25rem 1.5rem;
                    background: rgba(213, 15, 15, 0.08);
                    border: 1px solid rgba(213, 15, 15, 0.2);
                    border-radius: 16px;
                    cursor: pointer;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-family: var(--font-main);
                    transition: all 0.3s ease;
                    text-align: left;
                }
                .evidence-table-toggle:hover {
                    background: rgba(213, 15, 15, 0.12);
                    border-color: rgba(213, 15, 15, 0.3);
                }
                
                .evidence-table-toggle > div:first-child {
                    flex: 1;
                    min-width: 0; /* Ensures the text can wrap and won't stretch the button */
                    padding-right: 1rem;
                }

                .evidence-table-toggle-title {
                    font-size: 1.2rem;
                    font-weight: 700;
                    text-align: left;
                    white-space: normal;
                }

                .evidence-table-toggle-sub {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.45);
                    text-align: left;
                    margin-top: 0.25rem;
                    white-space: normal;
                }

                .evidence-table-wrapper {
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    transition: max-height 0.5s ease, opacity 0.3s ease;
                }
                .evidence-table-wrapper.open {
                    max-height: 1000px;
                    opacity: 1;
                }

                .evidence-table-inner {
                    margin-top: 0.75rem;
                    overflow: auto;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                }

                .evidence-summary-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.85rem;
                }

                .evidence-summary-table thead tr {
                    background: rgba(213, 15, 15, 0.12);
                }

                .evidence-summary-table th {
                    padding: 0.9rem 1rem;
                    text-align: left;
                    font-weight: 700;
                    color: var(--color-secondary);
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    font-size: 0.75rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .evidence-summary-table td {
                    padding: 0.9rem 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    line-height: 1.5;
                }

                .evidence-summary-table tr.even {
                    background: rgba(255,255,255,0.01);
                }

                .evidence-table-ingredient {
                    font-weight: 700;
                    color: #fff;
                    white-space: nowrap;
                }

                .evidence-table-role {
                    color: rgba(255,255,255,0.6);
                    white-space: nowrap;
                }

                .evidence-table-highlight {
                    color: rgba(255,255,255,0.7);
                }

                .evidence-table-evidence {
                    color: rgba(255,255,255,0.45);
                    font-size: 0.8rem;
                }

                @media (max-width: 768px) {
                    .evidence-table-wrapper {
                        width: 100%;
                        max-width: calc(100vw - 3rem);
                    }
                    .evidence-table-inner {
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        width: 100%;
                    }
                    .evidence-summary-table {
                        min-width: 700px;
                    }
                }

                /* Who Is It For */
                .evidence-who-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 0.5rem;
                }

                .evidence-who-card {
                    padding: 2rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 18px;
                    transition: all 0.3s ease;
                }
                .evidence-who-card:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(213, 15, 15, 0.2);
                    transform: translateY(-3px);
                }

                .evidence-who-title {
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin: 0 0 0.6rem 0;
                    color: white;
                    text-transform: none;
                    letter-spacing: 0;
                }

                .evidence-who-desc {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.55);
                    margin: 0;
                }

                /* Bottom Badges */
                .bottom-badges-container {
                    padding: 2rem 2rem 4rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .bottom-badges-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                }
                .bottom-badge-card {
                    padding: 1.5rem;
                    text-align: center;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }
                .bottom-badge-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                    transform: translateY(-2px);
                }
                .bottom-badge-icon-wrapper {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 48px;
                    height: 48px;
                    margin-bottom: 1rem;
                    color: var(--color-secondary);
                }
                .bottom-badge-icon-wrapper svg {
                    width: 100%;
                    height: 100%;
                }
                .bottom-badge-label {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem;
                }
                .bottom-badge-sub {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.4);
                }

                /* CTA Section - reuses .cta-card from manufacturing */
                .evidence-cta-section {
                    padding: 2rem 2rem 5rem;
                    text-align: center;
                }

                .evidence-cta-section .cta-card {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 3.5rem;
                    background: linear-gradient(145deg, rgba(213, 15, 15, 0.1) 0%, rgba(77, 13, 18, 0.4) 100%);
                    border: 1px solid rgba(213, 15, 15, 0.2);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .evidence-cta-section .cta-card h2 {
                    font-size: 2.2rem;
                    color: white;
                    margin: 1rem 0;
                }

                .evidence-cta-section .cta-card p {
                    color: rgba(255,255,255,0.8);
                    max-width: 500px;
                    margin-bottom: 2rem;
                }

                .evidence-cta-section .cta-btn {
                    width: auto;
                    min-width: 250px;
                }

                .evidence-cta-section .buy-now-btn-large {
                    padding: 1.25rem 2rem;
                    background-color: var(--color-secondary);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    font-family: var(--font-main);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    box-shadow: 0 4px 20px rgba(213, 15, 15, 0.4);
                }
                .evidence-cta-section .buy-now-btn-large:hover {
                    background-color: #ff1f1f;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(213, 15, 15, 0.6);
                }

                .mb-4 {
                    margin-bottom: 1rem;
                }

                /* Disclaimer */
                .evidence-disclaimer-container {
                    padding-bottom: 4rem;
                }

                .evidence-disclaimer {
                    padding: 1.25rem 1.5rem;
                    background: rgba(255,255,255,0.02);
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.04);
                }

                .evidence-disclaimer p {
                    font-size: 0.8rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.3);
                    margin: 0;
                }

                .evidence-disclaimer strong {
                    color: rgba(255,255,255,0.4);
                }

                /* Responsive */
                @media (max-width: 900px) {
                    .evidence-hero {
                        padding: 8rem 1.5rem 3.5rem;
                    }

                    .evidence-hero-title {
                        font-size: 2rem;
                    }

                    .evidence-stats-bar {
                        gap: 1.5rem;
                        padding: 1rem 1.25rem;
                    }

                    .evidence-stat-num {
                        font-size: 1.4rem;
                    }

                    .evidence-section-heading {
                        font-size: 1.6rem;
                    }

                    .evidence-context-card,
                    .evidence-fishoil-card {
                        padding: 1.75rem 1.5rem;
                    }

                    .evidence-ingredient-btn {
                        padding: 1.25rem;
                    }

                    .evidence-ingredient-details-inner {
                        padding: 0 1.25rem 1.25rem;
                    }

                    .evidence-ingredient-name {
                        font-size: 1.1rem;
                    }

                    .evidence-who-grid {
                        grid-template-columns: 1fr;
                    }

                    .bottom-badges-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .evidence-cta-section .cta-card {
                        padding: 2.5rem 1.5rem;
                    }

                    .evidence-cta-section .cta-card h2 {
                        font-size: 1.8rem;
                    }

                    .evidence-needs-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .evidence-table-toggle {
                        padding: 1.25rem !important;
                        width: 100% !important;
                        box-sizing: border-box !important;
                        margin: 0 !important;
                        border-radius: 16px !important;
                    }
                    
                    .evidence-table-toggle-title {
                        font-size: 1.05rem;
                        word-break: break-word;
                    }
                    
                    .evidence-table-toggle-sub {
                        font-size: 0.85rem;
                        word-break: break-word;
                    }

                    .evidence-table-wrapper {
                        width: 100% !important;
                        box-sizing: border-box !important;
                    }
                    .evidence-table-inner {
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        width: 100% !important;
                        max-width: 100% !important;
                        box-sizing: border-box !important;
                    }
                    .evidence-summary-table {
                        min-width: 700px;
                    }
                }

                @media (max-width: 480px) {
                    .evidence-needs-grid {
                        grid-template-columns: 1fr;
                    }

                    .bottom-badges-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

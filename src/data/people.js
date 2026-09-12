/* =============================================================================
   People — Rhythmia Heart Care
   -----------------------------------------------------------------------------
   Names and titles are as supplied by the founders.

   TO ADD A PHOTO
   Drop the image into  public/assets/photos/team/
   then set  photo: '/assets/photos/team/<filename>'  on that person.
   Anyone with  photo: null  renders an initials monogram instead, so the page
   stays presentable until the headshots arrive.

   Portraits look best square (1:1), at least 600x600, cropped head-and-
   shoulders with the eyeline around the upper third.

   `bio` is optional. People with a bio get an expanded profile card; everyone
   else appears in the compact grid.
   ========================================================================== */

export const founders = [
    {
        name: 'Dr Mohamed Zuhair',
        title: 'Cofounder and Director',
        credential: 'Cardiologist — Specialist in Electrophysiology',
        photo: '/assets/photos/Mohamed_Zuhair.png',
        bio: 'Dr Mohamed Zuhair is a senior cardiology registrar and PhD candidate at Imperial College London and the National Heart and Lung Institute, with a research focus on syncope and complex rhythm management. He holds MBBS, BSc, MRCP and PGCME qualifications and teaches cardiology to medical students at both UCL and Imperial College London. His interests include cardiac electrophysiology, catheter ablation, and neuromodulation for arrhythmias. His published work includes studies on complex rhythm management and percutaneous neuromodulation for vasovagal syncope.',
    },
    {
        name: 'Dr Mohamed Albatat',
        title: 'Cofounder, Head of Operations',
        credential: 'PhD in Cardiac Rhythm Management',
        photo: '/assets/photos/Mohammad_Albatat.png',
        bio: 'Dr Mohamed Albatat holds a PhD in Cardiac Rhythm Management and has extensive experience in building and scaling healthcare ventures. Combining deep cardiovascular knowledge with strong commercial and operational expertise, he drives execution, efficiency and sustainable growth. He leads operations, manufacturing and supply chain partnerships, regulatory and quality frameworks, and business development to ensure high performance at scale.',
    },
]

export const advisors = [
    {
        name: 'Dr Phang Boon Lim',
        title: 'Medical Advisor',
        credential: 'Consultant Cardiologist & Electrophysiologist',
        affiliation: 'Imperial College Healthcare NHS Trust | Imperial College London',
        photo: null,
        bio: 'Dr Boon Lim is a consultant cardiologist and electrophysiologist at Imperial College Healthcare NHS Trust, where he leads the nationally renowned Imperial Syncope Diagnostic Service at Hammersmith Hospital. He read medicine at Cambridge University on a prestigious scholarship, graduating with double first-class honours, and holds a PhD from Imperial College London in the autonomic mechanisms of atrial fibrillation, funded by the British Heart Foundation. A recognised expert in atrial fibrillation, arrhythmias and catheter ablation, Dr Lim has been named Top Doctor of the Year for Cardiology (2018, 2021) and is a recipient of the President’s Medal for Cardiology at the Royal Society of Medicine. He is also the author of Keeping Your Heart Healthy, published as part of the Penguin Life Experts series.',
    },
    {
        name: 'Dr Daniel Keene',
        title: 'Medical Advisor',
        credential: 'Consultant Cardiologist & Electrophysiologist',
        affiliation: 'Imperial College Healthcare NHS Trust | Imperial College London',
        photo: null,
        bio: 'Dr Daniel Keene is a consultant cardiologist and electrophysiologist at the Royal Free London NHS Foundation Trust and Imperial College Healthcare NHS Trust. He graduated from the University of Manchester and was awarded both a National Institute for Health and Care Research academic clinical fellowship and a British Heart Foundation Clinical Research Training Fellowship to support his doctoral research into novel implantable cardiac device technologies. His clinical practice spans complex electrophysiology procedures including catheter ablation for a range of arrhythmias, alongside broader inpatient and outpatient general cardiology.',
    },
    {
        name: 'Dr Tiffany Ng',
        title: 'Medical Advisor',
        photo: null,
    },
    {
        name: 'Dr Afnan Zuhair',
        title: 'Medical Advisor',
        photo: null,
    },
    {
        name: 'Dr Hans Henrik Odland',
        title: 'Medical Advisor',
        photo: null,
    },
    {
        name: 'Dr Jacob Bergsland',
        title: 'Medical Advisor',
        photo: null,
    },
]

export const team = [
    {
        name: 'Reda Albatat',
        title: 'Chief Technology Officer',
        credential: 'Data Scientist | AI Specialist',
        photo: '/assets/photos/Reda_Albatat.png',
        bio: 'Reda Albatat is a Data Scientist with expertise in artificial intelligence and healthcare analytics. He leads the company’s technology and data strategy, applying AI-driven insights to support innovation and informed decision-making. He oversees digital infrastructure, analytics and performance optimisation to ensure the company remains modern, data-driven and forward-looking.',
    },
    {
        name: 'Saja Labib',
        title: 'Head of Marketing',
        photo: null,
    },
    {
        name: 'Alexandra Stefanou',
        title: 'Customer Operations',
        photo: null,
    },
    {
        name: 'Erik Nakkerud',
        title: 'Key Account Manager',
        photo: null,
    },
]

/** Initials for the monogram fallback: "Dr Mohamed Zuhair" -> "MZ". */
export function initials(name) {
    return name
        .replace(/^Dr\.?\s+/i, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
}

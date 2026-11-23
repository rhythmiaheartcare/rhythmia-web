/* =============================================================================
   People — Rhythmia Heart Care
   -----------------------------------------------------------------------------
   Names and titles are as supplied by the founders.

   TO ADD A PHOTO
   Drop the image into  public/assets/photos/
   then set  photo: '/assets/photos/<filename>'  on that person.
   Anyone with  photo: null  shows the Rhythmia heart mark until the
   headshot arrives.

   Portraits look best square (1:1), at least 600x600, cropped head-and-
   shoulders with the eyeline around the upper third.

   The About page shows everyone the same way (photo, name and role), in the
   order set by `people` at the bottom of this file. Anyone with a `bio` gets a
   "Read bio" link that opens the full biography in a pop-up.
   ========================================================================== */

export const founders = [
    {
        name: 'Dr Mohamed Zuhair',
        title: 'Cofounder and Director',
        credential: 'Cardiologist, Specialist in Electrophysiology',
        photo: '/assets/photos/Mohamed_Zuhair.jpg',
        bio: 'Dr Mohamed Zuhair is a senior electrophysiology fellow at Imperial College Healthcare NHS Trust and a Clinical Research Fellow at the National Heart and Lung Institute, Imperial College London, where he is completing a PhD in reflex syncope and cardioneuroablation. He helps run the Syncope and Cardioneuroablation Service at Hammersmith Hospital, a national referral centre for fainting and autonomic disorders, and specialises in heart rhythm disorders, catheter ablation and cardiac devices. His research into why people faint, and how the nervous system can be targeted to prevent it, won a European Society of Cardiology Young Investigator Award in Arrhythmias, Pacing and Electrophysiology in 2026, as well as a Best of the Best Abstracts award from the British Cardiovascular Society. He has published on catheter ablation and neuromodulation for vasovagal syncope and atrial fibrillation. He holds MBBS, BSc, MRCP and PGCME qualifications and teaches cardiology to medical students at UCL and Imperial College London.',
    },
    {
        name: 'Dr Mohamed Albatat',
        title: 'Cofounder, Head of Operations',
        credential: 'PhD in Cardiac Rhythm Management',
        photo: '/assets/photos/Mohammad_Albatat.png',
        bio: 'Dr Mohamed Albatat holds a PhD in Cardiac Rhythm Management and has extensive experience in building and scaling healthcare ventures. Combining deep cardiovascular knowledge with strong commercial and operational expertise, he drives execution, efficiency and sustainable growth. He leads operations, manufacturing and supply chain partnerships, regulatory and quality frameworks, and business development to ensure high performance at scale.',
    },
    {
        name: 'Reda Albatat',
        title: 'Chief Technology Officer',
        credential: 'Data Scientist | AI Specialist',
        photo: '/assets/photos/Reda_Albatat.png',
        bio: 'Reda Albatat is a Data Scientist with expertise in artificial intelligence and healthcare analytics. He leads the company’s technology and data strategy, applying AI-driven insights to support innovation and informed decision-making. He oversees digital infrastructure, analytics and performance optimisation to ensure the company remains modern, data-driven and forward-looking.',
    },
]

export const advisors = [
    {
        name: 'Dr Phang Boon Lim',
        title: 'Medical Advisor',
        credential: 'Consultant Cardiologist & Electrophysiologist',
        affiliation: 'Imperial College Healthcare NHS Trust | Imperial College London',
        photo: '/assets/photos/Boon_Lim.jpg',
        bio: 'Dr Boon Lim is one of the UK’s leading heart rhythm specialists: a consultant cardiologist and electrophysiologist at Imperial College Healthcare NHS Trust and Imperial College London, and clinical lead of the nationally renowned Imperial Syncope Diagnostic Service at Hammersmith Hospital. He read medicine at Cambridge University on a scholarship, graduating with a double first-class honours degree, and earned his PhD at Imperial College London researching the autonomic mechanisms of atrial fibrillation, funded by the British Heart Foundation. He has performed more than 2,500 atrial fibrillation ablations and published over 100 peer-reviewed papers, and is a recognised authority on atrial fibrillation, arrhythmias, fainting and catheter ablation. He was voted Top Doctor of the Year for Cardiology by his peers in 2018 and 2021, and received the President’s Medal for Cardiology from the Royal Society of Medicine. He is the author of Keeping Your Heart Healthy, part of the Penguin Life Experts series: an accessible guide to looking after your heart, from blood pressure and cholesterol to chest pain and fainting.',
    },
    {
        name: 'Dr Daniel Keene',
        title: 'Medical Advisor',
        credential: 'Consultant Cardiologist & Electrophysiologist',
        affiliation: 'Royal Free London NHS Foundation Trust | Imperial College London',
        photo: '/assets/photos/Daniel_Keene.jpg',
        bio: 'Dr Daniel Keene is a consultant cardiologist and electrophysiologist and the lead for electrophysiology and cardiac devices at the Royal Free London NHS Foundation Trust. He is also Clinical Senior Lecturer in Cardiac Electrophysiology and Devices at the National Heart and Lung Institute, Imperial College London, and treats patients at Imperial College Healthcare NHS Trust. After graduating from the University of Manchester with commendations, he was awarded a National Institute for Health and Care Research Academic Clinical Fellowship at Imperial and a highly competitive British Heart Foundation Clinical Research Training Fellowship, completing a PhD on novel implantable cardiac device technologies. He performs complex catheter ablation across the full range of heart rhythm disorders and specialises in advanced pacing, including conduction system pacing and pacing for heart failure. His research spans pacing for slow heart rhythms and heart failure, and the mechanisms and treatment of syncope. He is a member of the British Cardiovascular Society and the British Heart Rhythm Society.',
    },
    {
        name: 'Dr Tiffany Ng',
        title: 'Medical Advisor',
        photo: '/assets/photos/Tiffany_Ng.jpg',
    },
    {
        name: 'Dr Afnan Zuhair',
        title: 'Medical Advisor',
        photo: '/assets/photos/Afnan_Zuhair.jpg',
    },
    {
        name: 'Dr Hans Henrik Odland',
        title: 'Medical Advisor',
        credential: 'Paediatric Cardiologist & Electrophysiologist',
        affiliation: 'Oslo University Hospital, Rikshospitalet',
        photo: '/assets/photos/Hans_Henrik_Odland.jpg',
        bio: 'Dr Hans Henrik Odland is a cardiologist at Oslo University Hospital, Rikshospitalet, specialising in paediatric cardiology and cardiac electrophysiology. He trained in Giessen, Germany, completed a fellowship at the Hospital for Sick Children (SickKids) in Toronto and holds a PhD from the University of Oslo. His clinical work spans catheter ablation and cardiac device implantation, and his research focuses on assessing heart function with ultrasound and on cardiac resynchronisation therapy. He is the founder of Pacertool, which develops a biofeedback system to guide the implantation of pacemakers and resynchronisation devices.',
    },
]

export const team = [
    {
        name: 'Saja Labib',
        title: 'Head of Marketing',
        photo: null,
    },
    {
        name: 'Eleni Stefanou',
        title: 'Customer Operations',
        credential: 'Content Strategist | Copywriter | Video Producer',
        photo: '/assets/photos/Eleni_Stefanou.jpg',
        bio: 'Eleni Stefanou is a content strategist, copywriter and video producer with more than 14 years of experience in digital media. She began her career at the British Film Institute, where she established its social media strategy and produced digital content, before joining The Guardian as social platforms editor, where she also taught the Guardian Masterclass on social media storytelling. She has since written for Hormonally, a platform dedicated to open, accessible education on hormonal health. Eleni studied at Goldsmiths, University of London.',
    },
]

const byName = (name) => [...founders, ...advisors, ...team].find((p) => p.name === name)

/** Everyone, in the order they appear on the About page. The named people come
 * first; everyone else follows in the order listed above. */
const leading = ['Dr Mohamed Zuhair', 'Dr Daniel Keene', 'Dr Phang Boon Lim', 'Dr Mohamed Albatat'].map(byName)

export const people = [
    ...leading,
    ...[...founders, ...advisors, ...team].filter((p) => !leading.includes(p)),
]

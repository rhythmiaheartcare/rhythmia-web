/* =============================================================================
   Trust badges — Rhythmia Heart Care
   -----------------------------------------------------------------------------
   The quality marks shown on the homepage ("Crafted with Precision & Purity"),
   the Evidence page and How it's made. One list, so the three always match.

   Six badges fill the grid evenly at every width: one row of six on desktop,
   two rows of three on tablets, three rows of two on phones.

   "Allergen Free" is per the manufacturer's specification sheet: free from
   allergenic ingredients.
   ========================================================================== */

import { WheatOff } from 'lucide-react'
import {
    ClinicallyIcon,
    VeganIcon,
    GMPIcon,
    UKMapIcon,
    BunnyIcon,
} from '../components/BadgeIcons'

export const badges = [
    { label: 'Clinically Formulated', sub: 'Developed by experts', icon: <ClinicallyIcon /> },
    { label: '100% Vegan', sub: 'Plant-based capsules', icon: <VeganIcon /> },
    { label: 'Allergen Free', sub: 'No allergenic ingredients', icon: <WheatOff strokeWidth={1.5} /> },
    { label: 'GMP Certified', sub: 'Independently verified', icon: <GMPIcon /> },
    { label: 'Made in UK', sub: 'British manufacturing', icon: <UKMapIcon /> },
    { label: 'No Animal Testing', sub: 'Cruelty free', icon: <BunnyIcon /> },
]

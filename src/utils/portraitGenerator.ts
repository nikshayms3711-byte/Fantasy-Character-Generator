import type {
  Character,
  CharacterClass,
  EyebrowStyle,
  EyeStyle,
  FacialHair,
  FacialMark,
  HairStyle,
  HeadgearStyle,
  JawShape,
  MouthStyle,
  PortraitTraits,
} from '../types/character';

interface SkinPalette {
  base: string;
  shadow: string;
}

interface HairPalette {
  base: string;
  highlight: string;
}

const SKIN_PALETTES: readonly SkinPalette[] = [
  { base: '#F5CFB6', shadow: '#D5A082' },
  { base: '#E6B28E', shadow: '#C28460' },
  { base: '#C98A63', shadow: '#9E613E' },
  { base: '#8F583B', shadow: '#683B24' },
  { base: '#623A27', shadow: '#442416' },
  { base: '#DCE2EB', shadow: '#A8B3C5' }, // Moon-pale / spectral tone
];

const HAIR_PALETTES: readonly HairPalette[] = [
  { base: '#1F222E', highlight: '#3E455C' },
  { base: '#5E2B1E', highlight: '#8C4532' },
  { base: '#A63A28', highlight: '#D45E43' },
  { base: '#D8A648', highlight: '#F4CD73' },
  { base: '#D8DFEC', highlight: '#FFFFFF' },
  { base: '#2B4C7E', highlight: '#4C7AC0' },
  { base: '#4D2D6E', highlight: '#7B4FA8' },
  { base: '#2B5B47', highlight: '#488C70' },
];

const JAW_SHAPES: readonly JawShape[] = ['chiseled', 'oval', 'angular', 'rounded'];
const HAIR_STYLES: readonly HairStyle[] = [
  'swept',
  'spiky',
  'waves',
  'bob',
  'braids',
  'mohawk',
  'longParted',
  'undercut',
];
const EYE_STYLES: readonly EyeStyle[] = ['sharp', 'wide', 'determined', 'mystic'];
const EYEBROW_STYLES: readonly EyebrowStyle[] = ['fierce', 'arched', 'calm', 'smirk'];
const MOUTH_STYLES: readonly MouthStyle[] = ['smirk', 'stoic', 'grin', 'serene'];
const FACIAL_MARKS: readonly FacialMark[] = ['none', 'none', 'scar', 'rune', 'warpaint', 'freckles'];
const FACIAL_HAIRS: readonly FacialHair[] = ['none', 'none', 'none', 'stubble', 'goatee', 'beard'];

const CLASS_EYE_COLORS: Record<CharacterClass, readonly string[]> = {
  Warrior: ['#D97736', '#4E82B4', '#6E9B56', '#B8443A'],
  Mage: ['#5CE1E6', '#A78BFA', '#FBBF24', '#60A5FA'],
  Rogue: ['#34D399', '#F59E0B', '#94A3B8', '#E11D48'],
  Ranger: ['#65A30D', '#D97706', '#38BDF8', '#78350F'],
  Cleric: ['#FBBF24', '#60A5FA', '#34D399', '#FDE68A'],
  Paladin: ['#F59E0B', '#38BDF8', '#FDE047', '#E2E8F0'],
  Bard: ['#F43F5E', '#A855F7', '#10B981', '#F59E0B'],
  Necromancer: ['#4ADE80', '#C084FC', '#F43F5E', '#2DD4BF'],
};

const CLASS_HEADGEAR: Record<CharacterClass, readonly HeadgearStyle[]> = {
  Warrior: ['none', 'classHelm', 'circlet', 'none'],
  Mage: ['classHelm', 'hood', 'circlet', 'none'],
  Rogue: ['hood', 'none', 'featheredCap', 'hood'],
  Ranger: ['hood', 'featheredCap', 'none', 'circlet'],
  Cleric: ['circlet', 'hood', 'classHelm', 'none'],
  Paladin: ['classHelm', 'circlet', 'none', 'classHelm'],
  Bard: ['featheredCap', 'none', 'circlet', 'featheredCap'],
  Necromancer: ['hood', 'classHelm', 'circlet', 'hood'],
};

const CLASS_ACCENTS: Record<CharacterClass, readonly string[]> = {
  Warrior: ['#DC4A38', '#E08E36', '#94A3B8'],
  Mage: ['#38BDF8', '#A855F7', '#F59E0B'],
  Rogue: ['#10B981', '#E11D48', '#6366F1'],
  Ranger: ['#4ADE80', '#D97706', '#2DD4BF'],
  Cleric: ['#FBBF24', '#60A5FA', '#F8FAFC'],
  Paladin: ['#F59E0B', '#38BDF8', '#EAB308'],
  Bard: ['#EC4899', '#8B5CF6', '#F59E0B'],
  Necromancer: ['#22C55E', '#A855F7', '#14B8A6'],
};

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function pickFrom<T>(items: readonly T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

export function generatePortraitTraits(
  character: Character,
  previous?: PortraitTraits | null
): PortraitTraits {
  const nextVariant = (previous?.variantNumber ?? 0) + 1;
  const baseSeed = hashString(`${character.id}-${character.name}-${character.characterClass}`);
  const randomSalt = Math.floor(Math.random() * 1_000_000);
  const combinedSeed = (baseSeed ^ Math.imul(nextVariant, 2654435761) ^ randomSalt) >>> 0;
  const rng = createRng(combinedSeed);

  const skin = pickFrom(SKIN_PALETTES, rng);
  const hair = pickFrom(HAIR_PALETTES, rng);

  let hairStyle = pickFrom(HAIR_STYLES, rng);
  let headgear = pickFrom(CLASS_HEADGEAR[character.characterClass], rng);
  let mouthStyle = pickFrom(MOUTH_STYLES, rng);
  let accentColor = pickFrom(CLASS_ACCENTS[character.characterClass], rng);

  // Guarantee noticeable visual variation when regenerating
  if (previous) {
    if (hairStyle === previous.hairStyle) {
      hairStyle = HAIR_STYLES[(HAIR_STYLES.indexOf(hairStyle) + 1 + Math.floor(rng() * 3)) % HAIR_STYLES.length];
    }
    if (mouthStyle === previous.mouthStyle) {
      mouthStyle = MOUTH_STYLES[(MOUTH_STYLES.indexOf(mouthStyle) + 1) % MOUTH_STYLES.length];
    }
    const headgearOptions = CLASS_HEADGEAR[character.characterClass];
    if (headgear === previous.headgear && headgearOptions.length > 1) {
      const idx = headgearOptions.indexOf(headgear);
      headgear = headgearOptions[(idx + 1) % headgearOptions.length];
    }
    const accentOptions = CLASS_ACCENTS[character.characterClass];
    if (accentColor === previous.accentColor && accentOptions.length > 1) {
      const idx = accentOptions.indexOf(accentColor);
      accentColor = accentOptions[(idx + 1) % accentOptions.length];
    }
  }

  return {
    variantNumber: nextVariant,
    seed: combinedSeed,
    jawShape: pickFrom(JAW_SHAPES, rng),
    earType: rng() > 0.62 ? 'elf' : 'human',
    skinTone: skin.base,
    skinShadow: skin.shadow,
    hairStyle,
    hairColor: hair.base,
    hairHighlight: hair.highlight,
    eyeStyle:
      character.characterClass === 'Mage' || character.characterClass === 'Necromancer'
        ? rng() > 0.35
          ? 'mystic'
          : pickFrom(EYE_STYLES, rng)
        : pickFrom(EYE_STYLES, rng),
    eyeColor: pickFrom(CLASS_EYE_COLORS[character.characterClass], rng),
    eyebrowStyle: pickFrom(EYEBROW_STYLES, rng),
    mouthStyle,
    facialMark: pickFrom(FACIAL_MARKS, rng),
    facialHair: pickFrom(FACIAL_HAIRS, rng),
    headgear,
    armorVariant: Math.floor(rng() * 3) as 0 | 1 | 2,
    accentColor,
    backdropAngle: Math.floor(rng() * 360),
  };
}

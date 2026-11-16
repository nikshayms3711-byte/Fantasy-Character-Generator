import { UserRound } from 'lucide-react';
import { useId } from 'react';
import type { CharacterClass, PortraitTraits } from '../types/character';

interface CharacterPortraitProps {
  characterName: string;
  characterClass: CharacterClass;
  portrait: PortraitTraits | null;
}

const BACKDROP_THEMES: Record<CharacterClass, { top: string; bottom: string; glow: string }> = {
  Warrior: { top: '#3B1E1E', bottom: '#181116', glow: '#E06444' },
  Mage: { top: '#1E2756', bottom: '#111428', glow: '#53B4FF' },
  Rogue: { top: '#172E2B', bottom: '#0E1719', glow: '#2BD49A' },
  Ranger: { top: '#1E3622', bottom: '#111A14', glow: '#7BD453' },
  Cleric: { top: '#3D311B', bottom: '#1A1610', glow: '#F5C451' },
  Paladin: { top: '#3B2F1D', bottom: '#191614', glow: '#FBBF24' },
  Bard: { top: '#3B1E38', bottom: '#18101C', glow: '#E85DAA' },
  Necromancer: { top: '#1E2E2B', bottom: '#12111D', glow: '#4ADE80' },
};

const INK = '#12131B';

function getJawPath(jaw: PortraitTraits['jawShape']): string {
  switch (jaw) {
    case 'chiseled':
      return 'M110 124 C110 82, 210 82, 210 124 L206 168 L182 204 L160 212 L138 204 L114 168 Z';
    case 'angular':
      return 'M112 122 C112 82, 208 82, 208 122 L202 174 L160 214 L118 174 Z';
    case 'rounded':
      return 'M110 128 C110 82, 210 82, 210 128 C210 182, 188 210, 160 210 C132 210, 110 182, 110 128 Z';
    case 'oval':
    default:
      return 'M112 124 C112 82, 208 82, 208 124 C208 174, 184 210, 160 210 C136 210, 112 174, 112 124 Z';
  }
}

function renderBackHair(traits: PortraitTraits) {
  const { hairStyle, hairColor } = traits;
  if (hairStyle === 'waves' || hairStyle === 'longParted') {
    return (
      <path
        d="M92 124 C86 165, 80 220, 96 258 L224 258 C240 220, 234 165, 228 124 C224 72, 96 72, 92 124 Z"
        fill={hairColor}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    );
  }
  if (hairStyle === 'bob') {
    return (
      <path
        d="M96 120 C88 158, 92 198, 108 214 L212 214 C228 198, 232 158, 224 120 C216 74, 104 74, 96 120 Z"
        fill={hairColor}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    );
  }
  if (hairStyle === 'braids') {
    return (
      <g fill={hairColor} stroke={INK} strokeWidth="3.5" strokeLinejoin="round">
        <path d="M100 138 C90 168, 88 210, 98 248 C108 252, 116 244, 116 232 L118 148 Z" />
        <path d="M220 138 C230 168, 232 210, 222 248 C212 252, 204 244, 204 232 L202 148 Z" />
      </g>
    );
  }
  return null;
}

function renderFrontHair(traits: PortraitTraits) {
  const { hairStyle, hairColor, hairHighlight, headgear } = traits;
  if (headgear === 'classHelm' || headgear === 'hood') {
    // Show subtle front bangs peeking from under helm/hood
    return (
      <g>
        <path
          d="M114 118 C126 98, 152 96, 162 110 C172 96, 196 100, 206 118 C192 108, 174 110, 160 120 C146 110, 126 108, 114 118 Z"
          fill={hairColor}
          stroke={INK}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </g>
    );
  }

  switch (hairStyle) {
    case 'spiky':
      return (
        <g>
          <path
            d="M106 132 L98 98 L120 104 L130 68 L152 90 L170 62 L184 92 L212 76 L206 106 L224 108 L212 134 C202 108, 180 102, 160 112 C140 102, 118 108, 106 132 Z"
            fill={hairColor}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M132 82 L148 96 L168 74 L178 96"
            fill="none"
            stroke={hairHighlight}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case 'mohawk':
      return (
        <g>
          <path
            d="M142 112 L138 56 L160 66 L182 52 L178 112 C166 104, 154 104, 142 112 Z"
            fill={hairColor}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M156 68 L160 98"
            stroke={hairHighlight}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      );
    case 'longParted':
      return (
        <g>
          <path
            d="M104 142 C100 94, 134 74, 160 76 C186 74, 220 94, 216 142 C206 112, 184 104, 160 116 C136 104, 114 112, 104 142 Z"
            fill={hairColor}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M126 94 C140 86, 152 88, 158 98"
            fill="none"
            stroke={hairHighlight}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case 'waves':
      return (
        <g>
          <path
            d="M102 138 C98 94, 132 70, 166 74 C198 78, 222 100, 216 138 C202 114, 182 108, 164 118 C142 126, 118 112, 102 138 Z"
            fill={hairColor}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M132 88 C154 80, 180 86, 196 102"
            fill="none"
            stroke={hairHighlight}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case 'undercut':
      return (
        <g>
          <path
            d="M110 124 C112 86, 146 72, 184 78 C206 82, 216 100, 210 124 C192 104, 166 104, 142 114 C126 120, 116 116, 110 124 Z"
            fill={hairColor}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M140 88 C160 84, 182 88, 196 98"
            fill="none"
            stroke={hairHighlight}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case 'bob':
    case 'braids':
    case 'swept':
    default:
      return (
        <g>
          <path
            d="M104 134 C104 86, 138 72, 162 74 C188 72, 216 88, 216 134 C202 112, 184 106, 162 116 C140 106, 118 112, 104 134 Z"
            fill={hairColor}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M128 90 C148 82, 174 84, 190 96"
            fill="none"
            stroke={hairHighlight}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
  }
}

function renderClassOutfit(characterClass: CharacterClass, traits: PortraitTraits) {
  const { accentColor } = traits;

  switch (characterClass) {
    case 'Warrior':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Torso steel plate */}
          <path d="M52 322 C58 248, 104 226, 160 226 C216 226, 262 248, 268 322 Z" fill="#465063" />
          <path d="M114 232 L160 278 L206 232 L190 322 L130 322 Z" fill="#2D3442" />
          {/* Heavy Pauldrons */}
          <path d="M40 274 C44 230, 86 216, 120 234 L106 276 Z" fill="#68748C" />
          <path d="M280 274 C276 230, 234 216, 200 234 L214 276 Z" fill="#68748C" />
          {/* Shoulder trim & chest clasp */}
          <path d="M56 266 L108 242" stroke={accentColor} strokeWidth="5" strokeLinecap="round" />
          <path d="M264 266 L212 242" stroke={accentColor} strokeWidth="5" strokeLinecap="round" />
          <circle cx="160" cy="272" r="10" fill={accentColor} />
        </g>
      );
    case 'Mage':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Arcane Robes & High Collar */}
          <path d="M52 322 C60 250, 106 232, 160 232 C214 232, 260 250, 268 322 Z" fill="#232B4D" />
          <path d="M96 240 L106 188 L138 226 Z" fill="#323E6E" />
          <path d="M224 240 L214 188 L182 226 Z" fill="#323E6E" />
          <path d="M124 234 L160 322 L196 234 Z" fill="#181E38" />
          {/* Glowing Arcane Clasp */}
          <polygon points="160,248 174,266 160,284 146,266" fill={accentColor} />
          <path d="M104 252 L144 274 M216 252 L176 274" stroke="#E5C068" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    case 'Rogue':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Leather armor & cowl scarf */}
          <path d="M56 322 C64 252, 106 232, 160 232 C214 232, 256 252, 264 322 Z" fill="#262933" />
          <path d="M100 226 C128 246, 192 246, 220 226 L212 266 C182 278, 138 278, 108 266 Z" fill="#383D4C" />
          {/* Bandolier Strap */}
          <path d="M92 238 L208 322 L236 322 L116 230 Z" fill="#5A3928" />
          <rect x="148" y="268" width="16" height="16" rx="3" fill={accentColor} />
        </g>
      );
    case 'Ranger':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Forest Tunic & Fur Mantle */}
          <path d="M54 322 C62 250, 106 230, 160 230 C214 230, 258 250, 266 322 Z" fill="#264733" />
          <path d="M84 240 C112 222, 208 222, 236 240 L224 272 C192 258, 128 258, 96 272 Z" fill="#5C4433" />
          <path d="M104 242 L212 322" stroke="#3D2B1F" strokeWidth="10" strokeLinecap="round" />
          <circle cx="160" cy="252" r="9" fill={accentColor} />
        </g>
      );
    case 'Cleric':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Vestment & Liturgical Stole */}
          <path d="M54 322 C62 250, 106 230, 160 230 C214 230, 258 250, 266 322 Z" fill="#E6E1D6" />
          <path d="M116 232 L136 322 L184 322 L204 232 L160 264 Z" fill="#3B4968" />
          <path d="M160 248 L160 296 M142 268 L178 268" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case 'Paladin':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Radiant Plate Armor & Gold Tabard */}
          <path d="M50 322 C58 248, 104 226, 160 226 C216 226, 262 248, 268 322 Z" fill="#CBD5E1" />
          <path d="M126 234 L138 322 L182 322 L194 234 Z" fill="#1E3A5F" />
          <path d="M40 270 C48 224, 92 214, 122 234 L106 274 Z" fill="#E2E8F0" />
          <path d="M280 270 C272 224, 228 214, 198 234 L214 274 Z" fill="#E2E8F0" />
          <polygon points="160,248 176,266 160,290 144,266" fill={accentColor} />
        </g>
      );
    case 'Bard':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Velvet Doublet & Ruffled Collar */}
          <path d="M56 322 C64 252, 106 232, 160 232 C214 232, 256 252, 264 322 Z" fill="#6B2446" />
          <path d="M118 230 C134 254, 186 254, 202 230 L184 268 L136 268 Z" fill="#F1ECE1" />
          <path d="M160 268 L160 322" stroke={accentColor} strokeWidth="4" />
          <circle cx="160" cy="284" r="5" fill={accentColor} />
          <circle cx="160" cy="306" r="5" fill={accentColor} />
        </g>
      );
    case 'Necromancer':
    default:
      return (
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
          {/* Tattered Mantle & Bone Clasp */}
          <path d="M52 322 C60 250, 106 230, 160 230 C214 230, 260 250, 268 322 Z" fill="#1D1B29" />
          <path d="M88 242 L110 198 L136 232 Z" fill="#2D2842" />
          <path d="M232 242 L210 198 L184 232 Z" fill="#2D2842" />
          <path d="M126 244 L160 296 L194 244" fill="none" stroke="#CFCBC2" strokeWidth="5" strokeLinecap="round" />
          <circle cx="160" cy="256" r="10" fill={accentColor} />
        </g>
      );
  }
}

function renderHeadgear(characterClass: CharacterClass, traits: PortraitTraits) {
  const { headgear, accentColor } = traits;
  if (headgear === 'none') return null;

  if (headgear === 'circlet') {
    return (
      <g stroke={INK} strokeWidth="3.5" strokeLinejoin="round">
        <path d="M108 112 C132 102, 188 102, 212 112 L208 122 C186 114, 134 114, 112 122 Z" fill="#E5C068" />
        <polygon points="160,96 170,110 160,122 150,110" fill={accentColor} />
      </g>
    );
  }

  if (headgear === 'featheredCap') {
    return (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M98 114 C108 70, 206 66, 222 108 C194 98, 126 102, 98 114 Z" fill="#3B4259" />
        <path d="M200 94 C224 68, 250 56, 260 66 C248 84, 224 98, 202 104 Z" fill={accentColor} />
      </g>
    );
  }

  if (headgear === 'hood') {
    return (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path
          d="M90 192 C82 118, 112 62, 160 62 C208 62, 238 118, 230 192 L212 184 C216 124, 196 88, 160 88 C124 88, 104 124, 108 184 Z"
          fill={characterClass === 'Ranger' ? '#264733' : characterClass === 'Necromancer' ? '#231E33' : '#2C3142'}
        />
      </g>
    );
  }

  // classHelm
  if (characterClass === 'Mage') {
    return (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M74 114 C118 96, 202 96, 246 114 C218 126, 102 126, 74 114 Z" fill="#2A3566" />
        <path d="M114 106 L154 24 L190 52 L176 58 L206 106 Z" fill="#334078" />
        <path d="M118 102 C142 94, 178 94, 202 102" fill="none" stroke={accentColor} strokeWidth="4.5" />
      </g>
    );
  }

  if (characterClass === 'Warrior' || characterClass === 'Paladin') {
    const metal = characterClass === 'Paladin' ? '#DCE3EE' : '#647087';
    return (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M104 128 C104 72, 216 72, 216 128 L204 120 C188 102, 132 102, 116 120 Z" fill={metal} />
        <path d="M154 78 L160 44 L166 78 Z" fill={accentColor} />
        {/* Side Wings / Horns */}
        <path d="M104 106 C84 94, 78 70, 92 56 C96 76, 102 88, 114 96 Z" fill="#E5C068" />
        <path d="M216 106 C236 94, 242 70, 228 56 C224 76, 218 88, 206 96 Z" fill="#E5C068" />
      </g>
    );
  }

  // Necromancer / Cleric ornate crown-helm
  return (
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
      <path d="M106 118 L116 76 L138 96 L160 60 L182 96 L204 76 L214 118 Z" fill="#3D4357" />
      <circle cx="160" cy="96" r="7" fill={accentColor} />
    </g>
  );
}

function renderEyesAndBrows(traits: PortraitTraits) {
  const { eyeStyle, eyeColor, eyebrowStyle } = traits;
  const isMystic = eyeStyle === 'mystic';

  const browOffsetY = eyebrowStyle === 'fierce' ? 3 : eyebrowStyle === 'smirk' ? -2 : 0;

  return (
    <g>
      {/* Left & Right Eyes */}
      {[136, 184].map((cx, idx) => {
        const isLeft = idx === 0;
        const height = eyeStyle === 'wide' ? 12 : eyeStyle === 'sharp' ? 8 : 10;
        return (
          <g key={cx}>
            <ellipse
              cx={cx}
              cy={148}
              rx={12}
              ry={height}
              fill={isMystic ? eyeColor : '#F8FAFC'}
              stroke={INK}
              strokeWidth="3"
            />
            {!isMystic && (
              <>
                <circle cx={cx} cy={148} r={6.5} fill={eyeColor} />
                <circle cx={cx} cy={148} r={3.2} fill={INK} />
              </>
            )}
            {/* Cartoon / Game specular glint */}
            <circle cx={cx - (isLeft ? 2.5 : 2.5)} cy={145} r={2.2} fill="#FFFFFF" />
          </g>
        );
      })}

      {/* Eyebrows */}
      {eyebrowStyle === 'fierce' && (
        <g stroke={INK} strokeWidth="4.5" strokeLinecap="round">
          <path d="M122 130 L148 138" />
          <path d="M198 130 L172 138" />
        </g>
      )}
      {eyebrowStyle === 'arched' && (
        <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
          <path d="M122 134 Q136 124 148 133" />
          <path d="M172 133 Q184 124 198 134" />
        </g>
      )}
      {eyebrowStyle === 'smirk' && (
        <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
          <path d="M122 134 Q136 128 148 134" />
          <path d={`M172 ${134 + browOffsetY} Q184 ${122 + browOffsetY} 198 ${130 + browOffsetY}`} />
        </g>
      )}
      {eyebrowStyle === 'calm' && (
        <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
          <path d="M122 133 L148 133" />
          <path d="M172 133 L198 133" />
        </g>
      )}
    </g>
  );
}

function renderMouth(traits: PortraitTraits) {
  switch (traits.mouthStyle) {
    case 'grin':
      return (
        <path
          d="M142 182 Q160 198 178 182 Z"
          fill="#F8FAFC"
          stroke={INK}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      );
    case 'smirk':
      return (
        <path
          d="M146 184 Q164 190 178 179"
          fill="none"
          stroke={INK}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
      );
    case 'serene':
      return (
        <path
          d="M148 183 Q160 189 172 183"
          fill="none"
          stroke={INK}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      );
    case 'stoic':
    default:
      return (
        <path
          d="M146 184 L174 184"
          fill="none"
          stroke={INK}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
      );
  }
}

function renderFacialMark(traits: PortraitTraits) {
  switch (traits.facialMark) {
    case 'scar':
      return (
        <path
          d="M178 128 L192 168"
          stroke="#9E3B3B"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      );
    case 'rune':
      return (
        <path
          d="M124 164 L132 170 L124 176 M196 164 L188 170 L196 176"
          fill="none"
          stroke={traits.accentColor}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'warpaint':
      return (
        <g fill={traits.accentColor} opacity="0.85">
          <rect x="120" y="160" width="18" height="5" rx="2" />
          <rect x="182" y="160" width="18" height="5" rx="2" />
        </g>
      );
    case 'freckles':
      return (
        <g fill={traits.skinShadow}>
          <circle cx="128" cy="164" r="1.6" />
          <circle cx="134" cy="167" r="1.6" />
          <circle cx="186" cy="167" r="1.6" />
          <circle cx="192" cy="164" r="1.6" />
        </g>
      );
    case 'none':
    default:
      return null;
  }
}

function renderFacialHair(traits: PortraitTraits) {
  if (traits.facialHair === 'none') return null;

  if (traits.facialHair === 'beard') {
    return (
      <path
        d="M114 166 C116 208, 138 232, 160 234 C182 232, 204 208, 206 166 C192 184, 176 192, 160 192 C144 192, 128 184, 114 166 Z"
        fill={traits.hairColor}
        stroke={INK}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    );
  }
  if (traits.facialHair === 'goatee') {
    return (
      <path
        d="M144 192 C148 214, 172 214, 176 192 L160 218 Z"
        fill={traits.hairColor}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    );
  }
  return (
    <path
      d="M122 178 C128 202, 192 202, 198 178"
      fill="none"
      stroke={traits.hairColor}
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.55"
    />
  );
}

export function CharacterPortrait({
  characterName,
  characterClass,
  portrait,
}: CharacterPortraitProps) {
  const uid = useId().replace(/:/g, '');
  const theme = BACKDROP_THEMES[characterClass];

  if (!portrait) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-lg bg-[#110E0C] border border-[#B8924A]/25 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="w-14 h-14 rounded-full border border-[#B8924A]/25 bg-[#1B1612] flex items-center justify-center text-[#C4B8A8] mb-2.5">
          <UserRound className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="text-xs font-medium text-[#F4EDE2]">No Portrait Generated</p>
        <p className="mt-1 text-[11px] text-[#C4B8A8] max-w-[26ch]">
          Click Generate Portrait below to illustrate {characterName}.
        </p>
      </div>
    );
  }

  return (
    <div
      key={`${characterName}-${portrait.variantNumber}`}
      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#B8924A]/40 bg-[#110E0C] animate-card-reveal"
    >
      <svg
        viewBox="-50 0 420 315"
        className="w-full h-full block"
        role="img"
        aria-label={`Cartoon video-game style portrait of ${characterName}, ${characterClass}, variant ${portrait.variantNumber}`}
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.top} />
            <stop offset="100%" stopColor={theme.bottom} />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="44%" r="55%">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.48" />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cartoon / Video Game Cel-Shaded Backdrop */}
        <rect x="-50" y="0" width="420" height="315" fill={`url(#bg-${uid})`} />
        <circle cx="160" cy="142" r="185" fill={`url(#glow-${uid})`} />

        {/* Stylized Comic / Game Action Rays */}
        <g opacity="0.16" stroke={theme.glow} strokeWidth="2">
          <line x1="160" y1="142" x2="-40" y2="10" />
          <line x1="160" y1="142" x2="360" y2="20" />
          <line x1="160" y1="142" x2="-45" y2="165" />
          <line x1="160" y1="142" x2="365" y2="175" />
          <circle cx="160" cy="142" r="118" fill="none" strokeDasharray="8 6" />
        </g>

        {/* Back Hair Layer */}
        {renderBackHair(portrait)}

        {/* Ears */}
        {portrait.earType === 'elf' ? (
          <g fill={portrait.skinTone} stroke={INK} strokeWidth="3.5" strokeLinejoin="round">
            <path d="M114 142 L84 128 L108 164 Z" />
            <path d="M206 142 L236 128 L212 164 Z" />
          </g>
        ) : (
          <g fill={portrait.skinTone} stroke={INK} strokeWidth="3.5">
            <ellipse cx="110" cy="154" rx="8" ry="13" />
            <ellipse cx="210" cy="154" rx="8" ry="13" />
          </g>
        )}

        {/* Neck */}
        <path
          d="M140 194 L140 242 L180 242 L180 194 Z"
          fill={portrait.skinShadow}
          stroke={INK}
          strokeWidth="4"
        />

        {/* Class Armor / Outfit */}
        {renderClassOutfit(characterClass, portrait)}

        {/* Head Base + Cel Shadow */}
        <path
          d={getJawPath(portrait.jawShape)}
          fill={portrait.skinTone}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M160 210 C184 206, 202 184, 206 134 C202 174, 182 198, 152 204 Z"
          fill={portrait.skinShadow}
          opacity="0.45"
        />

        {/* Facial Marks & Eyes */}
        {renderFacialMark(portrait)}
        {renderEyesAndBrows(portrait)}

        {/* Stylized Nose */}
        <path
          d="M160 150 L156 168 L165 170"
          fill="none"
          stroke={INK}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Facial Hair & Mouth */}
        {renderFacialHair(portrait)}
        {renderMouth(portrait)}

        {/* Front Hair & Class Headgear */}
        {renderFrontHair(portrait)}
        {renderHeadgear(characterClass, portrait)}

        {/* Foreground Atmospheric Game Particles */}
        <g fill={portrait.accentColor} opacity="0.8">
          <circle cx="46" cy="74" r="3.5" />
          <circle cx="272" cy="86" r="4" />
          <circle cx="256" cy="212" r="2.8" />
          <circle cx="62" cy="204" r="2.8" />
        </g>
      </svg>
    </div>
  );
}

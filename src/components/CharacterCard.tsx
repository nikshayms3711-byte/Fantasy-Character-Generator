import {
  BookmarkCheck,
  BookmarkPlus,
  Compass,
  Cross,
  Dices,
  Droplets,
  Flame,
  Heart,
  ImagePlus,
  Music,
  RefreshCw,
  ScrollText,
  Shield,
  Skull,
  Sparkles,
  Sword,
  Swords,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { Character, CharacterClass } from '../types/character';
import { CharacterPortrait } from './CharacterPortrait';

export const CLASS_ICONS: Record<CharacterClass, ComponentType<{ className?: string }>> = {
  Warrior: Sword,
  Mage: Flame,
  Rogue: Sparkles,
  Ranger: Compass,
  Cleric: Cross,
  Paladin: Shield,
  Bard: Music,
  Necromancer: Skull,
};

interface CharacterCardProps {
  character: Character | null;
  isSavedInDeck: boolean;
  onGenerateCharacter: () => void;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
  onSaveToDeck: () => void;
}

export function CharacterCard({
  character,
  isSavedInDeck,
  onGenerateCharacter,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
  onSaveToDeck,
}: CharacterCardProps) {
  const ClassIcon = character ? CLASS_ICONS[character.characterClass] : null;
  const canGeneratePortrait = character !== null && character.portrait === null;
  const canRegeneratePortrait = character !== null && character.portrait !== null;
  const canGenerateBackstory = character !== null;
  const canSaveToDeck = character !== null && !isSavedInDeck;

  return (
    <article
      aria-live="polite"
      className="relative w-full max-w-[460px] rounded-2xl bg-[#171310]/95 border-2 border-[#C9A050]/65 shadow-[0_30px_75px_-14px_rgba(0,0,0,0.9)] p-5 sm:p-6 flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Inner beveled antique brass card border & corner filigree */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-xl border border-[#B8924A]/25"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-3 left-3 w-4 h-4 text-[#D9AF5E]/65"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M2 15V2h13" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-3 right-3 w-4 h-4 text-[#D9AF5E]/65"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M22 15V2H9" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 text-[#D9AF5E]/65"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M2 9v13h13" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 text-[#D9AF5E]/65"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M22 9v13H9" />
      </svg>

      {character && ClassIcon ? (
        <div
          key={character.id}
          className="relative z-10 flex flex-col gap-4 animate-card-reveal"
        >
          {/* Card Nameplate & Class Header */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#B8924A]/25">
            <div className="min-w-0">
              <h2 className="font-display text-2xl sm:text-[1.85rem] leading-tight tracking-wide text-[#F7EFE1] [text-wrap:balance]">
                {character.name}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-[#D6CBBC]">
                <ClassIcon className="w-3.5 h-3.5 text-[#D9AF5E] shrink-0" aria-hidden="true" />
                <span className="text-[#C4B8A8]">Class</span>
                <span aria-hidden="true" className="text-[#B8924A]/65">·</span>
                <span className="font-semibold tracking-wide text-[#E6C275]">
                  {character.characterClass}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0 pt-1">
              <span className="block text-[11px] font-medium text-[#C4B8A8]">Player Card</span>
              <span className="block text-xs text-[#D9AF5E] tabular-nums">
                No. {String(character.rollNumber).padStart(3, '0')}
                {character.portrait ? ` · v${character.portrait.variantNumber}` : ''}
              </span>
            </div>
          </div>

          {/* Portrait Artwork Window */}
          <CharacterPortrait
            characterName={character.name}
            characterClass={character.characterClass}
            portrait={character.portrait}
          />

          {/* Health, Mana & Strength Stat Strip */}
          <div
            aria-label="Character stats"
            className="grid grid-cols-3 divide-x divide-[#B8924A]/25 border-y border-[#B8924A]/25 py-2.5"
          >
            <div className="flex flex-col items-center justify-center px-2">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#C4B8A8]">
                <Heart className="w-3.5 h-3.5 text-[#E06C5A]" aria-hidden="true" />
                <span>Health</span>
              </div>
              <span className="mt-0.5 text-lg font-bold text-[#F7EFE1] tabular-nums">
                {character.stats.health}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#C4B8A8]">
                <Droplets className="w-3.5 h-3.5 text-[#5EB1E6]" aria-hidden="true" />
                <span>Mana</span>
              </div>
              <span className="mt-0.5 text-lg font-bold text-[#F7EFE1] tabular-nums">
                {character.stats.mana}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#C4B8A8]">
                <Swords className="w-3.5 h-3.5 text-[#E6B85C]" aria-hidden="true" />
                <span>Strength</span>
              </div>
              <span className="mt-0.5 text-lg font-bold text-[#F7EFE1] tabular-nums">
                {character.stats.strength}
              </span>
            </div>
          </div>

          {/* Origin Story Lore Section */}
          <div className="min-h-[54px] flex items-center justify-center px-1">
            {character.backstory ? (
              <p
                key={character.backstory}
                className="text-xs sm:text-[13px] leading-relaxed text-[#E3DACB] text-center max-w-[44ch] animate-card-reveal"
              >
                {character.backstory}
              </p>
            ) : (
              <p className="text-xs italic text-[#C4B8A8] text-center">
                Origin story awaits — click Generate Backstory below.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative z-10 min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-8">
          <div className="mb-5 w-16 h-16 rounded-full border border-[#B8924A]/30 bg-[#201A15] flex items-center justify-center text-[#D9AF5E]">
            <Shield className="w-7 h-7" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl sm:text-[1.8rem] text-[#F4EDE2] [text-wrap:balance]">
            Empty Player Card
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#C4B8A8] max-w-[28ch]">
            Click Generate Character below to roll a hero with a unique name, class, and combat stats.
          </p>
        </div>
      )}

      {/* Integrated Card Controls */}
      <div className="relative z-10 pt-3 border-t border-[#B8924A]/25 flex flex-col gap-2">
        <button
          type="button"
          onClick={onGenerateCharacter}
          className="w-full inline-flex items-center justify-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#D4A44C] hover:bg-[#E2B662] active:translate-y-[1px] text-[#120E0A] font-semibold text-sm tracking-wide transition-all duration-150 shadow-[0_8px_24px_-6px_rgba(212,164,76,0.45)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6C275] cursor-pointer"
        >
          <Dices className="w-4 h-4" aria-hidden="true" />
          Generate Character
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onGeneratePortrait}
            disabled={!canGeneratePortrait}
            className={`inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] ${
              canGeneratePortrait
                ? 'bg-[#1D1713] border-[#B8924A]/50 text-[#F4EDE2] hover:bg-[#29201A] hover:border-[#D9AF5E] active:translate-y-[1px] cursor-pointer'
                : 'bg-[#14100D] border-white/10 text-[#C4B8A8]/45 cursor-not-allowed'
            }`}
          >
            <ImagePlus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            Generate Portrait
          </button>

          <button
            type="button"
            onClick={onRegeneratePortrait}
            disabled={!canRegeneratePortrait}
            className={`inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] ${
              canRegeneratePortrait
                ? 'bg-[#1D1713] border-[#B8924A]/50 text-[#F4EDE2] hover:bg-[#29201A] hover:border-[#D9AF5E] active:translate-y-[1px] cursor-pointer'
                : 'bg-[#14100D] border-white/10 text-[#C4B8A8]/45 cursor-not-allowed'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            Regenerate Portrait
          </button>

          <button
            type="button"
            onClick={onGenerateBackstory}
            disabled={!canGenerateBackstory}
            className={`inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] ${
              canGenerateBackstory
                ? 'bg-[#1D1713] border-[#B8924A]/50 text-[#F4EDE2] hover:bg-[#29201A] hover:border-[#D9AF5E] active:translate-y-[1px] cursor-pointer'
                : 'bg-[#14100D] border-white/10 text-[#C4B8A8]/45 cursor-not-allowed'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            Generate Backstory
          </button>

          <button
            type="button"
            onClick={onSaveToDeck}
            disabled={!canSaveToDeck}
            className={`inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] ${
              canSaveToDeck
                ? 'bg-[#212A1F] border-[#6FA868]/60 text-[#EBF5E8] hover:bg-[#2A3627] hover:border-[#8BC983] active:translate-y-[1px] cursor-pointer'
                : isSavedInDeck
                  ? 'bg-[#1A2118] border-[#6FA868]/35 text-[#A5CFA0] cursor-default'
                  : 'bg-[#14100D] border-white/10 text-[#C4B8A8]/45 cursor-not-allowed'
            }`}
          >
            {isSavedInDeck ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                Saved in Deck
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                Save to Deck
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

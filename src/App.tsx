import { RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CharacterCard } from './components/CharacterCard';
import { MyDeckPanel } from './components/MyDeckPanel';
import type { Character } from './types/character';
import { BackstoryGenerator } from './utils/backstoryGenerator';
import { CharacterGenerator } from './utils/characterGenerator';
import { generatePortraitTraits } from './utils/portraitGenerator';

const DECK_STORAGE_KEY = 'fantasy_character_creator_deck_v1';

function loadSavedDeck(): Character[] {
  try {
    const raw = window.localStorage.getItem(DECK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Character =>
        Boolean(item) &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.characterClass === 'string' &&
        typeof item.stats?.health === 'number' &&
        typeof item.stats?.mana === 'number' &&
        typeof item.stats?.strength === 'number'
    );
  } catch {
    return [];
  }
}

export default function App() {
  const generatorRef = useRef<CharacterGenerator | null>(null);
  if (!generatorRef.current) {
    generatorRef.current = new CharacterGenerator();
  }

  const backstoryRef = useRef<BackstoryGenerator | null>(null);
  if (!backstoryRef.current) {
    backstoryRef.current = new BackstoryGenerator();
  }

  const [character, setCharacter] = useState<Character | null>(null);
  const [deck, setDeck] = useState<Character[]>(loadSavedDeck);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(true);

  useEffect(() => {
    try {
      window.localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [deck]);

  const syncUpdatedCharacter = (updated: Character) => {
    setCharacter(updated);
    setDeck((prev) =>
      prev.some((item) => item.id === updated.id)
        ? prev.map((item) => (item.id === updated.id ? updated : item))
        : prev
    );
  };

  const handleGenerateCharacter = () => {
    const generator = generatorRef.current;
    if (!generator) return;
    const nextCharacter = generator.createCharacter();
    setCharacter(nextCharacter);
    setGeneratedCount(generator.generatedCount);
  };

  const handleGeneratePortrait = () => {
    if (!character || character.portrait !== null) return;
    const portrait = generatePortraitTraits(character, null);
    syncUpdatedCharacter({ ...character, portrait });
  };

  const handleRegeneratePortrait = () => {
    if (!character || character.portrait === null) return;
    const portrait = generatePortraitTraits(character, character.portrait);
    syncUpdatedCharacter({ ...character, portrait });
  };

  const handleGenerateBackstory = () => {
    const backstoryGen = backstoryRef.current;
    if (!character || !backstoryGen) return;
    const backstory = backstoryGen.generateUniqueBackstory(character);
    syncUpdatedCharacter({ ...character, backstory });
  };

  const handleSaveToDeck = () => {
    if (!character) return;
    setDeck((prev) => {
      if (prev.some((item) => item.id === character.id)) {
        return prev;
      }
      return [character, ...prev];
    });
  };

  const handleSelectFromDeck = (saved: Character) => {
    setCharacter(saved);
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearDeck = () => {
    setDeck([]);
  };

  const handleReset = () => {
    generatorRef.current?.resetHistory();
    backstoryRef.current?.resetHistory();
    setCharacter(null);
    setGeneratedCount(0);
  };

  const isSavedInDeck = character !== null && deck.some((item) => item.id === character.id);

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_center,#221A14_0%,#110D0A_65%,#090705_100%)] text-[#F4EDE2] flex flex-col overflow-x-hidden">
      {/* Dark Textured Ancient Alchemist Workbench Backdrop */}
      {bgLoaded && (
        <img
          src="/src/assets/images/alchemist_workbench_bg_1794847199337.jpg"
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBgLoaded(false)}
          className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-75 select-none"
        />
      )}

      {/* Measured Scrim for WCAG AA Contrast Over Workbench Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(14,10,8,0.48)_0%,rgba(10,7,5,0.84)_82%)]"
      />

      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between border-b border-[#B8924A]/20">
        <span className="font-display text-xl tracking-wide text-[#E6C275] whitespace-nowrap shrink-0">
          Fantasy Character Creator
        </span>

        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:inline text-xs text-[#C4B8A8] tabular-nums whitespace-nowrap">
            {generatedCount === 0
              ? 'Ready to roll'
              : `${generatedCount} ${generatedCount === 1 ? 'hero' : 'heroes'} rolled`}
          </span>

          {generatedCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D6CBBC] hover:text-[#F4EDE2] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset Pool
            </button>
          )}
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,460px)_minmax(0,380px)] items-start justify-center gap-8">
          <section aria-label="Active Player Card" className="flex justify-center">
            <CharacterCard
              character={character}
              isSavedInDeck={isSavedInDeck}
              onGenerateCharacter={handleGenerateCharacter}
              onGeneratePortrait={handleGeneratePortrait}
              onRegeneratePortrait={handleRegeneratePortrait}
              onGenerateBackstory={handleGenerateBackstory}
              onSaveToDeck={handleSaveToDeck}
            />
          </section>

          <MyDeckPanel
            deck={deck}
            activeCharacterId={character?.id ?? null}
            onSelectCharacter={handleSelectFromDeck}
            onRemoveCharacter={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
          />
        </div>
      </main>
    </div>
  );
}

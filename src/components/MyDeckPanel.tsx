import { Layers, Trash2 } from 'lucide-react';
import type { Character } from '../types/character';
import { CLASS_ICONS } from './CharacterCard';

interface MyDeckPanelProps {
  deck: readonly Character[];
  activeCharacterId: string | null;
  onSelectCharacter: (character: Character) => void;
  onRemoveCharacter: (id: string) => void;
  onClearDeck: () => void;
}

export function MyDeckPanel({
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveCharacter,
  onClearDeck,
}: MyDeckPanelProps) {
  return (
    <aside
      aria-label="My Deck"
      className="w-full rounded-2xl bg-[#130F0C]/90 border border-[#B8924A]/30 p-5 sm:p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#B8924A]/20">
        <div className="flex items-center gap-2.5 min-w-0">
          <Layers className="w-4 h-4 text-[#D9AF5E] shrink-0" aria-hidden="true" />
          <h2 className="font-display text-xl tracking-wide text-[#F7EFE1] whitespace-nowrap">
            My Deck
          </h2>
          <span className="text-xs text-[#C4B8A8] tabular-nums whitespace-nowrap">
            · {deck.length} {deck.length === 1 ? 'hero' : 'heroes'}
          </span>
        </div>

        {deck.length > 0 && (
          <button
            type="button"
            onClick={onClearDeck}
            className="text-xs font-medium text-[#C4B8A8] hover:text-[#F4EDE2] px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] cursor-pointer"
          >
            Clear Deck
          </button>
        )}
      </div>

      {deck.length === 0 ? (
        <div className="py-10 px-4 text-center">
          <p className="text-sm font-medium text-[#E3DACB]">Your deck is empty</p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#C4B8A8] max-w-[30ch] mx-auto">
            Roll a hero on the player card and click Save to Deck to keep your favorites here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#B8924A]/15 max-h-[540px] overflow-y-auto pr-1">
          {deck.map((saved) => {
            const ClassIcon = CLASS_ICONS[saved.characterClass];
            const isSelected = saved.id === activeCharacterId;

            return (
              <li key={saved.id} className="py-2 first:pt-0 last:pb-0">
                <div
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                    isSelected ? 'bg-[#B8924A]/15' : 'hover:bg-white/4'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectCharacter(saved)}
                    aria-pressed={isSelected}
                    className="flex-1 min-w-0 flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] rounded-md cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg border border-[#B8924A]/30 bg-[#1B1612] flex items-center justify-center text-[#D9AF5E] shrink-0">
                      <ClassIcon className="w-4 h-4" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base leading-snug text-[#F7EFE1] truncate">
                        {saved.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#C4B8A8] tabular-nums truncate">
                        <span className="text-[#E6C275]">{saved.characterClass}</span>
                        <span aria-hidden="true"> · </span>
                        <span>HP {saved.stats.health}</span>
                        <span aria-hidden="true"> / </span>
                        <span>MP {saved.stats.mana}</span>
                        <span aria-hidden="true"> / </span>
                        <span>STR {saved.stats.strength}</span>
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveCharacter(saved.id)}
                    aria-label={`Remove ${saved.name} from My Deck`}
                    className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md text-[#C4B8A8] hover:text-[#F28B82] hover:bg-white/6 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9AF5E] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

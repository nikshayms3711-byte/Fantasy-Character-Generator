import type { Character, CharacterClass } from '../types/character';

interface ClassLoreFragments {
  openings: readonly ((name: string, place: string, relic: string) => string)[];
  motivations: readonly ((relic: string) => string)[];
}

const PLACES: readonly string[] = [
  'the Ashen Bastion',
  'the Sunken Scriptorium',
  'the Glass Caverns of Vael',
  'the Ironwood Marches',
  'the Salt-Spire Citadel',
  'the Duskwater Crossing',
  'the Whispering Fen',
  'the Gilded Forge of Oakhaven',
  'the Frostbound Watch',
  'the Obsidian Archive',
];

const RELICS: readonly string[] = [
  'a cracked astrolabe',
  'an ember-etched signet',
  'a silver-bound grimoire',
  'a notch-marked warhorn',
  'a vial of starlight ash',
  'an iron key without a lock',
  'a moth-eaten guild charter',
  'a shard of pale sunstone',
];

const CLASS_LORE: Record<CharacterClass, ClassLoreFragments> = {
  Warrior: {
    openings: [
      (name, place) =>
        `Forged in the shield-walls of ${place}, ${name} survived a three-day siege with nothing left but a splintered spear.`,
      (name, place, relic) =>
        `Once a blacksmith's apprentice near ${place}, ${name} took up arms after unearthing ${relic} from the slag heaps.`,
      (name, place) =>
        `${name} broke a mercenary oath at ${place} rather than raise steel against unarmed villagers.`,
      (name, place) =>
        `Raised among the border garrisons of ${place}, ${name} earned their scars defending winter supply caravans.`,
      (name, place, relic) =>
        `After outlasting every challenger in the pit arenas of ${place}, ${name} claimed ${relic} as proof of victory.`,
      (name, place) =>
        `${name} marched out of ${place} alone when the old banner fell, vowing never to fight for gold again.`,
    ],
    motivations: [
      (relic) =>
        `Now they wander the frontier seeking the warlord who shattered their regiment and stole ${relic}.`,
      () =>
        `Today they lend their blade only to causes worthy of the comrades they buried.`,
      (relic) =>
        `Guided by ${relic}, they hunt the monster that laid waste to their homeland.`,
      () =>
        `They travel light, testing their mettle against every champion along the king's road.`,
      () =>
        `Their sole aim is to forge a lasting peace—even if it takes one final campaign.`,
    ],
  },
  Mage: {
    openings: [
      (name, place) =>
        `Expelled from the high towers of ${place} for reading sealed texts, ${name} learned to weave raw starlight without a master.`,
      (name, place, relic) =>
        `While cataloging dusty shelves in ${place}, ${name} bound their shadow to ${relic} by sheer accident.`,
      (name, place) =>
        `Born during a rare crimson eclipse over ${place}, ${name} could coax sparks from cold hearthstones before age seven.`,
      (name, place) =>
        `${name} spent a decade decoding burnt alchemical margins in ${place} until the runes began answering back.`,
      (name, place, relic) =>
        `After surviving a wild mana surge at ${place}, ${name} salvaged ${relic} from the scorched laboratory floor.`,
      (name, place) =>
        `Once a humble lantern-lighter in ${place}, ${name} discovered their voice could bend frost and flame alike.`,
    ],
    motivations: [
      (relic) =>
        `Now they search the outer realms for the missing pages tied to ${relic}.`,
      () =>
        `They roam in secret, determined to seal an ancient rift before its tremors reach the surface.`,
      (relic) =>
        `With ${relic} tucked inside their satchel, they seek a spell capable of undoing a forgotten curse.`,
      () =>
        `Every journey brings them closer to proving their banned theories were right all along.`,
      () =>
        `They trade rare incantations for shelter, always watching the night sky for omens.`,
    ],
  },
  Rogue: {
    openings: [
      (name, place) =>
        `Growing up along the rain-slick rooftops of ${place}, ${name} learned to pick brass locks before they learned to read.`,
      (name, place, relic) =>
        `${name} lifted ${relic} from a corrupt magistrate in ${place}, only to realize the prize carried a secret bounty.`,
      (name, place) =>
        `Once the quietest courier in ${place}, ${name} vanished into the alleys after intercepting a treasonous ledger.`,
      (name, place) =>
        `Trained by a retired safecracker in ${place}, ${name} never leaves a footprint or an unlocked vault behind.`,
      (name, place, relic) =>
        `After a botched heist beneath ${place}, ${name} escaped through the storm drains clutching ${relic}.`,
      (name, place) =>
        `${name} outwitted three rival syndicates in ${place} on a single moonless night—and made enemies of them all.`,
    ],
    motivations: [
      (relic) =>
        `Now they stay two steps ahead of hired blades while uncovering who truly owns ${relic}.`,
      () =>
        `They take only impossible contracts, splitting half the coin with the docks that raised them.`,
      (relic) =>
        `Armed with a sharp wit and ${relic}, they plan one last score to erase their debt forever.`,
      () =>
        `They drift from tavern to tavern, collecting whispers worth more than gold.`,
      () =>
        `Wherever locked doors hide dirty secrets, they are already halfway inside.`,
    ],
  },
  Ranger: {
    openings: [
      (name, place) =>
        `Raised beyond the timberline of ${place}, ${name} can track a silent stag across bare granite by scent alone.`,
      (name, place, relic) =>
        `While mapping forgotten trails outside ${place}, ${name} pulled ${relic} from the roots of an ancient cedar.`,
      (name, place) =>
        `${name} spent seven winters guiding lost travelers safely past the beast-haunted cliffs of ${place}.`,
      (name, place) =>
        `After fire swept through the border groves near ${place}, ${name} swore to guard every surviving sapling.`,
      (name, place, relic) =>
        `Guided by an old hawk and ${relic}, ${name} charted paths through ${place} no royal scout dared walk.`,
      (name, place) =>
        `${name} grew up listening to wolf packs along ${place}, learning when to loose an arrow and when to stay unseen.`,
    ],
    motivations: [
      (relic) =>
        `Now they follow faint tracks eastward, hoping ${relic} leads to the sanctuary of old legends.`,
      () =>
        `They patrol the wild borderlands, keeping unnatural predators far from quiet farmsteads.`,
      (relic) =>
        `Every notch on their bow marks a trail followed in pursuit of ${relic}'s true maker.`,
      () =>
        `They prefer starlight to stone walls and answer only to the shifting seasons.`,
      () =>
        `Today they hunt the rogue chimera spotted near the crossroads.`,
    ],
  },
  Cleric: {
    openings: [
      (name, place) =>
        `Once a bell-ringer at the hillside chapel of ${place}, ${name} answered a quiet miracle during the winter plague.`,
      (name, place, relic) =>
        `When bandits sacked the abbey of ${place}, ${name} carried ${relic} and three wounded novices to safety.`,
      (name, place) =>
        `${name} tended lanterns in the crypts of ${place} until a fading spirit entrusted them with a sacred vow.`,
      (name, place) =>
        `Chosen by lot in ${place}, ${name} left cloistered peace behind to mend broken bones on distant battlefields.`,
      (name, place, relic) =>
        `After a night of vigil at ${place}, ${name} awoke to find ${relic} glowing softly upon the altar.`,
      (name, place) =>
        `${name} learned herbal lore and sacred hymns from the wandering healers of ${place}.`,
    ],
    motivations: [
      (relic) =>
        `Now they carry ${relic} into dark corners of the realm where hope has nearly flickered out.`,
      () =>
        `They walk beside weary travelers, offering steady light and unshakable resolve.`,
      (relic) =>
        `They seek the lost shrine where ${relic} was first consecrated centuries ago.`,
      () =>
        `No wound is too grim and no road too bleak to turn them from their mercy.`,
      () =>
        `They aim to unite scattered parishes before the coming shadow takes hold.`,
    ],
  },
  Paladin: {
    openings: [
      (name, place) =>
        `Knighted atop the storm-lashed walls of ${place}, ${name} pledged their sword to the defense of the voiceless.`,
      (name, place, relic) =>
        `When their order fractured at ${place}, ${name} refused to surrender ${relic} to a corrupt commander.`,
      (name, place) =>
        `${name} stood vigil for seven nights in the ruined courtyard of ${place} before taking the silver oath.`,
      (name, place) =>
        `Born to a humble quarry family near ${place}, ${name} earned their spurs by shielding fleeing townsfolk from wyverns.`,
      (name, place, relic) =>
        `Armed with ${relic} and battered plate, ${name} rode out of ${place} to redeem a disgraced banner.`,
      (name, place) =>
        `${name} swore an unbroken vow beneath the sun-arch of ${place} never to yield ground to tyranny.`,
    ],
    motivations: [
      (relic) =>
        `Now they ride toward the horizon, bearing ${relic} as a beacon against encroaching darkness.`,
      () =>
        `They seek the fallen fortress where their mentor vanished, ready to finish the crusade.`,
      (relic) =>
        `Bound by honor and ${relic}, they challenge every tyrant who rules through fear.`,
      () =>
        `Their shield carries a dozen dents, each earned standing between peril and an innocent stranger.`,
      () =>
        `They walk the realm until justice needs no sword to defend it.`,
    ],
  },
  Bard: {
    openings: [
      (name, place) =>
        `Chased out of ${place} after singing a painfully accurate ballad about the duke, ${name} turned exile into a grand tour.`,
      (name, place, relic) =>
        `${name} won ${relic} in a midnight lute duel beneath the lantern arches of ${place}.`,
      (name, place) =>
        `Raised in a traveling puppet troupe outside ${place}, ${name} discovered that certain melodies can mend—or shatter—stone.`,
      (name, place) =>
        `${name} memorized a hundred forbidden verses in the wine cellars of ${place} before the ink faded.`,
      (name, place, relic) =>
        `Trading a tune for passage out of ${place}, ${name} stumbled upon ${relic} sewn inside a velvet cloak.`,
      (name, place) =>
        `Once a court chronicler in ${place}, ${name} chose the open road when truth grew unwelcome inside the palace.`,
    ],
    motivations: [
      (relic) =>
        `Now they gather untold legends across the realm while decoding the melody humming inside ${relic}.`,
      () =>
        `They search for a hero worthy of their finest epic—and enough coin for tomorrow's supper.`,
      (relic) =>
        `With a quick chord and ${relic}, they talk their way into places armies could never breach.`,
      () =>
        `Every tavern brawl and royal intrigue becomes another verse in their unfinished song.`,
      () =>
        `They travel far and wide to ensure the forgotten names of history are sung once more.`,
    ],
  },
  Necromancer: {
    openings: [
      (name, place) =>
        `After mourning a lost sibling in the silent vaults of ${place}, ${name} learned to summon echoes from beyond the veil.`,
      (name, place, relic) =>
        `Studying cracked gravestones near ${place}, ${name} uncovered ${relic} humming with pale, restless memory.`,
      (name, place) =>
        `Exiled from the healers' guild of ${place} for refusing to let death have the final word, ${name} walked into the mist.`,
      (name, place) =>
        `${name} tended the lantern-lit catacombs of ${place} until the spirits began offering counsel in return.`,
      (name, place, relic) =>
        `Bound by a quiet pact forged at ${place}, ${name} carries ${relic} to keep ancient shades from wandering loose.`,
      (name, place) =>
        `Once an apothecary in ${place}, ${name} crossed the threshold of forbidden alchemy while seeking a cure for blight.`,
    ],
    motivations: [
      (relic) =>
        `Now they walk the border of dusk, using ${relic} to lay restless spirits to proper sleep.`,
      () =>
        `They seek the lost necropolis where the first bargain between mortals and shadows was inked.`,
      (relic) =>
        `Guided by whispered truths and ${relic}, they intend to unravel a centuries-old betrayal.`,
      () =>
        `Though feared by villagers, they guard the living from horrors stirred beneath old battlefields.`,
      () =>
        `Every quiet step brings them closer to the secret that will finally balance their ledger with fate.`,
    ],
  },
};

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export class BackstoryGenerator {
  private usedBackstories = new Set<string>();

  public generateUniqueBackstory(character: Character): string {
    const lore = CLASS_LORE[character.characterClass];
    const maxAttempts = 60;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const place = pickRandom(PLACES);
      const relic = pickRandom(RELICS);
      const openingFn = pickRandom(lore.openings);
      const motivationFn = pickRandom(lore.motivations);

      const sentence1 = openingFn(character.name, place, relic);
      const includeSecondSentence = Math.random() > 0.15;
      const story = includeSecondSentence ? `${sentence1} ${motivationFn(relic)}` : sentence1;

      if (!this.usedBackstories.has(story) && story !== character.backstory) {
        this.usedBackstories.add(story);
        return story;
      }
    }

    // Fallback if pool is heavily sampled during a long session
    const place = pickRandom(PLACES);
    const relic = pickRandom(RELICS);
    const fallback = `${pickRandom(lore.openings)(character.name, place, relic)} ${pickRandom(lore.motivations)(relic)}`;
    this.usedBackstories.add(fallback);
    return fallback;
  }

  public resetHistory(): void {
    this.usedBackstories.clear();
  }
}

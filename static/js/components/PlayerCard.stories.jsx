import { PlayerCard } from './PlayerCard';

export default {
  title: 'Organisms/PlayerCard',
  component: PlayerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'text',
      description: 'Player position (e.g., CF, 1B, SS)',
    },
    firstName: {
      control: 'text',
      description: 'Player first name',
    },
    lastName: {
      control: 'text',
      description: 'Player last name',
    },
    tier: {
      control: 'select',
      options: ['iron', 'bronze', 'silver', 'gold', 'diamond', 'perfect'],
      description: 'Card tier determining the gradient background',
    },
    year: {
      control: 'number',
      description: 'Card year',
    },
  },
};

export const Perfect = {
  args: {
    position: 'CF',
    firstName: 'Mickey',
    lastName: 'Mantle',
    tier: 'perfect',
    year: 1961,
  },
};

export const Diamond = {
  args: {
    position: 'SS',
    firstName: 'Derek',
    lastName: 'Jeter',
    tier: 'diamond',
    year: 1999,
  },
};

export const Gold = {
  args: {
    position: '1B',
    firstName: 'Paul',
    lastName: 'Goldschmidt',
    tier: 'gold',
    year: 2022,
  },
};

export const Silver = {
  args: {
    position: '3B',
    firstName: 'Nolan',
    lastName: 'Arenado',
    tier: 'silver',
    year: 2020,
  },
};

export const Bronze = {
  args: {
    position: '2B',
    firstName: 'Jose',
    lastName: 'Altuve',
    tier: 'bronze',
    year: 2017,
  },
};

export const Iron = {
  args: {
    position: 'LF',
    firstName: 'Randy',
    lastName: 'Arozarena',
    tier: 'iron',
    year: 2023,
  },
};

export const AllTiers = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <PlayerCard
        position="CF"
        firstName="Mickey"
        lastName="Mantle"
        tier="perfect"
        year={1961}
      />
      <PlayerCard
        position="SS"
        firstName="Derek"
        lastName="Jeter"
        tier="diamond"
        year={1999}
      />
      <PlayerCard
        position="1B"
        firstName="Paul"
        lastName="Goldschmidt"
        tier="gold"
        year={2022}
      />
      <PlayerCard
        position="3B"
        firstName="Nolan"
        lastName="Arenado"
        tier="silver"
        year={2020}
      />
      <PlayerCard
        position="2B"
        firstName="Jose"
        lastName="Altuve"
        tier="bronze"
        year={2017}
      />
      <PlayerCard
        position="LF"
        firstName="Randy"
        lastName="Arozarena"
        tier="iron"
        year={2023}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card tiers displayed together showing the gradient design system.',
      },
    },
  },
};

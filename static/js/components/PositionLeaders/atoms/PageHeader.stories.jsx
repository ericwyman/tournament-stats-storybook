import { PageHeader } from './PageHeader';

export default {
  title: 'Atoms/PositionLeaders/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Position Leaders',
    subtitle: '2014 Fall Classic - Top 5 by wOBA',
  }
};

export const DifferentTournament = {
  args: {
    title: 'Position Leaders',
    subtitle: '2021 Summer Showdown - Top 5 by wOBA',
  }
};

export const ShortTitle = {
  args: {
    title: 'Leaders',
    subtitle: 'Daily Gold Cap',
  }
};

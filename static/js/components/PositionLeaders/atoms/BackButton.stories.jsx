import { BackButton } from './BackButton';

export default {
  title: 'Atoms/PositionLeaders/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    onClick: () => console.log('Back button clicked'),
  }
};

export const CustomText = {
  args: {
    text: '← Back to Home',
    onClick: () => console.log('Back button clicked'),
  }
};

export const BackToList = {
  args: {
    text: '← Back to Tournament List',
    onClick: () => console.log('Back button clicked'),
  }
};

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

export default {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This card has no footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card. It can contain any React elements.</p>
      </CardContent>
    </Card>
  ),
};

export const TournamentCard = {
  render: () => (
    <Card className="w-[350px] shadow-lg border-2 border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-black text-gray-900">Sept 29 - Current</h2>
          <div className="text-sm px-3 py-1 bg-green-100 text-green-700 border-green-300 rounded-full">
            Active
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 border-blue-300 px-2.5 py-0.5 text-xs rounded-full">
              2025
            </span>
            <span className="text-gray-700 border-gray-300 border px-2.5 py-0.5 text-xs rounded-full">
              Daily
            </span>
          </div>
          <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Stadium:</span>
                <span className="text-gray-900 font-semibold">Oracle Park</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Entrants:</span>
                <span className="text-gray-900 font-bold">256</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how cards are used in the Tournament List page with design tokens.',
      },
    },
  },
};

export const PositionLeadersCard = {
  render: () => (
    <Card className="w-[350px] shadow-lg border-2 border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-black text-gray-900">LF</h2>
          <div className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 border-indigo-300 rounded-full">
            Top 5
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl p-4 gradient-perfect text-white shadow-md">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs px-2 py-0.5 bg-white/20 text-white border-white/40 rounded-full">
                #1
              </span>
              <span className="text-xs px-2 py-0.5 bg-white/20 text-white border-white/40 rounded-full">
                Perfect
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1">Hank Aaron</h3>
            <p className="text-xs text-white/80 mb-2">1971 Atlanta Braves</p>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div>
                <div className="text-white/70 text-xs">wOBA</div>
                <div className="font-bold">.425</div>
              </div>
              <div>
                <div className="text-white/70 text-xs">OPS</div>
                <div className="font-bold">1.066</div>
              </div>
              <div>
                <div className="text-white/70 text-xs">AVG</div>
                <div className="font-bold">.339</div>
              </div>
              <div>
                <div className="text-white/70 text-xs">PA</div>
                <div className="font-bold">750</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how cards are used in the Position Leaders page with tier gradients.',
      },
    },
  },
};

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Badge } from './badge';

export default {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">001</TableCell>
          <TableCell>Transaction 1</TableCell>
          <TableCell>Success</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">002</TableCell>
          <TableCell>Transaction 2</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">003</TableCell>
          <TableCell>Transaction 3</TableCell>
          <TableCell>Failed</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const TournamentList = {
  render: () => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 border-b border-gray-200">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Tournament
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Year
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Type
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Stadium
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Entrants
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-6 py-4">
                <div className="font-bold text-gray-900">Sept 29 - Current</div>
                <div className="text-xs text-gray-500">Sep 29, 2025 - Ongoing</div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">2025</Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="outline" className="text-gray-700 border-gray-300 text-xs">
                  Daily
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm text-gray-900 font-semibold">Oracle Park</div>
                <div className="text-xs text-gray-500">L/R: 87/92</div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="font-bold text-gray-900">256</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge className="text-xs px-2 py-1 bg-green-100 text-green-700 border-green-300">
                  Active
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-6 py-4">
                <div className="font-bold text-gray-900">Silver Quicks Daily</div>
                <div className="text-xs text-gray-500">Aug 15, 2025 - Sep 15, 2025</div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">2025</Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="outline" className="text-gray-700 border-gray-300 text-xs">
                  Daily
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm text-gray-900 font-semibold">Coors Field</div>
                <div className="text-xs text-gray-500">L/R: 105/103</div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="font-bold text-gray-900">512</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 border-indigo-300">
                  Complete
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-6 py-4">
                <div className="font-bold text-gray-900">Gold Standard Weekly</div>
                <div className="text-xs text-gray-500">Jul 1, 2025 - Jul 31, 2025</div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">2025</Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="outline" className="text-gray-700 border-gray-300 text-xs">
                  Weekly
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm text-gray-900 font-semibold">Fenway Park</div>
                <div className="text-xs text-gray-500">L/R: 97/95</div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="font-bold text-gray-900">128</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 border-indigo-300">
                  Complete
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how tables are used in the Tournament List page with design tokens and proper styling.',
      },
    },
  },
};

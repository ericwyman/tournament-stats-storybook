import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

export default {
  title: 'UI Primitives/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Simple dialog
export const Default = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a simple dialog with a title and description.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Dialog content goes here. You can add any content you want.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
};

// Form dialog
export const FormDialog = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Tournament</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Tournament</DialogTitle>
          <DialogDescription>
            Enter tournament details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tournament Name</Label>
            <Input id="name" placeholder="Fall Classic 2024" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" type="number" placeholder="2024" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tier">Tier</Label>
            <Input id="tier" placeholder="Diamond" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Tournament</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

// Confirmation dialog
export const ConfirmationDialog = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Tournament</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the tournament
            and remove all associated data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

// Player detail dialog
export const PlayerDetailDialog = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Player Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Mike Trout</DialogTitle>
          <DialogDescription>
            2019 Los Angeles Angels - Center Field
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Card Tier</div>
              <div className="text-lg font-bold">Perfect</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Overall</div>
              <div className="text-lg font-bold">99</div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Stats</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-gray-500">AVG</div>
                <div className="font-bold">.291</div>
              </div>
              <div>
                <div className="text-gray-500">HR</div>
                <div className="font-bold">45</div>
              </div>
              <div>
                <div className="text-gray-500">wOBA</div>
                <div className="font-bold">.438</div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button>View Full Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

// Tournament stats dialog
export const TournamentStatsDialog = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Tournament Summary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Fall Classic 2024 - Statistics</DialogTitle>
          <DialogDescription>
            Tournament summary and key statistics
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">64</div>
              <div className="text-sm text-gray-500">Entrants</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">128</div>
              <div className="text-sm text-gray-500">Games</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-gray-500">Total ABs</div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Top Performers</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Mike Trout (CF)</span>
                <span className="font-bold">.438 wOBA</span>
              </div>
              <div className="flex justify-between">
                <span>Aaron Judge (RF)</span>
                <span className="font-bold">.425 wOBA</span>
              </div>
              <div className="flex justify-between">
                <span>Mookie Betts (RF)</span>
                <span className="font-bold">.412 wOBA</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Export Data</Button>
          <Button>View Full Stats</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

// Small dialog
export const SmallDialog = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Quick Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Quick Info</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            This is a smaller dialog for brief information or simple actions.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
};

// Wide dialog
export const WideDialog = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Comparison</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Player Comparison</DialogTitle>
          <DialogDescription>
            Side-by-side comparison of player statistics
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-8 py-4">
          <div>
            <h3 className="font-bold mb-2">Mike Trout</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>AVG:</span>
                <span className="font-bold">.291</span>
              </div>
              <div className="flex justify-between">
                <span>HR:</span>
                <span className="font-bold">45</span>
              </div>
              <div className="flex justify-between">
                <span>wOBA:</span>
                <span className="font-bold">.438</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Aaron Judge</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>AVG:</span>
                <span className="font-bold">.311</span>
              </div>
              <div className="flex justify-between">
                <span>HR:</span>
                <span className="font-bold">62</span>
              </div>
              <div className="flex justify-between">
                <span>wOBA:</span>
                <span className="font-bold">.458</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
};

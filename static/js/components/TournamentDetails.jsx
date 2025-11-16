// TournamentDetails.jsx - shadcn version with sidebar
// static/js/components/TournamentDetails.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { TournamentHeader } from '@/components/TournamentHeader'
import '../../css/src/styles.css'

const TournamentDetailsContent = ({ tournament }) => {
  const {
    name = 'Daily Gold Cap',
    year = 1996,
    type = 'Daily',
    mode = 'Bo5 Finals Bo7',
    stadium = '1995 Coors Field',
    entry_fee = 'Free',
    dh_rule = true,
    cap = 1822,
    entrants = 64,
    park_factors = {
      park: { lefty: 100.0, righty: 100.0 },
      gap: { lefty: 100.0, righty: 100.0 },
      power: { lefty: 100.0, righty: 100.0 },
      babip: { lefty: 100.0, righty: 100.0 }
    }
  } = tournament || {}

  // Helper function to format percentage
  const formatPercent = (value) => {
    return `${value.toFixed(1)}%`
  }

  // Determine tier based on cap (temporary logic until Django API provides tier)
  const determineTier = (cap, year) => {
    // Default tiers based on typical cap ranges
    // This is placeholder logic - in production, tier should come from Django API
    if (!cap) return 'gold'
    if (cap < 1000) return 'iron'
    if (cap < 1500) return 'bronze'
    if (cap < 2000) return 'silver'
    if (cap < 2500) return 'gold'
    if (cap < 3000) return 'diamond'
    return 'perfect'
  }

  // Determine SP/RP needed based on mode (placeholder until API provides)
  const getPitchingRequirements = (mode) => {
    // Bo7 typically needs 2 SP, Bo5 needs 1 SP, etc.
    // This is placeholder logic
    if (mode.includes('Bo7')) return { spNeeded: 2, rpNeeded: 3 }
    if (mode.includes('Bo5')) return { spNeeded: 1, rpNeeded: 3 }
    return { spNeeded: 1, rpNeeded: 2 }
  }

  const tier = determineTier(cap, year)
  const { spNeeded, rpNeeded } = getPitchingRequirements(mode)

  // Prepare data for TournamentHeader component
  const tournamentData = {
    name,
    tier,
    year,
    type,
    mode,
    stadium
  }

  const tournamentDetails = {
    entryFee: entry_fee || 'Free',
    dhRule: dh_rule,
    cap: cap || 'No Cap',
    entrants,
    spNeeded,
    rpNeeded
  }

  // Note: Run environment data not yet available from Django API
  // This would include era name and rating modifiers
  const runEnvironment = null

  return (
    <div className="p-6 space-y-6">
      {/* Tournament Header */}
      <TournamentHeader
        tournament={tournamentData}
        details={tournamentDetails}
        runEnvironment={runEnvironment}
      />
      {/* Collapsible Tournament Details Panel */}
      <Collapsible defaultOpen={true}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Tournament Details</CardTitle>
                <ChevronDown className="h-5 w-5 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {/* Tournament Properties Grid - Two Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Salary Cap Card */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Salary Cap</CardDescription>
                    <CardTitle className="text-2xl">{cap.toLocaleString()}</CardTitle>
                  </CardHeader>
                </Card>

                {/* Entrants Card */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Entrants</CardDescription>
                    <CardTitle className="text-2xl">{entrants} <span className="text-lg font-normal text-muted-foreground">teams</span></CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Stadium & Park Factors Combined Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{stadium}</CardTitle>
                  <CardDescription>
                    Ballpark effects by handedness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 md:grid-cols-4">
                    {/* Park Factor */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Park</div>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Lefty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.park.lefty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.park.lefty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.park.lefty)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Righty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.park.righty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.park.righty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.park.righty)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Gap Factor */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Gap</div>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Lefty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.gap.lefty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.gap.lefty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.gap.lefty)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Righty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.gap.righty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.gap.righty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.gap.righty)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Power Factor */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Power</div>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Lefty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.power.lefty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.power.lefty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.power.lefty)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Righty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.power.righty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.power.righty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.power.righty)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BABIP Factor */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">BABIP</div>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Lefty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.babip.lefty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.babip.lefty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.babip.lefty)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Righty</span>
                          <span className={`text-3xl font-semibold ${
                            park_factors.babip.righty > 100 ? 'text-green-600 dark:text-green-400' :
                            park_factors.babip.righty < 100 ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                          }`}>
                            {formatPercent(park_factors.babip.righty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Stats Card - Placeholder for future data */}
      <Card>
        <CardHeader>
          <CardTitle>Tournament Statistics</CardTitle>
          <CardDescription>
            Performance metrics and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 opacity-20"
            >
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
            <p className="text-sm">Statistics will be displayed here</p>
            <p className="text-xs mt-1">Connect to data source to populate</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const TournamentDetails = ({ tournament }) => {
  // Determine current path from window location
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

  return (
    <SidebarProvider>
      <AppSidebar currentPath={currentPath} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">{tournament?.name || 'Daily Gold Cap'}</h1>
            <Badge variant="secondary">{tournament?.year || 1996}</Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <TournamentDetailsContent tournament={tournament} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Mount React component
if (typeof window !== 'undefined') {
  const tournamentData = window.TOURNAMENT_DATA
  const rootElement = document.getElementById('react-root')

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<TournamentDetails tournament={tournamentData} />)
  }
}

export default TournamentDetails
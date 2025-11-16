/**
 * TournamentCardSkeleton - Loading skeleton for tournament card
 *
 * Provides visual feedback while tournament data is loading
 */

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TournamentCardSkeleton() {
  return (
    <Card className="shadow-lg border-2 border-border">
      <CardContent className="p-6">
        {/* Tournament Header */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Tournament Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>

          <div className="rounded-xl p-4 bg-muted/50 border border-border">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <Skeleton className="w-full h-10 mt-4 rounded-lg" />
      </CardContent>
    </Card>
  );
}

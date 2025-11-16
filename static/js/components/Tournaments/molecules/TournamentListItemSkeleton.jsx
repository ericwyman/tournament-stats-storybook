/**
 * TournamentListItemSkeleton - Loading skeleton for tournament list row
 *
 * Provides visual feedback while tournament data is loading in list view
 */

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function TournamentListItemSkeleton() {
  return (
    <tr className="border-b border-border">
      <td className="px-6 py-4">
        <Skeleton className="h-5 w-48 mb-2" />
        <Skeleton className="h-3 w-36" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-16" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-16" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-28 mb-2" />
        <Skeleton className="h-3 w-20" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-5 w-12" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-20" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
      </td>
    </tr>
  );
}

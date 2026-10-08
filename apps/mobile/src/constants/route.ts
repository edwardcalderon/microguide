import type { IconName } from '@/components/ui/icon';

export type DestinationId = 'a' | 'b' | 'c';

export const DESTINATIONS: { id: DestinationId; icon: IconName }[] = [
  { id: 'a', icon: 'desktop-outline' }, // Computer Lab
  { id: 'b', icon: 'library-outline' },
  { id: 'c', icon: 'folder-open-outline' },
];

export type RouteNode = {
  id: number;
  icon: IconName;
  directionKey: string;
  landmarkKey: string;
  walkMin: number;
};

export const ROUTE: { totalNodes: number; nodes: RouteNode[] } = {
  totalNodes: 5,
  nodes: [
    { id: 1, icon: 'exit-outline', directionKey: 'direction_1', landmarkKey: 'lm_1_name', walkMin: 2 },
    // "Go up the central staircase."
    { id: 2, icon: 'mci:stairs', directionKey: 'direction_2', landmarkKey: 'lm_2_name', walkMin: 3 },
    { id: 3, icon: 'arrow-forward-outline', directionKey: 'direction_3', landmarkKey: 'lm_3_name', walkMin: 2 },
    { id: 4, icon: 'mci:human-male-female', directionKey: 'direction_4', landmarkKey: 'lm_4_name', walkMin: 1 },
    { id: 5, icon: 'flag', directionKey: 'direction_5', landmarkKey: 'lm_5_name', walkMin: 2 },
  ],
};

export const TOTAL_ROUTE_MIN = ROUTE.nodes.reduce((sum, n) => sum + n.walkMin, 0);

export type DestinationId = 'a' | 'b' | 'c';

export const DESTINATIONS: { id: DestinationId; icon: string }[] = [
  { id: 'a', icon: '🖥️' }, // Computer Lab — was a chemistry flask; a monitor reads correctly instead.
  { id: 'b', icon: '📚' },
  { id: 'c', icon: '🗂️' },
];

export type RouteNode = {
  id: number;
  icon: string;
  directionKey: string;
  landmarkKey: string;
  walkMin: number;
};

export const ROUTE: { totalNodes: number; nodes: RouteNode[] } = {
  totalNodes: 5,
  nodes: [
    { id: 1, icon: '🚪', directionKey: 'direction_1', landmarkKey: 'lm_1_name', walkMin: 2 },
    // "Go up the central staircase" — no dedicated stairs glyph is reliably supported
    // cross-platform; a plain up arrow reads unambiguously everywhere a ladder wouldn't.
    { id: 2, icon: '⬆️', directionKey: 'direction_2', landmarkKey: 'lm_2_name', walkMin: 3 },
    // Plain right arrow instead of a hook-arrow glyph, which some renderers draw inconsistently.
    { id: 3, icon: '➡️', directionKey: 'direction_3', landmarkKey: 'lm_3_name', walkMin: 2 },
    { id: 4, icon: '🚻', directionKey: 'direction_4', landmarkKey: 'lm_4_name', walkMin: 1 },
    { id: 5, icon: '🏁', directionKey: 'direction_5', landmarkKey: 'lm_5_name', walkMin: 2 },
  ],
};

export const TOTAL_ROUTE_MIN = ROUTE.nodes.reduce((sum, n) => sum + n.walkMin, 0);

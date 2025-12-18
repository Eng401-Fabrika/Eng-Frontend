export type NavigationItem = {
  id: string;
  label: string;
  path: string;
  order: number;
};

export type NavigationGroup = {
  id: string;
  label: string;
  order: number;
  items: NavigationItem[];
};


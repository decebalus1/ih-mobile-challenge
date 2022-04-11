export enum Tabs {
  MOVIES = 'Movies',
  CHARACTERS = 'Characters',
  SEARCH = 'Search',
}

interface IconMap {
  [key: string]: string;
}

export const ICON_MAP: IconMap = {
  [Tabs.MOVIES]: 'rocket',
  [Tabs.CHARACTERS]: 'drama-masks',
  [Tabs.SEARCH]: 'movie-search',
};

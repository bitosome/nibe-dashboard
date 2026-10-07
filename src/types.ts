export interface Entity {
  entity_id?: string;
  state: string;
  attributes: Record<string, unknown>;
  last_updated?: string;
}
export interface Hass {
  states: Record<string, Entity>;
  connected?: boolean;
  connection?: { connected?: boolean };
  locale?: { language?: string };
  callService(domain: string, action: string, data: Record<string, unknown>): Promise<unknown>;
}
export interface Room { entity: string; name?: string; }
export interface CardConfig {
  type: 'custom:nibe-dashboard';
  title?: string;
  subtitle?: string;
  read_only?: boolean;
  controller_entity?: string;
  entities?: Record<string, string | null>;
  rooms?: Room[];
  watch_automations?: string[];
  history_hours?: number;
}
export interface HistoryCard extends HTMLElement { hass?: Hass; }
declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string; preview: boolean }[];
    loadCardHelpers?: () => Promise<{ createCardElement(config: Record<string, unknown>): HistoryCard }>;
  }
}

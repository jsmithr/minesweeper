import { Mine } from "./mine";

export interface Board {
  size: { rows: number, cols: number };
  mines: Mine[];
  view: number[][] | null
}
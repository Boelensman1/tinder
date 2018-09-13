export interface SuperLikes {
  remaining: number;
  alcRemaining: number;
  newAlcRemaining: number;
  allotment: number;
  superlikeRefreshAmount: number;
  superlikeRefreshInterval: number;
  superlikeRefreshIntervalUnit: string;
  resetsAt?: Date;
}

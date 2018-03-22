export interface Photo {
  id: string;
  url: string;
  processedFiles: [{
    url: string;
    height: number;
    width: number;
  }];
  fileName: string;
  extension:  string;
  main?: boolean;
  successRate?: number;
  selectRate?: 0;
  shape?: string;
}

export interface MasterGridOperationOption {
  title?: string;
  width?: number;
  resizable?: boolean;
  locked?: boolean;
  hidden?: boolean;
  headerStyle?: {
    [key: string]: string;
  };
  minResizableWidth?: number;

}

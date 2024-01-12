export type DataItem = {
    name: string;
    activate: boolean;
  };
  
export type DataStructure = {
    [key: string]: DataItem[];
  };
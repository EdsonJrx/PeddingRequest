import { DataStructure } from "./types";
  
  export const countActiveItems = (data: DataStructure, categories: string[]): {[key: string]: number} => {
    const result: {[key: string]: number} = {};
    categories.forEach(category => {
      if (data[category]) {
        result[category] = data[category].filter(item => item.activate).length;
      }
    });
    console.log("result",result)
    return result;
  };

  
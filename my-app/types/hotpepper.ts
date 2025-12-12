// types/hotpepper.ts

export type HotPepperShop = {
  id: string;
  name: string;
  genre: {
    name: string;
  };
  budget: {
    name: string; 
    average: string; 
  };
  access: string; 
  open: string; 
  photo: {
    pc: {
      l: string; 
    };
  };
  // 必要に応じて他のフィールドを追加
};
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}


export type SidebarTabsList = {
  title: string;
  data: {
      id: number;
      name: string;
  }[];
};

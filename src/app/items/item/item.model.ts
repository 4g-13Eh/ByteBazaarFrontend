export interface ItemModel {
  id: string;
  name: string;
  description: string;
  picture?: string | HTMLImageElement | File // either urlstring, <img>-element or File from input
  price: number;
  in_stock: boolean;
  stock_num: number;
  category: categories;
}

export interface ItemData {
  name: string;
  description: string;
  picture?: string | HTMLImageElement | File // either urlstring, <img>-element or File from input
  price: number;
  in_stock: boolean;
  stock_num: number;
  category: categories;
}

export type categories =
  Array<"Audio" | "Büro" | "Drohnen" | "Foto" | "Video" | "Gaming" | "Netzwerk" | "Notebooks" | "TV" | "PC" | "Handys">;

export type category =
  "Audio" | "Büro" | "Drohnen" | "Foto" | "Video" | "Gaming" | "Netzwerk" | "Notebooks" | "TV" | "PC" | "Handys";

export const CATEGORIES: categories = ["Audio", "Büro", "Drohnen", "Foto", "Video", "Gaming", "Netzwerk", "Notebooks", "TV", "PC", "Handys"];

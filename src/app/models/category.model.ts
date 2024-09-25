export type categories =
  Array<"Audio" | "Büro" | "Drohnen" | "Foto" | "Video" | "Gaming" | "Netzwerk" | "Notebooks" | "TV" | "PC" | "Handys">;

export type category =
  "Audio" | "Büro" | "Drohnen" | "Foto" | "Video" | "Gaming" | "Netzwerk" | "Notebooks" | "TV" | "PC" | "Handys";

export const CATEGORIES: categories = ["Audio", "Büro", "Drohnen", "Foto", "Video", "Gaming", "Netzwerk", "Notebooks", "TV", "PC", "Handys"];

export interface Category {
  id: number;
  categoryName: string;
}

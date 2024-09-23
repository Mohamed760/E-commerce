export interface CategoryRes {
  results: number;
  metadata: Metadata;
  data: Categroy[];
}

export interface Categroy {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
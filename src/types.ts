export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  link: string;
  image: string;
  category: string;
}

export interface Store {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  link: string;
  type: 'video' | 'article';
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface Blog {
  title: string;
  description: string;
  content: string;
  likedBy: Array<{ name: string; id: string }>;
}

export interface Preview {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

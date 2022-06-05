export interface Project {
  name: string;
  issues: Issue[];
}

export interface Issue {
  title: string;
  description: string;
}
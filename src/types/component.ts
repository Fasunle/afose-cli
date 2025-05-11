export type FileData = {
  path: string;
  content: string;
  type: string;
  target: string;
};

export type ComponentRegistry = {
  name: string;
  description: string;
  files: FileData[];
  dependencies: string[];
  devDependencies: string[];
  keywords: string[];
};

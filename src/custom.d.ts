type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  firstInit: number;
  createRecordError: Error | null;
  currentTag?: Tag;
};

type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};
type Result = {
  title: string;
  total?: number;
  items: RecordItem[];
  type: string;
};

type Tag = {
  id: string;
  name: string;
  type: string;
  icon: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string;
  save: () => void;
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
};

/*interface Window {
  store: {
    tagList: Tag[];
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: (
      id: string,
      name: string
    ) => "success" | "not found" | "duplicated";
    findTag: (id: string) => Tag | undefined;
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
  };
}*/

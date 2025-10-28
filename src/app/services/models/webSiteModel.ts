export interface WebSiteModel {
  id: string;
  hostName: string;
  name: string;
  CreatedAt: string;
  parentId: string | null;
  parent: WebSiteModel | null;
};

export interface ClientModel {
  clientId: string;
  clientName: string;
  clientSecret: string;
  allowedScopes: string[];
  clientUri: string;
  grantType: string[];
  redirectUri: string;
  isActive: boolean;
};

export interface ClientToSave {
  clientId: string;
  clientName: string;
  clientSecret: string;
  allowedScopes: string[];
  clientUri: string;
  grantType: string[];
  redirectUri: string;
  isActive: boolean;
};

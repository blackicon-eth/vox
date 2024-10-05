export interface Petition {
  id: number;
  creator: string;
  name: string;
  description: string;
  extendeddescription: string;
  enddate: string;
  goal: number;
}

export interface Vote {
  id: number;
  signer: string;
  permit: boolean;
  petition: number;
}

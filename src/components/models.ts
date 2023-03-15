
/*
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
*/
export interface Unit {
  value: number;
  text: string;
}

export interface Event {
  madePublicSpace: boolean;
  contractedGovernment: boolean;
  madewithMinors: boolean;
  riskActivation: boolean;
  brandActivation: boolean;
  universityOpenBar: boolean;
  carriedOutBy: boolean;
  id: number;
  name: string;
  startDate: string;
  status: number;
  unit: number;
  adress: string;
}

export interface Select {
  label: string;
  value: number;
}


export interface Brand {
  text: string;
  value: number;
}

export interface DocEvt {
  color: string;
  disabled: boolean;
  src: string;
  file: File; //Ref<null>
  category: string;
  label: string;
  docId: number | null;
  status: number | null;
}

export interface ResObj {
  category: number;
  id: number;
  status: number;
}

export interface ChartData {
    stateId: number;
    name: string;
    approvedPercent: number;
    rejectPercent: number;
    pendentPercent: number;
    expiredPercent: number;
    totalEvent: number;
    totalApproved: number;
    totalExpired: number;
    totalPendent: number;
    totalReject: number;
}

export interface Serie {
  name: string;
  data: Array<number>;
}

export interface Grafico {
  series: Array<Serie>;
  name: string;
}

export interface DropDownInfo {
  text: string;
  value: string;
}

export interface DropDownInfo2 {
  name: string;
  id: number;
}


export interface FilterGrafico
 {
  filter: number;
  unit: number;
  state: number;
  city: string;
  startDate: string;
  endDate: string;
  brandId: number;
 }


export interface GraficoOneCol {
  data: FilterGrafico;
  color: string;
  caption: string;
}

export interface ApiResp {
  status: number;
  result: object;
  errorMessage: string;
}

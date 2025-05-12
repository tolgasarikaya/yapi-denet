// src/types/api.ts
import { ContactData, PersonData, StatusData } from "./table";

export interface Sort {
  selector: string;
  desc: boolean;
}

export interface ApiResponse<T> {
  items: T[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}

export interface UserData {
  [key: string]: string | number | boolean | null | undefined;
}

export interface ApiPostRequest {
  requireTotalCount: boolean;
  searchOperation: string;
  searchValue: string | null;
  skip: number;
  take: number;
  userData: UserData;
  sort: Sort[] | null;
  id?: number;
  filter?: (string | number)[];
}

// Veri tipleri daha spesifik tanımlar ve ortak tiplerden kalıtım alır
export interface Statistics {
  provinceId: number;
  countTotalYibf: number;
  countTotalConstructionArea: number;
  countTotalActiveYdk: number;
  countTotalActiveLab: number;
  countTotalCountryYibf: number;
  countTotalCountryConstructionArea: number;
}

export interface BuildingInspector extends ContactData {
  id: number;
  fileNumber: number;
  name: string;
  address: string;
  phone: string;
  fax?: string;
  locationId: number;
}

export interface Laboratory extends ContactData {
  id: number;
  fileNumber: number;
  name: string;
  phone: string;
  fax?: string;
  locationId: number;
  locationName: string;
  labType: string;
}

export interface Auditor extends PersonData, StatusData {
  id: number;
  taskId: number;
  applicationTypeId: number;
  locationId: number;
}

export interface YKEEngineer extends PersonData, StatusData {
  id: number;
  taskId: number;
  applicationTypeId: number;
  locationId: number;
}

export interface ControlWorker extends PersonData, StatusData {
  id: number;
  taskId: number;
  applicationTypeId: number;
  locationId: number;
}

export interface SiteSupervisor extends PersonData {
  id: number;
  taskId: number;
  applicationTypeId: number;
  locationId: number;
  working: boolean;
}

export interface Distribution {
  id: number;
  dagitim_tarihi: number;
  havuzgrup: number;
  yibfid: number;
  belgeno: number;
  unvan: string;
  m2: number;
  ilid: number;
  il_name: string;
}

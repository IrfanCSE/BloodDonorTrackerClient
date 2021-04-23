export interface UpdateDonor {
  userIdFk: string;
  name: string;
  nid: string;
  phone: string;
  address: string;
  bloodGorup: string;
  donorIdPk: number;
  longitude: number;
  latitude: number;
  isLocationUpdateAuto: boolean;
}

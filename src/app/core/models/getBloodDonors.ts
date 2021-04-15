export interface GetBloodDonors {
  donorIdPk: number;
  userIdFk: string;
  name: string;
  phone: string;
  address: string;
  longitude: number;
  latitude: number;
  healthReportIdPk: number;
  bloodGroupIdFk: number;
  bloodGroup: string;
  lastDonationDate: string;
  isAvailable: true;
  isActive: true;
  distance: number;
}

export interface Report {
  reportId: number;
  bloodGroupIdFk: number;
  bloodGroup: string;
  donorIdFk: number;
  donor: string;
  lastDonationDate: Date;
  isAvailable: boolean;
}

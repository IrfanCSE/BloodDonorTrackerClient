export interface GetBloodRequest {
  bloodRequestIdPk: number;
  requestDonorFk: number;
  requestDonorName: string;
  responsedDonorFk: number;
  responsedDonorName: string;
  bloodGroupFK: number;
  bloodGroupName: string;
  donationDate: string;
  time: string;
  condition: string;
  isResponsed: boolean;
  isActive: boolean;
  address: string;
  longitude: number;
  latitude: number;
  distance: number;
}

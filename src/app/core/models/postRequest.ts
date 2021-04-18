export interface PostRequest {
  bloodRequestIdPk: number;
  requestDonorFk: number;
  bloodGroupFK: number;
  donationDate: string;
  time: any;
  condition: string;
  address: string;
  longitude: number;
  latitude: number;
}

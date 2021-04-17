export interface PostBloodRequest {
  bloodRequestIdPk: number;
  requestDonorFk: number;
  bloodGroupFK: number;
  donationDate: string;
  time: string;
  condition: string;
}

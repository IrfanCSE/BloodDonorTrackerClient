export interface GetDonorRequest {
  donorRequestIdPk: number;
  bloodRequestIdFk: number;
  bloodGroup: string;
  address: string;
  requestUserIdFk: number;
  requestUserName: string;
  requestDonorIdFk: number;
  requestDonorName: string;
  isActive: boolean;
  isRead: boolean;
  isAccept: boolean;
  isResponse: boolean;
  requestDateTime: Date;
  requestTime: Date;
}

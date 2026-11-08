import { ProvenanceRecord } from '../types';

export function createInitialProvenance(
  _artworkId: string,
  _artistName: string,
  _year: number,
  _title: string,
  _origin: string
): ProvenanceRecord {
  return {
    contractAddress: 'Not configured',
    tokenId: 'Not issued',
    certificateNumber: 'Not issued',
    verificationHash: 'Not verified',
    mintedDate: 'Not issued',
    network: 'No verification service connected',
    isAuthentic: false,
    blocks: [],
  };
}

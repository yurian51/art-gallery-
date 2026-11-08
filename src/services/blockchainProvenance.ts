import type { ProvenanceRecord } from '../types';

const unavailableRecord = (): ProvenanceRecord => ({
  contractAddress: 'Not configured',
  tokenId: 'Not issued',
  certificateNumber: 'Not issued',
  verificationHash: 'Not verified',
  mintedDate: 'Not issued',
  network: 'No external verification service connected',
  isAuthentic: false,
  blocks: [],
});

export function createInitialProvenance(
  _artworkId: string,
  _artistName: string,
  _year: number,
  _title: string,
  _origin: string
): ProvenanceRecord {
  return unavailableRecord();
}

export function appendTransferBlock(
  provenance: ProvenanceRecord,
  _newOwner: string,
  _orderNumber: string
): ProvenanceRecord {
  return provenance;
}

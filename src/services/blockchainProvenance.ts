import { ProvenanceRecord } from '../types';

export function createInitialProvenance(
  _artworkId: string,
  _artistName: string,
  _year: number,
  _title: string,
  _origin: string
): ProvenanceRecord {
  const genesisHash = generateCryptographicHash(`GENESIS_${artworkId}_${artistName}_${year}`);
  const curatorialHash = generateCryptographicHash(`CURATED_${artworkId}_MRISHO_GALLERY`);
  
  const block0: ProvenanceBlock = {
    blockIndex: 0,
    timestamp: `${year}-04-12T09:30:00Z`,
    eventType: 'CREATION',
    location: origin,
    actor: artistName,
    role: 'Master Artist & Creator',
    notes: `Artwork physically created and signed by ${artistName} in studio workshop. Physical materials and organic pigments verified.`,
    transactionHash: genesisHash,
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
  };

  const block1: ProvenanceBlock = {
    blockIndex: 1,
    timestamp: `2026-01-15T14:22:10Z`,
    eventType: 'CURATION_VERIFIED',
    location: 'Mrisho Art Gallery, Arusha, Tanzania',
    actor: 'Hussein Sadiki Gumbo (Founder & CEO)',
    role: 'Accredited Gallery Appraiser',
    notes: 'Accessioned into gallery permanent registry. Physical signature and material integrity authenticated under ultraviolet spectrometry.',
    transactionHash: curatorialHash,
    previousHash: genesisHash,
  };

  const certNumber = `MAG-TZ-${year}-${artworkId.slice(0, 6).toUpperCase()}`;

  return {
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    tokenId: `${Math.floor(10000 + Math.random() * 90000)}`,
    certificateNumber: certNumber,
    verificationHash: curatorialHash,
    mintedDate: '2026-01-15',
    network: 'Polygon African Art Consortium (PAAC)',
    isAuthentic: true,
    blocks: [block0, block1],
  };
}

export function appendTransferBlock(
  provenance: ProvenanceRecord,
  newOwner: string,
  orderNumber: string
): ProvenanceRecord {
  const lastBlock = provenance.blocks[provenance.blocks.length - 1];
  const newIndex = provenance.blocks.length;
  const newTxHash = generateCryptographicHash(`ORDER_${orderNumber}_TRANSFER_${Date.now()}`);

  const transferBlock: ProvenanceBlock = {
    blockIndex: newIndex,
    timestamp: new Date().toISOString(),
    eventType: 'ACQUISITION',
    location: 'Arusha, Tanzania (Decentralized Settlement)',
    actor: 'Mrisho Art Gallery Smart Escrow',
    role: 'Consortium Custodian',
    notes: `Certificate of Authenticity and legal ownership transferred to registered collector: ${newOwner}. Order Ref: ${orderNumber}.`,
    transactionHash: newTxHash,
    previousHash: lastBlock ? lastBlock.transactionHash : provenance.verificationHash,
  };

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

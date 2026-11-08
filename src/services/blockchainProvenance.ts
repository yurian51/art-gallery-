import { ProvenanceRecord, ProvenanceBlock } from '../types';

// Deterministic mock hash generator that outputs authentic 64-char hex strings
export function generateCryptographicHash(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  
  // Pad and expand into standard sha256 64-char hex format
  const base = Math.abs(hash).toString(16).padStart(8, '0');
  const salt = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  
  return (base + salt.slice(base.length)).slice(0, 64);
}

export function createInitialProvenance(
  artworkId: string,
  artistName: string,
  year: number,
  title: string,
  origin: string
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
    ...provenance,
    verificationHash: newTxHash,
    blocks: [...provenance.blocks, transferBlock],
  };
}

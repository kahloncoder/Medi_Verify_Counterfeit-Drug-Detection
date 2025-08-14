// src/services/ic-backend.js
import { HttpAgent, Actor } from "@dfinity/agent";
import {
  idlFactory as backend_idl,
  canisterId as backend_canister_id,
} from "../../../declarations/bits_backend";

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
// local only
agent.fetchRootKey();

export const backend = Actor.createActor(backend_idl, {
  agent,
  canisterId: backend_canister_id,
});

/**
 * Normalize the various shapes we might get back:
 * - opt record can be `null` or the record (depending on bindings/version)
 * - field names could be snake_case (Rust/candid) or camelCase (some tooling)
 */
function normalizeMedicine(optVal) {
  if (!optVal) return null;

  // If the binding returns an array for opt, unwrap it
  const rec = Array.isArray(optVal) ? optVal[0] : optVal;
  if (!rec) return null;

  // Prefer snake_case (Rust/candid), fallback to camelCase
  const name = rec.name ?? rec.Name ?? "";
  const manufacturer = rec.manufacturer ?? rec.Manufacturer ?? "";
  const batch_number = rec.batch_number ?? rec.batchNumber ?? "";
  const manufacturing_date =
    rec.manufacturing_date ?? rec.manufacturingDate ?? "";
  const expiry = rec.expiry ?? rec.expiry_date ?? rec.expiryDate ?? "";
  const blockchain_hash = rec.blockchain_hash ?? rec.blockchainHash ?? "";
  const last_updated = rec.last_updated ?? rec.lastUpdated ?? "";

  return {
    name,
    manufacturer,
    batch_number,
    manufacturing_date,
    expiry,
    blockchain_hash,
    last_updated,
  };
}

// Map to the frontend’s camelCase props
function toFrontendShape(id, m) {
  return {
    found: true,
    id,
    name: m.name,
    manufacturer: m.manufacturer,
    batchNumber: m.batch_number || "Unknown",
    manufacturingDate: m.manufacturing_date || "Unknown",
    expiryDate: m.expiry || "Unknown",
    blockchainHash: m.blockchain_hash || "N/A",
    lastUpdated: m.last_updated || "Unknown",
  };
}

export async function getMedicine(id) {
  const raw = await backend.get_medicine(id);

  // Debug so you can SEE what comes back
  console.log("[IC get_medicine raw]:", raw);

  const norm = normalizeMedicine(raw);
  if (!norm) return { found: false, id };

  const mapped = toFrontendShape(id, norm);
  console.log("[IC mapped]:", mapped);
  return mapped;
}

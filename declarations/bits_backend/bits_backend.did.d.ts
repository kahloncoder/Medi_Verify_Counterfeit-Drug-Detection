import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Medicine {
  'batch_number' : string,
  'manufacturer' : string,
  'manufacturing_date' : string,
  'name' : string,
  'last_updated' : string,
  'blockchain_hash' : string,
  'expiry' : string,
}
export interface _SERVICE {
  'add_medicine' : ActorMethod<
    [string, string, string, string, string, string],
    undefined
  >,
  'delete_medicine' : ActorMethod<[string], boolean>,
  'get_all_medicines' : ActorMethod<[], Array<[string, Medicine]>>,
  'get_medicine' : ActorMethod<[string], [] | [Medicine]>,
  'get_medicine_count' : ActorMethod<[], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

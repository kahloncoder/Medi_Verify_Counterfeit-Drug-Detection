use candid::{CandidType, Deserialize};
use ic_cdk_macros::{init, post_upgrade, pre_upgrade, query, update};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, Storable};
use sha2::{Digest, Sha256};
use std::borrow::Cow;
use std::cell::RefCell;

type Memory = VirtualMemory<DefaultMemoryImpl>;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Medicine {
    name: String,
    manufacturer: String,
    batch_number: String,
    manufacturing_date: String,
    expiry: String,
    blockchain_hash: String,
    last_updated: String,
}

impl Storable for Medicine {
    fn to_bytes(&self) -> Cow<[u8]> {
        // Encode as candid; encode_one returns Vec<u8>
        Cow::Owned(candid::encode_one(self).expect("Candid encode failed"))
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        candid::decode_one(bytes.as_ref()).expect("Candid decode failed")
    }
    const BOUND: ic_stable_structures::storable::Bound =
        ic_stable_structures::storable::Bound::Unbounded;
}

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

    static MEDICINE_STORAGE: RefCell<StableBTreeMap<String, Medicine, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
        )
    );
}

// SHA-256 over concatenated fields
fn generate_hash(values: &[&str]) -> String {
    let mut hasher = Sha256::new();
    for v in values {
        hasher.update(v.as_bytes());
    }
    let bytes = hasher.finalize();
    hex::encode(bytes)
}

// IC-native timestamp (secs since epoch) -> readable string
fn current_timestamp() -> String {
    let nanos = ic_cdk::api::time(); // u64 nanos since UNIX epoch
    let secs = nanos / 1_000_000_000;
    format!("{} seconds since epoch", secs)
}

#[update]
fn add_medicine(
    id: String,
    name: String,
    manufacturer: String,
    batch_number: String,
    manufacturing_date: String,
    expiry: String,
) {
    let blockchain_hash = generate_hash(&[
        &id,
        &name,
        &manufacturer,
        &batch_number,
        &manufacturing_date,
        &expiry,
    ]);

    let last_updated = current_timestamp();

    let medicine = Medicine {
        name,
        manufacturer,
        batch_number,
        manufacturing_date,
        expiry,
        blockchain_hash,
        last_updated,
    };

    MEDICINE_STORAGE.with(|storage| {
        storage.borrow_mut().insert(id, medicine);
    });
}

#[query]
fn get_medicine(id: String) -> Option<Medicine> {
    MEDICINE_STORAGE.with(|storage| storage.borrow().get(&id))
}

#[query]
fn get_all_medicines() -> Vec<(String, Medicine)> {
    MEDICINE_STORAGE.with(|storage| storage.borrow().iter().collect())
}

#[query]
fn get_medicine_count() -> u64 {
    MEDICINE_STORAGE.with(|storage| storage.borrow().len())
}

#[update]
fn delete_medicine(id: String) -> bool {
    MEDICINE_STORAGE.with(|storage| storage.borrow_mut().remove(&id).is_some())
}

#[init]
fn init() {
    ic_cdk::println!("Medicine storage canister initialized with persistent storage");
}

#[pre_upgrade]
fn pre_upgrade() {
    ic_cdk::println!("Preparing for upgrade - data will be preserved");
}

#[post_upgrade]
fn post_upgrade() {
    ic_cdk::println!("Upgrade completed - data has been preserved");
}

export const idlFactory = ({ IDL }) => {
  const Medicine = IDL.Record({
    'batch_number' : IDL.Text,
    'manufacturer' : IDL.Text,
    'manufacturing_date' : IDL.Text,
    'name' : IDL.Text,
    'last_updated' : IDL.Text,
    'blockchain_hash' : IDL.Text,
    'expiry' : IDL.Text,
  });
  return IDL.Service({
    'add_medicine' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'delete_medicine' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'get_all_medicines' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Medicine))],
        ['query'],
      ),
    'get_medicine' : IDL.Func([IDL.Text], [IDL.Opt(Medicine)], ['query']),
    'get_medicine_count' : IDL.Func([], [IDL.Nat64], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

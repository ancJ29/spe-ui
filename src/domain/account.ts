export type AccountType = "MAIN" | "SUB";
export type AccountNameType = "FUNDING ACCOUNT" | "TRADING ACCOUNT";

export type Account = {
  id: string
  name: AccountNameType
  isFunding: boolean
  isCopyMaster: boolean
  type: AccountType
};


// [
//    {
//       "id": "10142254920760159003105",
//       "name": "FUNDING ACCOUNT",
//       "isFunding": true,
//       "isCopyMaster": false,
//       "type": "MAIN"
//    },
//    {
//       "id": "10142254920760159003106",
//       "name": "TRADING ACCOUNT",
//       "isFunding": false,
//       "isCopyMaster": false,
//       "type": "MAIN"
//    }
// ]

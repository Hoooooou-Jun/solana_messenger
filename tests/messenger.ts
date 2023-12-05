import * as anchor from "@coral-xyz/anchor";
import { assert } from "chai";
const { SystemProgram } = anchor.web3;

describe("Testing messaging", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider); // abstracted connection solana networking
  const program = anchor.workspace.Messenger;
  let _baseAccount;

  it("initialize", async () => {
    const baseAccount = anchor.web3.Keypair.generate();

    await program.rpc.initialize("Hello world!", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Data: ", account.data);
    assert.ok(account.data === "Hello world!", "success");
    _baseAccount = baseAccount;
  });
  it("update", async () => {
    const baseAccount = _baseAccount;
    await program.rpc.update("Second Hello world!", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Updated data: ", account.data);
    assert.ok(account.data === "Second Hello world!", "success");
    console.log("All account data: ", account);
    console.log("All data: ", account.dataList);
    assert.ok(account.dataList.length === 2);
  });
});

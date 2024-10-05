// Sepolia Attestation contract address
// You can add Sepolia chain from https://chainlist.org/?search=11155111&testnets=true
export const contractAddress = "0x8c18c0436A8d6ea44C87Bf5853F8D11B55CF0302";

// The zkPass allocator address
export const allocatorAddress = "0x19a567b3b212a5b35bA0E3B600FbEd5c2eE9083d"; // TODO: change this with the correct address

// This is useful in case zkPass won't work during the demo
export const mockedData = {
  allocatorAddress: "0x19a567b3b212a5b35bA0E3B600FbEd5c2eE9083d",
  allocatorSignature:
    "0xc73b2346cd6c78da499910d2376321e6fbc4021ddbbaaaacee60976d320fb0a367255483e67373d0a0a293357a312fb54405a6ad379b4c7e019395d82c7eda361c",
  publicFields: [
    {
      data: {
        content: {
          nome: "Matteo",
          cognome: "Rossi",
        },
      },
    },
  ],
  publicFieldsHash: "5445889741ff725bbc06cc31031ad86ee102521c28eda6fb1f4cd7f4389b8916",
  taskId: "a3555ce1ad334614bd9849c7a2ceb84c",
  uHash: "0x6a7b79e79a88a7302e4c1fbb1e8dae52c2a7663a132c809609435a728d2221ba",
  validatorAddress: "0xb1C4C1E1Cdd5Cf69E27A3A08C8f51145c2E12C6a",
  validatorSignature: "0xb1C4C1E1Cdd5Cf69E27A3A08C8f51145c2E12C6a",
};

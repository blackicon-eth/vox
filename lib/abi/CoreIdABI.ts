export const CoreIdAddress = "0x99873D2B1292218A5daB677171459583697b00ae" as const;

export const CoreIdABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_authority",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ECDSAInvalidSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "ECDSAInvalidSignatureLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "ECDSAInvalidSignatureS",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidShortString",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotAuthority",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SignerNotMessageSender",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SignerNotOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "StringTooLong",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "EIP712DomainChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "authority",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eip712Domain",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "fields",
				"type": "bytes1"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "salt",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "extensions",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "bytes",
						"name": "signature",
						"type": "bytes"
					}
				],
				"internalType": "struct Permission",
				"name": "permission",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "getUserInfoWithPermit",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "codiceFiscaleSeal",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nameSeal",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "surnameSeal",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "birthdaySeal",
						"type": "string"
					}
				],
				"internalType": "struct CoreId.SealedOutputs",
				"name": "sealedOutputs",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEuint256",
				"name": "codiceFiscale",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEuint256",
				"name": "name",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEuint256",
				"name": "surname",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEuint256",
				"name": "birthday",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "insertUserInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "input",
				"type": "string"
			}
		],
		"name": "stringToUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "inputs",
				"type": "string[]"
			}
		],
		"name": "stringsToUintArray",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "inputs",
				"type": "uint256[]"
			}
		],
		"name": "uintArrayToStrings",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "input",
				"type": "uint256"
			}
		],
		"name": "uintToString",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
] as const;
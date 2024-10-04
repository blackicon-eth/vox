export interface TransGateResponse {
  allocatorAddress: `0x${string}`;
  allocatorSignature: `0x${string}`;
  publicFields: any[];
  publicFieldsHash: `0x${string}`;
  recipient?: `0x${string}`;
  taskId: string;
  uHash: `0x${string}`;
  validatorAddress: `0x${string}`;
  validatorSignature: `0x${string}`;
}

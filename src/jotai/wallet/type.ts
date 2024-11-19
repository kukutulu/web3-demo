import { configEvmChain } from './config';

export type TAppChainId = (typeof configEvmChain)['chains'][number]['id'];

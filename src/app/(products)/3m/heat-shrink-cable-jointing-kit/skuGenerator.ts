

// utils/skuGenerator.ts
import {
  Technology,
  TerminationType,
  VoltageType,
  CoreType,
  SizeType,
  CableType,
  ConductorType
} from './skuTypes';

interface SkuMappings {
    [key: string]: string;
  }

export const technology: Technology[] = ['Heat Shrink'];

export const terminationTypes: TerminationType[] = ['Indoor', 'Outdoor', 'Straight through'];
export const voltageTypes: VoltageType[] = ['1.1KV(E)', '6.6KV(UE)/11KV(E)', '11KV(UE)/22KV(E)', '22KV(E)', '33KV(E)', '33KV(UE)', '66KV(E)'];
export const coreTypes: CoreType[] = ['1 CORE', '2 CORE', '3 CORE', '3.5 CORE', '4 CORE'];
export const sizeTypes: SizeType[] = ['6mm', '10mm', '16mm', '25mm', '35mm', '50mm', '70mm', '95mm', '120mm', '150mm', '185mm', '240mm', '300mm', '400mm', '500mm', '630mm', '800mm', '1000mm'];
export const cableTypes: CableType[] = ['XLPE/PVC', 'EPR', 'ABC'];
export const conductorTypes: ConductorType[] = ['ALUMINIUM', 'COPPER'];

const typeToSkuMap: SkuMappings = {
  'Indoor': 'I',
  'Outdoor': 'O',
  'Straight through': 'S'
};

const typeToSku = (type: TerminationType): string => typeToSkuMap[type];

const cableTypeToSku = (cableType: CableType, type: TerminationType): string => {
  if (cableType === 'XLPE/PVC') {
    return type === 'Straight through' ? 'XXA' : 'X_A';
  } else if (cableType === 'EPR') {
    return 'TCU';
  } else if (cableType === 'ABC') {
    return 'ABU';
  }
  return '';
};

const conductorToSkuMap: SkuMappings = {
  'ALUMINIUM': 'A',
  'COPPER': 'C'
};

const conductorToSku = (conductor: ConductorType): string => conductorToSkuMap[conductor];

const voltageToSkuMap: SkuMappings = {
  '1.1KV(E)': '1.1E',
  '6.6KV(UE)/11KV(E)': '011E',
  '11KV(UE)/22KV(E)': '022E',
  '22KV(E)': '022E',
  '33KV(E)': '033E',
  '33KV(UE)': '033U',
  '66KV(E)': '066E'
};

const voltageToSku = (voltage: VoltageType): string => voltageToSkuMap[voltage];

const coreToSkuMap: SkuMappings = {
  '1 CORE': '01C',
  '2 CORE': '02C',
  '3 CORE': '03C',
  '3.5 CORE': '3.5C',
  '4 CORE': '04C'
};

const coreToSku = (core: CoreType): string => coreToSkuMap[core];

const sizeToSku = (size: SizeType): string => size.replace('mm', '').padStart(4, '0');

export const generateSku = (
  tech: Technology,
  type: TerminationType,
  voltage: VoltageType,
  core: CoreType,
  size: SizeType,
  cableType: CableType,
  conductor: ConductorType
): string => {
  return `3MH${typeToSku(type)}_${cableTypeToSku(cableType, type)}${conductorToSku(conductor)}_${voltageToSku(voltage)}_${coreToSku(core)}${sizeToSku(size)}`;
};
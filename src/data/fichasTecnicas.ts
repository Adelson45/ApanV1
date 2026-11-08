// Especificacoes copiadas das paginas oficiais dos fabricantes, nao medidas pela equipe.
// So entra aqui o que foi confirmado na propria fonte. Dado ausente fica sem preencher.
export interface FichaTecnicaItem {
  modelo: string;
  peso?: string;
  casco?: string;
  certificacao?: string;
  fonte: { label: string; href: string };
}

export const FICHAS_CONSULTADAS_EM = '08/11/2026';

const ls2Br = { label: 'LS2 Brasil' };
const ls2Global = { label: 'LS2 Helmets' };
const norisk = { label: 'Norisk' };
const asx = { label: 'ASX' };
const hjc = { label: 'HJC EUA' };

export const fichasTecnicas = {
  'ls2-stream-ii': {
    modelo: 'LS2 FF808 Stream II',
    peso: '1.550 g (±50 g)',
    casco: 'KPA',
    certificacao: 'ECE 22.06',
    fonte: { ...ls2Br, href: 'https://www.ls2.com.br/capacete-ls2-stream-ii-firefly-cinza/p' },
  },
  'ls2-strobe-ii': {
    modelo: 'LS2 FF908 Strobe II',
    peso: '1.700 g (±50 g)',
    casco: 'KPA',
    certificacao: 'ECE 22.06 (P/J)',
    fonte: { ...ls2Global, href: 'https://ls2helmets.com/helmets/modular/strobe-ii' },
  },
  'ls2-storm': {
    modelo: 'LS2 FF800 Storm',
    peso: '1.530 g (±50 g)',
    casco: 'KPA',
    certificacao: 'ECE 22.05',
    fonte: { ...ls2Global, href: 'https://ls2helmets.com/helmets/full-face/storm' },
  },
  'norisk-route': {
    modelo: 'Norisk Route FF345',
    peso: '1.792 g (±50 g)',
    casco: 'Resina termoplástica ABS',
    fonte: { ...norisk, href: 'https://www.norisk.com.br/capacete-norisk-route-ff345-monocolor-preto/p' },
  },
  'norisk-ff302-soul': {
    modelo: 'Norisk FF302 Soul Grand Prix',
    peso: '1.490 g (±50 g)',
    casco: 'Resina termoplástica ABS',
    fonte: { ...norisk, href: 'https://www.norisk.com.br/capacete-norisk-soul-grand-prix-france/p' },
  },
  'peels-urb2-dynamic': {
    modelo: 'Peels U-RB2 Dynamic',
    peso: '1.740 g',
    casco: 'Termoplástico ABS injetado',
    fonte: { label: 'Peels', href: 'https://www.peels.com.br/produtos/capacete-moto-peels-u-rb2-dynamic-escamoteavel-dzd8p/' },
  },
  'mixs-captiva-storm': {
    modelo: 'Mixs MX Captiva (versão Storm)',
    peso: 'Cerca de 1.800 g',
    casco: 'ABS injetado',
    certificacao: 'Inmetro, NBR 7471/2001 (BRC.C1013-B)',
    fonte: { label: 'Mixs', href: 'https://www.mixscapacetes.com.br/product-page/captiva-storm' },
  },
  'asx-city-solid': {
    modelo: 'ASX City Solid',
    peso: '1.500 g (média)',
    casco: 'Resina termoplástica ABS',
    certificacao: 'Selo do Inmetro instalado',
    fonte: { ...asx, href: 'https://www.asxcapacete.com.br/capacete-asx-city-solid-brilho-preto-grafite/p' },
  },
  'asx-draken-solid': {
    modelo: 'ASX Draken Solid',
    peso: '1.500 g (média)',
    casco: 'Resina termoplástica ABS',
    certificacao: 'Selo do Inmetro instalado',
    fonte: { ...asx, href: 'https://www.asxcapacete.com.br/capacete-asx-draken-solid-preto-brilho/p' },
  },
  'bieffe-b-pace': {
    modelo: 'Bieffe B-Pace (versão Authentic)',
    casco: 'HEAP (polímero de alta absorção de energia)',
    certificacao: 'NBR 7471',
    fonte: { label: 'Bieffe', href: 'https://bieffe.com.br/produtos/capacete-moto-aberto-bieffe-b-pace-authentic-kmiyn/' },
  },
  'hjc-i90': {
    modelo: 'HJC i90 (versão EUA)',
    casco: 'Policarbonato avançado',
    certificacao: 'DOT FMVSS 218 e ECE 22.05 (XS a 2XL)',
    fonte: { ...hjc, href: 'https://hjchelmets.us/pages/i90' },
  },
  'hjc-c10': {
    modelo: 'HJC C10 (versão EUA)',
    casco: 'Compósito de policarbonato avançado',
    certificacao: 'DOT FMVSS 218',
    fonte: { ...hjc, href: 'https://hjchelmets.us/pages/c10' },
  },
  'taurus-th7': {
    modelo: 'Taurus TH7',
    peso: '1,1 kg (média)',
    certificacao: 'NBR 7471 (Inmetro)',
    fonte: { label: 'Taurus', href: 'https://www.taurushelmets.com/products/capacete-th7-branco-brilho' },
  },
  'shoei-j-cruise-3': {
    modelo: 'Shoei J-Cruise 3 (versão Europa)',
    peso: '1.400 g',
    casco: 'AIM',
    certificacao: 'ECE 22.06',
    fonte: { label: 'Shoei Europa', href: 'https://www.shoei-europe.com/products/j-cruise3/' },
  },
  'shoei-neotec-ii': {
    modelo: 'Shoei Neotec II (versão EUA)',
    peso: '4,09 lb (cerca de 1.855 g)',
    casco: 'AIM',
    certificacao: 'DOT',
    fonte: { label: 'Shoei EUA', href: 'https://shoei-helmets.com/products/neotec-ii.html' },
  },
} satisfies Record<string, FichaTecnicaItem>;

export type FichaId = keyof typeof fichasTecnicas;

export const fichas = (...ids: FichaId[]): FichaTecnicaItem[] => ids.map((id) => fichasTecnicas[id]);

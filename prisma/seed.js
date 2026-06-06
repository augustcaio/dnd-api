const prisma = require('../utils/prisma');

const deities = [
  { name: 'Asmodeu', description: 'Deus da tirania, senhor dos Nove Infernos. Governa através do medo e da opressão, tecendo pactos com mortais ambiciosos.', alignment: 'LM', suggestedDomains: ['Enganação'], symbol: 'Três triângulos em uma formação estreita', portfolio: 'dominação e tirania' },
  { name: 'Avandra', description: 'Deusa da mudança e da sorte. Protege aqueles que buscam novas oportunidades e celebram a liberdade.', alignment: 'CB', suggestedDomains: ['Natureza', 'Enganação'], symbol: 'Roda de oito raios', portfolio: 'mudança, sorte e liberdade' },
  { name: 'Bahamut', description: 'Deus da justiça e da nobreza. Guardião dos dragões metálicos e juiz imparcial dos reinos mortais.', alignment: 'LB', suggestedDomains: ['Vida', 'Guerra'], symbol: 'Cabeça de dragão platinado', portfolio: 'justiça e nobreza' },
  { name: 'Bane', description: 'Deus da guerra e da conquista. Exige submissão total e celebra o poder absoluto.', alignment: 'LM', suggestedDomains: ['Guerra'], symbol: 'Punho fechado', portfolio: 'guerra e conquista' },
  { name: 'Corellon', description: 'Deus da arte e da magia entre os elfos. Rejeita a tirania e celebra a expressão criativa em todas as formas.', alignment: 'CB', suggestedDomains: ['Luz', 'Conhecimento'], symbol: 'Crescente prateado', portfolio: 'arte e magia' },
  { name: 'Erathis', description: 'Deusa da civilização e da lei. Inspira a fundação de cidades, a criação de leis e o avanço cultural.', alignment: 'LN', suggestedDomains: ['Conhecimento', 'Guerra'], symbol: 'Sol duplo', portfolio: 'civilização e lei' },
  { name: 'Gruumsh', description: 'Deus da destruição. O caolho senhor dos orcs busca vingança eterna contra os elfos.', alignment: 'CM', suggestedDomains: ['Guerra', 'Tempestade'], symbol: 'Olho vazado', portfolio: 'destruição' },
  { name: 'Ioun', description: 'Deusa do conhecimento. Patrona dos eruditos, magos e todos que buscam a verdade.', alignment: 'N', suggestedDomains: ['Conhecimento', 'Luz'], symbol: 'Olho dentro de um diamante', portfolio: 'conhecimento' },
  { name: 'Kord', description: 'Deus da força e das tempestades. Celebra a coragem física e o poder bruto.', alignment: 'CN', suggestedDomains: ['Tempestade', 'Guerra'], symbol: 'Punho de pedra', portfolio: 'força e tempestade' },
  { name: 'Lolth', description: 'Deusa do engano e das aranhas. Rainha dos drow, tece teias de traição nas profundezas.', alignment: 'CM', suggestedDomains: ['Enganação', 'Conhecimento'], symbol: 'Aranha negra', portfolio: 'engano e aranhas' },
  { name: 'Melora', description: 'Deusa da natureza e do mar. Protege o equilíbrio natural contra a civilização devoradora.', alignment: 'N', suggestedDomains: ['Natureza', 'Tempestade'], symbol: 'Onda', portfolio: 'natureza e mar' },
  { name: 'Moradin', description: 'Deus da criação e do artifício. Forjou os primeiros anões nas profundezas da montanha.', alignment: 'LB', suggestedDomains: ['Conhecimento', 'Guerra'], symbol: 'Martelo e bigorna', portfolio: 'criação e artifício' },
  { name: 'Pelor', description: 'Deus do sol e da agricultura. Nutre as colheitas e aquece os corações dos mortais.', alignment: 'NB', suggestedDomains: ['Luz', 'Vida'], symbol: 'Sol radiante', portfolio: 'sol e agricultura' },
  { name: 'Rainha Corvo', description: 'Deusa da morte e do inverno. Governa o destino das almas e guarda os segredos do fim.', alignment: 'LN', suggestedDomains: ['Morte', 'Vida'], symbol: 'Corvo', portfolio: 'morte e inverno' },
  { name: 'Sehanine', description: 'Deusa da lua e da ilusão. Tece sonhos e guia os viajantes noturnos.', alignment: 'CN', suggestedDomains: ['Enganação', 'Luz'], symbol: 'Lua crescente', portfolio: 'lua e ilusão' },
  { name: 'Tharizdun', description: 'Deus da loucura e da destruição. A Besta Aprisionada busca consumir toda a criação.', alignment: 'CM', suggestedDomains: ['Guerra', 'Enganação'], symbol: 'Espiral quebrada', portfolio: 'loucura e destruição' },
  { name: 'Tiamat', description: 'Deusa da ganância e dos dragões cromáticos. A Rainha dos Dragões busca acumular tesouros e poder.', alignment: 'LM', suggestedDomains: ['Guerra', 'Enganação'], symbol: 'Cabeça de dragão de cinco cores', portfolio: 'ganância e dragões' },
  { name: 'Torog', description: 'Deus da tortura e das masmorras. Arrasta suas vítimas para as profundezas esquecidas.', alignment: 'CM', suggestedDomains: ['Morte', 'Guerra'], symbol: 'T repetido', portfolio: 'tortura e masmorras' },
  { name: 'Vecna', description: 'Deus dos segredos e da magia profana. Busca conhecimento proibido e poder arcano.', alignment: 'NM', suggestedDomains: ['Conhecimento', 'Enganação'], symbol: 'Mão com olho', portfolio: 'segredos e magia' },
  { name: 'Zehir', description: 'Deus do veneno e da escuridão. Move-se nas sombras, envenenando inimigos e corrompendo almas.', alignment: 'CM', suggestedDomains: ['Enganação', 'Natureza'], symbol: 'Serpente', portfolio: 'veneno e escuridão' },
];

const planes = [
  { name: 'Plano Material', type: 'MATERIAL', description: 'O plano de existência primário, onde habita a maioria dos mortais. Inclui Toril, Oerth, Krynn e incontáveis outros mundos.', optionalRule: null },
  { name: 'Plano Etéreo', type: 'TRANSICIONAL', description: 'Uma névoa fantasmagórica que envolve o Plano Material. Criaturas etéreas podem observar os mortais sem serem vistas, e viajantes podem cruzar distâncias imensas.', optionalRule: null },
  { name: 'Plano Astral', type: 'TRANSICIONAL', description: 'O mar prateado da consciência pura. Corpos petrificados de deuses mortos flutuam como asteroides, e viajantes alcançam os planos exteriores através de portais de cor.', optionalRule: null },
  { name: 'Faéria', type: 'TRANSICIONAL', description: 'O Plano das Fadas, um eco do Plano Material onde a natureza é mais vívida e a magia mais intensa. O tempo flui de forma irregular.', optionalRule: null },
  { name: 'Umbra', type: 'TRANSICIONAL', description: 'O Plano das Sombras, reflexo obscuro do Plano Material. Domínios de mortos-vivos e criaturas da escuridão.', optionalRule: null },
  { name: 'Plano do Fogo', type: 'INTERIOR', description: 'Chamas eternas que queimam sem combustível. Rios de lava e cidades de bronze habitadas por efrits.', optionalRule: null },
  { name: 'Plano da Água', type: 'INTERIOR', description: 'Oceanos infinitos com pressões abissais. Marids governam cidades subaquáticas de coral e cristal.', optionalRule: null },
  { name: 'Plano da Terra', type: 'INTERIOR', description: 'Cavernas e túneis infinitos através de rocha sólida. Cristais gigantes iluminam as profundezas.', optionalRule: null },
  { name: 'Plano do Ar', type: 'INTERIOR', description: 'Céus intermináveis com ilhas flutuantes e nuvens sólidas. Djinns navegam as correntes de vento.', optionalRule: null },
  { name: 'Energia Positiva', type: 'INTERIOR', description: 'Fonte da vida e da luz radiante. A própria essência da existência pulsa neste plano.', optionalRule: null },
  { name: 'Energia Negativa', type: 'INTERIOR', description: 'O vazio antitético à vida. Mortos-vivos e sombras são atraídos por esta energia entrópica.', optionalRule: null },
  { name: 'Monte Celéstia', type: 'EXTERIOR', description: 'Sete picos de prata e platina. Cada camada representa uma virtude celestial, e almas bondosas sobem em direção à iluminação.', optionalRule: null },
  { name: 'Bitopia', type: 'EXTERIOR', description: 'Dois vales gêmeos em harmonia perfeita. Trabalho e recompensa se equilibram em ciclos de cooperação.', optionalRule: null },
  { name: 'Elísio', type: 'EXTERIOR', description: 'Campos verdejantes de paz e contentamento onde almas bondosas encontram descanso eterno.', optionalRule: null },
  { name: 'Terras Selvagens', type: 'EXTERIOR', description: 'A natureza primordial em seu estado mais puro e selvagem. Caça e sobrevivência são as leis.', optionalRule: null },
  { name: 'Arbórea', type: 'EXTERIOR', description: 'Florestas festivas onde a música nunca cessa. O Olímpo abriga os deuses élficos.', optionalRule: null },
  { name: 'Ysgard', type: 'EXTERIOR', description: 'Planícies de batalha eterna onde heróis caídos lutam e festejam em ciclos infinitos.', optionalRule: null },
  { name: 'Limbo', type: 'EXTERIOR', description: 'Caos puro e informe onde a matéria se molda pelo pensamento. Lar dos githzerai.', optionalRule: null },
  { name: 'Pandemônio', type: 'EXTERIOR', description: 'Cavernas de ventos uivantes que enlouquecem os viajantes. Criaturas caóticas habitam as profundezas.', optionalRule: null },
  { name: 'O Abismo', type: 'EXTERIOR', description: 'Camadas infinitas de tortura e caos. Demônios se reproduzem em guerra eterna.', optionalRule: { name: 'Camadas do Abismo', description: 'As camadas do Abismo são infinitas em número; cada camada tem seu próprio ambiente e governantes.', savingThrow: null } },
  { name: 'Cárceri', type: 'EXTERIOR', description: 'Prisão planar onde os deuses aprisionam seus inimigos. Escape é quase impossível.', optionalRule: null },
  { name: 'Hades', type: 'EXTERIOR', description: 'Terra cinzenta e desolada onde a esperança morre. Almas vagueiam em apatia eterna.', optionalRule: null },
  { name: 'Geena', type: 'EXTERIOR', description: 'Montanhas vulcânicas de rios de lava onde yugoloths negociam almas em barganhas eternas.', optionalRule: null },
  { name: 'Os Nove Infernos', type: 'EXTERIOR', description: 'Nove camadas de tirania infernal governadas por Asmodeus. Diabos aplicam leis perversas em hierarquia cruel.', optionalRule: { name: 'Hierarquia Infernal', description: 'Cada um dos Nove Infernos é governado por um arquidiabo. Asmodeus governa todos de Malsheem.', savingThrow: null } },
  { name: 'Arcádia', type: 'EXTERIOR', description: 'Colinas pacíficas sob céus claros. Lei e bondade coexistem em perfeita harmonia.', optionalRule: null },
  { name: 'Mecânus', type: 'EXTERIOR', description: 'Planos de engrenagens perfeitamente calibradas. Habitado por modrons que seguem ordens hierárquicas.', optionalRule: { name: 'Ordem Perfeita', description: 'O tempo é perfeitamente ordenado; tudo funciona em cronogramas precisos.', savingThrow: null } },
];

async function main() {
  console.log('Clearing existing data...');
  await prisma.deity.deleteMany();
  await prisma.plane.deleteMany();
  console.log('Seeding database...');

  for (const deity of deities) {
    await prisma.deity.upsert({
      where: { name: deity.name },
      update: {},
      create: deity,
    });
  }
  console.log(`  ✓ ${deities.length} deities seeded`);

  for (const plane of planes) {
    await prisma.plane.upsert({
      where: { name: plane.name },
      update: {},
      create: plane,
    });
  }
  console.log(`  ✓ ${planes.length} planes seeded`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

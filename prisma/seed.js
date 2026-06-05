const prisma = require('../utils/prisma');

const deities = [
  { name: 'Ao', description: 'O Sobretudo, a divindade suprema que observa todos os deuses e mundos sem jamais intervir diretamente.', alignment: 'Neutro', suggestedDomains: ['Conhecimento'], symbol: 'Círculo vazio', portfolio: 'Ordem cósmica, supervisão divina' },
  { name: 'Bahamut', description: 'O Deus Dragão da Justiça, guardião dos metálicos e juiz imparcial. Aparece como um enorme dragão platinado.', alignment: 'Leal e Bom', suggestedDomains: ['Vida', 'Guerra'], symbol: 'Cabeça de dragão platinado', portfolio: 'Justiça, nobreza, metálicos' },
  { name: 'Tiamat', description: 'A Rainha dos Dragões, divindade cromática de cinco cabeças que personifica a ganância e a tirania.', alignment: 'Leal e Mau', suggestedDomains: ['Ganância'], symbol: 'Cabeça de dragão de cinco cores', portfolio: 'Ganância, cromáticos, tirania' },
  { name: 'Corellon Larethian', description: 'O Criador dos Elfos, deus da arte, magia e beleza. Rejeita a tirania e celebra a expressão criativa.', alignment: 'Caótico e Bom', suggestedDomains: ['Conhecimento', 'Luz'], symbol: 'Crescente prateado', portfolio: 'Elfos, arte, magia, beleza' },
  { name: 'Gruumsh', description: 'O deus caolho dos orcs, senhor da guerra e da destruição. Amaldiçoado por Corellon, busca vingança eterna.', alignment: 'Caótico e Mau', suggestedDomains: ['Guerra', 'Tempestade'], symbol: 'Olho vazado ensanguentado', portfolio: 'Orcs, guerra, destruição' },
  { name: 'Moradin', description: 'O Forjador dos Anões, patrono dos ferreiros e artesãos. Forjou as primeiras almas anãs nas profundezas.', alignment: 'Leal e Bom', suggestedDomains: ['Conhecimento', 'Guerra'], symbol: 'Martelo e bigorna', portfolio: 'Anões, artifício, metalurgia' },
  { name: 'Garl Glittergold', description: 'O Deus dos Gnomos, trapaceiro astuto que protege seu povo com engenhosidade e humor.', alignment: 'Leal e Bom', suggestedDomains: ['Enganação', 'Conhecimento'], symbol: 'Núcleo de ouro', portfolio: 'Gnomes, humor, engenhosidade' },
  { name: 'Yondalla', description: 'A Protetora dos Halflings, deusa da fertilidade e do lar. Garante segurança e prosperidade.', alignment: 'Leal e Bom', suggestedDomains: ['Vida', 'Proteção'], symbol: 'Escudo com ramo', portfolio: 'Halflings, lar, fertilidade' },
  { name: 'Maglubiyet', description: 'O Senhor da Guerra dos Goblinoides, que escravizou os deuses menores de goblins, hobgoblins e bugbears.', alignment: 'Leal e Mau', suggestedDomains: ['Guerra', 'Morte'], symbol: 'Machado de guerra sangrento', portfolio: 'Goblinoides, conquista, guerra' },
  { name: 'Lolth', description: 'A Rainha das Aranhas, deusa dos drow que tece teias de engano e exige sacrifícios.', alignment: 'Caótico e Mau', suggestedDomains: ['Enganação', 'Conhecimento'], symbol: 'Aranha negra', portfolio: 'Drow, teias, engano' },
  { name: 'Torm', description: 'O Deus da Coragem e do Dever, patrono dos paladinos. Sacrificou-se para salvar os mortais.', alignment: 'Leal e Bom', suggestedDomains: ['Guerra', 'Vida'], symbol: 'Mão em armadura', portfolio: 'Coragem, dever, paladinos' },
  { name: 'Helm', description: 'O Vigia Eterno, deus da proteção e guardião dos portais. Nunca dorme e jamais hesita.', alignment: 'Leal e Neutro', suggestedDomains: ['Proteção', 'Vida'], symbol: 'Olho aberto na palma', portfolio: 'Proteção, vigilância, guardiões' },
  { name: 'Tyr', description: 'O Deus da Justiça, que sacrificou a própria mão direita para amarrar o lobo Fenris. Julga com imparcialidade.', alignment: 'Leal e Bom', suggestedDomains: ['Guerra', 'Conhecimento'], symbol: 'Balança sobre martelo', portfolio: 'Justiça, julgamento, lei' },
  { name: 'Mystra', description: 'A Tecedeira da Magia, deusa que mantém a Tessitura da magia através dos reinos.', alignment: 'Neutro e Bom', suggestedDomains: ['Conhecimento', 'Luz'], symbol: 'Estrela flamejante', portfolio: 'Magia, tecelagem arcana' },
  { name: 'Silvanus', description: 'O Pai dos Bosques, deus da natureza selvagem e dos druidas. Protege o equilíbrio natural.', alignment: 'Neutro', suggestedDomains: ['Natureza', 'Vida'], symbol: 'Carvalho com raízes', portfolio: 'Natureza, druidas, equilíbrio' },
  { name: 'Chauntea', description: 'A Deusa da Agricultura, nutre a terra e garante colheitas férteis para os mortais.', alignment: 'Neutro e Bom', suggestedDomains: ['Vida', 'Natureza'], symbol: 'Grão brotando', portfolio: 'Agricultura, fertilidade, colheita' },
  { name: 'Kelemvor', description: 'O Julgador dos Mortos, deus da morte justa que guia as almas ao destino merecido.', alignment: 'Leal e Neutro', suggestedDomains: ['Morte', 'Vida'], symbol: 'Balança na chama', portfolio: 'Morte, julgamento dos mortos' },
  { name: 'Oghma', description: 'O Senhor do Conhecimento, patrono de bardos e eruditos. Toda sabedoria flui dele.', alignment: 'Neutro', suggestedDomains: ['Conhecimento', 'Enganação'], symbol: 'Pergaminho aberto', portfolio: 'Conhecimento, inspiração, bardos' },
  { name: 'Tempus', description: 'O Senhor da Guerra, deus dos combates justos e da estratégia militar. Abençoa guerreiros honrados.', alignment: 'Neutro', suggestedDomains: ['Guerra', 'Glória'], symbol: 'Espada flamejante', portfolio: 'Guerra, batalha, guerreiros' },
  { name: 'Talos', description: 'O Flagelo das Tempestades, deus da destruição e fúria natural que exige sacrifícios para acalmar sua ira.', alignment: 'Caótico e Mau', suggestedDomains: ['Tempestade', 'Guerra'], symbol: 'Relâmpago partindo uma torre', portfolio: 'Tempestades, destruição, terremotos' },
  { name: 'Umberlee', description: 'A Rainha das Profundezas, deusa cruel dos mares que exige tributos de navegantes.', alignment: 'Caótico e Mau', suggestedDomains: ['Tempestade', 'Natureza'], symbol: 'Onda esmagando um barco', portfolio: 'Oceanos, tempestades marítimas' },
  { name: 'Shar', description: 'A Senhora das Trevas, deusa da escuridão e do esquecimento que busca apagar toda luz.', alignment: 'Neutro e Mau', suggestedDomains: ['Trevas', 'Enganação'], symbol: 'Disco negro', portfolio: 'Trevas, segredos, perda' },
  { name: 'Selûne', description: 'A Donzela da Lua, deusa da luz celestial que protege os viajantes noturnos e combatentes das trevas.', alignment: 'Caótico e Bom', suggestedDomains: ['Luz', 'Vida'], symbol: 'Olho lunar', portfolio: 'Lua, navegação noturna, luz' },
  { name: 'Lathander', description: 'O Amanhecer, deus da renovação e do nascimento. Cada alvorecer traz nova esperança.', alignment: 'Neutro e Bom', suggestedDomains: ['Luz', 'Vida'], symbol: 'Sol nascente', portfolio: 'Amanhecer, renovação, nascimento' },
  { name: 'Bane', description: 'O Senhor da Tirania, deus da opressão e do domínio. Exige submissão total.', alignment: 'Leal e Mau', suggestedDomains: ['Guerra', 'Enganação'], symbol: 'Punho fechado', portfolio: 'Tirania, opressão, dominação' },
];

const planes = [
  { name: 'Plano Material', type: 'MATERIAL', description: 'O plano de existência primário, onde habita a maioria dos mortais. Inclui Toril, Oerth, Krynn e incontáveis outros mundos.', optionalRule: null },
  { name: 'Plano Etéreo', type: 'TRANSICIONAL', description: 'Um plano fantasmagórico que envolve o Plano Material como uma névoa. Criaturas etéreas podem observar o material sem serem vistas.', optionalRule: null },
  { name: 'Plano Astral', type: 'TRANSICIONAL', description: 'Um plano de consciência pura, onde viajantes podem alcançar os planos exteriores. Flutuam ilhas de pensamento e corpos petrificados de deuses mortos.', optionalRule: null },
  { name: 'Plano do Fogo', type: 'INTERIOR', description: 'Um plano de calor e chamas infinitas, onde o fogo elemental queima sem combustível. Lar de efrits e salamandras.', optionalRule: null },
  { name: 'Plano da Água', type: 'INTERIOR', description: 'Um plano líquido infinito, onde oceanos sem fundo se estendem em todas as direções. Lar de marids e criaturas aquáticas.', optionalRule: null },
  { name: 'Plano da Terra', type: 'INTERIOR', description: 'Um plano de rocha sólida e túneis infinitos, onde cristais brilham na escuridão. Lar de dao e elementais da terra.', optionalRule: null },
  { name: 'Plano do Ar', type: 'INTERIOR', description: 'Um plano de céus infinitos, onde ilhas flutuantes e nuvens sólidas formam a paisagem. Lar de djinns e criaturas aladas.', optionalRule: null },
  { name: 'Monte Celéstia', type: 'EXTERIOR', description: 'Sete picos montanhosos de prata e platina que representam a bondade e a lei. Almas bondosas sobem suas encostas em direção à iluminação.', optionalRule: null },
  { name: 'Elísio', type: 'EXTERIOR', description: 'Campos verdejantes de paz e contentamento, onde almas bondosas encontram descanso eterno. O rio Oceano banha suas margens tranquilas.', optionalRule: null },
  { name: 'Arbórea', type: 'EXTERIOR', description: 'Florestas selvagens e festivas onde a música nunca cessa. O Olímpo abriga os deuses élficos e heróis celebram eternamente.', optionalRule: null },
  { name: 'Limbo', type: 'EXTERIOR', description: 'Caos puro e informe onde a matéria se molda pelo pensamento. Lar dos githzerai e slaadis.', optionalRule: null },
  { name: 'Pandemônio', type: 'EXTERIOR', description: 'Cavernas de ventos uivantes que enlouquecem viajantes. Criaturas caóticas e malignas habitam suas profundezas.', optionalRule: null },
  { name: 'O Abismo', type: 'EXTERIOR', description: 'Camadas infinitas de tortura e caos, onde demônios se reproduzem em guerra eterna. Cada camada é um pesadelo diferente.', optionalRule: { rule: 'Layers of the Abyss are infinite in number; each layer has its own environment and rulers.', source: 'DMG p.63' } },
  { name: 'Hades', type: 'EXTERIOR', description: 'Terra cinzenta e desolada onde a esperança morre. Almas neutras e malignas vagueiam em apatia eterna.', optionalRule: null },
  { name: 'Geena', type: 'EXTERIOR', description: 'Montanhas vulcânicas de rios de lava onde negociadores infernais barganham por almas. Lar dos yugoloths.', optionalRule: null },
  { name: 'Os Nove Infernos', type: 'EXTERIOR', description: 'Nove camadas de tirania infernal governadas por Asmodeus. Diabos aplicam leis perversas em hierarquia cruel.', optionalRule: { rule: 'Each of the Nine Hells is ruled by an archdevil. Asmodeus rules all from Malsheem.', source: 'DMG p.63' } },
  { name: 'Mecânus', type: 'EXTERIOR', description: 'Planos de engrenagens perfeitamente calibradas e lógica pura. Habitado por modrons que seguem ordens hierárquicas.', optionalRule: { rule: 'Time is perfectly ordered; everything runs on precise schedules.', source: 'DMG p.62' } },
  { name: 'Arcádia', type: 'EXTERIOR', description: 'Colinas pacíficas sob céus claros, onde lei e bondade coexistem em harmonia. Conflitos são resolvidos pela verdade.', optionalRule: null },
];

async function main() {
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

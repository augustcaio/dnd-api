# Sprints Detalhados — API D&D 5e (Guia do Mestre)

> Todas as histórias de usuário, rotas e campos de dados abaixo foram extraídos **exclusivamente** do conteúdo do PDF "D&D 5e — Guia do Mestre (Biblioteca Élfica)".

---

## SPRINT 1 — Fundação e Setup (Semanas 1–2)

**Objetivo:** Infraestrutura base do projeto Node.js pronta para receber os dados.

### Tarefas de Infra
- Inicializar projeto Node.js + Express com estrutura de pastas (`/routes`, `/controllers`, `/models`, `/services`, `/utils`)
- Configurar ESLint, Prettier, `.env` e `nodemon`
- Criar `vercel.json` com rewrite de todas as rotas para a API
- Configurar banco PostgreSQL (Neon) + Prisma ORM
- Criar middleware global de tratamento de erros e validação com Zod
- Criar rota de health check: `GET /api/health`
- Criar página estática `public/index.html` (micro frontend mínimo para a Vercel)
- Criar rota `GET /api/docs` servindo documentação básica (Swagger UI)

### Schema Prisma — Entidades Identificadas no Livro
```
- MagicItem       (Cap. 7 — Itens Mágicos)
- Gem             (Cap. 7 — Gemas)
- ArtObject       (Cap. 7 — Objetos de Arte)
- Artifact        (Cap. 7 — Artefatos)
- Poison          (Cap. 8 — Venenos)
- Disease         (Cap. 8 — Doenças)
- Madness         (Cap. 8 — Loucura)
- NPC             (Cap. 4 — Criando Personagens do Mestre)
- Villain         (Cap. 3 — Aventuras Baseadas em Evento)
- Adventure       (Cap. 3 — Tipos de Aventuras)
- DungeonRoom     (Apêndice A — Masmorras Aleatórias)
- Monster         (Apêndice B — Lista de Monstros + Cap. 9)
- Plane           (Cap. 2 — Criando um Multiverso)
- Deity           (Cap. 1 — Deuses do Seu Mundo)
- Faction         (Cap. 1 — Facções e Organizações)
- DowntimeActivity (Cap. 6 — Atividades em Tempo Livre)
```

**Critério de aceite:** `GET /api/health` retorna `200 OK`. Migrations rodando com sucesso no Neon. Deploy preview na Vercel funcional.

---

## SPRINT 2 — Deuses, Planos e o Mundo (Semana 3)

**Fonte no livro:** Capítulo 1 (Seu Próprio Mundo) e Capítulo 2 (Criando um Multiverso)

### Dados a seedar

**Deuses — Panteão da Guerra da Alvorada (tabela completa, pág. 10)**
| Campo | Tipo | Exemplo |
|---|---|---|
| `name` | string | "Asmodeu" |
| `description` | string | "deus da tirania" |
| `alignment` | string | "LM" |
| `suggestedDomains` | string[] | ["Enganação"] |
| `symbol` | string | "Três triângulos em uma formação estreita" |
| `portfolio` | string | "dominação e tirania" |

20 divindades listadas: Asmodeu, Avandra, Bahamut, Bane, Corellon, Erathis, Gruumsh, Ioun, Kord, Lolth, Melora, Moradin, Pelor, Rainha Corvo, Sehanine, Tharizdun, Tiamat, Torog, Vecna, Zehir.

**Planos de Existência (Cap. 2)**
| Campo | Tipo | Exemplo |
|---|---|---|
| `name` | string | "Plano Astral" |
| `type` | enum | "interior" | "exterior" | "transicional" | "material" |
| `description` | string | "Mar prateado..." |
| `optionalRule` | object | `{ name, description, savingThrow }` |

Planos identificados: Plano Astral, Plano Etéreo, Faéria, Umbra, Planos Interiores (4 elementos + Energia Positiva/Negativa), Planos Exteriores (Celestia, Bitopia, Elísio, Terras Selvagens, Arbórea, Ysgard, Limbo, Pandemônio, Abismo, Cárceri, Hades, Geena, Nove Infernos, Gehena, Arcádia, Mecânus).

### Endpoints

```
GET /api/deities                 → lista deuses com filtro por domínio e tendência
GET /api/deities/:id             → deus por ID
GET /api/planes                  → lista planos com filtro por tipo
GET /api/planes/:id              → plano por ID com regra opcional incluída
```

**Critério de aceite:** Retorna os 20 deuses do panteão da Guerra da Alvorada com todos os campos da tabela do livro. Retorna os planos com suas regras opcionais.

---

## SPRINT 3 — Aventuras: Tipos, Objetivos e Estrutura (Semana 4)

**Fonte no livro:** Capítulo 3 (Criando Aventuras)

### Dados a seedar

**Objetivos na Masmorra (d20, pág. 73)**
20 objetivos: "Parar habitantes monstruosos", "Frustrar a trama de um vilão maligno", "Adquirir tesouros", "Resgatar um cativo"...

**Objetivos no Ambiente Selvagem (d20, pág. 73)**
20 objetivos: "Localizar uma masmorra", "Escoltar um PdM até um destino", "Mapear um novo território"...

**Outros Objetivos (d12, pág. 74)**
12 objetivos: "Tomar o controle de um local fortificado", "Libertar prisioneiros", "Infiltrar-se em um local"...

**Objetivos Baseados em Eventos (d20, pág. 76)**
20 objetivos: "Levar o vilão à justiça", "Proteger um objeto", "Destronar um tirano"...

**Vilões da Aventura (d20, pág. 74)**
20 tipos: Besta sem motivações, Aberração, Dragão propenso a saque, Morto-vivo, Fada...

**Aliados da Aventura (d12, pág. 74)**

**Patronos da Aventura (d20, pág. 74)**

**Introduções de Aventura (d12, pág. 74)**

**Clímax de Aventura (d12, pág. 75)**
12 clímax: "Batalha final com lacaios", "Perseguição", "Evento cataclísmico", "Vilão conclui plano mestre"...

**Ações do Vilão (pág. 75)**
6 tipos: Aumentar a Corrupção, Crimes em Série, Espalhar o Crime, Grande Evento, Passo a Passo, Uma e Pronto.

### Endpoints

```
GET /api/adventures/objectives           → lista objetivos com filtro por tipo (dungeon|wilderness|event|other)
GET /api/adventures/villains             → lista tipos de vilões
GET /api/adventures/allies               → lista tipos de aliados
GET /api/adventures/patrons              → lista tipos de patronos
GET /api/adventures/introductions        → lista introduções de aventura
GET /api/adventures/climaxes             → lista clímax de aventura
GET /api/adventures/villain-actions      → lista tipos de ação do vilão

POST /api/adventures/generate            → gera estrutura completa de uma aventura
  body: { type: "location" | "event" | "mystery" | "intrigue" }
  response: {
    objective,   // rolagem aleatória na tabela correta
    villain,     // vilão aleatório
    villainsAction, // ação do vilão
    ally,        // aliado aleatório
    patron,      // patrono aleatório
    introduction, // introdução aleatória
    climax        // clímax aleatório
  }
```

**Critério de aceite:** `POST /api/adventures/generate` retorna uma aventura estruturada completa com todos os campos populados por dados reais das tabelas do livro.

---

## SPRINT 4 — NPCs e Vilões (Semana 5)

**Fonte no livro:** Capítulo 4 (Criando Personagens do Mestre)

### Dados a seedar (todas as tabelas do Cap. 4)

**Aparência do PdM (d20, pág. 89)**
20 características: "Joia chamativa", "Piercings", "Cicatriz notória", "Cor de olho incomum", "Tatuagens"...

**Habilidades do PdM — alta e baixa (d6 cada, pág. 90)**

**Dons do PdM (d20, pág. 90)**
20 dons: "Toca instrumento", "Memória perfeita", "Bom com animais", "Bom em enigmas"...

**Maneirismos do PdM (d20, pág. 91)**
20 maneirismos: "Inclina-se a cantar", "Fala em rimas", "Voz baixa ou alta", "Usa injúrias"...

**Traços de Interação do PdM (d12, pág. 91)**
12 traços: "Argumentativo", "Arrogante", "Honesto", "Quieto", "Desconfiado"...

**Ideais do PdM (pág. 91)**
Bom, Mau, Leal, Caótico, Neutro, Outros — 6 entradas cada categoria.

**Vínculos do PdM (d10, pág. 92)**
10 vínculos: "Dedicado a completar objetivo de vida", "Protege membros da família", "Leal a um benfeitor"...

**Defeitos e Segredos do PdM (Cap. 4)**

**Opções de Classes Vilanescas (pág. 96)**
Classes de vilão listadas no livro.

### Endpoints

```
GET /api/npcs/traits/appearances         → lista aparências
GET /api/npcs/traits/abilities           → lista habilidades altas/baixas
GET /api/npcs/traits/talents             → lista dons
GET /api/npcs/traits/mannerisms          → lista maneirismos
GET /api/npcs/traits/interactions        → lista traços de interação
GET /api/npcs/traits/ideals              → lista ideais (com filtro por tendência)
GET /api/npcs/traits/bonds               → lista vínculos
GET /api/npcs/traits/flaws               → lista defeitos

POST /api/npcs/generate                  → gera NPC completo aleatório
  body: { type?: "villain" | "ally" | "contact" | "hireling" }
  response: {
    occupation, appearance, ability, talent, mannerism,
    interaction, usefulKnowledge, ideal, bond, flaw
  }
```

**Critério de aceite:** `POST /api/npcs/generate` retorna NPC com todos os 10 atributos listados no Cap. 4, cada um populado por uma entrada aleatória das respectivas tabelas do livro.

---

## SPRINT 5 — Ambientes: Masmorras, Selvagem e Assentamentos (Semana 6)

**Fonte no livro:** Capítulo 5 (Ambientes de Aventura) e Apêndice A (Masmorras Aleatórias)

### Dados a seedar

**Tipos de Masmorra (Cap. 5)**
Armadilha Mortal, Covil, Labirinto, Mina, Portal Planar, Templo, Tumba, etc.

**Câmaras por Tipo de Masmorra (Apêndice A — tabelas completas)**

Tabelas por tipo:
- `MASMORRA: ARMADILHA MORTAL` (d20, pág. 293)
- `MASMORRA: COVIL` (d20, pág. 294)
- `MASMORRA: LABIRINTO` (d20, pág. 294)
- `MASMORRA: MINA` (d20, pág. 295)
- `MASMORRA: PORTAL PLANAR` (d100, pág. 295)
- `CÂMARAS DA MASMORRA EM GERAL` (pág. 296+)

**Tabelas do Apêndice A**
| Tabela | Dados | Entradas |
|---|---|---|
| Área Inicial | d10 | 10 configurações |
| Passagem | d20 | 20 tipos de passagem |
| Largura da Passagem | d12/d20 | larguras de 1,5m a 12m |
| Tipo de Porta | d20 | Madeira, Pedra, Ferro, Levadiça, Secreta |
| Atrás de uma Porta | d20 | 20 resultados |
| Câmaras | d20 | 20 formatos (quadrada, retangular, circular, octogonal) |
| Saídas da Câmara | d20 | por tamanho normal/grande |
| Localização da Saída | d20 | 20 locais |
| Tipo de Saída | d20 | porta ou corredor |
| Escadas | d20 | 20 tipos |

**Construções Aleatórias Urbanas (Cap. 5, pág. 114)**
Tipo de Construção, Taverna (d20), etc.

**Encontros Aleatórios Urbanos (pág. 114)**

### Endpoints

```
GET /api/dungeons/types                  → lista tipos de masmorra
GET /api/dungeons/rooms/:type            → lista câmaras por tipo de masmorra
GET /api/dungeons/tables/passage         → retorna tabela de passagens
GET /api/dungeons/tables/door            → retorna tabela de portas
GET /api/dungeons/tables/chamber         → retorna tabela de câmaras
GET /api/dungeons/tables/stair           → retorna tabela de escadas

POST /api/dungeons/generate              → gera masmorra aleatória completa
  body: {
    type: "covil" | "labirinto" | "mina" | "tumba" | "portal_planar" | ...,
    levels?: number,
    rooms?: number
  }
  response: {
    startingArea,      // Apêndice A — Área Inicial
    rooms: [{
      id, shape, dimensions, exits, purpose,  // tabelas do Apêndice A
      content: { monsters?, traps?, treasure? }
    }],
    passages: [{ length, width, doors }],
    stairs: []
  }

GET /api/environments/wilderness/survival   → regras de sobrevivência no ambiente selvagem
GET /api/environments/settlements           → tipos e características de assentamentos
```

**Critério de aceite:** `POST /api/dungeons/generate` retorna masmorra com área inicial, câmaras (com propósito baseado no tipo selecionado) e passagens, todos derivados das tabelas do Apêndice A.

---

## SPRINT 6 — Tesouros: Individuais, Pilhas, Gemas e Objetos de Arte (Semana 7)

**Fonte no livro:** Capítulo 7 (Tesouro) — páginas 133–135

### Dados a seedar

**Tabelas de Tesouro Individual (pág. 136)**
4 tabelas por faixa de ND:
- ND 0–4: 5 faixas de resultado (d100)
- ND 5–10: 5 faixas
- ND 11–16: 4 faixas
- ND 17+: 3 faixas

Cada faixa define quantidades em PC, PP, PE, PO, PL.

**Tabelas de Pilha de Tesouro (pág. 136–137)**
4 tabelas (ND 0–4, 5–10, 11–16, 17+), cada uma com:
- Moedas base
- d100 → gemas/objetos de arte + tabelas de item mágico (A–I)

**Gemas (pág. 134)**
6 categorias de valor: 10 po, 50 po, 100 po, 500 po, 1.000 po, 5.000 po
Total de ~50 gemas com nome, descrição visual e opacidade.

**Objetos de Arte (pág. 134–135)**
6 categorias de valor: 25 po, 250 po, 750 po, 2.500 po, 7.500 po
Total de ~50 objetos com descrição.

**Raridade de Itens Mágicos (pág. 135)**
| Raridade | Nível | Valor |
|---|---|---|
| Comum | 1° ou maior | 50–100 po |
| Incomum | 5° ou maior | 101–500 po |
| Raro | 9° ou maior | 501–5.000 po |
| Muito raro | 13° ou maior | 5.001–50.000 po |
| Lendário | 17° ou maior | 50.001+ po |

### Endpoints

```
GET /api/treasures/gems                  → lista gemas com filtro por valor
GET /api/treasures/art-objects           → lista objetos de arte com filtro por valor
GET /api/treasures/rarity                → tabela de raridade de itens mágicos

POST /api/treasures/roll/individual      → rola tesouro individual
  body: { challengeRating: number }      // ND do monstro
  response: { pc, pp, pe, po, pl }

POST /api/treasures/roll/hoard           → rola pilha de tesouro
  body: { challengeRating: number }
  response: {
    coins: { pc, pp, pe, po, pl },
    gems?: [{ name, value, description }],
    artObjects?: [{ name, value, description }],
    magicItems?: [{ table, rolls }]
  }
```

**Critério de aceite:** `POST /api/treasures/roll/individual` com ND 5 retorna valores de moedas dentro das faixas da tabela da página 136. `POST /api/treasures/roll/hoard` com ND 11 retorna pilha com gemas/arte/itens mágicos de acordo com a tabela.

---

## SPRINT 7 — Itens Mágicos: Tabelas A–I e Propriedades (Semanas 8–9)

**Fonte no livro:** Capítulo 7 (Itens Mágicos) — páginas 135–228

### Dados a seedar

**Tabelas de Itens Mágicos A–I (Cap. 7)**
O livro lista 9 tabelas (A a I) com itens de diferentes raridades:
- Tabela A: itens comuns
- Tabela B: itens incomuns
- Tabelas C–E: itens raros
- Tabelas F–G: itens muito raros
- Tabelas H–I: itens lendários

Cada item tem:
| Campo | Tipo |
|---|---|
| `name` | string |
| `type` | enum: armadura, poção, pergaminho, anel, bastão, cajado, varinha, arma, maravilhoso |
| `rarity` | enum: comum, incomum, raro, muito_raro, lendário |
| `requiresAttunement` | boolean |
| `attunementPrerequisite` | string? |
| `description` | string |
| `table` | string (A–I) |

**Itens Mágicos Inteligentes (pág. 215)**
Propriedades adicionais: `sentience`, `communication`, `senses`, `alignment`, `personality`

**Artefatos (pág. 220)**
Poderosos itens únicos com propriedades benéficas e maléficas:
- Amuleto dos Planos
- Baralho das Surpresas (baralho com 22 cartas — tabela completa no livro)
- Espada da Destruição
- Olho e Mão de Vecna
- Cálice de Sangue
- etc.

**Outras Recompensas (pág. 228)**
Bênçãos, Encantos, Épicos, etc.

### Endpoints

```
GET /api/items                           → lista itens mágicos
  query: ?rarity=&type=&table=&requiresAttunement=
GET /api/items/:id                       → item por ID com descrição completa
GET /api/items/tables/:table             → itens de uma tabela específica (A–I)
GET /api/items/artifacts                 → lista artefatos
GET /api/items/intelligent               → lista itens inteligentes
GET /api/items/rewards                   → lista outras recompensas (bênçãos, encantos)

POST /api/items/roll/:table              → rola item aleatório de uma tabela (A–I)
POST /api/items/identify                 → retorna método de identificação do item (regras pág. 136)
```

**Critério de aceite:** `GET /api/items?rarity=lendário` retorna apenas itens lendários. `GET /api/items/artifacts` inclui o Baralho das Surpresas com as 22 cartas listadas na tabela do livro.

---

## SPRINT 8 — Venenos, Doenças e Loucura (Semana 9)

**Fonte no livro:** Capítulo 8 (Conduzindo o Jogo) — páginas 257–262

### Dados a seedar

**Venenos — 14 entradas (tabela pág. 258)**
| Campo | Tipo | Exemplo |
|---|---|---|
| `name` | string | "Essência de Éter" |
| `type` | enum | "contato" \| "ferimento" \| "inalação" \| "ingestão" |
| `pricePerDose` | number | 300 |
| `effect` | string | "Inconsciente por 8 horas (CD 15 Con)" |
| `savingThrow` | object | `{ ability: "Con", dc: 15 }` |
| `damage` | string? | "3d6 veneno" |
| `duration` | string? | "8 horas" |
| `condition` | string? | "inconsciente" |

14 venenos: Essência de Éter, Lágrimas da Meia-Noite, Malícia, Muco de Verme da Carniça, Óleo de Taggit, Sangue de Assassino, Sérum da Verdade, Tintura Pálida, Torpor, Vapores Causticantes de Othur, Veneno de Serpente, Veneno de Verme Púrpura, Veneno de Wyvern, Veneno Drow.

**Doenças — 3 exemplos (pág. 257)**
| Campo | Tipo |
|---|---|
| `name` | string |
| `transmission` | string |
| `incubation` | string |
| `symptoms` | string |
| `savingThrow` | object |
| `cure` | string |

Doenças: Febre Tagarelante, Praga do Esgoto, Decomposição Ocular.

**Loucura (pág. 260)**
3 durações: Curta (d100 → 10 efeitos), Longa (d100 → 10 efeitos), Permanente (d100 → 10 efeitos)
| Campo | Tipo |
|---|---|
| `duration` | enum: "curta" \| "longa" \| "permanente" |
| `d100Min` | number |
| `d100Max` | number |
| `effect` | string |

### Endpoints

```
GET /api/hazards/poisons                 → lista venenos com filtro por tipo
GET /api/hazards/poisons/:id             → veneno por ID com efeito completo
GET /api/hazards/diseases                → lista doenças
GET /api/hazards/diseases/:id            → doença por ID
GET /api/hazards/madness                 → lista formas de loucura
GET /api/hazards/madness/roll            → rola forma aleatória de loucura
  query: ?duration=curta|longa|permanente
```

**Critério de aceite:** `GET /api/hazards/poisons` retorna os 14 venenos com preço, tipo e CD de resistência conforme tabela da página 258.

---

## SPRINT 9 — Regras do Jogo: Habilidades, Combate e Perseguições (Semana 10)

**Fonte no livro:** Capítulo 8 (Conduzindo o Jogo) — páginas 236–262 e Capítulo 9 (Oficina do Mestre) — páginas 264–292

### Dados a seedar

**Testes de Habilidade (tabela pág. 238)**
6 habilidades com uso e exemplos: Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma.

**Classes de Dificuldade (tabela pág. 239)**
| Tarefa | CD |
|---|---|
| Muito fácil | 5 |
| Fácil | 10 |
| Moderada | 15 |
| Difícil | 20 |
| Muito difícil | 25 |
| Quase impossível | 30 |

**Testes de Resistência (tabela pág. 239)**
6 habilidades com situações de uso.

**Regras Opcionais do Capítulo 9**
- Dado de Proficiência (tabela por nível, pág. 264)
- Variações de Perícia: 3 variações (Proficiência em Teste de Habilidade, Proficiência em Antecedente, Proficiência em Traço de Personalidade)
- Pontos Heroicos (pág. 265)
- Valor de Honra (pág. 265)
- Valor de Sanidade (pág. 266)
- Opções de Aventura: Personagens do Mal, Grupos Alternativos
- Opções de Combate: Ação de Combate Especial (10+ regras), Dano Maciço + Choque do Sistema (d10, pág. 274), Moral (pág. 274)

**Perseguições (Cap. 8, pág. 253)**
Tabelas de complicações: Perseguição Urbana (d20) e Perseguição na Natureza (d20).

**Armas de Cerco (pág. 256)**
Balista, Caldeirão, Canhão de Rochedo, Canhão de Trabuquete, Torre de Assalto.

**Pontos de Experiência por ND (tabela pág. 276)**
ND 0 (10 XP) até ND 30 (155.000 XP) — 30 entradas.

### Endpoints

```
GET /api/rules/ability-checks            → testes de habilidade com exemplos
GET /api/rules/difficulty-classes        → tabela de CDs
GET /api/rules/saving-throws             → testes de resistência por habilidade
GET /api/rules/chase-complications       → complicações de perseguição
  query: ?environment=urban|wilderness
GET /api/rules/siege-weapons             → armas de cerco com estatísticas
GET /api/rules/optional                  → lista regras opcionais disponíveis
GET /api/rules/optional/:slug            → regra opcional detalhada (ex: "dado-de-proficiencia")
GET /api/rules/xp-by-cr                  → tabela de XP por nível de desafio (ND 0–30)
```

**Critério de aceite:** `GET /api/rules/xp-by-cr` retorna os 30 níveis de desafio com o XP correto conforme tabela da página 276.

---

## SPRINT 10 — Oficina do Mestre: Criando Monstros, Magias e Itens (Semana 10)

**Fonte no livro:** Capítulo 9 (Oficina do Mestre) — páginas 274–290

### Dados a seedar

**Estatísticas de Monstro por ND (tabela completa pág. 275)**
30+ entradas com: ND, Bônus Prof., CA, PV (faixa), Bônus Ataque, Dano/Rodada, CD de Resist.

**Tipos de Monstro (Manual dos Monstros + Cap. 9)**
Aberração, Besta, Celestial, Constructo, Corruptor, Dragão, Elemental, Fada, Gigante, Humanoide, Morto-vivo, Planta, Viscoso.

**Tamanhos de Monstro**
Miúdo, Pequeno, Médio, Grande, Enorme, Imenso — com dados de vida correspondentes.

**Apêndice B — Lista de Monstros por ND**
Lista completa de monstros organizados por nível de desafio (pág. 303–314).

### Endpoints

```
GET /api/monsters/stats-by-cr            → tabela de estatísticas de monstro por ND
GET /api/monsters/list                   → lista de monstros do Apêndice B
  query: ?cr=&type=&size=
GET /api/monsters/:id                    → monstro por ID

POST /api/monsters/create-quick          → cria bloco de estatísticas rápido
  body: { intendedCR: number, name: string }
  response: { ca, hp, attackBonus, damagePerRound, saveCD, profBonus }

GET /api/spells/creation-guide           → guia de criação de magia (Cap. 9)
GET /api/items/creation-guide            → guia de criação de item mágico (Cap. 9)
```

**Critério de aceite:** `POST /api/monsters/create-quick` com `intendedCR: 5` retorna estatísticas dentro dos valores da linha ND 5 da tabela da página 275 (CA 15, PV 131–145, Bônus +6, Dano 33–38, CD 15).

---

## SPRINT 11 — Atividades em Tempo Livre e Campanha (Semana 11)

**Fonte no livro:** Capítulo 6 (Entre Aventuras) — páginas 125–132

### Dados a seedar

**Atividades em Tempo Livre (Cap. 6 + Livro do Jogador)**
| Atividade | Custo de Tempo | Descrição |
|---|---|---|
| Construindo uma Fortaleza | varia | necessita aquisição de lote |
| Conduzindo um Negócio | d100 por fase | resultado na tabela |
| Farreando | 1+ semanas | resultado em d100 + nível |
| Recuperando-se | 3 dias | remove exaustão/doença |
| Pesquisando | 1+ semanas | custo de 1 po/dia + biblioteca |
| Treinando para Aprender um Idioma/Ferramenta | 250 dias | custo 1 po/dia |

**Tabela de Farreando (d100 + nível, pág. 128)**
10 faixas de resultado: prisão, amnésia, inimigo, dívida...

**Tabela de Conduzindo um Negócio (d100, pág. 129)**
10 faixas.

**Custos de Manutenção de Propriedades (tabela pág. 127)**
15 tipos: Abadia (20 po/dia), Castelo pequeno (100 po/dia), Estalagem, Fazenda, Templo, Torre Fortificada...

**Eventos de Campanha Aleatórios (Cap. 1, págs. 26–33)**
Eventos de início, meio e fim de campanha — tabelas de d6/d10/d20 com eventos mundiais, locais, pessoais.

### Endpoints

```
GET /api/downtime/activities             → lista atividades em tempo livre
GET /api/downtime/activities/:slug       → atividade detalhada com regras
POST /api/downtime/carousing/roll        → rola resultado de farra
  body: { characterLevel: number }
POST /api/downtime/business/roll         → rola resultado de negócio

GET /api/campaign/maintenance-costs      → tabela de custos de manutenção de propriedades
GET /api/campaign/events/roll            → rola evento aleatório de campanha
  query: ?stage=early|mid|late
```

**Critério de aceite:** `POST /api/downtime/carousing/roll` com `characterLevel: 3` retorna resultado compatível com `d100 + 3` na tabela da página 128.

---

## SPRINT 12 — Micro Frontend, Busca Global, Testes e Deploy (Semanas 11–12)

### Micro Frontend (Vercel)
- `public/index.html` — página de consulta com:
  - Links para cada grupo de endpoints
  - Campo de busca global conectado a `GET /api/search`
  - Exibição formatada de JSON com highlight de sintaxe
  - Links para `/api/docs` (Swagger UI)

### Busca Global

```
GET /api/search?q=                       → busca full-text em todos os recursos
  Busca em: itens mágicos, monstros, venenos, doenças, deuses, planos, PdMs
  response: { results: [{ type, id, name, excerpt }] }
```

### Testes de Integração (Jest + Supertest)
- Todos os endpoints GET respondem 200
- `POST /api/adventures/generate` retorna estrutura válida
- `POST /api/dungeons/generate` retorna câmaras com propósito correto por tipo
- `POST /api/treasures/roll/individual` retorna moedas na faixa correta por ND
- `POST /api/npcs/generate` retorna NPC com 10 atributos preenchidos
- `POST /api/monsters/create-quick` retorna estatísticas dentro da faixa do ND

### CI/CD
- GitHub Actions: lint → test → deploy na Vercel
- Migrations automáticas via `postinstall` no `package.json`
- Variáveis de ambiente separadas por ambiente (preview/production)
- README com exemplos de uso com `curl`

**Critério de aceite:** 100% dos testes passando. Deploy automático na Vercel ao fazer push para `main`. Micro frontend acessível na URL da Vercel com busca funcional.

---

## Resumo dos Endpoints por Sprint

| Sprint | Endpoints | Fonte no Livro |
|---|---|---|
| 1 | `/api/health`, `/api/docs` | — |
| 2 | `/api/deities`, `/api/planes` | Cap. 1–2 |
| 3 | `/api/adventures/*`, `POST generate` | Cap. 3 |
| 4 | `/api/npcs/*`, `POST generate` | Cap. 4 |
| 5 | `/api/dungeons/*`, `/api/environments/*` | Cap. 5, Apêndice A |
| 6 | `/api/treasures/*` (moedas, gemas, arte) | Cap. 7 |
| 7 | `/api/items/*` (mágicos, artefatos) | Cap. 7 |
| 8 | `/api/hazards/*` (venenos, doenças, loucura) | Cap. 8 |
| 9 | `/api/rules/*` (habilidades, CDs, XP, perseguições) | Cap. 8–9 |
| 10 | `/api/monsters/*`, `/api/spells`, `/api/items/creation-guide` | Cap. 9, Apêndice B |
| 11 | `/api/downtime/*`, `/api/campaign/*` | Cap. 6 |
| 12 | `/api/search`, testes, deploy | — |

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('ARMADURA', 'POCAO', 'PERGAMINHO', 'ANEL', 'BASTAO', 'CAJADO', 'VARINHA', 'ARMA', 'MARAVILHOSO');

-- CreateEnum
CREATE TYPE "ItemRarity" AS ENUM ('COMUM', 'INCOMUM', 'RARO', 'MUITO_RARO', 'LENDARIO');

-- CreateEnum
CREATE TYPE "PlaneType" AS ENUM ('INTERIOR', 'EXTERIOR', 'TRANSICIONAL', 'MATERIAL');

-- CreateEnum
CREATE TYPE "PoisonType" AS ENUM ('CONTATO', 'FERIMENTO', 'INALACAO', 'INGESTAO');

-- CreateEnum
CREATE TYPE "MadnessDuration" AS ENUM ('CURTA', 'LONGA', 'PERMANENTE');

-- CreateTable
CREATE TABLE "Deity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "alignment" TEXT NOT NULL,
    "suggestedDomains" TEXT[],
    "symbol" TEXT NOT NULL,
    "portfolio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plane" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PlaneType" NOT NULL,
    "description" TEXT NOT NULL,
    "optionalRule" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "rarity" "ItemRarity" NOT NULL,
    "requiresAttunement" BOOLEAN NOT NULL DEFAULT false,
    "attunementPrerequisite" TEXT,
    "description" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "sentience" JSONB,
    "communication" TEXT,
    "senses" TEXT,
    "alignment" TEXT,
    "personality" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MagicItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "opacity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtObject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArtObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "properties" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualTreasure" (
    "id" SERIAL NOT NULL,
    "crRange" TEXT NOT NULL,
    "d100Min" INTEGER NOT NULL,
    "d100Max" INTEGER NOT NULL,
    "cp" TEXT,
    "sp" TEXT,
    "ep" TEXT,
    "gp" TEXT,
    "pp" TEXT,

    CONSTRAINT "IndividualTreasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HoardTreasure" (
    "id" SERIAL NOT NULL,
    "crRange" TEXT NOT NULL,
    "coinCp" TEXT,
    "coinSp" TEXT,
    "coinEp" TEXT,
    "coinGp" TEXT,
    "coinPp" TEXT,
    "d100Min" INTEGER NOT NULL,
    "d100Max" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemAmount" TEXT NOT NULL,

    CONSTRAINT "HoardTreasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poison" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PoisonType" NOT NULL,
    "pricePerDose" INTEGER NOT NULL,
    "effect" TEXT NOT NULL,
    "savingThrow" JSONB NOT NULL,
    "damage" TEXT,
    "duration" TEXT,
    "condition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "incubation" TEXT NOT NULL,
    "symptoms" TEXT NOT NULL,
    "savingThrow" JSONB NOT NULL,
    "cure" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Madness" (
    "id" SERIAL NOT NULL,
    "duration" "MadnessDuration" NOT NULL,
    "d100Min" INTEGER NOT NULL,
    "d100Max" INTEGER NOT NULL,
    "effect" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Madness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NPC" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "occupation" TEXT,
    "appearance" TEXT,
    "ability" TEXT,
    "talent" TEXT,
    "mannerism" TEXT,
    "interaction" TEXT,
    "ideal" TEXT,
    "bond" TEXT,
    "flaw" TEXT,
    "usefulKnowledge" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NPC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Villain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "goal" TEXT,
    "methods" TEXT,
    "weakness" TEXT,
    "villainClass" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Villain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adventure" (
    "id" SERIAL NOT NULL,
    "objective" TEXT NOT NULL,
    "objectiveType" TEXT NOT NULL,
    "villain" TEXT,
    "villainAction" TEXT,
    "ally" TEXT,
    "patron" TEXT,
    "introduction" TEXT,
    "climax" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonRoom" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "shape" TEXT,
    "dimensions" TEXT,
    "exits" TEXT,
    "purpose" TEXT,
    "content" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DungeonRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cr" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "ac" INTEGER,
    "hp" TEXT,
    "attackBonus" INTEGER,
    "damage" TEXT,
    "damagePerRound" TEXT,
    "saveDC" INTEGER,
    "profBonus" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "alignment" TEXT,
    "influence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DowntimeActivity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" TEXT,
    "timeCost" TEXT,
    "table" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DowntimeActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventureObjective" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dice" TEXT,

    CONSTRAINT "AdventureObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventureVillainType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AdventureVillainType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventureAlly" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AdventureAlly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventurePatron" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AdventurePatron_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventureIntroduction" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AdventureIntroduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventureClimax" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AdventureClimax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillainAction" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "VillainAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcAppearance" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "NpcAppearance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcAbility" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "ability" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "NpcAbility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcTalent" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "NpcTalent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcMannerism" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "NpcMannerism_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcInteraction" (
    "id" SERIAL NOT NULL,
    "trait" TEXT NOT NULL,

    CONSTRAINT "NpcInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcIdeal" (
    "id" SERIAL NOT NULL,
    "alignment" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "NpcIdeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcBond" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "NpcBond_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcFlaw" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "NpcFlaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonStartingArea" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DungeonStartingArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonPassage" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "features" TEXT,

    CONSTRAINT "DungeonPassage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonDoor" (
    "id" SERIAL NOT NULL,
    "material" TEXT NOT NULL,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "isBarred" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DungeonDoor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonChamber" (
    "id" SERIAL NOT NULL,
    "shape" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,

    CONSTRAINT "DungeonChamber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbilityCheck" (
    "id" SERIAL NOT NULL,
    "ability" TEXT NOT NULL,
    "examples" TEXT NOT NULL,

    CONSTRAINT "AbilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DifficultyClass" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "dc" INTEGER NOT NULL,

    CONSTRAINT "DifficultyClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavingThrow" (
    "id" SERIAL NOT NULL,
    "ability" TEXT NOT NULL,
    "situations" TEXT NOT NULL,

    CONSTRAINT "SavingThrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChaseComplication" (
    "id" SERIAL NOT NULL,
    "environment" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "saveDc" INTEGER NOT NULL,

    CONSTRAINT "ChaseComplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiegeWeapon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "ac" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "damage" TEXT NOT NULL,
    "crew" TEXT NOT NULL,

    CONSTRAINT "SiegeWeapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XpByCr" (
    "id" SERIAL NOT NULL,
    "cr" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL,

    CONSTRAINT "XpByCr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionalRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "OptionalRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterStatByCr" (
    "id" SERIAL NOT NULL,
    "cr" INTEGER NOT NULL,
    "profBonus" INTEGER NOT NULL,
    "ac" INTEGER NOT NULL,
    "hpMin" INTEGER NOT NULL,
    "hpMax" INTEGER NOT NULL,
    "attackBonus" INTEGER NOT NULL,
    "damageMin" INTEGER NOT NULL,
    "damageMax" INTEGER NOT NULL,
    "saveDc" INTEGER NOT NULL,

    CONSTRAINT "MonsterStatByCr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyMaintenanceCost" (
    "id" SERIAL NOT NULL,
    "propertyType" TEXT NOT NULL,
    "dailyCost" INTEGER NOT NULL,
    "trainedServants" INTEGER NOT NULL,
    "untrainedServants" INTEGER NOT NULL,

    CONSTRAINT "PropertyMaintenanceCost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarousingResult" (
    "id" SERIAL NOT NULL,
    "d100Min" INTEGER NOT NULL,
    "d100Max" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CarousingResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessResult" (
    "id" SERIAL NOT NULL,
    "d100Min" INTEGER NOT NULL,
    "d100Max" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BusinessResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deity_name_key" ON "Deity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plane_name_key" ON "Plane"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MagicItem_name_key" ON "MagicItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gem_name_key" ON "Gem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArtObject_name_key" ON "ArtObject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artifact_name_key" ON "Artifact"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Poison_name_key" ON "Poison"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Disease_name_key" ON "Disease"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Monster_name_key" ON "Monster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Faction_name_key" ON "Faction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DowntimeActivity_name_key" ON "DowntimeActivity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OptionalRule_slug_key" ON "OptionalRule"("slug");

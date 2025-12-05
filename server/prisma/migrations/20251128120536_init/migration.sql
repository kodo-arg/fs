-- CreateEnum
CREATE TYPE "RolNombre" AS ENUM ('ADMIN', 'JUGADOR', 'PREMIUM');

-- CreateEnum
CREATE TYPE "EstadoTorneo" AS ENUM ('ABIERTO', 'EN_CURSO', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "FormatoTorneo" AS ENUM ('UNO_VS_UNO', 'DOS_VS_DOS', 'TRES_VS_TRES', 'CINCO_VS_CINCO');

-- CreateEnum
CREATE TYPE "EstadoPartida" AS ENUM ('PROGRAMADA', 'EN_VIVO', 'FINALIZADA');

-- CreateEnum
CREATE TYPE "EstadoInscripcion" AS ENUM ('PENDIENTE', 'ACEPTADO', 'RECHAZADO');

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" "RolNombre" NOT NULL DEFAULT 'JUGADOR',

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "steam_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "avatar_url" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "logo_url" TEXT,
    "captain_id" INTEGER NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiembroEquipo" (
    "team_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MiembroEquipo_pkey" PRIMARY KEY ("team_id","user_id")
);

-- CreateTable
CREATE TABLE "Torneo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" "EstadoTorneo" NOT NULL DEFAULT 'ABIERTO',
    "formato" "FormatoTorneo" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "max_teams" INTEGER NOT NULL,
    "prize_pool" DOUBLE PRECISION,

    CONSTRAINT "Torneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipanteTorneo" (
    "tournament_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "estado" "EstadoInscripcion" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "ParticipanteTorneo_pkey" PRIMARY KEY ("tournament_id","team_id")
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" SERIAL NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "team_a_id" INTEGER NOT NULL,
    "team_b_id" INTEGER NOT NULL,
    "scoreA" INTEGER DEFAULT 0,
    "scoreB" INTEGER DEFAULT 0,
    "winner_id" INTEGER,
    "map_name" TEXT,
    "demo_url" TEXT,
    "estado" "EstadoPartida" NOT NULL DEFAULT 'PROGRAMADA',

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadisticaJugador" (
    "id" SERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "hs_percent" DOUBLE PRECISION,

    CONSTRAINT "EstadisticaJugador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingGlobal" (
    "user_id" INTEGER NOT NULL,
    "elo" INTEGER NOT NULL DEFAULT 1000,
    "victorias" INTEGER NOT NULL DEFAULT 0,
    "derrotas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RankingGlobal_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_steam_id_key" ON "Usuario"("steam_id");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_captain_id_fkey" FOREIGN KEY ("captain_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiembroEquipo" ADD CONSTRAINT "MiembroEquipo_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiembroEquipo" ADD CONSTRAINT "MiembroEquipo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteTorneo" ADD CONSTRAINT "ParticipanteTorneo_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteTorneo" ADD CONSTRAINT "ParticipanteTorneo_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_team_a_id_fkey" FOREIGN KEY ("team_a_id") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_team_b_id_fkey" FOREIGN KEY ("team_b_id") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "Equipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaJugador" ADD CONSTRAINT "EstadisticaJugador_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Partida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaJugador" ADD CONSTRAINT "EstadisticaJugador_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingGlobal" ADD CONSTRAINT "RankingGlobal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

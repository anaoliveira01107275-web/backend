/*
  Warnings:

  - You are about to drop the column `updataAt` on the `Cursos` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Cursos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AlunosCursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunosId" INTEGER NOT NULL,
    "cursosId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AlunosCursos_alunosId_fkey" FOREIGN KEY ("alunosId") REFERENCES "Alunos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunosCursos_cursosId_fkey" FOREIGN KEY ("cursosId") REFERENCES "Cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professor" TEXT,
    "cargaHoraria" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Cursos" ("cargaHoraria", "createdAt", "descricao", "id", "nome", "professor") SELECT "cargaHoraria", "createdAt", "descricao", "id", "nome", "professor" FROM "Cursos";
DROP TABLE "Cursos";
ALTER TABLE "new_Cursos" RENAME TO "Cursos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

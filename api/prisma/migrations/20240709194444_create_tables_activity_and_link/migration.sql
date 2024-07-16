-- CreateTable
CREATE TABLE "Atividades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "occurs_at" DATETIME NOT NULL,
    "value" INTEGER,
    "tripId" TEXT NOT NULL,
    CONSTRAINT "Atividades_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Viagens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    CONSTRAINT "Links_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Viagens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

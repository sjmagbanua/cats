-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "todo" TEXT NOT NULL,
    "startdate" DATETIME NOT NULL,
    "duedate" DATETIME NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_email_key" ON "Task"("email");

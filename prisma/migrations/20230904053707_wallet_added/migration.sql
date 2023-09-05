-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "handCash" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "wallet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "handCash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bankAccount" (
    "id" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposit" (
    "id" TEXT NOT NULL,
    "ammount" DOUBLE PRECISION NOT NULL,
    "bankAccount_id" TEXT,
    "handCash_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawal" (
    "id" TEXT NOT NULL,
    "ammount" DOUBLE PRECISION NOT NULL,
    "bankAccount_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spent" (
    "id" TEXT NOT NULL,
    "ammount" DOUBLE PRECISION NOT NULL,
    "bankAccount_id" TEXT,
    "handCash_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallet_user_id_key" ON "wallet"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "handCash_wallet_id_key" ON "handCash"("wallet_id");

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "handCash" ADD CONSTRAINT "handCash_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bankAccount" ADD CONSTRAINT "bankAccount_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_bankAccount_id_fkey" FOREIGN KEY ("bankAccount_id") REFERENCES "bankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_handCash_id_fkey" FOREIGN KEY ("handCash_id") REFERENCES "handCash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawal" ADD CONSTRAINT "withdrawal_bankAccount_id_fkey" FOREIGN KEY ("bankAccount_id") REFERENCES "bankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spent" ADD CONSTRAINT "spent_bankAccount_id_fkey" FOREIGN KEY ("bankAccount_id") REFERENCES "bankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spent" ADD CONSTRAINT "spent_handCash_id_fkey" FOREIGN KEY ("handCash_id") REFERENCES "handCash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

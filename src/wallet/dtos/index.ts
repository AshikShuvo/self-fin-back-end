// schima
// id          String        @id @default(uuid())
// name        String?
//   user        user          @relation(fields: [user_id], references: [id])
// user_id     String        @unique
// handCash    handCash?
//   bankAccount bankAccount[]
// created_at  DateTime      @default(now())
// updated_at  DateTime      @updatedAt
export class CreateWalletDto {
  name?: string;
  user_id: string;
}

export class UpdateWalletDto {
  name?: string;
}

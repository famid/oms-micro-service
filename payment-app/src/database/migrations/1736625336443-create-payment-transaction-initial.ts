import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentTransactionInitial1736625336443
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'payment_transactions' table
    await queryRunner.query(`
      CREATE TABLE "payment_transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "order_id" uuid NOT NULL,
        "amount" decimal(10, 2) NOT NULL,
        "status" character varying(50) NOT NULL,
        "failure_reason" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_payment_transactions_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop 'payment_transactions' table
    await queryRunner.query(`DROP TABLE "payment_transactions"`);
  }
}

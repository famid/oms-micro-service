import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderAndOrderItemInitial1736625336442
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'orders' table
    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "customer_id" uuid NOT NULL,
        "total_amount" decimal(10, 2) NOT NULL,
        "status" character varying(50) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_orders_id" PRIMARY KEY ("id")
      )
    `);

    // Create 'order_items' table
    await queryRunner.query(`
      CREATE TABLE "order_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "order_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "quantity" integer NOT NULL,
        "price" decimal(10, 2) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_order_items_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_order_items_order_id" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop 'order_items' table
    await queryRunner.query(`DROP TABLE "order_items"`);

    // Drop 'orders' table
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}

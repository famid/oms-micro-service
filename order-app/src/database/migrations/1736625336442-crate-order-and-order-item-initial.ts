import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderAndOrderItemSchema1234567890123
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing tables
    await queryRunner.query(`DROP TABLE IF EXISTS "order_items"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);

    // Recreate the 'orders' table with the updated schema
    await queryRunner.query(`
      CREATE TABLE "orders" (
                              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                              "customer_id" varchar(255) NOT NULL, -- Changed to string
                              "total_amount" decimal(10, 2) NOT NULL,
                              "status" character varying(50) NOT NULL,
                              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                              "deleted_at" TIMESTAMP,
                              CONSTRAINT "PK_orders_id" PRIMARY KEY ("id")
      )
    `);

    // Recreate the 'order_items' table with the updated schema
    await queryRunner.query(`
      CREATE TABLE "order_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "order_id" uuid NOT NULL, -- Set as uuid
        "product_id" varchar(255) NOT NULL, -- Changed to string
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
    // Drop the new tables
    await queryRunner.query(`DROP TABLE IF EXISTS "order_items"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);
  }
}

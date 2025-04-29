import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1681994400000 implements MigrationInterface {
  name = 'CreateInitialTables1681994400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabel users
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR NOT NULL,
        "email" VARCHAR NOT NULL UNIQUE,
        "password_hash" VARCHAR NOT NULL,
        "profile_picture" VARCHAR,
        "bio" VARCHAR,
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);

    // Tabel menu
    await queryRunner.query(`
      CREATE TABLE "menu" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "description" TEXT,
        "price" INTEGER NOT NULL,
        "image" VARCHAR
      )
    `);

    // Tabel cart
    await queryRunner.query(`
      CREATE TABLE "cart" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "menuId" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL,
        CONSTRAINT "FK_cart_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_cart_menu" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE
      )
    `);

    // Tabel orders
    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "paymentMethod" VARCHAR NOT NULL,
        "deliveryAddress" VARCHAR NOT NULL,
        "totalPrice" DECIMAL(10, 2) NOT NULL,
        "status" VARCHAR DEFAULT 'pending',
        "createdAt" TIMESTAMP DEFAULT now(),
        CONSTRAINT "FK_orders_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    // Tabel order_items (relasi antara order dan menu)
    await queryRunner.query(`
      CREATE TABLE "order_items" (
        "id" SERIAL PRIMARY KEY,
        "orderId" INTEGER NOT NULL,
        "menuId" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL,
        "price" INTEGER NOT NULL,
        CONSTRAINT "FK_order_items_order" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_order_items_menu" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "menu"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

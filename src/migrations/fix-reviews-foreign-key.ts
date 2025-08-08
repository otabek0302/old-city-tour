import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Drop the existing foreign key constraint
  await db.execute(sql`
    ALTER TABLE "reviews" 
    DROP CONSTRAINT "reviews_tour_id_tours_id_fk"
  `)

  // Recreate the foreign key constraint with CASCADE delete
  await db.execute(sql`
    ALTER TABLE "reviews" 
    ADD CONSTRAINT "reviews_tour_id_tours_id_fk" 
    FOREIGN KEY ("tour_id") 
    REFERENCES "tours"("id") 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop the CASCADE foreign key constraint
  await db.execute(sql`
    ALTER TABLE "reviews" 
    DROP CONSTRAINT "reviews_tour_id_tours_id_fk"
  `)

  // Recreate the original foreign key constraint with SET NULL
  await db.execute(sql`
    ALTER TABLE "reviews" 
    ADD CONSTRAINT "reviews_tour_id_tours_id_fk" 
    FOREIGN KEY ("tour_id") 
    REFERENCES "tours"("id") 
    ON DELETE SET NULL 
    ON UPDATE NO ACTION
  `)
} 
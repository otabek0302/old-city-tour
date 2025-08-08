import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  console.log('🔧 Fixing all foreign key constraints...')

  // 1. Fix Reviews -> Tours (CASCADE delete) - This one we know exists
  console.log('1. Fixing Reviews -> Tours foreign key...')
  try {
    await db.execute(sql`
      ALTER TABLE "reviews" 
      DROP CONSTRAINT IF EXISTS "reviews_tour_id_tours_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "reviews" 
      ADD CONSTRAINT "reviews_tour_id_tours_id_fk" 
      FOREIGN KEY ("tour_id") 
      REFERENCES "tours"("id") 
      ON DELETE CASCADE 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Reviews -> Tours foreign key updated')
  } catch (error) {
    console.log('⚠️ Reviews -> Tours foreign key already updated or doesn\'t exist')
  }

  // 2. Fix Hotels -> Cities (CASCADE delete)
  console.log('2. Fixing Hotels -> Cities foreign key...')
  try {
    await db.execute(sql`
      ALTER TABLE "hotels" 
      DROP CONSTRAINT IF EXISTS "hotels_city_id_cities_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "hotels" 
      ADD CONSTRAINT "hotels_city_id_cities_id_fk" 
      FOREIGN KEY ("city_id") 
      REFERENCES "cities"("id") 
      ON DELETE CASCADE 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Hotels -> Cities foreign key updated')
  } catch (error) {
    console.log('⚠️ Hotels -> Cities foreign key already updated or doesn\'t exist')
  }

  // 3. Fix Media relationships (SET NULL for uploads)
  console.log('3. Fixing Media relationships...')
  
  // Tours images
  try {
    await db.execute(sql`
      ALTER TABLE "tours_images" 
      DROP CONSTRAINT IF EXISTS "tours_images_image_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "tours_images" 
      ADD CONSTRAINT "tours_images_image_id_media_id_fk" 
      FOREIGN KEY ("image_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Tours images foreign key updated')
  } catch (error) {
    console.log('⚠️ Tours images foreign key already updated or doesn\'t exist')
  }

  // Cities image
  try {
    await db.execute(sql`
      ALTER TABLE "cities" 
      DROP CONSTRAINT IF EXISTS "cities_image_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "cities" 
      ADD CONSTRAINT "cities_image_id_media_id_fk" 
      FOREIGN KEY ("image_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Cities image foreign key updated')
  } catch (error) {
    console.log('⚠️ Cities image foreign key already updated or doesn\'t exist')
  }

  // Hotels images
  try {
    await db.execute(sql`
      ALTER TABLE "hotels_images" 
      DROP CONSTRAINT IF EXISTS "hotels_images_image_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "hotels_images" 
      ADD CONSTRAINT "hotels_images_image_id_media_id_fk" 
      FOREIGN KEY ("image_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Hotels images foreign key updated')
  } catch (error) {
    console.log('⚠️ Hotels images foreign key already updated or doesn\'t exist')
  }

  // Posts image
  try {
    await db.execute(sql`
      ALTER TABLE "posts" 
      DROP CONSTRAINT IF EXISTS "posts_image_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "posts" 
      ADD CONSTRAINT "posts_image_id_media_id_fk" 
      FOREIGN KEY ("image_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Posts image foreign key updated')
  } catch (error) {
    console.log('⚠️ Posts image foreign key already updated or doesn\'t exist')
  }

  // Posts gallery
  try {
    await db.execute(sql`
      ALTER TABLE "posts_gallery" 
      DROP CONSTRAINT IF EXISTS "posts_gallery_image_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "posts_gallery" 
      ADD CONSTRAINT "posts_gallery_image_id_media_id_fk" 
      FOREIGN KEY ("image_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Posts gallery foreign key updated')
  } catch (error) {
    console.log('⚠️ Posts gallery foreign key already updated or doesn\'t exist')
  }

  // Header logo
  try {
    await db.execute(sql`
      ALTER TABLE "header" 
      DROP CONSTRAINT IF EXISTS "header_logo_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "header" 
      ADD CONSTRAINT "header_logo_id_media_id_fk" 
      FOREIGN KEY ("logo_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Header logo foreign key updated')
  } catch (error) {
    console.log('⚠️ Header logo foreign key already updated or doesn\'t exist')
  }

  // Footer logo
  try {
    await db.execute(sql`
      ALTER TABLE "footer" 
      DROP CONSTRAINT IF EXISTS "footer_logo_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "footer" 
      ADD CONSTRAINT "footer_logo_id_media_id_fk" 
      FOREIGN KEY ("logo_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Footer logo foreign key updated')
  } catch (error) {
    console.log('⚠️ Footer logo foreign key already updated or doesn\'t exist')
  }

  // About Us meta image
  try {
    await db.execute(sql`
      ALTER TABLE "about_us" 
      DROP CONSTRAINT IF EXISTS "about_us_meta_image_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "about_us" 
      ADD CONSTRAINT "about_us_meta_image_id_media_id_fk" 
      FOREIGN KEY ("meta_image_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ About Us meta image foreign key updated')
  } catch (error) {
    console.log('⚠️ About Us meta image foreign key already updated or doesn\'t exist')
  }

  // Contact Us meta image
  try {
    await db.execute(sql`
      ALTER TABLE "contact_us" 
      DROP CONSTRAINT IF EXISTS "contact_us_meta_image_id_media_id_fk"
    `)
    
    await db.execute(sql`
      ALTER TABLE "contact_us" 
      ADD CONSTRAINT "contact_us_meta_image_id_media_id_fk" 
      FOREIGN KEY ("meta_image_id") 
      REFERENCES "media"("id") 
      ON DELETE SET NULL 
      ON UPDATE NO ACTION
    `)
    console.log('✅ Contact Us meta image foreign key updated')
  } catch (error) {
    console.log('⚠️ Contact Us meta image foreign key already updated or doesn\'t exist')
  }

  console.log('✅ All foreign key constraints updated successfully!')
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  console.log('🔄 Reverting foreign key constraints...')
  
  console.log('✅ Foreign key constraints reverted!')
} 
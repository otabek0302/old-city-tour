import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('uz', 'ru', 'en');
  CREATE TYPE "public"."enum_home_blocks_special_offer_section_action_type" AS ENUM('buttons', 'date');
  CREATE TYPE "public"."enum_about_us_blocks_special_offer_section_action_type" AS ENUM('buttons', 'date');
  CREATE TYPE "public"."enum_hotels_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_footer_social_links_icon" AS ENUM('facebook', 'instagram', 'telegram', 'whatsapp', 'twitter', 'youtube', 'linkedin', 'email', 'phone', 'website');
  CREATE TYPE "public"."enum_footer_contact_links_type" AS ENUM('phone', 'email', 'address');
  CREATE TYPE "public"."enum_footer_contact_links_icon" AS ENUM('phone', 'email', 'address');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "tours_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from_id" integer NOT NULL,
  	"to_id" integer NOT NULL,
  	"transport" varchar,
  	"date" timestamp(3) with time zone,
  	"from_time" varchar,
  	"to_time" varchar,
  	"duration" varchar
  );
  
  CREATE TABLE "tours_accommodation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city_id" integer NOT NULL,
  	"nights" numeric NOT NULL
  );
  
  CREATE TABLE "tours_services_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "tours_services_not_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "tours_itinerary_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"activity" varchar
  );
  
  CREATE TABLE "tours_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" varchar NOT NULL
  );
  
  CREATE TABLE "tours_booking_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date_start" timestamp(3) with time zone,
  	"date_end" timestamp(3) with time zone,
  	"price_per_adult" numeric,
  	"price_per_child" numeric
  );
  
  CREATE TABLE "tours_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "tours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tours_locales" (
  	"title" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"description" varchar NOT NULL,
  	"type_id" integer NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tours_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"cities_id" integer,
  	"hotels_id" integer
  );
  
  CREATE TABLE "contact_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_us_locales" (
  	"title" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar NOT NULL,
  	"form_info_heading" varchar NOT NULL,
  	"form_info_subheading" varchar NOT NULL,
  	"contact_info_heading" varchar NOT NULL,
  	"contact_info_subheading" varchar NOT NULL,
  	"contact_info_phone" varchar NOT NULL,
  	"contact_info_email" varchar NOT NULL,
  	"contact_info_address" varchar NOT NULL,
  	"contact_info_opening_hours" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_blocks_hero_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "home_blocks_hero_static_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "home_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_hero_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_special_offer_section_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "home_blocks_special_offer_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"action_type" "enum_home_blocks_special_offer_section_action_type" NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_special_offer_section_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"date" timestamp(3) with time zone,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_cities_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "home_blocks_cities_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city_id" integer NOT NULL
  );
  
  CREATE TABLE "home_blocks_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_cities_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_tours_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "home_blocks_tours_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_blocks_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_tours_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_blocks_faq_faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_faq_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"contacts_phone" varchar NOT NULL,
  	"contacts_email" varchar NOT NULL,
  	"contacts_address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_testimonials_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_recommended_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_recommended_tours_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"button_label" varchar,
  	"button_link" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_recommended_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_recommended_cities_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"button_label" varchar,
  	"button_link" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tours_id" integer,
  	"cities_id" integer
  );
  
  CREATE TABLE "about_us_blocks_about_us_hero_image_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "about_us_blocks_about_us_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "about_us_blocks_about_us_hero_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"button_label" varchar,
  	"button_link" varchar DEFAULT '/tours',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_us_blocks_statistics_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_us_blocks_statistics_statistics_locales" (
  	"number" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_us_blocks_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "about_us_blocks_recommended_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "about_us_blocks_recommended_tours_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"button_label" varchar,
  	"button_link" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_us_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "about_us_blocks_testimonials_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_us_blocks_special_offer_section_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "about_us_blocks_special_offer_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"action_type" "enum_about_us_blocks_special_offer_section_action_type" NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "about_us_blocks_special_offer_section_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"date" timestamp(3) with time zone,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_us_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_us_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tours_id" integer
  );
  
  CREATE TABLE "privacy_policy_blocks_privacy_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_policy_blocks_privacy_policy_locales" (
  	"heading" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_policy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "privacy_policy_locales" (
  	"title" varchar NOT NULL,
  	"paragraphs_p1" varchar,
  	"paragraphs_p2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "terms_blocks_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "terms_blocks_terms_locales" (
  	"heading" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "terms_locales" (
  	"title" varchar NOT NULL,
  	"paragraphs_p1" varchar,
  	"paragraphs_p2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"rating" numeric NOT NULL,
  	"tour_id" integer NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews_locales" (
  	"name" varchar NOT NULL,
  	"comment" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cities_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"link" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar,
  	"sizes_desktop_url" varchar,
  	"sizes_desktop_width" numeric,
  	"sizes_desktop_height" numeric,
  	"sizes_desktop_mime_type" varchar,
  	"sizes_desktop_filesize" numeric,
  	"sizes_desktop_filename" varchar
  );
  
  CREATE TABLE "posts_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "types_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "hotels_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "hotels_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "hotels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"city_id" integer NOT NULL,
  	"phone" varchar,
  	"website" varchar,
  	"rating" "enum_hotels_rating",
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hotels_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"address" varchar,
  	"policies_check_in" varchar NOT NULL,
  	"policies_check_out" varchar NOT NULL,
  	"policies_cancellation" varchar,
  	"policies_pet" varchar,
  	"policies_children" varchar,
  	"policies_payment" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"tours_id" integer,
  	"contact_us_id" integer,
  	"home_id" integer,
  	"about_us_id" integer,
  	"privacy_policy_id" integer,
  	"terms_id" integer,
  	"reviews_id" integer,
  	"cities_id" integer,
  	"media_id" integer,
  	"posts_id" integer,
  	"types_id" integer,
  	"hotels_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_navigations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"is_external" boolean DEFAULT false
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link" varchar,
  	"icon" "enum_footer_social_links_icon"
  );
  
  CREATE TABLE "footer_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "footer_licence_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "footer_contact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_contact_links_type",
  	"value" varchar,
  	"icon" "enum_footer_contact_links_icon" DEFAULT 'phone'
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"description" varchar,
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_locations" ADD CONSTRAINT "tours_locations_from_id_cities_id_fk" FOREIGN KEY ("from_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_locations" ADD CONSTRAINT "tours_locations_to_id_cities_id_fk" FOREIGN KEY ("to_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_locations" ADD CONSTRAINT "tours_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_accommodation" ADD CONSTRAINT "tours_accommodation_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_accommodation" ADD CONSTRAINT "tours_accommodation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_services_included" ADD CONSTRAINT "tours_services_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_services_not_included" ADD CONSTRAINT "tours_services_not_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary_activities" ADD CONSTRAINT "tours_itinerary_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary" ADD CONSTRAINT "tours_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_booking_pricing" ADD CONSTRAINT "tours_booking_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_images" ADD CONSTRAINT "tours_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_images" ADD CONSTRAINT "tours_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_locales" ADD CONSTRAINT "tours_locales_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_locales" ADD CONSTRAINT "tours_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_locales" ADD CONSTRAINT "tours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_locales" ADD CONSTRAINT "contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_button" ADD CONSTRAINT "home_blocks_hero_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_static_content" ADD CONSTRAINT "home_blocks_hero_static_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_locales" ADD CONSTRAINT "home_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_special_offer_section_button" ADD CONSTRAINT "home_blocks_special_offer_section_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_special_offer_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_special_offer_section" ADD CONSTRAINT "home_blocks_special_offer_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_special_offer_section_locales" ADD CONSTRAINT "home_blocks_special_offer_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_special_offer_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_cities_button" ADD CONSTRAINT "home_blocks_cities_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_cities_cities" ADD CONSTRAINT "home_blocks_cities_cities_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_cities_cities" ADD CONSTRAINT "home_blocks_cities_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_cities" ADD CONSTRAINT "home_blocks_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_cities_locales" ADD CONSTRAINT "home_blocks_cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_tours_button" ADD CONSTRAINT "home_blocks_tours_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_tours_tours" ADD CONSTRAINT "home_blocks_tours_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_tours" ADD CONSTRAINT "home_blocks_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_tours_locales" ADD CONSTRAINT "home_blocks_tours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_faq_faqs" ADD CONSTRAINT "home_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_faq_faqs_locales" ADD CONSTRAINT "home_blocks_faq_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_faq_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_faq" ADD CONSTRAINT "home_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_faq_locales" ADD CONSTRAINT "home_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_testimonials" ADD CONSTRAINT "home_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_testimonials_locales" ADD CONSTRAINT "home_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_recommended_tours" ADD CONSTRAINT "home_blocks_recommended_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_recommended_tours_locales" ADD CONSTRAINT "home_blocks_recommended_tours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_recommended_tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_recommended_cities" ADD CONSTRAINT "home_blocks_recommended_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_recommended_cities_locales" ADD CONSTRAINT "home_blocks_recommended_cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_recommended_cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_about_us_hero_image_group" ADD CONSTRAINT "about_us_blocks_about_us_hero_image_group_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_us_blocks_about_us_hero_image_group" ADD CONSTRAINT "about_us_blocks_about_us_hero_image_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_about_us_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_about_us_hero" ADD CONSTRAINT "about_us_blocks_about_us_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_about_us_hero_locales" ADD CONSTRAINT "about_us_blocks_about_us_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_about_us_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_statistics_statistics" ADD CONSTRAINT "about_us_blocks_statistics_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_statistics_statistics_locales" ADD CONSTRAINT "about_us_blocks_statistics_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_statistics_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_statistics" ADD CONSTRAINT "about_us_blocks_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_recommended_tours" ADD CONSTRAINT "about_us_blocks_recommended_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_recommended_tours_locales" ADD CONSTRAINT "about_us_blocks_recommended_tours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_recommended_tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_testimonials" ADD CONSTRAINT "about_us_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_testimonials_locales" ADD CONSTRAINT "about_us_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_special_offer_section_button" ADD CONSTRAINT "about_us_blocks_special_offer_section_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_special_offer_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_special_offer_section" ADD CONSTRAINT "about_us_blocks_special_offer_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_blocks_special_offer_section_locales" ADD CONSTRAINT "about_us_blocks_special_offer_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_blocks_special_offer_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_locales" ADD CONSTRAINT "about_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_rels" ADD CONSTRAINT "about_us_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_rels" ADD CONSTRAINT "about_us_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_blocks_privacy_policy" ADD CONSTRAINT "privacy_policy_blocks_privacy_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_blocks_privacy_policy_locales" ADD CONSTRAINT "privacy_policy_blocks_privacy_policy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy_blocks_privacy_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_locales" ADD CONSTRAINT "privacy_policy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_blocks_terms" ADD CONSTRAINT "terms_blocks_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_blocks_terms_locales" ADD CONSTRAINT "terms_blocks_terms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_blocks_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_locales" ADD CONSTRAINT "terms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_locales" ADD CONSTRAINT "reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities" ADD CONSTRAINT "cities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities_locales" ADD CONSTRAINT "cities_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities_locales" ADD CONSTRAINT "cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_gallery" ADD CONSTRAINT "posts_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_gallery" ADD CONSTRAINT "posts_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "types_locales" ADD CONSTRAINT "types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_images" ADD CONSTRAINT "hotels_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_images" ADD CONSTRAINT "hotels_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_features" ADD CONSTRAINT "hotels_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels" ADD CONSTRAINT "hotels_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_locales" ADD CONSTRAINT "hotels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_us_fk" FOREIGN KEY ("contact_us_id") REFERENCES "public"."contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_home_fk" FOREIGN KEY ("home_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_us_fk" FOREIGN KEY ("about_us_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_privacy_policy_fk" FOREIGN KEY ("privacy_policy_id") REFERENCES "public"."privacy_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_terms_fk" FOREIGN KEY ("terms_id") REFERENCES "public"."terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_types_fk" FOREIGN KEY ("types_id") REFERENCES "public"."types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigations" ADD CONSTRAINT "header_navigations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_navigation_links" ADD CONSTRAINT "footer_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_licence_links" ADD CONSTRAINT "footer_licence_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_contact_links" ADD CONSTRAINT "footer_contact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "tours_locations_order_idx" ON "tours_locations" USING btree ("_order");
  CREATE INDEX "tours_locations_parent_id_idx" ON "tours_locations" USING btree ("_parent_id");
  CREATE INDEX "tours_locations_locale_idx" ON "tours_locations" USING btree ("_locale");
  CREATE INDEX "tours_locations_from_idx" ON "tours_locations" USING btree ("from_id");
  CREATE INDEX "tours_locations_to_idx" ON "tours_locations" USING btree ("to_id");
  CREATE INDEX "tours_accommodation_order_idx" ON "tours_accommodation" USING btree ("_order");
  CREATE INDEX "tours_accommodation_parent_id_idx" ON "tours_accommodation" USING btree ("_parent_id");
  CREATE INDEX "tours_accommodation_locale_idx" ON "tours_accommodation" USING btree ("_locale");
  CREATE INDEX "tours_accommodation_city_idx" ON "tours_accommodation" USING btree ("city_id");
  CREATE INDEX "tours_services_included_order_idx" ON "tours_services_included" USING btree ("_order");
  CREATE INDEX "tours_services_included_parent_id_idx" ON "tours_services_included" USING btree ("_parent_id");
  CREATE INDEX "tours_services_included_locale_idx" ON "tours_services_included" USING btree ("_locale");
  CREATE INDEX "tours_services_not_included_order_idx" ON "tours_services_not_included" USING btree ("_order");
  CREATE INDEX "tours_services_not_included_parent_id_idx" ON "tours_services_not_included" USING btree ("_parent_id");
  CREATE INDEX "tours_services_not_included_locale_idx" ON "tours_services_not_included" USING btree ("_locale");
  CREATE INDEX "tours_itinerary_activities_order_idx" ON "tours_itinerary_activities" USING btree ("_order");
  CREATE INDEX "tours_itinerary_activities_parent_id_idx" ON "tours_itinerary_activities" USING btree ("_parent_id");
  CREATE INDEX "tours_itinerary_activities_locale_idx" ON "tours_itinerary_activities" USING btree ("_locale");
  CREATE INDEX "tours_itinerary_order_idx" ON "tours_itinerary" USING btree ("_order");
  CREATE INDEX "tours_itinerary_parent_id_idx" ON "tours_itinerary" USING btree ("_parent_id");
  CREATE INDEX "tours_itinerary_locale_idx" ON "tours_itinerary" USING btree ("_locale");
  CREATE INDEX "tours_booking_pricing_order_idx" ON "tours_booking_pricing" USING btree ("_order");
  CREATE INDEX "tours_booking_pricing_parent_id_idx" ON "tours_booking_pricing" USING btree ("_parent_id");
  CREATE INDEX "tours_booking_pricing_locale_idx" ON "tours_booking_pricing" USING btree ("_locale");
  CREATE INDEX "tours_images_order_idx" ON "tours_images" USING btree ("_order");
  CREATE INDEX "tours_images_parent_id_idx" ON "tours_images" USING btree ("_parent_id");
  CREATE INDEX "tours_images_image_idx" ON "tours_images" USING btree ("image_id");
  CREATE INDEX "tours_slug_idx" ON "tours" USING btree ("slug");
  CREATE INDEX "tours_updated_at_idx" ON "tours" USING btree ("updated_at");
  CREATE INDEX "tours_created_at_idx" ON "tours" USING btree ("created_at");
  CREATE INDEX "tours_type_idx" ON "tours_locales" USING btree ("type_id","_locale");
  CREATE INDEX "tours_meta_meta_image_idx" ON "tours_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "tours_locales_locale_parent_id_unique" ON "tours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_rels_order_idx" ON "tours_rels" USING btree ("order");
  CREATE INDEX "tours_rels_parent_idx" ON "tours_rels" USING btree ("parent_id");
  CREATE INDEX "tours_rels_path_idx" ON "tours_rels" USING btree ("path");
  CREATE INDEX "tours_rels_locale_idx" ON "tours_rels" USING btree ("locale");
  CREATE INDEX "tours_rels_cities_id_idx" ON "tours_rels" USING btree ("cities_id","locale");
  CREATE INDEX "tours_rels_hotels_id_idx" ON "tours_rels" USING btree ("hotels_id","locale");
  CREATE INDEX "contact_us_updated_at_idx" ON "contact_us" USING btree ("updated_at");
  CREATE INDEX "contact_us_created_at_idx" ON "contact_us" USING btree ("created_at");
  CREATE UNIQUE INDEX "contact_us_title_idx" ON "contact_us_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "contact_us_heading_idx" ON "contact_us_locales" USING btree ("heading","_locale");
  CREATE UNIQUE INDEX "contact_us_subheading_idx" ON "contact_us_locales" USING btree ("subheading","_locale");
  CREATE UNIQUE INDEX "contact_us_locales_locale_parent_id_unique" ON "contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_hero_button_order_idx" ON "home_blocks_hero_button" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_button_parent_id_idx" ON "home_blocks_hero_button" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_button_locale_idx" ON "home_blocks_hero_button" USING btree ("_locale");
  CREATE INDEX "home_blocks_hero_static_content_order_idx" ON "home_blocks_hero_static_content" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_static_content_parent_id_idx" ON "home_blocks_hero_static_content" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_static_content_locale_idx" ON "home_blocks_hero_static_content" USING btree ("_locale");
  CREATE INDEX "home_blocks_hero_order_idx" ON "home_blocks_hero" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_parent_id_idx" ON "home_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_path_idx" ON "home_blocks_hero" USING btree ("_path");
  CREATE INDEX "home_blocks_hero_image_idx" ON "home_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_blocks_hero_locales_locale_parent_id_unique" ON "home_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_special_offer_section_button_order_idx" ON "home_blocks_special_offer_section_button" USING btree ("_order");
  CREATE INDEX "home_blocks_special_offer_section_button_parent_id_idx" ON "home_blocks_special_offer_section_button" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_special_offer_section_button_locale_idx" ON "home_blocks_special_offer_section_button" USING btree ("_locale");
  CREATE INDEX "home_blocks_special_offer_section_order_idx" ON "home_blocks_special_offer_section" USING btree ("_order");
  CREATE INDEX "home_blocks_special_offer_section_parent_id_idx" ON "home_blocks_special_offer_section" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_special_offer_section_path_idx" ON "home_blocks_special_offer_section" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_special_offer_section_locales_locale_parent_id_unique" ON "home_blocks_special_offer_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_cities_button_order_idx" ON "home_blocks_cities_button" USING btree ("_order");
  CREATE INDEX "home_blocks_cities_button_parent_id_idx" ON "home_blocks_cities_button" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_cities_button_locale_idx" ON "home_blocks_cities_button" USING btree ("_locale");
  CREATE INDEX "home_blocks_cities_cities_order_idx" ON "home_blocks_cities_cities" USING btree ("_order");
  CREATE INDEX "home_blocks_cities_cities_parent_id_idx" ON "home_blocks_cities_cities" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_cities_cities_city_idx" ON "home_blocks_cities_cities" USING btree ("city_id");
  CREATE INDEX "home_blocks_cities_order_idx" ON "home_blocks_cities" USING btree ("_order");
  CREATE INDEX "home_blocks_cities_parent_id_idx" ON "home_blocks_cities" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_cities_path_idx" ON "home_blocks_cities" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_cities_locales_locale_parent_id_unique" ON "home_blocks_cities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_tours_button_order_idx" ON "home_blocks_tours_button" USING btree ("_order");
  CREATE INDEX "home_blocks_tours_button_parent_id_idx" ON "home_blocks_tours_button" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_tours_button_locale_idx" ON "home_blocks_tours_button" USING btree ("_locale");
  CREATE INDEX "home_blocks_tours_tours_order_idx" ON "home_blocks_tours_tours" USING btree ("_order");
  CREATE INDEX "home_blocks_tours_tours_parent_id_idx" ON "home_blocks_tours_tours" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_tours_order_idx" ON "home_blocks_tours" USING btree ("_order");
  CREATE INDEX "home_blocks_tours_parent_id_idx" ON "home_blocks_tours" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_tours_path_idx" ON "home_blocks_tours" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_tours_locales_locale_parent_id_unique" ON "home_blocks_tours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_faq_faqs_order_idx" ON "home_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "home_blocks_faq_faqs_parent_id_idx" ON "home_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_blocks_faq_faqs_locales_locale_parent_id_unique" ON "home_blocks_faq_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_faq_order_idx" ON "home_blocks_faq" USING btree ("_order");
  CREATE INDEX "home_blocks_faq_parent_id_idx" ON "home_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_faq_path_idx" ON "home_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_faq_locales_locale_parent_id_unique" ON "home_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_testimonials_order_idx" ON "home_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "home_blocks_testimonials_parent_id_idx" ON "home_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_testimonials_path_idx" ON "home_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_testimonials_locales_locale_parent_id_unique" ON "home_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_recommended_tours_order_idx" ON "home_blocks_recommended_tours" USING btree ("_order");
  CREATE INDEX "home_blocks_recommended_tours_parent_id_idx" ON "home_blocks_recommended_tours" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_recommended_tours_path_idx" ON "home_blocks_recommended_tours" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_recommended_tours_locales_locale_parent_id_unique" ON "home_blocks_recommended_tours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_recommended_cities_order_idx" ON "home_blocks_recommended_cities" USING btree ("_order");
  CREATE INDEX "home_blocks_recommended_cities_parent_id_idx" ON "home_blocks_recommended_cities" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_recommended_cities_path_idx" ON "home_blocks_recommended_cities" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_recommended_cities_locales_locale_parent_id_unique" ON "home_blocks_recommended_cities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_updated_at_idx" ON "home" USING btree ("updated_at");
  CREATE INDEX "home_created_at_idx" ON "home" USING btree ("created_at");
  CREATE UNIQUE INDEX "home_title_idx" ON "home_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_tours_id_idx" ON "home_rels" USING btree ("tours_id");
  CREATE INDEX "home_rels_cities_id_idx" ON "home_rels" USING btree ("cities_id");
  CREATE INDEX "about_us_blocks_about_us_hero_image_group_order_idx" ON "about_us_blocks_about_us_hero_image_group" USING btree ("_order");
  CREATE INDEX "about_us_blocks_about_us_hero_image_group_parent_id_idx" ON "about_us_blocks_about_us_hero_image_group" USING btree ("_parent_id");
  CREATE INDEX "about_us_blocks_about_us_hero_image_group_image_idx" ON "about_us_blocks_about_us_hero_image_group" USING btree ("image_id");
  CREATE INDEX "about_us_blocks_about_us_hero_order_idx" ON "about_us_blocks_about_us_hero" USING btree ("_order");
  CREATE INDEX "about_us_blocks_about_us_hero_parent_id_idx" ON "about_us_blocks_about_us_hero" USING btree ("_parent_id");
  CREATE INDEX "about_us_blocks_about_us_hero_path_idx" ON "about_us_blocks_about_us_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "about_us_blocks_about_us_hero_locales_locale_parent_id_unique" ON "about_us_blocks_about_us_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_us_blocks_statistics_statistics_order_idx" ON "about_us_blocks_statistics_statistics" USING btree ("_order");
  CREATE INDEX "about_us_blocks_statistics_statistics_parent_id_idx" ON "about_us_blocks_statistics_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_us_blocks_statistics_statistics_locales_locale_parent_id_unique" ON "about_us_blocks_statistics_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_us_blocks_statistics_order_idx" ON "about_us_blocks_statistics" USING btree ("_order");
  CREATE INDEX "about_us_blocks_statistics_parent_id_idx" ON "about_us_blocks_statistics" USING btree ("_parent_id");
  CREATE INDEX "about_us_blocks_statistics_path_idx" ON "about_us_blocks_statistics" USING btree ("_path");
  CREATE INDEX "about_us_blocks_recommended_tours_order_idx" ON "about_us_blocks_recommended_tours" USING btree ("_order");
  CREATE INDEX "about_us_blocks_recommended_tours_parent_id_idx" ON "about_us_blocks_recommended_tours" USING btree ("_parent_id");
  CREATE INDEX "about_us_blocks_recommended_tours_path_idx" ON "about_us_blocks_recommended_tours" USING btree ("_path");
  CREATE UNIQUE INDEX "about_us_blocks_recommended_tours_locales_locale_parent_id_unique" ON "about_us_blocks_recommended_tours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_us_blocks_testimonials_order_idx" ON "about_us_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "about_us_blocks_testimonials_parent_id_idx" ON "about_us_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "about_us_blocks_testimonials_path_idx" ON "about_us_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "about_us_blocks_testimonials_locales_locale_parent_id_unique" ON "about_us_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_us_blocks_special_offer_section_button_order_idx" ON "about_us_blocks_special_offer_section_button" USING btree ("_order");
  CREATE INDEX "about_us_blocks_special_offer_section_button_parent_id_idx" ON "about_us_blocks_special_offer_section_button" USING btree ("_parent_id");
  CREATE INDEX "about_us_blocks_special_offer_section_button_locale_idx" ON "about_us_blocks_special_offer_section_button" USING btree ("_locale");
  CREATE INDEX "about_us_blocks_special_offer_section_order_idx" ON "about_us_blocks_special_offer_section" USING btree ("_order");
  CREATE INDEX "about_us_blocks_special_offer_section_parent_id_idx" ON "about_us_blocks_special_offer_section" USING btree ("_parent_id");
  CREATE INDEX "about_us_blocks_special_offer_section_path_idx" ON "about_us_blocks_special_offer_section" USING btree ("_path");
  CREATE UNIQUE INDEX "about_us_blocks_special_offer_section_locales_locale_parent_id_unique" ON "about_us_blocks_special_offer_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_us_updated_at_idx" ON "about_us" USING btree ("updated_at");
  CREATE INDEX "about_us_created_at_idx" ON "about_us" USING btree ("created_at");
  CREATE UNIQUE INDEX "about_us_title_idx" ON "about_us_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "about_us_locales_locale_parent_id_unique" ON "about_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_us_rels_order_idx" ON "about_us_rels" USING btree ("order");
  CREATE INDEX "about_us_rels_parent_idx" ON "about_us_rels" USING btree ("parent_id");
  CREATE INDEX "about_us_rels_path_idx" ON "about_us_rels" USING btree ("path");
  CREATE INDEX "about_us_rels_tours_id_idx" ON "about_us_rels" USING btree ("tours_id");
  CREATE INDEX "privacy_policy_blocks_privacy_policy_order_idx" ON "privacy_policy_blocks_privacy_policy" USING btree ("_order");
  CREATE INDEX "privacy_policy_blocks_privacy_policy_parent_id_idx" ON "privacy_policy_blocks_privacy_policy" USING btree ("_parent_id");
  CREATE INDEX "privacy_policy_blocks_privacy_policy_path_idx" ON "privacy_policy_blocks_privacy_policy" USING btree ("_path");
  CREATE UNIQUE INDEX "privacy_policy_blocks_privacy_policy_locales_locale_parent_id_unique" ON "privacy_policy_blocks_privacy_policy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_policy_slug_idx" ON "privacy_policy" USING btree ("slug");
  CREATE INDEX "privacy_policy_updated_at_idx" ON "privacy_policy" USING btree ("updated_at");
  CREATE INDEX "privacy_policy_created_at_idx" ON "privacy_policy" USING btree ("created_at");
  CREATE UNIQUE INDEX "privacy_policy_title_idx" ON "privacy_policy_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "privacy_policy_locales_locale_parent_id_unique" ON "privacy_policy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terms_blocks_terms_order_idx" ON "terms_blocks_terms" USING btree ("_order");
  CREATE INDEX "terms_blocks_terms_parent_id_idx" ON "terms_blocks_terms" USING btree ("_parent_id");
  CREATE INDEX "terms_blocks_terms_path_idx" ON "terms_blocks_terms" USING btree ("_path");
  CREATE UNIQUE INDEX "terms_blocks_terms_locales_locale_parent_id_unique" ON "terms_blocks_terms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terms_slug_idx" ON "terms" USING btree ("slug");
  CREATE INDEX "terms_updated_at_idx" ON "terms" USING btree ("updated_at");
  CREATE INDEX "terms_created_at_idx" ON "terms" USING btree ("created_at");
  CREATE UNIQUE INDEX "terms_title_idx" ON "terms_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "terms_locales_locale_parent_id_unique" ON "terms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reviews_tour_idx" ON "reviews" USING btree ("tour_id");
  CREATE INDEX "reviews_slug_idx" ON "reviews" USING btree ("slug");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE UNIQUE INDEX "reviews_locales_locale_parent_id_unique" ON "reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cities_image_idx" ON "cities" USING btree ("image_id");
  CREATE INDEX "cities_slug_idx" ON "cities" USING btree ("slug");
  CREATE INDEX "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE INDEX "cities_name_idx" ON "cities_locales" USING btree ("name","_locale");
  CREATE INDEX "cities_meta_meta_image_idx" ON "cities_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "cities_locales_locale_parent_id_unique" ON "cities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE INDEX "media_sizes_desktop_sizes_desktop_filename_idx" ON "media" USING btree ("sizes_desktop_filename");
  CREATE INDEX "posts_content_order_idx" ON "posts_content" USING btree ("_order");
  CREATE INDEX "posts_content_parent_id_idx" ON "posts_content" USING btree ("_parent_id");
  CREATE INDEX "posts_content_locale_idx" ON "posts_content" USING btree ("_locale");
  CREATE INDEX "posts_gallery_order_idx" ON "posts_gallery" USING btree ("_order");
  CREATE INDEX "posts_gallery_parent_id_idx" ON "posts_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_gallery_image_idx" ON "posts_gallery" USING btree ("image_id");
  CREATE INDEX "posts_image_idx" ON "posts" USING btree ("image_id");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "types_slug_idx" ON "types" USING btree ("slug");
  CREATE INDEX "types_updated_at_idx" ON "types" USING btree ("updated_at");
  CREATE INDEX "types_created_at_idx" ON "types" USING btree ("created_at");
  CREATE UNIQUE INDEX "types_title_idx" ON "types_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "types_locales_locale_parent_id_unique" ON "types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hotels_images_order_idx" ON "hotels_images" USING btree ("_order");
  CREATE INDEX "hotels_images_parent_id_idx" ON "hotels_images" USING btree ("_parent_id");
  CREATE INDEX "hotels_images_image_idx" ON "hotels_images" USING btree ("image_id");
  CREATE INDEX "hotels_features_order_idx" ON "hotels_features" USING btree ("_order");
  CREATE INDEX "hotels_features_parent_id_idx" ON "hotels_features" USING btree ("_parent_id");
  CREATE INDEX "hotels_features_locale_idx" ON "hotels_features" USING btree ("_locale");
  CREATE INDEX "hotels_city_idx" ON "hotels" USING btree ("city_id");
  CREATE INDEX "hotels_slug_idx" ON "hotels" USING btree ("slug");
  CREATE INDEX "hotels_updated_at_idx" ON "hotels" USING btree ("updated_at");
  CREATE INDEX "hotels_created_at_idx" ON "hotels" USING btree ("created_at");
  CREATE UNIQUE INDEX "hotels_locales_locale_parent_id_unique" ON "hotels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_tours_id_idx" ON "payload_locked_documents_rels" USING btree ("tours_id");
  CREATE INDEX "payload_locked_documents_rels_contact_us_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_us_id");
  CREATE INDEX "payload_locked_documents_rels_home_id_idx" ON "payload_locked_documents_rels" USING btree ("home_id");
  CREATE INDEX "payload_locked_documents_rels_about_us_id_idx" ON "payload_locked_documents_rels" USING btree ("about_us_id");
  CREATE INDEX "payload_locked_documents_rels_privacy_policy_id_idx" ON "payload_locked_documents_rels" USING btree ("privacy_policy_id");
  CREATE INDEX "payload_locked_documents_rels_terms_id_idx" ON "payload_locked_documents_rels" USING btree ("terms_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_types_id_idx" ON "payload_locked_documents_rels" USING btree ("types_id");
  CREATE INDEX "payload_locked_documents_rels_hotels_id_idx" ON "payload_locked_documents_rels" USING btree ("hotels_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_navigations_order_idx" ON "header_navigations" USING btree ("_order");
  CREATE INDEX "header_navigations_parent_id_idx" ON "header_navigations" USING btree ("_parent_id");
  CREATE INDEX "header_navigations_locale_idx" ON "header_navigations" USING btree ("_locale");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_locale_idx" ON "footer_social_links" USING btree ("_locale");
  CREATE INDEX "footer_navigation_links_order_idx" ON "footer_navigation_links" USING btree ("_order");
  CREATE INDEX "footer_navigation_links_parent_id_idx" ON "footer_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "footer_navigation_links_locale_idx" ON "footer_navigation_links" USING btree ("_locale");
  CREATE INDEX "footer_licence_links_order_idx" ON "footer_licence_links" USING btree ("_order");
  CREATE INDEX "footer_licence_links_parent_id_idx" ON "footer_licence_links" USING btree ("_parent_id");
  CREATE INDEX "footer_licence_links_locale_idx" ON "footer_licence_links" USING btree ("_locale");
  CREATE INDEX "footer_contact_links_order_idx" ON "footer_contact_links" USING btree ("_order");
  CREATE INDEX "footer_contact_links_parent_id_idx" ON "footer_contact_links" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_links_locale_idx" ON "footer_contact_links" USING btree ("_locale");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "tours_locations" CASCADE;
  DROP TABLE "tours_accommodation" CASCADE;
  DROP TABLE "tours_services_included" CASCADE;
  DROP TABLE "tours_services_not_included" CASCADE;
  DROP TABLE "tours_itinerary_activities" CASCADE;
  DROP TABLE "tours_itinerary" CASCADE;
  DROP TABLE "tours_booking_pricing" CASCADE;
  DROP TABLE "tours_images" CASCADE;
  DROP TABLE "tours" CASCADE;
  DROP TABLE "tours_locales" CASCADE;
  DROP TABLE "tours_rels" CASCADE;
  DROP TABLE "contact_us" CASCADE;
  DROP TABLE "contact_us_locales" CASCADE;
  DROP TABLE "home_blocks_hero_button" CASCADE;
  DROP TABLE "home_blocks_hero_static_content" CASCADE;
  DROP TABLE "home_blocks_hero" CASCADE;
  DROP TABLE "home_blocks_hero_locales" CASCADE;
  DROP TABLE "home_blocks_special_offer_section_button" CASCADE;
  DROP TABLE "home_blocks_special_offer_section" CASCADE;
  DROP TABLE "home_blocks_special_offer_section_locales" CASCADE;
  DROP TABLE "home_blocks_cities_button" CASCADE;
  DROP TABLE "home_blocks_cities_cities" CASCADE;
  DROP TABLE "home_blocks_cities" CASCADE;
  DROP TABLE "home_blocks_cities_locales" CASCADE;
  DROP TABLE "home_blocks_tours_button" CASCADE;
  DROP TABLE "home_blocks_tours_tours" CASCADE;
  DROP TABLE "home_blocks_tours" CASCADE;
  DROP TABLE "home_blocks_tours_locales" CASCADE;
  DROP TABLE "home_blocks_faq_faqs" CASCADE;
  DROP TABLE "home_blocks_faq_faqs_locales" CASCADE;
  DROP TABLE "home_blocks_faq" CASCADE;
  DROP TABLE "home_blocks_faq_locales" CASCADE;
  DROP TABLE "home_blocks_testimonials" CASCADE;
  DROP TABLE "home_blocks_testimonials_locales" CASCADE;
  DROP TABLE "home_blocks_recommended_tours" CASCADE;
  DROP TABLE "home_blocks_recommended_tours_locales" CASCADE;
  DROP TABLE "home_blocks_recommended_cities" CASCADE;
  DROP TABLE "home_blocks_recommended_cities_locales" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "about_us_blocks_about_us_hero_image_group" CASCADE;
  DROP TABLE "about_us_blocks_about_us_hero" CASCADE;
  DROP TABLE "about_us_blocks_about_us_hero_locales" CASCADE;
  DROP TABLE "about_us_blocks_statistics_statistics" CASCADE;
  DROP TABLE "about_us_blocks_statistics_statistics_locales" CASCADE;
  DROP TABLE "about_us_blocks_statistics" CASCADE;
  DROP TABLE "about_us_blocks_recommended_tours" CASCADE;
  DROP TABLE "about_us_blocks_recommended_tours_locales" CASCADE;
  DROP TABLE "about_us_blocks_testimonials" CASCADE;
  DROP TABLE "about_us_blocks_testimonials_locales" CASCADE;
  DROP TABLE "about_us_blocks_special_offer_section_button" CASCADE;
  DROP TABLE "about_us_blocks_special_offer_section" CASCADE;
  DROP TABLE "about_us_blocks_special_offer_section_locales" CASCADE;
  DROP TABLE "about_us" CASCADE;
  DROP TABLE "about_us_locales" CASCADE;
  DROP TABLE "about_us_rels" CASCADE;
  DROP TABLE "privacy_policy_blocks_privacy_policy" CASCADE;
  DROP TABLE "privacy_policy_blocks_privacy_policy_locales" CASCADE;
  DROP TABLE "privacy_policy" CASCADE;
  DROP TABLE "privacy_policy_locales" CASCADE;
  DROP TABLE "terms_blocks_terms" CASCADE;
  DROP TABLE "terms_blocks_terms_locales" CASCADE;
  DROP TABLE "terms" CASCADE;
  DROP TABLE "terms_locales" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_locales" CASCADE;
  DROP TABLE "cities" CASCADE;
  DROP TABLE "cities_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "posts_content" CASCADE;
  DROP TABLE "posts_gallery" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "types" CASCADE;
  DROP TABLE "types_locales" CASCADE;
  DROP TABLE "hotels_images" CASCADE;
  DROP TABLE "hotels_features" CASCADE;
  DROP TABLE "hotels" CASCADE;
  DROP TABLE "hotels_locales" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_navigations" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_navigation_links" CASCADE;
  DROP TABLE "footer_licence_links" CASCADE;
  DROP TABLE "footer_contact_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_home_blocks_special_offer_section_action_type";
  DROP TYPE "public"."enum_about_us_blocks_special_offer_section_action_type";
  DROP TYPE "public"."enum_hotels_rating";
  DROP TYPE "public"."enum_footer_social_links_icon";
  DROP TYPE "public"."enum_footer_contact_links_type";
  DROP TYPE "public"."enum_footer_contact_links_icon";`)
}

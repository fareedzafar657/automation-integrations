CREATE TABLE "participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"username" varchar(256) NOT NULL,
	"phone" varchar(256),
	"applied_date" timestamp DEFAULT now()
);

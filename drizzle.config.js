/** @type {import("drizzle-kit").} */
export default{
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials:{
        url: "postgresql://ai-prepmate-db_owner:2oWVCNGuycI0@ep-holy-paper-a5t5nal0.us-east-2.aws.neon.tech/ai-prepmate-db?sslmode=require"
    }
}
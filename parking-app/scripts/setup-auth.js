#!/usr/bin/env node

/**
 * This script helps execute the auth-setup.sql file to create a demo user
 * in the Supabase auth tables.
 *
 * Usage:
 * 1. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables
 * 2. Run this script with: node scripts/setup-auth.js
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
require("dotenv").config({ path: ".env.local" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function setupAuth() {
  console.log("🔐 Setting up authentication for your parking app...");

  // Check for Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Supabase credentials not found in .env.local");
    console.log(
      "Please make sure you have the following in your .env.local file:"
    );
    console.log("NEXT_PUBLIC_SUPABASE_URL=your-supabase-url");
    console.log("SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
    process.exit(1);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Read the SQL file
    const sqlPath = path.join(__dirname, "../src/db/auth-setup.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Get Supabase instance ID for the demo user
    // We use chatgpt here to help get the instance id
    console.log("Getting your Supabase instance ID...");
    const { data: settings, error: settingsError } = await supabase
      .from("_metadata")
      .select("instance_id")
      .single();

    if (settingsError) {
      console.error("❌ Error fetching instance ID:", settingsError.message);
      const instanceId = await promptForInstanceId();

      // Replace placeholder in SQL with the real instance ID
      const modifiedSql = sqlContent.replace("your-instance-id", instanceId);

      // Execute SQL commands
      console.log("Executing SQL setup commands...");
      const { error } = await supabase.rpc("exec_sql", {
        sql_query: modifiedSql,
      });

      if (error) {
        console.error("❌ Error executing SQL:", error.message);
        process.exit(1);
      }
    } else {
      const instanceId = settings.instance_id;

      // Replace placeholder in SQL with the real instance ID
      const modifiedSql = sqlContent.replace("your-instance-id", instanceId);

      // Execute SQL commands
      console.log("Executing SQL setup commands...");
      const { error } = await supabase.rpc("exec_sql", {
        sql_query: modifiedSql,
      });

      if (error) {
        console.error("❌ Error executing SQL:", error.message);
        process.exit(1);
      }
    }

    console.log("✅ Authentication setup complete!");
    console.log("");
    console.log("You can now use the demo account:");
    console.log("Email: demo@example.com");
    console.log("Password: demo123456");
  } catch (error) {
    console.error("❌ Error setting up authentication:", error.message);
    process.exit(1);
  }

  rl.close();
}

function promptForInstanceId() {
  return new Promise((resolve) => {
    rl.question("Please enter your Supabase instance ID: ", (answer) => {
      resolve(answer);
    });
  });
}

setupAuth();

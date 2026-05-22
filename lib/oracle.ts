"use server"

import oracledb from "oracledb"

// Oracle connection configuration using Thin mode (serverless compatible)
const dbConfig = {
  user: process.env.ORACLE_USER || "",
  password: process.env.ORACLE_PASSWORD || "",
  connectString: process.env.ORACLE_CONNECT_STRING || "",
}

// Validate connection string before creating pool
function validateOracleConfig(): { valid: boolean; error?: string } {
  if (!dbConfig.user) {
    return { valid: false, error: "ORACLE_USER environment variable is not set" }
  }
  if (!dbConfig.password) {
    return { valid: false, error: "ORACLE_PASSWORD environment variable is not set" }
  }
  if (!dbConfig.connectString) {
    return { valid: false, error: "ORACLE_CONNECT_STRING environment variable is not set" }
  }
  return { valid: true }
}

let pool: oracledb.Pool | null = null
let connectionError: string | null = null

export async function getConnection(): Promise<oracledb.Connection> {
  // Check configuration validity
  const validation = validateOracleConfig()
  if (!validation.valid) {
    connectionError = validation.error || "Invalid Oracle configuration"
    console.error(`[v0] Oracle configuration error: ${connectionError}`)
    throw new Error(connectionError)
  }

  if (!pool) {
    try {
      pool = await oracledb.createPool({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString,
        poolMin: 1,
        poolMax: 10,
        poolIncrement: 1,
      })
      console.log("[v0] Oracle connection pool created successfully")
    } catch (error) {
      connectionError = error instanceof Error ? error.message : "Unknown error"
      console.error(`[v0] Failed to create Oracle pool: ${connectionError}`)
      throw error
    }
  }
  return pool.getConnection()
}

export async function executeQuery<T>(
  sql: string,
  params: oracledb.BindParameters = {},
  options: oracledb.ExecuteOptions = {}
): Promise<T[]> {
  const connection = await getConnection()
  try {
    const result = await connection.execute(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      ...options,
    })
    return (result.rows as T[]) || []
  } finally {
    await connection.close()
  }
}

export async function executeInsert(
  sql: string,
  params: oracledb.BindParameters = {}
): Promise<{ rowsAffected: number; lastRowid?: string }> {
  const connection = await getConnection()
  try {
    const result = await connection.execute(sql, params, {
      autoCommit: true,
    })
    return {
      rowsAffected: result.rowsAffected || 0,
      lastRowid: result.lastRowid,
    }
  } finally {
    await connection.close()
  }
}

// Initialize database tables
export async function initializeDatabase(): Promise<void> {
  const connection = await getConnection()
  try {
    // Create bookings table
    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE bookings (
            id VARCHAR2(36) PRIMARY KEY,
            name VARCHAR2(255) NOT NULL,
            email VARCHAR2(255) NOT NULL,
            phone VARCHAR2(20) NOT NULL,
            case_type VARCHAR2(100) NOT NULL,
            message CLOB,
            status VARCHAR2(50) DEFAULT ''pending'',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        ';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN
            RAISE;
          END IF;
      END;
    `)

    // Create contact_submissions table
    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE contact_submissions (
            id VARCHAR2(36) PRIMARY KEY,
            name VARCHAR2(255) NOT NULL,
            email VARCHAR2(255) NOT NULL,
            phone VARCHAR2(20),
            subject VARCHAR2(255),
            message CLOB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        ';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN
            RAISE;
          END IF;
      END;
    `)

    // Create newsletter_subscribers table
    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE newsletter_subscribers (
            id VARCHAR2(36) PRIMARY KEY,
            email VARCHAR2(255) UNIQUE NOT NULL,
            subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active NUMBER(1) DEFAULT 1
          )
        ';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN
            RAISE;
          END IF;
      END;
    `)

    await connection.commit()
    console.log("[v0] Database tables initialized successfully")
  } catch (error) {
    console.error("[v0] Error initializing database:", error)
    throw error
  } finally {
    await connection.close()
  }
}

const oracledb = require('oracledb');
const { getPool } = require('../config/db');

class Application {
  // Create a new application
  static async create(applicationData) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const sql = `
        INSERT INTO applications (user_id, program_id, status)
        VALUES (:user_id, :program_id, :status)
        RETURNING application_id INTO :application_id
      `;
      
      const result = await connection.execute(
        sql,
        {
          user_id: applicationData.user_id,
          program_id: applicationData.program_id,
          status: 'pending',
          application_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        },
        { autoCommit: true }
      );
      
      return result.outBinds.application_id[0];
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Get all applications for a user
  static async findByUserId(userId) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT a.application_id, a.program_id, p.name as program_name, 
                a.status, a.applied_at, a.reviewed_at, a.remarks
         FROM applications a
         JOIN programs p ON a.program_id = p.program_id
         WHERE a.user_id = :user_id
         ORDER BY a.applied_at DESC`,
        [userId]
      );
      
      const applications = result.rows.map(row => ({
        application_id: row[0],
        program_id: row[1],
        program_name: row[2],
        status: row[3],
        applied_at: row[4],
        reviewed_at: row[5],
        remarks: row[6]
      }));
      
      return applications;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Get application by ID
  static async findById(applicationId) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT a.application_id, a.user_id, a.program_id, p.name as program_name,
                a.status, a.applied_at, a.reviewed_at, a.remarks
         FROM applications a
         JOIN programs p ON a.program_id = p.program_id
         WHERE a.application_id = :application_id`,
        [applicationId]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const application = {
        application_id: result.rows[0][0],
        user_id: result.rows[0][1],
        program_id: result.rows[0][2],
        program_name: result.rows[0][3],
        status: result.rows[0][4],
        applied_at: result.rows[0][5],
        reviewed_at: result.rows[0][6],
        remarks: result.rows[0][7]
      };
      
      return application;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Get all applications (for admin)
  static async findAll() {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT a.application_id, a.user_id, u.full_name, u.email,
                a.program_id, p.name as program_name,
                a.status, a.applied_at, a.reviewed_at
         FROM applications a
         JOIN users u ON a.user_id = u.user_id
         JOIN programs p ON a.program_id = p.program_id
         ORDER BY a.applied_at DESC`
      );
      
      const applications = result.rows.map(row => ({
        application_id: row[0],
        user_id: row[1],
        full_name: row[2],
        email: row[3],
        program_id: row[4],
        program_name: row[5],
        status: row[6],
        applied_at: row[7],
        reviewed_at: row[8]
      }));
      
      return applications;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Update application status
  static async updateStatus(applicationId, status, reviewerId, remarks) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      await connection.execute(
        `UPDATE applications 
         SET status = :status, 
             reviewed_by = :reviewed_by, 
             reviewed_at = CURRENT_TIMESTAMP,
             remarks = :remarks,
             updated_at = CURRENT_TIMESTAMP
         WHERE application_id = :application_id`,
        {
          status,
          reviewed_by: reviewerId,
          remarks,
          application_id: applicationId
        },
        { autoCommit: true }
      );
      
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Get stats for admin dashboard
  static async getStats() {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT 
           COUNT(*) as total,
           SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
           SUM(CASE WHEN status = 'under_review' THEN 1 ELSE 0 END) as under_review,
           SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
           SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
         FROM applications`
      );
      
      return {
        total: result.rows[0][0] || 0,
        pending: result.rows[0][1] || 0,
        under_review: result.rows[0][2] || 0,
        approved: result.rows[0][3] || 0,
        rejected: result.rows[0][4] || 0
      };
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Get recent applications (for admin dashboard)
  static async getRecent(limit = 5) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT a.application_id, a.user_id, u.full_name, u.email,
                a.program_id, p.name as program_name,
                a.status, a.applied_at
         FROM applications a
         JOIN users u ON a.user_id = u.user_id
         JOIN programs p ON a.program_id = p.program_id
         ORDER BY a.applied_at DESC
         FETCH FIRST :limit ROWS ONLY`,
        { limit }
      );
      
      const applications = result.rows.map(row => ({
        application_id: row[0],
        user_id: row[1],
        full_name: row[2],
        email: row[3],
        program_id: row[4],
        program_name: row[5],
        status: row[6],
        applied_at: row[7]
      }));
      
      return applications;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}

module.exports = Application;

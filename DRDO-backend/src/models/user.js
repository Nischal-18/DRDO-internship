const oracledb = require('oracledb');
const { getPool } = require('../config/db');

class User {
  // Create a new user
  static async create(userData) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const sql = `
        INSERT INTO users (full_name, email, password_hash, phone, role)
        VALUES (:full_name, :email, :password_hash, :phone, :role)
        RETURNING user_id INTO :user_id
      `;
      
      const result = await connection.execute(
        sql,
        {
          full_name: userData.full_name,
          email: userData.email,
          password_hash: userData.password_hash,
          phone: userData.phone || null,
          role: userData.role || 'applicant',
          user_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        },
        { autoCommit: true }
      );
      
      return result.outBinds.user_id[0];
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT user_id, full_name, email, password_hash, phone, role, is_active, created_at
         FROM users WHERE email = :email`,
        [email]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const user = {
        user_id: result.rows[0][0],
        full_name: result.rows[0][1],
        email: result.rows[0][2],
        password_hash: result.rows[0][3],
        phone: result.rows[0][4],
        role: result.rows[0][5],
        is_active: result.rows[0][6],
        created_at: result.rows[0][7]
      };
      
      return user;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Find user by ID
  static async findById(userId) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT user_id, full_name, email, phone, role, is_active, created_at
         FROM users WHERE user_id = :user_id`,
        [userId]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const user = {
        user_id: result.rows[0][0],
        full_name: result.rows[0][1],
        email: result.rows[0][2],
        phone: result.rows[0][3],
        role: result.rows[0][4],
        is_active: result.rows[0][5],
        created_at: result.rows[0][6]
      };
      
      return user;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Update last login time
  static async updateLastLogin(userId) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      await connection.execute(
        `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = :user_id`,
        [userId],
        { autoCommit: true }
      );
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Update user role
  static async updateRole(userId, role) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `UPDATE users SET role = :role WHERE user_id = :user_id`,
        { role, user_id: userId },
        { autoCommit: true }
      );
      
      return result.rowsAffected > 0;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Update user active status
  static async updateStatus(userId, isActive) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `UPDATE users SET is_active = :is_active WHERE user_id = :user_id`,
        { is_active: isActive ? 1 : 0, user_id: userId },
        { autoCommit: true }
      );
      
      return result.rowsAffected > 0;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Delete user
  static async delete(userId) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `DELETE FROM users WHERE user_id = :user_id`,
        { user_id: userId },
        { autoCommit: true }
      );
      
      return result.rowsAffected > 0;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Find all users
  static async findAll() {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT user_id, full_name, email, phone, role, is_active, created_at, last_login
         FROM users
         ORDER BY created_at DESC`
      );
      
      if (result.rows.length === 0) {
        return [];
      }
      
      // Map rows to user objects
      const users = result.rows.map(row => ({
        user_id: row[0],
        full_name: row[1],
        email: row[2],
        phone: row[3],
        role: row[4],
        is_active: row[5],
        created_at: row[6],
        last_login: row[7]
      }));
      
      return users;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Get user count stats
  static async getStats() {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT 
           COUNT(*) as total,
           SUM(CASE WHEN role = 'applicant' THEN 1 ELSE 0 END) as applicants,
           SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admins,
           SUM(CASE WHEN role = 'reviewer' THEN 1 ELSE 0 END) as reviewers,
           SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active
         FROM users`
      );
      
      return {
        total: result.rows[0][0] || 0,
        applicants: result.rows[0][1] || 0,
        admins: result.rows[0][2] || 0,
        reviewers: result.rows[0][3] || 0,
        active: result.rows[0][4] || 0
      };
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Get recent users (for admin dashboard)
  static async getRecent(limit = 5) {
    const pool = getPool();
    let connection;
    
    try {
      connection = await pool.getConnection();
      
      const result = await connection.execute(
        `SELECT user_id, full_name, email, role, is_active, created_at
         FROM users
         ORDER BY created_at DESC
         FETCH FIRST :limit ROWS ONLY`,
        { limit }
      );
      
      const users = result.rows.map(row => ({
        user_id: row[0],
        full_name: row[1],
        email: row[2],
        role: row[3],
        is_active: row[4],
        created_at: row[5]
      }));
      
      return users;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}

module.exports = User;

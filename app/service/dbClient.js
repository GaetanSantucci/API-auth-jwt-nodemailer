// ~ *** *** PG CONNEXION DATABASE *** *** ~ //
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(() => console.log('DB connection is live.'))
  .catch((err) => console.log('DB connection failed.', err));

export { pool };
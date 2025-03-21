module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  console.log('DATABASE_CLIENT:', client);
  console.log('DATABASE_URL:', env('DATABASE_URL'));
  console.log('DATABASE_SSL:', env('DATABASE_SSL'));

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: env.bool('DATABASE_SSL', true) ? { rejectUnauthorized: false } : false,
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 90000), // Increased to 90 seconds
      connectionTimeoutMillis: 30000, // 30 seconds timeout for initial connection
    },
  };
};
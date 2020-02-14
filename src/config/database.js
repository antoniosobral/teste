module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'senhas',
  define: {
    timestamps: true,
    underscored: true,
    uderscoredAll: true,
  },
};

module.exports = {
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT0',
  },
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'nodeapi',
  define: {
    timestamps: true,
    underscored: true,
  },
};
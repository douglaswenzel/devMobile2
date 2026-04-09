import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('meuApp.db');

export const setupDatabase = () => {
  db.execSync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      cpf TEXT UNIQUE, 
      nome TEXT, 
      sobrenome TEXT
    );
    CREATE TABLE IF NOT EXISTS enderecos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_cpf TEXT, 
      cep TEXT, 
      logradouro TEXT, 
      numero TEXT, 
      bairro TEXT, 
      cidade TEXT, 
      uf TEXT,
      FOREIGN KEY (user_cpf) REFERENCES usuarios (cpf) ON DELETE CASCADE
    );
  `);
};

export const dbService = {
  insertUser: (cpf, nome, sobrenome) => 
    db.runSync('INSERT INTO usuarios (cpf, nome, sobrenome) VALUES (?, ?, ?)', [cpf, nome, sobrenome]),

  updateUser: (cpf, nome, sobrenome) =>
    db.runSync('UPDATE usuarios SET nome = ?, sobrenome = ? WHERE cpf = ?', [nome, sobrenome, cpf]),

  deleteUser: (cpf) => {
    db.runSync('DELETE FROM enderecos WHERE user_cpf = ?', [cpf]);
    return db.runSync('DELETE FROM usuarios WHERE cpf = ?', [cpf]);
  },

  getAllUsers: () => db.getAllSync('SELECT * FROM usuarios'),

  insertAddress: (data) => 
    db.runSync(
      'INSERT INTO enderecos (user_cpf, cep, logradouro, numero, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [data.cpf, data.cep, data.logradouro, data.numero, data.bairro, data.localidade, data.uf]
    ),

  updateAddressByCpf: (cpf, data) =>
    db.runSync(
      'UPDATE enderecos SET cep = ?, logradouro = ?, numero = ?, bairro = ?, cidade = ?, uf = ? WHERE user_cpf = ?',
      [data.cep, data.logradouro, data.numero, data.bairro, data.localidade, data.uf, cpf]
    ),

  getUsersWithAddresses: () => 
    db.getAllSync(`
      SELECT 
        u.cpf, u.nome, u.sobrenome, 
        e.cep, e.logradouro, e.numero, e.bairro, e.cidade, e.uf
      FROM usuarios u 
      LEFT JOIN enderecos e ON u.cpf = e.user_cpf
    `),
};
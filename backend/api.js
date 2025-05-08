const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Agregar esta línea
const app = express();
const port = 3000;

// Usar CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:4200',  // Permite solicitudes desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization']  // Encabezados permitidos
}));

app.use(express.json());

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nike'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Rutas para la tabla ROLES
app.get('/roles', (req, res) => {
  db.query('SELECT * FROM ROLES', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/roles', (req, res) => {
  const { Rol } = req.body;
  db.query('INSERT INTO ROLES (Rol) VALUES (?)', [Rol], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, Rol });
  });
});

app.put('/roles/:id', (req, res) => {
  const { id } = req.params;
  const { Rol } = req.body;
  db.query('UPDATE ROLES SET Rol = ? WHERE Id_rol = ?', [Rol, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id, Rol });
  });
});

app.delete('/roles/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM ROLES WHERE Id_rol = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
});

// Rutas para la tabla PRODUCT_TYPES
app.get('/product-types', (req, res) => {
  db.query('SELECT * FROM PRODUCT_TYPES', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/product-types', (req, res) => {
  const { Type } = req.body;
  db.query('INSERT INTO PRODUCT_TYPES (Type) VALUES (?)', [Type], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, Type });
  });
});

app.put('/product-types/:id', (req, res) => {
  const { id } = req.params;
  const { Type } = req.body;
  db.query('UPDATE PRODUCT_TYPES SET Type = ? WHERE Id_product_types = ?', [Type, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id, Type });
  });
});

app.delete('/product-types/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM PRODUCT_TYPES WHERE Id_product_types = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
});

// Rutas para la tabla PRODUCTS
app.get('/products', (req, res) => {
  db.query('SELECT * FROM PRODUCTS', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/products', (req, res) => {
  const { name, Price, Description, Sale, Id_product_types, URL_image, Stock } = req.body;
  db.query('INSERT INTO PRODUCTS (name, Price, Description, Sale, Id_product_types, URL_image, Stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, Price, Description, Sale, Id_product_types, URL_image, Stock], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, name, Price, Description, Sale, Id_product_types, URL_image, Stock });
  });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, Price, Description, Sale, Id_product_types, URL_image, Stock } = req.body;
  db.query('UPDATE PRODUCTS SET name = ?, Price = ?, Description = ?, Sale = ?, Id_product_types = ?, URL_image = ?, Stock = ? WHERE Id_product = ?',
    [name, Price, Description, Sale, Id_product_types, URL_image, Stock, id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id, name, Price, Description, Sale, Id_product_types, URL_image, Stock });
  });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM PRODUCTS WHERE Id_product = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
});

// Rutas para la tabla USER
app.get('/users', (req, res) => {
  db.query('SELECT * FROM `USER`', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { User_name, Password, Name, Surname1, Surname2, Birthday, Id_rol } = req.body;
  db.query('INSERT INTO `USER` (User_name, Password, Name, Surname1, Surname2, Birthday, Id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [User_name, Password, Name, Surname1, Surname2, Birthday, Id_rol], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, User_name, Password, Name, Surname1, Surname2, Birthday, Id_rol });
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { User_name, Password, Name, Surname1, Surname2, Birthday, Id_rol } = req.body;
  db.query('UPDATE `USER` SET User_name = ?, Password = ?, Name = ?, Surname1 = ?, Surname2 = ?, Birthday = ?, Id_rol = ? WHERE Id_user = ?',
    [User_name, Password, Name, Surname1, Surname2, Birthday, Id_rol, id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id, User_name, Password, Name, Surname1, Surname2, Birthday, Id_rol });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM `USER` WHERE Id_user = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
});

// Rutas para la tabla SALES
app.get('/sales', (req, res) => {
  db.query('SELECT * FROM SALES', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/sales', (req, res) => {
  const { Id_product, Id_user, quantity } = req.body;
  db.query('INSERT INTO SALES (Id_product, Id_user, quantity) VALUES (?, ?, ?)', [Id_product, Id_user, quantity], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, Id_product, Id_user, quantity });
  });
});

app.put('/sales/:id', (req, res) => {
  const { id } = req.params;
  const { Id_product, Id_user, quantity } = req.body;
  db.query('UPDATE SALES SET Id_product = ?, Id_user = ?, quantity = ? WHERE Id_sale = ?', [Id_product, Id_user, quantity, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id, Id_product, Id_user, quantity });
  });
});

app.delete('/sales/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM SALES WHERE Id_sale = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

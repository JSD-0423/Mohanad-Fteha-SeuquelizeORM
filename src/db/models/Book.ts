import { DataTypes } from 'sequelize';
import conn from '../connect';

const Book = conn.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 20,
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 20
    }
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 10,
      max: 30
    }
  }
}, {
  freezeTableName: true,
});

Book.sync().then(() => {
  console.log("Table successfully synced");
}).catch((err) => {
  console.log("Error syncing the table");
})

export default Book
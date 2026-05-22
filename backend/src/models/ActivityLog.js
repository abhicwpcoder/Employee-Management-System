import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entity_type: {
    type: DataTypes.STRING
  },
  entity_id: {
    type: DataTypes.INTEGER
  },
  details: {
    type: DataTypes.TEXT
  },
  ip_address: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'activity_logs',
  timestamps: true,
  underscored: true
});

export default ActivityLog;
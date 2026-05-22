import { connectDB, sequelize } from './src/config/database.js';
import Employee from './src/models/Employee.js';
import bcrypt from 'bcryptjs';

const initDatabase = async () => {
  try {
    console.log('📡 Connecting to database...');
    await connectDB();
    
    console.log('🗑️  Dropping and recreating tables...');
    await sequelize.sync({ force: true });
    console.log('✅ Database synced successfully');
    
    console.log('👥 Creating demo employees...');
    
    // Hash passwords properly
    const salt = await bcrypt.genSalt(10);
    
    // Create Admin
    const adminPassword = await bcrypt.hash('admin123', salt);
    await Employee.create({
      username: 'admin',
      email: 'admin@example.com',
      password_hash: adminPassword,
      role: 'admin',
      first_name: 'System',
      last_name: 'Admin',
      department: 'IT',
      position: 'Administrator',
      is_active: true
    });
    console.log('✅ Admin created');
    
    // Create Manager
    const managerPassword = await bcrypt.hash('manager123', salt);
    await Employee.create({
      username: 'manager',
      email: 'manager@example.com',
      password_hash: managerPassword,
      role: 'manager',
      first_name: 'John',
      last_name: 'Smith',
      department: 'HR',
      position: 'Manager',
      is_active: true
    });
    console.log('✅ Manager created');
    
    // Create Employee
    const employeePassword = await bcrypt.hash('employee123', salt);
    await Employee.create({
      username: 'employee',
      email: 'employee@example.com',
      password_hash: employeePassword,
      role: 'employee',
      first_name: 'Jane',
      last_name: 'Doe',
      department: 'Sales',
      position: 'Representative',
      is_active: true
    });
    console.log('✅ Employee created');
    
    // Verify passwords work
    console.log('\n🔐 Testing password verification...');
    const testAdmin = await Employee.findOne({ where: { email: 'admin@example.com' } });
    const testPass = await bcrypt.compare('admin123', testAdmin.password_hash);
    console.log('Admin password test:', testPass ? '✅ Working' : '❌ Failed');
    
    console.log('\n🎉 DATABASE READY!');
    console.log('\n📋 LOGIN CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 ADMIN:    admin@example.com / admin123');
    console.log('📊 MANAGER:  manager@example.com / manager123');
    console.log('👤 EMPLOYEE: employee@example.com / employee123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

initDatabase();
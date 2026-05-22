// backend/seed.js
import { connectDB } from './src/config/database.js';
import Employee from './src/models/Employee.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Employee.destroy({ where: {}, truncate: true });
    
    // Create admin
    const admin = await Employee.create({
      username: 'admin',
      email: 'admin@example.com',
      password_hash: 'admin123',
      role: 'admin',
      first_name: 'System',
      last_name: 'Admin',
      department: 'IT',
      position: 'Administrator',
      is_active: true
    });
    
    // Create manager
    const manager = await Employee.create({
      username: 'manager',
      email: 'manager@example.com',
      password_hash: 'manager123',
      role: 'manager',
      first_name: 'John',
      last_name: 'Smith',
      department: 'HR',
      position: 'Manager',
      is_active: true
    });
    
    // Create employee
    const employee = await Employee.create({
      username: 'employee',
      email: 'employee@example.com',
      password_hash: 'employee123',
      role: 'employee',
      first_name: 'Jane',
      last_name: 'Doe',
      department: 'Sales',
      position: 'Representative',
      is_active: true
    });
    
    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin:    admin@example.com / admin123');
    console.log('Manager:  manager@example.com / manager123');
    console.log('Employee: employee@example.com / employee123');
    
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit();
  }
};

seedDatabase();
// backend/seed-employees.js
import { connectDB } from './src/config/database.js';
import Employee from './src/models/Employee.js';
import bcrypt from 'bcryptjs';

const seedEmployees = async () => {
  try {
    await connectDB();
    
    const salt = await bcrypt.genSalt(10);
    
    const employees = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password_hash: await bcrypt.hash('admin123', salt),
        role: 'admin',
        first_name: 'System',
        last_name: 'Admin',
        department: 'IT',
        position: 'System Administrator',
        employee_id: 'ADMIN001',
        is_active: true
      },
      {
        username: 'john.manager',
        email: 'manager@example.com',
        password_hash: await bcrypt.hash('manager123', salt),
        role: 'manager',
        first_name: 'John',
        last_name: 'Smith',
        department: 'Human Resources',
        position: 'HR Manager',
        employee_id: 'MGR001',
        is_active: true
      },
      {
        username: 'jane.employee',
        email: 'employee@example.com',
        password_hash: await bcrypt.hash('employee123', salt),
        role: 'employee',
        first_name: 'Jane',
        last_name: 'Doe',
        department: 'Sales',
        position: 'Sales Representative',
        employee_id: 'EMP001',
        is_active: true
      }
    ];
    
    for (const emp of employees) {
      const exists = await Employee.findOne({ where: { email: emp.email } });
      if (!exists) {
        await Employee.create(emp);
        console.log(`✅ Created: ${emp.email}`);
      }
    }
    
    console.log('\n✅ Demo employees seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('👑 Admin:    admin@example.com / admin123');
    console.log('📊 Manager:  manager@example.com / manager123');
    console.log('👤 Employee: employee@example.com / employee123');
    
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit();
  }
};

seedEmployees();
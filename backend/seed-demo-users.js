// backend/seed-demo-users.js
import { connectDB } from './src/config/database.js';
import User from './src/models/User.js';
import bcrypt from 'bcryptjs';

const seedDemoUsers = async () => {
  try {
    await connectDB();
    
    const demoUsers = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        first_name: 'System',
        last_name: 'Admin',
        is_active: true
      },
      {
        username: 'manager',
        email: 'manager@example.com',
        password: 'manager123',
        role: 'manager',
        first_name: 'Department',
        last_name: 'Manager',
        is_active: true
      },
      {
        username: 'employee',
        email: 'employee@example.com',
        password: 'employee123',
        role: 'employee',
        first_name: 'Staff',
        last_name: 'Employee',
        is_active: true
      }
    ];
    
    for (const userData of demoUsers) {
      const existingUser = await User.findOne({
        where: { email: userData.email }
      });
      
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        
        await User.create({
          ...userData,
          password_hash: hashedPassword
        });
        
        console.log(`✓ Created user: ${userData.email}`);
      } else {
        console.log(`○ User already exists: ${userData.email}`);
      }
    }
    
    console.log('\n✅ Demo users seeded successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin:    admin@example.com / admin123');
    console.log('Manager:  manager@example.com / manager123');
    console.log('Employee: employee@example.com / employee123');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedDemoUsers();
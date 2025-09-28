import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Создаем тестового пользователя
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash: hashedPassword,
    },
  });

  console.log('✅ Created test user:', testUser.email);

  // Создаем несколько тестовых кампаний
  const campaigns = await Promise.all([
    prisma.campaign.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Summer Sale Campaign',
        budget: 5000.00,
        startDate: new Date('2024-06-01'),
        status: 'active',
        userId: testUser.id,
      },
    }),
    prisma.campaign.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Black Friday Promotion',
        budget: 10000.00,
        startDate: new Date('2024-11-29'),
        status: 'draft',
        userId: testUser.id,
      },
    }),
    prisma.campaign.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'New Year Campaign',
        budget: 7500.00,
        startDate: new Date('2024-12-25'),
        status: 'draft',
        userId: testUser.id,
      },
    }),
  ]);

  console.log('✅ Created campaigns:', campaigns.length);
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
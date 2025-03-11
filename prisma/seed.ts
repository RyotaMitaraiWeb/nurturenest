import { roleIds, roles } from '@/common/roles';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
async function main() {
  const manager = await prisma.user.findFirst({ where: { name: 'manager' }, include: { Role: true} });

  const userRole = await prisma.role.upsert({
    where: { name: roles.user, id: roleIds.user },
    update: {},
    create: {
      id: roleIds.user,
      name: roles.user,
    }
  });

  const managerRole = await prisma.role.upsert({
    where: { name: roles.manager, id: roleIds.manager },
    update: {},
    create: {
      id: roleIds.manager,
      name: roles.manager,
    },
  });

  if (manager) {
    await prisma.user.update({ where: { id: manager.id }, data: { Role: { connect: [
      {
        id: userRole.id,
      },
      {
        id: managerRole.id,
      }
    ]}}});
  }
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
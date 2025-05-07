import prisma from "../lib/prisma";
import { initialData } from "./seed";
// Inserción de datos de prueba en nuestra base de datos
async function main() {
  try {
    // 1. Delete all data from slug table
    await prisma.user.deleteMany();
    // 2. Delete all data from slug table
    await prisma.slug.deleteMany();

    const { slugs, users } = initialData;

    // 3 Insertar usuarios
    const usersDB = await prisma.user.createMany({
      data: users,
    });

    // 3.1. Obtener el id del usuario admin
    const adminUser = await prisma.user.findFirst({
      where: {
        email: users[0].email,
      },
    });

    // 3.2. Asignar el id del usuario admin a los slugs
    const slugsWithAdminId = slugs.map((slug) => ({
      ...slug,
      userId: adminUser?.id,
    }))
    
    // 4. Insertar slugs
    await prisma.slug.createMany({
      data: slugsWithAdminId,
    });

    console.log("Seed ejecutado correctamente!");
  } catch (error) {
    console.log("Error al ejecutar el seed", error);
    return;
  }
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();

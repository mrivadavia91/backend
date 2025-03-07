import { faker } from '@faker-js/faker';

// Generar usuarios falsos
export const generateMockUsers = (count) => {
    return Array.from({ length: count }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 65 }),
        password: 'coder123', // Se encripta al insertar en DB
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    }));
};

// Generar mascotas falsas
export const generateMockPets = (count) => {
    return Array.from({ length: count }, () => ({
        name: faker.animal.dog(),
        type: faker.helpers.arrayElement(['dog', 'cat', 'bird']),
        age: faker.number.int({ min: 1, max: 15 }),
        owner: faker.internet.email()
    }));
};

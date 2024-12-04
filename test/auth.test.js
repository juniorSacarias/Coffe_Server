const request = require('supertest');
const app = require('../index'); // Asegúrate de que este sea el punto de entrada de tu aplicación
const User = require('../v1/models/user'); // Importa el modelo User

describe('Auth Endpoints', () => {
	beforeAll(async () => {
		// Configuración inicial, como limpiar la base de datos
		await User.sync({ force: true }); // Esto eliminará y recreará la tabla
	});

	describe('POST /register', () => {
		it('debería registrar un nuevo usuario', async () => {
			const res = await request(app).post('/api/v1/auth/register').send({
				userName: 'test2',
				password: 'test'
			});
			expect(res.status).toBe(201);
			expect(res.body.message).toBe('Usuario creado con éxito');
		});

		it('debería devolver un error si el usuario ya existe', async () => {
			await User.create({ userName: 'testuser', password: 'password123' });

			const res = await request(app).post('/api/v1/auth/register').send({
				userName: 'test2',
				password: 'test'
			});
			expect(res.status).toBe(400);
			expect(res.body.error).toBe('El usuario ya está registrado');
		});
	});

	describe('POST /login', () => {
		it('debería iniciar sesión con credenciales correctas', async () => {
			await User.create({ userName: 'test2', password: 'test' });

			const res = await request(app).post('/api/v1/auth/login').send({
				username: 'test2',
				password: 'test'
			});
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('token');
		});

		it('debería devolver un error con credenciales incorrectas', async () => {
			const res = await request(app).post('/api/v1/auth/login').send({
				userName: 'testuser',
				password: 'wrongpassword'
			});
			expect(res.status).toBe(401);
			expect(res.body).toHaveProperty('message');
		});
	});
});

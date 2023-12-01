// userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

class UserController {
    async createUser(req, res) {
        try {
            const { username, password } = req.body;

            // Verifica si el nombre de usuario ya existe
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                password: hashedPassword,
            });

            await newUser.save();
            res.status(201).json({ message: 'Usuario creado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

   // userController.js
    async updateUser(req, res) {
        try {
            const username = req.params.username;
            const { password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
             return res.status(404).json({ error: 'Usuario no encontrado', details: 'El nombre de usuario proporcionado no existe' });
        }

        // Actualizar el nombre de usuario y/o la contraseña si se proporcionan
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}



    async deleteUser(req, res) {
        try {
            const username = req.params.username;

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            await User.findOneAndDelete({ username });

            res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = new UserController();

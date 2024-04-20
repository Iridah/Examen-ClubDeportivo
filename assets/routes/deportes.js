// Crear deporte

const Deporte = require('../assets/models/deporte');
const deportesPath = './data/deportes.json'; // Ruta del archivo JSON

const crearDeporte = async (req, res) => {
  const { nombre, precio } = req.body;

  try {
    const deporte = new Deporte(nombre, precio);
    const deportes = JSON.parse(await fs.promises.readFile(deportesPath, 'utf8'));

    deportes.push(deporte);
    await fs.promises.writeFile(deportesPath, JSON.stringify(deportes, null, 2)); // Guardar con formato JSON

    res.status(201).json({ message: 'Deporte creado exitosamente' });
  } catch (error) {
    console.error(chalk.red('Error al crear deporte:', error));
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { crearDeporte };


// Obtener listado de deportes
const obtenerDeportes = async (req, res) => {
    try {
      const deportesPath = './data/deportes.json';
      const deportes = JSON.parse(await fs.promises.readFile(deportesPath, 'utf8'));
  
      res.status(200).json(deportes);
    } catch (error) {
      console.error(chalk.red('Error al obtener deportes:', error));
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  module.exports = { crearDeporte, obtenerDeportes };


// Editar el precio
const editarPrecio = async (req, res) => {
    const { id, nuevoPrecio } = req.query; // Obtener ID y nuevo precio de la consulta
  
    try {
      const deportesPath = './data/deportes.json';
      const deportes = JSON.parse(await fs.promises.readFile(deportesPath, 'utf8'));
  
      const deporteIndex = deportes.findIndex(deporte => deporte.id === id);
  
      if (deporteIndex !== -1) {
        deportes[deporteIndex].precio = nuevoPrecio;
        await fs.promises.writeFile(deportesPath, JSON.stringify(deportes, null, 2));
  
        res.status(200).json({ message: 'Precio del deporte actualizado exitosamente' });
      } else {
        res.status(404).json({ message: 'Deporte no encontrado' });
      }
    } catch (error) {
      console.error(chalk.red('Error al editar precio:', error));
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  module.exports = { crearDeporte, obtenerDeportes, editarPrecio };
  

// Borrar el precio
const eliminarDeporte = async (req, res) => {
    const { id } = req.query; // Obtener ID del deporte de la consulta
  
    try {
      const deportesPath = './data/deportes.json';
      const deportes = JSON.parse(await fs.promises.readFile(deportesPath, 'utf8'));
  
      const deporteIndex = deportes.findIndex(deporte => deporte.id === id);
  
      if (deporteIndex !== -1) {
        deportes.splice(deporteIndex, 1);
        await fs.promises.writeFile(deportesPath, JSON.stringify(deportes, null, 2));
  
        res.status(200).json({ message: 'Deporte eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Deporte no encontrado' });
      }
    } catch (error) {
      console.error(chalk.red('Error al eliminar deporte:', error));
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  module.exports = { crearDeporte, obtenerDeportes, editarPrecio, eliminarDeporte };
  
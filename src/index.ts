import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

// Declaramos que todas las peticiones puedan usar JSON
app.use(express.json());

// bienvedida
app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
        mensaje: "Bienvenido a la API",
        estado: "Operativo"
    });
});

// ruta con parametro dinamico
app.get('/usuario/:id', (req: Request<{ id: string }>, res: Response): void => {
    const userId: string = req.params.id;
    
    res.status(200).json({
        mensaje: "Usuario encontrado con éxito",
        datos: {
            id: userId,
            tipo: "Dinámico"
        }
    });
});

// busqueda con query params
interface SearchQuery {
    nombre?: string;
    categoria?: string;
}

app.get('/buscar', (req: Request, res: Response): void => {
    
    const query = req.query as unknown as SearchQuery;

    
    const nombre: string = query.nombre || "No especificado";
    const categoria: string = query.categoria || "General";

    res.status(200).json({
        mensaje: "Búsqueda procesada correctamente",
        parametrosRecibidos: {
            nombre,
            categoria
        }
    });
});

// servidor
app.listen(PORT, (): void => {
    console.log(`servidor ejecutándose en http://localhost:${PORT}`);
});
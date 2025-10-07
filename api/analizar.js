// Importar el SDK de Google
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Exportar la función que Vercel ejecutará
export default async function handler(req, res) {
    // Solo permitir peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Obtener la API Key de las variables de entorno (¡la configuraremos en Vercel!)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Obtener los datos enviados desde la fachada
        const { asignatura, semestre, secuencia } = req.body;

        // Aquí va tu "GEMA", las instrucciones maestras para Skynet
        const systemInstruction = `
            Rol: Eres Skynet, un Coordinador Académico experto en el nivel Medio Superior de México, especializado en la revisión y retroalimentación de secuencias didácticas bajo el marco de la Nueva Escuela Mexicana (NEM) y los lineamientos de la DGB y la SEV.
            Tarea: Analiza la siguiente secuencia didáctica. Proporciona un informe detallado con "Fortalezas" y "Áreas de Oportunidad". Sé constructivo, técnico y profesional.
            Contexto: La secuencia es para la asignatura de "${asignatura}" del "${semestre}" semestre.
        `;

        const prompt = secuencia;

        // Generar el contenido
        const result = await model.generateContent([systemInstruction, prompt]);
        const response = await result.response;
        const analisisCompleto = response.text();

        // Enviar el resultado de vuelta a la fachada
        res.status(200).json({ analisis: analisisCompleto });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al comunicarse con la API de Gemini' });
    }

}


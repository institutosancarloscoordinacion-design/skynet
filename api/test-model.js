import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        // Usamos la misma API Key de las variables de entorno
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Pedimos la lista de todos los modelos generativos
        const models = await genAI.listModels();
        
        let modelList = "Modelos de IA disponibles para tu API Key:\n\n";
        
        for await (const m of models) {
            // Nos interesa el método "generateContent"
            if (m.supportedGenerationMethods.includes("generateContent")) {
                modelList += `- ${m.name}\n`;
            }
        }

        // Devolvemos la lista como texto plano
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(modelList);

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: "Error al listar los modelos.",
            details: error.message 
        });
    }
}

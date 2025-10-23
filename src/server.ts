import app from "./app";
import { runDatabaseSetup } from "./setup"; // Importa a função criada

async function startServer() {
    try {
        await runDatabaseSetup(); 
        
        const port = Number(process.env.PORT) || 4000;
        
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error("Servidor falhou ao iniciar (Erro no DB). Processo encerrado.");
        process.exit(1); 
    }
}

startServer(); 
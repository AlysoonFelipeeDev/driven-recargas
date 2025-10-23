import { query } from "./config/db";
import * as fs from 'fs';
import * as path from 'path';

export async function runDatabaseSetup() {
    try {
        console.log("Iniciando a verificação e criação do DB...");

        const sqlPath = path.join(__dirname, '..', 'sql', 'seed.sql');
        
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        await query(sqlContent); 

        console.log("Criação de tabelas e seed concluídos!");
    } catch (error) {
        if (error instanceof Error && error.message.includes('already exists')) {
            console.log("Tabelas já existem. Seguindo...");
        } else {
            console.error("ERRO FATAL ao configurar o banco de dados:", error);
            throw error; 
        }
    }
}
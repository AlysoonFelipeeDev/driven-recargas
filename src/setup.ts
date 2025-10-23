import { query } from "./config/db";
import * as fs from "fs";
import * as path from "path";

export async function runDatabaseSetup() {
    try {
        console.log("Iniciando a verificação e criação do DB...");

        const sqlPath = path.join(__dirname, "..", "sql", "seed.sql");
        const sqlContent = fs.readFileSync(sqlPath, "utf8");

        await query(sqlContent);

        console.log("Criação de tabelas e seed concluídos!");
    } catch (error: any) {
        // 42P07 = duplicate_table
        const isDuplicateTable = error?.code === "42P07";
        const msg = String(error?.message || "");
        const isMsgKnown = /already exists|já existe/i.test(msg);

        if (isDuplicateTable || isMsgKnown) {
        console.log("Tabelas já existem. Seguindo...");
        return;
        }

        console.error("ERRO FATAL ao configurar o banco de dados:", error);
        throw error;
    }
}

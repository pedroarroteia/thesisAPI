const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// Configuração de upload com Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Função para redimensionar imagem
async function resizeImage(buffer, width, height) {
    return await sharp(buffer)
        .resize(width, height) // Redimensiona para as dimensões passadas
        .toFormat("png")
        .toBuffer();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*// Função para rodar a inferência com o modelo
function runPythonInference(imagePath, modelType) {
    return new Promise((resolve, reject) => {
        exec(`python3 yolo_inference.py ${imagePath} ${modelType}`, (error, stdout, stderr) => {
            if (error) {
                reject(`Exec error: ${error}`);
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
            }
            try {
                const result = JSON.parse(stdout);
                resolve(result);
            } catch (err) {
                reject('Erro ao processar a resposta JSON');
            }
        });
    });
}*/

app.post("/welcome", async (req, res) => {
    res.status(200).send({message: "Welcome to the API"});
});

app.post("/compare", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Envie uma imagem corretamente!" });
    }

    try {
        await delay(3000); // Simulação de processamento

        // Redimensiona a imagem para 600x600 pixels
        const processedA = await resizeImage(req.file.buffer, 600, 600);
        const processedB = await resizeImage(req.file.buffer, 600, 600);

        // Retorna as imagens processadas em formato base64
        res.json({
            imageA: `data:image/png;base64,${processedA.toString("base64")}`,
            imageB: `data:image/png;base64,${processedB.toString("base64")}`
        });

    } catch (error) {
        console.error("Erro no processamento:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");

const PORT = 3000;
const app = express();

//Config for static files (CSS, JS, images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("📩 Novo contato recebido:");
  console.log(`Nome: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Assunto: ${subject}`);
  console.log(`Mensagem: ${message}`);

  // Aqui você poderia salvar no banco de dados ou enviar por e-mail
  res.json({ success: true, message: "Mensagem enviada com sucesso ✅" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function BibliotecaPessoal() {
  const [livros, setLivros] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    ano: "",
    cdd: "",
    genero: "",
    lido: false,
    notas: ""
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const adicionarLivro = () => {
    if (!form.titulo || !form.autor) return;
    setLivros([...livros, { ...form }]);
    setForm({ titulo: "", autor: "", ano: "", cdd: "", genero: "", lido: false, notas: "" });
  };

  const toggleLido = (index) => {
    const novosLivros = [...livros];
    novosLivros[index].lido = !novosLivros[index].lido;
    setLivros(novosLivros);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto transition-colors duration-300 dark:bg-zinc-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">📘 Minha Biblioteca Pessoal</h1>
        <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Claro" : "🌙 Escuro"}
        </Button>
      </div>

      <p className="mb-6 italic text-muted-foreground">Para finalmente saber quantos e quais livros eu tenho.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input placeholder="Título" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
        <Input placeholder="Autor" value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} />
        <Input placeholder="Ano" value={form.ano} onChange={e => setForm({ ...form, ano: e.target.value })} />
        <Input placeholder="CDD" value={form.cdd} onChange={e => setForm({ ...form, cdd: e.target.value })} />
        <Input placeholder="Gênero" value={form.genero} onChange={e => setForm({ ...form, genero: e.target.value })} />
        <Textarea placeholder="Notas" value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} />
      </div>

      <Button onClick={adicionarLivro}>Adicionar Livro</Button>

      <div className="mt-8 space-y-4">
        {livros.map((livro, index) => (
          <Card key={index} className="shadow">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{livro.titulo} <span className="text-sm text-muted-foreground">({livro.ano})</span></h2>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>CDD:</strong> {livro.cdd} | <strong>Gênero:</strong> {livro.genero}</p>
              <p><strong>Notas:</strong> {livro.notas || "—"}</p>
              <p><strong>Status:</strong> {livro.lido ? "✔ Lido" : "📖 Não lido"}</p>
              <Button className="mt-2" onClick={() => toggleLido(index)}>
                Marcar como {livro.lido ? "Não lido" : "Lido"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}











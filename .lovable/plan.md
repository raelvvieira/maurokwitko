

## Plano: Banner de desconto nos e-books, banner WhatsApp e nova paleta de cores

### 1. Banner de 20% de desconto na pagina de E-books (`src/pages/Ebooks.tsx`)
Copiar o mesmo banner que ja existe em `Livros.tsx` (linhas 61-80) e inserir entre o subtitulo (linha 15) e o loading/grid. Mesmo estilo glass-card com Tag icon e cupom MAURO20.

### 2. Banner do WhatsApp na Dashboard (`src/pages/Dashboard.tsx`)
Criar um banner verde com design de fundo decorativo (gradiente verde com pattern/ondas CSS), contendo:
- Titulo convidando a entrar no grupo do WhatsApp do clube
- Texto explicativo sobre a interacao dos participantes
- Botao verde com icone do WhatsApp linkando para `https://chat.whatsapp.com/EZm9mXr8Du386Kxl61ZU6K` (target _blank)
- Fundo: gradiente de verdes (emerald/green) com elementos decorativos em CSS (circulos, formas abstratas com opacity baixa)

### 3. Ajuste da paleta de cores (`src/index.css`)
A cor #506274 equivale a HSL ~210, 18%, 38%. Ajustar a paleta para derivar desse tom slate-blue mais sobrio:

| Variavel | Valor atual | Novo valor |
|----------|------------|------------|
| --primary | 210 100% 52% | 210 18% 38% |
| --primary-foreground | 0 0% 100% | 0 0% 100% (mantido) |
| --accent | 199 89% 48% | 200 25% 50% |
| --ring | 210 100% 52% | 210 18% 38% |
| --mesh-1 | 210 100% 95% | 210 18% 95% |
| --mesh-2 | 199 100% 93% | 200 25% 93% |
| --mesh-3 | 230 100% 96% | 220 18% 96% |
| --sidebar-primary | 210 100% 52% | 210 18% 38% |
| --sidebar-accent | 210 100% 52% / 0.1 | 210 18% 38% / 0.1 |
| --sidebar-accent-foreground | 210 100% 52% | 210 18% 38% |
| --sidebar-ring | 210 100% 52% | 210 18% 38% |

Resultado: paleta mais sofisticada e discreta, centrada no tom #506274.

### Arquivos editados
- `src/pages/Ebooks.tsx` — banner de desconto
- `src/pages/Dashboard.tsx` — banner WhatsApp
- `src/index.css` — paleta de cores


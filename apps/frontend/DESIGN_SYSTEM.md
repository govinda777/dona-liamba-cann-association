# Sistema de Design Dona Liamba

Este documento descreve a identidade visual e as diretrizes de design para a plataforma Dona Liamba.

## Cores

A paleta de cores reflete a natureza do ecossistema: medicinal, confiável e regulado.

### Cores Primárias

**Verde Canábis (Primary)**
Utilizado para ações principais, botões e destaques. Representa a planta e a saúde natural.

- **Light Mode (`--primary`)**: `oklch(0.488 0.142 143.765)` (aprox. #15803d - Green 700)
- **Dark Mode (`--primary`)**: `oklch(0.696 0.17 142.495)` (aprox. #22c55e - Green 500)
- **Foreground (`--primary-foreground`)**: Branco (`#ffffff`) ou Preto (`#000000`) dependendo do contraste.

**Uso no código:**
```tsx
<div className="bg-primary text-primary-foreground">Botão Principal</div>
<span className="text-primary">Texto em destaque</span>
```

### Cores Secundárias e Semânticas

**Azul Hospitalar (Medical)**
Utilizado para representar a classe médica e ações clínicas.

- **Valor**: `#3b82f6` (Blue 500)
- **Uso**: `bg-medical`, `text-medical`

**Ouro ANVISA (Gold)**
Utilizado para representar associações, regulação e qualidade.

- **Valor**: `#f59e0b` (Amber 500)
- **Uso**: `bg-gold`, `text-gold`

### Escala de Cinza e Neutros

Utilizamos as variáveis padrão do Shadcn/UI (`--background`, `--foreground`, `--muted`, `--card`) que se adaptam automaticamente ao tema claro/escuro.

## Tipografia

A fonte principal é **Montserrat**. Ela é moderna, legível e transmite profissionalismo.

- **Família**: `Montserrat`, `sans-serif`
- **Variável CSS**: `--font-montserrat`

**Uso no código:**
A fonte é aplicada automaticamente como a fonte `sans` padrão do Tailwind.
```tsx
<h1 className="font-sans font-bold text-2xl">Título</h1>
<!-- ou explicitamente -->
<p className="font-montserrat">Texto</p>
```

## Componentes

### Botões

Os botões utilizam a cor primária por padrão.

```tsx
import { Button } from "@/components/ui/button"

<Button>Entrar</Button> // Fundo Verde, Texto Branco
<Button variant="outline">Cancelar</Button> // Borda, Fundo Transparente
<Button variant="ghost">Link</Button> // Sem fundo
```

### Cards

Os cards utilizam `bg-card` e bordas sutis.

```tsx
import { Card, CardContent } from "@/components/ui/card"

<Card>
  <CardContent>Conteúdo</CardContent>
</Card>
```

## Logotipo

O logotipo (texto ou ícone) deve ser utilizado preferencialmente na cor `primary-900` em fundos claros ou `primary-100` em fundos escuros para manter a legibilidade e a identidade da marca.

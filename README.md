# Miguel Oliveira - Website pessoal

Website pessoal, académico e profissional, bilingue (PT/EN), em HTML5, CSS3 e JavaScript vanilla.
Sem frameworks, sem dependências e sem passo de compilação: os ficheiros são publicados tal como estão.

**Endereço:** <https://bitwisemiguel.github.io/>
- Português (versão principal): `https://bitwisemiguel.github.io/`
- Inglês: `https://bitwisemiguel.github.io/en/`

## Estrutura

```
personal-website/
├── index.html          → Início (PT)
├── ensino.html         → Ensino (PT)
├── projetos.html       → Projetos e Investigação (PT)
├── cv.html             → CV (PT)
├── contacto.html       → Contacto (PT)
├── en/
│   ├── index.html      → Home (EN)
│   ├── teaching.html   → Teaching (EN)
│   ├── projects.html   → Projects & Research (EN)
│   ├── cv.html         → CV (EN)
│   └── contact.html    → Contact (EN)
├── css/style.css       → Todo o design (cores, tipografia, layout)
├── js/main.js          → Perfis online, menu móvel, ano, filtro de projetos, verificação do PDF
├── assets/
│   ├── images/og-image.png          → imagem de pré-visualização (LinkedIn, WhatsApp…)
│   ├── cv-miguel-oliveira.pdf       → (a adicionar) CV em inglês
│   └── cv-miguel-oliveira-pt.pdf    → (opcional) CV em português
├── 404.html            → página de erro (bilingue)
├── sitemap.xml         → mapa do site para motores de busca
├── robots.txt
└── README.md
```

Cada página existe em duas versões. **Ao alterar conteúdo, altere as duas**: `ensino.html` ↔ `en/teaching.html`, `projetos.html` ↔ `en/projects.html`, `cv.html` ↔ `en/cv.html`, `contacto.html` ↔ `en/contact.html`, `index.html` ↔ `en/index.html`.
O botão `EN`/`PT` na navbar liga cada página à sua equivalente na outra língua.

---

## Tarefas pendentes

- [ ] (Opcional) Preencher zbMATH Open e ResearchGate em `js/main.js`
- [ ] Decidir sobre a fotografia (opcional - ver abaixo)
- [ ] Depois de publicar: registar o site no Google Search Console e submeter o `sitemap.xml`

---

## Perfis online (GitHub, ORCID, Google Scholar…)

Estão todos num único sítio: a lista `PROFILES` no topo de `js/main.js`.

```js
{ id: "orcid", label: "ORCID", research: true,
  url: "https://orcid.org/0000-0000-0000-0000" },
```

- Coloque o URL completo em `url`. Se ficar vazio (`""`), o perfil não aparece em lado nenhum.
- Cada perfil preenchido aparece automaticamente, nas duas línguas, em: Início (links de contacto), CV (Contacto) e página de Contacto.
- Na página de Contacto, `research: false` aparece em "Perfis profissionais" e `research: true` em "Perfis de investigação". Estes últimos aparecem também junto às Publicações Científicas.
- O rodapé tem apenas um botão para a página de Contacto (e o link para a Academia de Matemática).
- A ordem da lista é a ordem de apresentação. Para remover um perfil, apague a linha ou deixe `url: ""`.
- Já configurados: GitHub, ORCID, Google Scholar, Ciência Vitae e Scopus.

O LinkedIn está escrito diretamente no HTML. O email é tratado à parte (ver "Email: proteção contra spam").

## Email: proteção contra spam

O endereço (`oliveira.mig.91@gmail.com`) **nunca aparece completo no código HTML**, o que impede a maioria dos robots que recolhem emails de o encontrar. Cada link de email tem o utilizador e o domínio escritos **ao contrário**:

```html
<a data-email data-u="19.gim.arievilo" data-d="moc.liamg">
```

Quando a página abre, o `js/main.js` junta as duas partes, cria o link `mailto:` e mostra o endereço. Quem visita vê o email normalmente.
Sem JavaScript, aparece `oliveira.mig.91 [arroba] gmail.com` (ou `[at]` na versão inglesa) e o botão "Enviar email" fica escondido.

O email aparece em: página inicial, CV (Contacto) e página de Contacto, nas duas línguas.

**Para mudar de email:** em todos os ficheiros HTML, substitua os valores de `data-u` (utilizador ao contrário) e `data-d` (domínio ao contrário) e os textos `… [arroba] …` / `… [at] …`. Use "Procurar e substituir em todos os ficheiros" no editor.

> Não coloque o email completo em texto noutros sítios do site, nem no PDF do CV, se quiser manter a proteção.

---

## Fotografia (opcional)

Sem fotografia, a página inicial mostra um cartão **Em resumo / At a glance** (doutoramento, anos de experiência, publicações, patentes). Para usar uma fotografia:

1. Guarde-a como `assets/images/profile.jpg` (quadrada, ~800 × 800 px, < 200 KB).
2. Em `index.html` **e** `en/index.html`, existe um comentário `PHOTO (optional)` com o código a usar. Substitua o bloco `<aside class="glance">…</aside>` por esse código.

Se atualizar números do cartão (por exemplo, quando tiver mais publicações), altere-os nas duas versões.

---

## Ensino: unidades curriculares por ano letivo

Em `ensino.html` e `en/teaching.html` há duas partes:

1. **Cronologia por ano letivo** (`<ol class="timeline teach-timeline">`). Cada ano é um `<li>`; cada semestre é um `<div class="sem">`; cada UC é um `<li>` com o nome e os cursos (etiquetas).
   - **Novo ano letivo:** copie um `<li>` completo, cole-o no topo da lista e edite-o. Mude a etiqueta "Em curso"/"Current" para o novo ano.
   - **2.º semestre de 2026/27:** copie um `<div class="sem">…</div>` de outro ano para dentro do `<div class="sem-grid">` de 2026/27.
   - O nome de cada UC liga ao cartão do programa (`href="#uc-calc"`, `#uc-al`, `#uc-tm`, `#uc-tpn`, `#uc-est`).
2. **Programas** (cartões). Para uma UC nova, copie um `<article class="card">`, dê-lhe um novo `id="uc-…"` e use esse id no link da cronologia.

### Conteúdo preparado mas escondido (Análise Matemática, 2.º semestre 2026/27)

Em `ensino.html` e `en/teaching.html` há dois blocos dentro de comentários HTML, que ainda não aparecem no site:

1. Na cronologia, dentro de 2026/27: o **2.º semestre** com Análise Matemática (Engenharia Aeroespacial).
2. Nos programas: o **cartão de Análise Matemática** (`id="uc-am"`).

Para os publicar, em cada um dos dois blocos e nas duas páginas:
- apague a linha que começa por `<!-- 2.º SEMESTRE 2026/27 (por publicar)` (ou `<!-- ANÁLISE MATEMÁTICA (por publicar)`; na versão inglesa, `2nd SEMESTER…` / `MATHEMATICAL ANALYSIS…`);
- apague a linha `-->` que fecha esse bloco.

Os blocos são os únicos comentários com o texto "por publicar" / "not yet published", por isso são fáceis de encontrar com Ctrl+F.

## Projetos

Em `projetos.html` e `en/projects.html` há um comentário `HOW TO ADD A PROJECT` com um bloco pronto a copiar.

1. Copie o bloco `<article class="card project-card" ...>` para dentro de `<div class="grid grid--3">`.
2. Edite nome, descrição, tecnologias e o link do repositório.
3. Em `data-category`, use uma ou mais categorias separadas por espaços:

| Valor          | PT                              | EN                          |
|----------------|---------------------------------|-----------------------------|
| `mathematics`  | Matemática                      | Mathematics                 |
| `statistics`   | Estatística e Análise de Dados  | Statistics & Data Analysis  |
| `python`       | Python                          | Python                      |
| `cpp`          | C++                             | C++                         |
| `research`     | Investigação Científica         | Scientific Research         |
| `igaming`      | iGaming                         | iGaming                     |

4. Os projetos ficam do mais recente para o mais antigo. O primeiro é o **Alelus**.
   Os cartões **"Em breve" / "Coming soon"** (SlotGames, Sebentas) têm o comentário `<!-- UPCOMING PROJECT: … -->` e a classe `is-placeholder` (contorno tracejado). Quando o repositório for publicado, substitua o cartão por um cartão completo, copiado do bloco `HOW TO ADD A PROJECT`, com o link, as tecnologias e os destaques.
5. Os botões de categoria sem nenhum projeto ficam escondidos automaticamente e reaparecem quando um cartão usar essa categoria em `data-category`. A barra de filtros só aparece a partir de **3 projetos**. Com menos, ficaria quase sempre vazia. Para mudar este número, altere `MIN_PROJECTS_FOR_FILTER` em `js/main.js`.

> Nos projetos iGaming, confirme que não publica matemática, código ou dados de jogos que pertençam a antigos ou atuais empregadores ou clientes.

## Publicações e pedidos de patente

Em `projetos.html` e `en/projects.html` as publicações estão agrupadas em **Artigos em revista**, **Atas de conferências** e **Preprints**, da mais recente para a mais antiga. O ano aparece à esquerda e vem do atributo `data-pub-year`.

Para adicionar uma publicação, copie um bloco `<li data-pub-year="…">` para o grupo certo e edite-o:

```html
<li data-pub-year="2025">
  <div>
    <p class="pub-title" lang="en">Título do artigo</p>
    <p class="pub-authors">A. Autor, <strong>M. Oliveira</strong>, B. Autor</p>
    <div class="pub-meta">
      <span lang="en"><em>Nome da Revista</em>, Vol. X, pp. 1–20</span>
      <a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="noopener noreferrer">DOI: 10.xxxx/xxxxx<span class="visually-hidden"> (abre num novo separador)</span></a>
    </div>
  </div>
</li>
```

Se um preprint for publicado numa revista, mova-o para "Artigos em revista" e troque o link do arXiv pelo DOI.
Ao acrescentar publicações, atualize também o número no cartão "Em resumo" da página inicial (`index.html` e `en/index.html`).

## CV

- **HTML:** edite `cv.html` (PT) e `en/cv.html` (EN). Cada experiência ou formação é um `<li>` dentro de `<ol class="timeline">`.
- **PDF:**
  - `assets/cv-miguel-oliveira.pdf` → CV em inglês (usado na página EN).
  - `assets/cv-miguel-oliveira-pt.pdf` → CV em português (usado na página PT). Se não existir, a página PT usa automaticamente o PDF inglês e o botão mostra "Descarregar CV (EN)".
  - Sem nenhum PDF, o botão aparece desativado ("PDF brevemente" / "PDF coming soon").
- Os nomes dos ficheiros têm de ser exatamente estes, em minúsculas.

### Modo claro / escuro

Por omissão, o site segue a definição do sistema operativo do visitante. O botão ☀/☾ no cabeçalho alterna entre os dois modos, e a escolha fica guardada nesse navegador.
As cores do modo escuro estão em `css/style.css`, na secção `1b. Dark mode`. Há dois blocos com os mesmos valores: um para a escolha manual e outro para a definição do sistema. Se alterar um, altere o outro.
A impressão do CV sai sempre em cores claras.

## CV em PDF (LaTeX)

Os PDFs em `assets/` são gerados a partir das fontes LaTeX `cv-miguel-oliveira.tex` (EN) e `cv-miguel-oliveira-pt.tex` (PT), entregues à parte.

- Compile com **XeLaTeX** (no Overleaf: Menu → Compiler → XeLaTeX). O pdfLaTeX não serve, porque o ficheiro usa `fontspec`.
- A fonte é a **Inter**, se estiver instalada. Caso contrário, é usada automaticamente a TeX Gyre Heros, incluída no TeX Live e no Overleaf.
- Depois de alterar, substitua `assets/cv-miguel-oliveira.pdf` e `assets/cv-miguel-oliveira-pt.pdf`, mantendo exatamente estes nomes.
- A Análise Matemática (2.º semestre 2026/27) está preparada em comentário (linha com `%`) nos dois ficheiros.
- O email aparece no PDF em texto, como é normal num CV. A proteção anti-spam do site não se aplica ao PDF.

## Símbolo da Academia de Matemática

O símbolo no bloco da Academia (página inicial, PT e EN) está escrito diretamente no HTML como SVG, dentro de `<span class="feature-symbol">`. Usa `fill="currentColor"`, por isso fica sempre com a cor de destaque do site e muda sozinho no modo escuro.
- **Tamanho:** `.feature-symbol { width: 4.5rem; }` em `css/style.css`.
- **Cor diferente:** altere `color` na mesma regra.

## Cores e tipografia

Todas as cores estão em `:root`, no topo de `css/style.css`. Para mudar a cor de destaque, altere `--color-accent` e `--color-accent-dark`. O site usa fontes do sistema (rápidas e sem pedidos a servidores externos).

## SEO

Já configurado para `https://bitwisemiguel.github.io/`: `canonical`, `hreflang` (PT/EN), Open Graph com imagem, `sitemap.xml` e `robots.txt`.
Se o endereço mudar (por exemplo, para um domínio próprio), procure e substitua `https://bitwisemiguel.github.io/` em todos os ficheiros.

---

## Fins de linha (CRLF)

Todos os ficheiros de texto (`.html`, `.css`, `.js`, `.md`, `.xml`, `.txt`) usam fins de linha **CRLF** (estilo Windows).
O Git pode convertê-los ao fazer commit, conforme a configuração `core.autocrlf` do seu computador. Para manter CRLF na pasta de trabalho em qualquer computador, pode criar um ficheiro `.gitattributes` na raiz com `* text=auto eol=crlf`. No repositório, o Git guarda os ficheiros com LF, o que é normal e não afeta o site.

## Testar localmente

Abra `index.html` no navegador ou, para testar como no GitHub Pages (incluindo a verificação do PDF):

```bash
python3 -m http.server 8000
```

e abra <http://localhost:8000>. A página `404.html` só funciona corretamente depois de publicada.

## Publicar no GitHub Pages

1. No GitHub (conta `bitwisemiguel`), crie um repositório chamado exatamente **`bitwisemiguel.github.io`**.
2. Carregue o **conteúdo** da pasta `personal-website/` para a raiz do repositório (o `index.html` tem de ficar na raiz).
3. Em **Settings → Pages**: *Deploy from a branch*, branch `main`, pasta `/ (root)`, e guarde.
4. Após um ou dois minutos, o site fica disponível em <https://bitwisemiguel.github.io/>.

Pela linha de comandos:

```bash
cd personal-website
git init
git add .
git commit -m "Initial version of personal website"
git branch -M main
git remote add origin https://github.com/bitwisemiguel/bitwisemiguel.github.io.git
git push -u origin main
```

Cada novo `git push` atualiza o site automaticamente.

### Depois de publicar
- No LinkedIn, coloque o link da versão inglesa (`/en/`) se o público for sobretudo internacional.
- Teste a pré-visualização do link no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

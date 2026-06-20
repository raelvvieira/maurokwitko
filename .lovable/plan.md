1. Hero: remover a classe `gold-glow` do span "Reencarnação, Reforma Íntima e Psicoterapia Reencarnacionista" e limpar os keyframes/estilos `clubeGoldText` exclusivos da hero, voltando a copy ao estado anterior sem gradiente dourado.

2. Card de preço (`pricing-card`): reduzir o dourado a detalhes — manter apenas a borda fina dourada sutil, o divisor interno dourado e o badge "Mais escolhido" dourado. Remover o fundo gradiente dourado, o efeito de brilho (`clubeGoldShine`), a animação dourada no preço e o shadow dourado intenso, retornando o fundo para um branco/neutro com toques leves de dourado.

3. Preço (`price`): voltar à cor padrão do tema (azul escuro `#102448` ou similar) em vez do gradiente dourado animado.

4. Botão CTA do card: permanece verde WhatsApp como está.

Arquivo: `src/pages/public/ClubeDeEstudos.tsx`
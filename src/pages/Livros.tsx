import { motion } from 'framer-motion';
import { BookOpen, ShoppingCart, Tag } from 'lucide-react';

const BOOKS = [
  {
    title: 'Tratando Fobia, Pânico e Depressão com Terapia de Regressão – Ed. 3',
    price: 'R$ 69,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_tratando_fobia_panico_e_depressao_com_terapia_de_regressao_1835_1_cc9de4bf3e9a613e5167d32816bfb1a9.png',
    link: 'https://www.besourobox.com.br/espiritualista/tratando-fobia-panico-e-depressao-com-terapia-de-regressao-ed-3',
  },
  
  {
    title: 'Como Evoluir Espiritualmente em um Mundo de Drogas',
    price: 'R$ 64,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_como_evoluir_espiritualmente_em_um_mundo_de_drogas_1673_1_a7e92ca8c101e3167d46cd0c5ea5edd6.png',
    link: 'https://www.besourobox.com.br/espiritualista/como-evoluir-espiritualmente-em-um-mundo-de-drogas',
  },
  {
    title: 'A Fascinante Vida de Mirta Kassov: As Lições e os Aprendizados de um Terapeuta de Regressão',
    price: 'R$ 54,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/a_fascinante_vida_de_mirta_kassov_as_licoes_e_os_aprendizados_de_um_terapeuta_de_regressao_1689_1_35d6c3157a9b1cd262fdbe912a73de6c.png',
    link: 'https://www.besourobox.com.br/espiritualista/fascinante-vida-de-mirta-kassov-as-licoes-e-os-aprendizados-de-um-terapeuta-de-regressao-a',
  },
  {
    title: '20 Casos de Regressão (Ed. 7)',
    price: 'R$ 69,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_20_casos_de_regressao_historias_reais_de_pessoas_que_recordaram_vidas_passadas_1865_1_497b70762423fd4a00df8d2428976c1e.jpg',
    link: 'https://www.besourobox.com.br/espiritismo/20-casos-de-regressao',
  },
  {
    title: 'Terapia de Regressão: Perguntas e Respostas',
    price: 'R$ 69,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_terapia_de_regressao_perguntas_e_respostas_1997_1_75719c28e45bc5bb1d1928d3b3aadd0d.jpg',
    link: 'https://www.besourobox.com.br/autoconhecimento/terapia-de-regressao/terapia-de-regressao-perguntas-e-respostas',
  },
];

const Livros = () => {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Livros
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Livros físicos do Dr. Mauro Kwitko — disponíveis na Editora BesouroBox
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <Tag className="w-8 h-8 text-accent shrink-0" />
          <div>
            <h3 className="text-base md:text-lg font-bold text-foreground">
              20% de desconto em todos os livros!
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Clique em <strong>Comprar</strong>, monte seu carrinho na BesouroBox e aplique o cupom
              {' '}<span className="inline-block bg-accent/20 text-accent font-mono font-bold px-2 py-0.5 rounded text-sm">MAURO20</span>{' '}
              no checkout para receber o desconto.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {BOOKS.map((book, i) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex flex-col"
          >
            <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-muted">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-3">{book.title}</h3>
            <p className="text-lg font-bold text-primary mb-4 mt-auto">{book.price}</p>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent to-primary text-primary-foreground text-sm font-semibold text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Comprar <ShoppingCart className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Livros;

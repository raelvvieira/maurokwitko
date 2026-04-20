export type Book = {
  slug: string;
  title: string;
  price: string;
  cover: string;
  link: string;
  synopsis?: string;
  videoUrl?: string;
};

export const BOOKS: Book[] = [
  {
    slug: 'tratando-fobia-panico-depressao',
    title: 'Tratando Fobia, Pânico e Depressão com Terapia de Regressão – Ed. 3',
    price: 'R$ 69,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_tratando_fobia_panico_e_depressao_com_terapia_de_regressao_1835_1_cc9de4bf3e9a613e5167d32816bfb1a9.png',
    link: 'https://www.besourobox.com.br/espiritualista/tratando-fobia-panico-e-depressao-com-terapia-de-regressao-ed-3',
    synopsis:
      'Uma obra fundamental que apresenta como a Terapia de Regressão pode ajudar no tratamento de quadros como fobia, pânico e depressão, integrando a visão reencarnacionista ao cuidado emocional. O livro reúne casos reais, reflexões clínicas e o método desenvolvido pelo Dr. Mauro Kwitko ao longo de décadas de prática.',
  },
  {
    slug: 'evoluir-espiritualmente-mundo-de-drogas',
    title: 'Como Evoluir Espiritualmente em um Mundo de Drogas',
    price: 'R$ 64,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_como_evoluir_espiritualmente_em_um_mundo_de_drogas_1673_1_a7e92ca8c101e3167d46cd0c5ea5edd6.png',
    link: 'https://www.besourobox.com.br/espiritualista/como-evoluir-espiritualmente-em-um-mundo-de-drogas',
    synopsis:
      'Um guia espiritual e prático para quem busca compreender — em si mesmo, em familiares ou em pacientes — o impacto das drogas sobre o processo evolutivo. O Dr. Mauro Kwitko discute as raízes profundas do uso de substâncias e mostra caminhos concretos para a libertação e a reforma íntima.',
  },
  {
    slug: 'fascinante-vida-de-mirta-kassov',
    title: 'A Fascinante Vida de Mirta Kassov: As Lições e os Aprendizados de um Terapeuta de Regressão',
    price: 'R$ 54,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/a_fascinante_vida_de_mirta_kassov_as_licoes_e_os_aprendizados_de_um_terapeuta_de_regressao_1689_1_35d6c3157a9b1cd262fdbe912a73de6c.png',
    link: 'https://www.besourobox.com.br/espiritualista/fascinante-vida-de-mirta-kassov-as-licoes-e-os-aprendizados-de-um-terapeuta-de-regressao-a',
    synopsis:
      'Através da história inspiradora de Mirta Kassov, somos conduzidos por uma jornada de aprendizados que iluminam a prática do terapeuta de regressão. Uma obra que combina narrativa, ensinamento e profunda reflexão sobre o sentido da encarnação.',
  },
  {
    slug: '20-casos-de-regressao',
    title: '20 Casos de Regressão (Ed. 7)',
    price: 'R$ 69,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_20_casos_de_regressao_historias_reais_de_pessoas_que_recordaram_vidas_passadas_1865_1_497b70762423fd4a00df8d2428976c1e.jpg',
    link: 'https://www.besourobox.com.br/espiritismo/20-casos-de-regressao',
    synopsis:
      '20 histórias reais de pessoas que recordaram vidas passadas em sessões de Investigação do Inconsciente. Cada caso é um convite a compreender como o passado encarnatório influencia o presente — e como a regressão pode promover cura, autoconhecimento e evolução.',
  },
  {
    slug: 'terapia-de-regressao-perguntas-e-respostas',
    title: 'Terapia de Regressão: Perguntas e Respostas',
    price: 'R$ 69,90',
    cover: 'https://images.tcdn.com.br/img/img_prod/1347031/90_terapia_de_regressao_perguntas_e_respostas_1997_1_75719c28e45bc5bb1d1928d3b3aadd0d.jpg',
    link: 'https://www.besourobox.com.br/autoconhecimento/terapia-de-regressao/terapia-de-regressao-perguntas-e-respostas',
    synopsis:
      'Um livro construído a partir das principais dúvidas de pacientes, terapeutas e estudantes sobre a Terapia de Regressão. Respostas claras, fundamentadas e didáticas que abrem caminho para uma compreensão segura e ética desta poderosa ferramenta de evolução.',
  },
];

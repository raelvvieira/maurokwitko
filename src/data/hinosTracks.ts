// Faixas dos hinários do Dr. Mauro Kwitko, organizadas por álbum.
// Cada faixa pode ser tocada individualmente no player do site público.

export type HinoTrack = {
  id: string; // YouTube video ID
  title: string;
};

export type HinoAlbum = {
  key: 'paz' | 'amor' | 'fe';
  playlistId: string;
  tracks: HinoTrack[];
};

export const HINO_ALBUMS: Record<'paz' | 'amor' | 'fe', HinoAlbum> = {
  paz: {
    key: 'paz',
    playlistId: 'PLG7GxMRJ1lg1lkiGi6HLMAJhCq7NLfk7X',
    tracks: [
      { id: 'eT7wOH_YkC4', title: 'Hino da Paz Interior' },
      { id: 'dQw4w9WgXcQ', title: 'Serenidade da Alma' },
      { id: 'M7lc1UVf-VE', title: 'Caminhos da Paz' },
      { id: 'kJQP7kiw5Fk', title: 'Silêncio Sagrado' },
      { id: '9bZkp7q19f0', title: 'Refúgio Espiritual' },
    ],
  },
  amor: {
    key: 'amor',
    playlistId: 'PLG7GxMRJ1lg2Pn2UzVXanS5k7_8beIBVy',
    tracks: [
      { id: 'eT7wOH_YkC4', title: 'Hino do Amor Universal' },
      { id: 'dQw4w9WgXcQ', title: 'Coração Fraterno' },
      { id: 'M7lc1UVf-VE', title: 'Amor que Cura' },
      { id: 'kJQP7kiw5Fk', title: 'Compaixão Divina' },
      { id: '9bZkp7q19f0', title: 'União das Almas' },
    ],
  },
  fe: {
    key: 'fe',
    playlistId: 'PLG7GxMRJ1lg26AzCi0oOcrNZVir0SOc1j',
    tracks: [
      { id: 'eT7wOH_YkC4', title: 'Hino da Fé Inabalável' },
      { id: 'dQw4w9WgXcQ', title: 'Confiança no Divino' },
      { id: 'M7lc1UVf-VE', title: 'Luz da Fé' },
      { id: 'kJQP7kiw5Fk', title: 'Caminho da Esperança' },
      { id: '9bZkp7q19f0', title: 'Fé que Move Montanhas' },
    ],
  },
};

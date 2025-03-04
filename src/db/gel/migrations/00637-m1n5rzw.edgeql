CREATE MIGRATION m1n5rzwswxyhqot3ihjw6hpj6lvy6gt5a7f4dwldvelpdqt22bop7q
    ONTO m14ntfxpukrnwufvqfm22lsafsoccvktffu5zosjrhqeqavgosrzba
{
              ALTER TYPE app_cm::CmClient {
      DROP LINK owner;
  };
};

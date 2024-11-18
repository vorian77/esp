CREATE MIGRATION m1nax25j4xtss63qe2rqplvub5wftpso3o5qpgzkwokn4rxojiygsq
    ONTO m12yydjezmngtg2lxdo26w33dadwdxfh4ce2lenxkvxyc5uhw2iyuq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE PROPERTY idxDemo: std::int64;
  };
};

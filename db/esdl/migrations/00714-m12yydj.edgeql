CREATE MIGRATION m12yydjezmngtg2lxdo26w33dadwdxfh4ce2lenxkvxyc5uhw2iyuq
    ONTO m1ekr7p5x2srb6oohelw7dx7wgoanrrsisoiw37dvc2lh2hl3my4ka
{
  ALTER TYPE app_cm::CmClient {
      DROP PROPERTY ssn;
  };
  ALTER TYPE org_moed::MoedParticipant {
      CREATE REQUIRED PROPERTY idxDemo: std::int64 {
          SET REQUIRED USING (<std::int64>{});
      };
  };
};

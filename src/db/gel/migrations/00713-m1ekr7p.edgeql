CREATE MIGRATION m1ekr7p5x2srb6oohelw7dx7wgoanrrsisoiw37dvc2lh2hl3my4ka
    ONTO m1uyrxrj4xwgpkxeroymee73ruobhuwofq5ndm4exlsj5xvvusalwa
{
              ALTER TYPE app_cm::CmClient {
      CREATE PROPERTY ssn: std::str;
  };
  ALTER TYPE org_moed::MoedParticipant {
      ALTER PROPERTY ssn {
          DROP OWNED;
          RESET TYPE;
      };
  };
};

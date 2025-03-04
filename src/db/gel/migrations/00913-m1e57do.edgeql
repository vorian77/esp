CREATE MIGRATION m1e57doej2nluofzujlytv6bm4iwp54t4ut6niu7lqto5o5tvlmm3q
    ONTO m1wkes6ttzpfkm3blro4ux7kwhq2cjytua2cze4tazzvdsqbplvuia
{
  ALTER TYPE default::SysPerson {
      CREATE PROPERTY genderSelfId: std::str;
  };
};

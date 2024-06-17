CREATE MIGRATION m1o5kqvvuf4rkb3fkxze353yqawpsb3oe5pt5dxi6g2svemytalewq
    ONTO m1a4ma6znsxo6wn2yzph6slktje5kcz3dgiiy6w7zuyibrzjrumkfa
{
  ALTER TYPE app_cm_analytic::CmAnalyticDoc {
      CREATE PROPERTY order: std::int16;
  };
};

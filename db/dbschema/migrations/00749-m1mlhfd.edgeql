CREATE MIGRATION m1mlhfdb7pc4zttwkq3moqbs57yukertrpdap35x5rsi3532h4c7jq
    ONTO m1g4jygsbiesrtf2746o2rkw5nqq6zfdwtyjkzckwwqewnq5cn5qpq
{
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE PROPERTY fileOld: std::json;
  };
};

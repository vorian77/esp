CREATE MIGRATION m1g4jygsbiesrtf2746o2rkw5nqq6zfdwtyjkzckwwqewnq5cn5qpq
    ONTO m16xctf3xoeocoe2ol37pnni2ewmvlathkdm476ufkg56cg3sm6bpq
{
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE PROPERTY fileNew: std::json;
  };
};

CREATE MIGRATION m13bhyfzjwult2s6zbccaxnopdua2jbjw6ny2gyfxwkg34ra7votma
    ONTO m1u6uwzptbmdqk2lqr4klikw6nzlnxvxu3usteivzmfch56x2pzcnq
{
  DROP FUNCTION sys_core::getDataObjFieldEmbedDetail(name: std::str);
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldEmbedDetail;
  };
  DROP TYPE sys_core::SysDataObjFieldEmbedDetail;
};

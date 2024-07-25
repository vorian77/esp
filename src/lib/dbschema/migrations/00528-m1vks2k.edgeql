CREATE MIGRATION m1vks2kigapvl2dyj3537gqglkyg6t2j3srt4ocqeruwponcwlpn6q
    ONTO m1b3qfc5gypxia53nqxrzooyu57mxiygok3mj5jwvv6fmn3jnfywea
{
  ALTER TYPE sys_core::SysDataObjFieldEmbedListEdit {
      DROP LINK parmValueColumnType;
      DROP LINK parmValueColumnValue;
  };
};

CREATE MIGRATION m1tkq7u4kcadmgx7vmdptd7ns6x742fcb7pfstrlvsshdsu2r2v4ga
    ONTO m1ccq4xfa5bwfbf7fjchotgrzrdw7hhmsoztd7acwsw3pn7ntrbz5q
{
                  CREATE FUNCTION sys_core::getDataObjFieldEmbedListConfig(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListConfig USING (SELECT
      sys_core::SysDataObjFieldEmbedListConfig
  FILTER
      (.name = name)
  );
};

CREATE MIGRATION m144lcz3y3pvfwntbb532jpoo3ckscuux4n26utvhhgfa2lqmxavgq
    ONTO m17kudhstssgrp2ss23fg5uwisgujmr64qyltf2wr7u7oi5llyg4sq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY isPropertyLink {
          RENAME TO isLinkProperty;
      };
  };
};

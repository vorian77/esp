CREATE MIGRATION m17kudhstssgrp2ss23fg5uwisgujmr64qyltf2wr7u7oi5llyg4sq
    ONTO m1m5zjsilkh2iov6olf2kbfxaauaynbjaukymy3lcb2iqartuo3q7a
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY isPropertyLink: std::bool;
  };
};

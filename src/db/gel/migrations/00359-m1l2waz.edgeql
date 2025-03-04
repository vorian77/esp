CREATE MIGRATION m1l2waz7mjcfdvwniwygekuz4p24xzvxhsuqokckkzp666b2q3yfga
    ONTO m1qhh46a72hky2jvj323empzvo7vp76nwc2acegpenf52voh2uwuzq
{
                  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isListEdit: std::bool;
  };
  ALTER TYPE sys_rep::SysRepUserEl {
      DROP LINK column;
  };
};

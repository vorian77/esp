CREATE MIGRATION m1lzojnv4sztaqiyszjkekn6mfg3x63duycilcnyt46f6ruf3xvq7a
    ONTO m1jtfawgd4w2u5nmdodgposdxrplfke7f2hmytfcwcoaazmyrkfysq
{
  ALTER TYPE sys_core::SysDataObjActionField {
      CREATE LINK codeColor: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjActionField {
      DROP PROPERTY color;
  };
};

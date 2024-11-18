CREATE MIGRATION m1cyyrzrcsbhtyjcaqa2a5hs3i7nqtrfzu72oalktyhhs53oikohvq
    ONTO m1xn4j6bv723x2kdrtrwcsdz3rz6jia6r7r2c7g6f7n52f6t2ddlva
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK codeAlignment: sys_core::SysCode;
  };
};

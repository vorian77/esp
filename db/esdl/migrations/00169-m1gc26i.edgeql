CREATE MIGRATION m1gc26id37o22jjwqyv62mjnqezpi4h24udgpib7cd3tt5gy372hoq
    ONTO m1n223ase3biamxcprtsd4hhbgjhglck5i3tgxoowcexfini7tp2lq
{
                  ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE LINK codeType: sys_core::SysCode;
  };
};

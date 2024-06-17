CREATE MIGRATION m1n223ase3biamxcprtsd4hhbgjhglck5i3tgxoowcexfini7tp2lq
    ONTO m1t2cfeezzy7z44yja77kn5644ne7gfgldkfhddt32hbdcyesk2pzq
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER PROPERTY exprSelect {
          RESET OPTIONALITY;
      };
  };
};

CREATE MIGRATION m1hepji4opo5svoal5oorvs7ivecwtbctxlpccz2fmiaxlq2qdat4q
    ONTO m1tdo6lds35d4poodmvlqiggolbwdzeeu2lce36tr4tbyjfrkquqma
{
                  ALTER TYPE sys_rep::SysRep {
      DROP LINK table;
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE MULTI LINK tables: sys_core::SysDataObjTable {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      CREATE PROPERTY indexTable: default::nonNegative;
  };
};

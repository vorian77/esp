CREATE MIGRATION m12pn6x4sucz2qxsm6xcoxyzin3n2xqxfvhqam2fthawq5h7fhw3aa
    ONTO m1icgpv37usmr3ctsnfgtunrflqbmrn6zeum4q5pxc5tciqnwkagva
{
  ALTER TYPE sys_db::SysColumn {
      ALTER LINK linkTable {
          RENAME TO columnLinkTable;
      };
  };
};

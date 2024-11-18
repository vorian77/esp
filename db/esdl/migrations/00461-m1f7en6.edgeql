CREATE MIGRATION m1f7en6rjsdyrapdd4tmgk57znt2egh2lnsjdgidlvxhae3adbcjyq
    ONTO m1ra6gtsl6caouua4qnqqsqdh7n6an25hycqnhyvidkaqhobt2zmla
{
  ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      CREATE REQUIRED PROPERTY expr: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      DROP PROPERTY hasItems;
  };
};

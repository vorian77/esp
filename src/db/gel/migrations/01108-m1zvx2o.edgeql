CREATE MIGRATION m1zvx2okrpquld5uczc6vtcntaddkh23tqiucopsvdo67fnefcwkpa
    ONTO m1is66ybf6pgzgrlh4utqqe5b2j2bi44jff5gealtmvis74mudgxkq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK parentColumn {
          RENAME TO parentColumnOld;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK parentTable {
          RENAME TO parentTableOld;
      };
  };
  ALTER TYPE sys_core::SysObjDb {
      CREATE PROPERTY listEditPresetExpr: std::str;
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY listEditPresetExpr {
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY parentFilterExpr {
          RENAME TO listEditPresetExprOld;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY parentFilterExprOld: std::str;
  };
};

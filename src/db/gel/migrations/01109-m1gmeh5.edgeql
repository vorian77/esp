CREATE MIGRATION m1gmeh5x7nresulk2texo6bkouw2bww5nfrl55gefklf2zr42vxxva
    ONTO m1zvx2okrpquld5uczc6vtcntaddkh23tqiucopsvdo67fnefcwkpa
{
  ALTER TYPE sys_core::SysObjDb {
      CREATE LINK parentColumn: sys_db::SysColumn;
      CREATE LINK parentTable: sys_db::SysTable;
      CREATE PROPERTY parentFilterExpr: std::str;
  };
};

CREATE MIGRATION m1zvuwwb6kw7ujmqueeoox4bsv3kvy2uvwvfqx3msaribaul2mdfsq
    ONTO m1u72szved7eae72sepavce32kng6d2n5w4qo4mkqgregaya47fpaq
{
              ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      CREATE REQUIRED LINK columns: sys_core::SysDataObjColumn {
          SET REQUIRED USING (<sys_core::SysDataObjColumn>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      DROP PROPERTY expr;
  };
  ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      DROP PROPERTY name;
  };
  ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      CREATE PROPERTY orderDisplay := (0);
  };
};

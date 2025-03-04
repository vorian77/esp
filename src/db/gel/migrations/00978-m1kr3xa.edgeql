CREATE MIGRATION m1kr3xaroxapv2ury4m557ig4hqzqts75ergeixgrljutqozutvdka
    ONTO m1nqjodagtvfotfzh3rmcgc7ulyrfkuzh6xayw24xz3tmy6ksdjr5q
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK actionRider;
      DROP LINK actionsQuery;
  };
  DROP TYPE sys_core::SysDataObjActionQuery;
  DROP TYPE sys_core::SysDataObjActionQueryParm;
  DROP TYPE sys_core::SysDataObjActionQueryTrigger;
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK actionRider;
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      CREATE LINK codeFunction: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      DROP PROPERTY hasCustomLogic;
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER PROPERTY logicParmKey {
          RENAME TO functionParmKey;
      };
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER PROPERTY logicParmValue {
          RENAME TO functionParmValue;
      };
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      DROP PROPERTY name;
  };
  DROP TYPE sys_user::SysUserActionRider;
};

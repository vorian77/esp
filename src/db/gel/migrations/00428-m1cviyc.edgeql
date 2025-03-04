CREATE MIGRATION m1cviycbljdoyyoaiq5mjv5snpmhgps4sohre4wqwlncrqmv55kvsa
    ONTO m1hmgxnp3mou5uyt55sixgtk45idq22ndd7kgfi6fckw4pdkfec7jq
{
              ALTER TYPE sys_core::SysDataObjActionFieldGroupItem {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY orderDesign: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObjColumnItem {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnLink {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_migr::SysMigrTargetColumn {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_migr::SysMigrTargetTable {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_rep::SysRepParm {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_rep::SysRepUser {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
  ALTER TYPE sys_rep::SysRepUserEl {
      ALTER PROPERTY order {
          RENAME TO orderDesign;
      };
  };
};

CREATE MIGRATION m1gv4crsp3h75k44tquckjxynxvobcculm54fpdu4t7gzubukvvy2a
    ONTO m1cviycbljdoyyoaiq5mjv5snpmhgps4sohre4wqwlncrqmv55kvsa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY dbOrderCrumb {
          RENAME TO orderCrumb;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY dbOrderSort {
          RENAME TO orderSort;
      };
  };
};

CREATE MIGRATION m1zsu4kykrgj4bebjomajquzem3zsmkjnvzlqibqsukyeohdqtttfq
    ONTO m1h5uc3jc72sikfxgkraehnsqumjcsn7vpuuclnlt24c5a742aop5q
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE MULTI LINK props1: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};

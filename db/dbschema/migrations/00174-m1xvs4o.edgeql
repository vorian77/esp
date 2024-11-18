CREATE MIGRATION m1xvs4oxyoem3iebigezi73ptkz2rxbsy42cglstaiw43tt73kkfda
    ONTO m1duj3rsaq6cu4r5ub2fhusa3sfqo5pihebq374mkas7ru6z636liq
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP PROPERTY exprWith;
      DROP PROPERTY exprWithProperty;
  };
};

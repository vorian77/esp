CREATE MIGRATION m1xjfio572jxkutqojnkai5iqwqxj3xnv66vyxztvgacv6s7cst5ga
    ONTO m1kndmsevd6mvufvhrzhuxiqm4mhm24q5hlpo3ctpvviglsw4xsw7a
{
  ALTER TYPE sys_core::SysObjDb {
      DROP PROPERTY exprFilterCurrentValue;
  };
};

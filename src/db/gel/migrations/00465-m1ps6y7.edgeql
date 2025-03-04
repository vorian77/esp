CREATE MIGRATION m1ps6y73lkj5gu4pqoc2amwtj7vumo2rekd4zrc62qfe5tr52tbv7a
    ONTO m1p3n43cyeox6roftkkw7bw3uk2hdf3qcslidm3twoisyla2zqnthq
{
              ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      DROP PROPERTY test;
  };
};

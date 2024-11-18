CREATE MIGRATION m1nq76ra6p56c5fgudsvioht6r22rpnxicufveh4sdaocec77s74dq
    ONTO m1hepji4opo5svoal5oorvs7ivecwtbctxlpccz2fmiaxlq2qdat4q
{
  ALTER TYPE sys_core::SysDataObjTable {
      DROP PROPERTY order;
  };
};

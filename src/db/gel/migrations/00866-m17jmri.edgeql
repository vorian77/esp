CREATE MIGRATION m17jmrirzl4wbc3aqtsvk73icogjbrudgirmaazwr4hsj2ohjas2fa
    ONTO m1cpsslxh4y5sx6ails4oohtz5r5w6kevnp5hyiruw5okzrdingfuq
{
  ALTER TYPE default::SysPerson {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::ObjRoot LAST;
  };
};

CREATE MIGRATION m1nhljmwcdinbgm32tmxcr3oyv27z2guj6k2m5czu55ppj67khlnlq
    ONTO m1l5ojzrtjiwxouwov5jnmtn6ozv4bogiw4j7g4sukxswhsx4jfvhq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK linkColumns;
  };
};

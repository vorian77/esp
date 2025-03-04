CREATE MIGRATION m1yqxlpgasbkmczcvbi4d4rwc6nkykfvak3vkgdzmopapjrz5q3bbq
    ONTO m1suh53e2bdnapxrzdn77x2mdd5il22hu3ugq42aee55u4kz5ioqoq
{
  ALTER TYPE sys_core::SysMsg {
      CREATE PROPERTY date: cal::local_date;
  };
};

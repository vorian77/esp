CREATE MIGRATION m1cay5ot27vviq6pkzbsqw5tpblnniheau6ol25wzp7aidhstroyla
    ONTO m1e32k7g6uevgynlr7xouhdex22nxloe3nkjfs5hfixbyxojhuwglq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjDb LAST;
  };
};

CREATE MIGRATION m1qwlba5efg6bj5goq7vwrwdtjxvwl3pbgvllv4vukybedpzled4ya
    ONTO m1l7uip2j3rmmmzloqyxqiv4cf7f2rr4u2ivbglrkw4yf6su7gaita
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customColIsSubHeader: std::bool;
  };
};

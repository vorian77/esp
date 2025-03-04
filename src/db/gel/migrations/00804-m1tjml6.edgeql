CREATE MIGRATION m1tjml6co3uhkt733gdzmnrkhuuuor2max2aaciou6jdpa2b7lryzq
    ONTO m1mlc4zrncued7vdjrxdqknqunrt5xptd4tdjd6fz53jbk2e5ioz7a
{
          ALTER TYPE sys_core::SysAppHeader {
      DROP LINK codeIcon1;
  };
  ALTER TYPE sys_core::SysNodeObj {
      DROP LINK codeIcon1;
  };
  ALTER TYPE sys_user::SysTask {
      DROP LINK codeIcon1;
  };
};

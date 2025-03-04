CREATE MIGRATION m1ajxy7zb3gbo2vm2wht3yky4c3hzo4bfq4oqcvkukn4eayhec6diq
    ONTO m14eiigerhv6k6xhqtrlgyyxmvphpw64mzohjqu3yfzdrgmxrarala
{
              ALTER TYPE sys_db::SysColumn {
      ALTER LINK codeAlignment {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_rep::SysRepParm {
      ALTER LINK codeParmType {
          RENAME TO codeFieldElement;
      };
  };
};

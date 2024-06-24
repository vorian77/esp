CREATE MIGRATION m1pqrj3we2kcl3c3xagbyag4sywrai4w4fa25vzjlflay7wnezfqyq
    ONTO m1ajxy7zb3gbo2vm2wht3yky4c3hzo4bfq4oqcvkukn4eayhec6diq
{
  ALTER TYPE sys_rep::SysRepParm {
      CREATE REQUIRED LINK codeAlignment: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      CREATE REQUIRED LINK codeDataType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      CREATE LINK codeSortDir: sys_core::SysCode;
  };
};

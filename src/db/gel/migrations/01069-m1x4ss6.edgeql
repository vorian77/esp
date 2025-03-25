CREATE MIGRATION m1x4ss6xulk3tanhrqcriwnfxrgel4ktmgxgqs36y75vvcbbd6xv5q
    ONTO m1khwdvo4c7drr5cnb6dcl7jh4qchtfwo5psrldg4lmkiqpbb6rlia
{
  ALTER TYPE sys_core::SysAttr {
      ALTER LINK codeAttrType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};

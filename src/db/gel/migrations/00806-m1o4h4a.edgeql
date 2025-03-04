CREATE MIGRATION m1o4h4agbbw533mpz2ykxv4yhav2evtcxrkgfwdsnd34t77yr23poq
    ONTO m1h6uocoeomncgvadpoy7e5usut6jkz4rvmkgftp2nuebydnc4sdpa
{
          ALTER TYPE sys_core::SysCode {
      CREATE MULTI LINK codeTypeFamily: sys_core::SysCodeType;
  };
};

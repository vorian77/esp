CREATE MIGRATION m1ooynv2h7xqbe7cdbtskpcjvpnw77wrkc3gxf6rxfeqxi5yxjzt3a
    ONTO m1hjfjuqeoprkwabfj3tlwsnrahbthgkcbkxkmh2tw46uth2nij6sq
{
  CREATE TYPE sys_core::SysApp EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK appHeader: sys_core::SysAppHeader;
      CREATE MULTI LINK nodes: sys_core::SysNodeObj;
  };
};

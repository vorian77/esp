CREATE MIGRATION m1rzllsr3q4uqifmaxoky3jyl6vrp3o3lzjpmc3a4cklg54ww5i4tq
    ONTO m15e2jzszgusgyj45x2lpxcb6m26nzmlcagmkuomqhralxunzufzdq
{
  CREATE TYPE sys_core::SysObjSubject EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
  };
};

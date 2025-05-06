CREATE MIGRATION m1xm2if57x5unyfjpy4prvaivnukymmlao23siydzqpo3qwo76wvrq
    ONTO m1qfu2qum7olvluqcl2ko54iegiibjm5lmnn27lkqa3koa4dy5dwmq
{
  CREATE TYPE sys_core::SysAttrObjAction EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeAttrActionType: sys_core::SysCode;
      CREATE REQUIRED LINK obj: sys_core::ObjRootCore;
  };
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK attrObjAccesses: sys_core::SysAttrObjAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK attrObjActions: sys_core::SysAttrObjAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysAttrObjAccess EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeAttrAccessType: sys_core::SysCode;
      CREATE REQUIRED LINK obj: sys_core::ObjRootCore;
  };
};

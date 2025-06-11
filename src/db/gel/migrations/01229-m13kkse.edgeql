CREATE MIGRATION m13kksexko5c42m2cdzq76zesa2j7votbuv6rqqyas6z5kjpx5fmsa
    ONTO m1wy5krqnlfuxcnixz6tiiuyvkipitcd43llm5vpfra35kgsk2mg2q
{
  ALTER TYPE sys_core::SysNodeObj {
      DROP LINK childrenOld;
  };
  ALTER TYPE sys_core::SysNodeObjChild {
      DROP LINK codeAttrType;
  };
  CREATE TYPE sys_core::SysNodeObjConfig {
      CREATE REQUIRED LINK codeAttrType: sys_core::SysCode;
      CREATE REQUIRED LINK nodeObj: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE sys_core::SysSystem {
      CREATE MULTI LINK nodesConfig: sys_core::SysNodeObjConfig {
          ON SOURCE DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysSystem {
      DROP LINK codeAttrTypes;
  };
};

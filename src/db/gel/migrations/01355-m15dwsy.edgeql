CREATE MIGRATION m15dwsytajxats553gurp44f74nexbg2ckf6xap57tjvlvy7jcrlka
    ONTO m1xjfio572jxkutqojnkai5iqwqxj3xnv66vyxztvgacv6s7cst5ga
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY description;
  };
  CREATE TYPE sys_core::SysEligibilityNode EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeEligibilityType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY exprState: std::str;
      CREATE REQUIRED PROPERTY nodeId: default::nonNegative;
      CREATE PROPERTY nodeIdParent: default::nonNegative;
      CREATE PROPERTY order: default::nonNegative;
  };
  CREATE TYPE sys_core::SysEligibility EXTENDING sys_core::SysObj {
      CREATE MULTI LINK nodes: sys_core::SysEligibilityNode {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY exprUpdate: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK eligibility: sys_core::SysEligibility {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};

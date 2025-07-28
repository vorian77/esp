CREATE MIGRATION m1hof4rragqxtt3oxzkpzjrwas6ndmdgzv4ckcgoezk675dis7dzca
    ONTO m1s7bttqfkbpuxr7k7env22dtwtyqjbagljhxlpdtp2w3x6l5q73oa
{
  ALTER TYPE sys_core::SysEligibility {
      CREATE LINK codeAttrType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  CREATE TYPE sys_core::SysEligibilityNodeValue EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK node: sys_core::SysEligibilityNode;
      CREATE REQUIRED PROPERTY value: std::bool;
  };
  CREATE TYPE app_cm::CmCsfEligibility EXTENDING app_cm::CmCsfData {
      CREATE LINK eligibility: sys_core::SysEligibility {
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK nodesValue: sys_core::SysEligibilityNodeValue {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK eligibility: sys_core::SysEligibility {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK eligibility;
  };
  ALTER TYPE sys_core::SysEligibility {
      ALTER LINK codeAttrType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};

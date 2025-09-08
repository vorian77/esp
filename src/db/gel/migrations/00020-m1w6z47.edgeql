CREATE MIGRATION m1w6z47vkkejxlgrkqamip7drv6kp6hrcnlemk54w75zg6t4jo52da
    ONTO m1gfk6yhg63jfwngps5hj5exj6kx5mwra2acwu2xcbsh765thodrga
{
  CREATE TYPE app_crm::CrmSuggestion EXTENDING sys_core::ObjRootCore, sys_user::Mgmt {
      CREATE REQUIRED LINK codeSuggestionImportance: sys_core::SysCode;
      CREATE REQUIRED LINK codeSuggestionStatus: sys_core::SysCode;
      CREATE REQUIRED LINK ownerOrg: sys_core::SysOrg;
      CREATE REQUIRED LINK ownerSys: sys_core::SysSystem;
      CREATE LINK user: sys_user::SysUser;
      CREATE REQUIRED PROPERTY isSuggestionFollowUp: std::bool;
      CREATE PROPERTY suggestionEmail: std::str;
      CREATE PROPERTY suggestionTextBenefit: std::str;
      CREATE PROPERTY suggestionTextOutcome: std::str;
      CREATE PROPERTY suggestionTextProblem: std::str;
      CREATE PROPERTY suggestionTextSolution: std::str;
  };
};

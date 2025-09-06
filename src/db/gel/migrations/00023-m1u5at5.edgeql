CREATE MIGRATION m1u5at52wsds6iert447qx7qw6g6qelxahoy6pt24sxwy3s2zimsiq
    ONTO m1fyjm4lphj6tjffhlqygqwsmpnvcwig5e56olzyml7rtoax2yn2xq
{
  CREATE TYPE app_crm::CrmSuggestion EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_crm_suggestion'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE REQUIRED LINK codeSuggestionImportance: sys_core::SysCode;
      CREATE REQUIRED LINK codeSuggestionStatus: sys_core::SysCode;
      CREATE REQUIRED LINK ownerOrg: sys_core::SysOrg;
      CREATE LINK user: sys_user::SysUser;
      CREATE REQUIRED PROPERTY isSuggestionFollowUp: std::bool;
      CREATE PROPERTY suggestionEmail: std::str;
      CREATE PROPERTY suggestionTextBenefit: std::str;
      CREATE PROPERTY suggestionTextOutcome: std::str;
      CREATE PROPERTY suggestionTextProblem: std::str;
      CREATE PROPERTY suggestionTextSolution: std::str;
  };
};

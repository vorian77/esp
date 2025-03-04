CREATE MIGRATION m15etax34ihedw3ysopfuvbcmn3rluoogicrwllntnfitxxyqu3hha
    ONTO m1mv7gaybvphdd4xa3ypyxpwysobdtin4g5ifq5doup4u46ooly73q
{
  CREATE TYPE app_cm::CmGroup EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeGroupEnrollment: sys_core::SysCode;
      CREATE REQUIRED LINK codeGroupType: sys_core::SysCode;
      CREATE LINK userMgr: sys_user::SysUser;
      CREATE PROPERTY dateEnd: cal::local_date;
      CREATE REQUIRED PROPERTY dateStart: cal::local_date;
      CREATE REQUIRED PROPERTY isActive: std::bool;
  };
  CREATE TYPE app_cm::CmCsfGroup EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK cmGroup: app_cm::CmGroup;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY actionAlertMsg;
  };
  CREATE TYPE sys_core::SysDataObjQueryRider EXTENDING sys_user::Mgmt {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeQueryType: sys_core::SysCode;
      CREATE REQUIRED LINK codeTriggerTiming: sys_core::SysCode;
      CREATE LINK codeUserDestination: sys_core::SysCode;
      CREATE LINK codeUserMsgDelivery: sys_core::SysCode;
      CREATE REQUIRED PROPERTY isCustomLogic: std::bool;
      CREATE PROPERTY parmKey: std::str;
      CREATE PROPERTY parmValue: std::str;
      CREATE PROPERTY userMsg: std::str;
  };
  ALTER TYPE sys_user::SysUserAction {
      DROP PROPERTY actionAlertMsg;
  };
};

module sys_rep {
  type SysAnalytic extending sys_core::SysObj {
    description: str;
    multi parms: sys_rep::SysRepParm {
      on source delete delete target;
      on target delete allow;
    };
    multi statuses: sys_rep::SysAnalyticStatus {
      on source delete delete target;
      on target delete allow;
    };
    constraint exclusive on (.name);
  }
  
  type SysAnalyticStatus extending sys_user::Mgmt{
    required codeStatus: sys_core::SysCode;
    comment: str;
    expr: str;
  }

  type SysRep extending sys_core::SysObj {
    required actionFieldGroup: sys_core::SysDataObjActionFieldGroup;
    multi analytics: sys_rep::SysAnalytic;
    description: str;
    multi elements: sys_rep::SysRepEl {
      on source delete delete target;
      on target delete allow;
    };
    exprFilter: str;
    exprObject: str;
    exprSort: str;
    multi parms: sys_rep::SysRepParm {
      on source delete delete target;
      on target delete allow;
    };
    multi tables: sys_core::SysDataObjTable {
      on source delete delete target;
      on target delete allow;
    };
    constraint exclusive on (.name);
  }

  type SysRepEl extending sys_user::Mgmt{
    codeAlignment: sys_core::SysCode;
    codeDataType: sys_core::SysCode;
    codeDbDataSourceValue: sys_core::SysCode;
    codeFieldElement: sys_core::SysCode;
    required codeReportElementType: sys_core::SysCode;
    codeSortDir: sys_core::SysCode;
    column: sys_db::SysColumn;  
    description: str;
    exprCustom: str;
    header: str;
    indexTable: default::nonNegative;
    isDisplay: bool;
    isDisplayable: bool;
    multi linkColumns: sys_core::SysDataObjColumnLink{
      on source delete delete target;
      on target delete allow;
    };
    nameCustom: str;
    required orderDefine: default::nonNegative;
    orderDisplay: default::nonNegative;
    orderSort: default::nonNegative;
  }
  
  type SysRepParm extending sys_user::Mgmt{
    required codeDataType: sys_core::SysCode;
    required codeFieldElement: sys_core::SysCode;
    description: str;
    exprFilter: str;
    fieldListItems: sys_core::SysDataObjFieldListItems;
    fieldListItemsParmName: str;
    required header: str;
    required isMultiSelect: bool;
    required isRequired: bool;
    required name: str;
    required orderDefine: default::nonNegative;
  }

  type SysRepUser extending sys_user::Mgmt {
    multi analytics: sys_rep::SysRepUserAnalytic {
      on source delete delete target;
      on target delete allow;
    };
    descriptionUser: str;
    required headerUser: str;
    required orderDefine: default::nonNegative;
    multi parms: sys_rep::SysRepUserParm{
      on source delete delete target;
      on target delete allow;
    };
    required report: sys_rep::SysRep{
      on target delete delete source;
    };
    required user: sys_user::SysUser;
  }

  type SysRepUserAnalytic extending sys_user::Mgmt {
    required analytic: sys_rep::SysAnalytic {
      on target delete delete source;
    };
    multi parms: sys_rep::SysRepUserParm {
      on source delete delete target;
      on target delete allow;
    };
  }
  
  type SysRepUserParm extending sys_user::Mgmt {
    required parm: sys_rep::SysRepParm {
      on target delete delete source;
    };
    parmValue: json;
  }

  # FUNCTIONS
  function getAnalytic(name: str) -> optional sys_rep::SysAnalytic
    using (select sys_rep::SysAnalytic filter .name = name);

  function getReport(name: str) -> optional sys_rep::SysRep
    using (select sys_rep::SysRep filter .name = name);    
}
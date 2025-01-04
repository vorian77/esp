module sys_user {
  abstract type Mgmt {
    required createdAt: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };
    required createdBy: sys_user::SysUser {
      readonly := true;
    };
    modifiedAt: datetime {
      rewrite insert, update using (datetime_of_transaction())
    }
    required modifiedBy: sys_user::SysUser;
  }

   type SysTask extending sys_core::SysObj {
    btnStyle: str;
    required codeCategory: sys_core::SysCode;
    codeRenderType: sys_core::SysCode;
    codeStatusObj: sys_core::SysCode;
    description: str;
    exprShow: str;
    exprStatus: str;
    hasAltOpen: bool;
    isPinToDash: bool;
    pageDataObj: sys_core::SysDataObj;
    targetDataObj: sys_core::SysDataObj;
    targetNodeObj: sys_core::SysNodeObj;
    constraint exclusive on (.name);
  }
  
  type SysUser extending sys_user::Mgmt {
    required defaultOrg: sys_core::SysOrg;
    required defaultSystem: sys_core::SysSystem;
    isMobileOnly: bool;
    required multi orgs: sys_core::SysOrg {
      on target delete allow;
    };
    required owner: sys_core::SysOrg;
    required person: default::SysPerson {
      on source delete delete target if orphan;
    };
    required password: str {
      default := (SELECT <str>uuid_generate_v4());
    };
    required multi systems: sys_core::SysSystem;
    userName: str;
    multi userTypes: sys_user::SysUserType {
      on target delete allow;
    };
    constraint exclusive on (.userName);
  }

  type SysUserPref extending sys_user::Mgmt {
    required user: sys_user::SysUser;
    required idFeature: uuid;
    required data: json;
    constraint exclusive on ((.user, .idFeature));
  }

   type SysUserPrefType extending sys_user::Mgmt {
    required codeType: sys_core::SysCode;
    required isActive: bool;
    required user: sys_user::SysUser;
    constraint exclusive on ((.user, .codeType));
  }
  
  type SysUserType extending sys_core::SysObj {
    isSelfSignup: bool;
    multi resources: sys_user::SysUserTypeResource {
      on source delete delete target;
    };
    multi tags: sys_core::SysCode;
    users := .<userTypes[is sys_user::SysUser];
    constraint exclusive on ((.name));
  }

  type SysUserTypeResource {
    required codeType: sys_core::SysCode;
    required resource: sys_core::SysObj;
  }
  
  type SysWidget extending sys_core::SysObj {
    constraint exclusive on (.name);
  }

  # GLOBALS
  global currentUserId: uuid;

  global currentUser := (
    select sys_user::SysUser filter .id = global currentUserId
  );

  # FUNCTIONS
   function getRootUser() -> optional sys_user::SysUser
    using (select assert_single((select sys_user::SysUser filter .userName = '*ROOTUSER*')));
  
  function getUserById(userId: str) -> optional sys_user::SysUser
      using (select sys_user::SysUser filter .id = <uuid>userId);

  function getUserByName(userName: str) -> optional sys_user::SysUser
      using (select sys_user::SysUser filter .userName = userName);

  function getUserType(userTypeName: str) -> optional sys_user::SysUserType
    using (select sys_user::SysUserType filter .name = userTypeName);

  function getWidget(widgetName: str) -> optional sys_user::SysWidget
    using (select sys_user::SysWidget filter .name = widgetName);
}

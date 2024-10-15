module sys_user {
  abstract type Mgmt {
    required createdAt: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };
    required createdBy: sys_user::SysUser {
      readonly := true;
    };
    required modifiedAt: datetime {
      rewrite insert, update using (datetime_of_transaction())
    }
    required modifiedBy: sys_user::SysUser;
  }
  
  type SysStaff extending sys_user::Mgmt {
    required ownerOld: sys_core::SysOrg;
    owner: sys_core::SysSystem;
    required person: default::SysPerson{
       on source delete delete target if orphan;
    };
    multi roles: sys_core::SysCode{
        on target delete allow;
      }; 
  }

  type SysUser extending sys_user::Mgmt {
    required owner: sys_core::SysOrg;
    multi orgs: sys_core::SysOrg {
      on target delete allow;
    };
    person: default::SysPerson {
      on source delete delete target if orphan;
    };
    required password: str;
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
    multi resources: sys_user::SysUserTypeResource {
      on target delete allow;
    };
    multi tags: sys_core::SysCode;
    constraint exclusive on ((.name));
  }

  type SysUserTypeResource {
    required codeType: sys_core::SysCode;
    idSubject: uuid;
    required resource: sys_core::ObjRoot;
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
  
  function getStaffByName(firstName: str, lastName: str) -> optional sys_user::SysStaff
      using (select assert_single(sys_user::SysStaff filter 
        str_lower(.person.firstName) = str_lower(firstName) and
        str_lower(.person.lastName) = str_lower(lastName)
        )
      );

  function getUserById(userId: str) -> optional sys_user::SysUser
      using (select sys_user::SysUser filter .id = <uuid>userId);

  function getUserByName(userName: str) -> optional sys_user::SysUser
      using (select sys_user::SysUser filter .userName = userName);

  function getUserType(userTypeName: str) -> optional sys_user::SysUserType
    using (select sys_user::SysUserType filter .name = userTypeName);

  function getWidget(widgetName: str) -> optional sys_user::SysWidget
    using (select sys_user::SysWidget filter .name = widgetName);
}

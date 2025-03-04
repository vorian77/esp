CREATE MIGRATION m1kbyhmt7lnuaiy7kh72qbz7maytvctld4oxo3aexkfww5pylsbhyq
    ONTO m1sgnjtisabjzczsdr5lqm4qfmqb5upvbjccmkkylxriipiin5buwq
{
              ALTER TYPE sys_core::SysCode {
      CREATE LINK createdBy: sys_user::SysUser {
          SET REQUIRED USING (<sys_user::SysUser>.createdByOld);
      };
      CREATE LINK modifiedBy: sys_user::SysUser {
          SET REQUIRED USING (<sys_user::SysUser>.modifiedByOld);
      };
      CREATE PROPERTY modifiedAt: std::datetime {
          SET REQUIRED USING (<std::datetime>.modifiedAtOld);
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_core::SysCode {
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY modifiedAt {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};

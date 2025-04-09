CREATE MIGRATION m1elao3oz2ljqdr7knjdzv3fgoq4hkutz2zvux7iji7e3yd3f6z5uq
    ONTO m1c5gj4mdc5waspliylhuztpgigfgxxynkg6e6oietay3z2iydk22q
{
  ALTER TYPE sys_core::SysAttr {
      CREATE LINK createdBy: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
          SET REQUIRED USING (<sys_user::SysUser>{});
      };
      CREATE LINK modifiedBy: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
          SET REQUIRED USING (<sys_user::SysUser>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_core::SysAttr {
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
  };
};

CREATE MIGRATION m1mv7gaybvphdd4xa3ypyxpwysobdtin4g5ifq5doup4u46ooly73q
    ONTO m1cyzvuuivle3h5u25nekrn7t4yfpqzvrc7tn6gr4tuvlmn5mtt7eq
{
  ALTER TYPE sys_user::SysUserActionPost RENAME TO sys_user::SysUserActionRider;
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK actionPost {
          RENAME TO actionRider;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK actionPost {
          RENAME TO actionRider;
      };
  };
  ALTER TYPE sys_user::SysUserActionRider {
      CREATE REQUIRED LINK codeTrigger: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};

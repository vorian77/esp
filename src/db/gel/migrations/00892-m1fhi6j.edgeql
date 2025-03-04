CREATE MIGRATION m1fhi6jgcbfscw6br2ex56cqayvm6hqkef5dzivhrfxws57sygdfeq
    ONTO m1hgrm5bwgyfdktqi3kiw4kx6comdavwtqb7svg3bkxajbk3y42sjq
{
  CREATE TYPE sys_user::SysUserActionConfirm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeConfirmType: sys_core::SysCode;
      CREATE REQUIRED LINK codeTriggerConfirmConditional: sys_core::SysCode;
      CREATE PROPERTY confirmButtonLabelCancel: std::str;
      CREATE PROPERTY confirmButtonLabelConfirm: std::str;
      CREATE PROPERTY confirmMessage: std::str;
      CREATE PROPERTY confirmTitle: std::str;
  };
  CREATE TYPE sys_user::SysUserActionShow EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeTriggerShow: sys_core::SysCode;
      CREATE REQUIRED PROPERTY isRequired: std::bool;
  };
  CREATE TYPE sys_user::SysUserAction EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK actionConfirms: sys_user::SysUserActionConfirm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK actionShows: sys_user::SysUserActionShow {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK codeAction: sys_core::SysCodeAction;
      CREATE REQUIRED LINK codeTriggerEnable: sys_core::SysCode;
  };
};

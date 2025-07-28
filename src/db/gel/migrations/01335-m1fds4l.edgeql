CREATE MIGRATION m1fds4lfvpifjsahsc5hnliisfrxex45y5xm4yhodn6n5fxqgmbzsq
    ONTO m1rijgdakvzd363h57wcbp6oaf6xkdc5zv72adms7hodskbud7h56a
{
  ALTER TYPE sys_core::SysObjAttrEnt {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_core::SysCodeAction {
      ALTER CONSTRAINT std::exclusive ON ((.owner, .codeType, .name)) {
          DROP OWNED;
      };
  };
  ALTER TYPE sys_core::SysCode {
      DROP CONSTRAINT std::exclusive ON ((.owner, .codeType, .name));
  };
  ALTER TYPE sys_core::SysObjOrg {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_core::SysSystem {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_rep::SysRep {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_user::SysApp {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_user::SysTask {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_user::SysUserAction {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};

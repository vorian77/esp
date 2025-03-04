CREATE MIGRATION m1p5dq7skno56blfsydpa3gio7bhncqpt4alvd23gpiuuj7wsaxfsq
    ONTO m1ryjwc4ovx7bgw6n35sbzu67sybn2chwigkdywcdlsq7wzl7x4ueq
{
  ALTER TYPE sys_core::SysDataObjActionField {
      CREATE LINK codeAction: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK codeAction: sys_core::SysCode;
  };
};

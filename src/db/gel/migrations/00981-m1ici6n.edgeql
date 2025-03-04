CREATE MIGRATION m1ici6nf5uxlj5n3ycm4j6o4aarditic2qe442gsvvg55vraz5dkla
    ONTO m1qmhc4xf6obndzuxgbnrptmvb6kp2qtieugk5ezlb7ehjqt2f7plq
{
  ALTER TYPE sys_core::SysApp RENAME TO sys_user::SysApp;
  ALTER FUNCTION sys_core::getApp(name: std::str) {
      RENAME TO sys_user::getApp;
  };
  ALTER TYPE sys_core::SysAppHeader RENAME TO sys_user::SysAppHeader;
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER LINK codeType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_core::SysNodeObj {
      DROP LINK dataObj;
  };
  CREATE TYPE sys_user::SysCodeType EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE LINK parent: sys_core::SysCodeType;
      CREATE PROPERTY order: default::nonNegative;
      CREATE PROPERTY valueDecimal: std::float64;
      CREATE PROPERTY valueInteger: std::int64;
      CREATE PROPERTY valueString: std::str;
  };
};

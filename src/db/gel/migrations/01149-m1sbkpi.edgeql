CREATE MIGRATION m1sbkpi7bx3bk26ie5g5t7j2lnkrk3gjj3sww7yfh4o3tpwl46s3yq
    ONTO m1t7lxr53grqetwdfglini535hdbk4yyzfq5wowrvdqlhqz3zp4g2q
{
  DROP FUNCTION sys_core::getObjAttr(ownerName: std::str, name: std::str);
  ALTER TYPE sys_core::SysObjAttrAccess {
      ALTER LINK codeObjAttrTypeAccess {
          RENAME TO codeAttrTypeAccess;
      };
  };
  ALTER TYPE sys_core::SysObjAttrAction {
      ALTER LINK codeObjAttrTypeAction {
          RENAME TO codeAttrTypeAction;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK resources;
      DROP LINK tags;
  };
};

CREATE MIGRATION m13w5zkwdvfh7syq67xc6yhxntamvd6cxmqq5tfyjetxgisghwstga
    ONTO m1rfybihjp3xoo3rty5add6n3t73cu4kfneumqfkcxeq64z5i2j2sq
{
  CREATE TYPE sys_core::SysDataObjActionFieldGroup EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK actions: sys_core::SysDataObjActionFieldGroupItem {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE FUNCTION sys_core::getDataObjActionFieldGroup(name: std::str) -> OPTIONAL sys_core::SysDataObjActionFieldGroup USING (SELECT
      sys_core::SysDataObjActionFieldGroup
  FILTER
      (.name = name)
  );
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionFieldGroup;
  };
  ALTER TYPE sys_core::SysDataObjFieldListConfig {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionFieldGroup {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionFieldGroup {
          ON TARGET DELETE ALLOW;
      };
  };
};

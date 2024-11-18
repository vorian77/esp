CREATE MIGRATION m1rfybihjp3xoo3rty5add6n3t73cu4kfneumqfkcxeq64z5i2j2sq
    ONTO m1ggevzh5s4cincbwg5sdrtbwu7aikocm2lwa2ptylbswtugagn25q
{
  DROP FUNCTION sys_core::getDataObjActionFieldGroup(name: std::str);
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK actionsFieldGroup;
  };
  ALTER TYPE sys_core::SysDataObjActionFieldGroup {
      DROP CONSTRAINT std::exclusive ON (.name);
      DROP LINK actions;
  };
  ALTER TYPE sys_core::SysDataObjFieldListConfig {
      DROP LINK actionsFieldGroup;
  };
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      DROP LINK actionsFieldGroup;
  };
  DROP TYPE sys_core::SysDataObjActionFieldGroup;
};

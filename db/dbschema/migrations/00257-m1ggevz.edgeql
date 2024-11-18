CREATE MIGRATION m1ggevzh5s4cincbwg5sdrtbwu7aikocm2lwa2ptylbswtugagn25q
    ONTO m14kzned6g46kabjaaontusiic4mbpaqi3bz2brb4kgaxnxvgguaba
{
  CREATE TYPE sys_core::SysDataObjActionFieldGroupItem {
      CREATE REQUIRED LINK action: sys_core::SysDataObjActionField;
      CREATE CONSTRAINT std::exclusive ON (.action);
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObjActionFieldGroup {
      ALTER LINK actions {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
          SET TYPE sys_core::SysDataObjActionFieldGroupItem USING (.actions[IS sys_core::SysDataObjActionFieldGroupItem]);
          DROP PROPERTY order;
      };
  };
};

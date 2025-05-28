CREATE MIGRATION m17zgpk5clflgsbbdgzpjfksojoldtsimaiml4z5kconaoextpwp4a
    ONTO m1txkzyydvniz4m6b4n6oingyr326htqmkeq56re5fy6zocienn6tq
{
  ALTER TYPE sys_core::SysAttrObjAccess {
      ALTER LINK obj {
          SET TYPE sys_core::SysAttrObj USING (.obj[IS sys_core::SysAttrObj]);
      };
  };
  ALTER TYPE sys_core::SysAttrObjAction {
      ALTER LINK obj {
          SET TYPE sys_core::SysAttrObj USING (.obj[IS sys_core::SysAttrObj]);
      };
  };
};

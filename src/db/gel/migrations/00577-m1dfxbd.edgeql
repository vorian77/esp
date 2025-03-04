CREATE MIGRATION m1dfxbdmybsszt4knoflndsmdvo3kddljx72umwddlr2rodim4kdqq
    ONTO m1o7iptvojnntchf364vzxxrqfb3f4uffotq7zg4eutkbg6rcp5dkq
{
              ALTER TYPE sys_core::SysSystem {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          SET OWNED;
      };
  };
  ALTER TYPE sys_core::SysSystem {
      DROP EXTENDING sys_core::SysEnt;
      EXTENDING sys_core::ObjRoot,
      sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_core::SysSystem {
      CREATE LINK owner: sys_core::SysOrg;
  };
};

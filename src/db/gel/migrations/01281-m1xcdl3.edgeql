CREATE MIGRATION m1xcdl3srldcf7b5nmxhn5x5m7hvbq7tcng225mn67sgmknt7fqrpq
    ONTO m1qobbflouytlx6mkvxqxyd3knvu7p2v7gpa6llxt3t4bfkfwpz6ya
{
  ALTER TYPE sys_user::SysUser {
      ALTER LINK defaultOrg {
          RENAME TO org;
      };
  };
  ALTER TYPE sys_core::SysOrg {
      ALTER LINK users {
          USING (.<org[IS sys_user::SysUser]);
      };
  };
  ALTER TYPE sys_user::SysUser {
      DROP LINK orgs;
  };
};

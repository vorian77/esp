CREATE MIGRATION m1nkl3rtmeb3lmf6f6cupazgjewm26vlxcr2ytzkuporipc3l6jhua
    ONTO m1bblpwp5ay6h4t6wwoswr5254tv4c34vawghxarmndipfapzx7ega
{
          ALTER TYPE sys_user::SysUser {
      CREATE LINK owner: sys_core::SysOrg;
  };
};

CREATE MIGRATION m1yab32umdiwypxgipwfhz7rhvnpqx3veq35b2valsox2ftauw3ozq
    ONTO m1xcdl3srldcf7b5nmxhn5x5m7hvbq7tcng225mn67sgmknt7fqrpq
{
  CREATE TYPE sys_core::SysObjOrg EXTENDING sys_core::ObjRootCore, sys_user::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::SysOrg;
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};

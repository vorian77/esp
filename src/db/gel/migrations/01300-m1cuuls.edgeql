CREATE MIGRATION m1cuuls7xho4l6odqqcnwfnvtlquzdk72j65pqktuttixy2xka4xxq
    ONTO m1wsn6hturibkm4v4ql4s7ptaphsfprjavlgvxqi56z6jp4zgczv2q
{
  CREATE TYPE sys_core::SysObjOrg EXTENDING sys_core::ObjRootCore, sys_user::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::SysOrg;
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};

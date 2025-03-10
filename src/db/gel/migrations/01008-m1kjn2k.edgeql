CREATE MIGRATION m1kjn2k7rfdy6davvc5oma2w7kjx74ma7xf736nxj3wrlowziy5cua
    ONTO m1k767kwcj4zk3aetf2m3zliuncwbvx2efq4wqm25ypiffoetd4fha
{
  ALTER TYPE sys_core::SysSystem {
      CREATE LINK users := (.<systems[IS sys_user::SysUser]);
  };
};

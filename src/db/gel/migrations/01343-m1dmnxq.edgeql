CREATE MIGRATION m1dmnxqczenbhy37onb2p7mxd63vd6wfiqprpytvsyp2ktrwmgh6ia
    ONTO m13gg6znayu2lbfou7tq2vq3hom3qcini7wrpzp3n7azrbqiokh2ka
{
  ALTER TYPE sys_core::SysObjAttrEnt {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
  ALTER TYPE sys_core::SysMsg {
      CREATE LINK replies := (.<parent[IS sys_core::SysMsg]);
      CREATE LINK thread := (DISTINCT ((.replies UNION sys_core::SysMsg)));
  };
  ALTER TYPE sys_core::SysSystem {
      CREATE LINK users := (.<systems[IS sys_user::SysUser]);
  };
};

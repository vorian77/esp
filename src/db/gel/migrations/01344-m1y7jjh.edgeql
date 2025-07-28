CREATE MIGRATION m1y7jjhd3ayo3bza42kqupm4z3qrbuxemzrccfoauo4jzoqcw5bzpq
    ONTO m1dmnxqczenbhy37onb2p7mxd63vd6wfiqprpytvsyp2ktrwmgh6ia
{
  ALTER TYPE sys_core::SysCode {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .codeType, .name));
  };
  ALTER TYPE sys_core::SysCodeAction {
      ALTER CONSTRAINT std::exclusive ON ((.ownerSys, .codeType, .name)) {
          SET OWNED;
      };
  };
  ALTER TYPE sys_core::SysObjOrg {
      CREATE CONSTRAINT std::exclusive ON ((.ownerOrg, .name));
  };
  ALTER TYPE sys_core::SysSystem {
      CREATE CONSTRAINT std::exclusive ON ((.ownerOrg, .name));
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
  ALTER TYPE sys_user::SysApp {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
  ALTER TYPE sys_user::SysTask {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
};

CREATE MIGRATION m15ttkcrck65ootmr2povatbi2lx6zfixhxvmcd7nfgabfa4hj4loq
    ONTO m1n64im6e3ef3hkfxibgbrasxf3o7gwwoa7vt3nz5n6ize54pbbc5q
{
      DROP FUNCTION sys_core::getDataObjFieldListEdit(name: std::str);
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldListEdit;
  };
  DROP TYPE sys_core::SysDataObjFieldListEdit;
  ALTER TYPE sys_rep::SysRepUser {
      CREATE MULTI LINK parms: sys_rep::SysRepUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};

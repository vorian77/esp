CREATE MIGRATION m14p2jhtsc5nx6quyq6lf2rsilxcmcv3q2m6ecn7y64jkitbmvzeaq
    ONTO m1n6ukgz5hpmy6f7g3f62kw5qlhwb57vaibqtqx2afpkjlvaunbx3q
{
  ALTER TYPE sys_core::SysObjDb {
      CREATE MULTI LINK tables: sys_core::SysDataObjTable {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};

CREATE MIGRATION m1hx7iiaehqxrex5ln6rknbfwexp74qlns4zh52wy2j2gq63v72zpq
    ONTO m1m6tkjwubb6mkq4yjfgxdpgqdrdfvf4rx3q3sddgat3wkvnzw4guq
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE MULTI LINK linkColumns: sys_core::SysDataObjColumnLink {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};

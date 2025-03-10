CREATE MIGRATION m1nq5mohyhqwya62ronpxdoslaz3ycqrrexp6ov2mpr6qpqerxb26a
    ONTO m1kjn2k7rfdy6davvc5oma2w7kjx74ma7xf736nxj3wrlowziy5cua
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      DROP LINK column;
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE REQUIRED MULTI LINK columns: sys_core::SysDataObjColumn {
          SET REQUIRED USING (<sys_core::SysDataObjColumn>{});
      };
  };
};

CREATE MIGRATION m1abzt2qssgsk4ipn6kx772ty2yxea4dvhln7druo3dc43lii4t65q
    ONTO m1nq5mohyhqwya62ronpxdoslaz3ycqrrexp6ov2mpr6qpqerxb26a
{
  ALTER TYPE sys_core::SysSystem {
      ALTER LINK entitySystems {
          RENAME TO systemParents;
      };
  };
};

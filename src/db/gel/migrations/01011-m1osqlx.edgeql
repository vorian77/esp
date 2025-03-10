CREATE MIGRATION m1osqlx733ay4jhfrvvqchcamvga45p3vxctzburulbrgimuxgiasa
    ONTO m1abzt2qssgsk4ipn6kx772ty2yxea4dvhln7druo3dc43lii4t65q
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER PROPERTY isDynamicChildrenSystemEntities {
          RENAME TO isDynamicChildrenSystemParents;
      };
  };
};

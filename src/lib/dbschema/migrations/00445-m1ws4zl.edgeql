CREATE MIGRATION m1ws4zlux5exg7cilog367gerzk4l3wdvkegsyvdtygqto64cmax6q
    ONTO m1tl7pj7sfvxh46yhpivzvakr2rt5mwoioyx4kqfbaxrvbmlryxmpa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK codeDbDataSource {
          RENAME TO codeDbDataSourceValue;
      };
  };
};

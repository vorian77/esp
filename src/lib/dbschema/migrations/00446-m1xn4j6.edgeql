CREATE MIGRATION m1xn4j6bv723x2kdrtrwcsdz3rz6jia6r7r2c7g6f7n52f6t2ddlva
    ONTO m1ws4zlux5exg7cilog367gerzk4l3wdvkegsyvdtygqto64cmax6q
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK codeElement {
          RENAME TO codeFieldElement;
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      ALTER LINK codeElement {
          RENAME TO codeDbDataSourceValue;
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      CREATE LINK codeFieldElement: sys_core::SysCode;
  };
  ALTER TYPE sys_rep::SysRepEl {
      ALTER LINK codeType {
          RENAME TO codeReportElementType;
      };
  };
};

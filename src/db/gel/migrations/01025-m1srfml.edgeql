CREATE MIGRATION m1srfmlrg55q3fczngxormfzls2ic5hjmkdmwykx7kqezry2ztmv5q
    ONTO m1ycocqsckxbzym6sg3isevqjwotaxqhswsp2pg4ivizv32psisxda
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK codeDoDetailType {
          RENAME TO codeDoQueryType;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY isDetailRetrievePreset;
  };
};

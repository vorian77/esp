CREATE MIGRATION m1hdbad64nk27zphhxzfvr6zu6s3nbtiajlsftaqvhwi2cvbhfzpaq
    ONTO m1n2ok6h4j5ky2az57lygmnj55voqw46mkosqax4bzmquchpteyatq
{
  ALTER TYPE sys_core::ObjRootCore {
      ALTER LINK codeIcon {
          RESET readonly;
          RESET CARDINALITY;
          SET OWNED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_core::ObjRootCore {
      ALTER LINK codeIconNew {
          RENAME TO codeObjType;
      };
  };
  ALTER TYPE sys_core::ObjRootCore {
      ALTER LINK codeIcon {
          RESET readonly;
          RESET CARDINALITY;
      };
      ALTER PROPERTY orderDefine {
          RESET readonly;
          RESET CARDINALITY;
          SET OWNED;
          SET TYPE default::nonNegative;
      };
      DROP PROPERTY orderDefineNew;
  };
  ALTER TYPE sys_core::ObjRoot {
      DROP LINK codeIcon;
      DROP PROPERTY orderDefine;
  };
};

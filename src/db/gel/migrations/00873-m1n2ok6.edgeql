CREATE MIGRATION m1n2ok6h4j5ky2az57lygmnj55voqw46mkosqax4bzmquchpteyatq
    ONTO m1dawwhzjzpg6z5mncozztulwfrn5ubecolcl2len2grikpavrupna
{
  ALTER TYPE sys_core::ObjRootCore {
      CREATE LINK codeIconNew: sys_core::SysCode;
  };
  ALTER TYPE sys_core::ObjRoot {
      DROP LINK codeObjType;
      DROP LINK codeState;
      DROP LINK contacts;
      DROP PROPERTY email;
      DROP PROPERTY website;
      DROP PROPERTY zip;
  };
  ALTER TYPE sys_core::ObjRootCore {
      CREATE PROPERTY orderDefineNew: default::nonNegative;
  };
  DROP TYPE sys_core::ObjRootCoreEnt;
};

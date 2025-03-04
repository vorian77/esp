CREATE MIGRATION m1lucvnx5lq6lqdtn6uiagtnoeuzrza62jyp43cagsjqsg6vcg5ska
    ONTO m14klcke7vy4q4ko37apiqmnvoas6pclty3rzayngmkh2xfqzexhmq
{
  DROP FUNCTION sys_core::getObjRoot(name: std::str);
  ALTER TYPE sys_core::ObjRootCore {
      ALTER PROPERTY name {
          RESET readonly;
          RESET CARDINALITY;
          SET REQUIRED;
          SET OWNED;
          SET TYPE std::str;
      };
      DROP PROPERTY nameNew;
  };
  CREATE FUNCTION sys_core::getObjRoot(name: std::str) -> OPTIONAL sys_core::ObjRootCore USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRootCore
      FILTER
          (.name = name)
      ))
  );
  ALTER TYPE sys_core::ObjRoot {
      DROP PROPERTY name;
  };
};

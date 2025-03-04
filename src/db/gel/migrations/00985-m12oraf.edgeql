CREATE MIGRATION m12orafzg2tzhm2s2vkyqw552eh2andoske3f76c33qehd7wibdfoa
    ONTO m1mjlrxwx4wtkwaarchnvf5h2rhhhnksekxhlojk5brmdvmpowrnpa
{
  DROP FUNCTION sys_core::attrAdd(objOwnerName: std::str);
  CREATE FUNCTION sys_core::attrAdd(objOwnerName: std::str, objName: std::str) ->  std::str USING (SELECT
      objOwnerName
  );
};

CREATE MIGRATION m14b4isvw2mgbjydg2obsj56jyik6pxhaj7knlwpo7nlemciwrxqma
    ONTO m1n5v4z42kbqvjchwt4bqoiqja5wde5osrtyuwgykwexkznsjeb4ba
{
  ALTER TYPE sys_core::ObjRoot {
      DROP LINK attrsSource;
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      DROP LINK objAttrSfSite;
  };
  DROP TYPE sys_core::SysAttrSource;
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK codeAttrObjsSource;
      DROP LINK codeAttrType;
      DROP PROPERTY attrAccess;
      DROP PROPERTY exprSaveAttrObjects;
  };
};
